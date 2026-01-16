"use client";

import { useMemo, useState } from "react";
import type { RealTimeMonitoringPayload } from "@/lib/realTimeMonitoringData";
import type { TabConfig } from "@/lib/realTimeMonitoringConfig";
import MetricSection from "@/components/real-time-monitoring/metric-section";

export default function RealTimeMonitoringPanel({
  data,
  tabs
}: {
  data: RealTimeMonitoringPayload | null;
  tabs: TabConfig[];
}) {
  const availableTabs = tabs.length
    ? tabs
    : [
        { tab_id: "cardiovascular", title: "Cardiovascular" },
        { tab_id: "pulmonary", title: "Pulmonary" }
      ];
  const [activeTab, setActiveTab] = useState(availableTabs[0].tab_id);
  const [activeRange, setActiveRange] = useState(
    data?.date_ranges?.[0] ?? "1M"
  );

  const cardiovascular = data?.cardiovascular;
  const pulmonary = data?.pulmonary;

  const dateRanges = useMemo(
    () => data?.date_ranges ?? ["1M", "2M", "3M", "6M", "Y"],
    [data?.date_ranges]
  );

  if (!data) {
    return (
      <div className="rounded-2xl border border-white/10 bg-panel/80 p-6 text-sm text-ink-muted">
        Real-time monitoring data is not available yet.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-3">
        {availableTabs.map((tab) => (
          <button
            key={tab.tab_id}
            className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.3em] transition ${
              activeTab === tab.tab_id
                ? "bg-accent/30 text-ink"
                : "border border-white/10 bg-white/5 text-ink-muted"
            }`}
            onClick={() => setActiveTab(tab.tab_id)}
          >
            {tab.title}
          </button>
        ))}
        <div className="ml-auto text-xs text-ink-muted">
          Updated {new Date(data.updated_at).toLocaleString()}
        </div>
      </div>

      {activeTab === "cardiovascular" && cardiovascular ? (
        <div className="space-y-10">
          <MetricSection
            title="Cardiovascular Summary"
            metrics={cardiovascular.summary}
          />

          <MetricSection
            title="Cardiovascular Metrics"
            metrics={cardiovascular.metrics}
            showChart
            range={activeRange}
            actions={
              <div className="flex flex-wrap items-center gap-2">
                {dateRanges.map((range) => (
                  <button
                    key={range}
                    className={`rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.25em] transition ${
                      activeRange === range
                        ? "border-accent/50 bg-accent/20 text-ink"
                        : "border-white/10 bg-white/5 text-ink-muted"
                    }`}
                    onClick={() => setActiveRange(range)}
                  >
                    {range}
                  </button>
                ))}
              </div>
            }
            emptyMessage={`No data available for ${activeRange}.`}
          />

          <MetricSection
            title="Gait Metrics"
            metrics={cardiovascular.gait_metrics}
          />

          <MetricSection
            title="Physical Metrics Activity"
            metrics={cardiovascular.physical_metrics}
          />
        </div>
      ) : null}

      {activeTab === "pulmonary" && pulmonary ? (
        <div className="space-y-10">
          <MetricSection
            title="Pulmonary Summary"
            metrics={pulmonary.summary}
            emptyMessage="Pulmonary stream coming soon."
          />
          <MetricSection
            title="Pulmonary Metrics"
            metrics={pulmonary.metrics}
            emptyMessage="Pulmonary metrics will appear here once available."
          />
        </div>
      ) : null}
    </div>
  );
}
