"use client";

import { useMemo, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import WorkoutCard from "@/components/shared/WorkoutCard";
import { IWorkout, SortKey } from "@/types/workout.type";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "duration", label: "Duration" },
  { value: "calories", label: "Calories" },
  { value: "rating", label: "Rating" },
];

const Library = ({ workouts }: { workouts: IWorkout[] }) => {
  const [sortBy, setSortBy] = useState<SortKey>("duration");

  // Highest-first on every key: longest session, biggest burn, best rated.
  const sortedWorkouts = useMemo(() => {
    const copy = [...workouts];

    if (sortBy === "duration") {
      copy.sort((a, b) => b.duration - a.duration);
    } else if (sortBy === "calories") {
      copy.sort((a, b) => b.caloriesBurned - a.caloriesBurned);
    } else {
      copy.sort((a, b) => b.rating - a.rating);
    }

    return copy;
  }, [workouts, sortBy]);

  return (
    <section id="library" className="scroll-mt-24 bg-ink">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="display text-3xl text-white sm:text-4xl">
              The Library
            </h2>

            <p className="mt-2 text-muted">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          {/* Sort dropdown */}
          <div className="relative w-full sm:w-56">
            <label
              htmlFor="sort-by"
              className="display mb-2 block text-xs tracking-widest text-muted"
            >
              Sort By
            </label>

            <select
              id="sort-by"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as SortKey)}
              className="w-full appearance-none rounded-full border border-line bg-surface px-5 py-2.5 pr-10 text-sm text-white outline-none transition focus:border-accent"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <FiChevronDown className="pointer-events-none absolute bottom-3 right-4 text-accent" />
          </div>
        </div>

        {/* 3x4 grid on large screens, collapsing down on smaller ones */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Library;
