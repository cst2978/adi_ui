import { redirect } from "next/navigation";

const tab = "overview";

export default function ProgressionTabRedirect({
  params
}: {
  params: { id: string };
}) {
  redirect(`/patient/${params.id}/progression?tab=${tab}`);
}
