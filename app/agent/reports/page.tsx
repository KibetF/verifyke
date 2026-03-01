import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { StatusBadge } from "@/components/StatusBadge";
import { AgentDashboardLayout } from "../AgentLayout";
import Link from "next/link";

export default async function AgentReportsPage() {
  const user = await requireRole("AGENT");

  const reports = await prisma.inspectionReport.findMany({
    where: { agentId: user.id },
    include: {
      serviceRequest: { include: { property: true, user: true } },
      media: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <AgentDashboardLayout userName={user.fullName}>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">My Reports</h2>

        {reports.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <p className="text-slate-500">You have not submitted any reports yet.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {reports.map((report) => (
              <Link
                key={report.id}
                href={`/agent/reports/${report.id}`}
                className="block bg-white rounded-xl border border-slate-200 p-6 hover:border-slate-300 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {report.serviceRequest.property.name}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {report.serviceRequest.property.county} ·{" "}
                      {report.serviceRequest.serviceType}
                    </p>
                    <p className="text-sm text-slate-500">
                      Client: {report.serviceRequest.user.fullName}
                    </p>
                    <p className="text-sm text-slate-700 mt-2 line-clamp-2">{report.summary}</p>
                    {report.media.length > 0 && (
                      <p className="text-xs text-slate-400 mt-1">
                        {report.media.length} media file(s)
                      </p>
                    )}
                  </div>
                  <div className="text-right shrink-0 ml-4">
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
    </AgentDashboardLayout>
  );
}
