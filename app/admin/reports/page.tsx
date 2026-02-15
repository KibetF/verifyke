import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { StatusBadge } from "@/components/StatusBadge";
import { AdminDashboardLayout } from "../AdminLayout";

export default async function AdminReportsPage() {
  const user = await requireRole("ADMIN");

  const reports = await prisma.inspectionReport.findMany({
    include: {
      serviceRequest: { include: { property: true, user: true } },
      agent: true,
      media: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <AdminDashboardLayout userName={user.fullName}>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">All Reports</h2>

        {reports.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <p className="text-slate-500">No reports submitted yet.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {reports.map((report) => (
              <div key={report.id} className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {report.serviceRequest.property.name}
                    </h3>
                    <p className="text-sm text-slate-500">
                      Client: {report.serviceRequest.user.fullName}
                    </p>
                    <p className="text-sm text-slate-500">Agent: {report.agent.fullName}</p>
                    <p className="text-sm text-slate-700 mt-2">{report.summary}</p>
                    {report.latitude && report.longitude && (
                      <p className="text-xs text-slate-400 mt-1">
                        GPS: {report.latitude}, {report.longitude}
                      </p>
                    )}
                    {report.media.length > 0 && (
                      <p className="text-xs text-slate-400 mt-1">
                        {report.media.length} media file(s) attached
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <StatusBadge status={report.riskLevel} />
                    <p className="text-xs text-slate-400 mt-2">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminDashboardLayout>
  );
}
