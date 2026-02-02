import FigmaShell from "@/components/layouts/FigmaShell";
import EmptyState from "@/components/states/EmptyState";
import type { PatientOverviewResponse, Tone } from "@/types/patient-overview";

const toneStyles: Record<Tone, string> = {
  critical: "bg-rose-500/15 text-rose-200",
  warning: "bg-amber-400/15 text-amber-200",
  info: "bg-sky-400/15 text-sky-200",
  success: "bg-emerald-400/15 text-emerald-200",
  neutral: "bg-white/10 text-ink-muted"
};

export default function UpdatedPatientOverview({
  data
}: {
  data: PatientOverviewResponse;
}) {
  const hasContent =
    data.patientCard.infoGroups.length > 0 &&
    data.changeSummary.metrics.length > 0 &&
    data.multispecialty.cards.length > 0 &&
    data.timeline.events.length > 0;

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
        <div className="grid gap-4 xl:grid-cols-[425px_minmax(0,1fr)_360px]">
          <PatientCard data={data.patientCard} />
          <ChangeSummary data={data.changeSummary} />
          <div className="space-y-4">
            <CompositeScore data={data.compositeScore} />
            <SafetySignals data={data.safetySignals} />
          </div>
        </div>

        <MultispecialtySnapshot data={data.multispecialty} />
        <TimelineSection data={data.timeline} />
      </div>
    </FigmaShell>
  );
}

function PatientCard({
  data
}: {
  data: PatientOverviewResponse["patientCard"];
}) {
  return (
    <div className="relative h-[508px] overflow-hidden rounded-lg bg-panel/30 p-4">
      <img
        alt=""
        className="absolute left-[101px] top-[-55px] h-[271px] w-[291px]"
        src={data.backgroundUrl}
      />
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-center gap-5">
          <div className="h-[108px] w-[108px] overflow-hidden rounded-lg">
            <img alt="" className="h-full w-full object-cover" src={data.avatarUrl} />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-bold text-[#edeef0]">{data.name}</p>
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-8 items-center justify-center rounded-sm bg-[#70b8ff] text-sm font-semibold text-[#0b161a]">
                {data.genderBadge}
              </div>
              <span className="text-sm text-[rgba(229,237,253,0.48)]">
                {data.birthInfo}
              </span>
            </div>
            <p className="text-sm font-medium text-[rgba(229,237,253,0.48)]">
              {data.diagnosis}
            </p>
            <div className="flex items-center gap-2 rounded bg-[rgba(254,90,127,0.05)] px-4 py-1">
              <img alt="" className="h-4 w-4" src={data.risk.iconUrl} />
              <span className="text-xs font-medium text-[#e54666]">
                {data.risk.label}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {data.infoGroups.map((group, groupIndex) => (
            <div key={`group-${groupIndex}`} className="space-y-4">
              <div className="h-px w-full bg-[#2a2b2f]" />
              <div className="grid grid-cols-2 gap-4">
                {group.items.map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(17,102,251,0.09)]">
                      <img alt="" className="h-5 w-5" src={item.iconUrl} />
                    </div>
                    <div>
                      <p className="text-xs text-[rgba(217,237,255,0.36)]">
                        {item.label}
                      </p>
                      <p className="text-xs font-medium text-[rgba(241,247,254,0.71)]">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChangeSummary({
  data
}: {
  data: PatientOverviewResponse["changeSummary"];
}) {
  return (
    <div className="ds-card p-4">
      <div className="text-sm font-semibold text-[#edeef0]">
        {data.title}
      </div>
      <div className="mt-4 rounded-lg bg-panel-soft/60 p-3">
        <p className="text-xs text-[#edeef0]">{data.summary.label}</p>
        <p className="mt-2 text-xs text-[rgba(217,237,255,0.36)]">
          {data.summary.text}
        </p>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img alt="" className="h-6 w-6" src={data.alertSection.iconUrl} />
            <span className="text-xs text-[#edeef0]">
              {data.alertSection.title}
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-panel-soft/60 px-3 py-1 text-[10px] text-ink-muted">
            <span>{data.alertSection.cta.label}</span>
            <img alt="" className="h-4 w-4" src={data.alertSection.cta.iconUrl} />
          </div>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {data.metrics.map((metric) => (
            <div key={metric.label} className="rounded-lg bg-panel-soft/60 p-3">
              <div className="flex items-center justify-between text-xs text-[#8b8d98]">
                <span>{metric.label}</span>
                <div className="flex items-center gap-2 text-sm text-[#edeef0]">
                  <span>{metric.value}</span>
                  <img alt="" className="h-4 w-4" src={metric.deltaIconUrl} />
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between text-[10px] text-[rgba(217,237,255,0.36)]">
                <span>
                  {metric.baselineLabel} : {metric.baselineValue}
                </span>
                <span>
                  {metric.cohortLabel} : {metric.cohortValue}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between text-xs text-[rgba(217,237,255,0.36)]">
          <span className="rounded-full bg-panel-soft/60 px-3 py-1">
            {data.footer.leftLabel}
          </span>
          <span className="rounded-full bg-panel-soft/60 px-3 py-1">
            {data.footer.rightLabel}
          </span>
        </div>
      </div>
    </div>
  );
}

function CompositeScore({
  data
}: {
  data: PatientOverviewResponse["compositeScore"];
}) {
  return (
    <div className="ds-card p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-[#edeef0]">{data.title}</p>
        <div className="flex items-center gap-2 text-lg font-semibold text-[#edeef0]">
          <span>{data.value}</span>
          <img alt="" className="h-4 w-4" src={data.deltaIconUrl} />
        </div>
      </div>
      <div className="mt-3 rounded-lg bg-panel-soft/60 px-3 py-2 text-xs text-[rgba(217,237,255,0.36)]">
        {data.trend}
      </div>
      <div className="mt-4 flex items-center gap-4 text-[10px] text-[#3b9eff]">
        {data.links.map((link) => (
          <div key={link.label} className="flex items-center gap-2">
            <span>{link.label}</span>
            <img alt="" className="h-4 w-4" src={link.iconUrl} />
          </div>
        ))}
      </div>
    </div>
  );
}

function SafetySignals({
  data
}: {
  data: PatientOverviewResponse["safetySignals"];
}) {
  return (
    <div className="ds-card p-4">
      <div className="text-xs text-[#edeef0]">{data.title}</div>
      <div className="mt-4 space-y-3">
        {data.items.map((item, index) => (
          <div key={`${item.label}-${index}`} className="flex items-center gap-2 text-xs text-[#edeef0]">
            <img alt="" className="h-4 w-4" src={item.iconUrl} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-3 rounded-lg bg-panel-soft/60 px-3 py-2 text-xs text-[#3b9eff]">
        <img alt="" className="h-4 w-4" src={data.cta.iconUrl} />
        <span>{data.cta.label}</span>
      </div>
      <div className="mt-3 flex items-center justify-end gap-2 text-[10px] text-[#3b9eff]">
        <span>{data.link.label}</span>
        <img alt="" className="h-4 w-4" src={data.link.iconUrl} />
      </div>
    </div>
  );
}

function MultispecialtySnapshot({
  data
}: {
  data: PatientOverviewResponse["multispecialty"];
}) {
  return (
    <section className="ds-card p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs text-[#edeef0]">{data.title}</span>
        <div className="flex items-center gap-2">
          {data.controls.map((control, index) => (
            <img
              key={`${control.iconUrl}-${index}`}
              alt=""
              className="h-4 w-4"
              src={control.iconUrl}
            />
          ))}
        </div>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {data.cards.map((card) => (
          <div key={card.label} className="rounded-lg bg-panel-soft/60 p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#edeef0]">{card.label}</span>
              <span
                className={`rounded-full px-2 py-1 text-[10px] ${
                  toneStyles[card.status.tone]
                }`}
              >
                {card.status.label}
              </span>
            </div>
            <p className="mt-3 text-xs text-[rgba(217,237,255,0.36)]">
              {card.summary}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function TimelineSection({
  data
}: {
  data: PatientOverviewResponse["timeline"];
}) {
  return (
    <section className="ds-card p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs text-[#edeef0]">{data.title}</span>
        <div className="flex items-center gap-2 text-[10px] text-[#3b9eff]">
          <span>{data.cta.label}</span>
          <img alt="" className="h-4 w-4" src={data.cta.iconUrl} />
        </div>
      </div>
      <div className="mt-4 grid gap-3 xl:grid-cols-5">
        {data.events.map((event) => (
          <div key={`${event.date}-${event.title}`} className="rounded-lg bg-panel-soft/60 p-3">
            <div className="flex items-center gap-2">
              <img alt="" className="h-4 w-4" src={event.iconUrl} />
              <span
                className={`rounded-full px-2 py-1 text-[10px] ${
                  toneStyles[event.tone]
                }`}
              >
                {event.date}
              </span>
            </div>
            <p className="mt-3 text-xs text-[#edeef0]">{event.title}</p>
            <p className="mt-2 text-xs text-[rgba(217,237,255,0.36)]">
              {event.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
