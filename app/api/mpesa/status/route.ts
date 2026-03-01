import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const requestId = req.nextUrl.searchParams.get("requestId");
  if (!requestId) {
    return NextResponse.json({ error: "Missing requestId" }, { status: 400 });
  }

  const request = await prisma.serviceRequest.findUnique({
    where: { id: requestId },
    select: {
      userId: true,
      paymentStatus: true,
      mpesaReceipt: true,
      paidAt: true,
      totalPrice: true,
    },
  });

  if (!request) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (request.userId !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json({
    paymentStatus: request.paymentStatus,
    mpesaReceipt: request.mpesaReceipt,
    paidAt: request.paidAt,
    totalPrice: request.totalPrice,
  });
}
