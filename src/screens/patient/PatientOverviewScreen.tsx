import ChangeSummary from "@/components/patient-overview/ChangeSummary";
import MetricTiles from "@/components/patient-overview/MetricTiles";
import MultispecialtySnapshot from "@/components/patient-overview/MultispecialtySnapshot";
import PatientCard from "@/components/patient-overview/PatientCard";
import SafetySignals from "@/components/patient-overview/SafetySignals";
import TimelinePreview from "@/components/patient-overview/TimelinePreview";
import EmptyState from "@/components/states/EmptyState";
import type { LegacyPatientOverviewResponse } from "@/types/patient-overview";

export default function PatientOverviewScreen({
  data
}: {
  data: LegacyPatientOverviewResponse;
}) {
  const hasContent =
    data.metricTiles.tiles.length > 0 ||
    data.safetySignals.signals.length > 0 ||
    data.multispecialtySnapshot.items.length > 0 ||
    data.timelinePreview.events.length > 0;

  if (!hasContent) {
    return (
      <EmptyState
        title={data.emptyState.title}
        description={data.emptyState.description}
      />
    );
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-ink-muted">
            {data.page.kicker}
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-ink">
            {data.page.title}
          </h1>
          <p className="mt-2 text-sm text-ink-muted">{data.page.subtitle}</p>
        </div>
      </header>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_1.4fr_1fr]">
        <PatientCard data={data.patientCard} />
        <ChangeSummary data={data.changeSummary} />
        <SafetySignals data={data.safetySignals} />
      </div>

      <MetricTiles data={data.metricTiles} />

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <MultispecialtySnapshot data={data.multispecialtySnapshot} />
        <TimelinePreview data={data.timelinePreview} />
      </div>
    </div>
  );
}
