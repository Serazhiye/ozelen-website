"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { usePress } from "@/components/admin/useStore";

export function NewsPreview() {
  const latest = usePress().slice(0, 3);

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
          {latest.map((article, i) => (
            <RevealItem key={article.id}>
              <ArticleCard article={article} number={i + 1} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
