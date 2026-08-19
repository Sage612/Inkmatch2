"use client";
import { useMemo, useState } from "react";
import { mockUsers } from "@/lib/mockData";
import CreatorCard from "@/components/CreatorCard";
import FilterBar from "@/components/FilterBar";
import { User } from "@/lib/types";

export default function DiscoverPage() {
  const [filters, setFilters] = useState<any>({});
  const [sortBy, setSortBy] = useState("verified");
  const [query, setQuery] = useState("");
  const [pactSent, setPactSent] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let res = [...mockUsers];
    if (query) {
      const q = query.toLowerCase();
      res = res.filter(u => u.name.toLowerCase().includes(q) || u.handle.toLowerCase().includes(q) || u.bio.toLowerCase().includes(q));
    }
    if (filters.role) res = res.filter(u => u.role === filters.role || u.secondaryRoles.includes(filters.role));
    if (filters.genre) res = res.filter(u => u.genres.includes(filters.genre));
    if (filters.dealType) res = res.filter(u => u.dealTypes.includes(filters.dealType));
    if (filters.format) res = res.filter(u => u.formats.includes(filters.format));
    if (filters.minRate) res = res.filter(u => u.completionRate >= filters.minRate);
    if (filters.verifiedOnly) res = res.filter(u => u.isVerified);

    if (sortBy === "verified") {
      res.sort((a,b) => {
        if (a.isVerified !== b.isVerified) return a.isVerified ? -1 : 1;
        if (a.completionRate !== b.completionRate) return b.completionRate - a.completionRate;
        return new Date(b.lastActiveAt).getTime() - new Date(a.lastActiveAt).getTime();
      });
    } else if (sortBy === "completion") {
      res.sort((a,b) => b.completionRate - a.completionRate);
    } else if (sortBy === "recent") {
      res.sort((a,b) => new Date(b.lastActiveAt).getTime() - new Date(a.lastActiveAt).getTime());
    }
    return res;
  }, [filters, sortBy, query]);

  const sendPact = (u: User) => {
    setPactSent(u.id);
    setTimeout(() => setPactSent(null), 2500);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Discover Pact Partners</h1>
          <p className="text-sm text-zinc-600 mt-1">Ranked: <b className="text-black">Verified Humans first → Pact Rate → Recent Activity</b>. No AI spam. No ghost feeds.</p>
        </div>
        <div className="flex items-center gap-2">
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search names, handles, bios…" className="w-full md:w-[320px] px-4 py-2.5 rounded-full border border-black/10 bg-white text-sm focus:outline-none focus:border-black/20" />
          <span className="hidden md:inline text-xs text-zinc-500">{filtered.length} creators</span>
        </div>
      </div>

      <div className="mt-6">
        <FilterBar filters={filters} setFilters={setFilters} sortBy={sortBy} setSortBy={setSortBy} />
      </div>

      {pactSent && (
        <div className="mt-4 bg-emerald-500 text-white rounded-2xl px-4 py-3 flex items-center justify-between">
          <span className="text-sm font-bold">✓ Pact Request sent — Taste Phase pending. They haven’t opened yet, so no timer. Vault-ready?</span>
          <button onClick={()=>setPactSent(null)} className="text-white/80 hover:text-white">×</button>
        </div>
      )}

      <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(u => (
          <CreatorCard key={u.id} user={u} onRequest={sendPact} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-12 text-center bg-white border border-black/5 rounded-[24px] p-12">
          <div className="w-12 h-12 rounded-2xl bg-zinc-100 grid place-items-center mx-auto">🔍</div>
          <p className="mt-3 font-bold">No pact partners match that filter.</p>
          <p className="text-sm text-zinc-500">Try broadening genre or lowering min Pact Rate.</p>
          <button onClick={()=>setFilters({})} className="mt-4 px-6 py-2.5 rounded-full bg-black text-white font-bold text-sm">Reset filters</button>
        </div>
      )}

      <div className="mt-8 bg-[#0F0F12] text-white rounded-[20px] p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="font-black">Want to be discovered faster?</div>
          <div className="text-sm opacity-70">Add 2 Vault clips and get Verified — 3.2× more Pacts accepted.</div>
        </div>
        <div className="flex gap-2">
          <button className="px-5 py-2.5 rounded-full bg-white text-black font-bold text-sm">Upload to Vault</button>
          <button className="px-5 py-2.5 rounded-full bg-[#FF3B30] text-white font-bold text-sm">Get Verified — $10</button>
        </div>
      </div>
    </div>
  );
}
