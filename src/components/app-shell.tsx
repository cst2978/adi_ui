"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/sidebar";
import TopBar from "@/components/top-bar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideChrome = pathname === "/patients" || pathname === "/patients/";

  if (hideChrome) {
    return <div className="min-h-screen motion-safe:animate-floatIn">{children}</div>;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <TopBar />
        <main className="flex-1 px-6 pb-10 pt-6 motion-safe:animate-floatIn">
          {children}
        </main>
      </div>
    </div>
  );
}
