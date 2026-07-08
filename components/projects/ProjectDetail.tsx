"use client";

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
import { useProjects } from "@/components/admin/useStore";

export function ProjectDetail({ slug }: { slug: string }) {
  const projects = useProjects();
  const project = projects.find((p) => p.slug === slug);
  const related = projects.filter((p) => p.slug !== slug).slice(0, 3);

  if (!project) {
    return (
      <section className="flex min-h-[70svh] items-center bg-forest-950 text-sand-50">
        <Container className="py-40 text-center">
          <h1 className="text-display-sm font-semibold">Проект не найден</h1>
          <p className="mt-4 text-sand-100/70">Возможно, он был удалён или ещё не опубликован.</p>
          <Link href="/projects" className="mt-8 inline-block rounded-full bg-sand-50 px-6 py-3 text-sm font-medium text-forest-900">
            Все проекты
          </Link>
        </Container>
      </section>
    );
  }

  const stats = [
    { label: "Высажено деревьев", value: project.stats.trees },
    { label: "Кустарников", value: project.stats.shrubs },
    { label: "Многолетних цветов", value: project.stats.flowers },
    { label: "Площадь газонов", value: project.stats.lawn },
    { label: "Общая площадь", value: project.stats.area },
  ].filter((s) => s.value && s.value !== "—");

  return (
    <>
      {/* Face / hero */}
      <PageHero
        eyebrow={project.category}
        title={project.title}
        intro={project.summary}
        size="lg"
        crumbs={[
          { label: "Главная", href: "/" },
          { label: "Проекты", href: "/projects" },
          { label: project.title },
        ]}
        meta={[
          { label: "Заказчик", value: project.client },
          { label: "Локация", value: project.location },
          { label: "Площадь", value: project.area },
          { label: "Завершён", value: project.year },
        ]}
      />

      {/* Big hero image */}
      <section className="bg-paper pt-12 lg:pt-16">
        <Container>
          <Reveal>
            <Placeholder
              label={`${project.title} — съёмка с дрона`}
              src={project.heroImage}
              number={1}
              ratio="ultrawide"
              rounded="rounded-4xl"
            />
          </Reveal>
        </Container>
      </section>

      {/* Overview */}
      <section className="bg-paper py-section">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeading eyebrow="О проекте" title="Кратко о проекте." />
            </div>
            <div className="space-y-6 lg:col-span-8">
              {project.description.map((para, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <p className="text-lg leading-relaxed text-ink/65 text-pretty">{para}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Statistics (right below the face) */}
      {stats.length > 0 && (
        <section className="bg-forest-950 py-section text-sand-50">
          <Container>
            <SectionHeading dark eyebrow="Статистика проекта" title="Результат в цифрах." className="max-w-2xl" />
            <RevealGroup className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
              {stats.map((stat) => (
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
      )}

      {/* Before / After */}
      <section className="bg-paper py-section">
        <Container>
          <SectionHeading
            eyebrow="Трансформация"
            title="До и после."
            intro="Потяните ползунок, чтобы сравнить исходный участок с готовым ландшафтом."
            className="max-w-2xl"
          />
          <Reveal className="mt-14">
            <BeforeAfter
              beforeLabel={`${project.title} — исходный участок`}
              afterLabel={`${project.title} — готово`}
              beforeImage={project.beforeImage}
              afterImage={project.afterImage}
            />
          </Reveal>
        </Container>
      </section>

      {/* Construction timeline by years */}
      {project.timeline.length > 0 && (
        <section className="bg-mist py-section">
          <Container>
            <SectionHeading
              eyebrow="Ход строительства"
              title="По годам — от начала работ до открытия."
              className="max-w-2xl"
            />
            <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {project.timeline.map((phase, i) => (
                <RevealItem key={`${phase.phase}-${i}`}>
                  <div className="flex h-full flex-col rounded-3xl border border-forest-900/8 bg-paper p-7 shadow-subtle">
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
      )}

      {/* Gallery */}
      {project.gallery.length > 0 && (
        <section className="bg-paper py-section">
          <Container>
            <SectionHeading eyebrow="Галерея" title="Кадры проекта." className="max-w-2xl" />
            <div className="mt-14">
              <Gallery items={project.gallery} columns={3} startNumber={2} />
            </div>
          </Container>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-mist py-section">
          <Container>
            <div className="flex items-end justify-between gap-8">
              <SectionHeading eyebrow="Ещё работы" title="Смежные проекты." />
              <Link href="/projects" className="hidden shrink-0 text-sm font-medium text-forest-700 link-underline sm:inline-flex">
                Все проекты →
              </Link>
            </div>
            <RevealGroup className="mt-12 grid gap-8 md:grid-cols-3">
              {related.map((p, i) => (
                <RevealItem key={p.id}>
                  <ProjectCard project={p} number={i + 1} ratio="video" />
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
