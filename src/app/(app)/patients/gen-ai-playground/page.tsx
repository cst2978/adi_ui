export default function GenAiPlaygroundPage() {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h2 className="ds-page-title">Gen AI Playground</h2>
        <p className="ds-body">
          Prototype prompts, summaries, and cohort narratives before deployment.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <div className="ds-card p-6">
          <p className="ds-label">Coming soon</p>
          <p className="ds-body mt-3">
            A sandbox for drafting clinical summaries, visual trend narratives,
            and alert explanations using Gen AI.
          </p>
          <div className="mt-6 rounded-xl border border-white/10 bg-panel-soft/70 p-4">
            <p className="ds-body">
              Prompt workspace and output preview will appear here.
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="ds-card p-6">
            <p className="ds-label">Example use cases</p>
            <ul className="ds-body mt-3 space-y-2">
              <li>AI-generated visit summaries with structured highlights.</li>
              <li>Trend explanations for clinician-ready notes.</li>
              <li>Safety alert rewording with recommended actions.</li>
            </ul>
          </div>
          <div className="ds-card p-6">
            <p className="ds-label">Data sources</p>
            <p className="ds-body mt-3">
              This workspace will pull from patient timelines, biomarker panels,
              and monitoring feeds once connected.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
