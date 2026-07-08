import { projects as defaultProjectsData } from "@/lib/data/projects";
import { services as defaultServicesData } from "@/lib/data/services";
import { articles as defaultArticles } from "@/lib/data/news";
import { leadership } from "@/lib/data/company";

/**
 * Client-only content store for the admin CMS.
 *
 * There is no backend, so editable content (team, projects, press) is persisted
 * in localStorage, seeded from the static data files. Any change dispatches
 * STORE_EVENT so open pages re-read via the hooks in components/admin/useStore.
 * Images are stored inline as compressed data URLs.
 */

export const STORE_EVENT = "nb-store-updated";

export type TeamDoc = { id: string; name: string; role: string; bio: string; photo?: string };

export type ProjectTimelineRow = { period: string; phase: string; description: string };
export type GalleryItem = { label: string; image?: string };

export type ProjectDoc = {
  id: string;
  slug: string;
  title: string;
  category: string;
  client: string;
  location: string;
  year: string;
  area: string;
  summary: string;
  description: string[];
  heroImage?: string;
  beforeImage?: string;
  afterImage?: string;
  stats: { trees: string; shrubs: string; flowers: string; lawn: string; area: string };
  timeline: ProjectTimelineRow[];
  gallery: GalleryItem[];
};

export type PressDoc = {
  id: string;
  title: string;
  source: string;
  category: string;
  date: string;
  url: string;
  excerpt: string;
  image?: string;
  featured?: boolean;
};

export type ServiceDoc = {
  id: string;
  slug: string;
  title: string;
  icon: string;
  tagline: string;
  excerpt: string;
  overview: string[];
  benefits: { title: string; description: string }[];
  image?: string;
  gallery: GalleryItem[];
};

const TEAM_KEY = "nb_team_v1";
const PROJECTS_KEY = "nb_projects_v1";
const PRESS_KEY = "nb_press_v1";
const SERVICES_KEY = "nb_services_v1";
const STATIC_IMG_KEY = "nb_static_images_v1";

/* ---------- defaults (seeded from static data) ---------- */

const statFrom = (
  keyStats: { label: string; value: string }[],
  needle: string,
  fallback = "—",
) => keyStats.find((s) => s.label.toLowerCase().includes(needle))?.value ?? fallback;

export const defaultTeam: TeamDoc[] = leadership.map((p, i) => ({
  id: `team-${i + 1}`,
  name: p.name,
  role: p.role,
  bio: p.bio,
}));

export const defaultProjects: ProjectDoc[] = defaultProjectsData.map((p) => ({
  id: p.slug,
  slug: p.slug,
  title: p.title,
  category: p.category,
  client: p.client,
  location: p.location,
  year: p.year,
  area: p.area,
  summary: p.summary,
  description: [...p.overview],
  stats: {
    trees: statFrom(p.keyStats, "деревьев", "—"),
    shrubs: statFrom(p.keyStats, "кустарник", "—"),
    flowers: statFrom(p.keyStats, "цвет", "—"),
    lawn: statFrom(p.keyStats, "газон", "—"),
    area: p.area,
  },
  timeline: p.timeline.map((t) => ({ period: t.period, phase: t.phase, description: t.description })),
  gallery: p.galleryLabels.map((label) => ({ label })),
}));

export const defaultPress: PressDoc[] = defaultArticles.map((a) => ({
  id: a.slug,
  title: a.title,
  source: a.source,
  category: a.category,
  date: a.date,
  url: a.url,
  excerpt: a.excerpt,
  featured: a.featured,
}));

export const defaultServices: ServiceDoc[] = defaultServicesData.map((s) => ({
  id: s.slug,
  slug: s.slug,
  title: s.title,
  icon: s.icon,
  tagline: s.tagline,
  excerpt: s.excerpt,
  overview: [...s.overview],
  benefits: s.benefits.map((b) => ({ title: b.title, description: b.description })),
  gallery: s.galleryLabels.map((label) => ({ label })),
}));

/* ---------- generic persistence ---------- */

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // Most likely a localStorage quota error from large images.
    // eslint-disable-next-line no-alert
    alert("Не удалось сохранить: превышен лимит хранилища браузера. Уменьшите размер изображений.");
    throw e;
  }
  window.dispatchEvent(new CustomEvent(STORE_EVENT));
}

/* ---------- team ---------- */
export const getTeam = () => read<TeamDoc[]>(TEAM_KEY, defaultTeam);
export const saveTeam = (v: TeamDoc[]) => write(TEAM_KEY, v);
export const resetTeam = () => {
  window.localStorage.removeItem(TEAM_KEY);
  window.dispatchEvent(new CustomEvent(STORE_EVENT));
};

/* ---------- projects ---------- */
export const getProjects = () => read<ProjectDoc[]>(PROJECTS_KEY, defaultProjects);
export const saveProjects = (v: ProjectDoc[]) => write(PROJECTS_KEY, v);
export const resetProjects = () => {
  window.localStorage.removeItem(PROJECTS_KEY);
  window.dispatchEvent(new CustomEvent(STORE_EVENT));
};
export const getProjectBySlug = (slug: string) => getProjects().find((p) => p.slug === slug);

/* ---------- press ---------- */
export const getPress = () => read<PressDoc[]>(PRESS_KEY, defaultPress);
export const savePress = (v: PressDoc[]) => write(PRESS_KEY, v);
export const resetPress = () => {
  window.localStorage.removeItem(PRESS_KEY);
  window.dispatchEvent(new CustomEvent(STORE_EVENT));
};

/* ---------- services ---------- */
export const getServices = () => read<ServiceDoc[]>(SERVICES_KEY, defaultServices);
export const saveServices = (v: ServiceDoc[]) => write(SERVICES_KEY, v);
export const resetServices = () => {
  window.localStorage.removeItem(SERVICES_KEY);
  window.dispatchEvent(new CustomEvent(STORE_EVENT));
};

/* ---------- static (non-entity) images ---------- */
export function getStaticImages(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STATIC_IMG_KEY);
    return raw ? (JSON.parse(raw) as Record<string, string>) : {};
  } catch {
    return {};
  }
}

export function setStaticImage(id: string, dataUrl: string | undefined): void {
  if (typeof window === "undefined") return;
  const map = getStaticImages();
  if (dataUrl) map[id] = dataUrl;
  else delete map[id];
  try {
    window.localStorage.setItem(STATIC_IMG_KEY, JSON.stringify(map));
  } catch (e) {
    // eslint-disable-next-line no-alert
    alert("Не удалось сохранить: превышен лимит хранилища браузера. Уменьшите размер изображений.");
    throw e;
  }
  window.dispatchEvent(new CustomEvent(STORE_EVENT));
}

/** Create a URL-safe slug from a title (latin + digits). */
export function slugify(input: string): string {
  const base = input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9а-я\s-]/gi, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  return base || `item-${Date.now()}`;
}

export function uid(prefix = "id"): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`;
}
