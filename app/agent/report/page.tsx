"use client";

import { submitReport, uploadMedia } from "@/app/actions";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

function ReportForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestId = searchParams.get("requestId") || "";
  const [loading, setLoading] = useState(false);
  const [reportId, setReportId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const report = await submitReport(formData);
    setReportId(report.id);
    setLoading(false);
    setSuccess(true);
  };

  const handleMediaUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "PHOTO" | "VIDEO"
  ) => {
    if (!e.target.files?.length || !reportId) return;
    setUploading(true);

    for (const file of Array.from(e.target.files)) {
      const formData = new FormData();
      formData.set("reportId", reportId);
      formData.set("file", file);
      formData.set("type", type);
      await uploadMedia(formData);
    }

    setUploading(false);
  };

  if (success && reportId) {
    return (
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg">
            Report submitted successfully.
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-8 space-y-4">
            <h3 className="font-semibold text-slate-900">Upload Evidence</h3>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Photos</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleMediaUpload(e, "PHOTO")}
                className="text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Videos</label>
              <input
                type="file"
                accept="video/*"
                multiple
                onChange={(e) => handleMediaUpload(e, "VIDEO")}
                className="text-sm"
              />
            </div>
            {uploading && <p className="text-sm text-slate-500">Uploading...</p>}
            <button
              onClick={() => router.push("/agent")}
              className="bg-slate-900 text-white rounded-lg py-2 px-4 text-sm font-medium hover:bg-slate-800"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Submit Inspection Report</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl border border-slate-200 p-8 space-y-4"
        >
          <input type="hidden" name="serviceRequestId" value={requestId} />

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Risk Level</label>
            <select
              name="riskLevel"
              required
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
            >
              <option value="LOW">Low</option>
              <option value="MODERATE">Moderate</option>
              <option value="HIGH">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Summary / Findings
            </label>
            <textarea
              name="summary"
              required
              rows={6}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
              placeholder="Describe your findings from the inspection..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">GPS Latitude</label>
              <input
                name="latitude"
                type="number"
                step="any"
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                placeholder="-1.2921"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                GPS Longitude
              </label>
              <input
                name="longitude"
                type="number"
                step="any"
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                placeholder="36.8219"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-slate-800 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Report"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AgentReportPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 p-8">
          <p>Loading...</p>
        </div>
      }
    >
      <ReportForm />
    </Suspense>
  );
}
