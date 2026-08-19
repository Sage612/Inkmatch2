import { NextRequest, NextResponse } from "next/server";

// Taste Phase Timer Trigger — docs for blueprint
// When Recipient clicks to open a pending Match Request thread,
// trigger: openedAt = NOW(), timerExpiresAt = NOW() + 1 Hour
// Server-side job checks expiry -> AUTO_CANCELLED

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { matchId } = body;
  if (!matchId) {
    return NextResponse.json({ error: "matchId required" }, { status: 400 });
  }
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 60 * 60 * 1000);

  // In production: Prisma update + WebSocket emit
  // await prisma.matchRequest.update({
  //   where: { id: matchId },
  //   data: { status: "OPENED", openedAt: now, timerExpiresAt: expiresAt }
  // });
  // io.to(recipientId).emit("match:opened", { matchId, expiresAt });

  return NextResponse.json({
    ok: true,
    matchId,
    status: "OPENED",
    openedAt: now.toISOString(),
    timerExpiresAt: expiresAt.toISOString(),
    message: "Taste Phase started — 60 minutes. If recipient doesn't submit Vault clip, cron will set status to AUTO_CANCELLED.",
  });
}
