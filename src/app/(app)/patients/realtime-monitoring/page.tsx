import AiSummaryCard from "@/components/ai-summary-card";
import MetadataCard from "@/components/metadata-card";
import PatientIdentityCard from "@/components/patient-identity-card";
import PatientSelector from "@/components/patient-selector";
import RealTimeMonitoringPanel from "@/components/real-time-monitoring/panel";
import { realTimeMonitoringSetup } from "@/lib/realTimeMonitoringConfig";
import { getRealTimeMonitoring } from "@/lib/realTimeMonitoringData";
import {
  getPatientById,
  getPatientList,
  getPatientOverview
} from "@/lib/patientOverviewData";

export default async function RealTimeMonitoringPage({
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

  const { header, aiSummary } = await getPatientOverview(
    patient.patient_id,
    patient
  );
  const monitoring = await getRealTimeMonitoring(patient.patient_id);

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-ink">Real-time Monitoring</h2>
          <p className="text-sm text-ink-muted">
            Live signal overview for {patient.patient_id}
          </p>
        </div>
        <PatientSelector
          patients={patients}
          selectedId={patient.patient_id}
          basePath="/patients/realtime-monitoring"
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_1.5fr_1fr]">
        <PatientIdentityCard header={header} />
        <AiSummaryCard summary={aiSummary} />
        <MetadataCard header={header} />
      </div>

      <RealTimeMonitoringPanel
        data={monitoring}
        tabs={realTimeMonitoringSetup.tabs}
      />
    </div>
  );
}
