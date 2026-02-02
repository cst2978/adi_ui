"use client";

import FigmaShell from "@/components/layouts/FigmaShell";
import ProgressionTabs from "@/components/progression-tabs";
import {
  AiSummaryCard,
  CompositeScoreCard,
  PatientSummaryCard
} from "@/components/progression/ProgressionTopCards";
import EmptyState from "@/components/states/EmptyState";
import type {
  ProgressionAlertBadge,
  ProgressionTimelineResponse
} from "@/types/progression";
import type { Tone } from "@/types/patient-overview";

const toneStyles: Record<Tone, string> = {
  critical: "bg-rose-500/15 text-rose-200",
  warning: "bg-amber-400/15 text-amber-200",
  info: "bg-sky-400/15 text-sky-200",
  success: "bg-emerald-400/15 text-emerald-200",
  neutral: "bg-white/10 text-ink-muted"
};

const alertToneStyles: Record<
  Tone,
  { dot: string; text: string; bg: string }
> = {
  critical: {
    dot: "bg-[#e5484d]",
    text: "text-[#e5484d]",
    bg: "bg-[rgba(211,237,248,0.11)]"
  },
  warning: {
    dot: "bg-[#ffe629]",
    text: "text-[#ffe629]",
    bg: "bg-[rgba(211,237,248,0.11)]"
  },
  info: {
    dot: "bg-[#3b9eff]",
    text: "text-[#3b9eff]",
    bg: "bg-[rgba(211,237,248,0.11)]"
  },
  success: {
    dot: "bg-[#3dd598]",
    text: "text-[#3dd598]",
    bg: "bg-[rgba(211,237,248,0.11)]"
  },
  neutral: {
    dot: "bg-[rgba(217,237,255,0.36)]",
    text: "text-[rgba(217,237,255,0.36)]",
    bg: "bg-[rgba(211,237,248,0.11)]"
  }
};

export default function ProgressionTimelineScreen({
  data
}: {
  data: ProgressionTimelineResponse;
}) {
  const hasContent =
    data.overview.title && data.progressCards.length > 0;

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

        <ProgressionTimelineBody data={data} />
      </div>
    </FigmaShell>
  );
}

export function ProgressionTimelineBody({
  data
}: {
  data: ProgressionTimelineResponse;
}) {
  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_431px]">
      <div className="space-y-4">
        <OverviewChart data={data.overview} />
        <div className="grid gap-4 md:grid-cols-2">
          {data.progressCards.map((card) => (
            <ProgressCard key={card.title} data={card} />
          ))}
        </div>
      </div>
      <FiltersPanel data={data.filters} />
    </div>
  );
}

function OverviewChart({
  data
}: {
  data: ProgressionTimelineResponse["overview"];
}) {
  return (
    <div className="ds-card p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[#edeef0]">{data.title}</p>
          <p className="mt-2 text-xs text-[rgba(217,237,255,0.36)]">
            {data.description}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-[rgba(217,237,255,0.36)]">
            {data.score.label}
          </p>
          <div className="flex items-center gap-2 text-2xl text-[#edeef0]">
            <span>{data.score.value}</span>
            <img alt="" className="h-4 w-4" src={data.score.trendIconUrl} />
          </div>
          <p className="text-[10px] text-[rgba(217,237,255,0.36)]">
            {data.score.timestamp}
          </p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-4 text-[10px] text-[rgba(217,237,255,0.36)]">
        {data.legend.map((item) => (
          <span key={item.label} className={toneStyles[item.tone]}>
            {item.label}
          </span>
        ))}
      </div>
      <ChartGrid
        xAxisLabels={data.xAxisLabels}
        yAxisLabels={data.yAxisLabels}
        placeholder={data.placeholder}
      />
      <Callout iconUrl={data.callout.iconUrl} text={data.callout.text} />
    </div>
  );
}

function ProgressCard({
  data
}: {
  data: ProgressionTimelineResponse["progressCards"][number];
}) {
  return (
    <div className="ds-card p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#edeef0]">{data.title}</p>
        <AlertBadge data={data.alert} />
      </div>
      <div className="mt-3 text-[10px] text-[rgba(217,237,255,0.36)]">
        {data.score.label}
      </div>
      <div className="mt-1 flex items-center gap-2 text-xl text-[#edeef0]">
        <span>{data.score.value}</span>
        <img alt="" className="h-4 w-4" src={data.score.trendIconUrl} />
      </div>
      <div className="text-[10px] text-[rgba(217,237,255,0.36)]">
        {data.score.timestamp}
      </div>
      <ChartGrid
        xAxisLabels={data.xAxisLabels}
        yAxisLabels={data.yAxisLabels}
        placeholder={data.placeholder}
      />
      <Callout iconUrl={data.callout.iconUrl} text={data.callout.text} />
    </div>
  );
}

function FiltersPanel({
  data
}: {
  data: ProgressionTimelineResponse["filters"];
}) {
  return (
    <div className="ds-card p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#b0b4ba]">{data.title}</p>
        <img alt="" className="h-3 w-3" src={data.closeIconUrl} />
      </div>
      <div className="mt-4 space-y-6">
        {data.sections.map((section) => (
          <div key={section.label} className="space-y-2">
            <p className="text-xs text-[#5a6169]">{section.label}</p>
            <div className="flex items-center justify-between rounded bg-panel-soft/60 px-3 py-2 text-xs text-[#3b9eff]">
              <div className="flex items-center gap-2 text-[12px] text-[#5a6169]">
                {section.selectedCount ? (
                  <span className="rounded-full bg-[rgba(0,119,255,0.23)] px-2 py-0.5 text-[#3b9eff]">
                    {section.selectedCount}
                  </span>
                ) : null}
                <span>{section.value}</span>
              </div>
              <img alt="" className="h-3 w-3" src={section.iconUrl} />
            </div>
            {section.tags ? (
              <div className="flex flex-wrap gap-2">
                {section.tags.map((tag) => (
                  <span
                    key={tag.label}
                    className="flex items-center gap-2 rounded-full bg-[rgba(0,119,255,0.23)] px-3 py-1 text-xs text-[#3b9eff]"
                  >
                    {tag.label}
                    <img alt="" className="h-3 w-3" src={tag.iconUrl} />
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function AlertBadge({ data }: { data: ProgressionAlertBadge }) {
  const styles = alertToneStyles[data.tone];

  return (
    <div
      className={`flex items-center gap-2 rounded px-2 py-1 text-[10px] ${styles.bg}`}
    >
      <span className={`h-2 w-2 rounded-full ${styles.dot}`} />
      <span className={`font-medium ${styles.text}`}>{data.label}</span>
      {data.value ? (
        <span className={`font-medium ${styles.text}`}>{data.value}</span>
      ) : null}
    </div>
  );
}

function ChartGrid({
  xAxisLabels,
  yAxisLabels,
  placeholder
}: {
  xAxisLabels: string[];
  yAxisLabels: string[];
  placeholder: string;
}) {
  return (
    <div className="relative mt-3 h-[140px] rounded bg-panel-soft/60 px-8 py-3">
      <div className="absolute left-2 top-3 flex h-[100px] flex-col justify-between text-[10px] text-[rgba(217,237,255,0.36)]">
        {yAxisLabels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
      <div className="absolute bottom-2 left-8 right-3 flex justify-between text-[10px] text-[rgba(217,237,255,0.36)]">
        {xAxisLabels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center text-xs text-[rgba(217,237,255,0.36)]">
        {placeholder}
      </div>
    </div>
  );
}

function Callout({ iconUrl, text }: { iconUrl: string; text: string }) {
  return (
    <div className="mt-3 flex items-center gap-2 rounded bg-panel-soft/60 px-3 py-2 text-[11px] text-[rgba(241,247,254,0.71)]">
      <img alt="" className="h-5 w-5" src={iconUrl} />
      <span>{text}</span>
    </div>
  );
}
