import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const VALID_ROLES = ["CLIENT", "AGENT", "ADMIN"] as const;
type ValidRole = (typeof VALID_ROLES)[number];

export async function POST(request: NextRequest) {
  try {
    const { id, email, fullName, country, role } = await request.json();

    if (!id || !email || !fullName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const userRole: ValidRole =
      role && VALID_ROLES.includes(role) ? role : "CLIENT";

    const user = await prisma.user.create({
      data: {
        id,
        email,
        fullName,
        country: country || "Kenya",
        role: userRole,
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
