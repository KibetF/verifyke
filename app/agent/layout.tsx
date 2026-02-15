import { requireRole } from "@/lib/auth";

export default async function AgentLayout({ children }: { children: React.ReactNode }) {
  await requireRole("AGENT");
  return <>{children}</>;
}
