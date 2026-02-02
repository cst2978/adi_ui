"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  SUBSCRIPTION_MODULES,
  getSubscriptionPrice,
  type SubscriptionModuleId
} from "@/lib/subscriptionOptions";

type RegisterPanelProps = {
  supabaseEnabled: boolean;
};

const moduleIds = new Set(SUBSCRIPTION_MODULES.map((module) => module.id));

export default function RegisterPanel({ supabaseEnabled }: RegisterPanelProps) {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [doctorRole, setDoctorRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedModules, setSelectedModules] = useState<
    Record<SubscriptionModuleId, boolean>
  >({
    disease_progression: true,
    safety_risk: false,
    therapy_response: false
  });
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const selectedModuleIds = useMemo(
    () =>
      SUBSCRIPTION_MODULES.filter((module) => selectedModules[module.id]).map(
        (module) => module.id
      ),
    [selectedModules]
  );
  const selectedCount = selectedModuleIds.length;
  const price = getSubscriptionPrice(selectedCount);

  const priceLabel = price
    ? `$${price.toFixed(2)} / month / user`
    : "Select at least one module";

  const handleToggle = (moduleId: SubscriptionModuleId) => {
    setSelectedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  const handleSubmit = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!selectedCount || !price) {
      setErrorMessage("Select at least one module to continue.");
      return;
    }

    if (!email || !password) {
      setErrorMessage("Email and password are required.");
      return;
    }

    if (!fullName.trim()) {
      setErrorMessage("Doctor name is required.");
      return;
    }

    const sanitized = selectedModuleIds.filter((moduleId) =>
      moduleIds.has(moduleId)
    );

    setSubmitting(true);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          role: doctorRole,
          email,
          password,
          modules: sanitized
        })
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        setErrorMessage(
          payload?.error ?? "Registration failed. Please try again."
        );
        return;
      }

      setSuccessMessage("Account created.");
      setFullName("");
      setDoctorRole("");
      setEmail("");
      setPassword("");
      router.push("/auth/register/success");
    } catch (error) {
      console.error("Registration failed", error);
      setErrorMessage("Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-5xl rounded-3xl border border-white/10 bg-panel/80 p-10 shadow-card backdrop-blur">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-semibold text-ink lg:text-4xl">
              Create your Adilabs account
            </h1>
            <p className="mt-3 text-base text-ink-muted">
              Choose the intelligence modules you need and invite your team.
            </p>
          </div>
          <div className="space-y-4">
            {SUBSCRIPTION_MODULES.map((module) => (
              <label
                key={module.id}
                className="flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-panel/70 px-4 py-4 text-sm text-ink"
              >
                <input
                  className="mt-1 h-4 w-4 rounded border-white/40 bg-transparent"
                  type="checkbox"
                  checked={selectedModules[module.id]}
                  onChange={() => handleToggle(module.id)}
                />
                <span>
                  <span className="block font-medium text-ink">
                    {module.title}
                  </span>
                  <span className="block text-xs text-ink-muted">
                    {module.description}
                  </span>
                </span>
              </label>
            ))}
          </div>
          <div className="rounded-2xl border border-white/10 bg-panel/90 px-5 py-4 text-sm text-ink">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.3em] text-ink-muted">
                Plan total
              </span>
              <span className="font-semibold text-ink">{priceLabel}</span>
            </div>
            <p className="mt-2 text-xs text-ink-muted">
              Pricing is per user, billed monthly.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-panel/90 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-ink-muted">
              Account details
            </p>
            <div className="mt-4 space-y-3">
              <label className="block text-xs uppercase tracking-[0.3em] text-ink-muted">
                Doctor name
              </label>
              <input
                className="w-full rounded-xl border border-white/10 bg-panel-soft px-4 py-3 text-sm text-ink outline-none transition focus:border-accent/70"
                type="text"
                placeholder="Dr. Taylor James"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
              />
              <label className="block text-xs uppercase tracking-[0.3em] text-ink-muted">
                Specialty / Role (optional)
              </label>
              <input
                className="w-full rounded-xl border border-white/10 bg-panel-soft px-4 py-3 text-sm text-ink outline-none transition focus:border-accent/70"
                type="text"
                placeholder="Pediatric Pulmonologist"
                value={doctorRole}
                onChange={(event) => setDoctorRole(event.target.value)}
              />
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
                className="w-full rounded-xl border border-accent/40 bg-accent/20 px-4 py-3 text-sm font-medium text-ink transition hover:border-accent/70 disabled:cursor-not-allowed disabled:opacity-60"
                type="button"
                onClick={handleSubmit}
                disabled={
                  !supabaseEnabled ||
                  submitting ||
                  !email ||
                  !password ||
                  !fullName.trim() ||
                  selectedCount === 0
                }
              >
                {submitting ? "Creating account..." : "Create account"}
              </button>
              {!supabaseEnabled ? (
                <p className="text-xs text-warning">
                  Configure SUPABASE_URL, SUPABASE_ANON_KEY, and
                  SUPABASE_SERVICE_ROLE_KEY to enable registration.
                </p>
              ) : null}
              {errorMessage ? (
                <p className="text-xs text-warning">{errorMessage}</p>
              ) : null}
              {successMessage ? (
                <p className="text-xs text-ink">{successMessage}</p>
              ) : null}
              <p className="text-xs text-ink-muted">
                Already have an account?{" "}
                <Link
                  className="text-ink underline underline-offset-4"
                  href="/auth/signin"
                >
                  Sign in
                </Link>
                .
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-panel/90 p-6 text-xs text-ink-muted">
            Registration creates an account in Supabase and stores your selected
            modules for billing.
          </div>
        </div>
      </div>
    </div>
  );
}
