"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";

type SignInPanelProps = {
  googleEnabled: boolean;
  credentialsEnabled: boolean;
};

export default function SignInPanel({
  googleEnabled,
  credentialsEnabled
}: SignInPanelProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="w-full max-w-4xl rounded-3xl border border-white/10 bg-panel/80 p-10 shadow-card backdrop-blur">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="inline-flex items-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <Image
              src="/adilabs-logo.png"
              alt="Adilabs"
              width={220}
              height={46}
              priority
            />
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-ink lg:text-4xl">
              Adilabs Research
            </h1>
            <p className="mt-3 text-base text-ink-muted">
              Clinical patient oversight in a focused, research-ready workspace.
            </p>
          </div>
          <div className="space-y-3 text-sm text-ink-muted">
            <p>Authenticate with your clinical email or Google account.</p>
            <p>
              Patient Overview is enabled; the rest of the platform flows remain
              in preview state.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="rounded-2xl border border-white/10 bg-panel/70 px-4 py-3 text-xs text-ink-muted">
              Secure magic links
            </div>
            <div className="rounded-2xl border border-white/10 bg-panel/70 px-4 py-3 text-xs text-ink-muted">
              Audit-ready sessions
            </div>
            <div className="rounded-2xl border border-white/10 bg-panel/70 px-4 py-3 text-xs text-ink-muted">
              HIPAA-minded UI
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-panel/90 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-ink-muted">
              Doctor Sign In
            </p>
            <div className="mt-5 space-y-3">
              <button
                className="w-full rounded-xl border border-transparent bg-ink px-4 py-3 text-sm font-medium text-canvas transition hover:bg-white"
                onClick={() => signIn("google")}
                disabled={!googleEnabled}
              >
                Continue with Google
              </button>
              {!googleEnabled ? (
                <p className="text-xs text-warning">
                  Configure GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to enable
                  Google OAuth.
                </p>
              ) : null}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-panel/90 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-ink-muted">
              Username / Password
            </p>
            <div className="mt-4 space-y-3">
              <label className="block text-xs uppercase tracking-[0.3em] text-ink-muted">
                Email
              </label>
              <input
                className="w-full rounded-xl border border-white/10 bg-panel-soft px-4 py-3 text-sm text-ink outline-none transition focus:border-accent/70"
                type="email"
                placeholder="doctor@clinic.org"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <label className="block text-xs uppercase tracking-[0.3em] text-ink-muted">
                Password
              </label>
              <input
                className="w-full rounded-xl border border-white/10 bg-panel-soft px-4 py-3 text-sm text-ink outline-none transition focus:border-accent/70"
                type="password"
                placeholder="********"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <button
                className="w-full rounded-xl border border-accent/40 bg-accent/20 px-4 py-3 text-sm font-medium text-ink transition hover:border-accent/70"
                onClick={() =>
                  signIn("credentials", {
                    email,
                    password,
                    callbackUrl: "/patients/overview"
                  })
                }
                disabled={!credentialsEnabled || !email || !password}
              >
                Sign in
              </button>
              {!credentialsEnabled ? (
                <p className="text-xs text-warning">
                  Set SUPABASE_URL and SUPABASE_ANON_KEY to enable Supabase
                  login.
                </p>
              ) : null}
              <p className="text-xs text-ink-muted">
                Forgot your password?{" "}
                <Link
                  className="text-ink underline underline-offset-4"
                  href="/auth/reset-password"
                >
                  Reset it
                </Link>
                .
              </p>
              <p className="text-xs text-ink-muted">
                New here?{" "}
                <Link
                  className="text-ink underline underline-offset-4"
                  href="/auth/register"
                >
                  Create an account
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
