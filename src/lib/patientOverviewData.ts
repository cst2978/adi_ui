import { getMockResponse } from "@/lib/mockResponses";
import { patientOverviewSetup, type EndpointConfig, type TileConfig } from "@/lib/patientOverviewConfig";
import { mockPatients, type PatientRecord } from "@/lib/mockPatients";

export type MetricStandardResponse = {
  schema: string;
  patient_id: string;
  metric_key: string;
  title: string;
  units: string;
  max_value: number | null;
  data: {
    baseline?: { value: number; label: string; recorded_at?: string };
    cohort?: { value: number; label: string };
    average?: { value: number; label: string };
    current?: { value: number; label: string; recorded_at?: string };
    timeline?: { start: string; end: string; label: string };
    trend?: { direction: string; delta: number; delta_label: string };
    series?: Array<{ date: string; value: number }>;
  };
  alerts?: { status: string; reasons: string[] };
};

export type TherapyResponse = {
  schema: string;
  patient_id: string;
  therapy_key: string;
  therapy_name: string;
  status: string;
  start_date: string;
  dose?: { value: number | null; units: string | null };
  response_summary?: string;
  signals?: Array<{
    response_summary?: string;
    type: string;
    metric_key: string;
    effect: string;
    note: string;
  }>;
  alerts?: { status: string; reasons: string[] };
};

export type AiSummary = {
  schema: string;
  patient_id: string;
  summary: string;
  generated_at: string;
  model: string;
  confidence: number;
};

export type TileResult = {
  tile: TileConfig;
  data: MetricStandardResponse | TherapyResponse | null;
  path: string;
};

export type TileGroupResult = {
  group_id: string;
  title: string;
  order: number;
  tiles: TileResult[];
};

export type PatientOverviewPayload = {
  patient_id: string;
  patient_header: Record<string, string>;
  ai_summary: AiSummary | null;
  tiles: Record<string, MetricStandardResponse | TherapyResponse | null>;
};

export type PatientOverviewResult = {
  header: Record<string, string>;
  aiSummary: AiSummary | null;
  tileGroups: TileGroupResult[];
};

export function getPatientList() {
  if (patientOverviewSetup.mode.data_mode === "mock") {
    return mockPatients;
  }

  return [];
}

export function getPatientById(patientId: string) {
  return getPatientList().find((patient) => patient.patient_id === patientId) ?? null;
}

export function getMappedPatientHeader(patient: PatientRecord) {
  const mapping = patientOverviewSetup.sql.mappings.patient_header;
  return Object.fromEntries(
    Object.entries(mapping).map(([key, column]) => [key, patient[column]])
  );
}

export async function getPatientOverview(
  patientId: string,
  patientRecord?: PatientRecord
): Promise<PatientOverviewResult> {
  const overviewEndpoint = patientOverviewSetup.apis.endpoints.patient_overview;

  if (overviewEndpoint) {
    const overview = (await resolveEndpoint(
      overviewEndpoint,
      patientId
    )) as PatientOverviewPayload | null;

    if (overview?.patient_header && overview?.tiles) {
      return {
        header: overview.patient_header,
        aiSummary: overview.ai_summary ?? null,
        tileGroups: mapTileGroupsFromTileMap(overview.tiles)
      };
    }
  }

  const header = patientRecord ? getMappedPatientHeader(patientRecord) : {};
  return {
    header,
    aiSummary: null,
    tileGroups: mapTileGroupsFromTileMap({})
  };
}

function mapTileGroupsFromTileMap(
  tileMap: Record<string, MetricStandardResponse | TherapyResponse | null>
) {
  const tiles = patientOverviewSetup.tiles.items.map((tile) => ({
    tile,
    data: tileMap[tile.tile_id] ?? null,
    path: "patient_overview"
  }));

  const sortedGroups = [...patientOverviewSetup.tiles.groups].sort(
    (a, b) => a.order - b.order
  );

  return sortedGroups.map((group) => ({
    ...group,
    tiles: tiles.filter((tile) => tile.tile.group_id === group.group_id)
  }));
}

function resolveEndpointPath(endpoint: EndpointConfig, patientId: string) {
  return endpoint.path.replace("{patient_id}", patientId);
}

async function resolveEndpoint(endpoint: EndpointConfig, patientId: string) {
  const path = resolveEndpointPath(endpoint, patientId);

  if (patientOverviewSetup.mode.data_mode === "mock") {
    return getMockResponse(path);
  }

  const baseUrl = patientOverviewSetup.apis.base_url.replace(/\/+$/, "");
  const fullUrl = `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
  const method = endpoint.method.toUpperCase();

  try {
    const response = await fetch(fullUrl, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: method === "POST" ? JSON.stringify({ patient_id: patientId }) : undefined
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to resolve endpoint", error);
    return null;
  }
}
