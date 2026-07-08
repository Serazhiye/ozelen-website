import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { NewsExplorer } from "@/components/news/NewsExplorer";
import { PressFeatured } from "@/components/news/PressFeatured";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Пресса",
  description:
    "СМИ о Nord Botanic: публикации деловых и отраслевых изданий о проектах, экологии, наградах и развитии компании.",
};

export default function NewsPage() {
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
          <PressFeatured />
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
