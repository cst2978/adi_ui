"use client";

import { useEffect, useMemo, useState } from "react";
import FigmaShell from "@/components/layouts/FigmaShell";
import {
  AiSummaryCard,
  CompositeScoreCard,
  PatientSummaryCard
} from "@/components/progression/ProgressionTopCards";
import { ProgressionOverviewBody } from "@/screens/progression/ProgressionOverviewScreen";
import { ProgressionBiomarkersBody } from "@/screens/progression/ProgressionBiomarkersScreen";
import { ProgressionOrganSystemsBody } from "@/screens/progression/ProgressionOrganSystemsScreen";
import { ProgressionVideoAnalyticsBody } from "@/screens/progression/ProgressionVideoAnalyticsScreen";
import { ProgressionTimelineBody } from "@/screens/progression/ProgressionTimelineScreen";
import { ProgressionFunctionalBody } from "@/screens/progression/ProgressionFunctionalScreen";
import type {
  ProgressionBiomarkersResponse,
  ProgressionOrganSystemsResponse,
  ProgressionOverviewResponse,
  ProgressionTimelineResponse,
  ProgressionVideoAnalyticsResponse
} from "@/types/progression";
import {
  applyProgressionProfile,
  getPatientProfile
} from "@/services/api/patientProfiles";
import overviewData from "../../../mocks/progressionOverview.json";
import biomarkersData from "../../../mocks/progressionBiomarkers.json";
import organSystemsData from "../../../mocks/progressionOrganSystems.json";
import videoAnalyticsData from "../../../mocks/progressionVideoAnalytics.json";
import timelineData from "../../../mocks/progressionTimeline.json";

export type ProgressionTabKey =
  | "overview"
  | "functional"
  | "biomarkers"
  | "organ-systems"
  | "video-analytics"
  | "timeline";

type ProgressionWorkspaceProps = {
  activeTab: ProgressionTabKey;
  onTabChange: (tab: ProgressionTabKey) => void;
  patientId?: string;
};

const tabs: Array<{ key: ProgressionTabKey; label: string }> = [
  { key: "overview", label: "Overview" },
  { key: "functional", label: "Functional" },
  { key: "biomarkers", label: "Biomarkers" },
  { key: "organ-systems", label: "Organ Systems" },
  { key: "video-analytics", label: "Video Analytics" },
  { key: "timeline", label: "Timeline" }
];

const overviewPayload = overviewData as ProgressionOverviewResponse;
const biomarkersPayload = biomarkersData as ProgressionBiomarkersResponse;
const organSystemsPayload = organSystemsData as ProgressionOrganSystemsResponse;
const videoAnalyticsPayload =
  videoAnalyticsData as ProgressionVideoAnalyticsResponse;
const timelinePayload = timelineData as ProgressionTimelineResponse;

export default function ProgressionWorkspace({
  activeTab,
  onTabChange,
  patientId
}: ProgressionWorkspaceProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const profile = useMemo(
    () => getPatientProfile(patientId),
    [patientId]
  );

  const overviewDataForPatient = useMemo(
    () => applyProgressionProfile(overviewPayload, profile),
    [profile]
  );
  const biomarkersDataForPatient = useMemo(
    () => applyProgressionProfile(biomarkersPayload, profile),
    [profile]
  );
  const organSystemsDataForPatient = useMemo(
    () => applyProgressionProfile(organSystemsPayload, profile),
    [profile]
  );
  const videoAnalyticsDataForPatient = useMemo(
    () => applyProgressionProfile(videoAnalyticsPayload, profile),
    [profile]
  );
  const timelineDataForPatient = useMemo(
    () => applyProgressionProfile(timelinePayload, profile),
    [profile]
  );

  const resolvedTab = useMemo<ProgressionTabKey>(() => {
    return tabs.some((tab) => tab.key === activeTab) ? activeTab : "overview";
  }, [activeTab]);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = window.setTimeout(() => setIsTransitioning(false), 180);
    return () => window.clearTimeout(timer);
  }, [resolvedTab]);

  const header = useMemo(() => {
    const tabLabel =
      tabs.find((tab) => tab.key === resolvedTab)?.label ?? "Overview";
    const breadcrumb = overviewDataForPatient.header.breadcrumb;
    return {
      ...overviewDataForPatient.header,
      breadcrumb: breadcrumb
        ? {
            ...breadcrumb,
            items: ["Progression", tabLabel],
            activeIndex: 1
          }
        : {
            items: ["Progression", tabLabel],
            activeIndex: 1
          }
    };
  }, [overviewDataForPatient.header, resolvedTab]);

  return (
    <FigmaShell
      layout={overviewDataForPatient.layout}
      header={header}
      mode="embedded"
    >
      <div className="space-y-6">
        <div className="grid gap-3 xl:grid-cols-[512px_minmax(0,1fr)_360px]">
          <PatientSummaryCard data={overviewDataForPatient.patientSummary} />
          <AiSummaryCard data={overviewDataForPatient.aiSummary} />
          <CompositeScoreCard data={overviewDataForPatient.compositeScore} />
        </div>

        <div className="ds-tabs px-1">
          {tabs.map((tab) => {
            const isActive = tab.key === resolvedTab;
            return (
              <button
                key={tab.key}
                type="button"
                className={`ds-tab ${isActive ? "ds-tab-active" : ""}`}
                onClick={() => onTabChange(tab.key)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          className={`min-h-[640px] transition-opacity duration-200 ${
            isTransitioning ? "opacity-40" : "opacity-100"
          }`}
        >
          {resolvedTab === "overview" ? (
            <ProgressionOverviewBody data={overviewDataForPatient} />
          ) : null}
          {resolvedTab === "functional" ? <ProgressionFunctionalBody /> : null}
          {resolvedTab === "biomarkers" ? (
            <ProgressionBiomarkersBody data={biomarkersDataForPatient} />
          ) : null}
          {resolvedTab === "organ-systems" ? (
            <ProgressionOrganSystemsBody data={organSystemsDataForPatient} />
          ) : null}
          {resolvedTab === "video-analytics" ? (
            <ProgressionVideoAnalyticsBody data={videoAnalyticsDataForPatient} />
          ) : null}
          {resolvedTab === "timeline" ? (
            <ProgressionTimelineBody data={timelineDataForPatient} />
          ) : null}
        </div>
      </div>
    </FigmaShell>
  );
}
