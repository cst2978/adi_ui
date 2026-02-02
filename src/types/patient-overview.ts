export type Tone = "critical" | "warning" | "info" | "success" | "neutral";

import type { FigmaHeader, FigmaLayout } from "@/types/figma-layout";

export type PatientOverviewResponse = {
  patientId: string;
  layout: FigmaLayout;
  header: FigmaHeader;
  patientCard: {
    backgroundUrl: string;
    avatarUrl: string;
    name: string;
    genderBadge: string;
    birthInfo: string;
    diagnosis: string;
    risk: { label: string; iconUrl: string; tone: Tone };
    infoGroups: Array<{
      items: Array<{ iconUrl: string; label: string; value: string }>;
    }>;
  };
  changeSummary: {
    title: string;
    summary: { label: string; text: string };
    alertSection: {
      iconUrl: string;
      title: string;
      cta: { label: string; iconUrl: string };
    };
    metrics: Array<{
      label: string;
      value: string;
      deltaIconUrl: string;
      baselineLabel: string;
      baselineValue: string;
      cohortLabel: string;
      cohortValue: string;
    }>;
    footer: { leftLabel: string; rightLabel: string };
  };
  compositeScore: {
    title: string;
    value: string;
    delta: string;
    deltaIconUrl: string;
    trend: string;
    links: Array<{ label: string; iconUrl: string }>;
  };
  safetySignals: {
    title: string;
    items: Array<{ iconUrl: string; label: string }>;
    cta: { iconUrl: string; label: string };
    link: { iconUrl: string; label: string };
  };
  multispecialty: {
    title: string;
    controls: Array<{ iconUrl: string }>;
    cards: Array<{
      label: string;
      status: { label: string; tone: Tone };
      summary: string;
    }>;
  };
  timeline: {
    title: string;
    cta: { label: string; iconUrl: string };
    events: Array<{
      date: string;
      title: string;
      detail: string;
      tone: Tone;
      iconUrl: string;
    }>;
  };
  emptyState: { title: string; description: string };
};

export type LegacyPatientOverviewResponse = {
  patientId: string;
  page: {
    kicker: string;
    title: string;
    subtitle: string;
  };
  patientCard: {
    title: string;
    name: string;
    idLabel: string;
    idValue: string;
    fields: Array<{ label: string; value: string }>;
    tags: Array<{ label: string; tone: Tone }>;
    risk: { label: string; value: string; tone: Tone; detail: string };
    lastUpdated: { label: string; value: string };
  };
  changeSummary: {
    title: string;
    summary: string;
    highlights: Array<{ label: string; value: string; trend: string }>;
    meta: Array<{ label: string; value: string }>;
  };
  metricTiles: {
    title: string;
    subtitle: string;
    tiles: Array<{
      label: string;
      value: string;
      unit: string;
      trend: string;
      tone: Tone;
    }>;
  };
  safetySignals: {
    title: string;
    subtitle: string;
    signals: Array<{
      label: string;
      status: string;
      detail: string;
      tone: Tone;
    }>;
  };
  multispecialtySnapshot: {
    title: string;
    subtitle: string;
    items: Array<{ label: string; value: string }>;
  };
  timelinePreview: {
    title: string;
    subtitle: string;
    events: Array<{
      date: string;
      label: string;
      detail: string;
      tag: string;
    }>;
    cta: { label: string; href: string };
  };
  emptyState: {
    title: string;
    description: string;
  };
};
