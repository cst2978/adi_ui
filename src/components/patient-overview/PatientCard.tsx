import { toneChipStyles } from "@/components/patient-overview/toneStyles";
import type { LegacyPatientOverviewResponse } from "@/types/patient-overview";

type PatientCardProps = {
  data: LegacyPatientOverviewResponse["patientCard"];
};

export default function PatientCard({ data }: PatientCardProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-panel/80 p-6">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.35em] text-ink-muted">
          {data.title}
        </p>
        <div>
          <h2 className="text-2xl font-semibold text-ink">{data.name}</h2>
          <p className="text-sm text-ink-muted">
            {data.idLabel}: {data.idValue}
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {data.tags.map((tag) => (
          <span
            key={tag.label}
            className={`rounded-full border px-3 py-1 text-xs font-medium ${
              toneChipStyles[tag.tone]
            }`}
          >
            {tag.label}
          </span>
        ))}
      </div>
      <div className="mt-6 grid gap-3 text-sm text-ink-muted">
        {data.fields.map((field) => (
          <div key={field.label} className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.25em]">
              {field.label}
            </span>
            <span className="text-sm text-ink">{field.value}</span>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-2xl border border-white/10 bg-panel-soft/70 p-4">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-ink-muted">
          <span>{data.risk.label}</span>
          <span className={`rounded-full border px-2 py-1 ${toneChipStyles[data.risk.tone]}`}>
            {data.risk.value}
          </span>
        </div>
        <p className="mt-3 text-sm text-ink">{data.risk.detail}</p>
      </div>
      <div className="mt-4 text-xs uppercase tracking-[0.25em] text-ink-muted">
        {data.lastUpdated.label}: {data.lastUpdated.value}
      </div>
    </section>
  );
}
