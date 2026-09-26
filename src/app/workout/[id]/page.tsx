import Image from "next/image";
import { notFound } from "next/navigation";
import WorkoutActions from "@/components/workout/WorkoutActions";
import { getWorkout, getWorkouts } from "@/lib/api";

interface IWorkoutDetailsPageProps {
  params: Promise<{ id: string }>;
}

// Pre-render all twelve detail pages at build time (Module 35 pattern).
export const generateStaticParams = async () => {
  const workouts = await getWorkouts();

  return workouts.map((workout) => ({ id: String(workout.id) }));
};

const WorkoutDetailsPage = async ({ params }: IWorkoutDetailsPageProps) => {
  const { id } = await params;
  const workout = await getWorkout(id);

  // Unknown id falls through to the 404 page.
  if (!workout) {
    notFound();
  }

  const specs = [
    { label: "Equipment", value: workout.equipment },
    { label: "Difficulty", value: workout.difficulty },
    { label: "Sets", value: workout.sets },
    { label: "Reps", value: workout.reps },
    { label: "Duration", value: `${workout.duration} min` },
    { label: "Calories", value: `${workout.caloriesBurned} kcal` },
    { label: "Rating", value: workout.rating },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Left — visual */}
        <div className="relative h-80 w-full overflow-hidden rounded-3xl border border-line bg-surface sm:h-[30rem] lg:h-full lg:min-h-[34rem]">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Right — details */}
        <div>
          <h1 className="display text-3xl text-white sm:text-4xl lg:text-5xl">
            {workout.name}
          </h1>

          <p className="mt-4 leading-7 text-muted">{workout.description}</p>

          {/* Category tags */}
          <div className="mt-5 flex flex-wrap gap-2">
            {workout.muscleGroups.map((group) => (
              <span
                key={group}
                className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-sm text-accent"
              >
                {group}
              </span>
            ))}
          </div>

          {/* Key specs */}
          <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-surface">
            {specs.map((spec) => (
              <div
                key={spec.label}
                className="flex items-center justify-between gap-4 border-b border-line px-5 py-3 last:border-b-0"
              >
                <span className="display text-xs tracking-widest text-muted">
                  {spec.label}
                </span>

                <span className="text-right text-sm font-medium text-white">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>

          {/* Instructions */}
          <div className="mt-8">
            <h2 className="display text-xl text-white">Instructions</h2>

            <ol className="mt-4 space-y-3">
              {workout.instructions.map((step, index) => (
                <li key={step} className="flex gap-3 text-muted">
                  <span className="display flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs text-ink">
                    {index + 1}
                  </span>

                  <span className="leading-7">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <WorkoutActions workout={workout} />
        </div>
      </div>
    </section>
  );
};

export default WorkoutDetailsPage;
