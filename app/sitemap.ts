import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/lib/data/services";
import { projects } from "@/lib/data/projects";
import { articles } from "@/lib/data/news";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();

  const staticRoutes = ["", "/about", "/services", "/projects", "/news", "/careers", "/contact"].map(
    (path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    }),
  );

  const serviceRoutes = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const newsRoutes = articles.map((a) => ({
    url: `${base}/news/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...newsRoutes];
}
