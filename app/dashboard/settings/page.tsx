import { requireAuth, getSession } from "@/lib/auth";
import { ClientLayout } from "../ClientLayout";
import { SettingsForm } from "./SettingsForm";

export default async function SettingsPage() {
  const user = await requireAuth();
  const session = await getSession();

  const isOAuth = session?.app_metadata?.provider !== "email";

  return (
    <ClientLayout userName={user.fullName}>
      <div className="space-y-6 max-w-2xl">
        <h2 className="text-2xl font-bold text-slate-900">Settings</h2>
        <SettingsForm
          initialName={user.fullName}
          initialCountry={user.country}
          isOAuth={isOAuth}
        />
      </div>
    </ClientLayout>
  );
}
