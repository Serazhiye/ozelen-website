import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { whyGreenSphere } from "@/lib/data/company";

export function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-forest-950 py-section text-sand-50">
      <div className="placeholder-surface--dark absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-forest-500/15 blur-3xl" aria-hidden="true" />

      <Container className="relative">
        <SectionHeading
          dark
          eyebrow="Why GreenSphere"
          title="Six reasons the region's most demanding clients choose us."
          intro="We hold landscape to the same standard as any critical infrastructure — with the people, systems and accountability to prove it."
          className="max-w-2xl"
        />

        <RevealGroup className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {whyGreenSphere.map((item, i) => (
            <RevealItem key={item.title} className="group">
              <div className="flex items-baseline gap-4">
                <span className="text-sm font-medium tabular-nums text-sand-300/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="h-px flex-1 bg-sand-100/15 transition-colors duration-500 group-hover:bg-sand-300/40" />
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-sand-50">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-sand-100/60">{item.description}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
