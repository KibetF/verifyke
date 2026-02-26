import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { getDashboardPath } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = createClient();
    const { data } = await supabase.auth.exchangeCodeForSession(code);

    if (data?.user) {
      const existingUser = await prisma.user.findUnique({
        where: { id: data.user.id },
      });

      if (existingUser) {
        return NextResponse.redirect(
          `${origin}${getDashboardPath(existingUser.role)}`
        );
      }

      return NextResponse.redirect(`${origin}/onboarding`);
    }
  }

  return NextResponse.redirect(`${origin}/dashboard`);
}
