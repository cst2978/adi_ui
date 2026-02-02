import NavRail from "@/components/nav-rail";
import TopBar from "@/components/top-bar";

export default function PatientLayout({
  children,
  patientId
}: {
  children: React.ReactNode;
  patientId: string;
}) {
  return (
    <div className="flex min-h-screen">
      <NavRail patientId={patientId} />
      <div className="flex flex-1 flex-col">
        <TopBar />
        <main className="flex-1 px-6 pb-10 pt-6">{children}</main>
      </div>
    </div>
  );
}
