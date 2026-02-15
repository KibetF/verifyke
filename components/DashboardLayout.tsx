"use client";

import { Sidebar } from "./Sidebar";
import { LogoutButton } from "./LogoutButton";

interface NavItem {
  label: string;
  href: string;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  navItems: NavItem[];
  title: string;
  userName: string;
}

export function DashboardLayout({
  children,
  navItems,
  title,
  userName,
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar items={navItems} title={title} />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold text-slate-800">{title}</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">{userName}</span>
            <LogoutButton />
          </div>
        </header>
        <main className="flex-1 p-8 bg-slate-50">{children}</main>
      </div>
    </div>
  );
}
