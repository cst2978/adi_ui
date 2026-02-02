import type { Tone } from "@/types/patient-overview";

export const toneChipStyles: Record<Tone, string> = {
  success: "border-emerald-400/40 bg-emerald-400/20 text-emerald-100",
  warning: "border-amber-300/40 bg-amber-300/20 text-amber-100",
  critical: "border-rose-400/40 bg-rose-400/20 text-rose-100",
  info: "border-sky-300/40 bg-sky-300/20 text-sky-100",
  neutral: "border-white/15 bg-white/5 text-ink-muted"
};
