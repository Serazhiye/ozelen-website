import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GoogleMap } from "@/components/ui/GoogleMap";
import { StaticPhoto, StaticGallery } from "@/components/photos/StaticPhoto";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { greenhouse } from "@/lib/data/greenhouse";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Тепличный комплекс",
  description:
    "Собственный тепличный комплекс Nord Botanic в пос. Станционный под Кокшетау: круглогодичное выращивание и закалка посадочного материала для городских проектов.",
};

export default function GreenhousePage() {
  return (
    <>
      <PageHero
        eyebrow={greenhouse.eyebrow}
        title={greenhouse.title}
        intro={greenhouse.intro}
        size="lg"
        crumbs={[{ label: "Главная", href: "/" }, { label: "Теплица" }]}
        meta={[
          { label: "Площадь теплицы", value: "0,3 га" },
          { label: "Культура", value: "Салаты" },
          { label: "Технология", value: "Гидропоника" },
          { label: "Расположение", value: "пос. Станционный" },
        ]}
      />

      {/* Hero image */}
      <section className="bg-paper pt-12 lg:pt-16">
        <Container>
          <Reveal>
            <StaticPhoto id="greenhouse-hero" ratio="ultrawide" rounded="rounded-4xl" />
          </Reveal>
        </Container>
      </section>

      {/* Overview + stats */}
      <section className="bg-paper py-section">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeading eyebrow="О комплексе" title="Вертикальная интеграция — от семени до объекта." />
              <div className="mt-8 space-y-6">
                {greenhouse.overview.map((para, i) => (
                  <Reveal key={i} delay={i * 0.05}>
                    <p className="text-lg leading-relaxed text-ink/65 text-pretty">{para}</p>
                  </Reveal>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={0.1}>
                <div className="rounded-4xl border border-forest-900/8 bg-mist p-8 lg:p-10">
                  <h3 className="text-sm font-medium uppercase tracking-[0.16em] text-forest-600">В цифрах</h3>
                  <dl className="mt-8 grid grid-cols-2 gap-8">
                    {greenhouse.stats.map((stat) => (
                      <div key={stat.label}>
                        <dd className="text-3xl font-semibold tracking-tight text-forest-800">{stat.value}</dd>
                        <dt className="mt-1 text-sm text-ink/55">{stat.label}</dt>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="bg-mist py-section">
        <Container>
          <SectionHeading
            eyebrow="Технологии"
            title="Что делает комплекс современным."
            className="max-w-2xl"
          />
          <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {greenhouse.features.map((f) => (
              <RevealItem key={f.title}>
                <div className="group h-full rounded-3xl border border-forest-900/8 bg-mist p-8 shadow-subtle transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-lift">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-paper text-3xl shadow-subtle transition-transform duration-500 ease-out-expo group-hover:-rotate-6 group-hover:scale-105" role="img" aria-hidden="true">
                    {f.icon}
                  </span>
                  <h3 className="mt-6 text-lg font-semibold text-ink">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/55">{f.description}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* Process */}
      <section className="bg-forest-950 py-section text-sand-50">
        <Container>
          <SectionHeading
            dark
            eyebrow="Цикл выращивания"
            title="От семени до высадки — пять этапов."
            className="max-w-2xl"
          />
          <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {greenhouse.process.map((step) => (
              <RevealItem key={step.number}>
                <div className="flex h-full flex-col">
                  <span className="text-sm font-medium tabular-nums text-sand-300/70">{step.number}</span>
                  <div className="mt-3 h-px w-full bg-sand-100/15" />
                  <h3 className="mt-5 text-lg font-semibold text-sand-50">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-sand-100/60">{step.description}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* Gallery */}
      <section className="bg-paper py-section">
        <Container>
          <SectionHeading eyebrow="Галерея" title="Внутри комплекса." className="max-w-2xl" />
          <div className="mt-14">
            <StaticGallery prefix="greenhouse-gallery" columns={3} />
          </div>
        </Container>
      </section>

      {/* Address */}
      <section className="bg-mist py-section">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading eyebrow="Расположение" title="Где находится комплекс." />
              <address className="mt-8 not-italic text-lg leading-relaxed text-ink/70">
                {site.greenhouse.lines.map((line) => (
                  <span key={line} className="block">{line}</span>
                ))}
              </address>
              <p className="mt-6 text-sm text-ink/55">
                По вопросам поставки салата и сотрудничества:{" "}
                <a href={site.contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="font-medium text-forest-700 link-underline">
                  WhatsApp {site.contact.phone}
                </a>
              </p>
            </div>
            <div className="lg:col-span-7">
              <Reveal>
                <GoogleMap
                  query="Казахстан, Акмолинская область, посёлок Станционный"
                  title="Тепличный комплекс Nord Botanic на карте Google"
                  zoom={13}
                  className="aspect-[16/11] w-full"
                />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <CTASection
        eyebrow="Сотрудничество"
        title="Нужен качественный посадочный материал?"
        intro="Расскажите о вашем проекте — подберём и вырастим растения под ваши условия и сроки."
      />
    </>
  );
}
