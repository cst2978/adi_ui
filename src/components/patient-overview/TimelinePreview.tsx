import Link from "next/link";
import type { LegacyPatientOverviewResponse } from "@/types/patient-overview";

type TimelinePreviewProps = {
  data: LegacyPatientOverviewResponse["timelinePreview"];
};

export default function TimelinePreview({ data }: TimelinePreviewProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-panel/80 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-ink-muted">
            {data.title}
          </p>
          <p className="text-sm text-ink-muted">{data.subtitle}</p>
        </div>
        <Link
          href={data.cta.href}
          className="rounded-full border border-white/10 bg-panel-soft/70 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-ink"
        >
          {data.cta.label}
        </Link>
      </div>
      <div className="mt-4 space-y-4">
        {data.events.map((event) => (
          <div
            key={`${event.date}-${event.label}`}
            className="rounded-2xl border border-white/10 bg-panel-soft/60 p-4"
          >
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-ink-muted">
              <span>{event.date}</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">
                {event.tag}
              </span>
            </div>
            <p className="mt-2 text-sm text-ink">{event.label}</p>
            <p className="mt-1 text-sm text-ink-muted">{event.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
