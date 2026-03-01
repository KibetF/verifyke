import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { StatusBadge } from "@/components/StatusBadge";
import { ClientLayout } from "../../ClientLayout";
import { notFound } from "next/navigation";
import Link from "next/link";

const STEPS = ["PENDING", "ASSIGNED", "COMPLETED"] as const;

function StatusTimeline({ current }: { current: string }) {
  const cancelled = current === "CANCELLED";
  const currentIndex = cancelled ? -1 : STEPS.indexOf(current as (typeof STEPS)[number]);

  return (
    <div className="flex items-center gap-2">
      {STEPS.map((step, i) => {
        const isActive = !cancelled && i <= currentIndex;
        return (
          <div key={step} className="flex items-center gap-2">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                  isActive
                    ? "bg-slate-900 text-white"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                {i + 1}
              </div>
              <span className={`text-xs mt-1 ${isActive ? "text-slate-900 font-medium" : "text-slate-400"}`}>
                {step}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`w-12 h-0.5 mb-5 ${
                  !cancelled && i < currentIndex ? "bg-slate-900" : "bg-slate-200"
                }`}
              />
            )}
          </div>
        );
      })}
      {cancelled && (
        <div className="ml-4">
          <StatusBadge status="CANCELLED" />
        </div>
      )}
    </div>
  );
}

export default async function RequestDetailPage({ params }: { params: { id: string } }) {
  const user = await requireAuth();

  const request = await prisma.serviceRequest.findUnique({
    where: { id: params.id },
    include: {
      property: true,
      inspectionReport: true,
    },
  });

  if (!request || request.userId !== user.id) {
    notFound();
  }

  return (
    <ClientLayout userName={user.fullName}>
      <div className="space-y-6 max-w-4xl">
        <div className="flex items-center justify-between">
          <div>
            <Link href="/dashboard/requests" className="text-sm text-slate-500 hover:text-slate-700">
              &larr; Back to Requests
            </Link>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">Request Details</h2>
          </div>
          <StatusBadge status={request.status} />
        </div>

        {/* Status Timeline */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Status</h3>
          <StatusTimeline current={request.status} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Property Info */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <h3 className="font-semibold text-slate-900">Property</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Name</span>
                <span>{request.property.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">County</span>
                <span>{request.property.county}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Type</span>
                <span>{request.property.propertyType}</span>
              </div>
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <h3 className="font-semibold text-slate-900">Pricing</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Service Type</span>
                <span>{request.serviceType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Base Price</span>
                <span>KES {request.basePrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Distance Fee ({request.distanceKm} km)</span>
                <span>KES {request.distanceFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 font-semibold">
                <span>Total</span>
                <span>KES {request.totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule & Report */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <h3 className="font-semibold text-slate-900">Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Scheduled Date</span>
              <span>
                {request.scheduledDate
                  ? new Date(request.scheduledDate).toLocaleDateString()
                  : "Not scheduled"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Created</span>
              <span>{new Date(request.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Payment</span>
              <StatusBadge status={request.paymentStatus} />
            </div>
            {request.mpesaReceipt && (
              <div className="flex justify-between">
                <span className="text-slate-500">M-Pesa Receipt</span>
                <span className="font-mono text-sm">{request.mpesaReceipt}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-slate-500">Report</span>
              {request.inspectionReport ? (
                <Link
                  href={`/dashboard/reports/${request.inspectionReport.id}`}
                  className="text-slate-900 font-medium hover:underline"
                >
                  View Report
                </Link>
              ) : (
                <span className="text-slate-400">Not yet available</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
