"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/lib/data/company";

const ease = [0.16, 1, 0.3, 1] as const;

export function ProcessTimeline() {
  const reduce = useReducedMotion();

  return (
    <section className="bg-mist py-section">
      <Container>
        <SectionHeading
          eyebrow="Our process"
          title="From first survey to lifelong stewardship."
          intro="A disciplined, six-stage methodology that de-risks delivery and protects value long after handover."
          className="max-w-2xl"
        />

        <div className="relative mt-16">
          {/* Animated connector line (desktop) */}
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-forest-900/10 lg:block" aria-hidden="true">
            <motion.div
              className="h-full bg-forest-500 origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.6, ease }}
            />
          </div>

          <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-6">
            {processSteps.map((step, i) => (
              <motion.li
                key={step.number}
                initial={{ opacity: 0, y: reduce ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease, delay: reduce ? 0 : i * 0.12 }}
                className="relative"
              >
                <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-forest-900/10 bg-paper text-sm font-semibold text-forest-700 shadow-subtle">
                  {step.number}
                </span>
                <h3 className="mt-6 text-base font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/55">{step.description}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
