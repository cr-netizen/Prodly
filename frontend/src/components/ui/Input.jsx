/**
 * Input
 * Props: label, placeholder, type, value, onChange, error, hint,
 * required, name, id, as ("input" | "textarea"), rows
 */
import { useId } from "react";

function Input({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  error,
  hint,
  required = false,
  name,
  id,
  as = "input",
  rows = 4,
  className = "",
  ...rest
}) {
  const autoId = useId();
  const inputId = id || autoId;
  const errorId = `${inputId}-error`;
  const hintId = `${inputId}-hint`;

  const fieldClass = `w-full rounded-lg border bg-paper px-3 py-2 text-sm text-ink placeholder:text-ink-soft/60 transition-colors focus:outline-none focus:ring-2 focus:ring-brand disabled:cursor-not-allowed disabled:opacity-60 dark:bg-paper-night dark:text-ink-night ${
    error
      ? "border-red-500"
      : "border-line dark:border-line-night"
  } ${className}`;

  return (
    <div>
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm font-medium text-ink dark:text-ink-night"
        >
          {label}
          {required && <span className="ml-0.5 text-accent">*</span>}
        </label>
      )}

      {as === "textarea" ? (
        <textarea
          id={inputId}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : hint ? hintId : undefined}
          className={fieldClass}
          {...rest}
        />
      ) : (
        <input
          id={inputId}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : hint ? hintId : undefined}
          className={fieldClass}
          {...rest}
        />
      )}

      {error ? (
        <p id={errorId} className="mt-1.5 text-sm text-red-500">
          {error}
        </p>
      ) : hint ? (
        <p
          id={hintId}
          className="mt-1.5 text-sm text-ink-soft dark:text-ink-night-soft"
        >
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export default Input;
