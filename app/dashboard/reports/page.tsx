import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { StatusBadge } from "@/components/StatusBadge";
import { ClientLayout } from "../ClientLayout";
import Link from "next/link";

export default async function ReportsPage() {
  const user = await requireAuth();
  const reports = await prisma.inspectionReport.findMany({
    where: { serviceRequest: { userId: user.id } },
    include: {
      serviceRequest: { include: { property: true } },
      agent: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <ClientLayout userName={user.fullName}>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">Inspection Reports</h2>

        {reports.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <p className="text-slate-500">No reports available yet.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {reports.map((report) => (
              <Link
                key={report.id}
                href={`/dashboard/reports/${report.id}`}
                className="bg-white rounded-xl border border-slate-200 p-6 block hover:border-slate-300 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {report.serviceRequest.property.name}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {report.serviceRequest.serviceType} Inspection
                    </p>
                    <p className="text-sm text-slate-400 mt-1">by {report.agent.fullName}</p>
                  </div>
                  <div className="text-right">
                    <StatusBadge status={report.riskLevel} />
                    <p className="text-xs text-slate-400 mt-2">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </ClientLayout>
  );
}
