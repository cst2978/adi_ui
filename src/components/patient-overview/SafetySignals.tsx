import { toneChipStyles } from "@/components/patient-overview/toneStyles";
import type { LegacyPatientOverviewResponse } from "@/types/patient-overview";

type SafetySignalsProps = {
  data: LegacyPatientOverviewResponse["safetySignals"];
};

export default function SafetySignals({ data }: SafetySignalsProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-panel/80 p-6">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-ink-muted">
          {data.title}
        </p>
        <p className="text-sm text-ink-muted">{data.subtitle}</p>
      </div>
      <div className="mt-4 space-y-3">
        {data.signals.map((signal) => (
          <div
            key={signal.label}
            className="rounded-2xl border border-white/10 bg-panel-soft/60 p-4"
          >
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink">{signal.label}</span>
              <span
                className={`rounded-full border px-2 py-1 text-[10px] uppercase tracking-[0.25em] ${
                  toneChipStyles[signal.tone]
                }`}
              >
                {signal.status}
              </span>
            </div>
            <p className="mt-2 text-sm text-ink-muted">{signal.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
