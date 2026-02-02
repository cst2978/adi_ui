import type { LegacyPatientOverviewResponse } from "@/types/patient-overview";

type MultispecialtySnapshotProps = {
  data: LegacyPatientOverviewResponse["multispecialtySnapshot"];
};

export default function MultispecialtySnapshot({
  data
}: MultispecialtySnapshotProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-panel/80 p-6">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-ink-muted">
          {data.title}
        </p>
        <p className="text-sm text-ink-muted">{data.subtitle}</p>
      </div>
      <div className="mt-4 space-y-4">
        {data.items.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-white/10 bg-panel-soft/60 p-4"
          >
            <div className="text-xs uppercase tracking-[0.25em] text-ink-muted">
              {item.label}
            </div>
            <p className="mt-2 text-sm text-ink">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
