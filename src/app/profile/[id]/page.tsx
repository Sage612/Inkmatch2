"use client";
import { useParams } from "next/navigation";
import { mockUsers } from "@/lib/mockData";
import { roleLabels, genreLabels, dealLabels } from "@/lib/types";
import { useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const params = useParams();
  const id = params.id as string;
  const user = mockUsers.find(u => u.id === id) || mockUsers[0];
  const [viewer, setViewer] = useState<"grid"|"webtoon"|"manga">("grid");
  const [showVault, setShowVault] = useState(false);
  const [pactSent, setPactSent] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <Link href="/discover" className="text-sm font-semibold text-zinc-500 hover:text-black">← Back to Discover</Link>

      <div className="mt-4 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-[24px] border border-black/5 overflow-hidden">
            <div className="h-24 bg-gradient-to-br from-[#FFF1E8] to-[#FFE9E7]" />
            <div className="px-6 pb-6">
              <img src={user.avatarUrl} alt="" className="w-20 h-20 rounded-2xl border-4 border-white -mt-10 object-cover" />
              <div className="mt-3 flex items-center gap-2">
                <span className={`text-xs font-black px-2.5 py-1 rounded-full border ${user.completionRate>=95 ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-amber-50 border-amber-200 text-amber-700"}`}>{user.completionRate}% PACT RATE</span>
                {user.isVerified && <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-black text-white">✓ VERIFIED HUMAN</span>}
              </div>
              <h1 className="mt-3 text-2xl font-black leading-none">{user.name}</h1>
              <div className="text-sm text-zinc-500">@{user.handle} • {user.location}</div>
              <div className="mt-2 inline-flex items-center gap-2 text-sm">
                <span className="px-3 py-1.5 rounded-full bg-[#0F0F12] text-white font-bold">{roleLabels[user.role]}</span>
                <span className="text-zinc-500">★ {user.ratingScore} ({user.reviewCount}) • {user.completedProjects} shipped</span>
              </div>
              <p className="mt-4 text-sm leading-6 text-zinc-600">{user.bio}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {user.genres.map(g=> <span key={g} className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#FFFCF8] border border-black/10">{genreLabels[g]}</span>)}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <button onClick={()=>setPactSent(true)} className="py-3 rounded-full bg-[#FF3B30] text-white font-black text-sm">{pactSent ? "✓ Pact Sent!" : "Send Pact →"}</button>
                <button onClick={()=>setShowVault(!showVault)} className="py-3 rounded-full border border-black/10 font-bold text-sm">View Vault ({user.vault.length})</button>
              </div>
              {pactSent && <div className="mt-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl p-3 text-xs"><b>Pact Request queued!</b> No timer until they open. You’re next in their queue if they auto-cancel someone else.</div>}

              <div className="mt-6 border-t border-black/5 pt-4">
                <div className="text-xs font-black tracking-widest text-zinc-500">DEAL TYPES</div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {user.dealTypes.map(d=> <span key={d} className={`text-xs font-bold px-2.5 py-1 rounded-full border ${d==="SWEAT_EQUITY_50_50" ? "bg-[#FF3B30] text-white border-[#FF3B30]" : "bg-white border-black/10"}`}>{dealLabels[d].short}</span>)}
                </div>
              </div>

              <div className="mt-4 text-xs leading-5 text-zinc-500">
                <b className="text-black">Peer reviews:</b> Communication, Speed, Reliability, Feedback Receptivity — left at project close. No review-bombing; only shipped pacts count.
              </div>
            </div>
          </div>

          {showVault && (
            <div className="mt-4 bg-[#0F0F12] text-white rounded-[24px] p-5">
              <h3 className="font-black">Quick-Send Vault</h3>
              <p className="text-xs opacity-70">Pre-uploaded clips for 1-tap Taste Phase replies.</p>
              <div className="mt-3 grid gap-3">
                {user.vault.map(v=> (
                  <div key={v.id} className="rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                    <img src={v.thumbnail} alt="" className="w-full h-28 object-cover" />
                    <div className="p-3">
                      <div className="font-bold text-sm">{v.title}</div>
                      <div className="text-xs opacity-70">{v.duration} • {v.type}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-[24px] border border-black/5 p-4 flex items-center justify-between">
            <h2 className="font-black">Portfolio — Format-Native Viewer</h2>
            <div className="flex gap-1.5">
              {[
                { id:"grid", label:"Grid" },
                { id:"webtoon", label:"↕ Webtoon" },
                { id:"manga", label:"◫ Manga RTL" },
              ].map(b=> (
                <button key={b.id} onClick={()=>setViewer(b.id as any)} className={`px-3 py-1.5 rounded-full text-xs font-bold border ${viewer===b.id ? "bg-black text-white border-black" : "bg-white border-black/10"}`}>{b.label}</button>
              ))}
            </div>
          </div>

          {viewer==="grid" && (
            <div className="mt-4 grid md:grid-cols-2 gap-4">
              {user.portfolio.map(p=> (
                <div key={p.id} className="bg-white rounded-[20px] border border-black/5 overflow-hidden">
                  <img src={p.thumbnail} alt={p.title} className="w-full h-[260px] object-cover" />
                  <div className="p-4">
                    <div className="font-bold text-sm">{p.title}</div>
                    <div className="text-xs text-zinc-500">{p.format==="VERTICAL_WEBTOON" ? "Vertical Webtoon" : "Page Manga"} • {p.type}</div>
                    <button onClick={()=>setViewer(p.format==="VERTICAL_WEBTOON" ? "webtoon" : "manga")} className="mt-2 w-full py-2 rounded-full bg-black text-white font-bold text-xs">Open in {p.format==="VERTICAL_WEBTOON" ? "Webtoon Viewer ↕" : "Manga Viewer ◫"}</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {viewer==="webtoon" && (
            <div className="mt-4 bg-white rounded-[24px] border border-black/5 overflow-hidden">
              <div className="bg-[#0F0F12] text-white px-4 py-2 flex items-center justify-between text-xs">
                <span className="font-bold">↕ Vertical Webtoon Reader — scroll native</span>
                <button onClick={()=>setViewer("grid")} className="px-3 py-1 rounded-full bg-white text-black font-bold">Back to Grid</button>
              </div>
              <div className="max-h-[700px] overflow-y-auto">
                <img src={user.portfolio.find(p=>p.format==="VERTICAL_WEBTOON")?.url || user.portfolio[0].url} alt="" className="w-full" />
                <div className="p-6 text-center text-xs text-zinc-500">Webtoon episodes read vertically — infinite scroll, no page flip. This is how it’ll look on Canvas.</div>
              </div>
            </div>
          )}

          {viewer==="manga" && (
            <div className="mt-4 bg-white rounded-[24px] border border-black/5 overflow-hidden">
              <div className="bg-[#0F0F12] text-white px-4 py-2 flex items-center justify-between text-xs">
                <span className="font-bold">◫ Page Manga — Right-to-Left flip (traditional)</span>
                <button onClick={()=>setViewer("grid")} className="px-3 py-1 rounded-full bg-white text-black font-bold">Back to Grid</button>
              </div>
              <MangaFlip pages={user.portfolio.find(p=>p.pages)?.pages || [user.portfolio[0].url]} />
            </div>
          )}

          <div className="mt-4 bg-white rounded-[24px] border border-black/5 p-6">
            <h3 className="font-black">Why Pact with {user.name.split(" ")[0]}?</h3>
            <div className="mt-3 grid md:grid-cols-3 gap-3 text-sm">
              <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-center">
                <div className="text-2xl font-black text-emerald-700">{user.completionRate}%</div>
                <div className="text-xs font-bold">Pact Rate</div>
                <div className="text-xs text-zinc-600">Finished {user.completedProjects} pacts. Ghosts rarely.</div>
              </div>
              <div className="rounded-2xl bg-[#FFF6EE] border border-orange-200 p-4 text-center">
                <div className="text-2xl font-black">★ {user.ratingScore}</div>
                <div className="text-xs font-bold">{user.reviewCount} reviews</div>
                <div className="text-xs text-zinc-600">Communication & reliability praised.</div>
              </div>
              <div className="rounded-2xl bg-zinc-50 border border-black/5 p-4 text-center">
                <div className="text-2xl font-black">{user.isVerified ? "✓ Verified" : "— Unverified"}</div>
                <div className="text-xs font-bold">{user.isVerified ? "Human-checked" : "No badge yet"}</div>
                <div className="text-xs text-zinc-600">{user.isVerified ? "Portfolio manually reviewed." : "Ask for Vault proof."}</div>
              </div>
            </div>
            <button onClick={()=>setPactSent(true)} className="mt-4 w-full py-3 rounded-full bg-[#0F0F12] text-white font-black">Send Pact to {user.name.split(" ")[0]} → Start Taste Phase</button>
            <p className="mt-2 text-xs text-zinc-500 text-center">50/50 Pact default • You can propose Skill Swap / Portfolio / Paid in the message.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MangaFlip({ pages }: { pages: string[] }) {
  const [idx, setIdx] = useState(0);
  const total = pages.length;
  // RTL: start from rightmost (last index)
  const displayIdx = total - 1 - idx;
  return (
    <div className="p-6 flex flex-col items-center">
      <div className="relative w-full max-w-[420px] aspect-[3/4] bg-zinc-100 rounded-xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-black/5">
        <img src={pages[displayIdx]} alt="" className="w-full h-full object-cover" />
        <div className="absolute bottom-2 right-2 bg-black text-white text-xs font-mono px-2 py-1 rounded-full">Page {displayIdx + 1} / {total} • RTL</div>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <button disabled={idx===total-1} onClick={()=>setIdx(i=>Math.min(total-1, i+1))} className="px-4 py-2 rounded-full border border-black/10 font-bold text-sm disabled:opacity-40">← Prev (RTL)</button>
        <span className="text-xs font-mono">{idx+1} / {total}</span>
        <button disabled={idx===0} onClick={()=>setIdx(i=>Math.max(0,i-1))} className="px-4 py-2 rounded-full bg-black text-white font-bold text-sm disabled:opacity-40">Next →</button>
      </div>
      <p className="mt-2 text-xs text-zinc-500">Traditional manga reads right-to-left — viewer flips that way.</p>
    </div>
  );
}
