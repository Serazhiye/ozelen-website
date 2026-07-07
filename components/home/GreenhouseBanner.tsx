import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Placeholder } from "@/components/ui/Placeholder";
import { Reveal } from "@/components/motion/Reveal";

/** Large clickable banner linking to the dedicated Greenhouse (Теплица) page. */
export function GreenhouseBanner() {
  return (
    <section className="bg-paper pb-section">
      <Container>
        <Reveal>
          <Link
            href="/greenhouse"
            className="group relative block overflow-hidden rounded-[2.5rem] border border-forest-900/8 bg-mist"
          >
            <div className="grid lg:grid-cols-2">
              {/* Copy */}
              <div className="order-2 flex flex-col justify-center p-8 sm:p-12 lg:order-1 lg:p-16">
                <span className="eyebrow">
                  🌱 Наш тепличный комплекс
                </span>
                <h2 className="mt-6 font-display text-display-sm font-semibold tracking-tight text-ink text-balance">
                  Теплица Nord Botanic
                </h2>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-ink/60 text-pretty">
                  Круглый год выращиваем и закаляем собственный посадочный материал под суровый
                  климат региона — от саженцев деревьев до цветочной рассады.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-forest-700">
                    Узнать о теплице
                    <svg className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div className="flex items-center gap-6 text-sm text-ink/50">
                    <span><strong className="font-semibold text-ink">24 000 м²</strong> теплиц</span>
                    <span><strong className="font-semibold text-ink">1,5 млн</strong> в год</span>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="relative order-1 min-h-[16rem] lg:order-2 lg:min-h-[24rem]">
                <Placeholder
                  label="Тепличный комплекс"
                  fill
                  dark
                  rounded="rounded-none"
                  className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
                />
              </div>
            </div>
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
