import { requireAuth } from "@/lib/auth";
import { ClientLayout } from "../../ClientLayout";
import { AddPropertyForm } from "./AddPropertyForm";

export default async function AddPropertyPage() {
  const user = await requireAuth();

  return (
    <ClientLayout userName={user.fullName}>
      <div className="space-y-6 max-w-2xl">
        <h2 className="text-2xl font-bold text-slate-900">Add Property</h2>
        <AddPropertyForm />
      </div>
    </ClientLayout>
  );
}
