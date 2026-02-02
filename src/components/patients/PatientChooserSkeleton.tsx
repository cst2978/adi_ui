export default function PatientChooserSkeleton() {
  return (
    <div className="space-y-6">
      <div className="ds-card p-4">
        <div className="h-10 w-full animate-pulse rounded-xl bg-white/10" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={`patient-skeleton-${index}`}
            className="ds-card p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-2">
                <div className="h-5 w-32 animate-pulse rounded bg-white/10" />
                <div className="h-4 w-40 animate-pulse rounded bg-white/10" />
                <div className="h-3 w-48 animate-pulse rounded bg-white/10" />
              </div>
              <div className="h-5 w-20 animate-pulse rounded-full bg-white/10" />
            </div>
            <div className="mt-4 space-y-2">
              <div className="h-8 w-full animate-pulse rounded-xl bg-white/10" />
              <div className="h-8 w-full animate-pulse rounded-xl bg-white/10" />
              <div className="h-8 w-full animate-pulse rounded-xl bg-white/10" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
