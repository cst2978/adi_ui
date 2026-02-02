import ProgressionTabs from "@/components/progression-tabs";
import type { ProgressionTab } from "@/types/progression";

export default function ProgressionLayout({
  children,
  tabs
}: {
  children: React.ReactNode;
  tabs: ProgressionTab[];
}) {
  return (
    <div className="space-y-6">
      <ProgressionTabs tabs={tabs} />
      {children}
    </div>
  );
}
