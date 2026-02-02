"use client";

import { useMemo } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import ProgressionWorkspace, {
  ProgressionTabKey
} from "@/components/progression/ProgressionWorkspace";

const validTabs = new Set([
  "overview",
  "functional",
  "biomarkers",
  "organ-systems",
  "video-analytics",
  "timeline"
]);

export default function ProgressionIndexPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useParams();
  const patientId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const rawTab = searchParams.get("tab") ?? "overview";

  const activeTab = useMemo<ProgressionTabKey>(() => {
    return validTabs.has(rawTab)
      ? (rawTab as ProgressionTabKey)
      : "overview";
  }, [rawTab]);

  const handleTabChange = (tab: ProgressionTabKey) => {
    if (!validTabs.has(tab)) {
      return;
    }
    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.set("tab", tab);
    router.replace(`?${nextParams.toString()}`, { scroll: false });
  };

  return (
    <ProgressionWorkspace
      activeTab={activeTab}
      onTabChange={handleTabChange}
      patientId={patientId}
    />
  );
}
