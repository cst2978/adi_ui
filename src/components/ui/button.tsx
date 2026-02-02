type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export default function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  const base = "ds-button";
  const variantClass =
    variant === "ghost" ? "ds-button-ghost" : "ds-button-primary";

  return (
    <button
      {...props}
      className={[base, variantClass, className].filter(Boolean).join(" ")}
    >
      {children}
    </button>
  );
}
