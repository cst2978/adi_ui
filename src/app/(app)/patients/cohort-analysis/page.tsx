export default function CohortAnalysisPage() {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-2xl font-semibold text-ink">Cohort Analysis</h2>
        <p className="text-sm text-ink-muted">
          Population trends, cohort comparisons, and stratified insights.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-panel/80 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-ink-muted">
            Coming soon
          </p>
          <p className="mt-3 text-sm text-ink-muted">
            Upload cohort definitions to compare outcomes, biomarkers, and
            therapy response at a population level.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-panel/80 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-ink-muted">
            Planned modules
          </p>
          <p className="mt-3 text-sm text-ink-muted">
            Distribution overlays, delta-to-baseline analysis, and cohort
            benchmarking dashboards.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-panel/80 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-ink-muted">
            Data readiness
          </p>
          <p className="mt-3 text-sm text-ink-muted">
            Connect longitudinal metrics to start cohort-level summarization.
          </p>
        </div>
      </div>
    </div>
  );
}
