import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { Placeholder } from "@/components/ui/Placeholder";
import { NewsExplorer } from "@/components/news/NewsExplorer";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal } from "@/components/motion/Reveal";
import { getFeaturedArticle } from "@/lib/data/news";

export const metadata: Metadata = {
  title: "Пресса",
  description:
    "СМИ о Nord Botanic: публикации деловых и отраслевых изданий о проектах, экологии, наградах и развитии компании.",
};

export default function NewsPage() {
  const featured = getFeaturedArticle();

  return (
    <>
      <PageHero
        eyebrow="Пресса о нас"
        title="Что о Nord Botanic пишут СМИ."
        intro="Публикации сторонних изданий о наших проектах, инженерных решениях, экологии и наградах."
        crumbs={[{ label: "Главная", href: "/" }, { label: "Пресса" }]}
      />

      {/* Featured article */}
      <section className="bg-paper py-section">
        <Container>
          <Reveal>
            <a
              href={featured.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-14"
            >
              <div className="relative overflow-hidden rounded-4xl">
                <Placeholder
                  label={featured.source}
                  ratio="wide"
                  rounded="rounded-4xl"
                  className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
                />
                <span className="absolute left-5 top-5 rounded-full bg-sand-50/90 px-3 py-1 text-xs font-medium text-forest-900">
                  {featured.source}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="rounded-full bg-forest-50 px-3 py-1 font-medium uppercase tracking-[0.14em] text-forest-700">
                    Публикация
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
                  <span>Читать в источнике</span>
                  <svg className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M4 12L12 4M6 4h6v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </a>
          </Reveal>
        </Container>
      </section>

      {/* Explorer */}
      <section className="bg-mist py-section">
        <Container>
          <NewsExplorer />
        </Container>
      </section>

      <CTASection
        eyebrow="Медиазапросы"
        title="Пишете о нас?"
        intro="По вопросам прессы, интервью и материалов свяжитесь с нашим пресс-отделом — ответим оперативно."
      />
    </>
  );
}
