import { openPositions } from "@/lib/data/company";
import { pushContent } from "@/lib/sync";

/**
 * Client-side admin store.
 *
 * This is a static marketing site with no backend, so the lightweight admin
 * panel persists its state in localStorage. Job openings and the admin
 * password live here; changes broadcast an event so open pages re-read them.
 *
 * Note: this is deliberately simple (client-only) — it is not real security,
 * just an in-browser content toggle for demo/editing convenience.
 */

export type Position = {
  title: string;
  department: string;
  location: string;
  type: string;
};

const POS_KEY = "nb_positions_v1";
const PW_KEY = "nb_admin_pw_v1";

export const DEFAULT_PASSWORD = "123";
export const POSITIONS_EVENT = "nb-positions-updated";

export const defaultPositions: Position[] = [...openPositions];

export function getPositions(): Position[] {
  if (typeof window === "undefined") return defaultPositions;
  try {
    const raw = window.localStorage.getItem(POS_KEY);
    if (!raw) return defaultPositions;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Position[]) : defaultPositions;
  } catch {
    return defaultPositions;
  }
}

export function savePositions(list: Position[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(POS_KEY, JSON.stringify(list));
  window.dispatchEvent(new CustomEvent(POSITIONS_EVENT));
  pushContent("positions", list);
}

export function resetPositions(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(POS_KEY);
  window.dispatchEvent(new CustomEvent(POSITIONS_EVENT));
}

export function getPassword(): string {
  if (typeof window === "undefined") return DEFAULT_PASSWORD;
  return window.localStorage.getItem(PW_KEY) || DEFAULT_PASSWORD;
}

export function setPassword(pw: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PW_KEY, pw);
}

export function verifyPassword(pw: string): boolean {
  return pw === getPassword();
}
