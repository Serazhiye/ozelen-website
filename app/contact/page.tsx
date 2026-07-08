import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GoogleMap } from "@/components/ui/GoogleMap";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { site } from "@/lib/site";
import { departments } from "@/lib/data/company";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Свяжитесь с Nord Botanic по вопросам проекта, тендера или партнёрства. WhatsApp, телефон, эл. почта, адреса офиса и тепличного комплекса на карте.",
};

const channels = [
  { label: "Телефон", value: site.contact.phone, href: site.contact.phoneHref },
  { label: "WhatsApp", value: "Написать", href: site.contact.whatsappHref, external: true },
  { label: "Эл. почта", value: site.contact.email, href: site.contact.emailHref },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Контакты"
        title="Обсудим ваш следующий ориентир."
        intro="Планируете парк, бульвар или целый район — наша команда готова помочь. Напишите нам в WhatsApp, и мы ответим в течение одного рабочего дня."
        crumbs={[{ label: "Главная", href: "/" }, { label: "Контакты" }]}
      />

      {/* Channels */}
      <section className="bg-paper py-section">
        <Container>
          <RevealGroup className="grid gap-4 sm:grid-cols-3">
            {channels.map((c) => (
              <RevealItem key={c.label}>
                <a
                  href={c.href}
                  target={c.external ? "_blank" : undefined}
                  rel={c.external ? "noopener noreferrer" : undefined}
                  className="group flex h-full flex-col justify-between rounded-3xl border border-forest-900/8 bg-mist p-8 shadow-subtle transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:border-forest-900/15 hover:shadow-lift"
                >
                  <span className="text-xs font-medium uppercase tracking-[0.16em] text-forest-600">{c.label}</span>
                  <span className="mt-8 flex items-center justify-between text-lg font-semibold text-ink">
                    {c.value}
                    <svg className="h-4 w-4 text-forest-600 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </a>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* WhatsApp CTA + office details */}
      <section className="bg-mist py-section">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* WhatsApp panel */}
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Написать нам"
                title="Быстрее всего — в WhatsApp."
                intro="Никаких форм. Напишите напрямую — обсудим задачу, сроки и бюджет в удобном мессенджере."
              />
              <Reveal className="mt-10">
                <div className="relative overflow-hidden rounded-4xl bg-forest-950 p-8 text-sand-50 shadow-lift sm:p-12">
                  <div className="placeholder-surface--dark absolute inset-0 opacity-50" aria-hidden="true" />
                  <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-forest-500/20 blur-3xl" aria-hidden="true" />
                  <div className="relative">
                    <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-4xl" role="img" aria-hidden="true">
                      💬
                    </span>
                    <h3 className="mt-6 text-2xl font-semibold tracking-tight sm:text-3xl">
                      Написать в WhatsApp
                    </h3>
                    <p className="mt-3 max-w-md leading-relaxed text-sand-100/70">
                      Ответим в течение одного рабочего дня. Можно сразу приложить участок, ТЗ или референсы.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center gap-4">
                      <a
                        href={site.contact.whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2.5 rounded-full bg-sand-50 px-7 py-4 text-[0.95rem] font-medium text-forest-900 shadow-subtle transition-all duration-500 ease-out-expo hover:-translate-y-0.5 hover:bg-white hover:shadow-lift"
                      >
                        Открыть WhatsApp
                        <svg className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                      <a
                        href={site.contact.phoneHref}
                        className="inline-flex items-center gap-2 rounded-full border border-sand-100/25 px-6 py-4 text-sm font-medium text-sand-50 transition-colors hover:border-sand-100/50 hover:bg-white/5"
                      >
                        Позвонить
                      </a>
                    </div>
                    <p className="mt-6 text-sm text-sand-100/50">
                      Или на почту:{" "}
                      <a href={site.contact.emailHref} className="text-sand-100/80 underline underline-offset-4 hover:text-sand-50">
                        {site.contact.email}
                      </a>
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Details */}
            <div className="lg:col-span-5">
              <Reveal>
                <div className="space-y-10">
                  {/* Office */}
                  <div>
                    <h3 className="text-sm font-medium uppercase tracking-[0.16em] text-forest-600">{site.office.label}</h3>
                    <address className="mt-4 not-italic leading-relaxed text-ink/70">
                      {site.office.lines.map((line) => (
                        <span key={line} className="block">{line}</span>
                      ))}
                    </address>
                  </div>

                  {/* Greenhouse */}
                  <div>
                    <h3 className="text-sm font-medium uppercase tracking-[0.16em] text-forest-600">{site.greenhouse.label}</h3>
                    <address className="mt-4 not-italic leading-relaxed text-ink/70">
                      {site.greenhouse.lines.map((line) => (
                        <span key={line} className="block">{line}</span>
                      ))}
                    </address>
                  </div>

                  {/* Hours */}
                  <div>
                    <h3 className="text-sm font-medium uppercase tracking-[0.16em] text-forest-600">Часы работы</h3>
                    <dl className="mt-4 space-y-2">
                      {site.office.hours.map((h) => (
                        <div key={h.day} className="flex justify-between border-b border-forest-900/8 pb-2 text-sm">
                          <dt className="text-ink/60">{h.day}</dt>
                          <dd className="font-medium text-ink">{h.time}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  {/* Emergency */}
                  <div className="rounded-3xl bg-forest-950 p-7 text-sand-50 shadow-lift">
                    <h3 className="text-sm font-medium uppercase tracking-[0.16em] text-sand-200">Аварийная линия</h3>
                    <p className="mt-3 text-sm text-sand-100/60">
                      Для срочных инцидентов на действующих объектах Nord Botanic.
                    </p>
                    <a href={site.contact.emergencyHref} className="mt-4 inline-block text-xl font-semibold text-sand-50">
                      {site.contact.emergency}
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Departments */}
      <section className="bg-paper py-section">
        <Container>
          <SectionHeading
            eyebrow="Отделы"
            title="Свяжитесь напрямую с нужной командой."
            className="max-w-2xl"
          />
          <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2">
            {departments.map((d) => (
              <RevealItem key={d.name}>
                <a
                  href={`mailto:${d.email}`}
                  className="group flex h-full flex-col rounded-3xl border border-forest-900/8 bg-mist p-7 shadow-subtle transition-all duration-500 hover:-translate-y-1 hover:border-forest-900/15 hover:shadow-lift"
                >
                  <h3 className="text-base font-semibold text-ink">{d.name}</h3>
                  <p className="mt-1 text-sm text-ink/55">{d.description}</p>
                  <span className="mt-4 text-sm font-medium text-forest-700 link-underline">{d.email}</span>
                </a>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* Map */}
      <section className="bg-paper pb-section">
        <Container>
          <SectionHeading
            eyebrow="На карте"
            title="Головной офис Nord Botanic."
            className="mb-10 max-w-2xl"
          />
          <Reveal>
            <GoogleMap
              query="улица Валиханова 1/3, Кокшетау, Казахстан"
              title="Офис Nord Botanic на карте Google"
              className="aspect-[16/10] w-full sm:aspect-[16/7]"
            />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
