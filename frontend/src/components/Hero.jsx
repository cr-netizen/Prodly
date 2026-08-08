import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function TagIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12.4 2.6 21 11.2a2 2 0 0 1 0 2.8l-6.6 6.6a2 2 0 0 1-2.8 0L3 12V3h9.4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="7.5" cy="7.5" r="1.5" fill="currentColor" />
    </svg>
  );
}

function ImageIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" aria-hidden="true" {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="8.5" cy="10" r="1.6" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="m4.5 17 4.5-4.5c.6-.6 1.5-.6 2 0L14 15.5m0 0 2-2c.6-.6 1.5-.6 2 0l1.5 1.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SparkleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 3v3M12 18v3M3 12h3M18 12h3M6 6l1.8 1.8M16.2 16.2 18 18M18 6l-1.8 1.8M7.8 16.2 6 18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="3.2" fill="currentColor" />
    </svg>
  );
}

function CheckBadge(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.15" />
      <path
        d="m8 12.5 2.5 2.5L16 9.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Hero() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 sm:pt-24">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <p className="font-eyebrow text-xs text-brand">Product copy, done</p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.05] sm:text-5xl">
            Turn a few details into a description worth reading.
          </h1>
          <p className="mt-5 max-w-md text-ink-soft dark:text-ink-night-soft">
            Prodly keeps every product you sell organized in one place, and
            writes the copy for you — on brand, on tone, ready to publish.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to={isAuthenticated ? "/dashboard" : "/register"}
              className="rounded-full bg-brand px-6 py-3 text-sm font-medium text-white transition hover:bg-brand-dark"
            >
              {isAuthenticated ? "Go to dashboard" : "Get started free"}
            </Link>
            <Link
              to="/about"
              className="rounded-full border border-line px-6 py-3 text-sm font-medium text-ink transition hover:bg-paper-soft dark:border-line-night dark:text-ink-night dark:hover:bg-paper-night-soft"
            >
              How it works
            </Link>
          </div>
        </div>

        {/* Graphical mock of a generated listing — icons and skeleton
            shapes rather than literal sample ad copy. */}
        <div className="relative mx-auto w-full max-w-sm">
          <div
            aria-hidden="true"
            className="absolute -bottom-4 -left-4 -z-10 h-full w-full -rotate-3 rounded-2xl border border-dashed border-line dark:border-line-night"
          />

          <div className="rounded-2xl border border-line bg-paper p-5 shadow-sm dark:border-line-night dark:bg-paper-night">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brand text-white">
                <TagIcon width="13" height="13" />
              </span>
              <span className="font-eyebrow text-[11px] text-ink-soft dark:text-ink-night-soft">
                Listing preview
              </span>
              <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-aqua/10 px-2 py-0.5 text-[11px] font-medium text-aqua">
                <CheckBadge /> Ready
              </span>
            </div>

            <div className="mt-4 flex items-center justify-center rounded-xl border border-dashed border-line bg-paper-soft py-8 text-ink-soft/50 dark:border-line-night dark:bg-paper-night-soft dark:text-ink-night-soft/50">
              <ImageIcon />
            </div>

            <div className="mt-4 space-y-2">
              <div className="h-3 w-3/4 rounded-full bg-line dark:bg-line-night" />
              <div className="h-2.5 w-full rounded-full bg-line/70 dark:bg-line-night/70" />
              <div className="h-2.5 w-5/6 rounded-full bg-line/70 dark:bg-line-night/70" />
              <div className="h-2.5 w-2/3 rounded-full bg-line/70 dark:bg-line-night/70" />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
                Premium tone
              </span>
              <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                Keyword-rich
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-lilac/10 px-3 py-1 text-xs font-medium text-lilac">
                <SparkleIcon width="12" height="12" /> AI-drafted
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
