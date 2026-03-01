import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { StatusBadge } from "@/components/StatusBadge";
import { AgentDashboardLayout } from "./AgentLayout";
import Link from "next/link";

export default async function AgentPage() {
  const user = await requireRole("AGENT");

  const requests = await prisma.serviceRequest.findMany({
    where: { agentId: user.id },
    include: { property: true, user: true },
    orderBy: { createdAt: "desc" },
  });

  const active = requests.filter((r) => r.status === "ASSIGNED").length;
  const completed = requests.filter((r) => r.status === "COMPLETED").length;
  const recentRequests = requests.slice(0, 5);

  return (
    <AgentDashboardLayout userName={user.fullName}>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">Overview</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <p className="text-sm text-slate-500">Active Assignments</p>
            <p className="text-3xl font-bold text-blue-600 mt-1">{active}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <p className="text-sm text-slate-500">Completed</p>
            <p className="text-3xl font-bold text-green-600 mt-1">{completed}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <p className="text-sm text-slate-500">Total Assigned</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{requests.length}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200">
          <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
            <h3 className="font-semibold text-slate-900">Recent Requests</h3>
            <Link href="/agent/requests" className="text-sm text-slate-500 hover:text-slate-700">
              View all →
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {recentRequests.length === 0 ? (
              <p className="px-6 py-4 text-sm text-slate-500">No requests assigned yet.</p>
            ) : (
              recentRequests.map((req) => (
                <div key={req.id} className="px-6 py-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{req.property.name}</p>
                    <p className="text-xs text-slate-500">
                      {req.property.county} · {req.serviceType}
                    </p>
                  </div>
                  <StatusBadge status={req.status} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AgentDashboardLayout>
  );
}
