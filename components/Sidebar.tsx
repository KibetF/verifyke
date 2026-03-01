"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
}

interface SidebarProps {
  items: NavItem[];
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ items, title, isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-white flex flex-col p-6
        transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 md:z-auto
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      {/* Close button — mobile only */}
      <button
        className="md:hidden absolute top-4 right-4 p-1 text-slate-400 hover:text-white"
        onClick={onClose}
        aria-label="Close menu"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <Link href="/" className="text-xl font-bold mb-8 block pr-8 md:pr-0">
        {title}
      </Link>

      <nav className="flex flex-col gap-1 flex-1">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`px-4 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-slate-700 text-white font-medium"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
