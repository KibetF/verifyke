"use client";

const statusColors: Record<string, string> = {
  // Service status
  PENDING:   "bg-yellow-100 text-yellow-800",
  ASSIGNED:  "bg-blue-100 text-blue-800",
  COMPLETED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
  // Risk level
  LOW:      "bg-green-100 text-green-800",
  MODERATE: "bg-yellow-100 text-yellow-800",
  HIGH:     "bg-red-100 text-red-800",
  // Payment status
  PAID:     "bg-emerald-100 text-emerald-800",
  FAILED:   "bg-red-100 text-red-800",
  BYPASSED: "bg-slate-100 text-slate-500",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        statusColors[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {status}
    </span>
  );
}
