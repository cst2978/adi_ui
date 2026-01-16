import { getMockResponse } from "@/lib/mockResponses";
import type { MetricStandardResponse } from "@/lib/patientOverviewData";
import {
  realTimeMonitoringSetup,
  type EndpointConfig
} from "@/lib/realTimeMonitoringConfig";

export type RealTimeMonitoringPayload = {
  schema: string;
  patient_id: string;
  updated_at: string;
  date_ranges: string[];
  cardiovascular: {
    summary: MetricStandardResponse[];
    metrics: MetricStandardResponse[];
    gait_metrics: MetricStandardResponse[];
    physical_metrics: MetricStandardResponse[];
  };
  pulmonary: {
    summary: MetricStandardResponse[];
    metrics: MetricStandardResponse[];
  };
};

export async function getRealTimeMonitoring(patientId: string) {
  const endpoint = realTimeMonitoringSetup.apis.endpoints.real_time_monitoring;
  const payload = (await resolveEndpoint(endpoint, patientId)) as
    | RealTimeMonitoringPayload
    | null;

  if (!payload) {
    return null;
  }

  if (realTimeMonitoringSetup.mode.data_mode === "live") {
    const sqlMetrics = await fetchCardiovascularFromSql(patientId);
    if (sqlMetrics) {
      payload.cardiovascular.metrics = sqlMetrics;
    }
  }

  return payload;
}

function resolveEndpointPath(endpoint: EndpointConfig, patientId: string) {
  return endpoint.path.replace("{patient_id}", patientId);
}

async function resolveEndpoint(endpoint: EndpointConfig, patientId: string) {
  const path = resolveEndpointPath(endpoint, patientId);

  if (realTimeMonitoringSetup.mode.data_mode === "mock") {
    return getMockResponse(path);
  }

  const baseUrl = realTimeMonitoringSetup.apis.base_url.replace(/\/+$/, "");
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
    console.error("Failed to resolve real-time monitoring endpoint", error);
    return null;
  }
}

async function fetchCardiovascularFromSql(
  patientId: string
): Promise<MetricStandardResponse[] | null> {
  if (!realTimeMonitoringSetup.sql) {
    return null;
  }

  // TODO: Replace with SQL driver query using realTimeMonitoringSetup.sql config.
  // This is a placeholder to keep the DB integration point stable.
  void patientId;
  return null;
}
