"use client";

import Link from "next/link";
import { useState } from "react";
import { FiActivity, FiClock, FiZap } from "react-icons/fi";
import PlanCard from "@/components/plan/PlanCard";
import { usePlan } from "@/context/PlanContext";
import { IWorkout } from "@/types/workout.type";

type TabKey = "today" | "saved";

const MyPlanPage = () => {
  const { plan, saved, metrics, ready, removeFromPlan, removeFromSaved } =
    usePlan();
  const [activeTab, setActiveTab] = useState<TabKey>("today");

  const isTodayTab = activeTab === "today";
  const workouts: IWorkout[] = isTodayTab ? plan : saved;
  const removeHandler = isTodayTab ? removeFromPlan : removeFromSaved;

  const stats = [
    { label: "Exercises", value: metrics.exercises, icon: FiActivity },
    { label: "Minutes", value: metrics.minutes, icon: FiClock },
    { label: "Calories", value: metrics.calories, icon: FiZap },
  ];

  const tabs: { key: TabKey; label: string; count: number }[] = [
    { key: "today", label: "Today's Plan", count: plan.length },
    { key: "saved", label: "Saved", count: saved.length },
  ];

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="display text-3xl text-white sm:text-4xl">My Plan</h1>

      <p className="mt-2 text-muted">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      {/* Metrics summary */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-line bg-surface p-5"
          >
            <div className="flex items-center gap-2 text-muted">
              <stat.icon className="text-acid" />

              <span className="display text-xs tracking-widest">
                {stat.label}
              </span>
            </div>

            <p className="display mt-3 text-3xl text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="mt-10 flex gap-2 border-b border-line">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`display -mb-px border-b-2 px-5 py-3 text-sm transition ${
              activeTab === tab.key
                ? "border-acid text-acid"
                : "border-transparent text-muted hover:text-white"
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* List / loading / empty state */}
      <div className="mt-8">
        {!ready ? (
          <div className="flex flex-col items-center gap-4 py-16">
            <span className="h-10 w-10 animate-spin rounded-full border-4 border-line border-t-acid" />

            <p className="display text-sm tracking-widest text-muted">
              Loading workouts…
            </p>
          </div>
        ) : workouts.length > 0 ? (
          <div className="space-y-4">
            {workouts.map((workout) => (
              <PlanCard
                key={workout.id}
                workout={workout}
                showMarkAsDone={isTodayTab}
                onRemove={removeHandler}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-line bg-surface px-6 py-16 text-center">
            <h2 className="display text-2xl text-white">Nothing here yet</h2>

            <p className="mx-auto mt-3 max-w-md text-muted">
              Browse the library and add a lift to get today moving.
            </p>

            <Link
              href="/"
              className="display mt-7 inline-block rounded-full bg-acid px-7 py-3 text-sm text-ink transition hover:brightness-110"
            >
              Go to workouts
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyPlanPage;
