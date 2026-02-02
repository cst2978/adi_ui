"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ProgressionTab } from "@/types/progression";

export default function ProgressionTabs({ tabs }: { tabs: ProgressionTab[] }) {
  const pathname = usePathname();

  return (
    <div className="ds-tabs px-1">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`ds-tab ${isActive ? "ds-tab-active" : ""}`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
