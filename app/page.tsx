import { Hero } from "@/components/home/Hero";
import { AboutIntro } from "@/components/home/AboutIntro";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { WhyUs } from "@/components/home/WhyUs";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { Industries } from "@/components/home/Industries";
import { NewsPreview } from "@/components/home/NewsPreview";
import { CTASection } from "@/components/sections/CTASection";
import { TrustStrip } from "@/components/home/TrustStrip";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <AboutIntro />
      <ServicesGrid />
      <FeaturedProjects />
      <WhyUs />
      <ProcessTimeline />
      <Industries />
      <NewsPreview />
      <CTASection />
    </>
  );
}
