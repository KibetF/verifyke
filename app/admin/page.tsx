import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { StatusBadge } from "@/components/StatusBadge";
import { AdminDashboardLayout } from "./AdminLayout";
import { AdminActions } from "./AdminActions";

export default async function AdminPage() {
  const user = await requireRole("ADMIN");

  const requests = await prisma.serviceRequest.findMany({
    include: {
      property: true,
      user: true,
      inspectionReport: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const agents = await prisma.user.findMany({
    where: { role: "AGENT" },
    select: { id: true, fullName: true },
  });

  return (
    <AdminDashboardLayout userName={user.fullName}>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">All Service Requests</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <p className="text-sm text-slate-500">Total</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{requests.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <p className="text-sm text-slate-500">Pending</p>
            <p className="text-3xl font-bold text-yellow-600 mt-1">
              {requests.filter((r) => r.status === "PENDING").length}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <p className="text-sm text-slate-500">Assigned</p>
            <p className="text-3xl font-bold text-blue-600 mt-1">
              {requests.filter((r) => r.status === "ASSIGNED").length}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <p className="text-sm text-slate-500">Completed</p>
            <p className="text-3xl font-bold text-green-600 mt-1">
              {requests.filter((r) => r.status === "COMPLETED").length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-3 font-medium">Client</th>
                <th className="px-6 py-3 font-medium">Property</th>
                <th className="px-6 py-3 font-medium">Service</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Total</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id} className="border-b border-slate-100">
                  <td className="px-6 py-4">{req.user.fullName}</td>
                  <td className="px-6 py-4">{req.property.name}</td>
                  <td className="px-6 py-4">{req.serviceType}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={req.status} />
                  </td>
                  <td className="px-6 py-4">KES {req.totalPrice.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <AdminActions
                      requestId={req.id}
                      currentStatus={req.status}
                      agents={agents}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
