import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { StatusBadge } from "@/components/StatusBadge";
import { PrintButton } from "@/components/PrintButton";
import { ClientLayout } from "../../ClientLayout";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

const PropertyMap = dynamic(
  () => import("@/components/PropertyMap").then((m) => m.PropertyMap),
  { ssr: false, loading: () => <div className="h-[280px] bg-slate-100 rounded-lg animate-pulse" /> }
);

export default async function ReportDetailPage({ params }: { params: { id: string } }) {
  const user = await requireAuth();

  const report = await prisma.inspectionReport.findUnique({
    where: { id: params.id },
    include: {
      serviceRequest: { include: { property: true, user: true } },
      agent: true,
      media: true,
    },
  });

  if (!report || report.serviceRequest.userId !== user.id) {
    notFound();
  }

  return (
    <ClientLayout userName={user.fullName}>
      <div className="space-y-6 max-w-4xl">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Inspection Report</h2>
            <p className="text-slate-500">{report.serviceRequest.property.name}</p>
          </div>
          <PrintButton />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <h3 className="font-semibold text-slate-900">Property Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Name</span>
                <span>{report.serviceRequest.property.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">County</span>
                <span>{report.serviceRequest.property.county}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Type</span>
                <span>{report.serviceRequest.property.propertyType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Service</span>
                <span>{report.serviceRequest.serviceType}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <h3 className="font-semibold text-slate-900">Inspection Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Risk Level</span>
                <StatusBadge status={report.riskLevel} />
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Inspector</span>
                <span>{report.agent.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date</span>
                <span>{new Date(report.createdAt).toLocaleDateString()}</span>
              </div>
              {report.latitude && report.longitude && (
                <div className="flex justify-between">
                  <span className="text-slate-500">GPS</span>
                  <span className="font-mono text-xs">
                    {report.latitude.toFixed(5)}, {report.longitude.toFixed(5)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Findings</h3>
          <p className="text-sm text-slate-700 whitespace-pre-wrap">{report.summary}</p>
        </div>

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

        {report.media.length > 0 && (
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900 mb-4">
              Evidence ({report.media.length} files)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {report.media.map((m) => (
                <div key={m.id}>
                  {m.type === "PHOTO" ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={m.url} alt="Evidence" className="w-full h-48 object-cover rounded-lg" />
                  ) : (
                    <video src={m.url} controls className="w-full h-48 object-cover rounded-lg" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ClientLayout>
  );
}
