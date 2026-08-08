import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center sm:px-6">
      <p className="font-eyebrow text-xs text-brand">404</p>
      <h1 className="mt-2 font-display text-3xl font-semibold">
        This page went missing.
      </h1>
      <p className="mt-3 text-sm text-ink-soft dark:text-ink-night-soft">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Link
        to="/"
        className="mt-6 rounded-full bg-brand px-6 py-3 text-sm font-medium text-white transition hover:bg-brand-dark"
      >
        Back to home
      </Link>
    </div>
  );
}

export default NotFound;
