import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/sections/CTASection";
import { StaticGallery } from "@/components/photos/StaticPhoto";
import { Counter } from "@/components/motion/Counter";
import { TeamGrid } from "@/components/team/TeamGrid";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { companyStats } from "@/lib/site";
import { awards, certifications, milestones } from "@/lib/data/company";

export const metadata: Metadata = {
  title: "О компании",
  description:
    "Nord Botanic сочетает ландшафтное мастерство с дисциплиной гражданской инженерии, создавая зелёную инфраструктуру городского масштаба для государства, застройщиков и институтов.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="О Nord Botanic"
        title="Мы создаём ландшафты, по которым судят о городах."
        intro="Основанная в 2021 году, Nord Botanic занимается городским озеленением, зелёной инфраструктурой и собственным тепличным производством — более 11 реализованных проектов, выполненных с дисциплиной инженерной компании и глазом ландшафтной студии."
        crumbs={[{ label: "Главная", href: "/" }, { label: "О компании" }]}
        meta={[
          { label: "Основана", value: "2021" },
          { label: "Проектов", value: "11+" },
          { label: "Специалистов", value: "60+" },
          { label: "Растений", value: "150 000+" },
        ]}
      />

      {/* Mission / Vision */}
      <section className="bg-paper py-section">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Наша цель"
                title="Строим зелёные системы, делающие города пригодными для жизни."
              />
            </div>
            <div className="space-y-10 lg:col-span-7">
              <Reveal>
                <div>
                  <h3 className="text-sm font-medium uppercase tracking-[0.16em] text-forest-600">Миссия</h3>
                  <p className="mt-4 text-2xl font-medium leading-snug tracking-tight text-ink text-balance">
                    Создавать зелёную инфраструктуру, делающую города прохладнее, здоровее и устойчивее — в масштабе и на уровне, недоступных другим.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <div>
                  <h3 className="text-sm font-medium uppercase tracking-[0.16em] text-forest-600">Видение</h3>
                  <p className="mt-4 text-2xl font-medium leading-snug tracking-tight text-ink text-balance">
                    Поколение городов, где природа и инфраструктура спроектированы, построены и обслуживаются как единая система.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Statistics */}
      <section className="bg-forest-950 py-section text-sand-50">
        <Container>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-5">
            {companyStats.map((stat) => (
              <Reveal key={stat.label}>
                <div>
                  <dd className="text-5xl font-semibold tracking-tight sm:text-6xl">
                    <Counter value={stat.value} suffix={stat.suffix} decimals={0} />
                  </dd>
                  <dt className="mt-3 text-sm text-sand-100/60">{stat.label}</dt>
                </div>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      {/* History timeline */}
      <section className="bg-paper py-section">
        <Container>
          <SectionHeading
            eyebrow="Наша история"
            title="Почти два десятилетия работы в городском масштабе."
            intro="Каждая веха — шаг от бригады озеленения к интегрированному инженеру зелёной инфраструктуры."
            className="max-w-2xl"
          />
          <div className="mt-16">
            <RevealGroup className="space-y-0">
              {milestones.map((m) => (
                <RevealItem key={m.year}>
                  <div className="group grid grid-cols-1 gap-4 border-t border-forest-900/10 py-8 sm:grid-cols-12 sm:gap-8">
                    <div className="sm:col-span-2">
                      <span className="text-2xl font-semibold tracking-tight text-forest-700">{m.year}</span>
                    </div>
                    <div className="sm:col-span-4">
                      <h3 className="text-lg font-semibold text-ink">{m.title}</h3>
                    </div>
                    <div className="sm:col-span-6">
                      <p className="text-base leading-relaxed text-ink/55">{m.description}</p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </section>

      {/* Leadership */}
      <section className="bg-mist py-section">
        <Container>
          <SectionHeading
            eyebrow="Руководство"
            title="Люди, отвечающие за каждый проект."
            intro="Междисциплинарный совет, объединяющий инженерию, ландшафт, экологию и операции."
            className="max-w-2xl"
          />
          <TeamGrid columns={3} />
        </Container>
      </section>

      {/* Awards & Certifications */}
      <section className="bg-paper py-section">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <SectionHeading eyebrow="Признание" title="Награды и достижения." />
              <RevealGroup className="mt-12 space-y-0">
                {awards.map((a) => (
                  <RevealItem key={a.title}>
                    <div className="flex items-baseline gap-6 border-t border-forest-900/10 py-5">
                      <span className="w-14 shrink-0 text-sm font-medium tabular-nums text-forest-600">{a.year}</span>
                      <div>
                        <h3 className="text-base font-semibold text-ink">{a.title}</h3>
                        <p className="text-sm text-ink/50">{a.body}</p>
                      </div>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
            <div className="lg:col-span-5">
              <SectionHeading eyebrow="Сертификаты" title="Аккредитации и соответствие." />
              <RevealGroup className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {certifications.map((c) => (
                  <RevealItem key={c}>
                    <div className="flex items-center gap-3 rounded-2xl border border-forest-900/8 bg-mist px-5 py-4">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-forest-900 text-sand-50">
                        <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-sm font-medium text-ink">{c}</span>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </Container>
      </section>

      {/* Office gallery */}
      <section className="bg-mist py-section">
        <Container>
          <SectionHeading
            eyebrow="Наш мир"
            title="Внутри Nord Botanic."
            className="max-w-2xl"
          />
          <div className="mt-14">
            <StaticGallery prefix="about-office" columns={3} />
          </div>
        </Container>
      </section>

      <CTASection eyebrow="Работать с нами" title="Готовы построить что-то долговечное?" />
    </>
  );
}
