import type { MetricStandardResponse } from "@/lib/patientOverviewData";
import { formatDate } from "@/lib/formatters";

const statusStyles: Record<string, string> = {
  none: "bg-white/5 text-ink-muted",
  warning: "bg-warning/20 text-warning",
  critical: "bg-alert/20 text-alert",
  success: "bg-success/20 text-success"
};

export default function MetricCard({
  metric,
  showChart,
  range
}: {
  metric: MetricStandardResponse;
  showChart?: boolean;
  range?: string;
}) {
  const latest = metric.data.current?.label ?? "N/A";
  const status = metric.alerts?.status ?? "none";
  const timeline = metric.data.timeline?.label ?? "N/A";
  const alertNote = metric.alerts?.reasons?.join(", ") ?? "";
  const series = getSeries(metric, range);

  return (
    <div className="rounded-2xl border border-white/10 bg-panel/90 p-5 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-ink-muted">
            {metric.title}
          </p>
          <p className="mt-3 text-2xl font-semibold text-ink">{latest}</p>
          <p className="text-xs text-ink-muted">
            Latest {formatDate(metric.data.current?.recorded_at)}
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs ${
            statusStyles[status] ?? statusStyles.none
          }`}
        >
          {status}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-ink-muted">
        <div className="rounded-xl border border-white/10 bg-panel-soft/80 p-3">
          <p className="uppercase tracking-[0.2em]">Average</p>
          <p className="mt-2 text-sm text-ink">
            {metric.data.average?.label ?? "N/A"}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-panel-soft/80 p-3">
          <p className="uppercase tracking-[0.2em]">Cohort</p>
          <p className="mt-2 text-sm text-ink">
            {metric.data.cohort?.label ?? "N/A"}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-panel-soft/80 p-3">
          <p className="uppercase tracking-[0.2em]">Baseline</p>
          <p className="mt-2 text-sm text-ink">
            {metric.data.baseline?.label ?? "N/A"}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-panel-soft/80 p-3">
          <p className="uppercase tracking-[0.2em]">Trend</p>
          <p className="mt-2 text-sm text-ink">
            {metric.data.trend?.delta_label ?? "N/A"}
          </p>
        </div>
      </div>

      {showChart && series.length > 1 ? (
        <div className="mt-4 rounded-xl border border-white/10 bg-panel-soft/70 px-3 py-3">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-ink-muted">
            <span>{range ? `${range} Trend` : "Trend"}</span>
            <span className="text-ink">
              {series[0]?.date} - {series[series.length - 1]?.date}
            </span>
          </div>
          <div className="mt-3 h-24">
            <TrendLine series={series} />
          </div>
        </div>
      ) : null}

      <div className="mt-4 flex items-center justify-between text-xs text-ink-muted">
        <span className="uppercase tracking-[0.25em]">Dates</span>
        <span className="text-ink">{timeline}</span>
      </div>
      {alertNote ? (
        <div className="mt-3 text-xs text-warning">Alerts: {alertNote}</div>
      ) : null}
    </div>
  );
}

function getSeries(metric: MetricStandardResponse, range?: string) {
  const series = metric.data.series ?? [];
  if (!range || series.length === 0) {
    return series;
  }

  const last = series[series.length - 1];
  const lastDate = new Date(last.date);
  if (Number.isNaN(lastDate.getTime())) {
    return series;
  }

  const monthsByRange: Record<string, number> = {
    "1M": 1,
    "2M": 2,
    "3M": 3,
    "6M": 6,
    Y: 12
  };
  const months = monthsByRange[range] ?? 0;
  if (!months) {
    return series;
  }

  const cutoff = new Date(lastDate);
  cutoff.setMonth(cutoff.getMonth() - months);

  return series.filter((point) => new Date(point.date) >= cutoff);
}

function TrendLine({ series }: { series: Array<{ date: string; value: number }> }) {
  const values = series.map((point) => point.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const points = series
    .map((point, index) => {
      const x = (index / (series.length - 1)) * 100;
      const y = 100 - ((point.value - min) / range) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      <defs>
        <linearGradient id="trendLine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(90, 130, 255, 0.6)" />
          <stop offset="100%" stopColor="rgba(90, 130, 255, 0)" />
        </linearGradient>
      </defs>
      <polyline
        points={points}
        fill="none"
        stroke="rgba(90, 130, 255, 0.85)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polygon
        points={`0,100 ${points} 100,100`}
        fill="url(#trendLine)"
        opacity="0.8"
      />
    </svg>
  );
}
