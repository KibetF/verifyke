import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ClientLayout } from "../ClientLayout";

export default async function PropertiesPage() {
  const user = await requireAuth();
  const properties = await prisma.property.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <ClientLayout userName={user.fullName}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-900">Properties</h2>
          <Link
            href="/dashboard/properties/add"
            className="bg-slate-900 text-white rounded-lg py-2 px-4 text-sm font-medium hover:bg-slate-800"
          >
            Add Property
          </Link>
        </div>

        {properties.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <p className="text-slate-500">No properties added yet.</p>
            <Link
              href="/dashboard/properties/add"
              className="text-sm text-slate-900 font-medium hover:underline mt-2 inline-block"
            >
              Add your first property
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {properties.map((p) => (
              <div key={p.id} className="bg-white rounded-xl border border-slate-200 p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-slate-900">{p.name}</h3>
                    <p className="text-sm text-slate-500">
                      {p.county} &middot; {p.propertyType}
                    </p>
                    {p.latitude && p.longitude && (
                      <p className="text-xs text-slate-400 mt-1">
                        GPS: {p.latitude}, {p.longitude}
                      </p>
                    )}
                  </div>
                  <Link
                    href={`/dashboard/book?propertyId=${p.id}`}
                    className="text-sm text-slate-600 hover:text-slate-900"
                  >
                    Book Service
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ClientLayout>
  );
}
