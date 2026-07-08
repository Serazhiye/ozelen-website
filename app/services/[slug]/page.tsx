import type { Metadata } from "next";
import { ServiceDetail } from "@/components/services/ServiceDetail";
import { services as defaultServices } from "@/lib/data/services";

export function generateStaticParams() {
  return defaultServices.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = true;

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = defaultServices.find((s) => s.slug === params.slug);
  if (!service) return { title: "Услуга" };
  return { title: service.title, description: service.tagline };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  return <ServiceDetail slug={params.slug} />;
}
