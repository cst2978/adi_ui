import setup from "../../config/patient_overview.setup.json";
import patientOverviewEndpoint from "../../config/endpoints/patient_overview.json";

export type DataMode = "mock" | "live";

export type EndpointConfig = {
  method: string;
  path: string;
  response_schema?: string;
};

export type TileGroupConfig = {
  group_id: string;
  title: string;
  order: number;
};

export type TileConfig = {
  tile_id: string;
  group_id: string;
  title: string;
  response_schema: string;
};

export type SetupConfig = {
  version: string;
  screen: string;
  mode: {
    data_mode: DataMode;
  };
  sql: {
    connection_key: string;
    patient_lookup: {
      request_param: string;
    };
    tables: {
      patient_table: {
        name: string;
        alias: string;
        primary_key: string;
      };
    };
    mappings: {
      patient_header: Record<string, string>;
    };
  };
  apis: {
    base_url: string;
    endpoints: {
      patient_overview: EndpointConfig;
    };
  };
  tiles: {
    layout: {
      grid: {
        min_tile_width_px: number;
        gap_px: number;
      };
    };
    groups: TileGroupConfig[];
    items: TileConfig[];
  };
};

type EndpointRef = EndpointConfig | string;

type RawSetupConfig = Omit<SetupConfig, "apis"> & {
  apis: {
    base_url: string;
    endpoints: Record<string, EndpointRef>;
  };
};

const endpointRegistry: Record<string, EndpointConfig> = {
  "config/endpoints/patient_overview.json": patientOverviewEndpoint
};

const resolveEndpointRef = (value: EndpointRef): EndpointConfig => {
  if (typeof value === "string") {
    const endpoint = endpointRegistry[value];
    if (!endpoint) {
      throw new Error(`Unknown endpoint reference: ${value}`);
    }
    return endpoint;
  }
  return value;
};

const resolveEndpointMap = (map: Record<string, EndpointRef>) =>
  Object.fromEntries(
    Object.entries(map).map(([key, value]) => [key, resolveEndpointRef(value)])
  );

const rawSetup = setup as RawSetupConfig;

export const patientOverviewSetup: SetupConfig = {
  ...rawSetup,
  apis: {
    ...rawSetup.apis,
    endpoints: resolveEndpointMap(
      rawSetup.apis.endpoints
    ) as SetupConfig["apis"]["endpoints"]
  }
};
