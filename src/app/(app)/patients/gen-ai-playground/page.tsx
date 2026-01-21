export default function GenAiPlaygroundPage() {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-2xl font-semibold text-ink">Gen AI Playground</h2>
        <p className="text-sm text-ink-muted">
          Prototype prompts, summaries, and cohort narratives before deployment.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-2xl border border-white/10 bg-panel/80 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-ink-muted">
            Coming soon
          </p>
          <p className="mt-3 text-sm text-ink-muted">
            A sandbox for drafting clinical summaries, visual trend narratives,
            and alert explanations using Gen AI.
          </p>
          <div className="mt-6 rounded-xl border border-white/10 bg-panel-soft/70 p-4 text-sm text-ink-muted">
            Prompt workspace and output preview will appear here.
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-panel/80 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-ink-muted">
              Example use cases
            </p>
            <ul className="mt-3 space-y-2 text-sm text-ink-muted">
              <li>AI-generated visit summaries with structured highlights.</li>
              <li>Trend explanations for clinician-ready notes.</li>
              <li>Safety alert rewording with recommended actions.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-panel/80 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-ink-muted">
              Data sources
            </p>
            <p className="mt-3 text-sm text-ink-muted">
              This workspace will pull from patient timelines, biomarker panels,
              and monitoring feeds once connected.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
