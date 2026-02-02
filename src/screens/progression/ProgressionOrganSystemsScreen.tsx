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
  ProgressionOrganSystemsResponse
} from "@/types/progression";
import type { Tone } from "@/types/patient-overview";

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

export default function ProgressionOrganSystemsScreen({
  data
}: {
  data: ProgressionOrganSystemsResponse;
}) {
  const activeSegment =
    data.segments.find((segment) => segment.active) ?? data.segments[0];
  const hasContent = activeSegment?.metricsSection.cards.length > 0;

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

        <ProgressionOrganSystemsBody data={data} />
      </div>
    </FigmaShell>
  );
}

export function ProgressionOrganSystemsBody({
  data
}: {
  data: ProgressionOrganSystemsResponse;
}) {
  const activeSegment =
    data.segments.find((segment) => segment.active) ?? data.segments[0];

  if (!activeSegment) {
    return null;
  }

  return (
    <>
      <SegmentTabs segments={data.segments} />

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="text-sm text-[#edeef0]">
            {activeSegment.metricsSection.title}
          </span>
          <div className="flex flex-wrap items-center gap-3">
            <RangeTabs tabs={activeSegment.metricsSection.rangeTabs} />
            <DateRange data={activeSegment.metricsSection.dateRange} />
          </div>
          <div className="flex items-center gap-2">
            <IconButton iconUrl={activeSegment.metricsSection.nav.previousIconUrl} />
            <IconButton iconUrl={activeSegment.metricsSection.nav.nextIconUrl} />
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-4">
          {activeSegment.metricsSection.cards.map((card) => (
            <MetricCard key={card.title} card={card} />
          ))}
        </div>
      </section>
    </>
  );
}

function SegmentTabs({
  segments
}: {
  segments: ProgressionOrganSystemsResponse["segments"];
}) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-panel/80 p-1">
      {segments.map((segment) => (
        <div
          key={segment.key}
          className={`flex-1 rounded-full px-6 py-1 text-center text-sm ${
            segment.active
              ? "bg-[#0f2234] text-[#3b9eff]"
              : "text-[#80838d]"
          }`}
        >
          {segment.label}
        </div>
      ))}
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

function MetricCard({
  card
}: {
  card: ProgressionOrganSystemsResponse["segments"][number]["metricsSection"]["cards"][number];
}) {
  return (
    <div className="ds-card p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-[#edeef0]">{card.title}</p>
        <AlertBadge data={card.alert} />
      </div>
      <div className="mt-4 flex items-start justify-between">
        <ValueBlock value={card.latest} />
        <ValueBlock value={card.average} align="end" />
      </div>
      <ChartMetaRow
        cohort={card.cohort}
        baseline={card.baseline}
        className="mt-4"
      />
      <ChartGrid
        xAxisLabels={card.xAxisLabels}
        yAxisLabels={card.yAxisLabels}
        placeholder={card.placeholder}
      />
      {card.legend ? <LegendRow legend={card.legend} /> : null}
      <Callout iconUrl={card.callout.iconUrl} text={card.callout.text} />
    </div>
  );
}

function ValueBlock({
  value,
  align = "start"
}: {
  value: {
    label: string;
    value: string;
    timestamp: string;
    trendIconUrl?: string;
  };
  align?: "start" | "end";
}) {
  const alignment = align === "end" ? "items-end text-right" : "items-start";

  return (
    <div className={`flex flex-col gap-2 ${alignment}`}>
      <span className="text-[10px] text-[rgba(217,237,255,0.36)]">
        {value.label}
      </span>
      <div className="flex items-center gap-2 text-2xl font-medium text-[#edeef0]">
        <span>{value.value}</span>
        {value.trendIconUrl ? (
          <img alt="" className="h-4 w-4" src={value.trendIconUrl} />
        ) : null}
      </div>
      <span className="text-[10px] text-[rgba(217,237,255,0.36)]">
        {value.timestamp}
      </span>
    </div>
  );
}

function ChartMetaRow({
  cohort,
  baseline,
  className
}: {
  cohort: { label: string; value: string };
  baseline: { label: string; value: string };
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-between text-[10px] text-[rgba(217,237,255,0.36)] ${className ?? ""}`}
    >
      <span>
        {cohort.label} {cohort.value}
      </span>
      <span>
        {baseline.label} {baseline.value}
      </span>
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
    <div className="relative mt-3 h-[120px] rounded bg-panel-soft/60 px-8 py-3">
      <div className="absolute left-2 top-3 flex h-[88px] flex-col justify-between text-[10px] text-[rgba(217,237,255,0.36)]">
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

function LegendRow({
  legend
}: {
  legend: Array<{ label: string; color: string }>;
}) {
  return (
    <div className="mt-2 flex items-center justify-center gap-4 text-[10px] text-[rgba(217,237,255,0.36)]">
      {legend.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <span
            className="h-0.5 w-4 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span>{item.label}</span>
        </div>
      ))}
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

function RangeTabs({
  tabs
}: {
  tabs: ProgressionOrganSystemsResponse["segments"][number]["metricsSection"]["rangeTabs"];
}) {
  return (
    <div className="flex items-center rounded-lg bg-panel/80 p-1 text-xs">
      {tabs.map((tab) => (
        <div
          key={tab.label}
          className={`flex h-7 w-10 items-center justify-center rounded-md ${
            tab.active
              ? "bg-[rgba(0,143,245,0.1)] text-[#0090ff]"
              : "text-[#80838d]"
          }`}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
}

function DateRange({
  data
}: {
  data: ProgressionOrganSystemsResponse["segments"][number]["metricsSection"]["dateRange"];
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-panel/80 px-3 py-2 text-xs text-[rgba(217,237,255,0.36)]">
      <span>{data.label}</span>
      <img alt="" className="h-4 w-4" src={data.iconUrl} />
    </div>
  );
}

function IconButton({ iconUrl }: { iconUrl: string }) {
  return (
    <div className="flex h-7 w-7 items-center justify-center rounded bg-panel/80">
      <img alt="" className="h-4 w-4" src={iconUrl} />
    </div>
  );
}
