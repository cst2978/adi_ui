import { redirect } from "next/navigation";

const tab = "functional";

export default function ProgressionTabRedirect({
  params
}: {
  params: { id: string };
}) {
  redirect(`/patient/${params.id}/progression?tab=${tab}`);
}
