# GreenSphere Infrastructure

> Engineering Greener Cities.

An enterprise-grade, multi-page corporate website for **GreenSphere Infrastructure**, a city-scale urban landscaping and green-infrastructure corporation. Built to feel like the work of a premium digital agency — minimal, confident, precise.

## Tech Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** design system (deep forest / dark olive / warm sand palette)
- **Framer Motion** for scroll reveals, counters, mega menus and micro-interactions
- Fully **static (SSG)** — every page prerenders, ~135 kB First Load JS
- SEO: metadata, Open Graph, JSON-LD Organization schema, `sitemap.xml`, `robots.txt`
- Accessible: semantic HTML, keyboard navigation, ARIA, skip link, reduced-motion support

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve production build
npm run typecheck
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, stats, about, services, projects, why-us, process, industries, news, CTA |
| `/about` | History, mission/vision, values, safety, leadership, awards, certifications, gallery |
| `/services` | Services index + shared methodology |
| `/services/[slug]` | 8 service pages — overview, benefits, process, equipment, gallery, FAQ, related |
| `/projects` | Filterable masonry portfolio |
| `/projects/[slug]` | 6 project pages — overview, stats, challenges/solutions, before/after, timeline, gallery |
| `/news` + `/news/[slug]` | Newsroom with search, categories, pagination + article pages |
| `/careers` | Benefits, culture, open positions, application form |
| `/contact` | Channels, inquiry form, office details, departments, map |
| `not-found` | Branded 404 |

## Architecture

```
app/                 # routes (App Router) + layout, sitemap, robots
components/
  cards/             # ServiceCard, ProjectCard, ArticleCard
  forms/             # InquiryForm, ApplicationForm (client)
  home/              # home page sections
  layout/            # Navbar, Footer, Logo
  motion/            # Reveal, RevealGroup, Counter (client primitives)
  news/ projects/    # interactive explorers (client)
  sections/          # PageHero, CTASection, Gallery (reused across pages)
  ui/                # Container, Button, Placeholder, SectionHeading, Accordion, Field…
lib/
  data/              # services, projects, news, company content (single source of truth)
  site.ts            # company facts, navigation, contact
```

## Placeholders

All imagery uses the branded `<Placeholder>` component — subtle gradient surfaces with a
descriptive caption that **preserve the final layout**. Drop real photography in by replacing
`Placeholder` usages with `next/image`.
