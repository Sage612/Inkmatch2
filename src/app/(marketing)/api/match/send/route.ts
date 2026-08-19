import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { senderId, recipientId, dealType, message, genreTag } = body;
  if (!senderId || !recipientId) {
    return NextResponse.json({ error: "senderId and recipientId required" }, { status: 400 });
  }

  // In production: prisma.matchRequest.create + rate-limit 3/day for Free tier
  const match = {
    id: `match_${Date.now()}`,
    senderId,
    recipientId,
    dealType: dealType || "SWEAT_EQUITY_50_50",
    genreTag,
    message,
    status: "PENDING",
    openedAt: null,
    timerExpiresAt: null,
    createdAt: new Date().toISOString(),
  };

  return NextResponse.json({
    ok: true,
    match,
    note: "PENDING — no timer until recipient opens. Free tier: 3/day limit enforced via middleware.",
  });
}
