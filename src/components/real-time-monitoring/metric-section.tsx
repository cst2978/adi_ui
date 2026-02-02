import type { MetricStandardResponse } from "@/lib/patientOverviewData";
import MetricCard from "@/components/real-time-monitoring/metric-card";

export default function MetricSection({
  title,
  metrics,
  actions,
  emptyMessage,
  showChart,
  range
}: {
  title: string;
  metrics: MetricStandardResponse[];
  actions?: React.ReactNode;
  emptyMessage?: string;
  showChart?: boolean;
  range?: string;
}) {
  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="ds-label">{title}</h3>
        {actions}
      </div>
      {metrics.length === 0 ? (
        <div className="ds-card p-6 text-sm text-ink-muted">
          {emptyMessage ?? "No data available."}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {metrics.map((metric) => (
            <MetricCard
              key={metric.metric_key}
              metric={metric}
              showChart={showChart}
              range={range}
            />
          ))}
        </div>
      )}
    </section>
  );
}
