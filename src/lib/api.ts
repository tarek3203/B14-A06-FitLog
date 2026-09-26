import { IWorkout } from "@/types/workout.type";

const BASE_URL = "https://api.abcz.workers.dev/api/fitlog";

// Revalidate hourly: the library is static content, but ISR keeps it fresh
// without rebuilding (Module 35 pattern).
export const getWorkouts = async (): Promise<IWorkout[]> => {
  const response = await fetch(BASE_URL, { next: { revalidate: 3600 } });

  if (!response.ok) {
    throw new Error("Failed to fetch workouts");
  }

  return response.json();
};

// Returns null for an unknown id so the detail page can render notFound().
export const getWorkout = async (id: string): Promise<IWorkout | null> => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    next: { revalidate: 3600 },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch workout");
  }

  return response.json();
};
