"use client";

import { DashboardLayout } from "@/components/DashboardLayout";

const clientNav = [
  { label: "Overview", href: "/dashboard" },
  { label: "Properties", href: "/dashboard/properties" },
  { label: "Book Service", href: "/dashboard/book" },
  { label: "My Requests", href: "/dashboard/requests" },
  { label: "Reports", href: "/dashboard/reports" },
  { label: "Settings", href: "/dashboard/settings" },
];

export function ClientLayout({ children, userName }: { children: React.ReactNode; userName: string }) {
  return (
    <DashboardLayout navItems={clientNav} title="VerifyKe" userName={userName}>
      {children}
    </DashboardLayout>
  );
}
