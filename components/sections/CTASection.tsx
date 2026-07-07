import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/lib/site";

type CTASectionProps = {
  eyebrow?: string;
  title?: React.ReactNode;
  intro?: React.ReactNode;
};

/** Large premium closing CTA reused on Home, Service and Project pages. */
export function CTASection({
  eyebrow = "Начать проект",
  title = "Построим следующий зелёный ориентир вместе.",
  intro = "Расскажите о вашем участке, задании и амбициях. Наша команда ответит в течение одного рабочего дня.",
}: CTASectionProps) {
  return (
    <section className="bg-paper">
      <Container className="pb-section">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-forest-950 px-8 py-16 text-sand-50 sm:px-14 lg:px-20 lg:py-24">
          <div className="placeholder-surface--dark absolute inset-0 opacity-50" aria-hidden="true" />
          <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-forest-600/25 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-sand-400/10 blur-3xl" aria-hidden="true" />

          <div className="relative max-w-3xl">
            <Reveal>
              <span className="eyebrow text-sand-200 before:bg-sand-300/50">{eyebrow}</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-display text-display-md font-semibold text-balance">{title}</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-sand-100/70">{intro}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Button href="/contact" variant="light" size="lg" withArrow>
                  Заказать консультацию
                </Button>
                <Button href={site.contact.whatsappHref} external variant="secondary" size="lg" className="border-sand-100/25 text-sand-50 hover:border-sand-100/50 hover:bg-white/5">
                  WhatsApp
                </Button>
                <a
                  href={site.contact.phoneHref}
                  className="inline-flex items-center gap-2 px-2 py-2 text-sm font-medium text-sand-100/70 transition-colors hover:text-sand-50"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-sand-100/25">
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M4 4h3l1.5 4-2 1.5a10 10 0 0 0 4 4l1.5-2 4 1.5V16a1 1 0 0 1-1 1A13 13 0 0 1 3 5a1 1 0 0 1 1-1Z" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {site.contact.phone}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
