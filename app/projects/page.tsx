import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectsExplorer } from "@/components/projects/ProjectsExplorer";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Проекты",
  description:
    "Знаковые проекты зелёной инфраструктуры в госсекторе, транспорте, образовании и застройке — от городских парков до ворот аэропортов.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Избранные работы"
        title="Проекты, меняющие облик городов."
        intro="Портфель парков, бульваров и зелёных систем городского масштаба, реализованных для государства, застройщиков и институтов."
        crumbs={[{ label: "Главная", href: "/" }, { label: "Проекты" }]}
        meta={[
          { label: "Проектов", value: "11+" },
          { label: "Высажено растений", value: "150 тыс.+" },
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
