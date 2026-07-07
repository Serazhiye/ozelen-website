/**
 * Центральная конфигурация сайта: данные о компании, контакты и навигация.
 * Всё «обрамление» (навигация, футер, контакты) берётся отсюда,
 * чтобы сайт оставался единообразным и легко перенастраивался.
 */

export const site = {
  name: "Nord Botanic",
  legalName: "Nord Botanic",
  tagline: "Создаём зелёные города.",
  description:
    "Nord Botanic — городское озеленение и зелёная инфраструктура: парки, бульвары, полив, экологическое восстановление и собственный тепличный комплекс для государственных, коммерческих и институциональных заказчиков.",
  url: "https://nordbotanic.kz",
  founded: 2007,
  contact: {
    phone: "+7 (777) 123-45-67",
    phoneHref: "tel:+77771234567",
    whatsapp: "+7 (777) 123-45-67",
    whatsappHref: "https://wa.me/77771234567",
    email: "info@nordbotanic.kz",
    emailHref: "mailto:info@nordbotanic.kz",
    emergency: "+7 (777) 999-00-11",
    emergencyHref: "tel:+77779990011",
  },
  office: {
    label: "Головной офис",
    lines: ["ул. Валиханова, 1/3", "Кокшетау, Акмолинская область"],
    hours: [
      { day: "Пн – Пт", time: "08:30 – 18:30" },
      { day: "Суббота", time: "10:00 – 15:00" },
      { day: "Воскресенье", time: "Выходной" },
    ],
  },
  greenhouse: {
    label: "Тепличный комплекс",
    lines: ["пос. Станционный", "Кокшетауская городская администрация", "Акмолинская область"],
  },
  social: [
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Instagram", href: "https://instagram.com" },
    { label: "YouTube", href: "https://youtube.com" },
    { label: "Behance", href: "https://behance.net" },
  ],
} as const;

export type NavItem = {
  label: string;
  href: string;
};

export const mainNav: NavItem[] = [
  { label: "О компании", href: "/about" },
  { label: "Услуги", href: "/services" },
  { label: "Проекты", href: "/projects" },
  { label: "Теплица", href: "/greenhouse" },
  { label: "Пресса", href: "/news" },
  { label: "Карьера", href: "/careers" },
  { label: "Контакты", href: "/contact" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Компания",
    items: [
      { label: "О компании", href: "/about" },
      { label: "Карьера", href: "/careers" },
      { label: "Пресса", href: "/news" },
      { label: "Контакты", href: "/contact" },
    ],
  },
  {
    title: "Услуги",
    items: [
      { label: "Городское озеленение", href: "/services/urban-landscaping" },
      { label: "Строительство парков", href: "/services/park-construction" },
      { label: "Зелёная инфраструктура", href: "/services/green-infrastructure" },
      { label: "Автоматический полив", href: "/services/automatic-irrigation" },
    ],
  },
  {
    title: "Проекты",
    items: [
      { label: "Центральный городской парк", href: "/projects/central-metropolitan-park" },
      { label: "Столичный набережный бульвар", href: "/projects/capital-riverside-boulevard" },
      { label: "Зелёная зона аэропорта", href: "/projects/international-airport-green-zone" },
      { label: "Тепличный комплекс", href: "/greenhouse" },
    ],
  },
];

export const companyStats = [
  { value: 430, suffix: "+", label: "Реализованных проектов" },
  { value: 18, suffix: " лет", label: "Опыта работы" },
  { value: 1.2, suffix: " млн", label: "Высажено деревьев", decimals: 1 },
  { value: 350, suffix: "+", label: "Специалистов" },
] as const;
