import Sidebar from "@/components/sidebar";
import TopBar from "@/components/top-bar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <TopBar />
        <main className="flex-1 px-6 pb-10 pt-6">{children}</main>
      </div>
    </div>
  );
}
