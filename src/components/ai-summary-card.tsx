import type { AiSummary } from "@/lib/patientOverviewData";

export default function AiSummaryCard({
  summary
}: {
  summary: AiSummary | null;
}) {
  return (
    <section className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-panel/90 p-6 shadow-card">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-sm uppercase tracking-[0.3em] text-ink-muted">
            AI Summary
          </h3>
          {summary?.confidence != null ? (
            <span className="rounded-full bg-accent/20 px-3 py-1 text-xs text-ink">
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
