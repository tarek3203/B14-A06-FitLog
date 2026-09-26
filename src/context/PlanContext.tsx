"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "react-toastify";
import { IWorkout } from "@/types/workout.type";

export const PLAN_LIMIT = 5;

const STORAGE_KEY = "fitlog-state";

interface IPlanMetrics {
  exercises: number;
  minutes: number;
  calories: number;
}

interface IPlanContext {
  plan: IWorkout[];
  saved: IWorkout[];
  doneIds: number[];
  /** False until localStorage has been read, so lists can show a loading state. */
  ready: boolean;
  metrics: IPlanMetrics;
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
  isDone: (id: number) => boolean;
  addToPlan: (workout: IWorkout) => void;
  saveForLater: (workout: IWorkout) => void;
  removeFromPlan: (workout: IWorkout) => void;
  removeFromSaved: (workout: IWorkout) => void;
  markAsDone: (workout: IWorkout) => void;
}

export const PlanContext = createContext<IPlanContext | null>(null);

export const usePlan = () => {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error("usePlan must be used inside PlanProvider");
  }

  return context;
};

const PlanProvider = ({ children }: { children: ReactNode }) => {
  const [plan, setPlan] = useState<IWorkout[]>([]);
  const [saved, setSaved] = useState<IWorkout[]>([]);
  const [doneIds, setDoneIds] = useState<number[]>([]);
  const [ready, setReady] = useState(false);

  // Read persisted state after mount only. Reading during render would make the
  // server HTML and the first client render disagree and crash the page reload.
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);

      if (stored) {
        const parsed = JSON.parse(stored);
        setPlan(parsed.plan ?? []);
        setSaved(parsed.saved ?? []);
        setDoneIds(parsed.doneIds ?? []);
      }
    } catch {
      // Corrupt or unavailable storage just means we start empty.
    }

    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ plan, saved, doneIds }),
      );
    } catch {
      // Ignore quota / private-mode failures.
    }
  }, [plan, saved, doneIds, ready]);

  const isInPlan = useCallback(
    (id: number) => plan.some((item) => item.id === id),
    [plan],
  );

  const isSaved = useCallback(
    (id: number) => saved.some((item) => item.id === id),
    [saved],
  );

  const isDone = useCallback(
    (id: number) => doneIds.includes(id),
    [doneIds],
  );

  const addToPlan = useCallback(
    (workout: IWorkout) => {
      if (isInPlan(workout.id)) {
        toast.info(`${workout.name} is already in today's plan`);
        return;
      }

      if (plan.length >= PLAN_LIMIT) {
        toast.error(`Today's plan is full — ${PLAN_LIMIT} lifts max`);
        return;
      }

      setPlan((previous) => [...previous, workout]);
      toast.success("Added to today's plan");
    },
    [isInPlan, plan.length],
  );

  const saveForLater = useCallback(
    (workout: IWorkout) => {
      if (isSaved(workout.id)) {
        toast.info(`${workout.name} is already saved`);
        return;
      }

      setSaved((previous) => [...previous, workout]);
      toast.success("Saved for later");
    },
    [isSaved],
  );

  const removeFromPlan = useCallback((workout: IWorkout) => {
    setPlan((previous) => previous.filter((item) => item.id !== workout.id));
    setDoneIds((previous) => previous.filter((id) => id !== workout.id));
    toast.success(`Removed ${workout.name} from today's plan`);
  }, []);

  const removeFromSaved = useCallback((workout: IWorkout) => {
    setSaved((previous) => previous.filter((item) => item.id !== workout.id));
    toast.success(`Removed ${workout.name} from saved`);
  }, []);

  const markAsDone = useCallback((workout: IWorkout) => {
    let alreadyDone = false;

    setDoneIds((previous) => {
      if (previous.includes(workout.id)) {
        alreadyDone = true;
        return previous;
      }

      return [...previous, workout.id];
    });

    if (alreadyDone) {
      toast.info(`${workout.name} is already done`);
      return;
    }

    toast.success(`${workout.name} marked as done`);
  }, []);

  // Metrics track today's plan only, and recompute as items come and go.
  const metrics = useMemo<IPlanMetrics>(
    () => ({
      exercises: plan.length,
      minutes: plan.reduce((total, item) => total + item.duration, 0),
      calories: plan.reduce((total, item) => total + item.caloriesBurned, 0),
    }),
    [plan],
  );

  const sharedData = useMemo(
    () => ({
      plan,
      saved,
      doneIds,
      ready,
      metrics,
      isInPlan,
      isSaved,
      isDone,
      addToPlan,
      saveForLater,
      removeFromPlan,
      removeFromSaved,
      markAsDone,
    }),
    [
      plan,
      saved,
      doneIds,
      ready,
      metrics,
      isInPlan,
      isSaved,
      isDone,
      addToPlan,
      saveForLater,
      removeFromPlan,
      removeFromSaved,
      markAsDone,
    ],
  );

  return (
    <PlanContext.Provider value={sharedData}>{children}</PlanContext.Provider>
  );
};

export default PlanProvider;
