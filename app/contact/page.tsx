import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { MapPlaceholder } from "@/components/ui/MapPlaceholder";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { site } from "@/lib/site";
import { departments } from "@/lib/data/company";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Свяжитесь с Nord Botanic по вопросам проекта, тендера или партнёрства. Телефон, WhatsApp, эл. почта, адреса офиса и тепличного комплекса.",
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
        intro="Планируете парк, бульвар или целый район — наша команда готова помочь. Расскажите о проекте, и мы ответим в течение одного рабочего дня."
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
                  className="group flex h-full flex-col justify-between rounded-3xl border border-forest-900/8 bg-mist p-8 transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:border-forest-900/15 hover:shadow-lift"
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

      {/* Form + office details */}
      <section className="bg-mist py-section">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-7">
              <SectionHeading eyebrow="Написать нам" title="Начните разговор." />
              <Reveal className="mt-10">
                <InquiryForm />
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
                  <div className="rounded-3xl bg-forest-950 p-7 text-sand-50">
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
                  className="group flex h-full flex-col rounded-3xl border border-forest-900/8 bg-mist p-7 transition-colors hover:border-forest-900/15"
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
          <Reveal>
            <MapPlaceholder />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
