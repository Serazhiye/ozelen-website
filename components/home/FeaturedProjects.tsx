"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { useProjects } from "@/components/admin/useStore";

const spanClasses = ["lg:col-span-4", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2"];
const ratios = ["ultrawide", "portrait", "video", "video", "video"] as const;

export function FeaturedProjects() {
  const featured = useProjects().slice(0, 5);

  return (
    <section className="bg-paper py-section">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Избранные работы"
            title="Знаковые проекты по всему региону."
            intro="От городских парков до ворот аэропортов — подборка проектов, определяющих нашу практику."
            className="max-w-2xl"
          />
          <div className="shrink-0">
            <Button href="/projects" variant="secondary" withArrow>
              Все проекты
            </Button>
          </div>
        </div>

        <RevealGroup className="mt-14 grid gap-8 lg:grid-cols-6">
          {featured.map((project, i) => (
            <RevealItem key={project.id} className={spanClasses[i] ?? "lg:col-span-2"}>
              <ProjectCard project={project} number={i + 1} ratio={ratios[i] ?? "video"} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
