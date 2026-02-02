import patientsData from "../../../mocks/patients.json";
import type { PatientsForUserResponse } from "@/types/patients";

const patientsPayload = patientsData as PatientsForUserResponse;

export async function getPatientsForUser(): Promise<PatientsForUserResponse> {
  return patientsPayload;
}
