import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { StatusBadge } from "@/components/StatusBadge";
import { ClientLayout } from "../ClientLayout";
import Link from "next/link";

export default async function RequestsPage() {
  const user = await requireAuth();
  const requests = await prisma.serviceRequest.findMany({
    where: { userId: user.id },
    include: { property: true, inspectionReport: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <ClientLayout userName={user.fullName}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-900">Service Requests</h2>
          <Link
            href="/dashboard/book"
            className="bg-slate-900 text-white rounded-lg py-2 px-4 text-sm font-medium hover:bg-slate-800"
          >
            New Request
          </Link>
        </div>

        {requests.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <p className="text-slate-500">No service requests yet.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 border-b border-slate-200 bg-slate-50">
                  <th className="px-6 py-3 font-medium">Property</th>
                  <th className="px-6 py-3 font-medium">Service</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Total</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                  <th className="px-6 py-3 font-medium">Report</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req.id} className="border-b border-slate-100">
                    <td className="px-6 py-4">{req.property.name}</td>
                    <td className="px-6 py-4">{req.serviceType}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={req.status} />
                    </td>
                    <td className="px-6 py-4">KES {req.totalPrice.toLocaleString()}</td>
                    <td className="px-6 py-4">{new Date(req.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      {req.inspectionReport ? (
                        <Link
                          href={`/dashboard/reports/${req.inspectionReport.id}`}
                          className="text-slate-900 font-medium hover:underline"
                        >
                          View
                        </Link>
                      ) : (
                        <span className="text-slate-400">Pending</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </ClientLayout>
  );
}
