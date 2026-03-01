"use client";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="border border-slate-300 text-slate-700 rounded-lg py-2 px-4 text-sm font-medium hover:bg-slate-50 print:hidden"
    >
      Export PDF
    </button>
  );
}
