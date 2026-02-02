import { toneChipStyles } from "@/components/patient-overview/toneStyles";
import type { LegacyPatientOverviewResponse } from "@/types/patient-overview";

type MetricTilesProps = {
  data: LegacyPatientOverviewResponse["metricTiles"];
};

export default function MetricTiles({ data }: MetricTilesProps) {
  return (
    <section className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-ink-muted">
          {data.title}
        </p>
        <p className="text-sm text-ink-muted">{data.subtitle}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {data.tiles.map((tile) => (
          <div
            key={tile.label}
            className="rounded-2xl border border-white/10 bg-panel/80 p-5"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.3em] text-ink-muted">
                {tile.label}
              </span>
              <span
                className={`rounded-full border px-2 py-1 text-[10px] uppercase tracking-[0.25em] ${
                  toneChipStyles[tile.tone]
                }`}
              >
                {tile.trend}
              </span>
            </div>
            <div className="mt-4 text-3xl font-semibold text-ink">
              {tile.value}
              <span className="ml-2 text-sm font-normal text-ink-muted">
                {tile.unit}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
