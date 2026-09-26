"use client";

import { FiBookmark, FiCheck, FiPlus } from "react-icons/fi";
import { usePlan } from "@/context/PlanContext";
import { IWorkout } from "@/types/workout.type";

const WorkoutActions = ({ workout }: { workout: IWorkout }) => {
  const { addToPlan, saveForLater, isInPlan, isSaved } = usePlan();

  const inPlan = isInPlan(workout.id);
  const saved = isSaved(workout.id);

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={() => addToPlan(workout)}
        disabled={inPlan}
        className="display inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm text-ink transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {inPlan ? <FiCheck className="text-lg" /> : <FiPlus className="text-lg" />}
        {inPlan ? "Added to today's plan" : "Add to today's plan"}
      </button>

      <button
        type="button"
        onClick={() => saveForLater(workout)}
        disabled={saved}
        className="display inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-line px-6 py-3 text-sm text-white transition hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-60"
      >
        {saved ? <FiCheck className="text-lg" /> : <FiBookmark className="text-lg" />}
        {saved ? "Saved" : "Save for later"}
      </button>
    </div>
  );
};

export default WorkoutActions;
