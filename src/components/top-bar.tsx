import Image from "next/image";
import UserMenu from "@/components/user-menu";
import SearchInput from "@/components/ui/search-input";
import Button from "@/components/ui/button";

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
        <SearchInput
          wrapperClassName="w-full max-w-md"
          placeholder="Search patients, mutations, therapies"
          suffix="CMD K"
        />
        <Button type="button" variant="ghost">
          Filters
        </Button>
        <UserMenu />
      </div>
    </header>
  );
}
