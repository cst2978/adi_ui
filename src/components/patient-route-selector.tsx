"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams, useParams } from "next/navigation";
import patientsData from "../../mocks/patients.json";

type PatientSummary = {
  id: string;
  name: string;
};

export default function PatientRouteSelector() {
  const params = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedId = Array.isArray(params?.id) ? params?.id[0] : params?.id;

  const patients = useMemo<PatientSummary[]>(() => {
    const payload = patientsData as { patients?: PatientSummary[] };
    return payload.patients ?? [];
  }, []);

  if (!selectedId || patients.length === 0) {
    return null;
  }

  const handleChange = (nextId: string) => {
    const segments = pathname.split("/");
    const patientIndex = segments.indexOf("patient");
    if (patientIndex !== -1 && segments.length > patientIndex + 1) {
      segments[patientIndex + 1] = nextId;
    }
    const nextPath = segments.join("/") || "/";
    const params = new URLSearchParams(searchParams?.toString());
    router.replace(`${nextPath}?${params.toString()}`, { scroll: false });
    window.localStorage.setItem("lastPatientId", nextId);
  };

  return (
    <div className="flex items-center gap-3">
      <span className="ds-label">Patient</span>
      <select
        className="ds-input text-xs"
        value={selectedId}
        onChange={(event) => handleChange(event.target.value)}
      >
        {patients.map((patient) => (
          <option key={patient.id} value={patient.id}>
            {patient.id} · {patient.name}
          </option>
        ))}
      </select>
    </div>
  );
}
