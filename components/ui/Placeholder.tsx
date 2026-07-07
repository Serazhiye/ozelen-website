import { cn } from "@/lib/utils";

type PlaceholderProps = {
  /** Descriptive label shown to communicate the intended image, e.g. "Drone View". */
  label: string;
  /** Aspect ratio helper. Ignored when `fill` is used. */
  ratio?: "square" | "video" | "portrait" | "wide" | "ultrawide" | "auto";
  /** Fill the parent (parent must be relatively positioned with a height). */
  fill?: boolean;
  dark?: boolean;
  rounded?: string;
  className?: string;
  /** Optional index number rendered in the corner (for galleries). */
  index?: number;
  priorityHint?: string;
};

const ratioClass: Record<NonNullable<PlaceholderProps["ratio"]>, string> = {
  square: "aspect-square",
  video: "aspect-[16/10]",
  portrait: "aspect-[3/4]",
  wide: "aspect-[3/2]",
  ultrawide: "aspect-[21/9]",
  auto: "",
};

/**
 * Premium image placeholder.
 * Preserves the final layout so real photography can drop in later.
 * Renders a subtle branded gradient surface, a mountain/landscape glyph,
 * and a discreet caption — never a loud "no image" box.
 */
export function Placeholder({
  label,
  ratio = "video",
  fill = false,
  dark = false,
  rounded = "rounded-3xl",
  className,
  index,
}: PlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`Image placeholder: ${label}`}
      className={cn(
        "group relative overflow-hidden",
        fill ? "absolute inset-0 h-full w-full" : "w-full",
        !fill && ratioClass[ratio],
        dark ? "placeholder-surface--dark" : "placeholder-surface",
        rounded,
        className,
      )}
    >
      {/* Fine hairline frame */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          rounded,
          dark ? "ring-1 ring-inset ring-white/10" : "ring-1 ring-inset ring-forest-900/10",
        )}
      />

      {/* Centered landscape glyph */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 64 64"
          className={cn(
            "h-14 w-14 transition-transform duration-700 ease-out-expo group-hover:scale-110",
            dark ? "text-sand-100/40" : "text-forest-900/15",
          )}
          fill="none"
          aria-hidden="true"
        >
          <circle cx="44" cy="18" r="6" stroke="currentColor" strokeWidth="1.5" />
          <path d="M4 46l14-16 10 11 8-8 24 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 54h60" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Caption + optional index */}
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-4">
        <span
          className={cn(
            "text-[0.7rem] font-medium uppercase tracking-[0.16em]",
            dark ? "text-sand-100/70" : "text-forest-900/45",
          )}
        >
          {label}
        </span>
        {typeof index === "number" && (
          <span
            className={cn(
              "text-[0.7rem] font-medium tabular-nums",
              dark ? "text-sand-100/50" : "text-forest-900/35",
            )}
          >
            {String(index).padStart(2, "0")}
          </span>
        )}
      </div>
    </div>
  );
}
