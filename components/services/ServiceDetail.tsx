"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Placeholder } from "@/components/ui/Placeholder";
import { Gallery } from "@/components/sections/Gallery";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { useServices } from "@/components/admin/useStore";
import { processSteps } from "@/lib/data/company";

export function ServiceDetail({ slug }: { slug: string }) {
  const services = useServices();
  const service = services.find((s) => s.slug === slug);
  const related = services.filter((s) => s.slug !== slug).slice(0, 3);

  if (!service) {
    return (
      <section className="flex min-h-[70svh] items-center bg-forest-950 text-sand-50">
        <Container className="py-40 text-center">
          <h1 className="text-display-sm font-semibold">Услуга не найдена</h1>
          <p className="mt-4 text-sand-100/70">Возможно, она была удалена или ещё не опубликована.</p>
          <Link href="/services" className="mt-8 inline-block rounded-full bg-sand-50 px-6 py-3 text-sm font-medium text-forest-900">
            Все услуги
          </Link>
        </Container>
      </section>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Услуга"
        title={service.title}
        intro={service.tagline}
        crumbs={[
          { label: "Главная", href: "/" },
          { label: "Услуги", href: "/services" },
          { label: service.title },
        ]}
      />

      {/* Hero image */}
      <section className="bg-paper pt-12 lg:pt-16">
        <Container>
          <Reveal>
            <Placeholder label={`${service.title} — фото`} src={service.image} ratio="ultrawide" rounded="rounded-4xl" hideCaption />
          </Reveal>
        </Container>
      </section>

      {/* Overview */}
      <section className="bg-paper py-section">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeading eyebrow="Обзор" title="Что даёт эта услуга." />
            </div>
            <div className="space-y-6 lg:col-span-8">
              {service.overview.map((para, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <p className="text-lg leading-relaxed text-ink/65 text-pretty">{para}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Benefits */}
      {service.benefits.length > 0 && (
        <section className="bg-mist py-section">
          <Container>
            <SectionHeading eyebrow="Преимущества" title="Почему заказчики выбирают Nord Botanic." className="max-w-2xl" />
            <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2">
              {service.benefits.map((b) => (
                <RevealItem key={b.title}>
                  <div className="flex h-full gap-5 rounded-3xl border border-forest-900/8 bg-paper p-7 shadow-subtle">
                    <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest-900 text-sand-50">
                      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-ink">{b.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink/55">{b.description}</p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </Container>
        </section>
      )}

      {/* Shared methodology */}
      <section className="bg-paper py-section">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeading eyebrow="Как мы работаем" title="Единая методология." />
            </div>
            <div className="lg:col-span-8">
              <RevealGroup className="grid gap-6 sm:grid-cols-2">
                {processSteps.map((step) => (
                  <RevealItem key={step.number}>
                    <div className="flex h-full gap-5 rounded-3xl border border-forest-900/8 bg-mist p-7">
                      <span className="text-lg font-semibold tabular-nums text-forest-600">{step.number}</span>
                      <div>
                        <h3 className="text-base font-semibold text-ink">{step.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-ink/55">{step.description}</p>
                      </div>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </Container>
      </section>

      {/* Gallery */}
      {service.gallery.length > 0 && (
        <section className="bg-mist py-section">
          <Container>
            <SectionHeading eyebrow="Галерея" title="Работа вблизи." className="max-w-2xl" />
            <div className="mt-14">
              <Gallery items={service.gallery} columns={3} />
            </div>
          </Container>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-paper py-section">
          <Container>
            <div className="flex items-end justify-between gap-8">
              <SectionHeading eyebrow="Смежные услуги" title="Другие дисциплины." />
              <Link href="/services" className="hidden shrink-0 text-sm font-medium text-forest-700 link-underline sm:inline-flex">
                Все услуги →
              </Link>
            </div>
            <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s) => (
                <RevealItem key={s.id}>
                  <ServiceCard service={s} className="h-full" />
                </RevealItem>
              ))}
            </RevealGroup>
          </Container>
        </section>
      )}

      <CTASection />
    </>
  );
}
