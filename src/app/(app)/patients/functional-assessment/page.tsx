import { formatAge, formatDate } from "@/lib/formatters";
import {
  getPatientById,
  getPatientList,
  type MetricStandardResponse
} from "@/lib/patientOverviewData";
import PatientSelector from "@/components/patient-selector";
import {
  getFunctionalAssessment,
  type SeriesPoint
} from "@/lib/functionalAssessmentData";
import { Body, PageTitle } from "@/components/ui/typography";

const defaultKpiTabs = [
  "Functional Mobility KPIs",
  "Therapy Response",
  "Emerging risks",
  "Predictions (KPI wise)",
  "Care plan"
];

const defaultAlertRows = [
  {
    alert: "Rhabdomyolysis potential",
    risk: "High",
    recommendation: "Reduce exertion, recheck CK in 48h"
  },
  {
    alert: "Fibrosis progressing",
    risk: "Moderate",
    recommendation: "Consider antifibrotic intervention"
  },
  {
    alert: "Grip strength stabilizing",
    risk: "Positive",
    recommendation: "Continue therapy, monitor biweekly"
  }
];

const defaultVideoCards = [
  { label: "6MWT" },
  { label: "Sit to Stand" },
  { label: "Stair Climb" },
  { label: "Reach / ULF" },
  { label: "Rise Test" }
];

const defaultCompositeScore = {
  value: 76,
  trend: "up" as const,
  detail:
    "Declined from 84 to 76 over 6 months (down 6 pts), indicating moderate progression."
};

const fallbackSeries: SeriesPoint[] = [
  { date: "2025-01-01", value: 68 },
  { date: "2025-02-01", value: 66 },
  { date: "2025-03-01", value: 64 },
  { date: "2025-04-01", value: 62 },
  { date: "2025-05-01", value: 61 },
  { date: "2025-06-01", value: 60 }
];

const formatMetricValue = (metric: MetricStandardResponse | null) => {
  if (metric?.data?.current?.value == null) return "N/A";
  const units = metric.units ? ` ${metric.units}` : "";
  return `${metric.data.current.value}${units}`;
};

const buildChartPoints = (series: SeriesPoint[]) => {
  const values = series.map((point) => point.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const pointCount = series.length - 1 || 1;

  return series
    .map((point, index) => {
      const x = (index / pointCount) * 100;
      const y = 90 - ((point.value - min) / range) * 70;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
};

export default async function FunctionalAssessmentPage({
  searchParams
}: {
  searchParams: { patient?: string };
}) {
  const patients = getPatientList();
  const defaultPatientId = patients[0]?.patient_id;
  const selectedId = searchParams.patient ?? defaultPatientId;
  const patient = selectedId ? getPatientById(selectedId) : null;

  if (!patient) {
    return (
      <div className="rounded-2xl border border-white/10 bg-panel/80 p-6 text-ink">
        No patients available.
      </div>
    );
  }

  const payload = await getFunctionalAssessment(patient.patient_id);
  const header = payload?.patient_header ?? {
    name: patient.patient_name,
    gender: patient.gender,
    date_of_birth: patient.date_of_birth,
    diagnosis: patient.primary_diagnosis,
    risk_level: patient.risk_level
  };
  const aiSummary = payload?.ai_summary ?? null;
  const composite = payload?.composite_score ?? defaultCompositeScore;
  const kpiTabs = payload?.kpi_tabs ?? defaultKpiTabs;
  const sources = payload?.sources ?? {
    active: "Functional",
    options: ["Functional", "Clinical"]
  };
  const mobilityMetrics = payload?.mobility_summary?.metrics ?? [
    { label: "6MWT", metric: null },
    { label: "NSAA", metric: null }
  ];
  const series = payload?.trend?.series ?? fallbackSeries;
  const chartSeries = series.length ? series : fallbackSeries;
  const chartPoints = buildChartPoints(chartSeries);
  const activeKpiTab = kpiTabs[0] ?? "Functional Mobility KPIs";
  const trendIsDown = composite.trend === "down";
  const trendIsStable = composite.trend === "stable";
  const trendColor = trendIsDown
    ? "text-alert"
    : trendIsStable
      ? "text-ink-muted"
      : "text-success";
  const trendBadge = trendIsDown
    ? "bg-alert/20"
    : trendIsStable
      ? "bg-white/10"
      : "bg-success/20";

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <PageTitle>Functional Assessment</PageTitle>
          <Body>Functional score summary for {patient.patient_id}</Body>
        </div>
        <PatientSelector
          patients={patients}
          selectedId={patient.patient_id}
          basePath="/patients/functional-assessment"
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_1.1fr_1.2fr]">
        <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-panel/80 p-6 shadow-card">
          <div className="flex items-start gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/5 text-xl font-semibold text-ink">
              {header.name
                ? header.name
                    .split(" ")
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join("")
                : "NA"}
            </div>
            <div className="space-y-2">
              <p className="text-base font-semibold text-ink">
                {header.name ?? patient.patient_name}
              </p>
              <div className="flex items-center gap-2 text-sm text-ink-muted">
                <span className="rounded-md bg-accent/20 px-2 py-0.5 text-xs font-semibold text-ink">
                  {(header.gender ?? "N").slice(0, 1).toUpperCase()}
                </span>
                <span>
                  {formatDate(header.date_of_birth)} -
                  {" "}
                  {formatAge(header.date_of_birth)}
                </span>
              </div>
              <p className="text-sm text-ink-muted">
                {header.diagnosis ??
                  patient.primary_diagnosis ??
                  "Primary diagnosis not available"}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-alert/20 px-3 py-1 text-xs font-semibold text-alert">
                  {header.risk_level ?? patient.risk_level ?? "Risk unknown"}
                </span>
                <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-ink-muted">
                  Full Details
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="relative rounded-2xl border border-white/10 bg-panel/80 p-6 shadow-card">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-ink-muted">
              AI Summary
            </h3>
            <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-ink-muted">
              {payload?.updated_at
                ? formatDate(payload.updated_at)
                : aiSummary?.generated_at
                  ? formatDate(aiSummary.generated_at)
                  : "Latest"}
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-ink">
            {aiSummary?.summary ??
              "Patient shows early signs of declining lower limb function with increased upper body compensation and slower gait."}
          </p>
          <p className="mt-4 text-xs text-ink-muted">
            {aiSummary?.generated_at
              ? `Time: ${new Date(aiSummary.generated_at).toLocaleTimeString()}`
              : "Time: 07:45 AM"}
          </p>
        </section>

        <section className="relative rounded-2xl border border-white/10 bg-panel/80 p-6 shadow-card">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-ink-muted">
              Composite Functional Score
            </h3>
            <div className="flex items-center gap-2 text-lg font-semibold text-ink">
              {composite.value}
              <span
                className={`inline-flex h-4 w-4 items-center justify-center rounded-full ${trendBadge}`}
              >
                <svg
                  aria-hidden="true"
                  className={`h-3 w-3 ${trendColor} ${trendIsDown ? "rotate-180" : ""}`}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  {trendIsStable ? (
                    <path d="M5 11h14v2H5z" />
                  ) : (
                    <path d="M12 5l6 7h-4v7h-4v-7H6l6-7z" />
                  )}
                </svg>
              </span>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            {[
              "Score breakdown",
              "Functional Domains",
              "Sources"
            ].map((label) => (
              <button
                key={label}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs text-ink-muted"
              >
                {label}
              </button>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-white/10 bg-panel-soft/70 p-3 text-xs text-ink">
            {composite.detail}
          </div>
        </section>
      </div>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {kpiTabs.map((tab) => (
              <button
                key={tab}
                className={`rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.3em] transition ${
                  tab === activeKpiTab
                    ? "bg-accent/20 text-ink"
                    : "border border-white/10 bg-white/5 text-ink-muted"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 text-xs text-ink-muted">
            <span>Sources</span>
            <div className="flex rounded-full border border-white/10 bg-white/5 p-1">
              {sources.options.map((label) => {
                const isActive = sources.active === label;
                return (
                  <button
                    key={label}
                    className={`rounded-full px-3 py-1 text-xs ${
                      isActive ? "bg-accent/30 text-ink" : "text-ink-muted"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <p className="text-xs text-ink-muted">
          Tracks changes in core motor functions over time based on clinical and
          at-home assessments to identify deterioration, stability, or
          improvement in ambulation and physical capacity.
        </p>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_2fr]">
        <section className="rounded-2xl border border-white/10 bg-panel/80 p-6 shadow-card">
          <div className="flex items-center gap-3">
            <h3 className="text-sm font-semibold text-ink">Mobility Summary</h3>
            <span className="text-xs text-ink-muted">
              {formatDate(
                payload?.mobility_summary?.summary_date ?? "2025-04-25"
              )}
            </span>
            <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-ink-muted">
              Latest
            </span>
          </div>

          <div className="mt-4 space-y-4">
            {mobilityMetrics.map(({ label, metric, status }) => {
              const metricStatus = status ?? metric?.alerts?.status ?? "none";
              const hasAlerts = metricStatus !== "none" && metricStatus !== "ok";
              return (
                <div
                  key={label}
                  className="rounded-xl border border-white/10 bg-panel-soft/70 p-4"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-ink">{label}</p>
                    <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-ink-muted">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          hasAlerts ? "bg-alert" : "bg-success"
                        }`}
                      />
                      {hasAlerts ? "Alerts" : "Stable"}
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-ink-muted">
                        Latest
                      </p>
                      <p className="text-xl font-semibold text-ink">
                        {formatMetricValue(metric)}
                      </p>
                      <p className="text-xs text-ink-muted">
                        {formatDate(metric?.data?.current?.recorded_at)}
                      </p>
                    </div>
                    <div className="text-right text-xs">
                      <p className="text-ink-muted">Cohort</p>
                      <p className="text-ink">
                        {metric?.data?.cohort?.label ?? "N/A"}
                      </p>
                      <p className="mt-2 text-ink-muted">Baseline</p>
                      <p className="text-ink">
                        {metric?.data?.baseline?.label ?? "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="rounded-xl border border-white/10 bg-panel-soft/70 p-3 text-xs text-ink">
              {payload?.mobility_summary?.note ??
                "Mobility levels stable; mild decline in stair climbing speed and endurance over last 2 weeks."}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-panel/80 p-6 shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-ink">
                {payload?.trend?.title ?? "Lower Limb Functional Trend"}
              </h3>
              <p className="text-xs text-ink-muted">
                {payload?.trend?.subtitle ??
                  "6MWT distance compared with cohort average"}
              </p>
            </div>
            <div className="text-right text-xs text-ink-muted">
              <p>Latest</p>
              <p className="text-lg font-semibold text-ink">
                {payload?.trend?.latest_value_label ??
                  formatMetricValue(mobilityMetrics[0]?.metric ?? null)}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-panel-soft/60 p-4">
            <svg
              className="h-40 w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(90,130,255,0.35)" />
                  <stop offset="100%" stopColor="rgba(90,130,255,0.05)" />
                </linearGradient>
              </defs>
              <polyline
                points={chartPoints}
                fill="none"
                stroke="rgba(90,130,255,0.8)"
                strokeWidth="2"
              />
              <polygon
                points={`0,100 ${chartPoints} 100,100`}
                fill="url(#area)"
              />
            </svg>
            <div className="mt-3 grid grid-cols-6 text-center text-[10px] uppercase tracking-[0.2em] text-ink-muted">
              {chartSeries.map((point) => (
                <span key={point.date}>
                  {new Date(point.date).toLocaleString("en-US", {
                    month: "short"
                  })}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-4 rounded-xl border border-white/10 bg-panel-soft/70 p-3 text-xs text-ink">
            {payload?.trend?.note ??
              "Gradual decline since Feb; below cohort median by 18%."}
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-white/10 bg-panel/80 p-6 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-sm font-semibold text-ink">
            Alert and Video Analytics
          </h3>
          <div className="flex items-center gap-2 text-xs text-ink-muted">
            <button className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              All Alerts
            </button>
            <button className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              All Videos
            </button>
          </div>
        </div>

        <div className="mt-4 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="overflow-hidden rounded-xl border border-white/10">
            <div className="grid grid-cols-[1.2fr_0.6fr_1.2fr] gap-2 bg-panel-soft/70 px-4 py-3 text-xs uppercase tracking-[0.3em] text-ink-muted">
              <span>Alert</span>
              <span>Risk Level</span>
              <span>AI Recommendation</span>
            </div>
            <div className="divide-y divide-white/10">
              {(payload?.alerts ?? defaultAlertRows).map((row) => (
                <div
                  key={row.alert}
                  className="grid grid-cols-[1.2fr_0.6fr_1.2fr] gap-2 px-4 py-3 text-sm text-ink"
                >
                  <span>{row.alert}</span>
                  <span className="text-ink-muted">{row.risk}</span>
                  <span className="text-ink-muted">{row.recommendation}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap gap-3">
              {(payload?.videos ?? defaultVideoCards).map((video) => (
                <div
                  key={video.label}
                  className="flex w-[120px] flex-col gap-2"
                >
                  <div className="relative flex h-20 items-center justify-center rounded-xl border border-white/10 bg-panel-soft/70">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                      <svg
                        aria-hidden="true"
                        className="h-4 w-4 text-ink"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-xs text-ink-muted">{video.label}</span>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-white/10 bg-panel-soft/70 p-3 text-xs text-ink">
              {payload?.video_note ?? defaultCompositeScore.detail}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
