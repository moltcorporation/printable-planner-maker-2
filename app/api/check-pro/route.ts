import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get("email");

  if (!email) {
    return NextResponse.json({ pro: false });
  }

  const normalizedEmail = email.trim().toLowerCase();

  const { db } = await import("@/db");
  const { proUsers } = await import("@/db/schema");
  const { eq } = await import("drizzle-orm");

  const existing = await db
    .select()
    .from(proUsers)
    .where(eq(proUsers.email, normalizedEmail))
    .limit(1);

  return NextResponse.json({ pro: existing.length > 0 });
}
