import type { Metadata } from "next";
import { ProjectDetail } from "@/components/projects/ProjectDetail";
import { projects as defaultProjects } from "@/lib/data/projects";

// Pre-render the default projects; admin-added slugs render on demand.
export function generateStaticParams() {
  return defaultProjects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = true;

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = defaultProjects.find((p) => p.slug === params.slug);
  if (!project) return { title: "Проект" };
  return { title: project.title, description: project.summary };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  return <ProjectDetail slug={params.slug} />;
}
