"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./Logo";
import { mainNav, site } from "@/lib/site";
import { services } from "@/lib/data/services";
import { projects } from "@/lib/data/projects";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { cn } from "@/lib/utils";

type MegaKey = "services" | "projects" | null;

// Which nav hrefs open a mega panel.
const megaFor = (href: string): MegaKey =>
  href === "/services" ? "services" : href === "/projects" ? "projects" : null;

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mega, setMega] = useState<MegaKey>(null);

  // Solidify the bar once the user scrolls off the hero. The header stays visible.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close overlays on route change.
  useEffect(() => {
    setMobileOpen(false);
    setMega(null);
  }, [pathname]);

  // Lock body scroll when the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const solid = scrolled || mega !== null;
  const tone: "dark" | "light" = solid ? "dark" : "light";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out-expo",
        solid
          ? "border-b border-forest-900/8 bg-paper/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
      onMouseLeave={() => setMega(null)}
    >
      <nav className="container-x flex h-[76px] items-center justify-between" aria-label="Основная навигация">
        <Logo tone={tone} />

        {/* Desktop navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => {
            const itemMega = megaFor(item.href);
            const active = pathname.startsWith(item.href);
            return (
              <div
                key={item.href}
                onMouseEnter={() => setMega(itemMega)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                    tone === "light"
                      ? "text-sand-50/80 hover:text-sand-50"
                      : "text-ink/70 hover:text-ink",
                    active && (tone === "light" ? "text-sand-50" : "text-ink"),
                  )}
                  aria-expanded={itemMega ? mega === itemMega : undefined}
                >
                  {item.label}
                </Link>
              </div>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href={site.contact.phoneHref}
            className={cn(
              "text-sm font-medium tabular-nums transition-colors",
              tone === "light" ? "text-sand-50/70 hover:text-sand-50" : "text-ink/60 hover:text-ink",
            )}
          >
            {site.contact.phone}
          </Link>
          <Link
            href="/contact"
            className={cn(
              "rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-500 ease-out-expo",
              tone === "light"
                ? "bg-sand-50 text-forest-900 hover:bg-white"
                : "bg-forest-900 text-sand-50 hover:bg-forest-800",
            )}
          >
            Заказать консультацию
          </Link>
        </div>

        {/* Mobile trigger */}
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="lg:hidden"
          aria-label="Открыть меню"
        >
          <div className="flex flex-col items-end gap-1.5">
            <span className={cn("h-0.5 w-6 rounded-full transition-colors", tone === "light" ? "bg-sand-50" : "bg-ink")} />
            <span className={cn("h-0.5 w-4 rounded-full transition-colors", tone === "light" ? "bg-sand-50" : "bg-ink")} />
          </div>
        </button>
      </nav>

      {/* Desktop mega menu */}
      <AnimatePresence>
        {mega && (
          <motion.div
            key={mega}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-full hidden border-b border-forest-900/8 bg-paper/95 backdrop-blur-xl lg:block"
          >
            <div className="container-x py-8">
              {mega === "services" ? (
                <div className="grid grid-cols-4 gap-x-8 gap-y-2">
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="group flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-mist"
                    >
                      <span className="mt-0.5">
                        <ServiceIcon emoji={s.icon} className="text-xl" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-ink">{s.title}</span>
                        <span className="mt-0.5 block text-xs leading-relaxed text-ink/50">
                          {s.tagline}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-6">
                  {projects.slice(0, 6).map((p) => (
                    <Link
                      key={p.slug}
                      href={`/projects/${p.slug}`}
                      className="group flex items-center justify-between rounded-2xl border border-transparent p-4 transition-colors hover:border-forest-900/10 hover:bg-mist"
                    >
                      <span>
                        <span className="block text-xs uppercase tracking-[0.16em] text-forest-600">
                          {p.category}
                        </span>
                        <span className="mt-1 block text-sm font-semibold text-ink">{p.title}</span>
                        <span className="mt-0.5 block text-xs text-ink/50">
                          {p.location} · {p.year}
                        </span>
                      </span>
                      <span className="text-forest-600 opacity-0 transition-opacity group-hover:opacity-100">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              )}
              <div className="mt-6 flex items-center justify-between border-t border-forest-900/8 pt-5">
                <p className="text-sm text-ink/50">
                  {mega === "services"
                    ? "Зелёная инфраструктура полного цикла, рассчитанная от и до."
                    : "Избранные работы в госсекторе, транспорте и застройке."}
                </p>
                <Link
                  href={mega === "services" ? "/services" : "/projects"}
                  className="text-sm font-medium text-forest-700 link-underline"
                >
                  {mega === "services" ? "Все услуги" : "Все проекты"} →
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-forest-950 lg:hidden"
          >
            <div className="container-x flex h-[76px] items-center justify-between">
              <Logo tone="light" />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Закрыть меню"
                className="text-sand-50"
              >
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
              className="container-x mt-6 flex flex-col"
            >
              {mainNav.map((item) => (
                <motion.div
                  key={item.href}
                  variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                >
                  <Link
                    href={item.href}
                    className="block border-b border-sand-50/10 py-5 text-3xl font-semibold tracking-tight text-sand-50"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                className="mt-8 space-y-4"
              >
                <Link
                  href="/contact"
                  className="flex w-full items-center justify-center rounded-full bg-sand-50 px-6 py-4 text-base font-medium text-forest-900"
                >
                  Заказать консультацию
                </Link>
                <a href={site.contact.phoneHref} className="block text-center text-sand-100/70">
                  {site.contact.phone}
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
