"use client";

import { DashboardLayout } from "@/components/DashboardLayout";

const agentNav = [
  { label: "Overview", href: "/agent" },
  { label: "My Requests", href: "/agent/requests" },
  { label: "Submit Report", href: "/agent/report" },
  { label: "My Reports", href: "/agent/reports" },
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
