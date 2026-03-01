"use server";

import { prisma } from "@/lib/prisma";
import { requireAuth, requireRole } from "@/lib/auth";
import { calculateTotal } from "@/lib/pricing";
import { PropertyType, ServiceType, RiskLevel } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
  sendBookingConfirmation,
  sendAgentAssignedToClient,
  sendNewAssignmentToAgent,
  sendInspectionComplete,
} from "@/lib/email";
import { formatPhone, initiateStk } from "@/lib/mpesa";

// --- Property Actions ---

export async function addProperty(formData: FormData) {
  const user = await requireAuth();

  const property = await prisma.property.create({
    data: {
      userId: user.id,
      name: formData.get("name") as string,
      county: formData.get("county") as string,
      latitude: formData.get("latitude")
        ? parseFloat(formData.get("latitude") as string)
        : null,
      longitude: formData.get("longitude")
        ? parseFloat(formData.get("longitude") as string)
        : null,
      propertyType: formData.get("propertyType") as PropertyType,
    },
  });

  revalidatePath("/dashboard/properties");
  return property;
}

// --- Service Request Actions ---

export async function createServiceRequest(formData: FormData) {
  const user = await requireAuth();

  const serviceType = formData.get("serviceType") as ServiceType;
  const distanceKm = parseFloat(formData.get("distanceKm") as string) || 0;
  const propertyId = formData.get("propertyId") as string;
  const scheduledDate = formData.get("scheduledDate") as string;
  const rawPhone = (formData.get("phoneNumber") as string | null) ?? "";

  const pricing = calculateTotal(serviceType, distanceKm);
  const devMode = !process.env.MPESA_CONSUMER_KEY;

  // Validate phone (skip in dev mode)
  let paymentPhone: string | null = null;
  if (!devMode) {
    try {
      paymentPhone = formatPhone(rawPhone);
    } catch {
      return { error: "Invalid phone number. Use format 07XXXXXXXX." } as const;
    }
  }

  // Create the service request
  const request = await prisma.serviceRequest.create({
    data: {
      userId: user.id,
      propertyId,
      serviceType,
      basePrice: pricing.basePrice,
      distanceFee: pricing.distanceFee,
      totalPrice: pricing.totalPrice,
      distanceKm,
      scheduledDate: scheduledDate ? new Date(scheduledDate) : null,
      paymentStatus: devMode ? "BYPASSED" : "PENDING",
      paymentPhone,
    },
  });

  revalidatePath("/dashboard/requests");

  // Manual quote: skip STK and email for now
  if (pricing.manualFlag) {
    return { request, manualFlag: true, devMode } as const;
  }

  // Initiate STK push in live mode
  if (!devMode && paymentPhone) {
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      select: { name: true },
    });

    const stkResult = await initiateStk({
      phone: paymentPhone,
      amount: Math.ceil(pricing.totalPrice),
      accountRef: `VK-${request.id.slice(0, 8).toUpperCase()}`,
      description: `${serviceType} Verify`,
    });

    if (stkResult.ok) {
      await prisma.serviceRequest.update({
        where: { id: request.id },
        data: { mpesaRequestId: stkResult.checkoutRequestId },
      });
    } else {
      await prisma.serviceRequest.update({
        where: { id: request.id },
        data: { paymentStatus: "FAILED" },
      });
    }

    // Fire-and-forget booking confirmation email
    void sendBookingConfirmation({
      to: user.email,
      clientName: user.fullName,
      propertyName: property?.name ?? propertyId,
      serviceType,
      totalPrice: pricing.totalPrice,
      scheduledDate: scheduledDate || null,
    }).catch(() => {});
  }

  return { request, manualFlag: false, devMode } as const;
}

// --- Profile Actions ---

export async function updateProfile(formData: FormData) {
  const user = await requireAuth();

  const fullName = formData.get("fullName") as string;
  const country = formData.get("country") as string;

  await prisma.user.update({
    where: { id: user.id },
    data: { fullName, country },
  });

  revalidatePath("/dashboard");
  return { success: true };
}

export async function changePassword(formData: FormData) {
  const user = await requireAuth();
  const supabase = createClient();

  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;

  // Verify current password by attempting sign-in
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: currentPassword,
  });

  if (signInError) {
    return { success: false, error: "Current password is incorrect" };
  }

  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (updateError) {
    return { success: false, error: updateError.message };
  }

  return { success: true };
}

// --- Admin Actions ---

export async function assignAgent(requestId: string, agentId: string) {
  await requireRole("ADMIN");

  const [updatedRequest, agent] = await Promise.all([
    prisma.serviceRequest.update({
      where: { id: requestId },
      data: { status: "ASSIGNED", agentId },
      include: { user: true, property: true },
    }),
    prisma.user.findUnique({ where: { id: agentId } }),
  ]);

  revalidatePath("/admin");
  revalidatePath("/agent");

  if (agent) {
    const scheduledDate = updatedRequest.scheduledDate
      ? new Date(updatedRequest.scheduledDate).toLocaleDateString()
      : null;

    // Email the client
    void sendAgentAssignedToClient({
      to: updatedRequest.user.email,
      clientName: updatedRequest.user.fullName,
      propertyName: updatedRequest.property.name,
      agentName: agent.fullName,
      requestId,
    }).catch(() => {});

    // Email the agent
    void sendNewAssignmentToAgent({
      to: agent.email,
      agentName: agent.fullName,
      propertyName: updatedRequest.property.name,
      county: updatedRequest.property.county,
      serviceType: updatedRequest.serviceType,
      scheduledDate,
      requestId,
    }).catch(() => {});
  }
}

export async function updateRequestStatus(
  requestId: string,
  status: "PENDING" | "ASSIGNED" | "COMPLETED" | "CANCELLED"
) {
  await requireRole("ADMIN");

  await prisma.serviceRequest.update({
    where: { id: requestId },
    data: { status },
  });

  revalidatePath("/admin");
}

// --- Agent Actions ---

export async function submitReport(formData: FormData) {
  const user = await requireAuth();

  if (user.role !== "AGENT") throw new Error("Unauthorized");

  const serviceRequestId = formData.get("serviceRequestId") as string;
  const riskLevel = formData.get("riskLevel") as RiskLevel;
  const summary = formData.get("summary") as string;
  const latitude = formData.get("latitude")
    ? parseFloat(formData.get("latitude") as string)
    : null;
  const longitude = formData.get("longitude")
    ? parseFloat(formData.get("longitude") as string)
    : null;

  const report = await prisma.inspectionReport.create({
    data: {
      serviceRequestId,
      agentId: user.id,
      riskLevel,
      summary,
      latitude,
      longitude,
    },
  });

  // Update service request status and fetch client info for email
  const serviceRequest = await prisma.serviceRequest.update({
    where: { id: serviceRequestId },
    data: { status: "COMPLETED" },
    include: { user: true, property: true },
  });

  revalidatePath("/agent");
  revalidatePath("/admin");

  // Fire-and-forget email to client
  void sendInspectionComplete({
    to: serviceRequest.user.email,
    clientName: serviceRequest.user.fullName,
    propertyName: serviceRequest.property.name,
    riskLevel,
    reportId: report.id,
  }).catch(() => {});

  return report;
}

export async function uploadMedia(formData: FormData) {
  const user = await requireAuth();
  if (user.role !== "AGENT") throw new Error("Unauthorized");

  const reportId = formData.get("reportId") as string;
  const file = formData.get("file") as File;
  const mediaType = formData.get("type") as "PHOTO" | "VIDEO";

  const supabase = createClient();

  const fileExt = file.name.split(".").pop();
  const filePath = `reports/${reportId}/${Date.now()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("media")
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const {
    data: { publicUrl },
  } = supabase.storage.from("media").getPublicUrl(filePath);

  await prisma.media.create({
    data: {
      reportId,
      type: mediaType,
      url: publicUrl,
    },
  });

  revalidatePath("/agent");
}
