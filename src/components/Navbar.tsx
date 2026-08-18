"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const nav = [
  { href: "/", label: "Manifesto" },
  { href: "/discover", label: "Discover" },
  { href: "/inbox", label: "Pacts" },
  { href: "/studio", label: "Studios" },
  { href: "/projects", label: "Projects" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#FFFCF8]/85 border-b border-black/[0.06]">
      <div className="max-w-6xl mx-auto px-6 h-[64px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#0F0F12] text-white grid place-items-center font-black text-[13px] tracking-tighter">PP</div>
          <div className="leading-none">
            <div className="font-black tracking-[-0.03em] text-[18px] flex items-baseline gap-1">
              PanelPact <span className="text-[10px] font-bold tracking-[0.12em] bg-[#FF3B30] text-white px-1.5 py-0.5 rounded-md">BETA</span>
            </div>
            <div className="text-[11px] tracking-[0.14em] font-semibold text-zinc-500 -mt-0.5">DON&apos;T JUST MATCH — MAKE A PACT</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {nav.map(n => {
            const active = pathname === n.href || (n.href !== "/" && pathname.startsWith(n.href));
            return (
              <Link key={n.href} href={n.href} className={`px-3.5 py-2 rounded-full text-sm font-medium transition ${active ? "bg-[#0F0F12] text-white" : "text-zinc-600 hover:bg-black/5 hover:text-[#0F0F12]"}`}>
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 text-xs text-zinc-500 border border-black/10 rounded-full px-3 py-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            1,247 verified humans online
          </div>
          <button className="text-sm font-semibold px-4 py-2 rounded-full border border-black/10 hover:bg-black/5">Sign in</button>
          <Link href="/discover" className="text-sm font-bold px-5 py-2.5 rounded-full bg-[#FF3B30] text-white hover:bg-[#E0352B] transition shadow-[0_6px_20px_rgba(255,59,48,0.25)]">
            Forge a Pact →
          </Link>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden w-9 h-9 grid place-items-center rounded-full border border-black/10">
          <span className="text-lg">{mobileOpen ? "×" : "≡"}</span>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-black/5 bg-[#FFFCF8] px-6 py-4 flex flex-col gap-2">
          {nav.map(n => (
            <Link key={n.href} href={n.href} onClick={() => setMobileOpen(false)} className={`px-4 py-3 rounded-xl font-medium ${pathname === n.href ? "bg-black text-white" : "bg-black/[0.04]"}`}>
              {n.label}
            </Link>
          ))}
          <Link href="/discover" className="mt-2 text-center font-bold py-3 rounded-xl bg-[#FF3B30] text-white">Forge a Pact →</Link>
        </div>
      )}

      {/* Rebrand banner */}
      <div className="bg-[#0F0F12] text-white text-xs text-center py-2 px-6 flex items-center justify-center gap-2">
        <span className="hidden sm:inline bg-white text-black px-1.5 py-0.5 rounded text-[10px] font-black tracking-widest">REBRAND</span>
        <span>InkMatch is now <b>PanelPact</b> — same mission, sharper promise. A <i>Pact</i> is legally binding: 50/50 equity, 14-day ghost protection, verified human skill. <Link href="/" className="underline decoration-white/40 underline-offset-4 hover:decoration-white">Why the change?</Link></span>
      </div>
    </header>
  );
}
