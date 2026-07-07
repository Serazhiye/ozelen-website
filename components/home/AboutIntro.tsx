import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Placeholder } from "@/components/ui/Placeholder";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const pillars = [
  { title: "Mission", body: "To engineer the green infrastructure that makes cities cooler, healthier and more resilient." },
  { title: "Vision", body: "A generation of cities where nature and infrastructure are designed as one system." },
  { title: "Values", body: "Precision, stewardship and integrity on every project, at every scale." },
];

export function AboutIntro() {
  return (
    <section className="bg-paper py-section">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Left: copy */}
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow="Who we are"
              title="A landscape contractor with the discipline of an engineering firm."
              intro="For nearly two decades, GreenSphere has delivered the parks, boulevards and green systems that shape how cities feel — combining landscape craft with civil-engineering rigour."
            />

            <Reveal delay={0.15}>
              <div className="mt-10 space-y-6">
                {pillars.map((p) => (
                  <div key={p.title} className="flex gap-5">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-forest-500" />
                    <div>
                      <h3 className="text-base font-semibold text-ink">{p.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink/55">{p.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10">
                <Button href="/about" variant="secondary" withArrow>
                  Read More About Us
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Right: image + inset stat */}
          <div className="lg:col-span-6">
            <Reveal delay={0.1} className="relative">
              <Placeholder label="Team on Site" ratio="portrait" rounded="rounded-4xl" />
              <div className="absolute -bottom-6 -left-6 hidden rounded-3xl border border-forest-900/8 bg-paper p-7 shadow-lift sm:block">
                <p className="text-4xl font-semibold tracking-tight text-forest-800">18</p>
                <p className="mt-1 max-w-[9rem] text-sm text-ink/55">Years engineering greener cities</p>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
