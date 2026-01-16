import setup from "../../config/real_time_monitoring.setup.json";
import realTimeMonitoringEndpoint from "../../config/endpoints/real_time_monitoring.json";

export type DataMode = "mock" | "live";

export type EndpointConfig = {
  method: string;
  path: string;
  response_schema?: string;
};

export type TabConfig = {
  tab_id: string;
  title: string;
};

export type SetupConfig = {
  version: string;
  screen: string;
  mode: {
    data_mode: DataMode;
  };
  sql?: {
    connection_key: string;
    tables: {
      patient_table: {
        name: string;
        primary_key: string;
      };
      cardiovascular_metrics_table: {
        name: string;
        patient_key: string;
      };
    };
    mappings: {
      cardiovascular_metrics: {
        metric_key: string;
        metric_value: string;
        metric_unit: string;
        recorded_at: string;
        cohort_value: string;
        baseline_value: string;
        average_value: string;
      };
    };
  };
  apis: {
    base_url: string;
    endpoints: {
      real_time_monitoring: EndpointConfig;
    };
  };
  tabs: TabConfig[];
};

type EndpointRef = EndpointConfig | string;

type RawSetupConfig = Omit<SetupConfig, "apis"> & {
  apis: {
    base_url: string;
    endpoints: Record<string, EndpointRef>;
  };
};

const endpointRegistry: Record<string, EndpointConfig> = {
  "config/endpoints/real_time_monitoring.json": realTimeMonitoringEndpoint
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

export const realTimeMonitoringSetup: SetupConfig = {
  ...rawSetup,
  apis: {
    ...rawSetup.apis,
    endpoints: resolveEndpointMap(
      rawSetup.apis.endpoints
    ) as SetupConfig["apis"]["endpoints"]
  }
};
