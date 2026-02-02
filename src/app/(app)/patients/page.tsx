import { getPatientsForUser } from "@/services/api/getPatientsForUser";
import ChoosePatientScreen from "@/screens/patients/ChoosePatientScreen";
import PatientSelectionShell from "@/components/patients/PatientSelectionShell";

export default async function ChoosePatientPage() {
  const data = await getPatientsForUser();

  return (
    <PatientSelectionShell>
      <ChoosePatientScreen data={data} showHeader={false} />
    </PatientSelectionShell>
  );
}
