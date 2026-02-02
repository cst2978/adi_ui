import progressionOverviewData from "../../../mocks/progressionOverview.json";
import progressionFunctionalData from "../../../mocks/progressionFunctional.json";
import progressionBiomarkersData from "../../../mocks/progressionBiomarkers.json";
import progressionOrganSystemsData from "../../../mocks/progressionOrganSystems.json";
import progressionVideoAnalyticsData from "../../../mocks/progressionVideoAnalytics.json";
import progressionTimelineData from "../../../mocks/progressionTimeline.json";
import type {
  ProgressionOverviewResponse,
  LegacyProgressionFunctionalResponse,
  ProgressionBiomarkersResponse,
  ProgressionOrganSystemsResponse,
  ProgressionVideoAnalyticsResponse,
  ProgressionTimelineResponse
} from "@/types/progression";
import {
  applyProgressionProfile,
  getPatientProfile
} from "@/services/api/patientProfiles";

const overviewPayload = progressionOverviewData as ProgressionOverviewResponse;
const functionalPayload =
  progressionFunctionalData as LegacyProgressionFunctionalResponse;
const biomarkersPayload =
  progressionBiomarkersData as ProgressionBiomarkersResponse;
const organSystemsPayload =
  progressionOrganSystemsData as ProgressionOrganSystemsResponse;
const videoAnalyticsPayload =
  progressionVideoAnalyticsData as ProgressionVideoAnalyticsResponse;
const timelinePayload = progressionTimelineData as ProgressionTimelineResponse;

export async function getProgressionOverview(
  patientId: string
): Promise<ProgressionOverviewResponse> {
  const profile = getPatientProfile(patientId);
  return applyProgressionProfile(overviewPayload, profile);
}

export async function getProgressionFunctional(
  patientId: string
): Promise<LegacyProgressionFunctionalResponse> {
  return {
    ...functionalPayload,
    patientId
  };
}

export async function getProgressionBiomarkers(
  patientId: string
): Promise<ProgressionBiomarkersResponse> {
  const profile = getPatientProfile(patientId);
  return applyProgressionProfile(biomarkersPayload, profile);
}

export async function getProgressionOrganSystems(
  patientId: string
): Promise<ProgressionOrganSystemsResponse> {
  const profile = getPatientProfile(patientId);
  return applyProgressionProfile(organSystemsPayload, profile);
}

export async function getProgressionVideoAnalytics(
  patientId: string
): Promise<ProgressionVideoAnalyticsResponse> {
  const profile = getPatientProfile(patientId);
  return applyProgressionProfile(videoAnalyticsPayload, profile);
}

export async function getProgressionTimeline(
  patientId: string
): Promise<ProgressionTimelineResponse> {
  const profile = getPatientProfile(patientId);
  return applyProgressionProfile(timelinePayload, profile);
}
