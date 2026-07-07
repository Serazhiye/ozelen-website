import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/** Wordmark + sphere glyph. `tone` adapts it to light or dark backgrounds. */
export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <Link
      href="/"
      aria-label={`${site.legalName} — home`}
      className="group inline-flex items-center gap-2.5"
    >
      <span className="relative inline-flex h-8 w-8 items-center justify-center">
        <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" aria-hidden="true">
          <circle
            cx="16"
            cy="16"
            r="14"
            className={cn(tone === "light" ? "stroke-sand-100/40" : "stroke-forest-900/20")}
            strokeWidth="1.5"
          />
          <path
            d="M16 4c5 4 6 8 6 12s-3 8-6 12c-3-4-6-8-6-12s1-8 6-12Z"
            className={cn(tone === "light" ? "fill-sand-100" : "fill-forest-800")}
          />
          <path
            d="M16 4v24"
            className={cn(tone === "light" ? "stroke-forest-900/40" : "stroke-sand-100/60")}
            strokeWidth="1"
          />
        </svg>
      </span>
      <span
        className={cn(
          "text-[1.05rem] font-semibold tracking-tight",
          tone === "light" ? "text-sand-50" : "text-ink",
        )}
      >
        Green<span className="text-forest-500">Sphere</span>
      </span>
    </Link>
  );
}
