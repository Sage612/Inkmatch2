"use client";
import { useState, useEffect } from "react";

export default function ContractPreview() {
  const [deal, setDeal] = useState<"50/50" | "PAID">("50/50");
  const [generating, setGenerating] = useState(false);
  const [done, setDone] = useState(false);
  const [pactId, setPactId] = useState("pact_demo_1746");
  const [dateStr, setDateStr] = useState("8/18/2026");

  useEffect(() => {
    setPactId(`pact_${Date.now()}`);
    setDateStr(new Date().toLocaleDateString());
  }, []);

  const generate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setDone(true);
    }, 1400);
  };

  return (
    <div className="bg-white rounded-[28px] border border-black/[0.07] overflow-hidden">
      <div className="grid lg:grid-cols-2">
        <div className="p-6 md:p-8">
          <div className="inline-flex items-center gap-2 text-xs font-black tracking-[0.12em] bg-[#0F0F12] text-white px-3 py-1.5 rounded-full">
            ⚖️ SMART PACT PDF • LEGAL SHIELD
          </div>
          <h3 className="mt-4 text-2xl font-black tracking-tight leading-none">
            A 50/50 Pact that
            <br />
            <span className="text-[#FF3B30]">ships with a contract.</span>
          </h3>
          <p className="mt-3 text-sm leading-6 text-zinc-600">
            When a Pact is accepted, PanelPact auto-generates a downloadable PDF
            agreement — no lawyer, no DMs arguing about IP at 2am.
          </p>

          <div className="mt-5 flex gap-2">
            <button
              onClick={() => setDeal("50/50")}
              className={`flex-1 py-2.5 rounded-full font-bold text-sm border ${deal === "50/50" ? "bg-[#FF3B30] text-white border-[#FF3B30]" : "bg-white border-black/10"}`}>
              50/50 Sweat Equity
            </button>
            <button
              onClick={() => setDeal("PAID")}
              className={`flex-1 py-2.5 rounded-full font-bold text-sm border ${deal === "PAID" ? "bg-black text-white border-black" : "bg-white border-black/10"}`}>
              Paid Gig Escrow
            </button>
          </div>

          <ul className="mt-5 space-y-2.5 text-sm">
            {[
              "Copyright: Writer owns Story IP, Artist owns Visual Assets, Commercial rights shared per equity.",
              "Revenue: Webtoon / Patreon / Kickstarter — split automatically per Pact % (50/50 default).",
              "Ghost Shield (14-Day Clause): If a pactmate is inactive 14 consecutive days mid-project, active partner reclaims full rights & we re-list the role.",
              "Milestones: Script → Name → Line → Color → Letter → Publish — tracked & timestamped.",
            ].map((t, i) => (
              <li key={i} className="flex gap-2">
                <span className="shrink-0 w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200 grid place-items-center text-xs">
                  ✓
                </span>
                <span className="leading-5 text-zinc-700">{t}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex gap-3">
            <button
              onClick={generate}
              disabled={generating}
              className="flex-1 py-3 rounded-full bg-[#0F0F12] text-white font-bold text-sm hover:bg-black disabled:opacity-50">
              {generating
                ? "Forging PDF…"
                : done
                  ? "✓ Pact PDF Ready — Download"
                  : "Generate Demo Pact PDF →"}
            </button>
          </div>
          <p className="mt-2 text-xs text-zinc-500">
            Basic 50/50 PDF is free. Premium templates (merch / multi-party
            studio) $5–$15. Stored on S3 with secure link to both parties.
          </p>
        </div>

        {/* PDF mock */}
        <div className="bg-[#F8F7F5] p-6 md:p-8 border-t lg:border-t-0 lg:border-l border-black/5">
          <div className="bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-black/5 p-6 md:p-7 font-mono text-xs leading-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-black text-white grid place-items-center font-black text-xs">
                  PP
                </div>
                <span className="font-black tracking-tighter text-sm">
                  PANELPACT
                </span>
              </div>
              <span className="text-[10px] tracking-widest font-bold bg-black text-white px-2 py-1 rounded">
                PACT AGREEMENT • v2.1
              </span>
            </div>
            <div className="mt-4 h-px bg-black/10" />
            <h4 className="mt-4 font-black text-sm tracking-tight">
              SWEAT EQUITY PACT AGREEMENT — 50/50
            </h4>
            <p className="mt-2 text-zinc-600">
              This Pact is entered on{" "}
              <b className="text-black">August 18, 2026</b> by and between:
            </p>
            <p className="mt-2">
              <b>Party A:</b> Aiko Tanaka (@aiko.ink) — ID u1 — Role:
              LINE_ARTIST
              <br />
              <b>Party B:</b> Marcus Chen (@marcuswrites) — ID u2 — Role: WRITER
            </p>
            <p>
              <b>Project:</b> “Spirit Bloom — Shōjo Cultivation Webtoon” •
              Format: Vertical Webtoon • Genres: Shōjo, Cultivation
            </p>
            <p className="mt-3">
              <b>1. Equity & Revenue.</b> Net revenue from Webtoon Canvas,
              Patreon, Kickstarter split{" "}
              <b>
                {deal === "50/50"
                  ? "50% / 50%"
                  : "60% Writer / 40% Artist (Paid Gig Escrow 7% platform fee)"}
              </b>
              . Monthly payout or per-milestone release.
            </p>
            <p>
              <b>2. IP Ownership.</b> Writer retains Story IP, Artist retains
              Visual Assets; Commercial exploitation rights are jointly held per
              equity. No AI training on assets without mutual written consent.
            </p>
            <p>
              <b>3. 14-Day Ghost Protection.</b> If either party is inactive on
              PanelPact for <b>14 consecutive days</b> during an active Project,
              the active party may reclaim full rights and re-list the vacant
              role via PanelPact; ghosted equity forfeits.
            </p>
            <p>
              <b>4. Milestones.</b> Script Approved → Name → Line Art → Color →
              Lettering → Publish. Each milestone timestamped; disputes resolved
              via Completion Rate + peer reviews.
            </p>
            <p>
              <b>5. Verification.</b> Both parties attest portfolio work is
              human-created; Verified Badge holders receive priority dispute
              review.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="border-t border-black pt-2">
                <div className="font-bold">Aiko Tanaka</div>
                <div className="text-zinc-500">Party A — {dateStr}</div>
              </div>
              <div className="border-t border-black pt-2">
                <div className="font-bold">Marcus Chen</div>
                <div className="text-zinc-500">Party B — {dateStr}</div>
              </div>
            </div>
            <div className="mt-4 inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1.5 rounded-full font-bold text-xs">
              ✓ Auto-generated & stored — S3: s3://panelpact/pacts/{pactId}.pdf
            </div>
            {done && (
              <div className="mt-3 bg-[#FF3B30] text-white text-center py-2.5 rounded-full font-bold text-sm">
                Download Pact PDF (demo)
              </div>
            )}
          </div>
          <p className="mt-3 text-xs text-zinc-500 text-center">
            This is a template. Not legal advice — but it’s the shield forums
            never gave you.
          </p>
        </div>
      </div>
    </div>
  );
}
