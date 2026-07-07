import { Container } from "@/components/ui/Container";

const clients = [
  "Metropolitan Municipality",
  "Capital Development Agency",
  "National Airports Authority",
  "Office of Public Works",
  "Innovation University",
  "Emerald Developments",
];

/** Understated "trusted by" band directly beneath the hero. */
export function TrustStrip() {
  return (
    <section className="border-b border-forest-900/8 bg-paper py-10">
      <Container>
        <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-ink/40">
          Trusted by governments, developers and institutions
        </p>
        <div className="mt-8 grid grid-cols-2 items-center gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
          {clients.map((client) => (
            <span
              key={client}
              className="text-center text-sm font-medium tracking-tight text-ink/45 transition-colors hover:text-ink/70"
            >
              {client}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
