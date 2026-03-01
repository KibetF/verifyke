import { requireRole } from "@/lib/auth";
import { NotificationProvider } from "@/components/NotificationProvider";

export default async function AgentLayout({ children }: { children: React.ReactNode }) {
  const user = await requireRole("AGENT");
  return (
    <>
      <NotificationProvider userId={user.id} filterField="agentId" />
      {children}
    </>
  );
}
