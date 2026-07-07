import Link from "next/link";
import type { Project } from "@/lib/data/projects";
import { Placeholder } from "@/components/ui/Placeholder";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  className?: string;
  /** Placeholder aspect ratio override for masonry layouts. */
  ratio?: "video" | "portrait" | "wide" | "square" | "ultrawide";
};

/** Featured project card — placeholder image with metadata footer. */
export function ProjectCard({ project, className, ratio = "video" }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn("group block", className)}
    >
      <div className="relative overflow-hidden rounded-3xl">
        <Placeholder
          label={`${project.title} — Aerial`}
          ratio={ratio}
          dark
          rounded="rounded-3xl"
          className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
        />
        {/* Overlay gradient + hover reveal */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-950/70 via-forest-950/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <span className="inline-flex rounded-full bg-sand-50/90 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.14em] text-forest-900">
            {project.category}
          </span>
        </div>
        <div className="absolute right-5 top-5 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-sand-50 text-forest-900 opacity-0 transition-all duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100">
          <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M4 12L12 4M6 4h6v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-ink transition-colors group-hover:text-forest-700">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-ink/50">
            {project.location} · {project.year}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-sm font-medium text-ink">{project.area}</p>
          <p className="text-xs text-ink/45">Area</p>
        </div>
      </div>
    </Link>
  );
}
