import type { AiSummary } from "@/lib/patientOverviewData";

export default function AiSummaryCard({
  summary
}: {
  summary: AiSummary | null;
}) {
  return (
    <section className="ds-card flex h-full flex-col justify-between p-6">
      <div>
        <div className="flex items-center justify-between">
          <p className="ds-label">AI Summary</p>
          {summary?.confidence != null ? (
            <span className="ds-chip">
              {(summary.confidence * 100).toFixed(0)}% confidence
            </span>
          ) : null}
        </div>
        <p className="mt-4 text-sm leading-relaxed text-ink">
          {summary?.summary ?? "Summary not available for this patient."}
        </p>
      </div>
      <div className="mt-6 text-xs text-ink-muted">
        {summary?.generated_at
          ? `Generated ${new Date(summary.generated_at).toLocaleString()}`
          : "Awaiting model response"}
      </div>
    </section>
  );
}
