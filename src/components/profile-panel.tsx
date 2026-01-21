"use client";

import { useMemo, useState } from "react";
import {
  SUBSCRIPTION_MODULES,
  getSubscriptionPrice,
  type SubscriptionModuleId
} from "@/lib/subscriptionOptions";

type ProfilePanelProps = {
  supabaseEnabled: boolean;
  email?: string | null;
  fullName?: string | null;
  selectedModules?: SubscriptionModuleId[] | null;
  currentPrice?: number | null;
};

const moduleIds = new Set(SUBSCRIPTION_MODULES.map((module) => module.id));

export default function ProfilePanel({
  supabaseEnabled,
  email,
  fullName,
  selectedModules,
  currentPrice
}: ProfilePanelProps) {
  const [currentTotal, setCurrentTotal] = useState(currentPrice ?? null);
  const [moduleState, setModuleState] = useState<
    Record<SubscriptionModuleId, boolean>
  >({
    disease_progression: selectedModules?.includes("disease_progression") ?? true,
    safety_risk: selectedModules?.includes("safety_risk") ?? false,
    therapy_response: selectedModules?.includes("therapy_response") ?? false
  });
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const selectedModuleIds = useMemo(
    () =>
      SUBSCRIPTION_MODULES.filter((module) => moduleState[module.id]).map(
        (module) => module.id
      ),
    [moduleState]
  );
  const selectedCount = selectedModuleIds.length;
  const price = getSubscriptionPrice(selectedCount);
  const priceLabel = price
    ? `$${price.toFixed(2)} / month / user`
    : "Select at least one module";

  const handleToggle = (moduleId: SubscriptionModuleId) => {
    setModuleState((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  const handleSave = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!selectedCount || !price) {
      setErrorMessage("Select at least one module to continue.");
      return;
    }

    const sanitized = selectedModuleIds.filter((moduleId) =>
      moduleIds.has(moduleId)
    );

    setSaving(true);
    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ modules: sanitized })
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        setErrorMessage(payload?.error ?? "Unable to update subscription.");
        return;
      }

      setSuccessMessage("Subscription updated.");
      setCurrentTotal(price);
    } catch (error) {
      console.error("Profile update failed", error);
      setErrorMessage("Unable to update subscription.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full max-w-5xl rounded-3xl border border-white/10 bg-panel/80 p-10 shadow-card backdrop-blur">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-semibold text-ink lg:text-4xl">
              Your subscription
            </h1>
            <p className="mt-3 text-base text-ink-muted">
              Add or remove intelligence modules as your needs change.
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
                  checked={moduleState[module.id]}
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
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-panel/90 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-ink-muted">
              Account
            </p>
            <div className="mt-4 space-y-2 text-sm text-ink">
              <div>{fullName || "Clinician"}</div>
              <div className="text-xs text-ink-muted">{email ?? ""}</div>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-panel/90 px-5 py-4 text-sm text-ink">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.3em] text-ink-muted">
                Current total
              </span>
              <span className="font-semibold text-ink">
                {currentTotal
                  ? `$${currentTotal.toFixed(2)} / month / user`
                  : "Not set"}
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.3em] text-ink-muted">
                Updated total
              </span>
              <span className="font-semibold text-ink">{priceLabel}</span>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-panel/90 p-6">
            <button
              className="w-full rounded-xl border border-accent/40 bg-accent/20 px-4 py-3 text-sm font-medium text-ink transition hover:border-accent/70 disabled:cursor-not-allowed disabled:opacity-60"
              type="button"
              onClick={handleSave}
              disabled={!supabaseEnabled || saving || selectedCount === 0}
            >
              {saving ? "Saving..." : "Update subscription"}
            </button>
            {!supabaseEnabled ? (
              <p className="mt-3 text-xs text-warning">
                Configure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to enable
                updates.
              </p>
            ) : null}
            {errorMessage ? (
              <p className="mt-3 text-xs text-warning">{errorMessage}</p>
            ) : null}
            {successMessage ? (
              <p className="mt-3 text-xs text-ink">{successMessage}</p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
