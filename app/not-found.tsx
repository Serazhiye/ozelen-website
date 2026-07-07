import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { mainNav } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[90svh] items-center overflow-hidden bg-forest-950 text-sand-50">
      <div className="placeholder-surface--dark absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-40 top-10 h-[36rem] w-[36rem] rounded-full bg-forest-500/15 blur-3xl" aria-hidden="true" />

      <Container className="relative">
        <div className="max-w-2xl">
          <span className="eyebrow text-sand-200 before:bg-sand-300/50">Ошибка 404</span>
          <p className="mt-8 font-display text-[7rem] font-semibold leading-none tracking-tightest text-sand-50/90 sm:text-[10rem]">
            404
          </p>
          <h1 className="mt-4 font-display text-display-sm font-semibold text-balance">
            Этот участок ещё не озеленён.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-sand-100/70">
            Страница, которую вы ищете, могла переместиться или никогда не существовать. Давайте вернёмся на твёрдую почву.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button href="/" variant="light" size="lg" withArrow>
              На главную
            </Button>
            <Button href="/contact" variant="secondary" size="lg" className="border-sand-100/25 text-sand-50 hover:border-sand-100/50 hover:bg-white/5">
              Связаться с нами
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-sand-100/15 pt-8">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-sand-100/60 transition-colors hover:text-sand-50 link-underline"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
