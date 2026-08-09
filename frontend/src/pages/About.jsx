const steps = [
  {
    title: "Add your product",
    body: "Name it, and note the ingredients, weight, and features that matter, the same details you’d use for your product listing.",
  },
  {
    title: "Pick a tone",
    body: "Premium, traditional, health-focused, or something you define yourself. The AI writes to match it.",
  },
  {
    title: "Generate & refine",
    body: "Prodly drafts the listing copy in seconds. Edit inline, regenerate if it's not quite right, then copy it straight into your marketplace listing.",
  },
];

const values = [
  {
    title: "Built for the catalog, not just one listing",
    body: "Every product you write stays saved in your dashboard, so restocks, new products, and new lines don't mean starting from a blank page again.",
    accent: "text-brand border-brand/30 bg-brand/10",
  },
  {
    title: "Keyword-aware, not keyword-stuffed",
    body: "Descriptions are written to read naturally on a product page while still surfacing the ingredients, weight, and features shoppers and search algorithms look for.",
    accent: "text-accent border-accent/30 bg-accent/10",
  },
  {
    title: "You always have the final word",
    body: "AI drafts the copy; you can regenerate, rewrite, or fine-tune before anything goes live. Nothing publishes on its own.",
    accent: "text-lilac border-lilac/30 bg-lilac/10",
  },
];

function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="font-eyebrow text-xs text-brand">About Prodly</p>
      <h1 className="mt-3 font-display text-4xl font-semibold">
        Product copy shouldn't be the bottleneck.
      </h1>
      <p className="mt-5 text-ink-soft dark:text-ink-night-soft">
        Prodly is an AI-powered product description generator designed to help businesses create clear, professional product descriptions quickly.

      </p>

      <div className="mt-12 space-y-6">
        {steps.map((step, index) => (
          <div key={step.title} className="flex gap-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line font-mono text-sm dark:border-line-night">
              {index + 1}
            </span>
            <div>
              <h2 className="font-display text-lg font-semibold">
                {step.title}
              </h2>
              <p className="mt-1 text-sm text-ink-soft dark:text-ink-night-soft">
                {step.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-14 border-t border-line pt-10 dark:border-line-night">
        <p className="font-eyebrow text-xs text-brand">What we care about</p>
        <div className="mt-6 space-y-6">
          {values.map((value, index) => (
            <div key={value.title} className="flex gap-4">
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-mono text-sm ${value.accent}`}
              >
                {index + 1}
              </span>
              <div>
                <h2 className="font-display text-lg font-semibold">
                  {value.title}
                </h2>
                <p className="mt-1 text-sm text-ink-soft dark:text-ink-night-soft">
                  {value.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-14 rounded-2xl border border-dashed border-line bg-paper-soft p-6 dark:border-line-night dark:bg-paper-night-soft">
        <h2 className="font-display text-lg font-semibold">
          Questions or feedback?
        </h2>
        <p className="mt-2 text-sm text-ink-soft dark:text-ink-night-soft">
          Prodly is a small, focused tool and we're still shaping it. If
          something's missing or a description doesn't land right, that's
          useful to know — reach out any time at{" "}
          <a
            href="mailto:crnetizen09@gmail.com"
            className="font-medium text-brand hover:underline"
          >
            crnetizen09@gmail.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default About;
