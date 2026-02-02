export default function PatientLoading() {
  return (
    <div className="min-h-screen bg-[#111113] px-6 py-6 text-[#edeef0]">
      <div className="animate-pulse space-y-6">
        <div className="h-8 w-56 rounded bg-[#1f2124]" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={`card-${index}`}
              className="h-[220px] rounded-xl bg-[#1a1b1f]"
            />
          ))}
        </div>
        <div className="h-64 rounded-xl bg-[#1a1b1f]" />
      </div>
    </div>
  );
}
