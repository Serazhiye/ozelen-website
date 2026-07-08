import { greenhouse } from "@/lib/data/greenhouse";

/**
 * Registry of "static" photos — the fixed layout images that are NOT part of
 * the editable entities (projects / team / press / services). Each gets a
 * globally-unique number and a human location, and can be replaced from the
 * admin "Фото" section. Order here defines the numbering.
 */
export type PhotoSlot = { id: string; number: number; label: string; location: string };

const raw: { id: string; label: string; location: string }[] = [
  { id: "home-hero", label: "Главный кадр — съёмка с дрона", location: "Главная · фон в шапке" },
  { id: "home-portrait", label: "Команда на объекте", location: "Главная · блок «О компании»" },

  { id: "about-office-1", label: "Головной офис", location: "О компании · галерея «Внутри Nord Botanic»" },
  { id: "about-office-2", label: "Проектная студия", location: "О компании · галерея «Внутри Nord Botanic»" },
  { id: "about-office-3", label: "Инженерная лаборатория", location: "О компании · галерея «Внутри Nord Botanic»" },
  { id: "about-office-4", label: "Питомник-партнёр", location: "О компании · галерея «Внутри Nord Botanic»" },
  { id: "about-office-5", label: "Команда на объекте", location: "О компании · галерея «Внутри Nord Botanic»" },
  { id: "about-office-6", label: "Автопарк", location: "О компании · галерея «Внутри Nord Botanic»" },

  { id: "careers-culture-1", label: "Команда на объекте", location: "Карьера · галерея «Корпоративная культура»" },
  { id: "careers-culture-2", label: "Обсуждение проекта", location: "Карьера · галерея «Корпоративная культура»" },
  { id: "careers-culture-3", label: "Автопарк", location: "Карьера · галерея «Корпоративная культура»" },
  { id: "careers-culture-4", label: "Безопасность на площадке", location: "Карьера · галерея «Корпоративная культура»" },
  { id: "careers-culture-5", label: "Визит в питомник", location: "Карьера · галерея «Корпоративная культура»" },
  { id: "careers-culture-6", label: "Запуск проекта", location: "Карьера · галерея «Корпоративная культура»" },

  { id: "greenhouse-hero", label: "Тепличный комплекс — вид сверху", location: "Теплица · большое фото под шапкой" },
  ...greenhouse.gallery.map((label, i) => ({
    id: `greenhouse-gallery-${i + 1}`,
    label,
    location: "Теплица · галерея «Внутри комплекса»",
  })),
];

export const photoSlots: PhotoSlot[] = raw.map((s, i) => ({ ...s, number: i + 1 }));

const byId = new Map(photoSlots.map((s) => [s.id, s]));
export const getSlot = (id: string): PhotoSlot | undefined => byId.get(id);

/** Ordered slot ids for a gallery group (e.g. "about-office", "greenhouse-gallery"). */
export const slotsByPrefix = (prefix: string): PhotoSlot[] =>
  photoSlots.filter((s) => s.id.startsWith(prefix));
