import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getSupabaseAdminClient } from "@/lib/supabaseServer";
import {
  SUBSCRIPTION_MODULES,
  getSubscriptionPrice,
  getSubscriptionTier,
  type SubscriptionModuleId
} from "@/lib/subscriptionOptions";

const allowedModules = new Set(SUBSCRIPTION_MODULES.map((module) => module.id));

type ProfileUpdatePayload = {
  modules?: string[];
};

function normalizeModules(modules: string[]) {
  const filtered = modules.filter((module) =>
    allowedModules.has(module as SubscriptionModuleId)
  );
  return Array.from(new Set(filtered)) as SubscriptionModuleId[];
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = (await request.json()) as ProfileUpdatePayload;
    const modules = Array.isArray(body.modules) ? body.modules : [];
    const selectedModules = normalizeModules(modules);
    const moduleCount = selectedModules.length;
    const price = getSubscriptionPrice(moduleCount);
    const tier = getSubscriptionTier(moduleCount);

    if (!price || !tier) {
      return NextResponse.json(
        { error: "Select one, two, or three modules." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdminClient();
    const { error } = await supabase.from("user_profiles").upsert(
      {
        id: session.user.id,
        email: session.user.email ?? null,
        full_name: session.user.name ?? null,
        selected_modules: selectedModules,
        subscription_tier: tier,
        monthly_price: price,
        updated_at: new Date().toISOString()
      },
      { onConflict: "id" }
    );

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Profile update error", error);
    return NextResponse.json(
      { error: "Unable to update subscription." },
      { status: 500 }
    );
  }
}
