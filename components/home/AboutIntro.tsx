import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { StaticPhoto } from "@/components/photos/StaticPhoto";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const pillars = [
  { title: "Миссия", body: "Создавать зелёную инфраструктуру, делающую города прохладнее, здоровее и устойчивее." },
  { title: "Видение", body: "Поколение городов, где природа и инфраструктура спроектированы как единая система." },
  { title: "Ценности", body: "Точность, забота и честность на каждом проекте и в любом масштабе." },
];

export function AboutIntro() {
  return (
    <section className="bg-paper py-section">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Left: copy */}
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow="Кто мы"
              title="Ландшафтный подрядчик с дисциплиной инженерной компании."
              intro="Почти два десятилетия Nord Botanic создаёт парки, бульвары и зелёные системы, определяющие облик городов, — сочетая ландшафтное мастерство со строгостью гражданской инженерии."
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
                  Подробнее о компании
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Right: image + inset stat */}
          <div className="lg:col-span-6">
            <Reveal delay={0.1} className="relative">
              <StaticPhoto id="home-portrait" ratio="portrait" rounded="rounded-4xl" />
              <div className="absolute -bottom-6 -left-6 hidden rounded-3xl border border-forest-900/8 bg-paper p-7 shadow-lift sm:block">
                <p className="text-4xl font-semibold tracking-tight text-forest-800">5</p>
                <p className="mt-1 max-w-[9rem] text-sm text-ink/55">лет создаём зелёные города</p>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
