import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { ServicesList } from "@/components/services/ServicesList";
import { CTASection } from "@/components/sections/CTASection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { processSteps } from "@/lib/data/company";

export const metadata: Metadata = {
  title: "Услуги",
  description:
    "Восемь интегрированных дисциплин зелёной инфраструктуры — от городского озеленения и строительства парков до умного полива и обслуживания.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Наши услуги"
        title="Зелёная инфраструктура, рассчитанная от и до."
        intro="Восемь дисциплин от одной ответственной команды — спроектированы, построены и обслуживаются по стандартам городской инфраструктуры."
        crumbs={[{ label: "Главная", href: "/" }, { label: "Услуги" }]}
      />

      <section className="bg-paper py-section">
        <Container>
          <ServicesList />
        </Container>
      </section>

      {/* Shared methodology */}
      <section className="bg-mist py-section">
        <Container>
          <SectionHeading
            eyebrow="Как мы работаем"
            title="Одна методология за каждой услугой."
            intro="Какой бы ни была дисциплина, мы идём одним дисциплинированным путём — от анализа до пожизненного обслуживания."
            className="max-w-2xl"
          />
          <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step) => (
              <RevealItem key={step.number}>
                <div className="flex h-full gap-5 rounded-3xl border border-forest-900/8 bg-paper p-7">
                  <span className="text-lg font-semibold tabular-nums text-forest-600">{step.number}</span>
                  <div>
                    <h3 className="text-base font-semibold text-ink">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/55">{step.description}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
