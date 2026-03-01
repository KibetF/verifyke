"use client";

import { addProperty } from "@/app/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function AddPropertyForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    await addProperty(formData);
    toast.success("Property added successfully!");
    router.push("/dashboard/properties");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-8 space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Property Name</label>
        <input
          name="name"
          required
          className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
          placeholder="e.g. Kiambu Plot LR-4521"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">County</label>
        <input
          name="county"
          required
          className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
          placeholder="e.g. Kiambu"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Property Type</label>
        <select
          name="propertyType"
          required
          className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
        >
          <option value="LAND">Land</option>
          <option value="CONSTRUCTION">Construction</option>
          <option value="RENTAL">Rental</option>
          <option value="FARM">Farm</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Latitude <span className="text-slate-400">(optional)</span>
          </label>
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
            Longitude <span className="text-slate-400">(optional)</span>
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

      <div className="flex gap-4 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-slate-900 text-white rounded-lg py-2.5 px-6 text-sm font-medium hover:bg-slate-800 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Property"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm text-slate-500 hover:text-slate-800 py-2.5 px-6"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
