export default function CohortAnalysisPage() {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h2 className="ds-page-title">Cohort Analysis</h2>
        <p className="ds-body">
          Population trends, cohort comparisons, and stratified insights.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="ds-card p-6">
          <p className="ds-label">Coming soon</p>
          <p className="ds-body mt-3">
            Upload cohort definitions to compare outcomes, biomarkers, and
            therapy response at a population level.
          </p>
        </div>
        <div className="ds-card p-6">
          <p className="ds-label">Planned modules</p>
          <p className="ds-body mt-3">
            Distribution overlays, delta-to-baseline analysis, and cohort
            benchmarking dashboards.
          </p>
        </div>
        <div className="ds-card p-6">
          <p className="ds-label">Data readiness</p>
          <p className="ds-body mt-3">
            Connect longitudinal metrics to start cohort-level summarization.
          </p>
        </div>
      </div>
    </div>
  );
}
