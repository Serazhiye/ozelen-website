import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Gallery } from "@/components/sections/Gallery";
import { ApplicationForm } from "@/components/forms/ApplicationForm";
import { RevealGroup, RevealItem, Reveal } from "@/components/motion/Reveal";
import { careerBenefits, openPositions } from "@/lib/data/company";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join GreenSphere Infrastructure. Build the parks, boulevards and green systems that define how cities feel — with a team that respects craft and safety.",
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build the landscapes that outlast us all."
        intro="Join a multidisciplinary team of engineers, landscape architects, ecologists and site leaders shaping the future of urban green infrastructure."
        crumbs={[{ label: "Home", href: "/" }, { label: "Careers" }]}
        meta={[
          { label: "Team", value: "350+" },
          { label: "Disciplines", value: "12" },
          { label: "Offices", value: "3" },
          { label: "Open Roles", value: String(openPositions.length) },
        ]}
      />

      {/* Why join */}
      <section className="bg-paper py-section">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Why join us"
                title="Work that you can point to for the rest of your life."
                intro="At GreenSphere you don't just complete tasks — you help build the parks and streets that a whole city grows up in."
              />
            </div>
            <div className="lg:col-span-7">
              <RevealGroup className="grid gap-4 sm:grid-cols-2">
                {careerBenefits.map((b) => (
                  <RevealItem key={b.title}>
                    <div className="h-full rounded-3xl border border-forest-900/8 bg-mist p-7">
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

      {/* Culture gallery */}
      <section className="bg-mist py-section">
        <Container>
          <SectionHeading
            eyebrow="Corporate culture"
            title="A team that respects craft."
            intro="Collaborative, safety-first and genuinely proud of the work — see life inside GreenSphere."
            className="max-w-2xl"
          />
          <div className="mt-14">
            <Gallery
              labels={["Team on Site", "Design Review", "Fleet Yard", "Site Safety", "Nursery Visit", "Project Launch"]}
              columns={3}
            />
          </div>
        </Container>
      </section>

      {/* Open positions */}
      <section className="bg-paper py-section">
        <Container>
          <SectionHeading
            eyebrow="Open positions"
            title="Current opportunities."
            intro="Don't see the right role? Send a speculative application below — we're always looking for exceptional people."
            className="max-w-2xl"
          />
          <RevealGroup className="mt-14 divide-y divide-forest-900/10 border-y border-forest-900/10">
            {openPositions.map((p) => (
              <RevealItem key={p.title}>
                <a
                  href="#apply"
                  className="group grid grid-cols-1 items-center gap-3 py-6 sm:grid-cols-12 sm:gap-6"
                >
                  <div className="sm:col-span-5">
                    <h3 className="text-lg font-semibold text-ink transition-colors group-hover:text-forest-700">
                      {p.title}
                    </h3>
                  </div>
                  <div className="text-sm text-ink/55 sm:col-span-3">{p.department}</div>
                  <div className="text-sm text-ink/55 sm:col-span-2">{p.location}</div>
                  <div className="flex items-center justify-between sm:col-span-2 sm:justify-end">
                    <span className="rounded-full bg-forest-50 px-3 py-1 text-xs font-medium text-forest-700">
                      {p.type}
                    </span>
                    <svg className="ml-4 h-4 w-4 text-forest-600 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </a>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* Application form */}
      <section id="apply" className="scroll-mt-24 bg-mist py-section">
        <Container>
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              align="center"
              eyebrow="Apply now"
              title="Start your application."
              intro="Tell us a little about yourself and the role you're interested in."
              className="mx-auto"
            />
            <Reveal className="mt-12">
              <ApplicationForm />
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
