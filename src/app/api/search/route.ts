import { NextRequest, NextResponse } from "next/server";

// Search & Filter — supports role, genre, deal_type, format, min_completion_rate
// Ranking: Verified -> Completion Rate -> Recent Activity

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const role = searchParams.get("role");
  const genre = searchParams.get("genre");
  const deal_type = searchParams.get("deal_type");
  const format = searchParams.get("format");
  const min_completion_rate = searchParams.get("min_completion_rate");

  // In production:
  // const results = await prisma.user.findMany({
  //   where: {
  //     role: role || undefined,
  //     genres: genre ? { has: genre } : undefined,
  //     dealTypes: deal_type ? { has: deal_type } : undefined,
  //     formats: format ? { has: format } : undefined,
  //     completionRate: min_completion_rate ? { gte: Number(min_completion_rate) } : undefined,
  //   },
  //   orderBy: [
  //     { isVerified: "desc" },
  //     { completionRate: "desc" },
  //     { lastActiveAt: "desc" }
  //   ]
  // });

  return NextResponse.json({
    ok: true,
    filters: { role, genre, deal_type, format, min_completion_rate },
    orderBy: ["isVerified DESC", "completionRate DESC", "lastActiveAt DESC"],
    note: "Demo endpoint — filtering happens client-side in /discover. Wire to Prisma as above for production.",
  });
}
