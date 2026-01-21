import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ProfilePanel from "@/components/profile-panel";
import { authOptions } from "@/lib/auth";
import { getSupabaseAdminClient } from "@/lib/supabaseServer";
import type { SubscriptionModuleId } from "@/lib/subscriptionOptions";

type ProfileRecord = {
  full_name: string | null;
  email: string | null;
  selected_modules: SubscriptionModuleId[] | null;
  monthly_price: number | null;
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  const supabaseEnabled = Boolean(
    process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  if (!supabaseEnabled) {
    return (
      <div className="rounded-2xl border border-white/10 bg-panel/80 p-6 text-ink">
        Configure Supabase credentials to manage your subscription.
      </div>
    );
  }

  const userId = session.user?.id ?? null;
  const email = session.user?.email ?? null;
  let profile: ProfileRecord | null = null;

  if (userId || email) {
    try {
      const supabase = getSupabaseAdminClient();
      let query = supabase
        .from("user_profiles")
        .select("full_name,email,selected_modules,monthly_price")
        .limit(1);

      query = userId ? query.eq("id", userId) : query.eq("email", email);
      const { data, error } = await query.maybeSingle();

      if (!error && data) {
        profile = data as ProfileRecord;
      }
    } catch (error) {
      console.error("Failed to load profile", error);
    }
  }

  return (
    <ProfilePanel
      supabaseEnabled={supabaseEnabled}
      email={profile?.email ?? email}
      fullName={profile?.full_name ?? session.user?.name ?? null}
      selectedModules={profile?.selected_modules ?? null}
      currentPrice={profile?.monthly_price ?? null}
    />
  );
}
