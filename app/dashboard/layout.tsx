import { requireAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { NotificationProvider } from "@/components/NotificationProvider";

export default async function DashboardRedirectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAuth();

  // Redirect non-clients to their respective dashboards
  if (user.role === "ADMIN") redirect("/admin");
  if (user.role === "AGENT") redirect("/agent");

  return (
    <>
      <NotificationProvider userId={user.id} />
      {children}
    </>
  );
}
