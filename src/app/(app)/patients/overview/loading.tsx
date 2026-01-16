export default function PatientOverviewLoading() {
  return (
    <div className="space-y-10 animate-pulse">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="h-6 w-48 rounded bg-white/10" />
          <div className="h-4 w-64 rounded bg-white/5" />
        </div>
        <div className="h-10 w-64 rounded-xl bg-white/10" />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_1.5fr_1fr]">
        <div className="h-48 rounded-2xl bg-white/10" />
        <div className="h-48 rounded-2xl bg-white/10" />
        <div className="h-48 rounded-2xl bg-white/10" />
      </div>

      <div className="space-y-6">
        <div className="h-4 w-56 rounded bg-white/10" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-56 rounded-2xl bg-white/10" />
          ))}
        </div>
      </div>
    </div>
  );
}
