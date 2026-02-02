export type RiskTone = "critical" | "warning" | "info" | "success" | "neutral";

export type PatientListItem = {
  id: string;
  name: string;
  subtitle: string;
  risk: { label: string; tone: RiskTone };
  tags: string[];
  fields: Array<{ label: string; value: string }>;
};

export type PatientsForUserResponse = {
  page: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    continueLabel: string;
    continueDescription: string;
    emptyTitle: string;
    emptyDescription: string;
  };
  patients: PatientListItem[];
};
