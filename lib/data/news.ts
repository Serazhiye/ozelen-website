export type Article = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  author: string;
  featured?: boolean;
};

export const newsCategories = [
  "All",
  "Projects",
  "Sustainability",
  "Company",
  "Engineering",
  "Awards",
] as const;

export const articles: Article[] = [
  {
    slug: "central-metropolitan-park-opens",
    title: "Central Metropolitan Park opens to four million annual visitors",
    category: "Projects",
    date: "June 18, 2026",
    readTime: "6 min read",
    author: "GreenSphere Newsroom",
    featured: true,
    excerpt:
      "Our largest single park to date reclaims 42 hectares of former rail land as a new civic and ecological heart for the capital — here is how it came together.",
  },
  {
    slug: "engineering-street-trees-that-survive",
    title: "Engineering street trees that actually survive the city",
    category: "Engineering",
    date: "May 30, 2026",
    readTime: "8 min read",
    author: "Dr. Aliya Nurlanova",
    excerpt:
      "Most urban trees die young because of what happens below the paving. A look at the structural soil and irrigation systems that change the odds.",
  },
  {
    slug: "biodiversity-net-gain-at-scale",
    title: "Delivering biodiversity net gain at city scale",
    category: "Sustainability",
    date: "May 12, 2026",
    readTime: "5 min read",
    author: "Marcus Feldt",
    excerpt:
      "How we design and measure habitat so that large infrastructure projects leave nature measurably better than they found it.",
  },
  {
    slug: "greensphere-wins-landscape-award",
    title: "GreenSphere named Green Infrastructure Contractor of the Year",
    category: "Awards",
    date: "April 24, 2026",
    readTime: "3 min read",
    author: "GreenSphere Newsroom",
    excerpt:
      "The regional infrastructure awards recognised our Riverside Boulevard for excellence in engineering and environmental performance.",
  },
  {
    slug: "smart-irrigation-cuts-water-40-percent",
    title: "Smart irrigation cuts client water use by up to 42%",
    category: "Engineering",
    date: "April 3, 2026",
    readTime: "6 min read",
    author: "Dr. Aliya Nurlanova",
    excerpt:
      "Central control, weather data and soil sensing are reshaping how large landscapes are watered. The results, measured across 900 zones.",
  },
  {
    slug: "restoring-the-river-corridor",
    title: "Restoring 36 kilometres of degraded river corridor",
    category: "Sustainability",
    date: "March 15, 2026",
    readTime: "7 min read",
    author: "Marcus Feldt",
    excerpt:
      "A multi-year programme is bringing eroded, contaminated riverbanks back to ecological function — and reopening them to the public.",
  },
  {
    slug: "greensphere-expands-arboriculture-team",
    title: "GreenSphere expands certified arboriculture division",
    category: "Company",
    date: "February 28, 2026",
    readTime: "4 min read",
    author: "GreenSphere Newsroom",
    excerpt:
      "Growing long-term maintenance demand drives a major expansion of our certified tree-care and asset-management teams.",
  },
  {
    slug: "designing-for-extreme-climate",
    title: "Designing landscapes for extreme continental climates",
    category: "Engineering",
    date: "February 9, 2026",
    readTime: "6 min read",
    author: "Dr. Aliya Nurlanova",
    excerpt:
      "From −35°C winters to summer drought, resilient species selection and detailing are what keep civic landscapes alive for decades.",
  },
  {
    slug: "airport-green-zone-milestone",
    title: "Airport Green Zone reaches practical completion",
    category: "Projects",
    date: "January 22, 2026",
    readTime: "5 min read",
    author: "GreenSphere Newsroom",
    excerpt:
      "A 58-hectare arrival landscape delivered inside a live airfield — balancing aviation safety with a world-class sense of arrival.",
  },
];

export function getFeaturedArticle(): Article {
  return articles.find((a) => a.featured) ?? articles[0];
}
