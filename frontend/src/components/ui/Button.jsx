/**
 * Button Component
 * Props:
 * variant
 * size
 * disabled
 * onClick
 */

function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
}) {

  const variants = {
    primary:
      "bg-blue-500 text-white",

    secondary:
      "bg-gray-500 text-white",

    outline:
      "border border-gray-500",
  };

  const sizes = {
    sm: "px-2 py-1",
    md: "px-4 py-2",
    lg: "px-6 py-3",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${variants[variant]} ${sizes[size]} rounded`}
    >
      {children}
    </button>
  );
}

export default Button;