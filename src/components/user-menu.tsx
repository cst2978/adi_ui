"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function UserMenu() {
  const { data } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const csrfResponse = await fetch("/api/auth/csrf");
      const { csrfToken } = (await csrfResponse.json()) as {
        csrfToken?: string;
      };

      if (csrfToken) {
        await fetch("/api/auth/signout", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: new URLSearchParams({
            csrfToken,
            callbackUrl: "/auth/signin"
          })
        });
      }
    } catch (error) {
      console.error("Failed to sign out", error);
    } finally {
      router.replace("/auth/signin");
      router.refresh();
    }
  };

  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-panel/90 px-4 py-2">
      <div className="h-8 w-8 rounded-full bg-accent/20 text-center text-xs font-semibold leading-8 text-ink">
        {data?.user?.name?.charAt(0) ?? "Dr"}
      </div>
      <div className="hidden text-left sm:block">
        <div className="text-xs text-ink-muted">Signed in</div>
        <div className="text-sm text-ink">
          {data?.user?.name ?? data?.user?.email ?? "Clinician"}
        </div>
      </div>
      <Link
        className="text-xs uppercase tracking-[0.3em] text-ink-muted hover:text-ink"
        href="/profile"
      >
        Profile
      </Link>
      <button
        className="text-xs uppercase tracking-[0.3em] text-ink-muted hover:text-ink"
        onClick={handleSignOut}
      >
        Sign out
      </button>
    </div>
  );
}
