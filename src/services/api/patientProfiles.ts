import patientsData from "../../../mocks/patients.json";
import type { PatientsForUserResponse } from "@/types/patients";
import type { PatientOverviewResponse, Tone } from "@/types/patient-overview";
import type {
  ProgressionAiSummary,
  ProgressionCompositeScore,
  ProgressionPatientSummary,
  ProgressionTab
} from "@/types/progression";

type PatientProfileDetails = {
  diagnosisDate: string;
  mutation: string;
  ambulation: string;
  therapy: string;
  careTeam: string;
  testType: string;
};

export type PatientProfile = {
  id: string;
  name: string;
  diagnosis: string;
  risk: { label: string; tone: Tone };
  genderBadge: string;
  birthInfo: string;
  avatarUrl: string;
  details: PatientProfileDetails;
  overviewSummary?: string;
  progressionAiSummary?: string;
  compositeScore?: {
    value: string;
    delta: string;
    trend: string;
  };
};

type ProfileOverride = Partial<Omit<PatientProfile, "details">> & {
  details?: Partial<PatientProfileDetails>;
};

type ProgressionLikePayload = {
  patientId: string;
  tabs?: ProgressionTab[];
  patientSummary?: ProgressionPatientSummary;
  aiSummary?: ProgressionAiSummary;
  compositeScore?: ProgressionCompositeScore;
  diseaseProgression?: { description?: string };
  overview?: { description?: string };
};

const patientsPayload = patientsData as PatientsForUserResponse;
const patientsList = patientsPayload.patients ?? [];

const avatarById: Record<string, string> = {
  "PAT-123": "/avatars/pat-123.svg",
  "PAT-456": "/avatars/pat-456.svg",
  "PAT-789": "/avatars/pat-789.svg"
};

const profileOverrides: Record<string, ProfileOverride> = {
  "PAT-123": {
    details: {
      diagnosisDate: "Jan 15, 2022",
      mutation: "Exon 51 deletion",
      ambulation: "Ambulatory",
      therapy: "Steroid (Deflazacort), gene therapy trial A",
      careTeam: "Dr. Patel (Neurologist), PT team",
      testType: "Whole exome sequencing (WES)"
    },
    overviewSummary:
      "Mild decline in mobility and lung function over 6 months. Gene therapy response is positive, but steroid-related side effects (CK, ALT) are emerging.",
    progressionAiSummary:
      "Mobility and respiratory signals show mild decline over 6 months. Continue monitoring therapy response and labs.",
    compositeScore: {
      value: "76",
      delta: "-6",
      trend: "Declined from 84 to 76 over 6 months (-6 pts)"
    }
  },
  "PAT-456": {
    details: {
      diagnosisDate: "Mar 03, 2020",
      mutation: "SMN1 deletion",
      ambulation: "Non-ambulatory",
      therapy: "Nusinersen (Spinraza), respiratory support",
      careTeam: "Dr. Wu (Neuromuscular), RT team",
      testType: "SMN1/SMN2 copy number"
    },
    overviewSummary:
      "Respiratory status stable with assisted ventilation. Monitor fatigue burden and cough peak flow.",
    progressionAiSummary:
      "Respiratory trends stable. Functional decline slowed with current therapy.",
    compositeScore: {
      value: "68",
      delta: "-2",
      trend: "Stable to slightly declined over 6 months (-2 pts)"
    },
    risk: { label: "Watch", tone: "warning" }
  },
  "PAT-789": {
    details: {
      diagnosisDate: "Aug 17, 2017",
      mutation: "Exon 45 duplication",
      ambulation: "Ambulatory",
      therapy: "Steroid (Prednisone), cardiac monitoring",
      careTeam: "Dr. Patel (Cardiology), PT team",
      testType: "Targeted DMD panel"
    },
    overviewSummary:
      "Functional scores steady with mild improvement in endurance. Continue cardiac surveillance.",
    progressionAiSummary:
      "Functional performance stable with slight gains in endurance and gait symmetry.",
    compositeScore: {
      value: "81",
      delta: "+3",
      trend: "Improved from 78 to 81 over 6 months (+3 pts)"
    },
    risk: { label: "Moderate", tone: "info" }
  }
};

const tabKeyByLabel: Record<string, string> = {
  Overview: "overview",
  Functional: "functional",
  Biomarkers: "biomarkers",
  "Organ Systems": "organ-systems",
  "Video Analytics": "video-analytics",
  Timeline: "timeline"
};

function clonePayload<T>(payload: T): T {
  return JSON.parse(JSON.stringify(payload)) as T;
}

function getFieldValue(
  patient: PatientsForUserResponse["patients"][number],
  label: string
): string | undefined {
  return patient.fields.find((field) => field.label === label)?.value;
}

function formatBirthInfo(dateOfBirth?: string): string {
  if (!dateOfBirth) {
    return "Unknown";
  }

  const parsed = new Date(dateOfBirth);
  if (Number.isNaN(parsed.getTime())) {
    return dateOfBirth;
  }

  const now = new Date();
  let years = now.getFullYear() - parsed.getFullYear();
  let months = now.getMonth() - parsed.getMonth();
  if (now.getDate() < parsed.getDate()) {
    months -= 1;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const age = `${Math.max(years, 0)}y ${Math.max(months, 0)}m`;
  return `${dateOfBirth} - ${age}`;
}

function getGenderBadge(gender?: string): string {
  if (!gender) {
    return "U";
  }
  const normalized = gender.trim().toLowerCase();
  if (normalized.startsWith("f")) {
    return "F";
  }
  if (normalized.startsWith("m")) {
    return "M";
  }
  return gender.trim().charAt(0).toUpperCase() || "U";
}

function replacePatientName(text: string, name: string): string {
  return text.replace(/Ethan Doe/g, name);
}

export function getPatientProfile(patientId?: string): PatientProfile {
  const fallback = patientsList[0];
  const selected =
    patientsList.find((patient) => patient.id === patientId) ?? fallback;

  if (!selected) {
    return {
      id: patientId ?? "PAT-UNKNOWN",
      name: "Unknown patient",
      diagnosis: "Diagnosis unavailable",
      risk: { label: "Unknown", tone: "neutral" },
      genderBadge: "U",
      birthInfo: "Unknown",
      avatarUrl: "/assets/placeholder.svg",
      details: {
        diagnosisDate: "Unknown",
        mutation: "Unknown",
        ambulation: "Unknown",
        therapy: "Unknown",
        careTeam: "Unknown",
        testType: "Unknown"
      }
    };
  }

  const dateOfBirth = getFieldValue(selected, "Date of Birth");
  const gender = getFieldValue(selected, "Gender");
  const mutation = getFieldValue(selected, "Mutation");
  const ambulation =
    selected.tags.find((tag) =>
      tag.toLowerCase().includes("ambulatory")
    ) ?? "Unknown";

  const baseProfile: PatientProfile = {
    id: selected.id,
    name: selected.name,
    diagnosis: selected.subtitle,
    risk: selected.risk,
    genderBadge: getGenderBadge(gender),
    birthInfo: formatBirthInfo(dateOfBirth),
    avatarUrl: avatarById[selected.id] ?? "/assets/placeholder.svg",
    details: {
      diagnosisDate: "Unknown",
      mutation: mutation ?? "Unknown",
      ambulation,
      therapy: "Unknown",
      careTeam: "Unknown",
      testType: "Unknown"
    }
  };

  const overrides = profileOverrides[selected.id];
  if (!overrides) {
    return baseProfile;
  }

  return {
    ...baseProfile,
    ...overrides,
    details: {
      ...baseProfile.details,
      ...overrides.details
    }
  };
}

export function applyPatientOverviewProfile(
  base: PatientOverviewResponse,
  profile: PatientProfile
): PatientOverviewResponse {
  const next = clonePayload(base);
  next.patientId = profile.id;
  next.patientCard.name = profile.name;
  next.patientCard.avatarUrl = profile.avatarUrl;
  next.patientCard.genderBadge = profile.genderBadge;
  next.patientCard.birthInfo = profile.birthInfo;
  next.patientCard.diagnosis = profile.diagnosis;
  next.patientCard.risk.label = profile.risk.label;
  next.patientCard.risk.tone = profile.risk.tone;

  const infoMap: Record<string, string> = {
    "Diagnosis Date": profile.details.diagnosisDate,
    "Mutation Type": profile.details.mutation,
    "Ambulation Status": profile.details.ambulation,
    "Current Therapy": profile.details.therapy,
    "Care Team": profile.details.careTeam,
    "Test Type": profile.details.testType
  };

  next.patientCard.infoGroups = next.patientCard.infoGroups.map((group) => ({
    ...group,
    items: group.items.map((item) => ({
      ...item,
      value: infoMap[item.label] ?? item.value
    }))
  }));

  if (profile.overviewSummary) {
    next.changeSummary.summary.text = profile.overviewSummary;
  }

  if (profile.compositeScore) {
    next.compositeScore.value = profile.compositeScore.value;
    next.compositeScore.delta = profile.compositeScore.delta;
    next.compositeScore.trend = profile.compositeScore.trend;
  }

  return next;
}

export function applyProgressionProfile<T extends ProgressionLikePayload>(
  base: T,
  profile: PatientProfile
): T {
  const next = clonePayload(base);
  next.patientId = profile.id;

  if (next.patientSummary) {
    next.patientSummary.name = profile.name;
    next.patientSummary.avatarUrl = profile.avatarUrl;
    next.patientSummary.genderBadge = profile.genderBadge;
    next.patientSummary.birthInfo = profile.birthInfo;
    next.patientSummary.diagnosis = profile.diagnosis;
    next.patientSummary.risk.label = profile.risk.label;
    next.patientSummary.risk.tone = profile.risk.tone;
  }

  if (next.tabs) {
    next.tabs = next.tabs.map((tab) => {
      const tabKey = tabKeyByLabel[tab.label];
      if (tabKey) {
        return {
          ...tab,
          href: `/patient/${profile.id}/progression?tab=${tabKey}`
        };
      }
      return {
        ...tab,
        href: tab.href.replace(/\/patient\/[^/]+/, `/patient/${profile.id}`)
      };
    });
  }

  if (next.aiSummary?.text && profile.progressionAiSummary) {
    next.aiSummary.text = profile.progressionAiSummary;
  }

  if (next.compositeScore && profile.compositeScore) {
    next.compositeScore.value = profile.compositeScore.value;
    next.compositeScore.delta = profile.compositeScore.delta;
    next.compositeScore.trend = profile.compositeScore.trend;
  }

  if (next.diseaseProgression?.description) {
    next.diseaseProgression.description = replacePatientName(
      next.diseaseProgression.description,
      profile.name
    );
  }

  if (next.overview?.description) {
    next.overview.description = replacePatientName(
      next.overview.description,
      profile.name
    );
  }

  return next;
}
