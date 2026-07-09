/**
 * Client <-> backend sync for the CMS.
 * On load the client pulls server content into localStorage (server is the
 * source of truth); admin edits push each changed collection back to the API.
 * If the API is unreachable, the app still works from localStorage (offline).
 */

// content key -> localStorage key
const KEY_MAP: Record<string, string> = {
  team: "nb_team_v1",
  projects: "nb_projects_v1",
  press: "nb_press_v1",
  services: "nb_services_v1",
  positions: "nb_positions_v1",
  staticImages: "nb_static_images_v1",
};

const STORE_EVENT = "nb-store-updated";
const POSITIONS_EVENT = "nb-positions-updated";

/** Fetch server content and hydrate localStorage, then notify the app. */
export async function pullContent(): Promise<void> {
  if (typeof window === "undefined") return;
  try {
    const res = await fetch("/api/content", { cache: "no-store" });
    if (!res.ok) return;
    const data = (await res.json()) as Record<string, unknown>;
    let changed = false;
    for (const [contentKey, lsKey] of Object.entries(KEY_MAP)) {
      if (data && data[contentKey] !== undefined) {
        window.localStorage.setItem(lsKey, JSON.stringify(data[contentKey]));
        changed = true;
      }
    }
    if (changed) {
      window.dispatchEvent(new CustomEvent(STORE_EVENT));
      window.dispatchEvent(new CustomEvent(POSITIONS_EVENT));
    }
  } catch {
    // offline / API unavailable — localStorage remains the working store
  }
}

/** Push one collection to the backend (fire-and-forget). */
export function pushContent(contentKey: string, value: unknown): void {
  if (typeof window === "undefined") return;
  const token = window.localStorage.getItem("nb_admin_token") || undefined;
  fetch("/api/content", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(token ? { "x-admin-token": token } : {}),
    },
    body: JSON.stringify({ key: contentKey, value }),
  }).catch(() => {
    // ignore — offline edits stay in localStorage
  });
}
