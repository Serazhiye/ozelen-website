import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import whiteLogo from "@/public/logo-nord-white.png";
import greenLogo from "@/public/logo-nord-green.png";

/**
 * Nord Botanic wordmark logo.
 * `tone` picks the variant that reads on the current background:
 *  - "light" → white logo (use on dark surfaces: hero, footer, mobile menu)
 *  - "dark"  → forest-green logo (use on light surfaces: scrolled navbar)
 */
export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <Link
      href="/"
      aria-label={`${site.legalName} — главная`}
      className="inline-flex items-center"
    >
      <Image
        src={tone === "light" ? whiteLogo : greenLogo}
        alt={site.legalName}
        priority
        className="h-7 w-auto sm:h-8"
        sizes="180px"
      />
    </Link>
  );
}
