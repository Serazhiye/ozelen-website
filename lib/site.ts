/**
 * Центральная конфигурация сайта: данные о компании, контакты и навигация.
 */

export const site = {
  name: "Nord Botanic",
  legalName: "Nord Botanic",
  tagline: "Создаём зелёные города.",
  description:
    "Nord Botanic — городское озеленение, зелёная инфраструктура и собственный тепличный комплекс с круглогодичной гидропоникой в Акмолинской области.",
  url: "https://nordbotanic.kz",
  founded: 2021,
  contact: {
    phone: "+7 777 034 4857",
    phoneHref: "tel:+77770344857",
    whatsapp: "+7 777 034 4857",
    whatsappHref: "https://wa.me/77770344857",
    instagram: "@nord_botanic",
    instagramHref: "https://instagram.com/nord_botanic",
  },
  office: {
    label: "Офис",
    lines: ["ул. Валиханова, 1/3", "Кокшетау, Акмолинская область"],
    hours: [
      { day: "Пн – Пт", time: "09:00 – 18:00" },
      { day: "Суббота", time: "10:00 – 15:00" },
      { day: "Воскресенье", time: "Выходной" },
    ],
  },
  greenhouse: {
    label: "Тепличный комплекс",
    lines: ["пос. Станционный", "Акмолинская область"],
  },
  social: [{ label: "Instagram", href: "https://instagram.com/nord_botanic" }],
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
  { value: 11, suffix: "+", label: "Реализованных проектов" },
  { value: 5, suffix: " лет", label: "На рынке" },
  { value: 150, suffix: " тыс.+", label: "Высажено растений" },
  { value: 60, suffix: "+", label: "Специалистов" },
] as const;
