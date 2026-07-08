import Link from "next/link";
import { Placeholder } from "@/components/ui/Placeholder";
import { cn } from "@/lib/utils";

export type ServiceCardData = {
  slug: string;
  title: string;
  icon: string;
  excerpt: string;
  image?: string;
};

/**
 * Photo-backed service card: a darkened service photo (or branded dark
 * placeholder) with the emoji, title and excerpt overlaid.
 */
export function ServiceCard({ service, className }: { service: ServiceCardData; className?: string }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        "group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-3xl p-6 text-sand-50 shadow-subtle transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-lift",
        className,
      )}
    >
      {/* Background photo */}
      <Placeholder
        label={service.title}
        src={service.image}
        dark
        fill
        hideCaption
        rounded="rounded-3xl"
        className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.05]"
      />
      {/* Darkening overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/55 to-forest-950/15" aria-hidden="true" />

      {/* Content */}
      <div className="relative">
        <span className="text-3xl" role="img" aria-hidden="true">{service.icon}</span>
        <h3 className="mt-4 text-xl font-semibold tracking-tight">{service.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-sand-100/70">{service.excerpt}</p>
        <div className="mt-4 flex items-center gap-2 text-sm font-medium text-sand-50">
          <span>Подробнее</span>
          <svg className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
