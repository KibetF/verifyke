import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { StatusBadge } from "@/components/StatusBadge";
import { AgentDashboardLayout } from "./AgentLayout";
import Link from "next/link";

export default async function AgentPage() {
  const user = await requireRole("AGENT");

  const requests = await prisma.serviceRequest.findMany({
    where: { status: { in: ["ASSIGNED", "COMPLETED"] } },
    include: {
      property: true,
      user: true,
      inspectionReport: { where: { agentId: user.id } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <AgentDashboardLayout userName={user.fullName}>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">Assigned Requests</h2>

        {requests.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <p className="text-slate-500">No assigned requests.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {requests.map((req) => (
              <div key={req.id} className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-slate-900">{req.property.name}</h3>
                    <p className="text-sm text-slate-500">
                      {req.property.county} &middot; {req.serviceType}
                    </p>
                    <p className="text-sm text-slate-500">Client: {req.user.fullName}</p>
                    {req.scheduledDate && (
                      <p className="text-sm text-slate-400 mt-1">
                        Scheduled: {new Date(req.scheduledDate).toLocaleDateString()}
                      </p>
                    )}
                    {req.property.latitude && req.property.longitude && (
                      <p className="text-xs text-slate-400 mt-1">
                        GPS: {req.property.latitude}, {req.property.longitude}
                      </p>
                    )}
                  </div>
                  <div className="text-right space-y-2">
                    <StatusBadge status={req.status} />
                    {req.status === "ASSIGNED" && !req.inspectionReport && (
                      <Link
                        href={`/agent/report?requestId=${req.id}`}
                        className="block text-sm bg-slate-900 text-white rounded-lg py-1.5 px-3 hover:bg-slate-800 mt-2"
                      >
                        Submit Report
                      </Link>
                    )}
                    {req.inspectionReport && (
                      <p className="text-xs text-green-600 mt-2">Report submitted</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AgentDashboardLayout>
  );
}
