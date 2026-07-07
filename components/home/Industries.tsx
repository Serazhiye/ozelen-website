import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { industries } from "@/lib/data/company";

export function Industries() {
  return (
    <section className="bg-paper py-section">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Отрасли, которым мы служим"
          title="Нам доверяют секторы, которые строят города."
          intro="От национального государства до частной застройки — наших заказчиков объединяет запрос на масштаб, соответствие нормам и долговечное качество."
          className="mx-auto"
        />

        <RevealGroup className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry) => (
            <RevealItem key={industry.title}>
              <div className="group flex h-full flex-col rounded-3xl border border-forest-900/8 bg-paper p-7 transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:border-forest-900/15 hover:shadow-lift">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-forest-50 transition-colors duration-500 group-hover:bg-forest-900">
                  <ServiceIcon emoji={industry.icon} className="text-2xl" />
                </span>
                <h3 className="mt-6 text-base font-semibold text-ink">{industry.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/55">{industry.description}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
