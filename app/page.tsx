import { Hero } from "@/components/home/Hero";
import { AboutIntro } from "@/components/home/AboutIntro";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { NewsPreview } from "@/components/home/NewsPreview";
import { CTASection } from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutIntro />
      <ServicesGrid />
      <FeaturedProjects />
      <ProcessTimeline />
      <NewsPreview />
      <CTASection />
    </>
  );
}
