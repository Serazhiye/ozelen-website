import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { Placeholder } from "@/components/ui/Placeholder";
import { NewsExplorer } from "@/components/news/NewsExplorer";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal } from "@/components/motion/Reveal";
import { getFeaturedArticle } from "@/lib/data/news";

export const metadata: Metadata = {
  title: "News",
  description:
    "Engineering notes, project milestones and thinking on the future of urban green infrastructure from the GreenSphere newsroom.",
};

export default function NewsPage() {
  const featured = getFeaturedArticle();

  return (
    <>
      <PageHero
        eyebrow="Newsroom"
        title="Field notes on greener cities."
        intro="Project milestones, engineering insight and perspective on the future of urban green infrastructure."
        crumbs={[{ label: "Home", href: "/" }, { label: "News" }]}
      />

      {/* Featured article */}
      <section className="bg-paper py-section">
        <Container>
          <Reveal>
            <Link
              href={`/news/${featured.slug}`}
              className="group grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-14"
            >
              <div className="overflow-hidden rounded-4xl">
                <Placeholder
                  label={featured.category}
                  ratio="wide"
                  rounded="rounded-4xl"
                  className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
                />
              </div>
              <div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="rounded-full bg-forest-50 px-3 py-1 font-medium uppercase tracking-[0.14em] text-forest-700">
                    Featured
                  </span>
                  <span className="text-ink/45">{featured.date}</span>
                </div>
                <h2 className="mt-6 font-display text-display-sm font-semibold tracking-tight text-ink text-balance transition-colors group-hover:text-forest-700">
                  {featured.title}
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/60 text-pretty">
                  {featured.excerpt}
                </p>
                <div className="mt-8 flex items-center gap-3 text-sm font-medium text-forest-700">
                  <span>Read article</span>
                  <svg className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </Link>
          </Reveal>
        </Container>
      </section>

      {/* Explorer */}
      <section className="bg-mist py-section">
        <Container>
          <NewsExplorer />
        </Container>
      </section>

      <CTASection eyebrow="Stay in touch" title="Want project updates in your inbox?" intro="Subscribe to the GreenSphere newsletter for launches, insight and open roles." />
    </>
  );
}
