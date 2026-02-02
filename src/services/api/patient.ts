import patientOverviewData from "../../../mocks/patientOverview.json";
import type { PatientOverviewResponse } from "@/types/patient-overview";
import {
  applyPatientOverviewProfile,
  getPatientProfile
} from "@/services/api/patientProfiles";

const overviewPayload = patientOverviewData as PatientOverviewResponse;

export const defaultPatientId = overviewPayload.patientId;

export async function getPatientOverview(
  patientId: string
): Promise<PatientOverviewResponse> {
  const profile = getPatientProfile(patientId);
  return applyPatientOverviewProfile(overviewPayload, profile);
}
