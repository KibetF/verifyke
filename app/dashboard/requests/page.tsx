import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { StatusBadge } from "@/components/StatusBadge";
import { FilterBar } from "@/components/FilterBar";
import { ExportCSVButton } from "@/components/ExportCSVButton";
import { ClientLayout } from "../ClientLayout";
import Link from "next/link";
import { Suspense } from "react";
import { Prisma } from "@prisma/client";

interface Props {
  searchParams: { q?: string; status?: string; serviceType?: string };
}

export default async function RequestsPage({ searchParams }: Props) {
  const user = await requireAuth();

  const where: Prisma.ServiceRequestWhereInput = { userId: user.id };

  if (searchParams.status) {
    where.status = searchParams.status as Prisma.ServiceRequestWhereInput["status"];
  }
  if (searchParams.serviceType) {
    where.serviceType = searchParams.serviceType as Prisma.ServiceRequestWhereInput["serviceType"];
  }
  if (searchParams.q) {
    where.property = { name: { contains: searchParams.q, mode: "insensitive" } };
  }

  const requests = await prisma.serviceRequest.findMany({
    where,
    include: { property: true, inspectionReport: true },
    orderBy: { createdAt: "desc" },
  });

  const csvData = requests.map((req) => ({
    Property: req.property.name,
    Service: req.serviceType,
    Status: req.status,
    Payment: req.paymentStatus,
    "M-Pesa Receipt": req.mpesaReceipt ?? "",
    "Total (KES)": req.totalPrice,
    Date: new Date(req.createdAt).toLocaleDateString(),
  }));

  return (
    <ClientLayout userName={user.fullName}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-900">Service Requests</h2>
          <div className="flex gap-3">
            <ExportCSVButton data={csvData} filename="service-requests" />
            <Link
              href="/dashboard/book"
              className="bg-slate-900 text-white rounded-lg py-2 px-4 text-sm font-medium hover:bg-slate-800"
            >
              New Request
            </Link>
          </div>
        </div>

        <Suspense fallback={null}>
          <FilterBar
            searchPlaceholder="Search properties..."
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
        </Suspense>

        {requests.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <p className="text-slate-500">No service requests found.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[650px]">
              <thead>
                <tr className="text-left text-slate-500 border-b border-slate-200 bg-slate-50">
                  <th className="px-6 py-3 font-medium">Property</th>
                  <th className="px-6 py-3 font-medium">Service</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Payment</th>
                  <th className="px-6 py-3 font-medium">Total</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                  <th className="px-6 py-3 font-medium">Report</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req.id} className="border-b border-slate-100">
                    <td className="px-6 py-4">
                      <Link
                        href={`/dashboard/requests/${req.id}`}
                        className="text-slate-900 font-medium hover:underline"
                      >
                        {req.property.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4">{req.serviceType}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={req.status} />
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={req.paymentStatus} />
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
          </div>
        )}
      </div>
    </ClientLayout>
  );
}
