import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AdminDashboardLayout } from "../AdminLayout";

export default async function AdminAgentsPage() {
  const user = await requireRole("ADMIN");

  const agents = await prisma.user.findMany({
    where: { role: "AGENT" },
    include: {
      assignedRequests: {
        select: { id: true, status: true, totalPrice: true },
      },
    },
    orderBy: { fullName: "asc" },
  });

  const agentStats = agents.map((a) => {
    const assigned = a.assignedRequests.length;
    const completed = a.assignedRequests.filter((r) => r.status === "COMPLETED").length;
    const active = a.assignedRequests.filter((r) => r.status === "ASSIGNED").length;
    const revenue = a.assignedRequests
      .filter((r) => r.status === "COMPLETED")
      .reduce((sum, r) => sum + r.totalPrice, 0);
    return { ...a, assigned, completed, active, revenue };
  });

  return (
    <AdminDashboardLayout userName={user.fullName}>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">Agents</h2>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Active</th>
                <th className="px-6 py-3 font-medium">Completed</th>
                <th className="px-6 py-3 font-medium">Total Assigned</th>
                <th className="px-6 py-3 font-medium">Revenue Generated</th>
              </tr>
            </thead>
            <tbody>
              {agentStats.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                    No agents found.
                  </td>
                </tr>
              ) : (
                agentStats.map((agent) => (
                  <tr key={agent.id} className="border-b border-slate-100">
                    <td className="px-6 py-4 font-medium text-slate-900">{agent.fullName}</td>
                    <td className="px-6 py-4 text-slate-500">{agent.email}</td>
                    <td className="px-6 py-4">
                      <span className="text-blue-600 font-medium">{agent.active}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-green-600 font-medium">{agent.completed}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-700">{agent.assigned}</td>
                    <td className="px-6 py-4 font-medium">
                      KES {agent.revenue.toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
