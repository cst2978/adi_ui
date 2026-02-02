import Link from "next/link";

const flows = [
  { label: "Patient Overview", enabled: true, href: "/patients/overview" },
  {
    label: "Real-time Monitoring",
    enabled: true,
    href: "/patients/realtime-monitoring"
  },
  {
    label: "Functional Assessment",
    enabled: true,
    href: "/patients/functional-assessment"
  },
  { label: "Biomarkers", enabled: false },
  { label: "Multi - Omics", enabled: false },
  {
    label: "Gen AI Playground",
    enabled: true,
    href: "/patients/gen-ai-playground"
  },
  { label: "Light Mode - Functional Assessment", enabled: false },
  { label: "Dynamic Dashboard", enabled: false },
  { label: "Disease Progression", enabled: false },
  {
    label: "Cohort Analysis",
    enabled: true,
    href: "/patients/cohort-analysis"
  }
];

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-72 flex-col border-r border-white/10 bg-panel/80 px-5 py-6">
      <div className="space-y-2">
        <div className="ds-label">Flows</div>
        <nav className="space-y-1">
          {flows.map((flow) => {
            if (flow.enabled && flow.href) {
              return (
                <Link
                  key={flow.label}
                  href={flow.href}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-ink shadow-glow transition hover:border-white/30"
                >
                  <span>{flow.label}</span>
                  <span className="ds-chip">Live</span>
                </Link>
              );
            }

            return (
              <div
                key={flow.label}
                className="flex cursor-not-allowed items-center justify-between rounded-xl border border-white/5 bg-panel-soft/60 px-4 py-3 text-sm text-ink-muted"
              >
                <span>{flow.label}</span>
                <span className="ds-chip">Soon</span>
              </div>
            );
          })}
        </nav>
      </div>
      <div className="ds-card mt-auto p-4 text-xs text-ink-muted">
        <p className="ds-label">Phase 1</p>
        <p className="mt-2 ds-body">
          Patient Overview enabled. Additional flows queued.
        </p>
      </div>
    </aside>
  );
}
