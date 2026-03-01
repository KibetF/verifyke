import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { StatusBadge } from "@/components/StatusBadge";
import { AdminDashboardLayout } from "./AdminLayout";
import Link from "next/link";

export default async function AdminPage() {
  const user = await requireRole("ADMIN");

  const [requests, agents] = await Promise.all([
    prisma.serviceRequest.findMany({
      include: { property: true, user: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.findMany({
      where: { role: "AGENT" },
      include: {
        assignedRequests: {
          select: { id: true, status: true, totalPrice: true },
        },
      },
    }),
  ]);

  const revenue = requests
    .filter((r) => r.status === "COMPLETED")
    .reduce((sum, r) => sum + r.totalPrice, 0);

  const pending = requests.filter((r) => r.status === "PENDING").length;
  const assigned = requests.filter((r) => r.status === "ASSIGNED").length;
  const completed = requests.filter((r) => r.status === "COMPLETED").length;

  const topAgents = agents
    .map((a) => ({
      id: a.id,
      fullName: a.fullName,
      completed: a.assignedRequests.filter((r) => r.status === "COMPLETED").length,
      assigned: a.assignedRequests.length,
    }))
    .sort((a, b) => b.completed - a.completed)
    .slice(0, 5);

  const recentRequests = requests.slice(0, 5);

  return (
    <AdminDashboardLayout userName={user.fullName}>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">Overview</h2>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <p className="text-sm text-slate-500">Total Revenue</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">
              KES {revenue.toLocaleString()}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <p className="text-sm text-slate-500">Pending</p>
            <p className="text-3xl font-bold text-yellow-600 mt-1">{pending}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <p className="text-sm text-slate-500">Assigned</p>
            <p className="text-3xl font-bold text-blue-600 mt-1">{assigned}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <p className="text-sm text-slate-500">Completed</p>
            <p className="text-3xl font-bold text-green-600 mt-1">{completed}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Requests */}
          <div className="bg-white rounded-xl border border-slate-200">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="font-semibold text-slate-900">Recent Requests</h3>
              <Link href="/admin/requests" className="text-sm text-slate-500 hover:text-slate-700">
                View all →
              </Link>
            </div>
            <div className="divide-y divide-slate-100">
              {recentRequests.length === 0 ? (
                <p className="px-6 py-4 text-sm text-slate-500">No requests yet.</p>
              ) : (
                recentRequests.map((req) => (
                  <div key={req.id} className="px-6 py-4 flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-slate-900">{req.property.name}</p>
                      <p className="text-xs text-slate-500">{req.user.fullName} · {req.serviceType}</p>
                    </div>
                    <StatusBadge status={req.status} />
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Top Agents */}
          <div className="bg-white rounded-xl border border-slate-200">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="font-semibold text-slate-900">Top Agents</h3>
              <Link href="/admin/agents" className="text-sm text-slate-500 hover:text-slate-700">
                View all →
              </Link>
            </div>
            <div className="divide-y divide-slate-100">
              {topAgents.length === 0 ? (
                <p className="px-6 py-4 text-sm text-slate-500">No agents yet.</p>
              ) : (
                topAgents.map((agent) => (
                  <div key={agent.id} className="px-6 py-4 flex justify-between items-center">
                    <p className="text-sm font-medium text-slate-900">{agent.fullName}</p>
                    <div className="text-right">
                      <p className="text-sm text-green-600">{agent.completed} completed</p>
                      <p className="text-xs text-slate-400">{agent.assigned} total assigned</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
