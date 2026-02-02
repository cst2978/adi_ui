export default function ProgressionLoading() {
  return (
    <div className="min-h-screen bg-[#111113] px-6 py-6 text-[#edeef0]">
      <div className="animate-pulse space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-6 w-40 rounded bg-[#1f2124]" />
          <div className="h-6 w-28 rounded bg-[#1f2124]" />
        </div>
        <div className="grid gap-4 xl:grid-cols-[1.2fr_1fr]">
          <div className="h-[260px] rounded-xl bg-[#1a1b1f]" />
          <div className="h-[260px] rounded-xl bg-[#1a1b1f]" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={`metric-${index}`}
              className="h-[180px] rounded-xl bg-[#1a1b1f]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
