import Image from "next/image";
import Link from "next/link";
import { FiClock, FiStar, FiZap } from "react-icons/fi";
import { IWorkout } from "@/types/workout.type";

const WorkoutCard = ({ workout }: { workout: IWorkout }) => {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition hover:-translate-y-1 hover:border-acid"
    >
      <div className="relative h-52 w-full overflow-hidden bg-raised">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* muscle group pills */}
        <div className="flex flex-wrap gap-2">
          {workout.muscleGroups.map((group) => (
            <span
              key={group}
              className="display rounded-full border border-acid/40 bg-acid/10 px-3 py-1 text-[11px] tracking-widest text-acid"
            >
              {group}
            </span>
          ))}
        </div>

        <h3 className="display text-xl text-white">{workout.name}</h3>

        <p className="text-sm text-muted">{workout.equipment}</p>

        {/* duration, calories, rating */}
        <div className="mt-auto flex items-center gap-4 border-t border-line pt-4 text-sm text-muted">
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
    </Link>
  );
};

export default WorkoutCard;
