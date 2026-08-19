import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "PanelPact — Don't just match. Make a Pact.",
  description:
    "The sweat-equity pact platform for manga, manhwa & webtoon creators. 50/50 revenue splits, 1-hour Taste Phase, ghost-proof contracts, and verified human skill.",
  keywords: [
    "manga",
    "manhwa",
    "webtoon",
    "creator collaboration",
    "sweat equity",
    "comic creators",
    "PanelPact",
  ],
  openGraph: {
    title: "PanelPact — Forge Stories. Split Equity. Honor the Pact.",
    description:
      "Elite matchmaking for comic creators. Verified humans only. 14-day ghost protection. 50/50 pacts that ship.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#FFFCF8] text-[#0F0F12] font-sans">
        <Navbar />
        <main className="flex-1 pb-[72px] md:pb-0">{children}</main>
        <footer className="border-t border-black/[0.06] py-8 md:py-10 text-center text-sm text-zinc-500 pb-[88px] md:pb-10">
          <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs md:text-sm">
              © 2026 PanelPact — Formerly InkMatch. Reforged as a Pact, not a
              feed.
            </p>
            <p className="flex gap-4 text-xs md:text-sm">
              <span>Privacy</span>
              <span>Terms</span>
              <span>Pact Template v2.1</span>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
