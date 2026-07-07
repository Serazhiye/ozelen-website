import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { services } from "@/lib/data/services";

export function ServicesGrid() {
  return (
    <section className="bg-mist py-section">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="What we do"
            title="Full-service green infrastructure, engineered end to end."
            intro="Eight integrated disciplines, delivered by one accountable team — from master planning and construction to long-term stewardship."
            className="max-w-2xl"
          />
          <div className="shrink-0">
            <Button href="/services" variant="secondary" withArrow>
              All Services
            </Button>
          </div>
        </div>

        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <RevealItem key={service.slug}>
              <ServiceCard service={service} className="h-full" />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
