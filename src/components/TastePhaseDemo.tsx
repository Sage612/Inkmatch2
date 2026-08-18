"use client";
import { useEffect, useState } from "react";
import { mockUsers } from "@/lib/mockData";

export default function TastePhaseDemo() {
  const [phase, setPhase] = useState<"idle"|"pending"|"opened"|"accepted"|"cancelled">("idle");
  const [secondsLeft, setSecondsLeft] = useState(3600);
  const [vaultPicked, setVaultPicked] = useState<string | null>(null);

  useEffect(() => {
    if (phase !== "opened") return;
    const id = setInterval(() => {
      setSecondsLeft(s => {
        if (s <= 1) {
          setPhase("cancelled");
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [phase]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="bg-[#0F0F12] text-white rounded-[28px] overflow-hidden border border-white/10">
      <div className="p-6 md:p-8 grid md:grid-cols-2 gap-8">
        <div>
          <div className="inline-flex items-center gap-2 text-[11px] font-black tracking-[0.14em] bg-[#FF3B30] px-3 py-1.5 rounded-full">THE TASTE PHASE • EXPLODING PACT WINDOW</div>
          <h3 className="mt-4 text-[28px] font-black leading-none tracking-tight">Ghosting dies here.<br/><span className="text-[#FF3B30]">1 hour to taste.</span> No endless “seen.”</h3>
          <p className="mt-3 text-sm leading-6 text-white/70">No timer while they’re offline. The <b className="text-white">60-minute clock starts only when they open your Pact Request</b>. They reply in one tap from their Vault — or it auto-cancels and queues your next match. No awkward follow-ups.</p>

          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            {[
              { n: "1", t: "You send Pact", d: "Pick genre, deal, message" },
              { n: "2", t: "They open", d: "Timer starts now — 60:00" },
              { n: "3", t: "Vault tap", d: "Speedpaint / script / workflow" },
            ].map(s => (
              <div key={s.n} className="bg-white/[0.06] border border-white/10 rounded-2xl p-4">
                <div className="w-7 h-7 rounded-full bg-[#FF3B30] grid place-items-center text-sm font-black mx-auto">{s.n}</div>
                <div className="mt-2 text-xs font-bold">{s.t}</div>
                <div className="text-[11px] text-white/60">{s.d}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <button onClick={() => { setPhase("pending"); setSecondsLeft(3600); setVaultPicked(null); }} className="px-5 py-2.5 rounded-full bg-white text-black font-bold text-sm">Simulate: Send Pact Request</button>
            <button onClick={() => setPhase("idle")} className="px-5 py-2.5 rounded-full border border-white/20 font-semibold text-sm">Reset</button>
          </div>
          <p className="mt-3 text-xs text-white/50">Real system uses WebSockets + server-side cron. If no Vault tap in 60m → status = <code className="bg-white/10 px-1.5 py-0.5 rounded">AUTO_CANCELLED</code> and sender is gracefully notified.</p>
        </div>

        {/* Phone mock */}
        <div className="bg-[#1A1A1E] rounded-[28px] border border-white/10 p-4 md:p-5 shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={mockUsers[0].avatarUrl} alt="" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <div className="text-sm font-bold flex items-center gap-1">{mockUsers[0].name} <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500 text-white">● ONLINE</span></div>
                <div className="text-xs text-white/60">Line Artist • Seinen • 98% Pact Rate</div>
              </div>
            </div>
            {phase === "opened" && <div className="text-right"><div className="text-xs tracking-widest font-black text-[#FF6B35]">TICKING</div><div className="font-mono font-black text-lg">{String(minutes).padStart(2,"0")}:{String(seconds).padStart(2,"0")}</div></div>}
          </div>

          <div className="mt-5 bg-black/40 rounded-2xl p-4 border border-white/5 min-h-[260px] flex flex-col">
            {phase === "idle" && (
              <div className="m-auto text-center max-w-[280px]">
                <div className="w-12 h-12 rounded-2xl bg-white/10 grid place-items-center mx-auto text-xl">✉️</div>
                <p className="mt-3 text-sm font-semibold">No pending Pact</p>
                <p className="text-xs text-white/60">Send a request to see the Taste Phase tick.</p>
              </div>
            )}

            {phase === "pending" && (
              <div className="flex flex-col gap-4">
                <div className="bg-white text-black rounded-2xl rounded-bl-sm p-3.5 text-sm leading-5">
                  <b>New Pact Request</b> — from <b>you.creator</b><br/>
                  <span className="text-zinc-600">“Love your Hollow inks. I’ve got a 3-ch cultivation pilot scripted — 50/50 Pact? Here’s my cold open Vault.”</span>
                  <div className="mt-2 inline-flex items-center gap-1 text-xs font-bold bg-black text-white px-2.5 py-1 rounded-full">50/50 Pact • Shōnen • Page Manga</div>
                </div>
                <div className="text-xs text-white/50 text-center">Recipient hasn’t opened — <b className="text-white">no timer yet</b>. Sleeping? No stress.</div>
                <button onClick={() => setPhase("opened")} className="w-full py-3 rounded-full bg-[#FF3B30] font-bold">Simulate: Recipient OPENS → Start 60:00</button>
              </div>
            )}

            {phase === "opened" && (
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black tracking-widest text-[#FF6B35]">● TASTE PHASE ACTIVE</span>
                  <span className="text-xs font-mono bg-[#FF3B30] px-2 py-1 rounded-full font-black">{String(minutes).padStart(2,"0")}:{String(seconds).padStart(2,"0")} LEFT</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#FF3B30]" style={{ width: `${(secondsLeft/3600)*100}%` }} />
                </div>

                <div className="bg-white text-black rounded-2xl p-3.5 text-sm">
                  <div className="font-bold">Quick-Send Vault — 1-tap reply</div>
                  <p className="text-xs text-zinc-600">Pre-uploaded speedpaints so you reply in seconds, not hours.</p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {mockUsers[0].vault.map(v => (
                      <button key={v.id} onClick={() => setVaultPicked(v.id)} className={`rounded-xl overflow-hidden border-2 text-left ${vaultPicked===v.id ? "border-[#FF3B30]" : "border-black/10"}`}>
                        <img src={v.thumbnail} alt="" className="w-full h-20 object-cover" />
                        <div className="p-2">
                          <div className="text-xs font-bold leading-tight line-clamp-1">{v.title}</div>
                          <div className="text-[11px] text-zinc-500">{v.duration}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <button disabled={!vaultPicked} onClick={() => setPhase("accepted")} className={`mt-3 w-full py-2.5 rounded-full font-bold text-sm ${vaultPicked ? "bg-[#0F0F12] text-white" : "bg-zinc-200 text-zinc-400"}`}>
                    {vaultPicked ? "Send Vault & Accept Pact ✓" : "Pick a Vault clip to reply"}
                  </button>
                  <button onClick={() => setPhase("cancelled")} className="mt-2 w-full py-2 rounded-full border border-black/10 font-semibold text-sm">Decline (frictionless)</button>
                </div>

                <div className="text-[11px] text-white/50 text-center">If no tap in 60m → <b className="text-white">Auto-Cancelled</b> → sender auto-queued to next creator. No ghosting debt.</div>
              </div>
            )}

            {phase === "accepted" && (
              <div className="m-auto text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500 grid place-items-center text-2xl mx-auto">✓</div>
                <p className="mt-3 font-black">Pact Accepted!</p>
                <p className="text-xs text-white/70 max-w-[260px] mx-auto">Vault sent. Contract generator fired. Project + milestones created. Both parties notified.</p>
                <div className="mt-3 inline-flex items-center gap-2 text-xs font-mono bg-white text-black px-3 py-1.5 rounded-full">status: ACCEPTED • PDF queued</div>
              </div>
            )}

            {phase === "cancelled" && (
              <div className="m-auto text-center">
                <div className="w-16 h-16 rounded-full bg-zinc-700 grid place-items-center text-2xl mx-auto">⏰</div>
                <p className="mt-3 font-black">Auto-Cancelled</p>
                <p className="text-xs text-white/70 max-w-[260px] mx-auto">1 hour expired. Sender notified gracefully: “Aiko didn’t respond in time — here’s your next match.” No awkward chase.</p>
                <button onClick={() => {setPhase("pending"); setSecondsLeft(3600);}} className="mt-3 px-4 py-2 rounded-full bg-white text-black font-bold text-sm">Retry →</button>
              </div>
            )}
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-white/[0.06] rounded-xl py-2"><div className="font-black">2,400+</div><div className="text-white/60">Pacts forged</div></div>
            <div className="bg-white/[0.06] rounded-xl py-2"><div className="font-black">23m</div><div className="text-white/60">Avg reply</div></div>
            <div className="bg-white/[0.06] rounded-xl py-2"><div className="font-black">4.2%</div><div className="text-white/60">Ghost rate</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
