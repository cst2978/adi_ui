import setup from "../../config/functional_assessment.setup.json";
import functionalAssessmentEndpoint from "../../config/endpoints/functional_assessment.json";

export type DataMode = "mock" | "live";

export type EndpointConfig = {
  method: string;
  path: string;
  response_schema?: string;
};

export type SetupConfig = {
  version: string;
  screen: string;
  mode: {
    data_mode: DataMode;
  };
  apis: {
    base_url: string;
    endpoints: {
      functional_assessment: EndpointConfig;
    };
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
  "config/endpoints/functional_assessment.json": functionalAssessmentEndpoint
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

export const functionalAssessmentSetup: SetupConfig = {
  ...rawSetup,
  apis: {
    ...rawSetup.apis,
    endpoints: resolveEndpointMap(
      rawSetup.apis.endpoints
    ) as SetupConfig["apis"]["endpoints"]
  }
};
