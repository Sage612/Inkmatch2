"use client";
import { User, roleLabels, genreLabels, dealLabels } from "@/lib/types";
import { completionColor, timeAgo } from "@/lib/utils";
import Link from "next/link";

export default function CreatorCard({ user, onRequest }: { user: User; onRequest?: (u: User) => void }) {
  return (
    <div className="group bg-white rounded-[24px] border border-black/[0.07] overflow-hidden hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] hover:border-black/10 transition-all flex flex-col">
      {/* Cover */}
      <div className="relative h-[170px] bg-zinc-100 overflow-hidden">
        <img src={user.portfolio[0]?.thumbnail || "https://picsum.photos/seed/fallback/600/400"} alt="" className="w-full h-full object-cover group-hover:scale-[1.02] transition duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`text-xs font-black px-2.5 py-1 rounded-full border backdrop-blur ${completionColor(user.completionRate)}`}>
            {user.completionRate}% PACT RATE
          </span>
          {user.isVerified && (
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#0F0F12] text-white flex items-center gap-1">
              ✓ VERIFIED HUMAN
            </span>
          )}
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div className="flex items-center gap-2">
            <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full border-2 border-white object-cover" />
            <div className="text-white leading-tight">
              <div className="font-bold text-sm flex items-center gap-1">{user.name} {user.isVerified && <span className="w-4 h-4 rounded-full bg-white text-[#0F0F12] grid place-items-center text-[10px]">✓</span>}</div>
              <div className="text-xs opacity-80">@{user.handle} • {timeAgo(user.lastActiveAt)}</div>
            </div>
          </div>
          <span className="text-xs font-bold px-2 py-1 rounded-full bg-white text-black">{roleLabels[user.role]}</span>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-4 flex-1">
        <p className="text-[13.5px] leading-5 text-zinc-600 line-clamp-3">{user.bio}</p>

        <div className="flex flex-wrap gap-1.5">
          {user.genres.slice(0, 3).map(g => (
            <span key={g} className="text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-full bg-[#FFFCF8] border border-black/10">{genreLabels[g]}</span>
          ))}
          {user.genres.length > 3 && <span className="text-[11px] px-2 py-1 text-zinc-500">+{user.genres.length - 3}</span>}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {user.dealTypes.map(d => (
            <span key={d} className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${d === "SWEAT_EQUITY_50_50" ? "bg-[#FF3B30] text-white border-[#FF3B30]" : "bg-white border-black/10 text-zinc-700"}`}>
              {dealLabels[d].short}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 text-xs text-zinc-500 border-t border-black/5 pt-4 mt-auto">
          <span className="flex items-center gap-1">★ {user.ratingScore.toFixed(1)} ({user.reviewCount})</span>
          <span>• {user.completedProjects} shipped</span>
          <span className="ml-auto flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> {user.formats.map(f => f === "VERTICAL_WEBTOON" ? "Webtoon" : "Manga").join(" • ")}</span>
        </div>

        {/* Portfolio strip */}
        <div className="grid grid-cols-3 gap-2">
          {user.portfolio.slice(0, 3).map(p => (
            <div key={p.id} className="aspect-[3/4] rounded-xl overflow-hidden bg-zinc-100 relative">
              <img src={p.thumbnail} alt={p.title} className="w-full h-full object-cover" />
              {p.type === "video" && <span className="absolute inset-0 grid place-items-center"><span className="w-7 h-7 rounded-full bg-white/90 grid place-items-center text-xs">▶</span></span>}
              <span className="absolute bottom-1 left-1 text-[9px] font-bold px-1.5 py-0.5 rounded bg-black/70 text-white">{p.format === "VERTICAL_WEBTOON" ? "↕ WEBTOON" : "◫ MANGA"}</span>
            </div>
          ))}
        </div>

        {/* Vault preview */}
        {user.vault.length > 0 && (
          <div className="flex gap-2 overflow-x-auto scrollbar-none">
            {user.vault.map(v => (
              <div key={v.id} className="shrink-0 flex items-center gap-2 bg-zinc-50 border border-black/5 rounded-full pl-1 pr-3 py-1">
                <img src={v.thumbnail} alt="" className="w-8 h-8 rounded-full object-cover" />
                <div className="leading-none">
                  <div className="text-xs font-semibold line-clamp-1">{v.title}</div>
                  <div className="text-[10px] text-zinc-500">{v.duration} • {v.type}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-2">
          <Link href={`/profile/${user.id}`} className="text-center text-sm font-semibold py-2.5 rounded-full border border-black/10 hover:bg-black/5">View Pact Profile</Link>
          <button onClick={() => onRequest?.(user)} className="text-sm font-bold py-2.5 rounded-full bg-[#0F0F12] text-white hover:bg-black flex items-center justify-center gap-1">
            Send Pact <span className="opacity-60">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
