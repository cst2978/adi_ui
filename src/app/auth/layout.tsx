export default function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen px-6 py-12 flex items-center justify-center">
      {children}
    </div>
  );
}
