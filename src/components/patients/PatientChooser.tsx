"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import EmptyState from "@/components/states/EmptyState";
import Badge from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Body, PageTitle, SectionTitle } from "@/components/ui/typography";
import type { PatientListItem, PatientsForUserResponse } from "@/types/patients";

function getFieldValue(patient: PatientListItem, label: string) {
  return patient.fields.find((field) => field.label === label)?.value;
}

function formatAge(dateOfBirth?: string) {
  if (!dateOfBirth) {
    return "Unknown";
  }
  const parsed = new Date(dateOfBirth);
  if (Number.isNaN(parsed.getTime())) {
    return "Unknown";
  }
  const now = new Date();
  let years = now.getFullYear() - parsed.getFullYear();
  let months = now.getMonth() - parsed.getMonth();
  if (now.getDate() < parsed.getDate()) {
    months -= 1;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return `${Math.max(years, 0)}y ${Math.max(months, 0)}m`;
}

export default function PatientChooser({
  data,
  showHeader = true
}: {
  data: PatientsForUserResponse;
  showHeader?: boolean;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [lastPatientId, setLastPatientId] = useState<string | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem("lastPatientId");
    setLastPatientId(stored);
  }, []);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredPatients = useMemo(() => {
    if (!normalizedQuery) {
      return data.patients;
    }

    return data.patients.filter((patient) => {
      const fields = patient.fields.flatMap((field) => [field.label, field.value]);
      const tokens = [
        patient.id,
        patient.name,
        patient.subtitle,
        patient.risk.label,
        ...patient.tags,
        ...fields
      ];

      return tokens.join(" ").toLowerCase().includes(normalizedQuery);
    });
  }, [data.patients, normalizedQuery]);

  const continuePatient = useMemo(() => {
    if (!lastPatientId) {
      return null;
    }

    return data.patients.find((patient) => patient.id === lastPatientId) ?? null;
  }, [data.patients, lastPatientId]);

  const continueMeta = useMemo(() => {
    if (!continuePatient) {
      return null;
    }
    const dob = getFieldValue(continuePatient, "Date of Birth");
    const gender = getFieldValue(continuePatient, "Gender") ?? "Unknown";
    return {
      id: continuePatient.id,
      age: formatAge(dob),
      gender
    };
  }, [continuePatient]);

  const handleSelect = (patient: PatientListItem) => {
    window.localStorage.setItem("lastPatientId", patient.id);
    router.push(`/patient/${patient.id}/overview`);
  };

  return (
    <div className="space-y-6">
      {showHeader ? (
        <header className="space-y-2">
          <PageTitle>{data.page.title}</PageTitle>
          <Body>{data.page.subtitle}</Body>
        </header>
      ) : null}

      {continuePatient ? (
        <button onClick={() => handleSelect(continuePatient)} type="button">
          <Card className="w-full p-5 text-left transition hover:border-accent/40">
            <p className="ds-label">{data.page.continueDescription}</p>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
              <div>
                <SectionTitle as="p">{continuePatient.name}</SectionTitle>
                <Body className="mt-1">{continuePatient.subtitle}</Body>
                {continueMeta ? (
                  <Body className="mt-2 text-xs">
                    {continueMeta.id} · Age {continueMeta.age} · {continueMeta.gender}
                  </Body>
                ) : null}
              </div>
              <span className="ds-chip">{data.page.continueLabel}</span>
            </div>
          </Card>
        </button>
      ) : null}

      <Card className="p-4">
        <input
          className="ds-input w-full"
          placeholder={data.page.searchPlaceholder}
          aria-label={data.page.searchPlaceholder}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </Card>

      {filteredPatients.length === 0 ? (
        <EmptyState
          title={data.page.emptyTitle}
          description={data.page.emptyDescription}
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredPatients.map((patient) => (
            <button
              key={patient.id}
              className="text-left"
              onClick={() => handleSelect(patient)}
              type="button"
            >
              <Card className="p-5 transition hover:border-accent/40">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <SectionTitle as="p">{patient.name}</SectionTitle>
                    <Body className="mt-1">{patient.subtitle}</Body>
                    <Body className="mt-2 text-xs">
                      {patient.id} · Age {formatAge(getFieldValue(patient, "Date of Birth"))} ·{" "}
                      {getFieldValue(patient, "Gender") ?? "Unknown"}
                    </Body>
                  </div>
                  <Badge tone={patient.risk.tone}>
                    {patient.risk.label}
                  </Badge>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {patient.tags.map((tag) => (
                    <span key={tag} className="ds-chip">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-4 space-y-2">
                  {patient.fields.map((field) => (
                    <div
                      key={field.label}
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-panel-soft/60 px-3 py-2 text-xs"
                    >
                      <span className="ds-label">{field.label}</span>
                      <span className="ds-value">{field.value}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
