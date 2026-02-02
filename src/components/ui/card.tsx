type CardProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "soft" | "outline";
};

const variantClasses: Record<NonNullable<CardProps["variant"]>, string> = {
  default: "ds-card",
  soft: "ds-card ds-card-soft",
  outline: "ds-card ds-card-outline"
};

export function Card({
  children,
  className,
  variant = "default"
}: CardProps) {
  return (
    <div className={[variantClasses[variant], className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}

export function CardBody({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
