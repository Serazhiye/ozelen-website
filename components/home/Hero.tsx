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
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-forest-950 text-sand-50">
      {/* Background photo (replaceable from admin) + darkening overlays */}
      <StaticPhoto id="home-hero" fill dark hideCaption rounded="rounded-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/50 to-forest-950/75" aria-hidden="true" />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-10 h-[42rem] w-[42rem] rounded-full bg-forest-500/15 blur-3xl"
        animate={reduce ? undefined : { scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <Container className="relative z-10 pb-16 pt-40 lg:pb-24">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-5xl">
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

        {/* Animated statistics */}
        <motion.dl
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-20 grid grid-cols-2 gap-8 border-t border-sand-100/15 pt-10 sm:mt-24 lg:grid-cols-5"
        >
          {companyStats.map((stat) => (
            <motion.div key={stat.label} variants={item}>
              <dd className="text-4xl font-semibold tracking-tight text-sand-50 sm:text-5xl">
                <Counter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={0}
                />
              </dd>
              <dt className="mt-2 text-sm text-sand-100/60">{stat.label}</dt>
            </motion.div>
          ))}
        </motion.dl>
      </Container>

      {/* Scroll hint */}
      {!reduce && (
        <motion.div
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 lg:block"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <div className="flex h-10 w-6 items-start justify-center rounded-full border border-sand-100/25 p-1.5">
            <div className="h-2 w-1 rounded-full bg-sand-100/50" />
          </div>
        </motion.div>
      )}
    </section>
  );
}
