import { getPatientOverview } from "@/services/api/patient";
import UpdatedPatientOverview from "@/screens/UpdatedPatientOverview";

export default async function PatientOverviewPage({
  params
}: {
  params: { id: string };
}) {
  const data = await getPatientOverview(params.id);

  return <UpdatedPatientOverview data={data} />;
}
