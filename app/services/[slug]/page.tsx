import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Placeholder } from "@/components/ui/Placeholder";
import { Gallery } from "@/components/sections/Gallery";
import { Accordion } from "@/components/ui/Accordion";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { getRelatedServices, getService, services } from "@/lib/data/services";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = getService(params.slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: service.title,
    description: service.tagline,
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getService(params.slug);
  if (!service) notFound();

  const related = getRelatedServices(service.slug);

  return (
    <>
      <PageHero
        eyebrow="Service"
        title={service.title}
        intro={service.tagline}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      />

      {/* Hero image */}
      <section className="bg-paper pt-12 lg:pt-16">
        <Container>
          <Reveal>
            <Placeholder label={`${service.title} — Feature`} ratio="ultrawide" rounded="rounded-4xl" />
          </Reveal>
        </Container>
      </section>

      {/* Overview + stats */}
      <section className="bg-paper py-section">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeading eyebrow="Overview" title="What this service delivers." />
              <div className="mt-8 space-y-6">
                {service.overview.map((para, i) => (
                  <Reveal key={i} delay={i * 0.05}>
                    <p className="text-lg leading-relaxed text-ink/65 text-pretty">{para}</p>
                  </Reveal>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={0.1}>
                <div className="rounded-4xl border border-forest-900/8 bg-mist p-8 lg:p-10">
                  <h3 className="text-sm font-medium uppercase tracking-[0.16em] text-forest-600">By the numbers</h3>
                  <dl className="mt-8 space-y-8">
                    {service.stats.map((stat) => (
                      <div key={stat.label} className="border-t border-forest-900/10 pt-6 first:border-0 first:pt-0">
                        <dd className="text-4xl font-semibold tracking-tight text-forest-800">{stat.value}</dd>
                        <dt className="mt-1 text-sm text-ink/55">{stat.label}</dt>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section className="bg-mist py-section">
        <Container>
          <SectionHeading
            eyebrow="Benefits"
            title="Why clients specify GreenSphere."
            className="max-w-2xl"
          />
          <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2">
            {service.benefits.map((b) => (
              <RevealItem key={b.title}>
                <div className="flex h-full gap-5 rounded-3xl border border-forest-900/8 bg-paper p-7">
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

      {/* Engineering process */}
      <section className="bg-paper py-section">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeading eyebrow="Engineering process" title="How we build it." />
            </div>
            <div className="lg:col-span-8">
              <RevealGroup className="space-y-0">
                {service.process.map((step, i) => (
                  <RevealItem key={step.title}>
                    <div className="grid grid-cols-12 gap-4 border-t border-forest-900/10 py-7">
                      <span className="col-span-2 text-lg font-semibold tabular-nums text-forest-600 sm:col-span-1">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="col-span-10 sm:col-span-11">
                        <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
                        <p className="mt-2 max-w-2xl text-base leading-relaxed text-ink/55">{step.description}</p>
                      </div>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </Container>
      </section>

      {/* Equipment */}
      <section className="bg-forest-950 py-section text-sand-50">
        <Container>
          <SectionHeading
            dark
            eyebrow="Equipment & plant"
            title="The right machine for the job — owned, not hired."
            intro="Self-owned, precisely maintained plant gives us control over quality, schedule and cost."
            className="max-w-2xl"
          />
          <RevealGroup className="mt-14 flex flex-wrap gap-3">
            {service.equipment.map((item) => (
              <RevealItem key={item}>
                <span className="inline-flex items-center gap-2 rounded-full border border-sand-100/20 px-5 py-3 text-sm text-sand-100/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-sand-300" />
                  {item}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* Gallery */}
      <section className="bg-paper py-section">
        <Container>
          <SectionHeading eyebrow="Gallery" title="The work, up close." className="max-w-2xl" />
          <div className="mt-14">
            <Gallery labels={service.galleryLabels} columns={3} />
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="bg-mist py-section">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeading eyebrow="FAQ" title="Common questions." />
            </div>
            <div className="lg:col-span-8">
              <Accordion items={service.faqs} />
            </div>
          </div>
        </Container>
      </section>

      {/* Related services */}
      <section className="bg-paper py-section">
        <Container>
          <div className="flex items-end justify-between gap-8">
            <SectionHeading eyebrow="Related services" title="Explore more disciplines." />
            <Link href="/services" className="hidden shrink-0 text-sm font-medium text-forest-700 link-underline sm:inline-flex">
              All services →
            </Link>
          </div>
          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((s) => (
              <RevealItem key={s.slug}>
                <ServiceCard service={s} className="h-full" />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
