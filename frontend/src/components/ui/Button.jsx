/**
 * Button
 * Props: variant ("primary" | "secondary" | "outline" | "ghost" | "danger"),
 * size ("sm" | "md" | "lg"), disabled, loading, type, onClick
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  type = "button",
  className = "",
  onClick,
  ...rest
}) {
  const variants = {
    primary:
      "bg-brand text-white hover:bg-brand-dark disabled:hover:bg-brand",
    secondary:
      "bg-ink text-paper hover:bg-ink/90 dark:bg-ink-night dark:text-paper-night dark:hover:bg-ink-night/90",
    outline:
      "border border-line text-ink hover:bg-paper-soft dark:border-line-night dark:text-ink-night dark:hover:bg-paper-night-soft",
    ghost:
      "text-ink-soft hover:text-ink hover:bg-paper-soft dark:text-ink-night-soft dark:hover:text-ink-night dark:hover:bg-paper-night-soft",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {loading && (
        <span
          className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  );
}

export default Button;
