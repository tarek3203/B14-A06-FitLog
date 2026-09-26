import Link from "next/link";

const NotFound = () => {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="display text-7xl text-acid sm:text-8xl">404</p>

      <h1 className="display mt-4 text-2xl text-white sm:text-3xl">
        This lift isn&apos;t in the rack
      </h1>

      <p className="mt-3 max-w-md text-muted">
        The page you are looking for does not exist. Head back to the library
        and pick a workout that does.
      </p>

      <Link
        href="/"
        className="display mt-8 inline-block rounded-full bg-acid px-7 py-3 text-sm text-ink transition hover:brightness-110"
      >
        Go to workouts
      </Link>
    </section>
  );
};

export default NotFound;
