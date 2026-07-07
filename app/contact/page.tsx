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
  title: "Contact",
  description:
    "Talk to GreenSphere Infrastructure about your project, tender or partnership. Phone, WhatsApp, email and our head office details.",
};

const channels = [
  { label: "Phone", value: site.contact.phone, href: site.contact.phoneHref },
  { label: "WhatsApp", value: "Message us", href: site.contact.whatsappHref, external: true },
  { label: "Email", value: site.contact.email, href: site.contact.emailHref },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your next landmark."
        intro="Whether you're planning a park, a boulevard or a district, our team is ready to help. Tell us about your project and we'll respond within one business day."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
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
              <SectionHeading eyebrow="Send a message" title="Start the conversation." />
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

                  {/* Hours */}
                  <div>
                    <h3 className="text-sm font-medium uppercase tracking-[0.16em] text-forest-600">Business hours</h3>
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
                    <h3 className="text-sm font-medium uppercase tracking-[0.16em] text-sand-200">Emergency line</h3>
                    <p className="mt-3 text-sm text-sand-100/60">
                      For urgent site or safety incidents on live GreenSphere projects.
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
            eyebrow="Departments"
            title="Reach the right team directly."
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
