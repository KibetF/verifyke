import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { StatusBadge } from "@/components/StatusBadge";
import { AgentDashboardLayout } from "../../AgentLayout";
import Link from "next/link";
import dynamic from "next/dynamic";

const PropertyMap = dynamic(
  () => import("@/components/PropertyMap").then((m) => m.PropertyMap),
  { ssr: false, loading: () => <div className="h-[280px] bg-slate-100 rounded-lg animate-pulse" /> }
);

export default async function AgentReportDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await requireRole("AGENT");

  const report = await prisma.inspectionReport.findUnique({
    where: { id: params.id, agentId: user.id },
    include: {
      serviceRequest: { include: { property: true, user: true } },
      media: true,
    },
  });

  if (!report) notFound();

  const photos = report.media.filter((m) => m.type === "PHOTO");
  const videos = report.media.filter((m) => m.type === "VIDEO");

  return (
    <AgentDashboardLayout userName={user.fullName}>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Link href="/agent/reports" className="text-sm text-slate-500 hover:text-slate-700">
            ← My Reports
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-slate-900">
            {report.serviceRequest.property.name}
          </h2>
          <StatusBadge status={report.riskLevel} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Findings */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
              <h3 className="font-semibold text-slate-900">Findings & Summary</h3>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {report.summary}
              </p>
              {report.latitude && report.longitude && (
                <p className="text-xs text-slate-400 font-mono">
                  GPS: {report.latitude.toFixed(5)}, {report.longitude.toFixed(5)}
                </p>
              )}
            </div>

            {/* Inspection location map */}
            {report.latitude && report.longitude && (
              <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
                <h3 className="font-semibold text-slate-900">Inspection Location</h3>
                <PropertyMap
                  lat={report.latitude}
                  lng={report.longitude}
                  label={`Inspection: ${report.serviceRequest.property.name}`}
                />
              </div>
            )}

            {/* Photo Gallery */}
            {photos.length > 0 && (
              <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
                <h3 className="font-semibold text-slate-900">Photos ({photos.length})</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {photos.map((photo) => (
                    <a
                      key={photo.id}
                      href={photo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={photo.url}
                        alt="Inspection photo"
                        className="rounded-lg object-cover w-full h-32 border border-slate-200 hover:opacity-90 transition-opacity"
                      />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {videos.length > 0 && (
              <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
                <h3 className="font-semibold text-slate-900">Videos ({videos.length})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {videos.map((video) => (
                    <video
                      key={video.id}
                      src={video.url}
                      controls
                      className="rounded-lg w-full border border-slate-200"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Info Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 text-sm">
              <h3 className="font-semibold text-slate-900">Property</h3>
              <div className="space-y-2">
                <div>
                  <p className="text-slate-500">County</p>
                  <p className="font-medium">{report.serviceRequest.property.county}</p>
                </div>
                <div>
                  <p className="text-slate-500">Type</p>
                  <p className="font-medium">{report.serviceRequest.property.propertyType}</p>
                </div>
                <div>
                  <p className="text-slate-500">Service</p>
                  <p className="font-medium">{report.serviceRequest.serviceType}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 text-sm">
              <h3 className="font-semibold text-slate-900">Client</h3>
              <div className="space-y-2">
                <div>
                  <p className="text-slate-500">Name</p>
                  <p className="font-medium">{report.serviceRequest.user.fullName}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 text-sm">
              <h3 className="font-semibold text-slate-900">Submission</h3>
              <div>
                <p className="text-slate-500">Date</p>
                <p className="font-medium">
                  {new Date(report.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AgentDashboardLayout>
  );
}
