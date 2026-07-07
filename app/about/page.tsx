import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/sections/CTASection";
import { Gallery } from "@/components/sections/Gallery";
import { Placeholder } from "@/components/ui/Placeholder";
import { Counter } from "@/components/motion/Counter";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { companyStats } from "@/lib/site";
import {
  awards,
  certifications,
  leadership,
  milestones,
  values,
} from "@/lib/data/company";

export const metadata: Metadata = {
  title: "About",
  description:
    "GreenSphere Infrastructure combines landscape craft with civil-engineering discipline to build city-scale green infrastructure for governments, developers and institutions.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About GreenSphere"
        title="We engineer the landscapes that cities are judged by."
        intro="Founded in 2007, GreenSphere has grown from a single crew into the region's leading green-infrastructure contractor — delivering more than 430 projects with the discipline of an engineering firm and the eye of a landscape studio."
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        meta={[
          { label: "Founded", value: "2007" },
          { label: "Projects", value: "430+" },
          { label: "Specialists", value: "350+" },
          { label: "Trees Planted", value: "1.2M" },
        ]}
      />

      {/* Mission / Vision */}
      <section className="bg-paper py-section">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Our purpose"
                title="Building the green systems that make cities liveable."
              />
            </div>
            <div className="space-y-10 lg:col-span-7">
              <Reveal>
                <div>
                  <h3 className="text-sm font-medium uppercase tracking-[0.16em] text-forest-600">Mission</h3>
                  <p className="mt-4 text-2xl font-medium leading-snug tracking-tight text-ink text-balance">
                    To engineer the green infrastructure that makes cities cooler, healthier and more resilient — at a scale and standard others can&apos;t match.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <div>
                  <h3 className="text-sm font-medium uppercase tracking-[0.16em] text-forest-600">Vision</h3>
                  <p className="mt-4 text-2xl font-medium leading-snug tracking-tight text-ink text-balance">
                    A generation of cities where nature and infrastructure are designed, built and maintained as one system.
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
          <dl className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
            {companyStats.map((stat) => (
              <Reveal key={stat.label}>
                <div>
                  <dd className="text-5xl font-semibold tracking-tight sm:text-6xl">
                    <Counter value={stat.value} suffix={stat.suffix} decimals={"decimals" in stat ? stat.decimals : 0} />
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
            eyebrow="Our history"
            title="Nearly two decades of building at city scale."
            intro="Each milestone marks a step from landscaping crew to integrated green-infrastructure engineer."
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

      {/* Values */}
      <section className="bg-mist py-section">
        <Container>
          <SectionHeading
            eyebrow="What we stand for"
            title="Values that hold on the hardest projects."
            className="max-w-2xl"
          />
          <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <RevealItem key={v.title}>
                <div className="h-full rounded-3xl border border-forest-900/8 bg-paper p-8">
                  <h3 className="text-lg font-semibold text-ink">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/55">{v.description}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* Safety & Environment */}
      <section className="bg-paper py-section">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal className="rounded-4xl bg-forest-950 p-10 text-sand-50 lg:p-14">
              <span className="eyebrow text-sand-200 before:bg-sand-300/50">Safety standards</span>
              <h3 className="mt-6 text-3xl font-semibold tracking-tight text-balance">
                An industry-leading safety culture.
              </h3>
              <p className="mt-5 leading-relaxed text-sand-100/70">
                Every site runs to certified health-and-safety systems, with continuous training, audited method statements and a leadership team that treats zero-harm as non-negotiable.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-6 border-t border-sand-100/15 pt-8">
                <div>
                  <p className="text-3xl font-semibold">4.2M+</p>
                  <p className="mt-1 text-sm text-sand-100/60">Hours worked safely</p>
                </div>
                <div>
                  <p className="text-3xl font-semibold">ISO 45001</p>
                  <p className="mt-1 text-sm text-sand-100/60">Certified system</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="rounded-4xl border border-forest-900/8 bg-mist p-10 lg:p-14">
              <span className="eyebrow">Environmental commitment</span>
              <h3 className="mt-6 text-3xl font-semibold tracking-tight text-ink text-balance">
                Leaving every site better than we found it.
              </h3>
              <p className="mt-5 leading-relaxed text-ink/60">
                Biodiversity net gain, measured water savings and low-carbon delivery are designed into every project — and reported against clear targets our clients can disclose with confidence.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-6 border-t border-forest-900/10 pt-8">
                <div>
                  <p className="text-3xl font-semibold text-forest-800">+31%</p>
                  <p className="mt-1 text-sm text-ink/55">Avg. biodiversity gain</p>
                </div>
                <div>
                  <p className="text-3xl font-semibold text-forest-800">−42%</p>
                  <p className="mt-1 text-sm text-ink/55">Avg. water reduction</p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Leadership */}
      <section className="bg-mist py-section">
        <Container>
          <SectionHeading
            eyebrow="Leadership"
            title="The people accountable for every project."
            intro="A multidisciplinary board pairing engineering, landscape, ecology and operations leadership."
            className="max-w-2xl"
          />
          <RevealGroup className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {leadership.map((person) => (
              <RevealItem key={person.name}>
                <div className="group">
                  <Placeholder label={`Portrait — ${person.name}`} ratio="portrait" rounded="rounded-3xl" />
                  <h3 className="mt-5 text-lg font-semibold text-ink">{person.name}</h3>
                  <p className="text-sm font-medium text-forest-700">{person.role}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink/55">{person.bio}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* Awards & Certifications */}
      <section className="bg-paper py-section">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <SectionHeading eyebrow="Recognition" title="Awards & accolades." />
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
              <SectionHeading eyebrow="Certifications" title="Accredited & compliant." />
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
            eyebrow="Our world"
            title="Inside GreenSphere."
            className="max-w-2xl"
          />
          <div className="mt-14">
            <Gallery
              labels={["Head Office", "Design Studio", "Engineering Lab", "Nursery Partner", "Team on Site", "Fleet Yard"]}
              columns={3}
            />
          </div>
        </Container>
      </section>

      <CTASection eyebrow="Work with us" title="Ready to build something lasting?" />
    </>
  );
}
