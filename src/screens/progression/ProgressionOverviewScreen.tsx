"use client";

import FigmaShell from "@/components/layouts/FigmaShell";
import ProgressionTabs from "@/components/progression-tabs";
import {
  AiSummaryCard,
  CompositeScoreCard,
  PatientSummaryCard
} from "@/components/progression/ProgressionTopCards";
import EmptyState from "@/components/states/EmptyState";
import type { ProgressionOverviewResponse } from "@/types/progression";
import type { Tone } from "@/types/patient-overview";

const toneStyles: Record<Tone, string> = {
  critical: "bg-rose-500/15 text-rose-200",
  warning: "bg-amber-400/15 text-amber-200",
  info: "bg-sky-400/15 text-sky-200",
  success: "bg-emerald-400/15 text-emerald-200",
  neutral: "bg-white/10 text-ink-muted"
};

export default function ProgressionOverviewScreen({
  data
}: {
  data: ProgressionOverviewResponse;
}) {
  const hasContent =
    data.patientSummary.name &&
    data.aiSummary.text &&
    data.diseaseProgression.placeholder;

  if (!hasContent) {
    return (
      <FigmaShell layout={data.layout} header={data.header} mode="embedded">
        <EmptyState
          title={data.emptyState.title}
          description={data.emptyState.description}
        />
      </FigmaShell>
    );
  }

  return (
    <FigmaShell layout={data.layout} header={data.header} mode="embedded">
      <div className="space-y-6">
        <div className="grid gap-3 xl:grid-cols-[512px_minmax(0,1fr)_360px]">
          <PatientSummaryCard data={data.patientSummary} />
          <AiSummaryCard data={data.aiSummary} />
          <CompositeScoreCard data={data.compositeScore} />
        </div>

        <ProgressionTabs tabs={data.tabs} />

        <ProgressionOverviewBody data={data} />
      </div>
    </FigmaShell>
  );
}

export function ProgressionOverviewBody({
  data
}: {
  data: ProgressionOverviewResponse;
}) {
  return (
    <div className="grid gap-4 xl:grid-cols-[360px_minmax(0,1fr)]">
      <div className="space-y-4">
        <ProgressionStatus data={data.progressionStatus} />
        <KeyDrivers data={data.keyDrivers} />
      </div>
      <DiseaseProgression data={data.diseaseProgression} />
    </div>
  );
}

function ProgressionStatus({
  data
}: {
  data: ProgressionOverviewResponse["progressionStatus"];
}) {
  return (
    <div className="ds-card p-4">
      <div className="flex items-center justify-between">
        <p className="ds-label">{data.title}</p>
        <span
          className={`rounded-full px-2 py-1 text-[10px] ${
            toneStyles[data.status.tone]
          }`}
        >
          {data.status.label}
        </span>
      </div>
      <p className="mt-3 text-xs text-[rgba(217,237,255,0.36)]">
        {data.summary}
      </p>
    </div>
  );
}

function KeyDrivers({
  data
}: {
  data: ProgressionOverviewResponse["keyDrivers"];
}) {
  return (
    <div className="ds-card p-4">
      <p className="ds-label">{data.title}</p>
      <p className="mt-3 text-xs text-[rgba(217,237,255,0.36)]">
        {data.intro.label} <span className="text-[#3b9eff]">{data.intro.highlight}</span>
      </p>
      <div className="mt-4 space-y-2">
        {data.items.map((item, index) => (
          <div
            key={`${item.text}-${index}`}
            className="flex items-center justify-between rounded bg-panel-soft/60 px-3 py-2 text-xs text-[rgba(217,237,255,0.36)]"
          >
            <span>{item.text}</span>
            <img alt="" className="h-3 w-3" src={item.iconUrl} />
          </div>
        ))}
      </div>
    </div>
  );
}

function DiseaseProgression({
  data
}: {
  data: ProgressionOverviewResponse["diseaseProgression"];
}) {
  return (
    <div className="ds-card p-4">
      <p className="ds-label">{data.title}</p>
      <p className="mt-2 text-xs text-[rgba(217,237,255,0.36)]">
        {data.description}
      </p>

      <div className="mt-4 flex items-start justify-between">
        <div>
          <p className="ds-label">
            {data.score.label}
          </p>
          <div className="mt-2 flex items-center gap-2 text-2xl text-[#edeef0]">
            <span>{data.score.value}</span>
            <img alt="" className="h-4 w-4" src={data.score.trendIconUrl} />
          </div>
          <p className="mt-1 text-[10px] text-[rgba(217,237,255,0.36)]">
            {data.score.timestamp}
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-[10px] text-[rgba(217,237,255,0.36)]">
          {data.legend.map((item) => (
            <span key={item.label} className="flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${toneStyles[item.tone]}`}
              />
              {item.label}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-lg bg-panel-soft/60 p-4">
        <div className="text-xs text-[rgba(217,237,255,0.36)]">
          {data.placeholder}
        </div>
        <div className="mt-4 grid gap-2">
          {data.yAxisLabels.map((label) => (
            <div key={label} className="flex items-center gap-3">
              <span className="w-10 text-[10px] text-[rgba(217,237,255,0.36)]">
                {label}
              </span>
              <span className="h-px flex-1 bg-[rgba(221,234,248,0.08)]" />
            </div>
          ))}
        </div>
        <div className="mt-3 flex justify-between text-[10px] text-[rgba(217,237,255,0.36)]">
          {data.xAxisLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-lg bg-panel-soft/60 px-3 py-2 text-xs text-[rgba(241,247,254,0.71)]">
        <img alt="" className="h-4 w-4" src={data.callout.iconUrl} />
        <span>{data.callout.text}</span>
      </div>
    </div>
  );
}
