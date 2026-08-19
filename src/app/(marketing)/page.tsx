import Link from "next/link";
import TastePhaseDemo from "@/components/TastePhaseDemo";
import ContractPreview from "@/components/ContractPreview";
import { mockUsers } from "@/lib/mockData";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFF6EE] via-[#FFFCF8] to-[#F0F0FF]" />
        <div className="absolute inset-0 paper-texture opacity-40" />
        <div className="relative max-w-6xl mx-auto px-6 pt-12 md:pt-16 pb-12">
          <div className="inline-flex items-center gap-2 bg-white border border-black/10 rounded-full px-3 py-1.5 text-xs font-bold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#FF3B30] animate-pulse" />
            LIVE: 1,247 Verified Humans • 4.2% ghost rate vs 38% on Discord
            <span className="hidden sm:inline text-zinc-400">• No AI spam</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 mt-6 items-start">
            <div>
              <h1 className="font-black tracking-[-0.04em] leading-[0.9] text-[42px] md:text-[56px]">
                Don’t just<br/>
                <span className="inline-block bg-[#0F0F12] text-white px-3 py-1 rounded-xl rotate-[-0.5deg]">match.</span><br/>
                <span className="text-[#FF3B30]">Make a Pact.</span>
              </h1>
              <p className="mt-5 text-lg leading-7 text-zinc-600 max-w-xl">
                <b className="text-black">PanelPact</b> is the sweat-equity forge for manga, manhwa & webtoon creators. 50/50 revenue pacts, 1-hour Taste Phase, verified human skill, and a <b>14-day ghost clause</b> that actually protects you. The forums ghosted you. We pact.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/discover" className="px-7 py-3.5 rounded-full bg-[#FF3B30] text-white font-black hover:bg-[#E0352B] transition shadow-[0_10px_30px_rgba(255,59,48,0.3)]">
                  Forge Your Pact — Free →
                </Link>
                <Link href="#renamed" className="px-7 py-3.5 rounded-full bg-white border border-black/10 font-bold hover:bg-black hover:text-white transition">
                  Why PanelPact? ↓
                </Link>
              </div>

              <div className="mt-7 grid grid-cols-3 gap-4 max-w-lg">
                {[
                  { k: "50/50 Pacts", v: "Sweat Equity", sub: "No cash needed" },
                  { k: "1-Hour Taste", v: "Exploding Window", sub: "No ghosting limbo" },
                  { k: "14-Day Shield", v: "Ghost Protection", sub: "Reclaim your IP" },
                ].map(c => (
                  <div key={c.k} className="bg-white rounded-2xl border border-black/5 p-4">
                    <div className="text-xs font-black tracking-widest text-[#FF3B30]">{c.k}</div>
                    <div className="font-black leading-none mt-1">{c.v}</div>
                    <div className="text-xs text-zinc-500">{c.sub}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-3 text-xs text-zinc-500">
                <span className="flex -space-x-2">
                  {mockUsers.slice(0,4).map(u => <img key={u.id} src={u.avatarUrl} alt="" className="w-7 h-7 rounded-full border-2 border-white" />)}
                </span>
                <span><b className="text-black">2,400+ pacts forged</b> • $180k escrow protected • Jump Rookie & Canvas alumni</span>
              </div>
            </div>

            {/* Hero card stack */}
            <div className="relative lg:pl-6">
              <div className="bg-white rounded-[28px] border border-black/[0.07] p-3 shadow-[0_20px_60px_rgba(0,0,0,0.08)] rotate-[-0.6deg]">
                <div className="rounded-[20px] overflow-hidden bg-zinc-100 relative">
                  <img src="https://picsum.photos/seed/heroManga/900/700" alt="" className="w-full h-[360px] object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 right-4 flex justify-between">
                    <span className="text-xs font-black px-3 py-1.5 rounded-full bg-white">◫ PAGE MANGA • SHŌNEN</span>
                    <span className="text-xs font-black px-3 py-1.5 rounded-full bg-emerald-500 text-white">98% PACT RATE ✓ VERIFIED</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="font-black text-xl leading-none">“Blade of the Hollow” — seeking Writer</div>
                    <div className="text-sm opacity-80">Aiko Tanaka • Osaka • Online now • Vault: 2 clips</div>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div className="text-sm"><span className="font-black">50/50 Pact</span> <span className="text-zinc-500">• 27 shipped • ★4.9</span></div>
                  <button className="px-5 py-2.5 rounded-full bg-[#0F0F12] text-white font-bold text-sm">Send Pact →</button>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-2 md:left-0 bg-[#0F0F12] text-white rounded-2xl p-4 flex items-center gap-3 shadow-xl rotate-[1deg] max-w-[320px]">
                <div className="w-12 h-12 rounded-xl bg-[#FF3B30] grid place-items-center text-xl">⚡</div>
                <div>
                  <div className="font-bold text-sm leading-none">Taste Phase: 42:11 left</div>
                  <div className="text-xs opacity-70">They opened — Vault reply or auto-cancel</div>
                </div>
              </div>

              <div className="absolute -top-4 -right-2 bg-white border border-black/10 rounded-2xl px-4 py-3 shadow-lg rotate-[0.8deg] hidden md:flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-emerald-100 grid place-items-center">✓</span>
                <div className="text-xs leading-tight">
                  <div className="font-bold">Sofia accepted in 8m</div>
                  <div className="text-zinc-500">via Vault speedpaint</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REBRAND EXPLAINER */}
      <section id="renamed" className="max-w-6xl mx-auto px-6 py-10 md:py-14 w-full">
        <div className="bg-white rounded-[28px] border border-black/[0.07] p-6 md:p-8 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="inline-flex items-center gap-2 text-xs font-black tracking-widest bg-[#FF3B30] text-white px-3 py-1.5 rounded-full">FROM INKMATCH → PANELPACT</div>
            <h2 className="mt-4 text-[28px] font-black tracking-tight leading-none">A better name for<br/>what we actually do.</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600"><b>InkMatch</b> sounded like another swipe feed. You’re not looking for a “match” to ghost you in DMs. You’re looking for a <b className="text-black">Pact</b> — a binding creative contract.</p>
          </div>
          <div className="lg:col-span-2 grid md:grid-cols-3 gap-6">
            {[
              { old: "Match", now: "PACT", why: "A Pact is 50/50 equity + legal PDF + 14-day protection. A match is just a chat." },
              { old: "Ink (generic)", now: "PANEL", why: "Panel = the atomic unit of manga / manhwa / webtoons. Format-native viewers, RTL & vertical." },
              { old: "Hope & DMs", now: "FORGE", why: "We forge teams that ship. Completion Rate, Verified Humans, Milestone tracker — not vibes." },
            ].map(c => (
              <div key={c.now} className="rounded-2xl bg-[#FFFCF8] border border-black/5 p-5">
                <div className="text-xs font-bold tracking-widest text-zinc-400 line-through">{c.old}</div>
                <div className="font-black text-lg text-[#FF3B30]">{c.now}</div>
                <p className="mt-2 text-xs leading-5 text-zinc-600">{c.why}</p>
              </div>
            ))}
            <div className="md:col-span-3 bg-[#0F0F12] text-white rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="font-black">Tagline: “Don’t just match. Make a Pact.”</div>
                <div className="text-sm opacity-70">Also: “Forge Stories. Split Equity. Honor the Pact.” — Short, verb-first, sweat-equity core.</div>
              </div>
              <Link href="/discover" className="shrink-0 px-6 py-3 rounded-full bg-white text-black font-bold text-center">See Pact Partners →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM / SOLUTION */}
      <section className="max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-6">
        <div className="bg-[#FFE9E7] rounded-[24px] p-6 md:p-7 border border-[#FF3B30]/15">
          <div className="text-xs font-black tracking-widest text-[#FF3B30]">THE PROBLEM WE KILL</div>
          <h3 className="mt-2 text-xl font-black">Forums, Discord & Fiverr are broken for collabs.</h3>
          <ul className="mt-4 space-y-2.5 text-sm leading-5 text-zinc-700">
            <li className="flex gap-2"><span>💨</span> High ghosting — weeks of “seen,” no reply.</li>
            <li className="flex gap-2"><span>🤖</span> AI art spam, no trust that portfolio is human.</li>
            <li className="flex gap-2"><span>💸</span> Upwork/Fiverr only work if you have $2k+. No sweat equity.</li>
            <li className="flex gap-2"><span>⚖️</span> No legal safety — who owns what when someone vanishes?</li>
          </ul>
        </div>
        <div className="bg-[#0F0F12] text-white rounded-[24px] p-6 md:p-7 border border-white/10">
          <div className="text-xs font-black tracking-widest text-[#FF6B35]">THE PANELPACT SOLUTION</div>
          <h3 className="mt-2 text-xl font-black">A high-momentum pacting forge.</h3>
          <ul className="mt-4 space-y-2.5 text-sm leading-5 text-white/80">
            <li className="flex gap-2"><span>⚡</span> 1-Hour Taste Phase — clock only runs when they open.</li>
            <li className="flex gap-2"><span>🛡️</span> Completion Rate + Verified Human badge + peer reviews.</li>
            <li className="flex gap-2"><span>🤝</span> 50/50 Pacts, Skill Swaps, Portfolio Forges & Escrow Paid Gigs.</li>
            <li className="flex gap-2"><span>📄</span> Auto PDF Pact + Milestone Tracker + 14-Day Ghost Reclaim.</li>
          </ul>
        </div>
      </section>

      {/* Taste Phase */}
      <section className="max-w-6xl mx-auto px-6 py-10 w-full">
        <TastePhaseDemo />
      </section>

      {/* Trust + Format */}
      <section className="max-w-6xl mx-auto px-6 w-full grid lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-[24px] border border-black/5 p-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 grid place-items-center">🏆</div>
          <h4 className="mt-3 font-black">Completion Rate — The Killer Feature</h4>
          <p className="mt-2 text-sm leading-6 text-zinc-600">Prominent % on every profile: how many accepted pacts they actually shipped. Filter Discover by min rate. Premium unlocks filtering by it.</p>
          <div className="mt-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-black text-sm">98%</span>
            <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-black text-sm">87%</span>
            <span className="px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 font-black text-sm">62% • risky</span>
          </div>
        </div>
        <div className="bg-white rounded-[24px] border border-black/5 p-6">
          <div className="w-10 h-10 rounded-xl bg-[#FFF1E8] border border-orange-200 grid place-items-center">👁️</div>
          <h4 className="mt-3 font-black">Verified Human Creator Badge</h4>
          <p className="mt-2 text-sm leading-6 text-zinc-600">$10 one-time ID + portfolio review. Combats AI impersonators. Ranked first in Discover. Earns trust before you type.</p>
          <div className="mt-4 inline-flex items-center gap-2 bg-[#0F0F12] text-white px-3 py-2 rounded-full text-xs font-bold">✓ VERIFIED HUMAN • Priority Rank • $10 once</div>
        </div>
        <div className="bg-white rounded-[24px] border border-black/5 p-6">
          <div className="w-10 h-10 rounded-xl bg-violet-50 border border-violet-200 grid place-items-center">📖</div>
          <h4 className="mt-3 font-black">Format-Native Viewers</h4>
          <p className="mt-2 text-sm leading-6 text-zinc-600">Vertical scroll for webtoons/manhwa. Right-to-left flip for manga. No more “here’s a Drive link.” Portfolios that read like they’ll publish.</p>
          <div className="mt-4 flex gap-2 text-xs font-bold">
            <span className="px-3 py-1.5 rounded-full bg-black text-white">↕ Webtoon</span>
            <span className="px-3 py-1.5 rounded-full border border-black/10">◫ Manga RTL</span>
          </div>
        </div>
      </section>

      {/* Roles & Studios */}
      <section className="max-w-6xl mx-auto px-6 py-6 w-full">
        <div className="bg-white rounded-[28px] border border-black/5 p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-black">Granular Roles & Studio Squads</h3>
              <p className="text-sm text-zinc-600">Not “artist.” Which one? And bring your squad.</p>
            </div>
            <Link href="/studio" className="px-5 py-2.5 rounded-full bg-[#FF3B30] text-white font-bold text-sm">Forge a Squad →</Link>
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-[#FFFCF8] border border-black/5 p-5">
              <div className="text-xs font-black tracking-widest text-zinc-500">ROLES</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Writer","Name (Storyboarder)","Line Artist","Colorist","Letterer","Editor"].map(r=>(
                  <span key={r} className="px-3 py-2 rounded-full bg-white border border-black/10 text-sm font-semibold">{r}</span>
                ))}
              </div>
              <div className="mt-4 text-xs font-black tracking-widest text-zinc-500">GENRES</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {["Isekai","LitRPG","Cultivation","Shōnen","Shōjo","Seinen","Slice of Life","Otome"].map(g=>(
                  <span key={g} className="px-2.5 py-1 rounded-full bg-black text-white text-xs font-bold">{g}</span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-[#0F0F12] text-white p-5">
              <div className="text-xs font-black tracking-widest text-[#FF6B35]">STUDIO SQUAD REQUEST</div>
              <p className="mt-2 text-sm text-white/80">A writer + line artist can submit a <b className="text-white">joint Pact</b> to find a colorist. Squad keeps its equity split and history.</p>
              <div className="mt-4 bg-white text-black rounded-2xl p-4 flex items-center gap-3">
                <img src={mockUsers[3].avatarUrl} alt="" className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                  <div className="font-bold text-sm">Studio Kōen — Writer + Line</div>
                  <div className="text-xs text-zinc-600">Seeking: Colorist • 50/50 split 3 ways • Shōnen / Isekai • Page Manga</div>
                </div>
                <span className="px-3 py-1.5 rounded-full bg-[#FF3B30] text-white text-xs font-black">SEEKING</span>
              </div>
              <div className="mt-3 text-xs text-white/60">Squad Pacts rank higher — they’re pre-vetted teams, not solo maybes.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contract */}
      <section className="max-w-6xl mx-auto px-6 py-3 w-full">
        <ContractPreview />
      </section>

      {/* Pricing */}
      <section className="max-w-6xl mx-auto px-6 py-10 w-full">
        <h3 className="text-2xl font-black tracking-tight">Monetization — aligned, not extractive.</h3>
        <p className="text-sm text-zinc-600">Free to pact. Paid to accelerate.</p>
        <div className="mt-6 grid md:grid-cols-4 gap-4">
          {[
            { name: "Free", price: "$0", per: "forever", feats: ["3 Pact Requests / day","Basic 50/50 PDF","Browse & Vault","Milestone tracker"] , cta: "Start Free" },
            { name: "Pact Pro", price: "$8", per: "/mo", feats: ["Unlimited Pacts","Filter by Pact Rate","Read receipts","Priority Discover"], highlight: true, cta: "Go Pro →" },
            { name: "Escrow", price: "7%", per: "of paid gigs", feats: ["Funds held till milestone","Dispute via Pact Rate","7% fee only on release","Stripe Connect"], cta: "Paid Gig Shield" },
            { name: "Verified", price: "$10", per: "once", feats: ["Human check","Badge + rank boost","AI-spam immunity","Faster disputes"], cta: "Get Verified ✓" },
          ].map(t=>(
            <div key={t.name} className={`rounded-[24px] p-6 border flex flex-col ${t.highlight ? "bg-[#0F0F12] text-white border-black shadow-xl scale-[1.02]" : "bg-white border-black/5"}`}>
              <div className="text-xs font-black tracking-widest opacity-60">{t.name.toUpperCase()}</div>
              <div className="mt-2 flex items-baseline gap-1"><span className="text-3xl font-black">{t.price}</span><span className="text-sm opacity-60">{t.per}</span></div>
              <ul className="mt-4 space-y-2 text-sm flex-1">
                {t.feats.map(f=> <li key={f} className="flex gap-2"><span className={t.highlight ? "text-[#FF6B35]" : "text-emerald-600"}>✓</span> {f}</li>)}
              </ul>
              <button className={`mt-6 w-full py-2.5 rounded-full font-bold text-sm ${t.highlight ? "bg-[#FF3B30] text-white" : "bg-black text-white"}`}>{t.cta}</button>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-zinc-500">Premium Pact Templates (merch licensing, 3+ party studio splits) $5–$15. Everything else is built to make the 50/50 Pact the default — not the upsell.</p>
      </section>

      {/* Architecture note */}
      <section className="max-w-6xl mx-auto px-6 pb-12 w-full">
        <div className="rounded-[24px] bg-white border border-black/5 p-6 md:p-7">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h4 className="font-black">Built for devs — the blueprint lives in the repo.</h4>
              <p className="text-sm text-zinc-600 mt-1 max-w-2xl">Next.js 16 + Tailwind 4 + Framer Motion, Prisma/PostgreSQL, WebSockets for Taste Phase, pdfkit for Pact PDFs, S3/Cloudinary for Vault & portfolios. Prisma schema, API routes and ranking logic are in <code className="bg-black text-white px-1.5 py-0.5 rounded">prisma/schema.prisma</code> and <code className="bg-black text-white px-1.5 py-0.5 rounded">src/app/api</code>.</p>
            </div>
            <Link href="/discover" className="hidden md:inline-flex shrink-0 px-6 py-3 rounded-full bg-[#FF3B30] text-white font-bold">Enter Discover →</Link>
          </div>
          <div className="mt-5 grid md:grid-cols-3 gap-3 text-xs font-mono">
            <div className="bg-[#0F0F12] text-white rounded-xl p-4"><b>Search rank:</b><br/>Verified → Pact Rate → Recent Activity</div>
            <div className="bg-[#FFFCF8] border border-black/5 rounded-xl p-4"><b>Taste Phase:</b><br/>openedAt = now(); expiresAt = now+1h; cron → AUTO_CANCELLED</div>
            <div className="bg-[#FFFCF8] border border-black/5 rounded-xl p-4"><b>Pact PDF:</b><br/>POST /api/contract/generate → S3 → secure link to both</div>
          </div>
        </div>
      </section>
    </div>
  );
}
