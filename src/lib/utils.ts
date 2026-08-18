import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m/60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h/24)}d ago`;
}

export function completionColor(rate: number) {
  if (rate >= 95) return "text-emerald-600 bg-emerald-50 border-emerald-200";
  if (rate >= 85) return "text-amber-600 bg-amber-50 border-amber-200";
  return "text-red-600 bg-red-50 border-red-200";
}

export function formatRole(r: string) {
  return r.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
}
