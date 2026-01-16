import type { TileGroupResult } from "@/lib/patientOverviewData";
import type { SetupConfig } from "@/lib/patientOverviewConfig";
import TileCard from "@/components/tile-card";

export default function TileGrid({
  groups,
  layout
}: {
  groups: TileGroupResult[];
  layout: SetupConfig["tiles"]["layout"];
}) {
  return (
    <div className="space-y-10">
      {groups.map((group) => (
        <section key={group.group_id} className="space-y-4">
          <div className="flex items-center gap-4">
            <h3 className="text-sm uppercase tracking-[0.3em] text-ink-muted">
              {group.title}
            </h3>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(auto-fit, minmax(${layout.grid.min_tile_width_px}px, 1fr))`,
              gap: layout.grid.gap_px
            }}
          >
            {group.tiles.map((tile) => (
              <TileCard key={tile.tile.tile_id} tile={tile} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
