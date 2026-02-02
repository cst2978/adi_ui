type SearchInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  wrapperClassName?: string;
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
  prefixClassName?: string;
};

export default function SearchInput({
  wrapperClassName,
  suffix,
  prefix,
  prefixClassName,
  className,
  ...props
}: SearchInputProps) {
  return (
    <div className={["relative", wrapperClassName].filter(Boolean).join(" ")}>
      {prefix ? (
        <div
          className={[
            "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2",
            prefixClassName
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {prefix}
        </div>
      ) : null}
      <input {...props} className={["ds-input w-full", className].filter(Boolean).join(" ")} />
      {suffix ? (
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-[0.3em] text-ink-muted">
          {suffix}
        </div>
      ) : null}
    </div>
  );
}
