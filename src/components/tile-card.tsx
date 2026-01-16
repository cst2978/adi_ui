import type {
  MetricStandardResponse,
  TherapyResponse,
  TileResult
} from "@/lib/patientOverviewData";
import { formatDate } from "@/lib/formatters";

const statusStyles: Record<string, string> = {
  none: "bg-white/5 text-ink-muted",
  warning: "bg-warning/20 text-warning",
  critical: "bg-alert/20 text-alert",
  success: "bg-success/20 text-success"
};

export default function TileCard({ tile }: { tile: TileResult }) {
  if (!tile.data) {
    return (
      <div className="rounded-2xl border border-white/10 bg-panel/80 p-6">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-ink">{tile.tile.title}</h4>
          <span className="rounded-full bg-alert/20 px-2 py-1 text-xs text-alert">
            Missing
          </span>
        </div>
        <p className="mt-4 text-sm text-ink-muted">
          No mock response found for {tile.path || "this tile"}.
        </p>
      </div>
    );
  }

  if (tile.tile.response_schema === "metric_standard_v1") {
    return <MetricTile title={tile.tile.title} data={tile.data as MetricStandardResponse} />;
  }

  if (tile.tile.response_schema === "therapy_response_v1") {
    return (
      <TherapyTile title={tile.tile.title} data={tile.data as TherapyResponse} />
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-panel/80 p-6">
      <div className="text-sm text-ink-muted">Unsupported schema</div>
    </div>
  );
}

function MetricTile({
  title,
  data
}: {
  title: string;
  data: MetricStandardResponse;
}) {
  const current = data.data.current?.label ?? "N/A";
  const trend = data.data.trend?.delta_label ?? "No trend";
  const status = data.alerts?.status ?? "none";

  return (
    <div className="rounded-2xl border border-white/10 bg-panel/90 p-6 shadow-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-ink-muted">
            {title}
          </p>
          <p className="mt-3 text-3xl font-semibold text-ink">{current}</p>
          <p className="mt-2 text-xs text-ink-muted">{trend}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs ${statusStyles[status] ?? statusStyles.none}`}>
          {status}
        </span>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-ink-muted">
        <div className="rounded-xl border border-white/10 bg-panel-soft/80 p-3">
          <p className="uppercase tracking-[0.2em]">Baseline</p>
          <p className="mt-2 text-sm text-ink">{data.data.baseline?.label ?? "N/A"}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-panel-soft/80 p-3">
          <p className="uppercase tracking-[0.2em]">Current</p>
          <p className="mt-2 text-sm text-ink">{data.data.current?.label ?? "N/A"}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-panel-soft/80 p-3">
          <p className="uppercase tracking-[0.2em]">Cohort</p>
          <p className="mt-2 text-sm text-ink">{data.data.cohort?.label ?? "N/A"}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-panel-soft/80 p-3">
          <p className="uppercase tracking-[0.2em]">Average</p>
          <p className="mt-2 text-sm text-ink">{data.data.average?.label ?? "N/A"}</p>
        </div>
      </div>
    </div>
  );
}

function TherapyTile({ title, data }: { title: string; data: TherapyResponse }) {
  const status = data.alerts?.status ?? "none";
  const summary =
    data.response_summary ?? data.signals?.[0]?.response_summary ?? "N/A";

  return (
    <div className="rounded-2xl border border-white/10 bg-panel/90 p-6 shadow-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-ink-muted">
            {title}
          </p>
          <p className="mt-2 text-lg font-semibold text-ink">
            {data.therapy_name}
          </p>
          <p className="text-xs text-ink-muted">
            Started {formatDate(data.start_date)} - {data.status}
          </p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs ${statusStyles[status] ?? statusStyles.none}`}>
          {status}
        </span>
      </div>

      <p className="mt-4 text-sm text-ink">{summary}</p>

      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        {data.dose?.value != null ? (
          <span className="rounded-full bg-panel-soft px-3 py-1 text-ink">
            Dose {data.dose.value} {data.dose.units}
          </span>
        ) : (
          <span className="rounded-full bg-panel-soft px-3 py-1 text-ink-muted">
            Dose not specified
          </span>
        )}
      </div>

      <div className="mt-4 space-y-2">
        {data.signals?.map((signal, index) => (
          <div
            key={`${signal.metric_key}-${index}`}
            className="rounded-xl border border-white/10 bg-panel-soft/70 px-3 py-2 text-xs text-ink-muted"
          >
            <span className="uppercase tracking-[0.2em] text-ink">
              {signal.type}
            </span>
            <span className="ml-2 text-ink">{signal.note}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
