"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const collapsedLogo = "https://www.figma.com/api/mcp/asset/a36aa357-72fa-4a42-9fa6-02f6089b612f";
const collapsedOverviewIcon = "https://www.figma.com/api/mcp/asset/1c53b5d6-5c93-48d6-90ac-70bc0e3ace82";
const collapsedRealtimeIcon = "https://www.figma.com/api/mcp/asset/bef985dd-4035-4eaa-8caa-19bc9fb0e0f4";
const collapsedProgressionIcon = "https://www.figma.com/api/mcp/asset/133d7d9a-8e02-4aee-80c2-a64f2888c3f2";
const collapsedSafetyIcon = "https://www.figma.com/api/mcp/asset/4557ad6e-e1b9-4951-a8a8-e6b2ca9f415d";
const collapsedTherapyIcon = "https://www.figma.com/api/mcp/asset/d340dfdf-b3c7-4d58-8837-dfc1c7137950";
const collapsedPredictionsIcon = "https://www.figma.com/api/mcp/asset/803579e5-41d4-436c-ac6f-279b5bfc6e58";
const collapsedDivider = "https://www.figma.com/api/mcp/asset/a5e88059-f7ce-44b7-b6b3-e12e12592894";
const collapsedBiIcon = "https://www.figma.com/api/mcp/asset/89ca36fd-3568-4786-9e0f-9062bc6f8738";

const expandedLogo = "https://www.figma.com/api/mcp/asset/ca03478b-dfa8-4fbb-8806-99a94038a231";
const expandedCollapseIcon = "https://www.figma.com/api/mcp/asset/375eb618-00cf-47b8-a68c-535741b68a25";
const expandedOverviewIcon = "https://www.figma.com/api/mcp/asset/2777dd15-130d-4dcf-b5ad-29442bb530a9";
const expandedRealtimeIcon = "https://www.figma.com/api/mcp/asset/cce97c2c-9516-4cc1-b239-cd9ee2e07b3b";
const expandedProgressionIcon = "https://www.figma.com/api/mcp/asset/8c5f281c-9309-48c3-85b0-388e070e719c";
const expandedChevronIcon = "https://www.figma.com/api/mcp/asset/bbefb76e-e94c-4687-8a6c-b23929e897db";
const expandedSafetyIcon = "https://www.figma.com/api/mcp/asset/fcbceb34-44ff-475d-bed4-3422095b2dff";
const expandedTherapyIcon = "https://www.figma.com/api/mcp/asset/b956eb4e-a64d-4e48-bc16-3335a8b4df75";
const expandedPredictionIcon = "https://www.figma.com/api/mcp/asset/d1934241-8e77-4d16-b8a8-ed33a3647e85";
const expandedDivider = "https://www.figma.com/api/mcp/asset/4f9b2148-1327-416a-9225-85a36a45d151";
const expandedBiIcon = "https://www.figma.com/api/mcp/asset/f1145869-1e6c-4ff8-800d-b2ae8b285dcd";

const gradientTextStyle = {
  backgroundImage:
    "linear-gradient(241.38deg, rgb(43, 219, 211) 5.55%, rgb(115, 213, 255) 95.53%)"
};

export default function PatientNavigation({ patientId }: { patientId: string }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const patientsHref = "/patients";
  const overviewHref = `/patient/${patientId}/overview`;
  const progressionBase = `/patient/${patientId}/progression`;
  const progressionOverviewHref = `${progressionBase}?tab=overview`;
  const isPatientsActive =
    pathname === patientsHref || pathname.startsWith(`${patientsHref}/`);
  const isOverviewActive = pathname === overviewHref;
  const isProgressionActive = pathname.startsWith(progressionBase);
  const activeProgressionTab = searchParams.get("tab") ?? "overview";

  const progressionLinks = useMemo(
    () => [
      { key: "functional", label: "Functional", href: `${progressionBase}?tab=functional` },
      { key: "biomarkers", label: "Biomarkers", href: `${progressionBase}?tab=biomarkers` },
      { key: "organ-systems", label: "Organ Systems", href: `${progressionBase}?tab=organ-systems` },
      { key: "video-analytics", label: "Video Analytics", href: `${progressionBase}?tab=video-analytics` },
      { key: "timeline", label: "Timeline", href: `${progressionBase}?tab=timeline` }
    ],
    [progressionBase]
  );

  useEffect(() => {
    const routes = [overviewHref, progressionOverviewHref];
    progressionLinks.forEach((link) => routes.push(link.href));
    routes.push(patientsHref);
    routes.forEach((href) => router.prefetch(href));
  }, [overviewHref, progressionOverviewHref, progressionLinks, patientsHref, router]);

  if (collapsed) {
    return (
      <aside className="flex min-h-screen w-16 flex-col items-center justify-between border-r border-[#272a2d] bg-[#18191b] p-4">
        <button
          aria-label="Expand navigation"
          className="flex h-9 w-9 items-center justify-center"
          onClick={() => setCollapsed(false)}
          type="button"
        >
          <img alt="" className="h-5 w-9" src={collapsedLogo} />
        </button>
        <nav className="flex flex-col items-center gap-4">
          <Link href={patientsHref} className="h-9 w-9" prefetch>
            <img alt="" className="h-9 w-9" src={collapsedOverviewIcon} />
          </Link>
          <Link href={overviewHref} className="h-9 w-9" prefetch>
            <img alt="" className="h-9 w-9" src={collapsedOverviewIcon} />
          </Link>
          <div className="h-9 w-9">
            <img alt="" className="h-9 w-9" src={collapsedRealtimeIcon} />
          </div>
          <Link
            href={progressionOverviewHref}
            className={`flex h-9 w-9 items-center justify-center rounded ${
              isProgressionActive ? "bg-[rgba(82,225,254,0.1)]" : ""
            }`}
            prefetch
          >
            <img alt="" className="h-6 w-6" src={collapsedProgressionIcon} />
          </Link>
          <div className="h-9 w-9">
            <img alt="" className="h-9 w-9" src={collapsedSafetyIcon} />
          </div>
          <div className="h-9 w-9">
            <img alt="" className="h-9 w-9" src={collapsedTherapyIcon} />
          </div>
          <div className="h-9 w-9">
            <img alt="" className="h-9 w-9" src={collapsedPredictionsIcon} />
          </div>
        </nav>
        <img alt="" className="h-[528px] w-9" src={collapsedDivider} />
        <div className="flex flex-col items-center gap-4">
          <div className="h-9 w-9">
            <img alt="" className="h-9 w-9" src={collapsedBiIcon} />
          </div>
          <div className="h-9 w-9">
            <img alt="" className="h-9 w-9" src={collapsedPredictionsIcon} />
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="flex min-h-screen w-[226px] flex-col gap-[30px] bg-[#18191b] p-4 text-[#696e77]">
      <div className="flex h-[30px] items-center justify-between overflow-hidden px-2 py-7">
        <div className="flex items-center gap-2">
          <div className="flex h-[20px] w-[36px] items-center justify-center">
            <img alt="" className="h-[20px] w-[36px]" src={expandedLogo} />
          </div>
          <div className="h-[24px] w-[90px] overflow-hidden">
            <img alt="" className="h-full w-full object-cover" src={expandedLogo} />
          </div>
        </div>
        <button
          aria-label="Collapse navigation"
          className="flex h-6 w-3 items-center justify-center"
          onClick={() => setCollapsed(true)}
          type="button"
        >
          <img alt="" className="h-6 w-3" src={expandedCollapseIcon} />
        </button>
      </div>

      <nav className="flex flex-col gap-4">
        <Link
          href={patientsHref}
          className={`flex items-center gap-1 rounded px-1 py-1 ${
            isPatientsActive ? "bg-[rgba(82,225,254,0.1)]" : ""
          }`}
          prefetch
        >
          <img alt="" className="h-9 w-9" src={expandedOverviewIcon} />
          <span
            className={`text-sm font-medium ${
              isPatientsActive
                ? "bg-clip-text text-transparent"
                : "text-[#696e77]"
            }`}
            style={isPatientsActive ? gradientTextStyle : undefined}
          >
            Patients
          </span>
        </Link>

        <Link
          href={overviewHref}
          className={`flex items-center gap-1 rounded px-1 py-1 ${
            isOverviewActive ? "bg-[rgba(82,225,254,0.1)]" : ""
          }`}
          prefetch
        >
          <img alt="" className="h-9 w-9" src={expandedOverviewIcon} />
          <span
            className={`text-sm font-medium ${
              isOverviewActive ? "bg-clip-text text-transparent" : "text-[#696e77]"
            }`}
            style={isOverviewActive ? gradientTextStyle : undefined}
          >
            Patient Overview
          </span>
        </Link>

        <div className="flex items-center gap-1 rounded px-1 py-1">
          <img alt="" className="h-9 w-9" src={expandedRealtimeIcon} />
          <span className="text-sm font-medium">Real Time Monitoring</span>
        </div>

        <div className="flex flex-col gap-2">
          <Link
            href={progressionOverviewHref}
            className="flex items-center justify-between rounded px-1 py-1"
            prefetch
          >
            <div className="flex items-center gap-1">
              <img alt="" className="h-9 w-9" src={expandedProgressionIcon} />
              <span className="text-sm font-medium">Progression</span>
            </div>
            <img alt="" className="h-4 w-2" src={expandedChevronIcon} />
          </Link>
          <div className="flex flex-col gap-1 pl-10">
            {progressionLinks.map((item) => {
              const isActive =
                isProgressionActive && activeProgressionTab === item.key;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`rounded py-1 text-sm ${
                    isActive ? "text-[#edeef0]" : "text-[#696e77]"
                  }`}
                  prefetch
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between rounded px-1 py-1">
            <div className="flex items-center gap-1">
              <img alt="" className="h-9 w-9" src={expandedSafetyIcon} />
              <span className="text-sm font-medium">Safety</span>
            </div>
            <img alt="" className="h-4 w-2" src={expandedChevronIcon} />
          </div>
          <div className="flex flex-col gap-1 pl-10 text-sm text-[#696e77]">
            <span className="py-1">Biomarkers</span>
            <span className="py-1">Functional Safety</span>
            <span className="py-1">Therapy-Related Events</span>
            <span className="py-1">Alerts</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between rounded px-1 py-1">
            <div className="flex items-center gap-1">
              <img alt="" className="h-9 w-9" src={expandedTherapyIcon} />
              <span className="text-sm font-medium">Therapy Response</span>
            </div>
            <img alt="" className="h-4 w-2" src={expandedChevronIcon} />
          </div>
          <div className="flex flex-col gap-1 pl-10 text-sm text-[#696e77]">
            <span className="py-1">Functional Response</span>
            <span className="py-1">Biomarker Response</span>
            <span className="py-1">Video Response</span>
            <span className="py-1">Plateau Detection</span>
          </div>
        </div>

        <div className="flex items-center gap-1 rounded px-1 py-1">
          <img alt="" className="h-9 w-9" src={expandedPredictionIcon} />
          <span className="text-sm font-medium">Predictions &amp; Risk</span>
        </div>

        <div className="flex items-center gap-1 rounded px-1 py-1">
          <img alt="" className="h-9 w-9" src={expandedRealtimeIcon} />
          <span className="text-sm font-medium">Care Plan</span>
        </div>
      </nav>

      <img alt="" className="h-[7px] w-[189px] self-center" src={expandedDivider} />

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between rounded px-1 py-1">
            <div className="flex items-center gap-1">
              <img alt="" className="h-9 w-9" src={expandedBiIcon} />
              <span className="text-sm font-medium">BI Analytics</span>
            </div>
            <img alt="" className="h-4 w-2" src={expandedChevronIcon} />
          </div>
          <div className="flex flex-col gap-1 pl-10 text-sm text-[#696e77]">
            <span className="py-1">Cohort Analytics</span>
          </div>
        </div>

        <div className="flex items-center gap-1 rounded px-1 py-1">
          <img alt="" className="h-9 w-9" src={expandedPredictionIcon} />
          <span className="text-sm font-medium">Gen AI Playground</span>
        </div>
      </div>
    </aside>
  );
}
