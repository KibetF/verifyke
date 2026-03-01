import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ClientLayout } from "../ClientLayout";
import { BookServiceForm } from "./BookServiceForm";

export default async function BookServicePage({
  searchParams,
}: {
  searchParams: { propertyId?: string };
}) {
  const user = await requireAuth();

  const properties = await prisma.property.findMany({
    where: { userId: user.id },
    select: { id: true, name: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <ClientLayout userName={user.fullName}>
      <div className="space-y-6 max-w-2xl">
        <h2 className="text-2xl font-bold text-slate-900">Book Verification Service</h2>
        <BookServiceForm
          properties={properties}
          preselectedPropertyId={searchParams.propertyId ?? ""}
        />
      </div>
    </ClientLayout>
  );
}
