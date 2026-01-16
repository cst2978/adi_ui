import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => Boolean(token)
  }
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|auth|api/auth).*)"]
};
