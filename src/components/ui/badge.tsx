import type { Tone } from "@/types/patient-overview";

type BadgeProps = {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
};

const toneClasses: Record<NonNullable<BadgeProps["tone"]>, string> = {
  critical: "ds-badge ds-badge-critical",
  warning: "ds-badge ds-badge-warning",
  info: "ds-badge ds-badge-info",
  success: "ds-badge ds-badge-success",
  neutral: "ds-badge ds-badge-neutral"
};

export default function Badge({
  children,
  tone = "neutral",
  className
}: BadgeProps) {
  return (
    <span
      className={[toneClasses[tone], className].filter(Boolean).join(" ")}
    >
      {children}
    </span>
  );
}
