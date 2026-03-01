import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface CallbackItem {
  Name: string;
  Value: string | number;
}

interface StkCallback {
  CheckoutRequestID: string;
  ResultCode: number;
  CallbackMetadata?: { Item: CallbackItem[] };
}

export async function POST(req: NextRequest) {
  // Always return 200 — Safaricom retries on non-200 responses
  try {
    const body = (await req.json()) as { Body: { stkCallback: StkCallback } };
    const { CheckoutRequestID, ResultCode, CallbackMetadata } =
      body.Body.stkCallback;

    const getItem = (name: string) =>
      CallbackMetadata?.Item.find((i) => i.Name === name)?.Value;

    // Find the request by mpesaRequestId (nullable, no unique index → findFirst)
    const request = await prisma.serviceRequest.findFirst({
      where: { mpesaRequestId: CheckoutRequestID },
      select: { id: true },
    });

    if (request) {
      if (ResultCode === 0) {
        await prisma.serviceRequest.update({
          where: { id: request.id },
          data: {
            paymentStatus: "PAID",
            mpesaReceipt: String(getItem("MpesaReceiptNumber") ?? ""),
            paidAt: new Date(),
          },
        });
      } else {
        await prisma.serviceRequest.update({
          where: { id: request.id },
          data: { paymentStatus: "FAILED" },
        });
      }
    }
  } catch (err) {
    // Log but never crash — always return 200 to Safaricom
    console.error("[mpesa/callback]", err);
  }

  return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
}
