const WorkoutLoading = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
      <span className="h-12 w-12 animate-spin rounded-full border-4 border-line border-t-accent" />

      <p className="display text-sm tracking-widest text-muted">
        Loading workout…
      </p>
    </div>
  );
};

export default WorkoutLoading;
