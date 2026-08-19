"use client";
import { useState } from "react";
import { mockProjects } from "@/lib/mockData";

export default function ProjectsPage() {
  const [projects, setProjects] = useState(mockProjects);
  const [activeId, setActiveId] = useState(projects[0].id);
  const active = projects.find(p => p.id===activeId)!;

  const toggleMilestone = (idx: number) => {
    setProjects(ps => ps.map(p => p.id!==activeId ? p : {
      ...p,
      milestones: p.milestones.map((m,i) => i===idx ? { ...m, status: m.status==="COMPLETED" ? "PENDING" as const : "COMPLETED" as const } : m)
    }));
  };

  const ghostDaysLeft = 14 - 2; // demo: 2 days inactive

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-black tracking-tight">Projects & Pact Shield</h1>
      <p className="text-sm text-zinc-600 mt-1">Milestone Progress Tracker + Auto PDF Pact + <b className="text-black">14-Day Ghost Protection</b>. If they vanish 14 days, you reclaim full rights — no court, just the Pact.</p>

      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        <div className="flex flex-col gap-3">
          {projects.map(p => (
            <button key={p.id} onClick={()=>setActiveId(p.id)} className={`text-left rounded-2xl border overflow-hidden ${activeId===p.id ? "border-black shadow-[0_8px_24px_rgba(0,0,0,0.08)]" : "border-black/5"} bg-white`}>
              <img src={p.coverUrl} alt="" className="w-full h-28 object-cover" />
              <div className="p-4">
                <div className="font-bold leading-tight">{p.title}</div>
                <div className="text-xs text-zinc-500 mt-1">{p.format==="VERTICAL_WEBTOON" ? "↕ Webtoon" : "◫ Manga"} • {p.genreTags.join(" • ")} • {p.dealType==="SWEAT_EQUITY_50_50" ? "50/50 Pact" : "Paid"}</div>
                <div className="mt-2 h-1.5 bg-black/5 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: `${(p.milestones.filter(m=>m.status==="COMPLETED").length / p.milestones.length)*100}%` }} />
                </div>
              </div>
            </button>
          ))}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs leading-5">
            <b>Ghost Shield example:</b> If your pactmate is inactive 14 consecutive days mid-project, PanelPact lets you reclaim full rights and auto re-lists the vacant role — per the PDF you both signed. No “hey are you alive?” for weeks.
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white rounded-[24px] border border-black/5 overflow-hidden">
            <div className="h-48 relative">
              <img src={active.coverUrl} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <div className="inline-flex items-center gap-2 text-xs font-black tracking-widest bg-white text-black px-2.5 py-1 rounded-full">{active.dealType==="SWEAT_EQUITY_50_50" ? "50/50 PACT" : "PAID GIG"} • {active.status}</div>
                <h2 className="mt-2 text-xl font-black leading-tight">{active.title}</h2>
                <p className="text-sm opacity-80">{active.description}</p>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-black">Milestone Progress Tracker</h3>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-black text-white">{active.milestones.filter(m=>m.status==="COMPLETED").length}/{active.milestones.length} done</span>
              </div>
              <div className="mt-4 relative">
                <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-black/5" />
                <div className="flex flex-col gap-3">
                  {active.milestones.map((m,i) => (
                    <div key={m.title} className="flex gap-3 items-center">
                      <button onClick={()=>toggleMilestone(i)} className={`w-8 h-8 rounded-full grid place-items-center border-2 shrink-0 ${m.status==="COMPLETED" ? "bg-emerald-500 border-emerald-500 text-white" : m.status==="IN_PROGRESS" ? "bg-amber-400 border-amber-400 text-black animate-pulse" : "bg-white border-black/10"}`}>
                        {m.status==="COMPLETED" ? "✓" : m.status==="IN_PROGRESS" ? "●" : "○"}
                      </button>
                      <div className={`flex-1 rounded-2xl p-4 border ${m.status==="COMPLETED" ? "bg-emerald-50 border-emerald-200" : m.status==="IN_PROGRESS" ? "bg-amber-50 border-amber-200" : "bg-zinc-50 border-black/5"}`}>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm">{i+1}. {m.title}</span>
                          <span className={`text-xs font-black px-2 py-1 rounded-full ${m.status==="COMPLETED" ? "bg-emerald-500 text-white" : m.status==="IN_PROGRESS" ? "bg-amber-400 text-black" : "bg-zinc-200 text-zinc-600"}`}>{m.status.replace("_"," ")}</span>
                        </div>
                        <div className="text-xs text-zinc-500 mt-1">Breaks projects into phases: Script Approved → Storyboard → Line Art → Lettering → Publish</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-3 text-xs text-zinc-500">Click circles to toggle (demo). Real app: backend updates via <code className="bg-black text-white px-1 rounded">PATCH /api/projects/:id/milestone</code> and notifies pactmate.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-[24px] border border-black/5 p-6">
              <h4 className="font-black">Ghost Protection — 14-Day Clause</h4>
              <div className="mt-3 bg-zinc-900 text-white rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">Partner last active: 2d ago</span>
                  <span className="text-xs bg-white text-black px-2 py-1 rounded-full font-black">{ghostDaysLeft} days to reclaim</span>
                </div>
                <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-[#FF3B30]" style={{ width: `${(2/14)*100}%` }} />
                </div>
                <p className="mt-3 text-xs opacity-70">Built into the PDF you both signed: 14 consecutive days of platform inactivity → active partner legally reclaims full rights, we help re-list the vacant role. No ghost debt.</p>
              </div>
              <div className="mt-3 flex gap-2">
                <button className="flex-1 py-2.5 rounded-full bg-black text-white font-bold text-sm">View Full Pact PDF</button>
                <button className="px-4 py-2.5 rounded-full border border-black/10 font-bold text-sm">Trigger Reclaim (demo)</button>
              </div>
            </div>

            <div className="bg-white rounded-[24px] border border-black/5 p-6">
              <h4 className="font-black">Agreement PDF — Auto-Generated</h4>
              <p className="text-sm text-zinc-600 mt-1">Contains: names + IDs, title/scope, 50/50 split, IP terms, 14-day clause. Saved to S3, secure link to both.</p>
              <div className="mt-4 bg-[#FFFCF8] border border-black/5 rounded-2xl p-4 font-mono text-xs">
                <div className="font-bold">panelpact/pacts/{active.id}.pdf</div>
                <div className="text-zinc-500">Generated on Pact Accept • Webhook: POST /api/contract/generate</div>
                <div className="mt-2 bg-black text-white inline-flex px-2 py-1 rounded text-xs">50% Writer / 50% Artist • Net revenue</div>
              </div>
              <button className="mt-4 w-full py-3 rounded-full bg-[#FF3B30] text-white font-black">Download Pact PDF (demo)</button>
              <p className="mt-2 text-xs text-zinc-500 text-center">Basic 50/50 free. Premium multi-party $5–$15.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
