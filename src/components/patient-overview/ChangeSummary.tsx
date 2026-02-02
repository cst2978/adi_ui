import type { LegacyPatientOverviewResponse } from "@/types/patient-overview";

type ChangeSummaryProps = {
  data: LegacyPatientOverviewResponse["changeSummary"];
};

export default function ChangeSummary({ data }: ChangeSummaryProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-panel/80 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-ink-muted">
            {data.title}
          </p>
          <p className="mt-3 text-sm text-ink-muted">{data.summary}</p>
        </div>
      </div>
      <div className="mt-6 grid gap-3">
        {data.highlights.map((highlight) => (
          <div
            key={highlight.label}
            className="rounded-2xl border border-white/10 bg-panel-soft/60 p-4"
          >
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink">{highlight.label}</span>
              <span className="text-ink font-semibold">{highlight.value}</span>
            </div>
            <p className="mt-2 text-xs uppercase tracking-[0.25em] text-ink-muted">
              {highlight.trend}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-6 grid gap-2 text-xs uppercase tracking-[0.25em] text-ink-muted">
        {data.meta.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <span>{item.label}</span>
            <span className="text-ink">{item.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
