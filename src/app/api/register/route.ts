import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabaseServer";
import {
  SUBSCRIPTION_MODULES,
  getSubscriptionPrice,
  getSubscriptionTier,
  type SubscriptionModuleId
} from "@/lib/subscriptionOptions";

const allowedModules = new Set(SUBSCRIPTION_MODULES.map((module) => module.id));

type RegisterPayload = {
  fullName?: string;
  email?: string;
  password?: string;
  modules?: string[];
};

function normalizeModules(modules: string[]) {
  const filtered = modules.filter((module) =>
    allowedModules.has(module as SubscriptionModuleId)
  );
  return Array.from(new Set(filtered)) as SubscriptionModuleId[];
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RegisterPayload;
    const email = (body.email ?? "").trim().toLowerCase();
    const password = body.password ?? "";
    const fullName = (body.fullName ?? "").trim();
    const modules = Array.isArray(body.modules) ? body.modules : [];
    const selectedModules = normalizeModules(modules);
    const moduleCount = selectedModules.length;
    const price = getSubscriptionPrice(moduleCount);
    const tier = getSubscriptionTier(moduleCount);

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    if (!price || !tier) {
      return NextResponse.json(
        { error: "Select one, two, or three modules." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
        selected_modules: selectedModules,
        subscription_tier: tier,
        monthly_price: price
      }
    });

    if (error || !data.user) {
      return NextResponse.json(
        { error: error?.message ?? "Unable to create user." },
        { status: 400 }
      );
    }

    const { error: profileError } = await supabase
      .from("user_profiles")
      .insert({
        id: data.user.id,
        email,
        full_name: fullName || null,
        selected_modules: selectedModules,
        subscription_tier: tier,
        monthly_price: price
      });

    if (profileError) {
      return NextResponse.json(
        { error: profileError.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Registration API error", error);
    return NextResponse.json(
      { error: "Registration failed. Please try again." },
      { status: 500 }
    );
  }
}
