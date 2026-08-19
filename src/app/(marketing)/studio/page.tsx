"use client";
import { useState } from "react";
import { mockUsers, mockSquads } from "@/lib/mockData";
import { Role, roleLabels } from "@/lib/types";

export default function StudioPage() {
  const [seeking, setSeeking] = useState<Role>("COLORIST");
  const [squadName, setSquadName] = useState("My Squad");
  const [selected, setSelected] = useState<string[]>(["u1","u2"]);
  const toggle = (id: string) => setSelected(s => s.includes(id) ? s.filter(x=>x!==id) : [...s, id]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-black tracking-tight">Studio Squads — Pact as a Team</h1>
      <p className="text-sm text-zinc-600 mt-1">Two or three creators (e.g., writer + line artist) submit a <b className="text-black">joint Pact Request</b> to fill a missing slot. One equity split, one history.</p>

      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[24px] border border-black/5 p-6">
            <h3 className="font-black">Live Squad Requests</h3>
            <div className="mt-4 grid gap-4">
              {mockSquads.map(s => (
                <div key={s.id} className="rounded-2xl border border-black/5 p-5 flex flex-col md:flex-row md:items-center gap-4 bg-[#FFFCF8]">
                  <div className="flex -space-x-2">
                    {s.members.map(m => <img key={m.id} src={m.avatarUrl} alt="" className="w-10 h-10 rounded-full border-2 border-white" />)}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold">{s.name}</div>
                    <div className="text-xs text-zinc-600">{s.members.map(m=>roleLabels[m.role]).join(" + ")} • Seeking <b className="text-[#FF3B30]">{roleLabels[s.seeking]}</b> • {s.genre} • {s.format==="PAGE_MANGA" ? "Page Manga" : "Webtoon"} • {s.dealType==="SWEAT_EQUITY_50_50" ? "50/50 split 3 ways" : s.dealType}</div>
                  </div>
                  <button className="px-5 py-2.5 rounded-full bg-[#0F0F12] text-white font-bold text-sm shrink-0">Pact with Squad →</button>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-[#0F0F12] text-white rounded-2xl p-5">
              <h4 className="font-black">How squad ranking works</h4>
              <p className="text-sm opacity-80 mt-1">Squads are pre-vetted teams — they’ve already shipped together. So they rank above solo creators with similar Pact Rates. Think: “band looking for bassist” vs “solo looking for band.” Less risk, faster ship.</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[24px] border border-black/5 p-6">
          <h3 className="font-black">Forge Your Squad</h3>
          <p className="text-xs text-zinc-500">Select 2–3 members, set the missing role. We’ll generate a joint Pact Request.</p>

          <label className="mt-4 block text-xs font-bold tracking-widest text-zinc-500">SQUAD NAME</label>
          <input value={squadName} onChange={e=>setSquadName(e.target.value)} className="mt-1 w-full px-4 py-2.5 rounded-full border border-black/10 text-sm" />

          <label className="mt-4 block text-xs font-bold tracking-widest text-zinc-500">SELECT MEMBERS (2–3)</label>
          <div className="mt-2 grid gap-2">
            {mockUsers.slice(0,4).map(u => (
              <label key={u.id} className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer ${selected.includes(u.id) ? "border-black bg-black text-white" : "border-black/10 bg-white"}`}>
                <input type="checkbox" checked={selected.includes(u.id)} onChange={()=>toggle(u.id)} className="rounded" />
                <img src={u.avatarUrl} alt="" className="w-8 h-8 rounded-full" />
                <div className="flex-1">
                  <div className="font-bold text-sm leading-none">{u.name}</div>
                  <div className={`text-xs ${selected.includes(u.id) ? "text-white/70" : "text-zinc-500"}`}>{roleLabels[u.role]} • {u.completionRate}%</div>
                </div>
              </label>
            ))}
          </div>

          <label className="mt-4 block text-xs font-bold tracking-widest text-zinc-500">SEEKING</label>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {(["WRITER","STORYBOARDER","LINE_ARTIST","COLORIST","LETTERER","EDITOR"] as Role[]).map(r => (
              <button key={r} onClick={()=>setSeeking(r)} className={`px-3 py-1.5 rounded-full text-xs font-bold border ${seeking===r ? "bg-[#FF3B30] text-white border-[#FF3B30]" : "bg-white border-black/10"}`}>{roleLabels[r]}</button>
            ))}
          </div>

          <div className="mt-5 bg-[#FFF6EE] border border-orange-200 rounded-2xl p-4">
            <div className="text-sm font-bold">Preview: {squadName}</div>
            <div className="text-xs text-zinc-600">{selected.map(id=>mockUsers.find(u=>u.id===id)?.name).join(" + ") || "Select members"} → seeking <b className="text-[#FF3B30]">{roleLabels[seeking]}</b></div>
            <div className="text-xs text-zinc-500 mt-1">Deal: 50/50 split {selected.length + 1} ways • Equity auto-calculated • Joint history = priority rank</div>
          </div>

          <button className="mt-4 w-full py-3 rounded-full bg-[#FF3B30] text-white font-black">Create Squad Pact Request →</button>
          <p className="mt-2 text-xs text-zinc-500 text-center">Squad Pacts use the same Taste Phase — 1 hour to reply via Vault.</p>
        </div>
      </div>
    </div>
  );
}
