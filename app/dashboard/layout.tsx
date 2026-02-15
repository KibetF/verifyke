import { requireAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardRedirectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAuth();

  // Redirect non-clients to their respective dashboards
  if (user.role === "ADMIN") redirect("/admin");
  if (user.role === "AGENT") redirect("/agent");

  return <>{children}</>;
}
