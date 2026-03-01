import { requireRole } from "@/lib/auth";
import { AgentDashboardLayout } from "../AgentLayout";
import { ReportForm } from "./ReportForm";

export default async function AgentReportPage() {
  const user = await requireRole("AGENT");

  return (
    <AgentDashboardLayout userName={user.fullName}>
      <ReportForm />
    </AgentDashboardLayout>
  );
}
