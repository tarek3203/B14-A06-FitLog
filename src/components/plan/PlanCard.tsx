"use client";

import Image from "next/image";
import Link from "next/link";
import { FiCheck, FiClock, FiStar, FiX, FiZap } from "react-icons/fi";
import { usePlan } from "@/context/PlanContext";
import { IWorkout } from "@/types/workout.type";

interface IPlanCardProps {
  workout: IWorkout;
  /** The Saved tab has nothing to mark done — only the plan does. */
  showMarkAsDone: boolean;
  onRemove: (workout: IWorkout) => void;
}

const PlanCard = ({ workout, showMarkAsDone, onRemove }: IPlanCardProps) => {
  const { markAsDone, isDone } = usePlan();
  const done = showMarkAsDone && isDone(workout.id);

  return (
    <article
      className={`flex flex-col gap-4 rounded-2xl border bg-surface p-4 sm:flex-row sm:items-center ${
        done ? "border-acid/60" : "border-line"
      }`}
    >
      {/* Thumbnail */}
      <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-xl bg-raised sm:h-24 sm:w-32">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="128px"
          className="object-cover"
        />
      </div>

      {/* Copy + stats */}
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="display text-lg text-white">{workout.name}</h3>

          {done && (
            <span className="display rounded-full bg-acid px-3 py-0.5 text-[11px] tracking-widest text-ink">
              Done
            </span>
          )}
        </div>

        <p className="mt-1 text-sm text-muted">{workout.equipment}</p>

        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted">
          <span className="flex items-center gap-1.5">
            <FiClock className="text-acid" />
            {workout.duration} min
          </span>

          <span className="flex items-center gap-1.5">
            <FiZap className="text-acid" />
            {workout.caloriesBurned} kcal
          </span>

          <span className="flex items-center gap-1.5">
            <FiStar className="text-acid" />
            {workout.rating}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2">
        <Link
          href={`/workout/${workout.id}`}
          className="display rounded-full border border-line px-4 py-2 text-xs text-white transition hover:border-acid hover:text-acid"
        >
          View Details
        </Link>

        {showMarkAsDone && (
          <button
            type="button"
            onClick={() => markAsDone(workout)}
            disabled={done}
            className="display inline-flex items-center gap-1.5 rounded-full bg-acid px-4 py-2 text-xs text-ink transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiCheck className="text-sm" />
            Mark as Done
          </button>
        )}

        <button
          type="button"
          aria-label={`Remove ${workout.name}`}
          onClick={() => onRemove(workout)}
          className="rounded-full border border-line p-2.5 text-white transition hover:border-red-500 hover:text-red-500"
        >
          <FiX />
        </button>
      </div>
    </article>
  );
};

export default PlanCard;
