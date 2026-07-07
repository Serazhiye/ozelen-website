import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Placeholder } from "@/components/ui/Placeholder";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal } from "@/components/motion/Reveal";
import { articles } from "@/lib/data/news";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) return { title: "Article Not Found" };
  return { title: article.title, description: article.excerpt };
}

/** Editorial body — placeholder copy structured like a real long-form article. */
const body = [
  "Cities are entering a decade in which green infrastructure is no longer an amenity but a requirement. Heat, flooding and biodiversity loss have moved landscape from the end of the project programme to the heart of it — and that shift changes how these systems must be designed, built and maintained.",
  "The projects that succeed treat planting, water and structure as a single engineered system. When those disciplines are coordinated from the first survey, the landscape performs; when they are bolted on at the end, it struggles within a few seasons.",
  "This is the thinking behind every scheme we deliver: measurable outcomes, honest reporting, and detailing that holds up for decades rather than a single opening ceremony.",
];

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) notFound();

  const more = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <article>
        {/* Header */}
        <header className="bg-forest-950 pb-16 pt-36 text-sand-50 lg:pb-20 lg:pt-44">
          <Container>
            <Reveal>
              <nav aria-label="Breadcrumb" className="mb-8">
                <ol className="flex flex-wrap items-center gap-2 text-xs text-sand-100/50">
                  <li><Link href="/" className="hover:text-sand-50">Home</Link></li>
                  <li aria-hidden="true">/</li>
                  <li><Link href="/news" className="hover:text-sand-50">News</Link></li>
                  <li aria-hidden="true">/</li>
                  <li className="text-sand-100/80">{article.category}</li>
                </ol>
              </nav>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="flex items-center gap-3 text-sm text-sand-100/60">
                <span className="font-medium uppercase tracking-[0.16em] text-sand-200">{article.category}</span>
                <span aria-hidden="true">·</span>
                <span>{article.date}</span>
                <span aria-hidden="true">·</span>
                <span>{article.readTime}</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-6 max-w-4xl font-display text-display-md font-semibold text-balance">{article.title}</h1>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 text-sm text-sand-100/60">By {article.author}</p>
            </Reveal>
          </Container>
        </header>

        {/* Lead image */}
        <div className="bg-paper pt-12 lg:pt-16">
          <Container>
            <Reveal>
              <Placeholder label={`${article.category} — Feature`} ratio="ultrawide" rounded="rounded-4xl" />
            </Reveal>
          </Container>
        </div>

        {/* Body */}
        <div className="bg-paper py-section">
          <Container>
            <div className="mx-auto max-w-2xl">
              <p className="text-xl font-medium leading-relaxed text-ink text-pretty">{article.excerpt}</p>
              <div className="mt-8 space-y-6 text-lg leading-relaxed text-ink/70">
                {body.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              <blockquote className="my-10 border-l-2 border-forest-500 pl-6 text-2xl font-medium leading-snug tracking-tight text-ink text-balance">
                “The landscape that lasts is the one that was engineered, not decorated.”
              </blockquote>
              <div className="space-y-6 text-lg leading-relaxed text-ink/70">
                {body.map((para, i) => (
                  <p key={`b-${i}`}>{para}</p>
                ))}
              </div>

              <div className="mt-12 border-t border-forest-900/10 pt-8">
                <Link href="/news" className="text-sm font-medium text-forest-700 link-underline">
                  ← Back to newsroom
                </Link>
              </div>
            </div>
          </Container>
        </div>
      </article>

      {/* More articles */}
      <section className="bg-mist py-section">
        <Container>
          <h2 className="text-2xl font-semibold tracking-tight text-ink">More from the newsroom</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {more.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
