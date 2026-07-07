import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Placeholder } from "@/components/ui/Placeholder";
import { Gallery } from "@/components/sections/Gallery";
import { BeforeAfter } from "@/components/projects/BeforeAfter";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { getProject, getRelatedProjects, projects } from "@/lib/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProject(params.slug);
  if (!project) return { title: "Project Not Found" };
  return { title: project.title, description: project.summary };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const related = getRelatedProjects(project.slug);

  return (
    <>
      <PageHero
        eyebrow={project.category}
        title={project.title}
        intro={project.summary}
        size="lg"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects" },
          { label: project.title },
        ]}
        meta={[
          { label: "Client", value: project.client },
          { label: "Location", value: project.location },
          { label: "Area", value: project.area },
          { label: "Completed", value: project.year },
        ]}
      />

      {/* Hero image */}
      <section className="bg-paper pt-12 lg:pt-16">
        <Container>
          <Reveal>
            <Placeholder label={`${project.title} — Drone View`} ratio="ultrawide" rounded="rounded-4xl" />
          </Reveal>
        </Container>
      </section>

      {/* Overview + objectives */}
      <section className="bg-paper py-section">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeading eyebrow="Overview" title="The brief and the ambition." />
              <div className="mt-8 space-y-6">
                {project.overview.map((para, i) => (
                  <Reveal key={i} delay={i * 0.05}>
                    <p className="text-lg leading-relaxed text-ink/65 text-pretty">{para}</p>
                  </Reveal>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={0.1}>
                <div className="rounded-4xl border border-forest-900/8 bg-mist p-8 lg:p-10">
                  <h3 className="text-sm font-medium uppercase tracking-[0.16em] text-forest-600">Objectives</h3>
                  <ul className="mt-6 space-y-4">
                    {project.objectives.map((obj) => (
                      <li key={obj} className="flex gap-3 text-sm leading-relaxed text-ink/70">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-forest-500" />
                        {obj}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Project statistics */}
      <section className="bg-forest-950 py-section text-sand-50">
        <Container>
          <SectionHeading
            dark
            eyebrow="Project statistics"
            title="Delivered by the numbers."
            className="max-w-2xl"
          />
          <RevealGroup className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-4">
            {project.keyStats.map((stat) => (
              <RevealItem key={stat.label}>
                <div>
                  <p className="text-4xl font-semibold tracking-tight sm:text-5xl">{stat.value}</p>
                  <p className="mt-2 text-sm text-sand-100/60">{stat.label}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* Challenges & solutions */}
      <section className="bg-paper py-section">
        <Container>
          <SectionHeading
            eyebrow="Challenges & solutions"
            title="Hard problems, engineered answers."
            className="max-w-2xl"
          />
          <div className="mt-14 space-y-4">
            {project.challenges.map((challenge, i) => (
              <Reveal key={challenge.title} delay={i * 0.04}>
                <div className="grid gap-6 rounded-3xl border border-forest-900/8 bg-mist p-8 md:grid-cols-2 lg:gap-12">
                  <div>
                    <span className="text-xs font-medium uppercase tracking-[0.16em] text-ink/40">Challenge</span>
                    <h3 className="mt-3 text-lg font-semibold text-ink">{challenge.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/55">{challenge.description}</p>
                  </div>
                  <div className="border-t border-forest-900/10 pt-6 md:border-l md:border-t-0 md:pl-12 md:pt-0">
                    <span className="text-xs font-medium uppercase tracking-[0.16em] text-forest-600">Solution</span>
                    <h3 className="mt-3 text-lg font-semibold text-forest-800">
                      {project.solutions[i]?.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/55">
                      {project.solutions[i]?.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Engineering details */}
      <section className="bg-mist py-section">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeading eyebrow="Engineering details" title="Under the landscape." />
            </div>
            <div className="lg:col-span-8">
              <RevealGroup className="grid gap-4 sm:grid-cols-2">
                {project.engineering.map((item) => (
                  <RevealItem key={item}>
                    <div className="flex h-full gap-4 rounded-3xl border border-forest-900/8 bg-paper p-6">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-forest-900 text-sand-50">
                        <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <p className="text-sm leading-relaxed text-ink/70">{item}</p>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </Container>
      </section>

      {/* Before / After */}
      <section className="bg-paper py-section">
        <Container>
          <SectionHeading
            eyebrow="Transformation"
            title="Before & after."
            intro="Drag the handle to compare the existing site with the completed landscape."
            className="max-w-2xl"
          />
          <Reveal className="mt-14">
            <BeforeAfter
              beforeLabel={`${project.title} — Existing Site`}
              afterLabel={`${project.title} — Completed`}
            />
          </Reveal>
        </Container>
      </section>

      {/* Construction timeline */}
      <section className="bg-mist py-section">
        <Container>
          <SectionHeading
            eyebrow="Construction stages"
            title="From ground-breaking to opening day."
            className="max-w-2xl"
          />
          <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {project.timeline.map((phase, i) => (
              <RevealItem key={phase.phase}>
                <div className="flex h-full flex-col rounded-3xl border border-forest-900/8 bg-paper p-7">
                  <span className="text-sm font-medium tabular-nums text-forest-600">
                    {String(i + 1).padStart(2, "0")} · {phase.period}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-ink">{phase.phase}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/55">{phase.description}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* Gallery */}
      <section className="bg-paper py-section">
        <Container>
          <SectionHeading eyebrow="Gallery" title="Twelve views of the project." className="max-w-2xl" />
          <div className="mt-14">
            <Gallery labels={project.galleryLabels} columns={3} />
          </div>
        </Container>
      </section>

      {/* Outcome */}
      <section className="bg-forest-950 py-section text-sand-50">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeading dark eyebrow="Outcome" title="The result." />
            </div>
            <div className="space-y-6 lg:col-span-8">
              {project.outcome.map((para, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <p className="text-xl leading-relaxed text-sand-100/80 text-pretty">{para}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Related projects */}
      <section className="bg-paper py-section">
        <Container>
          <div className="flex items-end justify-between gap-8">
            <SectionHeading eyebrow="More work" title="Related projects." />
            <Link href="/projects" className="hidden shrink-0 text-sm font-medium text-forest-700 link-underline sm:inline-flex">
              All projects →
            </Link>
          </div>
          <RevealGroup className="mt-12 grid gap-8 md:grid-cols-3">
            {related.map((p) => (
              <RevealItem key={p.slug}>
                <ProjectCard project={p} ratio="video" />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
