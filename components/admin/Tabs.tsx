"use client";

import { useEffect, useState } from "react";
import { Input, Label, Select, Textarea } from "@/components/ui/Field";
import { ImageField } from "@/components/admin/ImageField";
import {
  DEFAULT_PASSWORD,
  getPositions,
  savePositions,
  resetPositions,
  setPassword as persistPassword,
  type Position,
} from "@/lib/admin";
import {
  getTeam,
  saveTeam,
  resetTeam,
  getProjects,
  saveProjects,
  resetProjects,
  getPress,
  savePress,
  resetPress,
  getServices,
  saveServices,
  resetServices,
  getStaticImages,
  setStaticImage,
  slugify,
  uid,
  type TeamDoc,
  type ProjectDoc,
  type PressDoc,
  type ServiceDoc,
} from "@/lib/store";
import { photoSlots } from "@/lib/photos";

const departments = [
  "Проектирование", "Инженерия", "Строительство", "Обслуживание",
  "Устойчивое развитие", "Коммерция", "Теплица",
];

function SectionHead({ title, onReset }: { title: string; onReset: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-semibold tracking-tight text-ink">{title}</h2>
      <button type="button" onClick={onReset} className="text-xs font-medium text-forest-700 link-underline">
        Сбросить к исходным
      </button>
    </div>
  );
}

function AddButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-5 inline-flex items-center gap-2 rounded-full bg-forest-900 px-5 py-2.5 text-sm font-medium text-sand-50 transition-colors hover:bg-forest-800"
    >
      <span className="text-base leading-none">＋</span> {children}
    </button>
  );
}

function DeleteButton({ onClick, label }: { onClick: (e: React.MouseEvent) => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink/40 transition-colors hover:bg-red-50 hover:text-red-500"
    >
      <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M4 6h12M8 6V4h4v2M6 6l1 10h6l1-10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Positions                                                          */
/* ------------------------------------------------------------------ */

export function PositionsTab() {
  const [items, setItems] = useState<Position[]>([]);
  const [draft, setDraft] = useState<Position>({ title: "", department: departments[0], location: "Кокшетау", type: "Полная занятость" });
  useEffect(() => setItems(getPositions()), []);

  const persist = (next: Position[]) => { setItems(next); savePositions(next); };

  return (
    <div className="space-y-5">
      <SectionHead title="Вакансии" onReset={() => { resetPositions(); setItems(getPositions()); }} />
      <ul className="space-y-2">
        {items.map((p, i) => (
          <li key={i} className="flex items-center justify-between gap-4 rounded-2xl border border-forest-900/8 bg-mist px-4 py-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink">{p.title}</p>
              <p className="truncate text-xs text-ink/50">{p.department} · {p.location} · {p.type}</p>
            </div>
            <DeleteButton label={`Удалить ${p.title}`} onClick={() => persist(items.filter((_, j) => j !== i))} />
          </li>
        ))}
        {items.length === 0 && <li className="rounded-2xl border border-dashed border-forest-900/15 px-4 py-6 text-center text-sm text-ink/45">Вакансий пока нет.</li>}
      </ul>

      <div className="rounded-3xl border border-forest-900/8 p-5">
        <p className="text-sm font-medium text-ink">Добавить вакансию</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2"><Label htmlFor="p-title">Должность</Label><Input id="p-title" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} placeholder="напр. Ландшафтный архитектор" /></div>
          <div><Label htmlFor="p-dep">Отдел</Label><Select id="p-dep" value={draft.department} onChange={(e) => setDraft({ ...draft, department: e.target.value })}>{departments.map((d) => <option key={d}>{d}</option>)}</Select></div>
          <div><Label htmlFor="p-loc">Локация</Label><Input id="p-loc" value={draft.location} onChange={(e) => setDraft({ ...draft, location: e.target.value })} /></div>
          <div className="sm:col-span-2"><Label htmlFor="p-type">Тип занятости</Label><Input id="p-type" value={draft.type} onChange={(e) => setDraft({ ...draft, type: e.target.value })} /></div>
        </div>
        <AddButton onClick={() => { if (!draft.title.trim()) return; persist([...items, draft]); setDraft({ title: "", department: departments[0], location: "Кокшетау", type: "Полная занятость" }); }}>Добавить</AddButton>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Team                                                               */
/* ------------------------------------------------------------------ */

export function TeamTab() {
  const [items, setItems] = useState<TeamDoc[]>([]);
  useEffect(() => setItems(getTeam()), []);
  const persist = (next: TeamDoc[]) => { setItems(next); saveTeam(next); };
  const update = (i: number, patch: Partial<TeamDoc>) => persist(items.map((m, j) => (j === i ? { ...m, ...patch } : m)));

  return (
    <div className="space-y-5">
      <SectionHead title="Команда" onReset={() => { resetTeam(); setItems(getTeam()); }} />
      <div className="space-y-4">
        {items.map((m, i) => (
          <div key={m.id} className="rounded-3xl border border-forest-900/8 p-5">
            <div className="flex items-start justify-between gap-4">
              <p className="text-sm font-semibold text-ink">{m.name || "Без имени"}</p>
              <DeleteButton label={`Удалить ${m.name}`} onClick={() => persist(items.filter((_, j) => j !== i))} />
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-[8rem,1fr]">
              <ImageField label="Фото" value={m.photo} aspect="aspect-[3/4]" onChange={(v) => update(i, { photo: v })} />
              <div className="grid content-start gap-3">
                <div><Label htmlFor={`t-name-${i}`}>Имя</Label><Input id={`t-name-${i}`} value={m.name} onChange={(e) => update(i, { name: e.target.value })} /></div>
                <div><Label htmlFor={`t-role-${i}`}>Должность</Label><Input id={`t-role-${i}`} value={m.role} onChange={(e) => update(i, { role: e.target.value })} /></div>
                <div><Label htmlFor={`t-bio-${i}`}>Описание</Label><Textarea id={`t-bio-${i}`} value={m.bio} onChange={(e) => update(i, { bio: e.target.value })} className="min-h-20" /></div>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="rounded-2xl border border-dashed border-forest-900/15 px-4 py-6 text-center text-sm text-ink/45">В команде пока никого нет.</p>}
      </div>
      <AddButton onClick={() => persist([...items, { id: uid("team"), name: "Новый сотрудник", role: "Должность", bio: "" }])}>Добавить сотрудника</AddButton>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Press                                                              */
/* ------------------------------------------------------------------ */

export function PressTab() {
  const [items, setItems] = useState<PressDoc[]>([]);
  useEffect(() => setItems(getPress()), []);
  const persist = (next: PressDoc[]) => { setItems(next); savePress(next); };
  const update = (i: number, patch: Partial<PressDoc>) => persist(items.map((a, j) => (j === i ? { ...a, ...patch } : a)));

  return (
    <div className="space-y-5">
      <SectionHead title="Пресса" onReset={() => { resetPress(); setItems(getPress()); }} />
      <div className="space-y-4">
        {items.map((a, i) => (
          <details key={a.id} className="rounded-3xl border border-forest-900/8 p-5">
            <summary className="flex cursor-pointer items-center justify-between gap-4">
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold text-ink">{a.title || "Без заголовка"}</span>
                <span className="block truncate text-xs text-ink/50">{a.source} · {a.date}</span>
              </span>
              <DeleteButton label={`Удалить ${a.title}`} onClick={(e) => { e.preventDefault(); e.stopPropagation(); persist(items.filter((_, j) => j !== i)); }} />
            </summary>
            <div className="mt-4 grid gap-3">
              <ImageField label="Обложка" value={a.image} onChange={(v) => update(i, { image: v })} />
              <div><Label htmlFor={`pr-title-${i}`}>Заголовок</Label><Input id={`pr-title-${i}`} value={a.title} onChange={(e) => update(i, { title: e.target.value })} /></div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div><Label htmlFor={`pr-src-${i}`}>Издание</Label><Input id={`pr-src-${i}`} value={a.source} onChange={(e) => update(i, { source: e.target.value })} /></div>
                <div><Label htmlFor={`pr-cat-${i}`}>Категория</Label><Input id={`pr-cat-${i}`} value={a.category} onChange={(e) => update(i, { category: e.target.value })} /></div>
                <div><Label htmlFor={`pr-date-${i}`}>Дата</Label><Input id={`pr-date-${i}`} value={a.date} onChange={(e) => update(i, { date: e.target.value })} /></div>
                <div><Label htmlFor={`pr-url-${i}`}>Ссылка</Label><Input id={`pr-url-${i}`} value={a.url} onChange={(e) => update(i, { url: e.target.value })} placeholder="https://" /></div>
              </div>
              <div><Label htmlFor={`pr-exc-${i}`}>Краткое описание</Label><Textarea id={`pr-exc-${i}`} value={a.excerpt} onChange={(e) => update(i, { excerpt: e.target.value })} className="min-h-20" /></div>
              <label className="flex items-center gap-2 text-sm text-ink/70">
                <input type="checkbox" checked={!!a.featured} onChange={(e) => update(i, { featured: e.target.checked })} className="h-4 w-4 accent-forest-700" />
                Показывать как главную публикацию
              </label>
            </div>
          </details>
        ))}
        {items.length === 0 && <p className="rounded-2xl border border-dashed border-forest-900/15 px-4 py-6 text-center text-sm text-ink/45">Публикаций пока нет.</p>}
      </div>
      <AddButton onClick={() => persist([{ id: uid("press"), title: "Новая публикация", source: "Издание", category: "Проекты", date: "2026", url: "https://", excerpt: "" }, ...items])}>Добавить публикацию</AddButton>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Projects                                                           */
/* ------------------------------------------------------------------ */

export function ProjectsTab() {
  const [items, setItems] = useState<ProjectDoc[]>([]);
  useEffect(() => setItems(getProjects()), []);
  const persist = (next: ProjectDoc[]) => { setItems(next); saveProjects(next); };
  const update = (i: number, patch: Partial<ProjectDoc>) => persist(items.map((p, j) => (j === i ? { ...p, ...patch } : p)));
  const updateStat = (i: number, key: keyof ProjectDoc["stats"], v: string) =>
    persist(items.map((p, j) => (j === i ? { ...p, stats: { ...p.stats, [key]: v } } : p)));

  const addProject = () => {
    const id = uid("proj");
    persist([
      ...items,
      {
        id, slug: `proekt-${items.length + 1}`, title: "Новый проект", category: "Городской парк",
        client: "Заказчик", location: "Кокшетау", year: "2026", area: "—",
        summary: "Краткое описание проекта.", description: ["Описание проекта."],
        stats: { trees: "—", shrubs: "—", flowers: "—", lawn: "—", area: "—" },
        timeline: [], gallery: [],
      },
    ]);
  };

  return (
    <div className="space-y-5">
      <SectionHead title="Проекты" onReset={() => { resetProjects(); setItems(getProjects()); }} />
      <div className="space-y-4">
        {items.map((p, i) => (
          <details key={p.id} className="rounded-3xl border border-forest-900/8 p-5">
            <summary className="flex cursor-pointer items-center justify-between gap-4">
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold text-ink">{p.title}</span>
                <span className="block truncate text-xs text-ink/50">{p.category} · {p.location} · {p.year}</span>
              </span>
              <DeleteButton label={`Удалить ${p.title}`} onClick={(e) => { e.preventDefault(); e.stopPropagation(); persist(items.filter((_, j) => j !== i)); }} />
            </summary>

            <div className="mt-4 space-y-4">
              {/* Basics */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="sm:col-span-2"><Label htmlFor={`pj-title-${i}`}>Название</Label><Input id={`pj-title-${i}`} value={p.title} onChange={(e) => update(i, { title: e.target.value })} /></div>
                <div><Label htmlFor={`pj-slug-${i}`}>URL (slug)</Label><Input id={`pj-slug-${i}`} value={p.slug} onChange={(e) => update(i, { slug: slugify(e.target.value) })} /></div>
                <div><Label htmlFor={`pj-cat-${i}`}>Категория</Label><Input id={`pj-cat-${i}`} value={p.category} onChange={(e) => update(i, { category: e.target.value })} /></div>
                <div><Label htmlFor={`pj-client-${i}`}>Заказчик</Label><Input id={`pj-client-${i}`} value={p.client} onChange={(e) => update(i, { client: e.target.value })} /></div>
                <div><Label htmlFor={`pj-loc-${i}`}>Локация</Label><Input id={`pj-loc-${i}`} value={p.location} onChange={(e) => update(i, { location: e.target.value })} /></div>
                <div><Label htmlFor={`pj-year-${i}`}>Год</Label><Input id={`pj-year-${i}`} value={p.year} onChange={(e) => update(i, { year: e.target.value })} /></div>
                <div><Label htmlFor={`pj-area-${i}`}>Площадь</Label><Input id={`pj-area-${i}`} value={p.area} onChange={(e) => update(i, { area: e.target.value })} /></div>
                <div className="sm:col-span-2"><Label htmlFor={`pj-sum-${i}`}>Краткое описание</Label><Textarea id={`pj-sum-${i}`} value={p.summary} onChange={(e) => update(i, { summary: e.target.value })} className="min-h-16" /></div>
                <div className="sm:col-span-2"><Label htmlFor={`pj-desc-${i}`}>Описание (абзацы с новой строки)</Label><Textarea id={`pj-desc-${i}`} value={p.description.join("\n\n")} onChange={(e) => update(i, { description: e.target.value.split(/\n\n+/).filter(Boolean) })} className="min-h-24" /></div>
              </div>

              {/* Stats */}
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-forest-600">Статистика</p>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div><Label htmlFor={`pj-trees-${i}`}>Деревьев</Label><Input id={`pj-trees-${i}`} value={p.stats.trees} onChange={(e) => updateStat(i, "trees", e.target.value)} /></div>
                  <div><Label htmlFor={`pj-shrubs-${i}`}>Кустарников</Label><Input id={`pj-shrubs-${i}`} value={p.stats.shrubs} onChange={(e) => updateStat(i, "shrubs", e.target.value)} /></div>
                  <div><Label htmlFor={`pj-flowers-${i}`}>Многолетних цветов</Label><Input id={`pj-flowers-${i}`} value={p.stats.flowers} onChange={(e) => updateStat(i, "flowers", e.target.value)} /></div>
                  <div><Label htmlFor={`pj-lawn-${i}`}>Площадь газонов</Label><Input id={`pj-lawn-${i}`} value={p.stats.lawn} onChange={(e) => updateStat(i, "lawn", e.target.value)} /></div>
                  <div><Label htmlFor={`pj-sarea-${i}`}>Общая площадь</Label><Input id={`pj-sarea-${i}`} value={p.stats.area} onChange={(e) => updateStat(i, "area", e.target.value)} /></div>
                </div>
              </div>

              {/* Images */}
              <div className="grid gap-3 sm:grid-cols-3">
                <ImageField label="Лицевое фото" value={p.heroImage} onChange={(v) => update(i, { heroImage: v })} />
                <ImageField label="До" value={p.beforeImage} onChange={(v) => update(i, { beforeImage: v })} />
                <ImageField label="После" value={p.afterImage} onChange={(v) => update(i, { afterImage: v })} />
              </div>

              {/* Timeline */}
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-forest-600">Ход строительства (по годам)</p>
                <div className="space-y-2">
                  {p.timeline.map((t, k) => (
                    <div key={k} className="grid items-start gap-2 sm:grid-cols-[5rem,1fr,auto]">
                      <Input aria-label="Год" value={t.period} onChange={(e) => update(i, { timeline: p.timeline.map((x, m) => (m === k ? { ...x, period: e.target.value } : x)) })} placeholder="2023" />
                      <div className="grid gap-2">
                        <Input aria-label="Этап" value={t.phase} onChange={(e) => update(i, { timeline: p.timeline.map((x, m) => (m === k ? { ...x, phase: e.target.value } : x)) })} placeholder="Этап" />
                        <Input aria-label="Описание" value={t.description} onChange={(e) => update(i, { timeline: p.timeline.map((x, m) => (m === k ? { ...x, description: e.target.value } : x)) })} placeholder="Описание" />
                      </div>
                      <DeleteButton label="Удалить этап" onClick={() => update(i, { timeline: p.timeline.filter((_, m) => m !== k) })} />
                    </div>
                  ))}
                </div>
                <button type="button" onClick={() => update(i, { timeline: [...p.timeline, { period: "", phase: "", description: "" }] })} className="mt-2 text-xs font-medium text-forest-700 link-underline">＋ Добавить этап</button>
              </div>

              {/* Gallery */}
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-forest-600">Галерея</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {p.gallery.map((g, k) => (
                    <div key={k} className="rounded-2xl border border-forest-900/8 p-3">
                      <ImageField label={`Фото ${k + 1}`} value={g.image} onChange={(v) => update(i, { gallery: p.gallery.map((x, m) => (m === k ? { ...x, image: v } : x)) })} />
                      <div className="mt-2 flex items-center gap-2">
                        <Input aria-label="Подпись" value={g.label} onChange={(e) => update(i, { gallery: p.gallery.map((x, m) => (m === k ? { ...x, label: e.target.value } : x)) })} placeholder="Подпись" />
                        <DeleteButton label="Удалить фото" onClick={() => update(i, { gallery: p.gallery.filter((_, m) => m !== k) })} />
                      </div>
                    </div>
                  ))}
                </div>
                <button type="button" onClick={() => update(i, { gallery: [...p.gallery, { label: `Фото ${p.gallery.length + 1}` }] })} className="mt-2 text-xs font-medium text-forest-700 link-underline">＋ Добавить фото</button>
              </div>
            </div>
          </details>
        ))}
        {items.length === 0 && <p className="rounded-2xl border border-dashed border-forest-900/15 px-4 py-6 text-center text-sm text-ink/45">Проектов пока нет.</p>}
      </div>
      <AddButton onClick={addProject}>Добавить проект</AddButton>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Services                                                           */
/* ------------------------------------------------------------------ */

export function ServicesTab() {
  const [items, setItems] = useState<ServiceDoc[]>([]);
  useEffect(() => setItems(getServices()), []);
  const persist = (next: ServiceDoc[]) => { setItems(next); saveServices(next); };
  const update = (i: number, patch: Partial<ServiceDoc>) => persist(items.map((s, j) => (j === i ? { ...s, ...patch } : s)));

  const addService = () => persist([
    ...items,
    {
      id: uid("svc"), slug: `usluga-${items.length + 1}`, title: "Новая услуга", icon: "🌿",
      tagline: "Короткое описание услуги.", excerpt: "Описание для карточки.",
      overview: ["Описание услуги."], benefits: [], gallery: [],
    },
  ]);

  return (
    <div className="space-y-5">
      <SectionHead title="Услуги" onReset={() => { resetServices(); setItems(getServices()); }} />
      <div className="space-y-4">
        {items.map((s, i) => (
          <details key={s.id} className="rounded-3xl border border-forest-900/8 p-5">
            <summary className="flex cursor-pointer items-center justify-between gap-4">
              <span className="flex min-w-0 items-center gap-2">
                <span className="text-xl" aria-hidden="true">{s.icon}</span>
                <span className="truncate text-sm font-semibold text-ink">{s.title}</span>
              </span>
              <DeleteButton label={`Удалить ${s.title}`} onClick={(e) => { e.preventDefault(); e.stopPropagation(); persist(items.filter((_, j) => j !== i)); }} />
            </summary>
            <div className="mt-4 space-y-4">
              <ImageField label="Фото услуги (фон карточки и шапка)" value={s.image} onChange={(v) => update(i, { image: v })} />
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="sm:col-span-2"><Label htmlFor={`sv-title-${i}`}>Название</Label><Input id={`sv-title-${i}`} value={s.title} onChange={(e) => update(i, { title: e.target.value })} /></div>
                <div><Label htmlFor={`sv-icon-${i}`}>Иконка (эмодзи)</Label><Input id={`sv-icon-${i}`} value={s.icon} onChange={(e) => update(i, { icon: e.target.value })} /></div>
                <div><Label htmlFor={`sv-slug-${i}`}>URL (slug)</Label><Input id={`sv-slug-${i}`} value={s.slug} onChange={(e) => update(i, { slug: slugify(e.target.value) })} /></div>
                <div className="sm:col-span-2"><Label htmlFor={`sv-tag-${i}`}>Подзаголовок</Label><Input id={`sv-tag-${i}`} value={s.tagline} onChange={(e) => update(i, { tagline: e.target.value })} /></div>
                <div className="sm:col-span-2"><Label htmlFor={`sv-exc-${i}`}>Описание карточки</Label><Textarea id={`sv-exc-${i}`} value={s.excerpt} onChange={(e) => update(i, { excerpt: e.target.value })} className="min-h-16" /></div>
                <div className="sm:col-span-2"><Label htmlFor={`sv-ov-${i}`}>Обзор (абзацы с новой строки)</Label><Textarea id={`sv-ov-${i}`} value={s.overview.join("\n\n")} onChange={(e) => update(i, { overview: e.target.value.split(/\n\n+/).filter(Boolean) })} className="min-h-24" /></div>
              </div>

              {/* Gallery */}
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-forest-600">Галерея</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {s.gallery.map((g, k) => (
                    <div key={k} className="rounded-2xl border border-forest-900/8 p-3">
                      <ImageField label={`Фото ${k + 1}`} value={g.image} onChange={(v) => update(i, { gallery: s.gallery.map((x, m) => (m === k ? { ...x, image: v } : x)) })} />
                      <div className="mt-2 flex items-center gap-2">
                        <Input aria-label="Подпись" value={g.label} onChange={(e) => update(i, { gallery: s.gallery.map((x, m) => (m === k ? { ...x, label: e.target.value } : x)) })} placeholder="Подпись" />
                        <DeleteButton label="Удалить фото" onClick={() => update(i, { gallery: s.gallery.filter((_, m) => m !== k) })} />
                      </div>
                    </div>
                  ))}
                </div>
                <button type="button" onClick={() => update(i, { gallery: [...s.gallery, { label: `Фото ${s.gallery.length + 1}` }] })} className="mt-2 text-xs font-medium text-forest-700 link-underline">＋ Добавить фото</button>
              </div>
            </div>
          </details>
        ))}
        {items.length === 0 && <p className="rounded-2xl border border-dashed border-forest-900/15 px-4 py-6 text-center text-sm text-ink/45">Услуг пока нет.</p>}
      </div>
      <AddButton onClick={addService}>Добавить услугу</AddButton>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Static photos                                                      */
/* ------------------------------------------------------------------ */

export function PhotosTab() {
  const [map, setMap] = useState<Record<string, string>>({});
  useEffect(() => setMap(getStaticImages()), []);
  const change = (id: string, dataUrl: string | undefined) => {
    setStaticImage(id, dataUrl);
    setMap(getStaticImages());
  };

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold tracking-tight text-ink">Фотографии сайта</h2>
      <p className="text-sm text-ink/55">
        Постоянные фото макета (не из проектов/команды/прессы). У каждого — уникальный номер и расположение.
      </p>
      <div className="space-y-3">
        {photoSlots.map((slot) => (
          <div key={slot.id} className="flex flex-col gap-3 rounded-3xl border border-forest-900/8 p-4 sm:flex-row sm:items-center">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest-900 text-sm font-semibold text-sand-50">
              {slot.number}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-ink">{slot.label}</p>
              <p className="truncate text-xs text-ink/50">{slot.location}</p>
            </div>
            <div className="w-full sm:w-52">
              <ImageField label="" value={map[slot.id]} aspect="aspect-[16/10]" onChange={(v) => change(slot.id, v)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Password                                                           */
/* ------------------------------------------------------------------ */

export function PasswordTab() {
  const [newPassword, setNewPassword] = useState("");
  const [saved, setSaved] = useState(false);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold tracking-tight text-ink">Сменить пароль</h2>
      <form
        onSubmit={(e) => { e.preventDefault(); if (!newPassword.trim()) return; persistPassword(newPassword.trim()); setNewPassword(""); setSaved(true); setTimeout(() => setSaved(false), 2500); }}
        className="flex flex-wrap items-end gap-3"
      >
        <div className="min-w-[12rem] flex-1">
          <Label htmlFor="np">Новый пароль</Label>
          <Input id="np" type="text" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Новый пароль" />
        </div>
        <button type="submit" className="inline-flex items-center rounded-full border border-forest-900/15 px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-forest-900/40 hover:bg-forest-50">
          Сохранить пароль
        </button>
        {saved && <span className="text-sm font-medium text-forest-600">✓ Сохранено</span>}
      </form>
      <p className="text-xs text-ink/40">Пароль по умолчанию: {DEFAULT_PASSWORD}. Всё хранится в этом браузере (localStorage) — это демо-панель без сервера.</p>
    </div>
  );
}
