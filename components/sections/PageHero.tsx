import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

type Crumb = { label: string; href?: string };

type PageHeroProps = {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  crumbs?: Crumb[];
  /** Optional key/value meta shown at the base of the hero. */
  meta?: { label: string; value: string }[];
  children?: React.ReactNode;
  size?: "md" | "lg";
};

/**
 * Dark forest hero used at the top of every inner page.
 * Establishes the transparent-navbar context and a consistent premium band.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  meta,
  children,
  size = "md",
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-forest-950 text-sand-50">
      {/* Ambient background */}
      <div className="placeholder-surface--dark absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-40 top-0 h-[36rem] w-[36rem] rounded-full bg-forest-600/20 blur-3xl" aria-hidden="true" />

      <Container
        className={cn(
          "relative pb-16 pt-36 lg:pb-24",
          size === "lg" ? "lg:pt-52" : "lg:pt-44",
        )}
      >
        {crumbs && (
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-2 text-xs text-sand-100/50">
                {crumbs.map((c, i) => (
                  <li key={c.label} className="flex items-center gap-2">
                    {c.href ? (
                      <Link href={c.href} className="transition-colors hover:text-sand-50">
                        {c.label}
                      </Link>
                    ) : (
                      <span className="text-sand-100/80">{c.label}</span>
                    )}
                    {i < crumbs.length - 1 && <span aria-hidden="true">/</span>}
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>
        )}

        <Reveal delay={0.05}>
          <span className="eyebrow text-sand-200 before:bg-sand-300/50">{eyebrow}</span>
        </Reveal>

        <Reveal delay={0.1}>
          <h1
            className={cn(
              "mt-6 max-w-4xl font-display font-semibold text-balance",
              size === "lg" ? "text-display-lg" : "text-display-md",
            )}
          >
            {title}
          </h1>
        </Reveal>

        {intro && (
          <Reveal delay={0.15}>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-sand-100/70 text-pretty">
              {intro}
            </p>
          </Reveal>
        )}

        {children && <Reveal delay={0.2}>{children}</Reveal>}

        {meta && (
          <Reveal delay={0.25}>
            <dl className="mt-14 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-sand-100/15 pt-10 sm:grid-cols-4">
              {meta.map((m) => (
                <div key={m.label}>
                  <dt className="text-xs uppercase tracking-[0.16em] text-sand-100/50">{m.label}</dt>
                  <dd className="mt-2 text-xl font-semibold text-sand-50">{m.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
