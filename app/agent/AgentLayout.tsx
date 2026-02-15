"use client";

import { DashboardLayout } from "@/components/DashboardLayout";

const agentNav = [
  { label: "Assigned Requests", href: "/agent" },
  { label: "Submit Report", href: "/agent/report" },
];

export function AgentDashboardLayout({
  children,
  userName,
}: {
  children: React.ReactNode;
  userName: string;
}) {
  return (
    <DashboardLayout navItems={agentNav} title="VerifyKe Agent" userName={userName}>
      {children}
    </DashboardLayout>
  );
}
