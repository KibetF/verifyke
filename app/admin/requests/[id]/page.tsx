import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { StatusBadge } from "@/components/StatusBadge";
import { AdminDashboardLayout } from "../../AdminLayout";
import { AdminActions } from "../../AdminActions";
import Link from "next/link";
import dynamic from "next/dynamic";

const PropertyMap = dynamic(
  () => import("@/components/PropertyMap").then((m) => m.PropertyMap),
  { ssr: false, loading: () => <div className="h-[280px] bg-slate-100 rounded-lg animate-pulse" /> }
);

export default async function AdminRequestDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await requireRole("ADMIN");

  const [request, agents] = await Promise.all([
    prisma.serviceRequest.findUnique({
      where: { id: params.id },
      include: {
        property: true,
        user: true,
        agent: true,
        inspectionReport: { include: { media: true } },
      },
    }),
    prisma.user.findMany({
      where: { role: "AGENT" },
      select: { id: true, fullName: true },
    }),
  ]);

  if (!request) notFound();

  return (
    <AdminDashboardLayout userName={user.fullName}>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/requests" className="text-sm text-slate-500 hover:text-slate-700">
            ← All Requests
          </Link>
          <StatusBadge status={request.status} />
        </div>

        <h2 className="text-2xl font-bold text-slate-900">{request.property.name}</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Property & Pricing Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
              <h3 className="font-semibold text-slate-900">Property Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-500">County</p>
                  <p className="font-medium">{request.property.county}</p>
                </div>
                <div>
                  <p className="text-slate-500">Type</p>
                  <p className="font-medium">{request.property.propertyType}</p>
                </div>
                {request.property.latitude && (
                  <div>
                    <p className="text-slate-500">GPS</p>
                    <p className="font-mono text-xs font-medium">
                      {request.property.latitude?.toFixed(5)}, {request.property.longitude?.toFixed(5)}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-slate-500">Client</p>
                  <p className="font-medium">{request.user.fullName}</p>
                </div>
                <div>
                  <p className="text-slate-500">Client Email</p>
                  <p className="font-medium">{request.user.email}</p>
                </div>
              </div>
            </div>

            {request.property.latitude && request.property.longitude && (
              <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
                <h3 className="font-semibold text-slate-900">Property Location</h3>
                <PropertyMap
                  lat={request.property.latitude}
                  lng={request.property.longitude}
                  label={request.property.name}
                />
              </div>
            )}

            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
              <h3 className="font-semibold text-slate-900">Pricing & Timeline</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-500">Service Type</p>
                  <p className="font-medium">{request.serviceType}</p>
                </div>
                <div>
                  <p className="text-slate-500">Base Price</p>
                  <p className="font-medium">KES {request.basePrice.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-slate-500">Distance Fee</p>
                  <p className="font-medium">KES {request.distanceFee.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-slate-500">Total Price</p>
                  <p className="font-bold text-slate-900">
                    KES {request.totalPrice.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500">Requested</p>
                  <p className="font-medium">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500">Payment</p>
                  <StatusBadge status={request.paymentStatus} />
                </div>
                {request.mpesaReceipt && (
                  <div>
                    <p className="text-slate-500">M-Pesa Receipt</p>
                    <p className="font-mono text-sm">{request.mpesaReceipt}</p>
                  </div>
                )}
                {request.paidAt && (
                  <div>
                    <p className="text-slate-500">Paid At</p>
                    <p className="font-medium">{new Date(request.paidAt).toLocaleString()}</p>
                  </div>
                )}
                {request.scheduledDate && (
                  <div>
                    <p className="text-slate-500">Scheduled</p>
                    <p className="font-medium">
                      {new Date(request.scheduledDate).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {request.inspectionReport && (
              <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-slate-900">Report Summary</h3>
                  <Link
                    href={`/admin/reports/${request.inspectionReport.id}`}
                    className="text-sm text-slate-900 font-medium hover:underline"
                  >
                    Full Report →
                  </Link>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={request.inspectionReport.riskLevel} />
                </div>
                <p className="text-sm text-slate-700">{request.inspectionReport.summary}</p>
                {request.inspectionReport.media.length > 0 && (
                  <p className="text-xs text-slate-400">
                    {request.inspectionReport.media.length} media file(s) attached
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Actions Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
              <h3 className="font-semibold text-slate-900">Actions</h3>
              {request.agent && (
                <div className="text-sm">
                  <p className="text-slate-500">Assigned Agent</p>
                  <p className="font-medium">{request.agent.fullName}</p>
                </div>
              )}
              <AdminActions
                requestId={request.id}
                currentStatus={request.status}
                agents={agents}
              />
            </div>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}
