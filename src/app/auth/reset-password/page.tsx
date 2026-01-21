import Link from "next/link";

export default function ResetPasswordPage() {
  return (
    <div className="w-full max-w-3xl rounded-3xl border border-white/10 bg-panel/80 p-10 shadow-card backdrop-blur">
      <p className="text-xs uppercase tracking-[0.35em] text-ink-muted">
        Reset password
      </p>
      <h1 className="mt-4 text-3xl font-semibold text-ink lg:text-4xl">
        Password reset is coming soon
      </h1>
      <p className="mt-3 text-base text-ink-muted">
        The email reset flow will be enabled shortly. For now, reach out to your
        administrator for access help.
      </p>
      <div className="mt-6 space-y-3">
        <label className="block text-xs uppercase tracking-[0.3em] text-ink-muted">
          Email
        </label>
        <input
          className="w-full rounded-xl border border-white/10 bg-panel-soft px-4 py-3 text-sm text-ink outline-none"
          type="email"
          placeholder="doctor@clinic.org"
          disabled
        />
        <button
          className="w-full cursor-not-allowed rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-ink-muted"
          type="button"
          disabled
        >
          Send reset link
        </button>
      </div>
      <div className="mt-6">
        <Link
          className="text-sm text-ink underline underline-offset-4"
          href="/auth/signin"
        >
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
