import Link from "next/link";
import type { Service } from "@/lib/data/services";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { cn } from "@/lib/utils";

/** Premium service card with hover lift, icon and arrow affordance. */
export function ServiceCard({ service, className }: { service: Service; className?: string }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-forest-900/8 bg-paper p-8 shadow-subtle transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:border-forest-900/15 hover:shadow-lift",
        className,
      )}
    >
      {/* Hover wash */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-forest-50/0 to-forest-50 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-forest-50 transition-all duration-500 ease-out-expo group-hover:-rotate-6 group-hover:scale-105 group-hover:bg-forest-100">
          <ServiceIcon emoji={service.icon} className="text-3xl transition-transform duration-500 ease-out-expo group-hover:scale-110" />
        </span>
        <h3 className="mt-7 text-xl font-semibold tracking-tight text-ink">{service.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink/55">{service.excerpt}</p>
      </div>

      <div className="relative mt-8 flex items-center gap-2 text-sm font-medium text-forest-700">
        <span>Подробнее об услуге</span>
        <svg
          className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1.5"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </Link>
  );
}
