import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SignInPanel from "@/components/signin-panel";
import { authOptions } from "@/lib/auth";

export default async function SignInPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/patients/overview");
  }

  const googleEnabled = Boolean(
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
  );
  const credentialsEnabled = Boolean(
    process.env.TEST_USER_EMAIL && process.env.TEST_USER_PASSWORD
  );

  return (
    <div className="w-full">
      <SignInPanel
        googleEnabled={googleEnabled}
        credentialsEnabled={credentialsEnabled}
        testDefaults={
          credentialsEnabled
            ? {
                email: process.env.TEST_USER_EMAIL ?? "",
                password: process.env.TEST_USER_PASSWORD ?? ""
              }
            : null
        }
      />
    </div>
  );
}
