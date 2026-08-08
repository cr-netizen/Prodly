/**
 * Modal
 * Props: isOpen, onClose, title, children, footer
 */
import { useEffect, useRef } from "react";

function Modal({ isOpen, onClose, title, children, footer }) {
  const dialogRef = useRef(null);
  // Callers commonly pass a fresh inline function for onClose on every
  // render (e.g. onClose={() => setOpen(false)}). Keeping that reference
  // out of the effect's dependency array (and reading it via a ref
  // instead) means the effect only runs when the modal actually opens or
  // closes — not on every keystroke inside the modal, which previously
  // re-ran dialogRef.current.focus() and yanked focus out of inputs.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKey = (e) => {
      if (e.key === "Escape") onCloseRef.current();
    };

    window.addEventListener("keydown", handleKey);
    dialogRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-line bg-paper p-6 shadow-xl outline-none dark:border-line-night dark:bg-paper-night"
      >
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2
            id="modal-title"
            className="font-display text-xl font-semibold text-ink dark:text-ink-night"
          >
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink-soft transition hover:bg-paper-soft dark:text-ink-night-soft dark:hover:bg-paper-night-soft"
          >
            ✕
          </button>
        </div>

        {children}

        {footer && <div className="mt-6 flex justify-end gap-3">{footer}</div>}
      </div>
    </div>
  );
}

export default Modal;
