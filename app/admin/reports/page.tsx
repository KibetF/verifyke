import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { StatusBadge } from "@/components/StatusBadge";
import { AdminDashboardLayout } from "../AdminLayout";
import { FilterBar } from "@/components/FilterBar";
import Link from "next/link";
import { Suspense } from "react";
import { RiskLevel, ServiceType } from "@prisma/client";

async function ReportsContent({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) {
  const user = await requireRole("ADMIN");
  const { q, riskLevel, serviceType } = searchParams;

  const reports = await prisma.inspectionReport.findMany({
    where: {
      ...(riskLevel ? { riskLevel: riskLevel as RiskLevel } : {}),
      ...(serviceType
        ? { serviceRequest: { serviceType: serviceType as ServiceType } }
        : {}),
      ...(q
        ? {
            OR: [
              {
                serviceRequest: {
                  property: { name: { contains: q, mode: "insensitive" } },
                },
              },
              {
                serviceRequest: {
                  user: { fullName: { contains: q, mode: "insensitive" } },
                },
              },
            ],
          }
        : {}),
    },
    include: {
      serviceRequest: { include: { property: true, user: true } },
      agent: true,
      media: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <AdminDashboardLayout userName={user.fullName}>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">All Reports</h2>

        <FilterBar
          searchPlaceholder="Search client or property..."
          filters={[
            {
              key: "riskLevel",
              label: "Risk Level",
              options: [
                { label: "Low", value: "LOW" },
                { label: "Moderate", value: "MODERATE" },
                { label: "High", value: "HIGH" },
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

        {reports.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <p className="text-slate-500">No reports found.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {reports.map((report) => (
              <Link
                key={report.id}
                href={`/admin/reports/${report.id}`}
                className="block bg-white rounded-xl border border-slate-200 p-6 hover:border-slate-300 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {report.serviceRequest.property.name}
                    </h3>
                    <p className="text-sm text-slate-500">
                      Client: {report.serviceRequest.user.fullName}
                    </p>
                    <p className="text-sm text-slate-500">Agent: {report.agent.fullName}</p>
                    <p className="text-sm text-slate-700 mt-2 line-clamp-2">{report.summary}</p>
                    {report.media.length > 0 && (
                      <p className="text-xs text-slate-400 mt-1">
                        {report.media.length} media file(s) attached
                      </p>
                    )}
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <StatusBadge status={report.riskLevel} />
                    <p className="text-xs text-slate-400 mt-2">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </AdminDashboardLayout>
  );
}

export default function AdminReportsPage({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) {
  return (
    <Suspense fallback={<div className="p-8 text-slate-500">Loading...</div>}>
      <ReportsContent searchParams={searchParams} />
    </Suspense>
  );
}
