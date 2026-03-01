"use client";

interface ExportCSVButtonProps {
  data: Record<string, string | number>[];
  filename?: string;
}

export function ExportCSVButton({ data, filename = "export" }: ExportCSVButtonProps) {
  const handleExport = () => {
    if (data.length === 0) return;

    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(","),
      ...data.map((row) =>
        headers
          .map((h) => {
            const val = String(row[h] ?? "");
            return val.includes(",") || val.includes('"')
              ? `"${val.replace(/"/g, '""')}"`
              : val;
          })
          .join(",")
      ),
    ];

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      className="border border-slate-300 text-slate-700 rounded-lg py-2 px-4 text-sm font-medium hover:bg-slate-50"
    >
      Export CSV
    </button>
  );
}
