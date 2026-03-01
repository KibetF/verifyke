"use client";

import { useState } from "react";
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Backdrop — mobile only, closes sidebar on tap */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <Sidebar
        items={navItems}
        title={title}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main area — min-w-0 prevents flex blowout on mobile */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 px-4 md:px-8 py-4 flex items-center gap-3">
          {/* Hamburger — visible only on mobile */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors shrink-0"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <h1 className="text-lg font-semibold text-slate-800 flex-1 truncate">{title}</h1>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-sm text-slate-600 hidden sm:block truncate max-w-[120px]">
              {userName}
            </span>
            <LogoutButton />
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 bg-slate-50">{children}</main>
      </div>
    </div>
  );
}
