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
            eyebrow="Пресса"
            title="О нас пишут СМИ."
            intro="Публикации деловых и отраслевых изданий о проектах, экологии и достижениях Nord Botanic."
            className="max-w-2xl"
          />
          <div className="shrink-0">
            <Button href="/news" variant="secondary" withArrow>
              Вся пресса
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
