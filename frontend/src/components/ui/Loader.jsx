/**
 * Loader — spinner for full-area loading states
 * Props: label, fullScreen
 */
function Loader({ label = "Loading…", fullScreen = false }) {
  return (
    <div
      role="status"
      className={`flex flex-col items-center justify-center gap-3 ${
        fullScreen ? "min-h-screen" : "py-16"
      }`}
    >
      <span className="relative flex h-9 w-9 items-center justify-center" aria-hidden="true">
        <span className="absolute h-9 w-9 rounded-full border border-brand/30" />
        <span className="absolute h-9 w-9 animate-ping-slow rounded-full border border-brand/40" />
        <span className="h-2 w-2 rounded-full bg-brand" />
      </span>
      <span className="text-sm text-ink-soft dark:text-ink-night-soft">
        {label}
      </span>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-line bg-paper-soft p-5 dark:border-line-night dark:bg-paper-night-soft"
      aria-hidden="true"
    >
      <div className="h-4 w-1/3 rounded bg-line dark:bg-line-night" />
      <div className="mt-4 h-3 w-full rounded bg-line dark:bg-line-night" />
      <div className="mt-2 h-3 w-5/6 rounded bg-line dark:bg-line-night" />
      <div className="mt-6 h-8 w-24 rounded-full bg-line dark:bg-line-night" />
      <span className="shimmer-sheen absolute inset-0" />
    </div>
  );
}

export function CardSkeletonGrid({ count = 4 }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export default Loader;
