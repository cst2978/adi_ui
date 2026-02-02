import PatientNavigation from "@/components/navigation/PatientNavigation";

export default function PatientRouteLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <div className="flex min-h-screen bg-[#111113] text-[#edeef0]">
      <PatientNavigation patientId={params.id} />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
