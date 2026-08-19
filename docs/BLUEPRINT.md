# Original Blueprint — InkMatch (preserved)

> This is your original highly detailed **Project Blueprint, Business Strategy, and AI Agent Developer Prompt** for InkMatch, preserved verbatim for reference. The live app now ships as **PanelPact** — see `REBRAND.md` for rationale and `README.md` for the updated product.

---

# 📑 Project Blueprint: InkMatch (Creator Matchmaking Platform)

## 1. Executive Summary & Value Proposition
* **The Problem:** Indie comic, manga, and manhwa creators rely on disorganized forums (Reddit, Discord, Facebook) to find collaborators. These spaces are plagues by high ghosting rates, no trust metrics, no legal safety, and an influx of AI-generated art spam. Traditional freelance sites (Upwork, Fiverr) only work if someone has thousands of dollars to hire a creator, completely ignoring non-monetary collaborations.
* **The Solution:** A specialized, high-momentum matchmaking platform that facilitates **"Sweat Equity" (50/50 revenue splits)**, protects creative rights, verifies human skill, and uses timed response windows to eliminate ghosting.

---

## 2. Core Platform Features & Mechanics

### **A. The "Taste Phase" (Exploding Match Window)**
* **Active Opening Trigger:** When User A sends a match request to User B, no timer runs while User B is offline or asleep. The **1-hour timer starts only when User B opens the message**.
* **The Quick-Send Vault:** To avoid friction, creators can pre-upload short workflow videos, digital speedpaints, or script breakdowns to their "Vault." When they open a match request, they can reply in seconds with one tap.
* **Frictionless Auto-Rejection:** If the 1-hour window expires without a response, the match automatically cancels. The app gracefully notifies User A and queues up the next potential collaborator—eliminating awkward rejections and weeks of waiting on "read."

### **B. Trust Metrics & Verification Systems**
* **Completion Rate (The Killer Feature):** A prominent percentage on every profile showing how many accepted projects a user actually finished. 
* **Verified Human Creator Badge:** Requires a small one-time fee or identity verification to confirm that portfolio art/writing is human-made (combating AI impersonators).
* **Peer Ratings & Reviews:** End-of-project reviews covering communication, speed, reliability, and receptive capability to constructive feedback.

### **C. Niche-Specific Tools (Manga, Manhwa & Webtoons)**
* **Format-Native Viewers:** Portfolios support vertical scroll readers (for webtoons/manhwa) and right-to-left page flip viewers (for traditional manga).
* **Granular Role & Genre Tagging:**
  * **Roles:** Writer, Namekuji (Storyboarder), Line Artist, Colorist, Letterer, Editor.
  * **Genres:** Isekai, LitRPG, Cultivation, Shonen, Shojo, Seinen, Slice of Life, Otome.
* **The "Studio" Squad Request:** Allows a group of two or three creators (e.g., a writer and line artist) to submit joint match requests to fill a missing slot (e.g., finding a colorist).

### **D. Deal Structures & Smart Legal Contracts**
* **Supported Deal Types:** 50/50 Revenue Split, Skill Swap / Barter, Portfolio Building (Unpaid/Free), and Paid Gigs.
* **Auto-Generated PDF Agreement:** Once both parties agree to collaborate, the system generates a downloadable PDF legal agreement detailing:
  * Copyright ownership terms (Writer owns IP/Story, Artist owns Visual Assets, both share commercial rights).
  * Revenue split percentages (e.g., Webtoon Canvas rewards, Patreon, or Kickstarter profits).
* **Milestone Progress Tracker:** Breaks projects into phases (Script Approved → Storyboard → Line Art → Lettering).
* **The 14-Day Ghosting Protection Clause:** Built into the automated PDF contract. If a collaborator remains inactive on the platform for 14 consecutive days during an ongoing project, the active partner legally reclaims full rights to the project and the platform helps them re-list the role.

---

## 3. Monetization Strategies

| Monetization Model | How It Works | Target Audience |
| :--- | :--- | :--- |
| **Freemium Subscriptions ($5–$10/month)** | Basic tier allows 3 match requests/day. Premium tier unlocks unlimited requests, read receipts, and filtering search results by **Completion Rate**. | Active creators, Studio leaders, and prolific writers. |
| **Escrow Transaction Fees (5–10%)** | For paid gigs, the platform holds funds in escrow until milestones are completed, taking a small platform fee. | Funded writers, small indie publishers. |
| **Verification Badge Fee ($10 one-time)** | Covers manual review/verification of creator identity and off-platform published work to award the "Verified Creator" badge. | Serious creators wanting priority search ranking. |
| **Premium Contract Templates ($5–$15)** | Basic 50/50 PDF contracts are free. Complex agreements (merchandise licensing, multi-party studio contracts) incur a minor template fee. | Established teams, monetized webcomic projects. |

---

## 4. AI Developer Agent Prompt

Copy and paste the following prompt directly into an AI code editor (like **Cursor**, **GitHub Copilot**, **Windsurf**, or **ChatGPT**) to generate the codebase and backend architecture for this app:

```markdown
You are an expert Principal Full-Stack Engineer and Product Architect. You are tasked with building the MVP for a creator-matchmaking web application called "InkMatch" (specifically built for Manga, Manhwa, and Webtoon creators).

### TECH STACK & ARCHITECTURE
- Frontend: Next.js (React), Tailwind CSS, Framer Motion (for smooth match transitions).
- Backend: Node.js (Express) or Next.js API Routes, WebSockets (for live messaging and real-time timers).
- Database: PostgreSQL (using Prisma ORM).
- File Storage: AWS S3 or Cloudinary (for high-resolution vertical/page comic uploads and video vaults).

### CORE DATABASE MODELS REQUIRED
1. User Schema:
   - ID, Name, Role (Writer, Line Artist, Storyboarder, Colorist, Letterer).
   - Bio, Portfolio_Links, Quick_Send_Vault_URLs (Array).
   - Completion_Rate (Float/Percentage, default 100%).
   - Is_Verified (Boolean, default False).
   - Rating_Score (Float).

2. Match Request Schema:
   - Sender_ID, Recipient_ID, Status (Pending, Opened, Accepted, Auto_Cancelled, Declined).
   - Opened_At (Timestamp, null until recipient reads message).
   - Timer_Expires_At (Timestamp, set to Opened_At + 1 hour).
   - Submitted_Work_URL (String, payload sent during the Taste Phase).

3. Project Schema:
   - Project_ID, Title, Format (Vertical_Webtoon or Page_Manga), Genre_Tags (Array).
   - Deal_Type (Sweat_Equity_50_50, Skill_Swap, Portfolio_Building, Paid_Gig).
   - Milestones (Array of objects: Title, Status, Completed_At).
   - Agreement_PDF_URL (String).

### KEY SYSTEM LOGIC TO IMPLEMENT

1. The "Taste Phase" Timer Trigger:
   - Implement WebSocket connection for real-time messaging.
   - When Recipient clicks to open a pending Match Request thread, trigger an API call to set `Opened_At = NOW()` and `Timer_Expires_At = NOW() + 1 Hour`.
   - Start a client-side and server-side countdown.
   - If Recipient submits a video/image link from their `Quick_Send_Vault` within 60 minutes, update status to `Accepted`.
   - If `Timer_Expires_At` is reached without payload submission, fire a background job to update status to `Auto_Cancelled` and notify Sender gracefully.

2. Automated PDF Legal Contract Generator:
   - Create a backend API route using `pdfkit` or `puppeteer`.
   - When a match is accepted under `Sweat_Equity_50_50`, generate a legal agreement containing:
     - Full names and user IDs of both parties.
     - Project title and scope.
     - Standard 50/50 revenue split terms.
     - 14-day inactivity IP reclamation clause.
   - Save PDF to S3 and return a secure download link to both users.

3. Search & Filter Algorithm:
   - Build a specialized search query endpoint supporting parameters: `role`, `genre`, `deal_type`, `format`, and `min_completion_rate`.
   - Rank results by: Verified Status (First) -> Completion Rate (Second) -> Recent Activity (Third).

Start by setting up the Prisma Database Schema, followed by the Next.js API routes for the "Taste Phase" countdown logic.
```

---

*Preserved August 18, 2026 — now shipped as PanelPact.*
