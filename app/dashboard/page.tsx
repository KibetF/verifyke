import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { StatusBadge } from "@/components/StatusBadge";
import { ClientLayout } from "./ClientLayout";

export default async function DashboardPage() {
  const user = await requireAuth();

  const [properties, requests] = await Promise.all([
    prisma.property.count({ where: { userId: user.id } }),
    prisma.serviceRequest.findMany({
      where: { userId: user.id },
      include: { property: true },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  const completedCount = requests.filter((r) => r.status === "COMPLETED").length;
  const pendingCount = requests.filter((r) => r.status === "PENDING").length;

  return (
    <ClientLayout userName={user.fullName}>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Overview</h2>
          <p className="text-slate-500">Welcome back, {user.fullName}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <p className="text-sm text-slate-500">Properties</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{properties}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <p className="text-sm text-slate-500">Pending Requests</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{pendingCount}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <p className="text-sm text-slate-500">Completed</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{completedCount}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-slate-900">Recent Requests</h3>
            <Link href="/dashboard/requests" className="text-sm text-slate-500 hover:text-slate-900">
              View all
            </Link>
          </div>
          {requests.length === 0 ? (
            <p className="text-sm text-slate-500">No service requests yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[480px]">
                <thead>
                  <tr className="text-left text-slate-500 border-b border-slate-100">
                    <th className="pb-3 font-medium">Property</th>
                    <th className="pb-3 font-medium">Type</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Total</th>
                    <th className="pb-3 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req) => (
                    <tr key={req.id} className="border-b border-slate-50">
                      <td className="py-3">{req.property.name}</td>
                      <td className="py-3">{req.serviceType}</td>
                      <td className="py-3">
                        <StatusBadge status={req.status} />
                      </td>
                      <td className="py-3">KES {req.totalPrice.toLocaleString()}</td>
                      <td className="py-3">{new Date(req.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </ClientLayout>
  );
}
