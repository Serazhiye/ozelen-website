import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { ServicesList } from "@/components/services/ServicesList";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Услуги",
  description:
    "Интегрированные дисциплины зелёной инфраструктуры — от городского озеленения и строительства парков до умного полива и обслуживания.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Наши услуги"
        title="Зелёная инфраструктура, рассчитанная от и до."
        intro="Дисциплины от одной ответственной команды — спроектированы, построены и обслуживаются по стандартам городской инфраструктуры."
        crumbs={[{ label: "Главная", href: "/" }, { label: "Услуги" }]}
      />

      <section className="bg-paper py-section">
        <Container>
          <ServicesList />
        </Container>
      </section>

      <CTASection />
    </>
  );
}
