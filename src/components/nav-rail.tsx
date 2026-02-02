"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = (patientId: string) => [
  { label: "Overview", href: `/patient/${patientId}/overview` },
  { label: "Progression", href: `/patient/${patientId}/progression?tab=overview` }
];

export default function NavRail({ patientId }: { patientId: string }) {
  const pathname = usePathname();
  const items = navItems(patientId);

  return (
    <aside className="flex h-screen w-24 flex-col items-center border-r border-white/10 bg-panel/80 py-6">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[10px] font-semibold tracking-[0.2em] text-ink">
        {patientId}
      </div>
      <nav className="mt-8 flex w-full flex-1 flex-col items-center gap-2 px-3">
        {items.map((item) => {
          const isProgression = item.href.includes("/progression/");
          const isActive = isProgression
            ? pathname.startsWith(`/patient/${patientId}/progression`)
            : pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`w-full rounded-xl px-3 py-3 text-center text-xs font-semibold uppercase tracking-[0.25em] transition ${
                isActive
                  ? "border border-accent/40 bg-accent/20 text-ink"
                  : "border border-white/5 bg-panel-soft/60 text-ink-muted hover:border-white/20"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
