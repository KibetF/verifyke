import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { StatusBadge } from "@/components/StatusBadge";
import { AdminDashboardLayout } from "../AdminLayout";
import { FilterBar } from "@/components/FilterBar";
import { ExportCSVButton } from "@/components/ExportCSVButton";
import Link from "next/link";
import { Suspense } from "react";
import { ServiceStatus, ServiceType } from "@prisma/client";

async function RequestsContent({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) {
  const user = await requireRole("ADMIN");

  const { q, status, serviceType } = searchParams;

  const requests = await prisma.serviceRequest.findMany({
    where: {
      ...(status ? { status: status as ServiceStatus } : {}),
      ...(serviceType ? { serviceType: serviceType as ServiceType } : {}),
      ...(q
        ? {
            OR: [
              { property: { name: { contains: q, mode: "insensitive" } } },
              { user: { fullName: { contains: q, mode: "insensitive" } } },
            ],
          }
        : {}),
    },
    include: { property: true, user: true, inspectionReport: true },
    orderBy: { createdAt: "desc" },
  });

  const csvData = requests.map((r) => ({
    ID: r.id,
    Client: r.user.fullName,
    Property: r.property.name,
    County: r.property.county,
    Service: r.serviceType,
    Status: r.status,
    Total: r.totalPrice,
    Date: new Date(r.createdAt).toLocaleDateString(),
  }));

  return (
    <AdminDashboardLayout userName={user.fullName}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-900">All Requests</h2>
          <ExportCSVButton data={csvData} filename="requests" />
        </div>

        <FilterBar
          searchPlaceholder="Search client or property..."
          filters={[
            {
              key: "status",
              label: "Status",
              options: [
                { label: "Pending", value: "PENDING" },
                { label: "Assigned", value: "ASSIGNED" },
                { label: "Completed", value: "COMPLETED" },
                { label: "Cancelled", value: "CANCELLED" },
              ],
            },
            {
              key: "serviceType",
              label: "Service",
              options: [
                { label: "Quick", value: "QUICK" },
                { label: "Standard", value: "STANDARD" },
                { label: "Premium", value: "PREMIUM" },
              ],
            },
          ]}
        />

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-3 font-medium">Client</th>
                <th className="px-6 py-3 font-medium">Property</th>
                <th className="px-6 py-3 font-medium">Service</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Payment</th>
                <th className="px-6 py-3 font-medium">Total</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {requests.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-slate-500">
                    No requests found.
                  </td>
                </tr>
              ) : (
                requests.map((req) => (
                  <tr key={req.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-6 py-4">{req.user.fullName}</td>
                    <td className="px-6 py-4">{req.property.name}</td>
                    <td className="px-6 py-4">{req.serviceType}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={req.status} />
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={req.paymentStatus} />
                    </td>
                    <td className="px-6 py-4">KES {req.totalPrice.toLocaleString()}</td>
                    <td className="px-6 py-4 text-slate-500">
                      {new Date(req.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/requests/${req.id}`}
                        className="text-sm text-slate-900 font-medium hover:underline"
                      >
                        View →
                      </Link>
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

export default function AdminRequestsPage({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) {
  return (
    <Suspense fallback={<div className="p-8 text-slate-500">Loading...</div>}>
      <RequestsContent searchParams={searchParams} />
    </Suspense>
  );
}
