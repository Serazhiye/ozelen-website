import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
  dark?: boolean;
};

/** Consistent eyebrow + oversized title + intro block used across sections. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
  titleClassName,
  dark = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <span className={cn("eyebrow", dark && "text-sand-200")}>{eyebrow}</span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2
          className={cn(
            "mt-5 font-display text-display-sm font-semibold text-balance",
            dark ? "text-sand-50" : "text-ink",
            titleClassName,
          )}
        >
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "mt-6 text-lg leading-relaxed text-pretty",
              dark ? "text-sand-100/70" : "text-ink/60",
            )}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
