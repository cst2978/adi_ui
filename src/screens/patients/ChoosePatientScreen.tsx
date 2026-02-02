import PatientChooser from "@/components/patients/PatientChooser";
import type { PatientsForUserResponse } from "@/types/patients";

export default function ChoosePatientScreen({
  data,
  showHeader = true
}: {
  data: PatientsForUserResponse;
  showHeader?: boolean;
}) {
  return <PatientChooser data={data} showHeader={showHeader} />;
}
