import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import { useAuth } from "../context/useAuth";

const features = [
  {
    eyebrow: "01",
    title: "Organize your catalog",
    body: "Every product lives in one dashboard — create, edit, and remove entries without digging through spreadsheets.",
    accent: "text-brand border-brand/30 bg-brand/10",
  },
  {
    eyebrow: "02",
    title: "Generate with AI",
    body: "Feed in ingredients, weight, features, and tone. Get a ready-to-publish description back in seconds.",
    accent: "text-accent border-accent/30 bg-accent/10",
  },
  {
    eyebrow: "03",
    title: "Edit with confidence",
    body: "Every change saves instantly and updates your dashboard — no refresh, no lost work.",
    accent: "text-lilac border-lilac/30 bg-lilac/10",
  },
];

function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Hero />

      <section className="border-t border-line bg-paper-soft py-16 dark:border-line-night dark:bg-paper-night-soft">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="font-eyebrow text-xs text-ink-soft dark:text-ink-night-soft">
            How Prodly works
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold">
            From product notes to polished copy.
          </h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-line bg-paper p-6 dark:border-line-night dark:bg-paper-night"
              >
                <span
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-full border font-mono text-sm ${feature.accent}`}
                >
                  {feature.eyebrow}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-ink-soft dark:text-ink-night-soft">
                  {feature.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
        <h2 className="font-display text-3xl font-semibold">
          Ready to write your next listing?
        </h2>
        <p className="mt-3 text-ink-soft dark:text-ink-night-soft">
          It takes less than a minute to create your first product.
        </p>
        <Link
          to={isAuthenticated ? "/dashboard" : "/register"}
          className="mt-6 inline-block rounded-full bg-brand px-6 py-3 text-sm font-medium text-white transition hover:bg-brand-dark"
        >
          {isAuthenticated ? "Go to dashboard" : "Create a free account"}
        </Link>
      </section>
    </>
  );
}

export default Home;
