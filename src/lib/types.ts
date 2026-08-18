export type Role = "WRITER" | "STORYBOARDER" | "LINE_ARTIST" | "COLORIST" | "LETTERER" | "EDITOR";
export type Genre = "ISEKAI" | "LITRPG" | "CULTIVATION" | "SHONEN" | "SHOJO" | "SEINEN" | "SLICE_OF_LIFE" | "OTOME" | "HORROR" | "SCI_FI" | "FANTASY" | "ROMANCE";
export type Format = "VERTICAL_WEBTOON" | "PAGE_MANGA";
export type DealType = "SWEAT_EQUITY_50_50" | "SKILL_SWAP" | "PORTFOLIO_BUILDING" | "PAID_GIG";
export type MatchStatus = "PENDING" | "OPENED" | "ACCEPTED" | "AUTO_CANCELLED" | "DECLINED";

export interface PortfolioItem {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  format: Format;
  type: "image" | "video";
  pages?: string[]; // for PAGE_MANGA
}

export interface VaultItem {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  duration: string;
  type: "speedpaint" | "workflow" | "script_breakdown";
}

export interface User {
  id: string;
  name: string;
  handle: string;
  avatarUrl: string;
  role: Role;
  secondaryRoles: Role[];
  bio: string;
  genres: Genre[];
  formats: Format[];
  dealTypes: DealType[];
  completionRate: number;
  isVerified: boolean;
  ratingScore: number;
  reviewCount: number;
  portfolio: PortfolioItem[];
  vault: VaultItem[];
  completedProjects: number;
  lastActiveAt: string;
  location?: string;
}

export interface MatchRequest {
  id: string;
  senderId: string;
  recipientId: string;
  status: MatchStatus;
  message?: string;
  dealType: DealType;
  genreTag?: Genre;
  openedAt?: string;
  timerExpiresAt?: string;
  submittedWorkUrl?: string;
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  format: Format;
  genreTags: Genre[];
  dealType: DealType;
  coverUrl: string;
  members: { userId: string; role: Role; equity: number }[];
  milestones: { title: string; status: "PENDING" | "IN_PROGRESS" | "COMPLETED"; order: number; completedAt?: string }[];
  agreementPdfUrl?: string;
  status: "ACTIVE" | "COMPLETED" | "GHOSTED_CLAIMED";
}

export interface StudioSquad {
  id: string;
  name: string;
  members: User[];
  seeking: Role;
  genre?: Genre;
  format?: Format;
  dealType: DealType;
}

export const roleLabels: Record<Role, string> = {
  WRITER: "Writer",
  STORYBOARDER: "Storyboarder",
  LINE_ARTIST: "Line Artist",
  COLORIST: "Colorist",
  LETTERER: "Letterer",
  EDITOR: "Editor",
};

export const genreLabels: Record<Genre, string> = {
  ISEKAI: "Isekai",
  LITRPG: "LitRPG",
  CULTIVATION: "Cultivation",
  SHONEN: "Shōnen",
  SHOJO: "Shōjo",
  SEINEN: "Seinen",
  SLICE_OF_LIFE: "Slice of Life",
  OTOME: "Otome",
  HORROR: "Horror",
  SCI_FI: "Sci-Fi",
  FANTASY: "Fantasy",
  ROMANCE: "Romance",
};

export const dealLabels: Record<DealType, { label: string; short: string; desc: string }> = {
  SWEAT_EQUITY_50_50: { label: "Sweat Equity — 50/50 Pact", short: "50/50 Pact", desc: "Equal revenue split, shared IP" },
  SKILL_SWAP: { label: "Skill Swap / Barter", short: "Skill Swap", desc: "Trade skills, no cash" },
  PORTFOLIO_BUILDING: { label: "Portfolio Forge", short: "Portfolio", desc: "Build together for cred" },
  PAID_GIG: { label: "Paid Gig — Escrow Protected", short: "Paid", desc: "Milestone escrow, platform fee 7%" },
};

export const formatLabels: Record<Format, string> = {
  VERTICAL_WEBTOON: "Vertical Webtoon",
  PAGE_MANGA: "Page Manga",
};
