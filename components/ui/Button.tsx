import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "light";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2.5 rounded-full font-medium tracking-tight transition-all duration-500 ease-out-expo focus-visible:outline-none disabled:opacity-50 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary:
    "bg-forest-900 text-sand-50 hover:bg-forest-800 shadow-subtle hover:shadow-lift",
  secondary:
    "border border-forest-900/15 text-ink hover:border-forest-900/40 hover:bg-forest-50",
  ghost: "text-ink hover:text-forest-700",
  light:
    "bg-sand-50 text-forest-900 hover:bg-white shadow-subtle hover:shadow-lift",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-[0.95rem]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  withArrow?: boolean;
};

function Arrow() {
  return (
    <svg
      className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type ButtonLinkProps = CommonProps & {
  href: string;
  external?: boolean;
};

/** Primary CTA control. Renders as a Next link (internal) or anchor (external). */
export function Button({
  href,
  external,
  variant = "primary",
  size = "md",
  className,
  children,
  withArrow,
}: ButtonLinkProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      {children}
      {withArrow && <Arrow />}
    </>
  );

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
