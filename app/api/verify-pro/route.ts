import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const MONTHLY_LINK_ID = "plink_1THWB8DT8EiLsMQhjXo5NaY5";
const YEARLY_LINK_ID = "plink_1THWBADT8EiLsMQhgmgix8Lm";
const PAYMENT_LINK_IDS = [MONTHLY_LINK_ID, YEARLY_LINK_ID];

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const normalizedEmail = email.trim().toLowerCase();

  const { db } = await import("@/db");
  const { proUsers } = await import("@/db/schema");
  const { eq } = await import("drizzle-orm");

  // Check if already verified
  const existing = await db
    .select()
    .from(proUsers)
    .where(eq(proUsers.email, normalizedEmail))
    .limit(1);

  if (existing.length > 0) {
    return NextResponse.json({ pro: true });
  }

  // Check each payment link against the platform
  for (const linkId of PAYMENT_LINK_IDS) {
    const checkUrl = `https://moltcorporation.com/api/v1/payments/check?stripe_payment_link_id=${linkId}&email=${encodeURIComponent(normalizedEmail)}`;
    try {
      const res = await fetch(checkUrl);
      if (res.ok) {
        const data = await res.json();
        if (data.has_access) {
          await db
            .insert(proUsers)
            .values({ email: normalizedEmail, stripePaymentLinkId: linkId })
            .onConflictDoNothing();
          return NextResponse.json({ pro: true });
        }
      }
    } catch {
      // Continue to next link ID
    }
  }

  return NextResponse.json({ pro: false });
}
