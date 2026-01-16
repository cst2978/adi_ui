import Image from "next/image";
import UserMenu from "@/components/user-menu";

export default function TopBar() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-panel/80 px-6 py-4">
      <div className="flex items-center rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
        <Image
          src="/adilabs-logo.png"
          alt="Adilabs"
          width={160}
          height={34}
          priority
        />
      </div>
      <div className="flex flex-1 flex-wrap items-center justify-end gap-3">
        <div className="relative w-full max-w-md">
          <input
            className="w-full rounded-xl border border-white/10 bg-panel-soft/70 px-4 py-3 text-sm text-ink placeholder:text-ink-muted outline-none transition focus:border-accent/60"
            placeholder="Search patients, mutations, therapies"
          />
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs uppercase tracking-[0.3em] text-ink-muted">
            CMD K
          </div>
        </div>
        <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-ink">
          Filters
        </button>
        <UserMenu />
      </div>
    </header>
  );
}
