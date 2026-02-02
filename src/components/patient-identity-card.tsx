import { formatAge, formatDate } from "@/lib/formatters";

type PatientIdentityCardProps = {
  header: Record<string, string>;
};

export default function PatientIdentityCard({
  header
}: PatientIdentityCardProps) {
  const name = header.name ?? "Unknown";
  const gender = header.gender ?? "N/A";
  const dob = header.date_of_birth;
  const diagnosis = header.diagnosis ?? "N/A";
  const risk = header.risk_level ?? "N/A";

  return (
    <section className="ds-card flex h-full flex-col justify-between p-6">
      <div className="flex items-start gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/20 text-lg font-semibold text-ink">
          {name
            .split(" ")
            .map((part) => part[0])
            .slice(0, 2)
            .join("")}
        </div>
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="ds-section-title">{name}</h2>
            <span className="ds-chip">{gender}</span>
          </div>
          <div className="ds-body">
            DOB {formatDate(dob)} - {formatAge(dob)}
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <div>
          <p className="ds-label">Diagnosis</p>
          <p className="ds-value">{diagnosis}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="ds-badge ds-badge-critical">{risk}</span>
          <span className="ds-caption">Clinical risk tier</span>
        </div>
      </div>
    </section>
  );
}
