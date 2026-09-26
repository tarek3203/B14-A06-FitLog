import Hero from "@/components/home/Hero";
import Library from "@/components/home/Library";
import { getWorkouts } from "@/lib/api";

const HomePage = async () => {
  const workouts = await getWorkouts();

  return (
    <>
      <Hero />

      <Library workouts={workouts} />
    </>
  );
};

export default HomePage;
