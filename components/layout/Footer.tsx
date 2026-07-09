import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import { AdminTrigger } from "@/components/admin/AdminTrigger";
import { footerNav, site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest-950 text-sand-100/70">
      <Container className="py-20 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-12">
          {/* Brand + contact */}
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-6 max-w-sm text-pretty leading-relaxed text-sand-100/60">
              {site.description}
            </p>
            <div className="mt-8 space-y-2 text-sm">
              <a href={site.contact.phoneHref} className="block transition-colors hover:text-sand-50">
                {site.contact.phone}
              </a>
              <a href={site.contact.whatsappHref} className="block transition-colors hover:text-sand-50" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
              <a href={site.contact.instagramHref} className="block transition-colors hover:text-sand-50" target="_blank" rel="noopener noreferrer">
                Instagram {site.contact.instagram}
              </a>
            </div>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            {footerNav.map((col) => (
              <div key={col.title}>
                <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-sand-200/50">
                  {col.title}
                </h3>
                <ul className="mt-5 space-y-3 text-sm">
                  {col.items.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="transition-colors hover:text-sand-50">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Office */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-sand-200/50">
              {site.office.label}
            </h3>
            <address className="mt-5 not-italic text-sm leading-relaxed text-sand-100/60">
              {site.office.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <div className="mt-6 flex flex-wrap gap-3">
              {site.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-sand-100/15 px-4 py-2 text-xs transition-colors hover:border-sand-100/40 hover:text-sand-50"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col gap-4 border-t border-sand-100/10 pt-8 text-xs text-sand-100/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. Все права защищены.
          </p>
          <p className="tracking-wide">{site.tagline}</p>
          {/* Discreet admin launcher */}
          <AdminTrigger />
        </div>
      </Container>
    </footer>
  );
}
