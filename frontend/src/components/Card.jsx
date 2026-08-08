import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden="true">
      <rect x="8.5" y="8.5" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M15 8.5V6.5A2 2 0 0 0 13 4.5H6.5a2 2 0 0 0-2 2V13a2 2 0 0 0 2 2h2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Card({ id, title, description, onDelete, onEdit, deleting = false }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!description) return;

    try {
      await navigator.clipboard.writeText(description);
      setCopied(true);
      toast.success("Description copied.");
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Couldn't copy. Please try again.");
    }
  };

  return (
    <div className="group relative flex flex-col rounded-2xl border border-line bg-paper-soft p-5 pl-8 transition-shadow hover:shadow-md dark:border-line-night dark:bg-paper-night-soft">
      {/* Hang-tag punch hole */}
      <span
        aria-hidden="true"
        className="absolute left-4 top-5 h-3 w-3 rounded-full border border-line bg-paper dark:border-line-night dark:bg-paper-night"
      />

      <Link to={`/products/${id}`} className="flex-1">
        <h3 className="font-display text-lg font-semibold text-ink line-clamp-1 dark:text-ink-night">
          {title || "Untitled product"}
        </h3>

        <p className="mt-2 text-sm text-ink-soft line-clamp-3 dark:text-ink-night-soft">
          {description || "No description yet."}
        </p>
      </Link>

      <div className="mt-4 flex gap-3 border-t border-dashed border-line pt-4 dark:border-line-night">
        <Link
          to={`/products/${id}`}
          className="text-sm font-medium text-brand hover:underline"
        >
          View
        </Link>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(id);
          }}
          className="text-sm font-medium text-ink-soft hover:text-ink dark:text-ink-night-soft dark:hover:text-ink-night"
        >
          Edit
        </button>

        {description && (
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy description"
            title="Copy description"
            className={`transition ${
              copied
                ? "text-brand"
                : "text-ink-soft hover:text-ink dark:text-ink-night-soft dark:hover:text-ink-night"
            }`}
          >
            <CopyIcon />
          </button>
        )}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
          disabled={deleting}
          className="ml-auto text-sm font-medium text-red-500 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {deleting ? "Deleting…" : "Delete"}
        </button>
      </div>
    </div>
  );
}

export default Card;
