import type {
  ProgressionAiSummary,
  ProgressionCompositeScore,
  ProgressionPatientSummary
} from "@/types/progression";
import type { Tone } from "@/types/patient-overview";
import { CardTitle, Label } from "@/components/ui/typography";

const toneStyles: Record<Tone, string> = {
  critical: "bg-rose-500/15 text-rose-200",
  warning: "bg-amber-400/15 text-amber-200",
  info: "bg-sky-400/15 text-sky-200",
  success: "bg-emerald-400/15 text-emerald-200",
  neutral: "bg-white/10 text-ink-muted"
};

export function PatientSummaryCard({
  data
}: {
  data: ProgressionPatientSummary;
}) {
  return (
    <div className="ds-card relative h-[161px] overflow-hidden p-4">
      <img
        alt=""
        className="absolute left-[101px] top-[-55px] h-[271px] w-[291px]"
        src={data.backgroundUrl}
      />
      <div className="relative flex h-full items-start gap-6">
        <div className="h-[108px] w-[108px] overflow-hidden rounded-lg">
          <img alt="" className="h-full w-full object-cover" src={data.avatarUrl} />
        </div>
        <div className="space-y-3">
          <CardTitle as="p">{data.name}</CardTitle>
          <div className="flex items-center gap-3">
            <div className="flex h-6 w-8 items-center justify-center rounded-sm bg-[#70b8ff] text-sm font-semibold text-[#0b161a]">
              {data.genderBadge}
            </div>
            <span className="text-sm text-[rgba(252,253,255,0.94)]">
              {data.birthInfo}
            </span>
          </div>
          <p className="text-sm text-[rgba(252,253,255,0.94)]">
            {data.diagnosis}
          </p>
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center gap-2 rounded px-3 py-2 text-sm ${toneStyles[data.risk.tone]}`}
            >
              <img alt="" className="h-4 w-4" src={data.risk.iconUrl} />
              <span>{data.risk.label}</span>
            </div>
            <div className="flex items-center gap-2 rounded bg-[rgba(221,234,248,0.08)] px-2 py-2 text-sm text-[rgba(229,237,253,0.48)]">
              <span>{data.cta.label}</span>
              <img alt="" className="h-4 w-4" src={data.cta.iconUrl} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AiSummaryCard({ data }: { data: ProgressionAiSummary }) {
  return (
    <div className="ds-card p-4">
      <CardTitle as="p">{data.title}</CardTitle>
      <p className="mt-3 text-xs text-[rgba(217,237,255,0.36)]">
        {data.text}
      </p>
    </div>
  );
}

export function CompositeScoreCard({
  data
}: {
  data: ProgressionCompositeScore;
}) {
  return (
    <div className="ds-card p-4">
      <div className="flex items-center justify-between">
        <Label as="p">{data.title}</Label>
        <div className="flex items-center gap-2 text-lg font-semibold text-[#edeef0]">
          <span>{data.value}</span>
          <img alt="" className="h-4 w-4" src={data.deltaIconUrl} />
          <span className="text-xs text-[rgba(217,237,255,0.36)]">
            {data.delta}
          </span>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 rounded bg-[#202126] px-3 py-2 text-xs text-[rgba(217,237,255,0.36)]">
        <span>{data.trend}</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-3 text-[10px] text-[#3b9eff]">
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
