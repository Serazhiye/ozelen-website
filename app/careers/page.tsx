import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaticGallery } from "@/components/photos/StaticPhoto";
import { TeamGrid } from "@/components/team/TeamGrid";
import { CareersPositions } from "@/components/careers/CareersPositions";
import { RevealGroup, RevealItem, Reveal } from "@/components/motion/Reveal";
import { careerBenefits } from "@/lib/data/company";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Карьера",
  description:
    "Присоединяйтесь к Nord Botanic. Стройте парки, бульвары и зелёные системы, определяющие облик городов, в команде, которая уважает мастерство и безопасность.",
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Карьера"
        title="Стройте ландшафты, которые переживут всех нас."
        intro="Присоединяйтесь к междисциплинарной команде инженеров, ландшафтных архитекторов, экологов и руководителей участков, формирующих будущее городской зелёной инфраструктуры."
        crumbs={[{ label: "Главная", href: "/" }, { label: "Карьера" }]}
      />

      {/* Why join (first section) */}
      <section className="bg-paper py-section">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Почему мы"
                title="Работа, на которую можно указать всю оставшуюся жизнь."
                intro="В Nord Botanic вы не просто выполняете задачи — вы помогаете строить парки и улицы, среди которых растёт целый город."
              />
            </div>
            <div className="lg:col-span-7">
              <RevealGroup className="grid gap-4 sm:grid-cols-2">
                {careerBenefits.map((b) => (
                  <RevealItem key={b.title}>
                    <div className="h-full rounded-3xl border border-forest-900/8 bg-mist p-7 shadow-subtle">
                      <h3 className="text-base font-semibold text-ink">{b.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink/55">{b.description}</p>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </Container>
      </section>

      {/* Team — placed right below the first section */}
      <section className="bg-mist py-section">
        <Container>
          <SectionHeading
            eyebrow="Наша команда"
            title="Люди, с которыми вы будете работать."
            intro="Междисциплинарная команда, объединяющая инженерию, ландшафт, экологию и операции."
            className="max-w-2xl"
          />
          <TeamGrid columns={3} />
        </Container>
      </section>

      {/* Culture gallery */}
      <section className="bg-paper py-section">
        <Container>
          <SectionHeading
            eyebrow="Корпоративная культура"
            title="Команда, уважающая мастерство."
            intro="Слаженная, безопасная и по-настоящему гордящаяся работой — посмотрите на жизнь внутри Nord Botanic."
            className="max-w-2xl"
          />
          <div className="mt-14">
            <StaticGallery prefix="careers-culture" columns={3} />
          </div>
        </Container>
      </section>

      {/* Open positions */}
      <section className="bg-mist py-section">
        <Container>
          <SectionHeading
            eyebrow="Открытые вакансии"
            title="Актуальные возможности."
            intro="Не нашли подходящую роль? Напишите нам в WhatsApp — мы всегда ищем выдающихся людей."
            className="max-w-2xl"
          />
          <CareersPositions />
        </Container>
      </section>

      {/* Apply → WhatsApp (no form) */}
      <section id="apply" className="scroll-mt-24 bg-paper py-section">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] bg-forest-950 px-8 py-14 text-center text-sand-50 sm:px-14 lg:py-20">
              <div className="placeholder-surface--dark absolute inset-0 opacity-50" aria-hidden="true" />
              <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-forest-500/20 blur-3xl" aria-hidden="true" />
              <div className="relative mx-auto max-w-2xl">
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-4xl" role="img" aria-hidden="true">
                  💬
                </span>
                <h2 className="mt-6 text-display-sm font-semibold tracking-tight text-balance">
                  Откликнуться — через WhatsApp
                </h2>
                <p className="mx-auto mt-5 max-w-md leading-relaxed text-sand-100/70">
                  Никаких форм. Напишите нам в WhatsApp, укажите интересующую позицию и приложите резюме — ответим в течение одного рабочего дня.
                </p>
                <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                  <a
                    href={site.contact.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 rounded-full bg-sand-50 px-8 py-4 text-[0.95rem] font-medium text-forest-900 shadow-subtle transition-all duration-500 ease-out-expo hover:-translate-y-0.5 hover:bg-white hover:shadow-lift"
                  >
                    Написать в WhatsApp
                    <svg className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                  <a
                    href={site.contact.instagramHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-sand-100/25 px-7 py-4 text-sm font-medium text-sand-50 transition-colors hover:border-sand-100/50 hover:bg-white/5"
                  >
                    Instagram {site.contact.instagram}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
