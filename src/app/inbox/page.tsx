"use client";
import { useEffect, useState } from "react";
import { mockUsers } from "@/lib/mockData";
import Link from "next/link";

type Match = {
  id: string;
  user: typeof mockUsers[0];
  deal: string;
  genre: string;
  message: string;
  status: "PENDING" | "OPENED" | "ACCEPTED" | "AUTO_CANCELLED";
  openedAt?: string;
  expiresAt?: string;
  vaultPicked?: string;
};

const initial: Match[] = [
  {
    id: "m1",
    user: mockUsers[0],
    deal: "50/50 Pact",
    genre: "Seinen • Cultivation",
    message: "Hey — your ‘Hollow Archive’ names are insane. I’ve got a 3-ch pilot scripted (Seinen cultivation). Want to pact? I can do weekly drops.",
    status: "PENDING",
  },
  {
    id: "m2",
    user: mockUsers[2],
    deal: "50/50 Pact",
    genre: "Shōjo • Otome",
    message: "Love your dialogue pacing. I’m a colorist (otome) looking for writer+line duo. Vault has before/after.",
    status: "OPENED",
    openedAt: new Date(Date.now() - 1000*60*22).toISOString(),
    expiresAt: new Date(Date.now() + 1000*60*38).toISOString(),
  },
  {
    id: "m3",
    user: mockUsers[1],
    deal: "Paid Gig",
    genre: "LitRPG • Isekai",
    message: "LitRPG writer here — need line artist for 10-ep Webtoon. Escrow funded ($600 milestone 1). Your inks fit perfectly.",
    status: "ACCEPTED",
  },
];

function Countdown({ expiresAt }: { expiresAt: string }) {
  const [left, setLeft] = useState(() => Math.max(0, Math.floor((new Date(expiresAt).getTime() - Date.now())/1000)));
  useEffect(() => {
    const id = setInterval(() => setLeft(Math.max(0, Math.floor((new Date(expiresAt).getTime() - Date.now())/1000))), 1000);
    return () => clearInterval(id);
  }, [expiresAt]);
  const m = Math.floor(left/60); const s = left%60;
  const pct = Math.max(0, Math.min(100, (left/3600)*100));
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-xs font-black tracking-widest text-[#FF3B30]">● TASTE PHASE</span>
        <span className="font-mono font-black text-sm bg-[#FF3B30] text-white px-2 py-1 rounded-full">{String(m).padStart(2,"0")}:{String(s).padStart(2,"0")}</span>
      </div>
      <div className="h-1.5 bg-black/10 rounded-full overflow-hidden mt-2">
        <div className="h-full bg-[#FF3B30] transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function InboxPage() {
  const [matches, setMatches] = useState<Match[]>(initial);
  const [selected, setSelected] = useState<string>("m2");
  const current = matches.find(m => m.id === selected) || matches[0];
  const [vaultPick, setVaultPick] = useState<string | null>(null);

  const open = (id: string) => {
    setMatches(ms => ms.map(m => m.id===id && m.status==="PENDING" ? { ...m, status:"OPENED" as const, openedAt: new Date().toISOString(), expiresAt: new Date(Date.now()+3600000).toISOString() } : m));
    setSelected(id);
  };

  const accept = () => {
    if (!vaultPick) return;
    setMatches(ms => ms.map(m => m.id===selected ? { ...m, status:"ACCEPTED" as const, vaultPicked: vaultPick } : m));
  };

  const decline = () => {
    setMatches(ms => ms.map(m => m.id===selected ? { ...m, status:"AUTO_CANCELLED" as const } : m));
  };

  useEffect(() => {
    // auto-cancel expired
    const id = setInterval(() => {
      setMatches(ms => ms.map(m => (m.status==="OPENED" && m.expiresAt && new Date(m.expiresAt).getTime() < Date.now()) ? { ...m, status:"AUTO_CANCELLED" as const } : m));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex items-baseline justify-between">
        <h1 className="text-3xl font-black tracking-tight">Pacts — Inbox</h1>
        <div className="text-xs font-bold tracking-widest bg-black text-white px-3 py-1.5 rounded-full">TASTE PHASE • 1-HOUR WINDOW</div>
      </div>
      <p className="text-sm text-zinc-600 mt-1">Timer starts only when you <b className="text-black">open</b>. Vault = 1-tap reply. No “seen” purgatory.</p>

      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        {/* List */}
        <div className="lg:col-span-1 flex flex-col gap-3">
          {matches.map(m => (
            <button key={m.id} onClick={()=> m.status==="PENDING" ? open(m.id) : setSelected(m.id)} className={`text-left bg-white rounded-2xl border p-4 flex gap-3 hover:border-black/15 transition ${selected===m.id ? "border-black shadow-[0_8px_24px_rgba(0,0,0,0.08)]" : "border-black/5"}`}>
              <img src={m.user.avatarUrl} alt="" className="w-10 h-10 rounded-full object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm">{m.user.name}</span>
                  {m.status==="PENDING" && <span className="text-[10px] font-black tracking-widest bg-amber-400 text-black px-1.5 py-0.5 rounded">PENDING • NOT OPENED</span>}
                  {m.status==="OPENED" && <span className="text-[10px] font-black tracking-widest bg-[#FF3B30] text-white px-1.5 py-0.5 rounded">TICKING</span>}
                  {m.status==="ACCEPTED" && <span className="text-[10px] font-black tracking-widest bg-emerald-500 text-white px-1.5 py-0.5 rounded">ACCEPTED</span>}
                  {m.status==="AUTO_CANCELLED" && <span className="text-[10px] font-black tracking-widest bg-zinc-200 text-zinc-600 px-1.5 py-0.5 rounded">AUTO-CANCELLED</span>}
                </div>
                <div className="text-xs text-zinc-500">{m.deal} • {m.genre}</div>
                <div className="text-xs text-zinc-600 line-clamp-2 mt-1">{m.message}</div>
                {m.status==="OPENED" && m.expiresAt && <div className="mt-2"><Countdown expiresAt={m.expiresAt} /></div>}
              </div>
            </button>
          ))}

          <div className="bg-[#FFF6EE] rounded-2xl border border-orange-200 p-4 text-xs leading-5 text-zinc-700">
            <b className="text-black">How it works:</b> Sender’s request sits as <b>PENDING</b> with no timer. When you tap to open → <code className="bg-black text-white px-1 py-0.5 rounded">openedAt = now()</code>, <code className="bg-black text-white px-1 py-0.5 rounded">expiresAt = now()+1h</code>. Server cron auto-cancels if no Vault sent. Sender gets graceful “next match queued.”
          </div>
        </div>

        {/* Detail */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[24px] border border-black/5 overflow-hidden">
            <div className="p-6 border-b border-black/5 flex items-start gap-4">
              <img src={current.user.avatarUrl} alt="" className="w-14 h-14 rounded-2xl object-cover" />
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-black text-lg">{current.user.name}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold">{current.user.completionRate}% Pact Rate</span>
                  {current.user.isVerified && <span className="text-xs px-2 py-1 rounded-full bg-black text-white font-bold">✓ Verified Human</span>}
                </div>
                <div className="text-sm text-zinc-600">{current.user.bio.slice(0,120)}…</div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-black text-white font-bold">{current.deal}</span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-zinc-100 border border-black/5">{current.genre}</span>
                </div>
              </div>
              <Link href={`/discover`} className="hidden md:inline-flex text-xs font-bold px-3 py-2 rounded-full border border-black/10">View Profile</Link>
            </div>

            <div className="p-6">
              <div className="bg-[#FFFCF8] border border-black/5 rounded-2xl p-4">
                <div className="text-xs font-bold tracking-widest text-zinc-500">PACT MESSAGE</div>
                <p className="mt-2 text-sm leading-6">{current.message}</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-zinc-500">
                  <span>Deal: <b className="text-black">{current.deal}</b></span>
                  <span>•</span>
                  <span>Genre: {current.genre}</span>
                </div>
              </div>

              {current.status==="PENDING" && (
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center gap-2 bg-amber-100 border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm font-bold">● Not yet opened — no timer running</div>
                  <p className="text-xs text-zinc-500 mt-2">Tap “Open Pact” to start the 60-minute Taste Phase. This mirrors the real WebSocket: <code className="bg-black text-white px-1 rounded">POST /api/match/open</code>.</p>
                  <button onClick={()=>open(current.id)} className="mt-4 w-full md:w-auto px-8 py-3 rounded-full bg-[#0F0F12] text-white font-black">Open Pact → Start 60:00</button>
                </div>
              )}

              {current.status==="OPENED" && (
                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    <h4 className="font-black">Quick-Send Vault — reply in 1 tap</h4>
                    <span className="text-xs text-zinc-500">{current.user.vault.length} clips ready</span>
                  </div>
                  {current.expiresAt && <div className="mt-3"><Countdown expiresAt={current.expiresAt} /></div>}
                  <div className="mt-4 grid md:grid-cols-2 gap-3">
                    {current.user.vault.map(v => (
                      <button key={v.id} onClick={()=>setVaultPick(v.id)} className={`text-left rounded-2xl overflow-hidden border-2 ${vaultPick===v.id ? "border-[#FF3B30]" : "border-black/5"} bg-white`}>
                        <img src={v.thumbnail} alt="" className="w-full h-28 object-cover" />
                        <div className="p-3">
                          <div className="font-bold text-sm leading-tight">{v.title}</div>
                          <div className="text-xs text-zinc-500">{v.duration} • {v.type} • One-tap send</div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <button onClick={decline} className="py-3 rounded-full border border-black/10 font-bold">Decline • Auto-queue next</button>
                    <button disabled={!vaultPick} onClick={accept} className={`py-3 rounded-full font-black ${vaultPick ? "bg-[#FF3B30] text-white" : "bg-zinc-200 text-zinc-400"}`}>
                      {vaultPick ? "Send Vault & Accept ✓" : "Select a Vault clip"}
                    </button>
                  </div>
                  <p className="mt-3 text-xs text-zinc-500 text-center">If you don’t reply in 60m → <b>Auto-Cancelled</b>. Sender is notified gracefully, no chase needed. Server cron: <code className="bg-black text-white px-1 rounded">status → AUTO_CANCELLED</code></p>
                </div>
              )}

              {current.status==="ACCEPTED" && (
                <div className="mt-6">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center">
                    <div className="w-12 h-12 rounded-full bg-emerald-500 text-white grid place-items-center text-xl mx-auto">✓</div>
                    <div className="font-black mt-2">Pact Accepted!</div>
                    <p className="text-sm text-zinc-600">Vault clip sent. Project created, milestones generated, PDF Pact queued for both parties.</p>
                    <div className="mt-3 flex flex-wrap justify-center gap-2">
                      <Link href="/projects" className="px-5 py-2.5 rounded-full bg-black text-white font-bold text-sm">View Project & Milestones →</Link>
                      <button className="px-5 py-2.5 rounded-full border border-black/10 bg-white font-bold text-sm">Download Pact PDF</button>
                    </div>
                  </div>
                </div>
              )}

              {current.status==="AUTO_CANCELLED" && (
                <div className="mt-6 bg-zinc-50 border border-black/5 rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-zinc-200 grid place-items-center mx-auto">⏰</div>
                  <div className="font-black mt-2">Auto-Cancelled — 1 hour expired</div>
                  <p className="text-sm text-zinc-600">No Vault was sent in time. The system notified the sender gracefully and queued their next Pact partner. No ghost debt, no awkward follow-up.</p>
                  <button onClick={()=>setMatches(ms=>ms.map(m=>m.id===current.id ? {...m, status:"PENDING"} : m))} className="mt-3 px-5 py-2.5 rounded-full bg-black text-white font-bold text-sm">Re-open (demo)</button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 bg-white rounded-2xl border border-black/5 p-4 flex items-center gap-3 text-xs">
            <span className="w-8 h-8 rounded-full bg-[#0F0F12] text-white grid place-items-center">◇</span>
            <span><b>Portfolio Viewer:</b> Tap any creator’s portfolio to see <b>Vertical Webtoon scroll</b> or <b>RTL Manga flip</b> — natively. Not a Drive link.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
