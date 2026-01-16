import mockResponses from "../../mocks/mock_responses.json";

export type MockResponseMap = Record<string, unknown>;

export function getMockResponse(path: string) {
  return (mockResponses as MockResponseMap)[path] ?? null;
}
