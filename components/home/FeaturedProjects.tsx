import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { projects } from "@/lib/data/projects";

export function FeaturedProjects() {
  const featured = projects.slice(0, 5);

  return (
    <section className="bg-paper py-section">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Selected work"
            title="Landmark projects across the region."
            intro="From metropolitan parks to airport gateways — a selection of the schemes that define our practice."
            className="max-w-2xl"
          />
          <div className="shrink-0">
            <Button href="/projects" variant="secondary" withArrow>
              All Projects
            </Button>
          </div>
        </div>

        <RevealGroup className="mt-14 grid gap-8 lg:grid-cols-6">
          {/* Feature project spans wide */}
          <RevealItem className="lg:col-span-4">
            <ProjectCard project={featured[0]} ratio="ultrawide" />
          </RevealItem>
          <RevealItem className="lg:col-span-2">
            <ProjectCard project={featured[1]} ratio="portrait" />
          </RevealItem>
          <RevealItem className="lg:col-span-2">
            <ProjectCard project={featured[2]} ratio="video" />
          </RevealItem>
          <RevealItem className="lg:col-span-2">
            <ProjectCard project={featured[3]} ratio="video" />
          </RevealItem>
          <RevealItem className="lg:col-span-2">
            <ProjectCard project={featured[4]} ratio="video" />
          </RevealItem>
        </RevealGroup>
      </Container>
    </section>
  );
}
