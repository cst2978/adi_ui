"use client";

import { useEffect, useMemo, useState } from "react";
import FigmaShell from "@/components/layouts/FigmaShell";
import PatientNavigation from "@/components/navigation/PatientNavigation";
import patientOverviewData from "../../../mocks/patientOverview.json";
import patientsData from "../../../mocks/patients.json";
import type { PatientOverviewResponse } from "@/types/patient-overview";
import type { PatientsForUserResponse } from "@/types/patients";

export default function PatientSelectionShell({
  children
}: {
  children: React.ReactNode;
}) {
  const overviewPayload = patientOverviewData as PatientOverviewResponse;
  const patientsPayload = patientsData as PatientsForUserResponse;
  const fallbackId =
    patientsPayload.patients?.[0]?.id ?? overviewPayload.patientId;
  const [navPatientId, setNavPatientId] = useState(fallbackId);

  useEffect(() => {
    const stored = window.localStorage.getItem("lastPatientId");
    if (stored) {
      setNavPatientId(stored);
    }
  }, []);

  const header = useMemo(
    () => ({
      ...overviewPayload.header,
      title: "Patients",
      search: {
        ...overviewPayload.header.search,
        placeholder:
          patientsPayload.page?.searchPlaceholder ??
          overviewPayload.header.search.placeholder
      }
    }),
    [overviewPayload.header, patientsPayload.page?.searchPlaceholder]
  );

  return (
    <div className="flex min-h-screen bg-[#111113] text-[#edeef0]">
      <PatientNavigation patientId={navPatientId} />
      <div className="min-w-0 flex-1">
        <FigmaShell layout={overviewPayload.layout} header={header} mode="embedded">
          {children}
        </FigmaShell>
      </div>
    </div>
  );
}
