"use client";

import { useRouter, useSearchParams } from "next/navigation";

type PatientOption = {
  patient_id: string;
  patient_name: string;
};

type PatientSelectorProps = {
  patients: PatientOption[];
  selectedId: string;
  basePath: string;
};

export default function PatientSelector({
  patients,
  selectedId,
  basePath
}: PatientSelectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <div className="flex items-center gap-3">
      <label className="text-xs uppercase tracking-[0.3em] text-ink-muted">
        Patient
      </label>
      <select
        className="rounded-xl border border-white/10 bg-panel-soft px-4 py-2 text-sm text-ink outline-none"
        value={selectedId}
        onChange={(event) => {
          const params = new URLSearchParams(searchParams?.toString());
          params.set("patient", event.target.value);
          router.replace(`${basePath}?${params.toString()}`);
        }}
      >
        {patients.map((patient) => (
          <option key={patient.patient_id} value={patient.patient_id}>
            {patient.patient_id} - {patient.patient_name}
          </option>
        ))}
      </select>
    </div>
  );
}
