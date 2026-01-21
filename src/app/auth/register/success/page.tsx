import Link from "next/link";

export default function RegisterSuccessPage() {
  return (
    <div className="w-full max-w-3xl rounded-3xl border border-white/10 bg-panel/80 p-10 text-center shadow-card backdrop-blur">
      <p className="text-xs uppercase tracking-[0.35em] text-ink-muted">
        Account created
      </p>
      <h1 className="mt-4 text-3xl font-semibold text-ink lg:text-4xl">
        Your registration is complete
      </h1>
      <p className="mt-3 text-base text-ink-muted">
        Sign in with your new credentials to continue.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          className="rounded-xl border border-accent/40 bg-accent/20 px-5 py-3 text-sm font-medium text-ink transition hover:border-accent/70"
          href="/auth/signin"
        >
          Go to sign in
        </Link>
        <Link
          className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-ink-muted transition hover:border-white/30 hover:text-ink"
          href="/"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
