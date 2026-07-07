import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { Glow } from "@/components/motion/Glow";
import { services } from "@/lib/data/services";

export function ServicesGrid() {
  return (
    <section className="relative overflow-hidden bg-mist py-section">
      <Glow className="left-[-8rem] top-[-6rem] h-[28rem] w-[28rem]" />
      <Glow className="bottom-[-8rem] right-[-6rem] h-[24rem] w-[24rem]" color="sand" delay={2} />
      <Container className="relative">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Чем мы занимаемся"
            title="Зелёная инфраструктура полного цикла, инженерно рассчитанная от и до."
            intro="Восемь интегрированных дисциплин от одной ответственной команды — от мастер-планирования и строительства до долгосрочного обслуживания."
            className="max-w-2xl"
          />
          <div className="shrink-0">
            <Button href="/services" variant="secondary" withArrow>
              Все услуги
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
