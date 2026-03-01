"use client";

import { createServiceRequest } from "@/app/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

interface Property {
  id: string;
  name: string;
}

type PaymentPhase =
  | { phase: "idle" }
  | { phase: "waiting"; requestId: string; totalPrice: number; secondsLeft: number }
  | { phase: "paid"; receipt?: string | null }
  | { phase: "failed" };

export function BookServiceForm({
  properties,
  preselectedPropertyId,
}: {
  properties: Property[];
  preselectedPropertyId: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [manualFlag, setManualFlag] = useState(false);
  const [paymentPhase, setPaymentPhase] = useState<PaymentPhase>({ phase: "idle" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await createServiceRequest(formData);

    // Phone validation error
    if ("error" in result) {
      toast.error(result.error);
      setLoading(false);
      return;
    }

    // Manual quote (distance > 80km)
    if (result.manualFlag) {
      setManualFlag(true);
      toast.info("Request submitted — our team will contact you for a custom quote.");
      setLoading(false);
      return;
    }

    // Dev mode bypass — no STK, skip straight to success
    if (result.devMode) {
      toast.success("Request submitted (dev mode — payment bypassed).");
      router.push("/dashboard/requests");
      return;
    }

    // Live mode — transition to waiting screen and start polling
    const requestId = result.request.id;
    const totalPrice = result.request.totalPrice;
    const TIMEOUT_SECONDS = 60;

    setPaymentPhase({ phase: "waiting", requestId, totalPrice, secondsLeft: TIMEOUT_SECONDS });
    setLoading(false);

    const deadline = Date.now() + TIMEOUT_SECONDS * 1000;

    const tick = async () => {
      const remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));

      setPaymentPhase((prev) =>
        prev.phase === "waiting" ? { ...prev, secondsLeft: remaining } : prev
      );

      if (Date.now() >= deadline) {
        setPaymentPhase({ phase: "failed" });
        return;
      }

      try {
        const res = await fetch(`/api/mpesa/status?requestId=${requestId}`);
        const data = (await res.json()) as {
          paymentStatus: "PENDING" | "PAID" | "FAILED" | "BYPASSED";
          mpesaReceipt?: string | null;
        };

        if (data.paymentStatus === "PAID" || data.paymentStatus === "BYPASSED") {
          setPaymentPhase({ phase: "paid", receipt: data.mpesaReceipt });
          toast.success("Payment confirmed!");
          setTimeout(() => router.push("/dashboard/requests"), 2000);
          return;
        }

        if (data.paymentStatus === "FAILED") {
          setPaymentPhase({ phase: "failed" });
          return;
        }
      } catch {
        // Network error — keep polling
      }

      // Still PENDING — poll again in 3s
      setTimeout(tick, 3000);
    };

    setTimeout(tick, 3000);
  };

  // ── Waiting for M-Pesa PIN ─────────────────────────────────────────────────
  if (paymentPhase.phase === "waiting") {
    const { totalPrice, secondsLeft } = paymentPhase;
    const progress = (secondsLeft / 60) * 100;

    return (
      <div className="bg-white rounded-xl border border-slate-200 p-8 text-center space-y-5 max-w-md mx-auto">
        <div className="w-16 h-16 mx-auto bg-green-50 rounded-full flex items-center justify-center animate-pulse">
          <span className="text-3xl">📲</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Check Your Phone</h3>
          <p className="text-sm text-slate-500 mt-1">
            An M-Pesa prompt has been sent to your phone. Enter your PIN to confirm payment of{" "}
            <strong className="text-slate-900">KES {totalPrice.toLocaleString()}</strong>.
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-slate-400">
            Waiting for confirmation… ({secondsLeft}s remaining)
          </p>
          <div className="w-full bg-slate-100 rounded-full h-1.5">
            <div
              className="bg-green-500 h-1.5 rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <p className="text-xs text-slate-400">Do not close this page.</p>
      </div>
    );
  }

  // ── Payment confirmed ──────────────────────────────────────────────────────
  if (paymentPhase.phase === "paid") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center space-y-3 max-w-md mx-auto">
        <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-semibold text-green-900">Payment Confirmed</h3>
        {paymentPhase.receipt && (
          <p className="text-sm text-green-700">
            M-Pesa Receipt:{" "}
            <span className="font-mono font-semibold">{paymentPhase.receipt}</span>
          </p>
        )}
        <p className="text-sm text-green-700">Redirecting you to your requests…</p>
        <Link href="/dashboard/requests" className="text-sm text-green-800 underline">
          Go now →
        </Link>
      </div>
    );
  }

  // ── Payment failed / cancelled ─────────────────────────────────────────────
  if (paymentPhase.phase === "failed") {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center space-y-3 max-w-md mx-auto">
        <h3 className="font-semibold text-red-900">Payment Not Completed</h3>
        <p className="text-sm text-red-700">
          Your request was saved but payment was cancelled or timed out.
        </p>
        <button
          onClick={() => setPaymentPhase({ phase: "idle" })}
          className="bg-slate-900 text-white rounded-lg py-2 px-6 text-sm font-medium hover:bg-slate-800"
        >
          Try Again
        </button>
        <div>
          <Link href="/dashboard/requests" className="text-xs text-red-600 underline">
            View my requests
          </Link>
        </div>
      </div>
    );
  }

  // ── Idle — booking form ────────────────────────────────────────────────────
  return (
    <>
      {manualFlag && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm p-4 rounded-lg">
          Distance exceeds 80 km. Our team will contact you with a custom quote. Your request has
          been saved.
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-8 space-y-5">
        {/* Property */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Property</label>
          {properties.length === 0 ? (
            <p className="text-sm text-slate-500">
              No properties found.{" "}
              <a href="/dashboard/properties/add" className="text-slate-900 font-medium hover:underline">
                Add one first.
              </a>
            </p>
          ) : (
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
          )}
        </div>

        {/* Service type */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Service Type</label>
          <select
            name="serviceType"
            required
            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
          >
            <option value="QUICK">Quick Check — KES 3,000</option>
            <option value="STANDARD">Standard Inspection — KES 8,000</option>
            <option value="PREMIUM">Premium Verification — KES 15,000</option>
          </select>
        </div>

        {/* Distance */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Distance to property (km)
          </label>
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
            0–15 km: Free · 15–40 km: +KES 1,000 · 40–80 km: +KES 2,500 · 80+: Manual quote
          </p>
        </div>

        {/* Preferred date */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Preferred Date</label>
          <input
            name="scheduledDate"
            type="date"
            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>

        {/* M-Pesa phone */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            M-Pesa Phone Number
          </label>
          <input
            name="phoneNumber"
            type="tel"
            placeholder="07XXXXXXXX"
            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
          <p className="text-xs text-slate-400 mt-1">
            You will receive a payment prompt on this number to confirm your booking.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading || properties.length === 0}
          className="w-full bg-slate-900 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-slate-800 disabled:opacity-50"
        >
          {loading ? "Submitting…" : "Submit & Pay"}
        </button>
      </form>
    </>
  );
}
