# PanelPact — Don't just match. Make a Pact.

**Formerly InkMatch — reforged to honor what we actually build.**

> A sweat-equity **pact** platform for manga, manhwa & webtoon creators. 50/50 revenue splits, 1-hour Taste Phase, verified human skill, and 14-day ghost protection.

🔗 **Live Preview:** `npm run dev` → Discover / Inbox / Studio / Projects
📄 **Original Blueprint:** See `docs/BLUEPRINT.md` (your full spec preserved)
🏷️ **Rebrand Rationale:** See `REBRAND.md`

---

## Why PanelPact?

| Before (InkMatch) | After (PanelPact) | Why |
|---|---|---|
| **Match** | **Pact** | A match is a chat. A **Pact** is a 50/50 equity PDF + 14-day ghost clause + milestones. The name now promises the protection. |
| **Ink** (generic) | **Panel** | **Panel** is the atomic unit of manga / manhwa / webtoons. Signals our niche + format-native viewers (vertical scroll, RTL flip). |
| Hope & DMs | **Forge** | We forge teams that ship. Completion Rate + Verified Human + Squad Pacts = momentum. |

**Taglines:**
- Primary: **“Don’t just match. Make a Pact.”**
- Secondary: **“Forge Stories. Split Equity. Honor the Pact.”**

---

## Features — Everything from the Blueprint, Shipped

### ⚡ Taste Phase (Exploding Match Window)
- **Timer starts only when recipient *opens* the Pact Request** — no punishment for sleeping.
- **60-minute Taste Phase:** recipient replies in one tap from their **Quick-Send Vault** (speedpaint / workflow / script breakdown) or it **auto-cancels** and gracefully queues sender to next partner.
- Live demo at `/` and `/inbox` — simulates WebSocket `POST /api/match/open` → `openedAt = now()`, `timerExpiresAt = now()+1h`, cron → `AUTO_CANCELLED`.

### 🛡️ Trust Metrics & Verification
- **Completion Rate (Pact Rate)** — prominent %: shipped / accepted. Filter Discover by min rate (Premium feature).
- **Verified Human Badge** — $10 one-time ID + portfolio review. Ranked first in Discover. Crushes AI spam.
- **Peer Reviews** — communication / speed / reliability / feedback — only from shipped pacts.

### 📖 Niche Tools (Manga / Manhwa / Webtoons)
- **Format-Native Viewers:** Vertical scroll for Webtoons, RTL page flip for Manga (see `/profile/[id]`).
- **Granular Tags:** Roles (Writer, Storyboarder/Name, Line Artist, Colorist, Letterer, Editor) + Genres (Isekai, LitRPG, Cultivation, Shōnen, Shōjo, Seinen, Slice of Life, Otome…)
- **Studio Squad Pact** (`/studio`): Duo/trio submits joint request to fill missing slot (e.g., Writer+Line → seeking Colorist). 3-way 50/50 split.

### ⚖️ Deal Structures & Smart Legal Pacts
- **Deal Types:** 50/50 Sweat Equity Pact, Skill Swap, Portfolio Forge, Paid Gig (Escrow 7%).
- **Auto PDF Pact:** On accept, backend (`pdfkit`/`puppeteer` → S3) generates: names/IDs, title/scope, 50/50 split, IP terms (Writer = Story, Artist = Visuals, Commercial shared), milestones.
- **Milestone Tracker** (`/projects`): Script → Name → Line → Color → Letter → Publish.
- **14-Day Ghost Protection Clause:** Built into PDF. 14 consecutive days inactive mid-project → active partner reclaims full rights, we re-list the role. Demo slider on Projects.

### 💳 Monetization (UI-ready)
- **Free:** 3 pacts/day
- **Pact Pro $8/mo:** Unlimited, filter by Pact Rate, read receipts
- **Escrow 7%:** Funds held till milestone complete
- **Verified $10 once** + Premium contract templates $5–$15

### 🔍 Search & Filter Algorithm
`GET /api/search?role=&genre=&deal_type=&format=&min_completion_rate=` → Rank: **Verified → Pact Rate → Recent Activity**. Live in `/discover` with client demo.

---

## Tech Stack

- **Frontend:** Next.js 16 (App Router) • Tailwind 4 • Framer Motion
- **Backend:** Next.js API Routes + WebSockets (Taste Phase live timers)
- **DB:** PostgreSQL + Prisma (schema in `prisma/schema.prisma`)
- **Storage:** S3 / Cloudinary (Vault + portfolios)
- **PDF:** pdfkit / puppeteer → S3 secure links

### Prisma Schema
```prisma
User { id, handle, role, completionRate, isVerified, vaultUrls[] … }
MatchRequest { senderId, recipientId, status, openedAt, timerExpiresAt, submittedWorkUrl }
Project { title, format, genreTags[], dealType, agreementPdfUrl }
Milestone { title, status, order, completedAt }
```

---

## Run Locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (passes)
```

- `/` — Manifesto + Taste Phase demo + Contract preview + Pricing
- `/discover` — Search & filter (demo data 6 creators)
- `/inbox` — Taste Phase inbox simulation (PENDING → OPENED → 60:00 → ACCEPTED / AUTO_CANCELLED)
- `/profile/[id]` — Vault, vertical & RTL viewers, pact rate/reviews
- `/studio` — Squad requests + “Forge Your Squad” builder
- `/projects` — Milestones + ghost shield + PDF
- `/api/match/open` + `/api/match/send` + `/api/contract/generate` + `/api/search` — blueprint logic

---

## Rebrand Assets

- **Domain ideas:** panelpact.com / panelpact.art / makethepact.com
- **Logo:** `PP` monogram in ink-black, accent #FF3B30 (pact red)
- **Colors:** Paper #FFFCF8, Ink #0F0F12, Pact Red #FF3B30, Glow #FF6B35
- **Voice:** Direct, pact-first: “We don’t match — we pact. And pacts ship.”

---

Built from your blueprint by Arena Agent — all core mechanics wired and preview-ready.
