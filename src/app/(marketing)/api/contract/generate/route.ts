import { NextRequest, NextResponse } from "next/server";

// Demo PDF generation — in production uses pdfkit / puppeteer + S3
// When a match is accepted under SWEAT_EQUITY_50_50, generate:
// - Full names & IDs
// - Project title/scope
// - 50/50 split terms
// - 14-day inactivity IP reclamation clause
// Save to S3 and return secure link

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { projectTitle, partyA, partyB, dealType } = body;

  // Simulate generation delay
  await new Promise(r => setTimeout(r, 300));

  const pdfUrl = `https://panelpact.s3.amazonaws.com/pacts/pact_${Date.now()}.pdf`;

  const agreement = {
    title: projectTitle || "Untitled Pact",
    parties: [partyA || "Party A", partyB || "Party B"],
    dealType: dealType || "SWEAT_EQUITY_50_50",
    terms: {
      equity: "50% / 50% net revenue (Webtoon Canvas / Patreon / Kickstarter)",
      copyright: "Writer owns Story IP, Artist owns Visual Assets, Commercial rights shared per equity.",
      ghostClause: "14 consecutive days of platform inactivity during active Project → active partner reclaims full rights & may re-list vacant role.",
      milestones: ["Script Approved", "Storyboard", "Line Art", "Lettering", "Publish"],
    },
    generatedAt: new Date().toISOString(),
    pdfUrl,
  };

  return NextResponse.json({
    ok: true,
    agreement,
    pdfUrl,
    message: "In production, this would stream a PDF via pdfkit/puppeteer and upload to S3. Basic 50/50 free; premium templates $5–$15.",
  });
}
