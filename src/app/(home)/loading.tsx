const HomeLoading = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
      <span className="h-12 w-12 animate-spin rounded-full border-4 border-line border-t-acid" />

      <p className="display text-sm tracking-widest text-muted">
        Loading workouts…
      </p>
    </div>
  );
};

export default HomeLoading;
