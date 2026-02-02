type TypographyProps = {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children: React.ReactNode;
};

function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function PageTitle({
  as: Component = "h1",
  className,
  children
}: TypographyProps) {
  return (
    <Component className={joinClasses("ds-page-title", className)}>
      {children}
    </Component>
  );
}

export function SectionTitle({
  as: Component = "h2",
  className,
  children
}: TypographyProps) {
  return (
    <Component className={joinClasses("ds-section-title", className)}>
      {children}
    </Component>
  );
}

export function CardTitle({
  as: Component = "h3",
  className,
  children
}: TypographyProps) {
  return (
    <Component className={joinClasses("ds-card-title", className)}>
      {children}
    </Component>
  );
}

export function Label({
  as: Component = "span",
  className,
  children
}: TypographyProps) {
  return (
    <Component className={joinClasses("ds-label", className)}>
      {children}
    </Component>
  );
}

export function Body({
  as: Component = "p",
  className,
  children
}: TypographyProps) {
  return (
    <Component className={joinClasses("ds-body", className)}>
      {children}
    </Component>
  );
}

export function Value({
  as: Component = "span",
  className,
  children
}: TypographyProps) {
  return (
    <Component className={joinClasses("ds-value", className)}>
      {children}
    </Component>
  );
}

export function Caption({
  as: Component = "span",
  className,
  children
}: TypographyProps) {
  return (
    <Component className={joinClasses("ds-caption", className)}>
      {children}
    </Component>
  );
}
