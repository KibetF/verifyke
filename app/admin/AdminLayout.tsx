"use client";

import { DashboardLayout } from "@/components/DashboardLayout";

const adminNav = [
  { label: "Overview", href: "/admin" },
  { label: "All Requests", href: "/admin/requests" },
  { label: "Agents", href: "/admin/agents" },
  { label: "Reports", href: "/admin/reports" },
];

export function AdminDashboardLayout({
  children,
  userName,
}: {
  children: React.ReactNode;
  userName: string;
}) {
  return (
    <DashboardLayout navItems={adminNav} title="VerifyKe Admin" userName={userName}>
      {children}
    </DashboardLayout>
  );
}
