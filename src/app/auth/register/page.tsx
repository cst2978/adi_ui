import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import RegisterPanel from "@/components/register-panel";
import { authOptions } from "@/lib/auth";

export default async function RegisterPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/patients");
  }

  const supabaseEnabled = Boolean(
    process.env.SUPABASE_URL &&
      process.env.SUPABASE_ANON_KEY &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  return (
    <div className="w-full">
      <RegisterPanel supabaseEnabled={supabaseEnabled} />
    </div>
  );
}
