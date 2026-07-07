import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { CTASection } from "@/components/sections/CTASection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { processSteps } from "@/lib/data/company";
import { services } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Eight integrated green-infrastructure disciplines — from urban landscaping and park construction to smart irrigation and long-term maintenance.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Green infrastructure, engineered end to end."
        intro="Eight disciplines delivered by one accountable team — designed, built and maintained to civic-infrastructure standards."
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      <section className="bg-paper py-section">
        <Container>
          <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <RevealItem key={service.slug}>
                <ServiceCard service={service} className="h-full" />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* Shared methodology */}
      <section className="bg-mist py-section">
        <Container>
          <SectionHeading
            eyebrow="How we deliver"
            title="One methodology behind every service."
            intro="Whatever the discipline, we follow the same disciplined path from analysis to lifelong stewardship."
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
