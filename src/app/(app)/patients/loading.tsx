import PatientSelectionShell from "@/components/patients/PatientSelectionShell";
import PatientChooserSkeleton from "@/components/patients/PatientChooserSkeleton";

export default function Loading() {
  return (
    <PatientSelectionShell>
      <PatientChooserSkeleton />
    </PatientSelectionShell>
  );
}
