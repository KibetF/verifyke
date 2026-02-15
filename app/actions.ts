"use server";

import { prisma } from "@/lib/prisma";
import { requireAuth, requireRole } from "@/lib/auth";
import { calculateTotal } from "@/lib/pricing";
import { PropertyType, ServiceType, RiskLevel } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

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

  const pricing = calculateTotal(serviceType, distanceKm);

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
    },
  });

  revalidatePath("/dashboard/requests");
  return { request, manualFlag: pricing.manualFlag };
}

// --- Admin Actions ---

export async function assignAgent(requestId: string, agentId: string) {
  await requireRole("ADMIN");

  await prisma.serviceRequest.update({
    where: { id: requestId },
    data: { status: "ASSIGNED" },
  });

  // Log assignment for tracking
  console.log(`Request ${requestId} assigned to agent ${agentId}`);

  revalidatePath("/admin");
  revalidatePath("/agent");
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

  // Update service request status
  await prisma.serviceRequest.update({
    where: { id: serviceRequestId },
    data: { status: "COMPLETED" },
  });

  revalidatePath("/agent");
  revalidatePath("/admin");
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
