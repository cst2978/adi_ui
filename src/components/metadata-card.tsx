import { formatDate } from "@/lib/formatters";

type MetadataCardProps = {
  header: Record<string, string>;
};

const metadataFields = [
  { key: "diagnosis_date", label: "Diagnosis Date", format: formatDate },
  { key: "mutation_type", label: "Mutation Type" },
  { key: "ambulatory_status", label: "Ambulation Status" },
  { key: "current_therapy", label: "Current Therapy" },
  { key: "care_team", label: "Care Team" },
  { key: "test_type", label: "Test Type" }
];

export default function MetadataCard({ header }: MetadataCardProps) {
  return (
    <section className="h-full rounded-2xl border border-white/10 bg-panel/90 p-6 shadow-card">
      <h3 className="text-sm uppercase tracking-[0.3em] text-ink-muted">
        Patient Metadata
      </h3>
      <div className="mt-4 space-y-4 text-sm">
        {metadataFields.map((field) => {
          const rawValue = header[field.key] ?? "N/A";
          const value = field.format ? field.format(rawValue) : rawValue;

          return (
            <div key={field.key} className="flex items-start justify-between">
              <span className="text-xs uppercase tracking-[0.2em] text-ink-muted">
                {field.label}
              </span>
              <span className="max-w-[60%] text-right text-ink">{value}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
