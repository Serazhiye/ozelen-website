import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { articles } from "@/lib/data/news";

export function NewsPreview() {
  const latest = articles.slice(0, 3);

  return (
    <section className="bg-mist py-section">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Newsroom"
            title="Insight from the field."
            intro="Engineering notes, project milestones and thinking on the future of urban green infrastructure."
            className="max-w-2xl"
          />
          <div className="shrink-0">
            <Button href="/news" variant="secondary" withArrow>
              All News
            </Button>
          </div>
        </div>

        <RevealGroup className="mt-14 grid gap-8 md:grid-cols-3">
          {latest.map((article) => (
            <RevealItem key={article.slug}>
              <ArticleCard article={article} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
