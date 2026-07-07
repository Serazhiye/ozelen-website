/**
 * Central site configuration: company facts, contact details, and navigation.
 * Everything user-facing that is "chrome" (nav, footer, contact) reads from here
 * so the site stays consistent and is trivial to rebrand.
 */

export const site = {
  name: "GreenSphere",
  legalName: "GreenSphere Infrastructure",
  tagline: "Engineering Greener Cities.",
  description:
    "GreenSphere Infrastructure delivers city-scale landscaping and green infrastructure — parks, boulevards, irrigation and environmental restoration — for governments, developers and institutions.",
  url: "https://greensphere.example",
  founded: 2007,
  contact: {
    phone: "+7 (777) 123-45-67",
    phoneHref: "tel:+77771234567",
    whatsapp: "+7 (777) 123-45-67",
    whatsappHref: "https://wa.me/77771234567",
    email: "info@greensphere.com",
    emailHref: "mailto:info@greensphere.com",
    emergency: "+7 (777) 999-00-11",
    emergencyHref: "tel:+77779990011",
  },
  office: {
    label: "Head Office",
    lines: ["GreenSphere Tower, 14 Prospect Avenue", "Astana 010000, Kazakhstan"],
    hours: [
      { day: "Monday – Friday", time: "08:30 – 18:30" },
      { day: "Saturday", time: "10:00 – 15:00" },
      { day: "Sunday", time: "Closed" },
    ],
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
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "News", href: "/news" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Company",
    items: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "News", href: "/news" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    items: [
      { label: "Urban Landscaping", href: "/services/urban-landscaping" },
      { label: "Park Construction", href: "/services/park-construction" },
      { label: "Green Infrastructure", href: "/services/green-infrastructure" },
      { label: "Automatic Irrigation", href: "/services/automatic-irrigation" },
    ],
  },
  {
    title: "Projects",
    items: [
      { label: "Central Metropolitan Park", href: "/projects/central-metropolitan-park" },
      { label: "Capital Riverside Boulevard", href: "/projects/capital-riverside-boulevard" },
      { label: "Airport Green Zone", href: "/projects/international-airport-green-zone" },
      { label: "All Projects", href: "/projects" },
    ],
  },
];

export const companyStats = [
  { value: 430, suffix: "+", label: "Completed Projects" },
  { value: 18, suffix: " yrs", label: "Of Experience" },
  { value: 1.2, suffix: "M", label: "Trees Planted", decimals: 1 },
  { value: 350, suffix: "+", label: "Professionals" },
] as const;
