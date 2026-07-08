"use client";

import { ServiceCard } from "@/components/cards/ServiceCard";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { useServices } from "@/components/admin/useStore";

export function ServicesList() {
  const services = useServices();
  return (
    <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <RevealItem key={service.id}>
          <ServiceCard service={service} className="h-full" />
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
