"use client";
import { Role, Genre, DealType, Format, roleLabels, genreLabels, dealLabels, formatLabels } from "@/lib/types";

const roles: Role[] = ["WRITER","STORYBOARDER","LINE_ARTIST","COLORIST","LETTERER","EDITOR"];
const genres: Genre[] = ["ISEKAI","LITRPG","CULTIVATION","SHONEN","SHOJO","SEINEN","SLICE_OF_LIFE","OTOME","HORROR","FANTASY"];
const deals: DealType[] = ["SWEAT_EQUITY_50_50","SKILL_SWAP","PORTFOLIO_BUILDING","PAID_GIG"];
const formats: Format[] = ["VERTICAL_WEBTOON","PAGE_MANGA"];

export default function FilterBar({ filters, setFilters, sortBy, setSortBy }: any) {
  return (
    <div className="bg-white rounded-[20px] border border-black/[0.07] p-4 md:p-5 flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-black tracking-tight">Discover Pact Partners</h3>
        <select value={sortBy} onChange={e=>setSortBy(e.target.value)} className="text-sm font-medium border border-black/10 rounded-full px-3 py-2 bg-white">
          <option value="verified">Sort: Verified → Pact Rate → Active</option>
          <option value="completion">Sort: Highest Pact Rate</option>
          <option value="recent">Sort: Most Recent</option>
        </select>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <div>
          <label className="text-xs font-bold tracking-widest text-zinc-500">ROLE NEEDED</label>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {roles.map(r => (
              <button key={r} onClick={()=>setFilters((f:any)=>({...f, role: f.role===r ? undefined : r}))} className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition ${filters.role===r ? "bg-[#0F0F12] text-white border-black" : "bg-white border-black/10 hover:border-black/20"}`}>
                {roleLabels[r]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold tracking-widest text-zinc-500">GENRE</label>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {genres.map(g => (
              <button key={g} onClick={()=>setFilters((f:any)=>({...f, genre: f.genre===g ? undefined : g}))} className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${filters.genre===g ? "bg-[#FF3B30] text-white border-[#FF3B30]" : "bg-white border-black/10"}`}>
                {genreLabels[g]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold tracking-widest text-zinc-500">PACT TYPE</label>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {deals.map(d => (
              <button key={d} onClick={()=>setFilters((f:any)=>({...f, dealType: f.dealType===d ? undefined : d}))} className={`text-xs font-bold px-3 py-1.5 rounded-full border ${filters.dealType===d ? "bg-black text-white" : "bg-white border-black/10"}`}>
                {dealLabels[d].short}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold tracking-widest text-zinc-500">FORMAT & TRUST</label>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {formats.map(f => (
              <button key={f} onClick={()=>setFilters((ff:any)=>({...ff, format: ff.format===f ? undefined : f}))} className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${filters.format===f ? "bg-zinc-900 text-white" : "bg-white border-black/10"}`}>
                {formatLabels[f]}
              </button>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs font-semibold text-zinc-500">Min Pact Rate</span>
            <input type="range" min={70} max={100} value={filters.minRate ?? 0} onChange={e=>setFilters((f:any)=>({...f, minRate: Number(e.target.value)}))} className="flex-1 accent-[#FF3B30]" />
            <span className="text-xs font-black w-10">{filters.minRate ? `${filters.minRate}%` : "Any"}</span>
            {filters.minRate > 0 && <button onClick={()=>setFilters((f:any)=>({...f, minRate:0}))} className="text-xs underline">clear</button>}
          </div>
          <label className="mt-2 flex items-center gap-2 text-xs font-semibold">
            <input type="checkbox" checked={!!filters.verifiedOnly} onChange={e=>setFilters((f:any)=>({...f, verifiedOnly: e.target.checked}))} className="rounded" />
            Verified Humans only
          </label>
        </div>
      </div>

      {(filters.role || filters.genre || filters.dealType || filters.format || filters.minRate || filters.verifiedOnly) && (
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-zinc-500">Active:</span>
          <div className="flex flex-wrap gap-1.5">
            {filters.role && <span className="px-2 py-1 rounded-full bg-black text-white">{roleLabels[filters.role as Role]}</span>}
            {filters.genre && <span className="px-2 py-1 rounded-full bg-[#FF3B30] text-white">{genreLabels[filters.genre as Genre]}</span>}
            {filters.dealType && <span className="px-2 py-1 rounded-full bg-zinc-800 text-white">{dealLabels[filters.dealType as DealType].short}</span>}
          </div>
          <button onClick={()=>setFilters({})} className="ml-auto underline font-semibold">Reset all</button>
        </div>
      )}
    </div>
  );
}
