import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectsExplorer } from "@/components/projects/ProjectsExplorer";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Landmark green-infrastructure projects across government, transport, education and development — from metropolitan parks to airport gateways.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Selected work"
        title="Projects that reshape how cities feel."
        intro="A portfolio of city-scale parks, boulevards and green systems delivered for governments, developers and institutions."
        crumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]}
        meta={[
          { label: "Projects", value: "430+" },
          { label: "Parkland", value: "310 ha" },
          { label: "Corridors", value: "180 km" },
          { label: "Trees", value: "1.2M" },
        ]}
      />

      <section className="bg-paper py-section">
        <Container>
          <ProjectsExplorer />
        </Container>
      </section>

      <CTASection />
    </>
  );
}
