import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { StatusBadge } from "@/components/StatusBadge";
import { AgentDashboardLayout } from "../AgentLayout";
import { FilterBar } from "@/components/FilterBar";
import Link from "next/link";
import { Suspense } from "react";
import { ServiceStatus, ServiceType } from "@prisma/client";

async function RequestsContent({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) {
  const user = await requireRole("AGENT");
  const { q, status, serviceType } = searchParams;

  const requests = await prisma.serviceRequest.findMany({
    where: {
      agentId: user.id,
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
    include: {
      property: true,
      user: true,
      inspectionReport: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <AgentDashboardLayout userName={user.fullName}>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">My Requests</h2>

        <FilterBar
          searchPlaceholder="Search property or client..."
          filters={[
            {
              key: "status",
              label: "Status",
              options: [
                { label: "Assigned", value: "ASSIGNED" },
                { label: "Completed", value: "COMPLETED" },
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

        {requests.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <p className="text-slate-500">No requests assigned to you yet.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {requests.map((req) => (
              <div key={req.id} className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-slate-900">{req.property.name}</h3>
                    <p className="text-sm text-slate-500">
                      {req.property.county} · {req.serviceType}
                    </p>
                    <p className="text-sm text-slate-500">Client: {req.user.fullName}</p>
                    {req.scheduledDate && (
                      <p className="text-sm text-slate-400 mt-1">
                        Scheduled: {new Date(req.scheduledDate).toLocaleDateString()}
                      </p>
                    )}
                    {req.property.latitude && req.property.longitude && (
                      <p className="text-xs text-slate-400 mt-1">
                        GPS: {req.property.latitude}, {req.property.longitude}
                      </p>
                    )}
                  </div>
                  <div className="text-right space-y-2">
                    <StatusBadge status={req.status} />
                    {req.status === "ASSIGNED" && !req.inspectionReport && (
                      <Link
                        href={`/agent/report?requestId=${req.id}`}
                        className="block text-sm bg-slate-900 text-white rounded-lg py-1.5 px-3 hover:bg-slate-800 mt-2"
                      >
                        Submit Report
                      </Link>
                    )}
                    {req.inspectionReport && (
                      <Link
                        href={`/agent/reports/${req.inspectionReport.id}`}
                        className="block text-xs text-green-600 hover:underline mt-2"
                      >
                        View Report →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AgentDashboardLayout>
  );
}

export default function AgentRequestsPage({
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
