import type { CSSProperties } from "react";

type TimeSeriesPlaceholderProps = {
  title: string;
  description?: string;
  height?: number;
  placeholder: string;
};

export default function TimeSeriesPlaceholder({
  title,
  description,
  height = 220,
  placeholder
}: TimeSeriesPlaceholderProps) {
  const chartStyle: CSSProperties = {
    height
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-panel/70 p-4">
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-[0.3em] text-ink-muted">
          {title}
        </p>
        {description ? (
          <p className="text-sm text-ink-muted">{description}</p>
        ) : null}
      </div>
      <div
        className="mt-4 flex items-center justify-center rounded-xl border border-dashed border-white/20 bg-panel-soft/60 text-sm text-ink-muted"
        style={chartStyle}
      >
        {placeholder}
      </div>
    </div>
  );
}
