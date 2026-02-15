"use client";

import { createServiceRequest } from "@/app/actions";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

function BookServiceForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedPropertyId = searchParams.get("propertyId") || "";
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState<{ id: string; name: string }[]>([]);
  const [manualFlag, setManualFlag] = useState(false);

  useEffect(() => {
    fetch("/api/properties")
      .then((res) => res.json())
      .then((data) => setProperties(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await createServiceRequest(formData);
    if (result.manualFlag) {
      setManualFlag(true);
      setLoading(false);
      return;
    }
    router.push("/dashboard/requests");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Book Verification Service</h2>

        {manualFlag && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm p-4 rounded-lg mb-6">
            Distance exceeds 80km. Our team will contact you with a custom quote. Your request has been submitted.
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Property</label>
            <select
              name="propertyId"
              required
              defaultValue={preselectedPropertyId}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
            >
              <option value="">Select a property</option>
              {properties.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Service Type</label>
            <select
              name="serviceType"
              required
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
            >
              <option value="QUICK">Quick Check - KES 3,000</option>
              <option value="STANDARD">Standard Inspection - KES 8,000</option>
              <option value="PREMIUM">Premium Verification - KES 15,000</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Distance to property (km)</label>
            <input
              name="distanceKm"
              type="number"
              min="0"
              step="1"
              defaultValue="0"
              required
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
            <p className="text-xs text-slate-400 mt-1">
              0-15km: Free | 15-40km: +KES 1,000 | 40-80km: +KES 2,500 | 80+: Manual quote
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Date</label>
            <input
              name="scheduledDate"
              type="date"
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-slate-800 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function BookServicePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 p-8"><p>Loading...</p></div>}>
      <BookServiceForm />
    </Suspense>
  );
}
