"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const nav = [
  { href: "/", label: "Manifesto", icon: "◈", desc: "Why PanelPact" },
  { href: "/discover", label: "Discover", icon: "◎", desc: "Find partners" },
  {
    href: "/inbox",
    label: "Pacts",
    icon: "✉︎",
    desc: "Taste Phase",
    badge: "2",
  },
  { href: "/studio", label: "Studios", icon: "⬢", desc: "Squad pacts" },
  { href: "/projects", label: "Projects", icon: "◫", desc: "Milestones" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // lock scroll when drawer open
  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#FFFCF8]/90 border-b border-black/[0.06]">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-[56px] md:h-[64px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 md:gap-3 min-w-0">
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-[#0F0F12] text-white grid place-items-center font-black text-[12px] md:text-[13px] tracking-tighter shrink-0">
              PP
            </div>
            <div className="leading-none min-w-0">
              <div className="font-black tracking-[-0.03em] text-[16px] md:text-[18px] flex items-center gap-1.5">
                PanelPact{" "}
                <span className="text-[9px] md:text-[10px] font-bold tracking-[0.12em] bg-[#FF3B30] text-white px-1.5 py-0.5 rounded-md shrink-0">
                  BETA
                </span>
              </div>
              <div className="hidden sm:block text-[10px] md:text-[11px] tracking-[0.12em] md:tracking-[0.14em] font-semibold text-zinc-500 -mt-0.5 truncate">
                DON'T JUST MATCH — MAKE A PACT
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {nav.map((n) => {
              const active =
                pathname === n.href ||
                (n.href !== "/" && pathname.startsWith(n.href));
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`px-3.5 py-2 rounded-full text-sm font-medium transition ${active ? "bg-[#0F0F12] text-white" : "text-zinc-600 hover:bg-black/5 hover:text-[#0F0F12]"}`}>
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 text-xs text-zinc-500 border border-black/10 rounded-full px-3 py-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              1,247 verified
            </div>
            <Link
              href="/discover"
              className="text-sm font-bold px-5 py-2.5 rounded-full bg-[#FF3B30] text-white hover:bg-[#E0352B] transition shadow-[0_6px_20px_rgba(255,59,48,0.25)]">
              Forge a Pact →
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="md:hidden w-10 h-10 grid place-items-center rounded-xl bg-[#0F0F12] text-white active:scale-95 transition">
            <span className="text-[18px] leading-none">
              {mobileOpen ? "✕" : "☰"}
            </span>
          </button>
        </div>

        {/* Rebrand banner - hide on small if needed, but keep */}
        <div className="bg-[#0F0F12] text-white text-[11px] md:text-xs text-center py-2 px-4 flex items-center justify-center gap-2 leading-tight">
          <span className="hidden sm:inline bg-white text-black px-1.5 py-0.5 rounded text-[10px] font-black tracking-widest shrink-0">
            REBRAND
          </span>
          <span className="line-clamp-2">
            InkMatch → <b>PanelPact</b> — 50/50 equity • 14-day ghost shield •
            verified humans
          </span>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            onClick={() => setMobileOpen(false)}
            className="flex-1 bg-black/40 backdrop-blur-sm"
          />
          <div className="w-[86%] max-w-[340px] bg-[#FFFCF8] h-full flex flex-col shadow-[-12px_0_40px_rgba(0,0,0,0.15)] animate-[slideIn_0.2s_ease]">
            <div className="p-5 flex items-center justify-between border-b border-black/5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#0F0F12] text-white grid place-items-center font-black">
                  PP
                </div>
                <div>
                  <div className="font-black leading-none">PanelPact</div>
                  <div className="text-xs text-zinc-500">
                    Forge • Pact • Ship
                  </div>
                </div>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-9 h-9 grid place-items-center rounded-full bg-black text-white">
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
              {nav.map((n) => {
                const active =
                  pathname === n.href ||
                  (n.href !== "/" && pathname.startsWith(n.href));
                return (
                  <Link
                    key={n.href}
                    href={n.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition ${active ? "bg-[#0F0F12] text-white" : "bg-white border border-black/5 hover:border-black/10"}`}>
                    <span
                      className={`w-10 h-10 rounded-xl grid place-items-center text-lg shrink-0 ${active ? "bg-white/15" : "bg-[#FFF1E8]"}`}>
                      {n.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold leading-none">
                        {n.label}{" "}
                        {n.badge && (
                          <span className="ml-2 bg-[#FF3B30] text-white text-xs px-1.5 py-0.5 rounded-full">
                            {n.badge}
                          </span>
                        )}
                      </div>
                      <div
                        className={`text-xs ${active ? "text-white/60" : "text-zinc-500"}`}>
                        {n.desc}
                      </div>
                    </div>
                    <span
                      className={active ? "text-white/60" : "text-zinc-400"}>
                      →
                    </span>
                  </Link>
                );
              })}

              <div className="mt-2 bg-[#0F0F12] text-white rounded-2xl p-4">
                <div className="text-sm font-black">Ready to pact?</div>
                <div className="text-xs opacity-70 mt-1">
                  3 free pacts/day • Vault makes you 3× faster
                </div>
                <Link
                  href="/discover"
                  onClick={() => setMobileOpen(false)}
                  className="mt-3 block text-center font-bold py-3 rounded-xl bg-[#FF3B30] text-white">
                  Forge a Pact →
                </Link>
                <div className="mt-2 flex items-center justify-center gap-2 text-xs opacity-60">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />{" "}
                  1,247 verified online
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-black/5 text-xs text-zinc-500 text-center">
              © 2026 PanelPact • Pact Template v2.1
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Tab Bar */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-xl border-t border-black/5 pb-[env(safe-area-inset-bottom)]">
        <div className="grid grid-cols-5 gap-0.5 px-1 pt-1 pb-1">
          {nav.map((n) => {
            const active =
              pathname === n.href ||
              (n.href !== "/" && pathname.startsWith(n.href));
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`flex flex-col items-center justify-center py-2 rounded-xl transition ${active ? "text-[#FF3B30]" : "text-zinc-500"}`}>
                <span
                  className={`w-7 h-7 grid place-items-center rounded-lg text-[16px] ${active ? "bg-[#FF3B30] text-white" : "bg-zinc-100"}`}>
                  {n.icon}
                </span>
                <span className="text-[10px] font-bold tracking-wide mt-1 leading-none">
                  {n.label}
                </span>
                {n.badge && (
                  <span className="absolute top-1 ml-6 bg-[#FF3B30] text-white text-[10px] font-black px-1 rounded-full">
                    {n.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      <style>{`@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>
    </>
  );
}
