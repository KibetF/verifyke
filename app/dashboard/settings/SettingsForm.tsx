"use client";

import { updateProfile, changePassword } from "@/app/actions";
import { useState } from "react";
import { toast } from "sonner";

interface SettingsFormProps {
  initialName: string;
  initialCountry: string;
  isOAuth: boolean;
}

export function SettingsForm({ initialName, initialCountry, isOAuth }: SettingsFormProps) {
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProfileLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      await updateProfile(formData);
      toast.success("Profile updated successfully");
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPasswordLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const newPassword = formData.get("newPassword") as string;
      if (newPassword.length < 6) {
        toast.error("Password must be at least 6 characters");
        setPasswordLoading(false);
        return;
      }
      const result = await changePassword(formData);
      if (result.success) {
        toast.success("Password updated successfully");
        (e.target as HTMLFormElement).reset();
      } else {
        toast.error(result.error || "Failed to update password");
      }
    } catch {
      toast.error("Failed to update password");
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Profile Section */}
      <form onSubmit={handleProfileSubmit} className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <h3 className="font-semibold text-slate-900">Profile Information</h3>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
          <input
            name="fullName"
            required
            defaultValue={initialName}
            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Country</label>
          <input
            name="country"
            required
            defaultValue={initialCountry}
            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>
        <button
          type="submit"
          disabled={profileLoading}
          className="bg-slate-900 text-white rounded-lg py-2.5 px-6 text-sm font-medium hover:bg-slate-800 disabled:opacity-50"
        >
          {profileLoading ? "Saving..." : "Save Changes"}
        </button>
      </form>

      {/* Password Section — hidden for OAuth users */}
      {!isOAuth && (
        <form onSubmit={handlePasswordSubmit} className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <h3 className="font-semibold text-slate-900">Change Password</h3>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Current Password</label>
            <input
              name="currentPassword"
              type="password"
              required
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
            <input
              name="newPassword"
              type="password"
              required
              minLength={6}
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
          <button
            type="submit"
            disabled={passwordLoading}
            className="bg-slate-900 text-white rounded-lg py-2.5 px-6 text-sm font-medium hover:bg-slate-800 disabled:opacity-50"
          >
            {passwordLoading ? "Updating..." : "Update Password"}
          </button>
        </form>
      )}
    </div>
  );
}
