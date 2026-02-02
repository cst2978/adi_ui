type SparklinePlaceholderProps = {
  title: string;
  description?: string;
  placeholder: string;
};

export default function SparklinePlaceholder({
  title,
  description,
  placeholder
}: SparklinePlaceholderProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-panel/70 p-4">
      <div className="text-xs uppercase tracking-[0.3em] text-ink-muted">
        {title}
      </div>
      {description ? (
        <p className="mt-2 text-sm text-ink-muted">{description}</p>
      ) : null}
      <div className="mt-3 flex h-24 items-center justify-center rounded-xl border border-dashed border-white/20 bg-panel-soft/60 text-sm text-ink-muted">
        {placeholder}
      </div>
    </div>
  );
}
