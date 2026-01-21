import { getMockResponse } from "@/lib/mockResponses";
import type { AiSummary, MetricStandardResponse } from "@/lib/patientOverviewData";
import {
  functionalAssessmentSetup,
  type EndpointConfig
} from "@/lib/functionalAssessmentConfig";

export type SeriesPoint = {
  date: string;
  value: number;
};

export type FunctionalAssessmentPayload = {
  schema: string;
  patient_id: string;
  updated_at: string;
  patient_header: Record<string, string>;
  ai_summary: AiSummary | null;
  composite_score: {
    value: number;
    trend: "up" | "down" | "stable";
    detail: string;
  };
  kpi_tabs: string[];
  sources: {
    active: string;
    options: string[];
  };
  mobility_summary: {
    summary_date: string;
    metrics: Array<{
      label: string;
      metric: MetricStandardResponse | null;
      status?: string;
    }>;
    note: string;
  };
  trend: {
    title: string;
    subtitle: string;
    latest_value_label: string;
    series: SeriesPoint[];
    note: string;
  };
  alerts: Array<{ alert: string; risk: string; recommendation: string }>;
  videos: Array<{ label: string }>;
  video_note: string;
};

export async function getFunctionalAssessment(patientId: string) {
  const endpoint =
    functionalAssessmentSetup.apis.endpoints.functional_assessment;
  const payload = (await resolveEndpoint(endpoint, patientId)) as
    | FunctionalAssessmentPayload
    | null;

  if (!payload) {
    return null;
  }

  return payload;
}

function resolveEndpointPath(endpoint: EndpointConfig, patientId: string) {
  return endpoint.path.replace("{patient_id}", patientId);
}

async function resolveEndpoint(endpoint: EndpointConfig, patientId: string) {
  const path = resolveEndpointPath(endpoint, patientId);

  if (functionalAssessmentSetup.mode.data_mode === "mock") {
    return getMockResponse(path);
  }

  const baseUrl = functionalAssessmentSetup.apis.base_url.replace(/\/+$/, "");
  const fullUrl = `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
  const method = endpoint.method.toUpperCase();

  try {
    const response = await fetch(fullUrl, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body:
        method === "POST" ? JSON.stringify({ patient_id: patientId }) : undefined
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to resolve functional assessment endpoint", error);
    return null;
  }
}
