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
  ProgressionVideoAnalyticsResponse
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

export default function ProgressionVideoAnalyticsScreen({
  data
}: {
  data: ProgressionVideoAnalyticsResponse;
}) {
  const hasContent =
    data.videoSection.title &&
    data.metricGroups.length > 0 &&
    data.chartPanels.length > 0;

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

        <ProgressionVideoAnalyticsBody data={data} />
      </div>
    </FigmaShell>
  );
}

export function ProgressionVideoAnalyticsBody({
  data
}: {
  data: ProgressionVideoAnalyticsResponse;
}) {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <RangeTabs tabs={data.controls.rangeTabs} />
          <DateRange data={data.controls.dateRange} />
          <SourcesTabs sources={data.controls.sources} />
          <VisitsBadge data={data.controls.visits} />
        </div>
        <ActionButton data={data.controls.action} />
      </div>

      <ViewTabs tabs={data.viewTabs} />

      <section className="space-y-3">
        <p className="text-sm text-[#edeef0]">{data.videoSection.title}</p>
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_417px]">
          <VideoPlayer data={data.videoSection.player} />
          <NotesPanel data={data.videoSection.notesPanel} />
        </div>
      </section>

      <OtherVideosRow data={data.otherVideos} />

      <MetricsTabs data={data.metricsTabs} />

      {data.metricGroups.map((group) => (
        <MetricGroup key={group.title} group={group} />
      ))}

      <div className="grid gap-4 xl:grid-cols-4">
        {data.chartPanels.map((panel) => (
          <ChartPanel key={panel.title} panel={panel} />
        ))}
      </div>
    </>
  );
}

function RangeTabs({
  tabs
}: {
  tabs: ProgressionVideoAnalyticsResponse["controls"]["rangeTabs"];
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
  data: ProgressionVideoAnalyticsResponse["controls"]["dateRange"];
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-panel/80 px-3 py-2 text-xs text-[rgba(217,237,255,0.36)]">
      <span>{data.label}</span>
      <img alt="" className="h-4 w-4" src={data.iconUrl} />
    </div>
  );
}

function SourcesTabs({
  sources
}: {
  sources: ProgressionVideoAnalyticsResponse["controls"]["sources"];
}) {
  return (
    <div className="flex items-center gap-2 text-xs text-[rgba(217,237,255,0.36)]">
      <span>{sources.label}</span>
      <div className="flex items-center rounded-lg bg-panel/80 p-1">
        {sources.options.map((option) => (
          <div
            key={option.label}
            className={`flex items-center justify-center rounded-md px-4 py-1 text-xs ${
              option.active
                ? "bg-[rgba(0,143,245,0.1)] text-[#0090ff]"
                : "text-[#80838d]"
            }`}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
}

function VisitsBadge({
  data
}: {
  data: ProgressionVideoAnalyticsResponse["controls"]["visits"];
}) {
  return (
    <div className="flex items-center gap-2 text-sm text-[rgba(217,237,255,0.36)]">
      <div className="flex h-7 w-12 items-center justify-center rounded-full bg-panel/80 text-base text-[#80838d]">
        {data.count}
      </div>
      <span>{data.label}</span>
    </div>
  );
}

function ActionButton({
  data
}: {
  data: ProgressionVideoAnalyticsResponse["controls"]["action"];
}) {
  return (
    <button className="flex h-[37px] items-center gap-2 rounded-lg bg-[#e0e1e6] px-8 text-sm font-semibold text-[#60646c]">
      <img alt="" className="h-4 w-4" src={data.iconUrl} />
      {data.label}
    </button>
  );
}

function ViewTabs({
  tabs
}: {
  tabs: ProgressionVideoAnalyticsResponse["viewTabs"];
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-panel/80 p-1 text-xs">
      {tabs.map((tab) => (
        <div
          key={tab.label}
          className={`rounded-md px-4 py-1 text-xs ${
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

function VideoPlayer({
  data
}: {
  data: ProgressionVideoAnalyticsResponse["videoSection"]["player"];
}) {
  return (
    <div className="relative h-[611px] overflow-hidden rounded-lg">
      <img
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        src={data.posterUrl}
      />
      <div className="absolute inset-0 bg-black/50" />
      <img
        alt=""
        className="absolute left-1/2 top-1/2 h-[88px] w-[88px] -translate-x-1/2 -translate-y-1/2"
        src={data.playIconUrl}
      />
      <div className="absolute right-4 top-4 w-[179px] rounded bg-[rgba(13,16,23,0.4)] p-4">
        <div className="flex items-center gap-2 text-xs text-[#edeef0]">
          <img alt="" className="h-5 w-5" src={data.blurToggle.iconUrl} />
          <span>{data.blurToggle.label}</span>
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-[rgba(44,45,48,0.76)] px-4 py-2 text-xs text-[#0090ff]">
          <img alt="" className="h-4 w-4" src={data.flagButton.iconUrl} />
          <span>{data.flagButton.label}</span>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex h-[53px] items-center justify-between rounded-b-lg bg-black/60 px-6 text-xs text-white">
        <img alt="" className="h-4 w-4" src={data.speakerIconUrl} />
        <span>{data.timeLabel}</span>
        <img alt="" className="h-4 w-4" src={data.expandIconUrl} />
      </div>
      <img
        alt=""
        className="absolute bottom-[50px] left-0 right-0 h-[2px] w-full"
        src={data.timelineUrl}
      />
      <img
        alt=""
        className="absolute bottom-[6px] left-[356px] h-2 w-2"
        src={data.markerIconUrl}
      />
    </div>
  );
}

function NotesPanel({
  data
}: {
  data: ProgressionVideoAnalyticsResponse["videoSection"]["notesPanel"];
}) {
  return (
    <div className="ds-card p-4">
      <div className="flex items-center gap-4 border-b border-[#2b2d33] pb-2 text-sm">
        {data.tabs.map((tab) => (
          <span
            key={tab.label}
            className={tab.active ? "text-[#0588f0]" : "text-[#80838d]"}
          >
            {tab.label}
          </span>
        ))}
      </div>
      <div className="mt-4 space-y-4 text-xs text-[rgba(217,237,255,0.36)]">
        {data.notes.map((note, index) => (
          <div key={`${note.author}-${index}`} className="space-y-2">
            <div className="flex items-center gap-2 text-[12px] text-[#5eb1ef]">
              <img alt="" className="h-4 w-4" src={note.authorIconUrl} />
              <span>{note.author}</span>
              <span className="text-[rgba(217,237,255,0.36)]">{note.date}</span>
            </div>
            <p className="pl-6 text-[12px] text-[rgba(217,237,255,0.6)]">
              {note.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function OtherVideosRow({
  data
}: {
  data: ProgressionVideoAnalyticsResponse["otherVideos"];
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm text-[rgba(217,237,255,0.36)]">
        <div className="flex items-center gap-3">
          <span>{data.title}</span>
          <span>{data.countLabel}</span>
        </div>
        <img alt="" className="h-3 w-3" src={data.nextIconUrl} />
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {data.items.map((item) => (
          <div key={item.title} className="space-y-2">
            <div
              className={`relative h-[92px] w-[181px] overflow-hidden rounded-md ${
                item.active ? "border-2 border-[#0090ff]" : ""
              }`}
            >
              <img
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                src={item.thumbnailUrl}
              />
              <img
                alt=""
                className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2"
                src={item.playIconUrl}
              />
            </div>
            <p
              className={`text-xs ${
                item.active ? "text-[#0090ff]" : "text-[#80838d]"
              }`}
            >
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MetricsTabs({
  data
}: {
  data: ProgressionVideoAnalyticsResponse["metricsTabs"];
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-6 border-b border-[#2b2d33] pb-2 text-sm">
        {data.tabs.map((tab) => (
          <span
            key={tab.label}
            className={tab.active ? "text-[#0588f0]" : "text-[#80838d]"}
          >
            {tab.label}
          </span>
        ))}
      </div>
      <p className="text-xs text-[rgba(217,237,255,0.36)]">
        {data.description}
      </p>
    </div>
  );
}

function MetricGroup({
  group
}: {
  group: ProgressionVideoAnalyticsResponse["metricGroups"][number];
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-[#edeef0]">{group.title}</p>
      <div className="grid gap-4 xl:grid-cols-4">
        {group.cards.map((card) => (
          <MetricCard key={card.title} card={card} />
        ))}
      </div>
    </div>
  );
}

function MetricCard({
  card
}: {
  card: ProgressionVideoAnalyticsResponse["metricGroups"][number]["cards"][number];
}) {
  return (
    <div className="ds-card p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-[#edeef0]">{card.title}</p>
        <AlertBadge data={card.alert} />
      </div>
      <div className="mt-4 space-y-1">
        <span className="text-[10px] text-[rgba(217,237,255,0.36)]">
          {card.latest.label}
        </span>
        <div className="flex items-center gap-2 text-2xl font-medium text-[#edeef0]">
          <span>{card.latest.value}</span>
          <img alt="" className="h-4 w-4" src={card.latest.trendIconUrl} />
        </div>
        <span className="text-[10px] text-[rgba(217,237,255,0.36)]">
          {card.latest.timestamp}
        </span>
      </div>
      <div className="mt-3 flex items-center justify-between text-[10px] text-[rgba(217,237,255,0.36)]">
        <span>
          {card.cohort.label} {card.cohort.value}
        </span>
        <span>
          {card.baseline.label} {card.baseline.value}
        </span>
      </div>
    </div>
  );
}

function ChartPanel({
  panel
}: {
  panel: ProgressionVideoAnalyticsResponse["chartPanels"][number];
}) {
  return (
    <div className="ds-card p-4">
      <p className="text-xs text-[#edeef0]">{panel.title}</p>
      <div className="mt-3 rounded bg-panel-soft/60 p-3 text-xs text-[rgba(217,237,255,0.36)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px]">{panel.current.label}</p>
            <p className="text-[10px]">{panel.current.date}</p>
          </div>
          <div className="flex items-center gap-2 text-lg text-[#edeef0]">
            <span>{panel.current.value}</span>
            <img alt="" className="h-4 w-4" src={panel.current.trendIconUrl} />
          </div>
        </div>
      </div>
      <div className="mt-3 text-[10px] text-[rgba(217,237,255,0.36)]">
        <div className="flex items-center justify-between">
          <span>{panel.lastVisits.title}</span>
          <div className="flex items-center gap-3">
            <span>
              {panel.lastVisits.cohort.label} {panel.lastVisits.cohort.value}
            </span>
            <span>
              {panel.lastVisits.baseline.label}{" "}
              {panel.lastVisits.baseline.value}
            </span>
          </div>
        </div>
        <div className="mt-2 flex gap-3">
          {panel.lastVisits.visits.map((visit) => (
            <div
              key={visit.label}
              className="flex flex-1 flex-col items-center rounded bg-panel-soft/60 py-2"
            >
              <span>{visit.label}</span>
              <span className="text-[#edeef0]">{visit.value}</span>
            </div>
          ))}
        </div>
      </div>
      <ChartGrid
        xAxisLabels={panel.xAxisLabels}
        yAxisLabels={panel.yAxisLabels}
        placeholder={panel.placeholder}
      />
      <Callout iconUrl={panel.callout.iconUrl} text={panel.callout.text} />
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
    <div className="relative mt-3 h-[130px] rounded bg-panel-soft/60 px-8 py-3">
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

function Callout({ iconUrl, text }: { iconUrl: string; text: string }) {
  return (
    <div className="mt-3 flex items-center gap-2 rounded bg-panel-soft/60 px-3 py-2 text-[11px] text-[rgba(241,247,254,0.71)]">
      <img alt="" className="h-5 w-5" src={iconUrl} />
      <span>{text}</span>
    </div>
  );
}
