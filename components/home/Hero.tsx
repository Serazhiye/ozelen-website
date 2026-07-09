"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Counter } from "@/components/motion/Counter";
import { StaticPhoto } from "@/components/photos/StaticPhoto";
import { companyStats } from "@/lib/site";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
  };

  return (
    <section className="relative overflow-hidden bg-forest-950 text-sand-50">
      {/* Background photo (replaceable from admin "Фото" → «Главный кадр»).
          The section height is driven by the in-flow content wrapper below, so
          this absolute layer reliably covers the WHOLE section. One even, light
          overlay keeps the photo visible everywhere (incl. behind the text and
          stats), slightly darker at the bottom only for text legibility. */}
      <StaticPhoto id="home-hero" fill dark hideCaption rounded="rounded-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/55 to-forest-950/35" aria-hidden="true" />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-10 h-[42rem] w-[42rem] rounded-full bg-forest-500/15 blur-3xl"
        animate={reduce ? undefined : { scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* In-flow content wrapper — carries the full-height layout */}
      <div className="relative z-10 flex min-h-[100svh] flex-col">
      {/* Copy — pinned to the left */}
      <Container className="flex flex-1 items-end pb-12 pt-40 lg:pb-16">
        <motion.div variants={container} initial="hidden" animate="show" className="mr-auto max-w-3xl text-left">
          <motion.span variants={item} className="eyebrow text-sand-200 before:bg-sand-300/50">
            Городское озеленение и зелёная инфраструктура
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-7 font-display text-display-lg font-semibold text-balance"
          >
            Создаём зелёные города
            <br className="hidden sm:block" /> для будущих поколений.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-8 max-w-xl text-lg leading-relaxed text-sand-100/75 text-pretty"
          >
            Проектируем, инженерно рассчитываем и строим парки, бульвары и зелёную
            инфраструктуру городского масштаба — ландшафты, которые работают
            поколениями.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
            <Button href="/contact" variant="light" size="lg" withArrow>
              Заказать консультацию
            </Button>
            <Button
              href="/projects"
              variant="secondary"
              size="lg"
              className="border-sand-100/25 text-sand-50 hover:border-sand-100/50 hover:bg-white/5"
            >
              Смотреть проекты
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      {/* Animated statistics — stretched across the full screen width */}
      <motion.dl
        variants={container}
        initial="hidden"
        animate="show"
        className="grid w-full grid-cols-2 border-t border-sand-100/15 sm:grid-cols-3 lg:grid-cols-5"
      >
        {companyStats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={item}
            className="flex flex-col justify-center px-6 py-8 sm:px-8 lg:border-l lg:border-sand-100/10 lg:py-10 lg:first:border-l-0"
          >
            <dd className="text-3xl font-semibold tracking-tight text-sand-50 sm:text-4xl">
              <Counter value={stat.value} suffix={stat.suffix} decimals={0} />
            </dd>
            <dt className="mt-2 text-sm text-sand-100/60">{stat.label}</dt>
          </motion.div>
        ))}
      </motion.dl>
      </div>
    </section>
  );
}
