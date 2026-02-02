import type { FigmaHeader, FigmaLayout } from "@/types/figma-layout";
import type { Tone } from "@/types/patient-overview";

export type ProgressionTab = {
  label: string;
  href: string;
};

export type ProgressionPatientSummary = {
  backgroundUrl: string;
  avatarUrl: string;
  name: string;
  genderBadge: string;
  birthInfo: string;
  diagnosis: string;
  risk: { label: string; iconUrl: string; tone: Tone };
  cta: { label: string; iconUrl: string };
};

export type ProgressionAiSummary = {
  title: string;
  text: string;
};

export type ProgressionCompositeScore = {
  title: string;
  value: string;
  delta: string;
  deltaIconUrl: string;
  trend: string;
  links: Array<{ label: string; iconUrl: string }>;
};

export type ProgressionAlertBadge = {
  label: string;
  tone: Tone;
  value?: string;
};

export type ProgressionRangeTab = {
  label: string;
  active?: boolean;
};

export type ProgressionSegmentOption = {
  label: string;
  active?: boolean;
};

export type ProgressionOverviewResponse = {
  patientId: string;
  layout: FigmaLayout;
  header: FigmaHeader;
  tabs: ProgressionTab[];
  patientSummary: ProgressionPatientSummary;
  aiSummary: ProgressionAiSummary;
  compositeScore: ProgressionCompositeScore;
  progressionStatus: {
    title: string;
    status: { label: string; tone: Tone };
    summary: string;
  };
  keyDrivers: {
    title: string;
    intro: { label: string; highlight: string };
    items: Array<{ text: string; iconUrl: string }>;
  };
  diseaseProgression: {
    title: string;
    description: string;
    score: {
      label: string;
      value: string;
      timestamp: string;
      trendIconUrl: string;
    };
    legend: Array<{ label: string; tone: Tone }>;
    xAxisLabels: string[];
    yAxisLabels: string[];
    placeholder: string;
    callout: { iconUrl: string; text: string };
  };
  emptyState: { title: string; description: string };
};

export type ProgressionBiomarkersResponse = {
  patientId: string;
  layout: FigmaLayout;
  header: FigmaHeader;
  tabs: ProgressionTab[];
  patientSummary: ProgressionPatientSummary;
  aiSummary: ProgressionAiSummary;
  compositeScore: ProgressionCompositeScore;
  summarySection: {
    title: string;
    dateLabel: string;
    statusLabel: string;
    metrics: Array<{
      title: string;
      alert: ProgressionAlertBadge;
      latest: {
        label: string;
        value: string;
        timestamp: string;
        trendIconUrl: string;
      };
      cohort: { label: string; value: string };
      baseline: { label: string; value: string };
    }>;
    callout: { iconUrl: string; text: string };
  };
  metricsSection: {
    title: string;
    rangeTabs: ProgressionRangeTab[];
    dateRange: { label: string; iconUrl: string };
    nav: { previousIconUrl: string; nextIconUrl: string };
    charts: Array<{
      title: string;
      alert: ProgressionAlertBadge;
      latest: {
        label: string;
        value: string;
        timestamp: string;
        trendIconUrl: string;
      };
      average: { label: string; value: string; timestamp: string };
      cohort: { label: string; value: string };
      baseline: { label: string; value: string };
      yAxisLabels: string[];
      xAxisLabels: string[];
      placeholder: string;
      callout: { iconUrl: string; text: string };
    }>;
  };
  emptyState: { title: string; description: string };
};

export type ProgressionOrganSystemsResponse = {
  patientId: string;
  layout: FigmaLayout;
  header: FigmaHeader;
  tabs: ProgressionTab[];
  patientSummary: ProgressionPatientSummary;
  aiSummary: ProgressionAiSummary;
  compositeScore: ProgressionCompositeScore;
  segments: Array<{
    key: string;
    label: string;
    active?: boolean;
    metricsSection: {
      title: string;
      rangeTabs: ProgressionRangeTab[];
      dateRange: { label: string; iconUrl: string };
      nav: { previousIconUrl: string; nextIconUrl: string };
      cards: Array<{
        title: string;
        alert: ProgressionAlertBadge;
        latest: {
          label: string;
          value: string;
          timestamp: string;
          trendIconUrl: string;
        };
        average: { label: string; value: string; timestamp: string };
        cohort: { label: string; value: string };
        baseline: { label: string; value: string };
        yAxisLabels: string[];
        xAxisLabels: string[];
        placeholder: string;
        callout: { iconUrl: string; text: string };
        legend?: Array<{ label: string; color: string }>;
      }>;
    };
  }>;
  emptyState: { title: string; description: string };
};

export type ProgressionVideoAnalyticsResponse = {
  patientId: string;
  layout: FigmaLayout;
  header: FigmaHeader;
  tabs: ProgressionTab[];
  patientSummary: ProgressionPatientSummary;
  aiSummary: ProgressionAiSummary;
  compositeScore: ProgressionCompositeScore;
  controls: {
    rangeTabs: ProgressionRangeTab[];
    dateRange: { label: string; iconUrl: string };
    sources: { label: string; options: ProgressionSegmentOption[] };
    visits: { count: string; label: string };
    action: { label: string; iconUrl: string };
  };
  viewTabs: ProgressionSegmentOption[];
  videoSection: {
    title: string;
    player: {
      posterUrl: string;
      timelineUrl: string;
      timeLabel: string;
      playIconUrl: string;
      speakerIconUrl: string;
      expandIconUrl: string;
      blurToggle: { iconUrl: string; label: string };
      flagButton: { iconUrl: string; label: string };
      markerIconUrl: string;
    };
    notesPanel: {
      tabs: ProgressionSegmentOption[];
      notes: Array<{
        author: string;
        authorIconUrl: string;
        date: string;
        text: string;
        tone?: Tone;
      }>;
    };
  };
  otherVideos: {
    title: string;
    countLabel: string;
    nextIconUrl: string;
    items: Array<{
      title: string;
      thumbnailUrl: string;
      playIconUrl: string;
      active?: boolean;
    }>;
  };
  metricsTabs: {
    tabs: ProgressionSegmentOption[];
    description: string;
  };
  metricGroups: Array<{
    title: string;
    cards: Array<{
      title: string;
      alert: ProgressionAlertBadge;
      latest: {
        label: string;
        value: string;
        timestamp: string;
        trendIconUrl: string;
      };
      cohort: { label: string; value: string };
      baseline: { label: string; value: string };
    }>;
  }>;
  chartPanels: Array<{
    title: string;
    current: { label: string; date: string; value: string; trendIconUrl: string };
    lastVisits: {
      title: string;
      cohort: { label: string; value: string };
      baseline: { label: string; value: string };
      visits: Array<{ label: string; value: string }>;
    };
    yAxisLabels: string[];
    xAxisLabels: string[];
    placeholder: string;
    callout: { iconUrl: string; text: string };
  }>;
  emptyState: { title: string; description: string };
};

export type ProgressionTimelineResponse = {
  patientId: string;
  layout: FigmaLayout;
  header: FigmaHeader;
  tabs: ProgressionTab[];
  patientSummary: ProgressionPatientSummary;
  aiSummary: ProgressionAiSummary;
  compositeScore: ProgressionCompositeScore;
  overview: {
    title: string;
    description: string;
    score: {
      label: string;
      value: string;
      timestamp: string;
      trendIconUrl: string;
    };
    legend: Array<{ label: string; tone: Tone }>;
    xAxisLabels: string[];
    yAxisLabels: string[];
    placeholder: string;
    callout: { iconUrl: string; text: string };
  };
  progressCards: Array<{
    title: string;
    alert: ProgressionAlertBadge;
    score: {
      label: string;
      value: string;
      timestamp: string;
      trendIconUrl: string;
    };
    xAxisLabels: string[];
    yAxisLabels: string[];
    placeholder: string;
    callout: { iconUrl: string; text: string };
  }>;
  filters: {
    title: string;
    closeIconUrl: string;
    sections: Array<{
      label: string;
      value: string;
      iconUrl: string;
      selectedCount?: string;
      tags?: Array<{ label: string; iconUrl: string }>;
    }>;
  };
  emptyState: { title: string; description: string };
};

export type LegacyProgressionFunctionalResponse = {
  patientId: string;
  page: { title: string; subtitle: string };
  scorecards: Array<{
    label: string;
    value: string;
    change: string;
    context: string;
  }>;
  charts: Array<{
    title: string;
    description: string;
    height: number;
    placeholder: string;
  }>;
  assessments: {
    title: string;
    items: Array<{ label: string; value: string; note: string }>;
  };
  emptyState: { title: string; description: string };
};

export type LegacyProgressionBiomarkersResponse = {
  patientId: string;
  page: { title: string; subtitle: string };
  panels: Array<{
    title: string;
    status: string;
    summary: string;
    markers: Array<{ label: string; value: string; trend: string }>;
  }>;
  plots: Array<{ title: string; description: string; placeholder: string }>;
  emptyState: { title: string; description: string };
};

export type LegacyProgressionOrganSystemsResponse = {
  patientId: string;
  page: { title: string; subtitle: string };
  systems: Array<{
    title: string;
    status: string;
    summary: string;
    metrics: Array<{ label: string; value: string }>;
  }>;
  emptyState: { title: string; description: string };
};

export type LegacyProgressionVideoAnalyticsResponse = {
  patientId: string;
  page: { title: string; subtitle: string };
  metrics: Array<{
    label: string;
    value: string;
    trend: string;
    detail: string;
  }>;
  insights: {
    title: string;
    items: Array<{ label: string; value: string; detail: string }>;
  };
  charts: Array<{
    title: string;
    description: string;
    height: number;
    placeholder: string;
  }>;
  emptyState: { title: string; description: string };
};

export type LegacyProgressionTimelineResponse = {
  patientId: string;
  page: { title: string; subtitle: string };
  groups: Array<{
    label: string;
    events: Array<{ date: string; title: string; detail: string; tag: string }>;
  }>;
  emptyState: { title: string; description: string };
};
