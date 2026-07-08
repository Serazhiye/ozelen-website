import { cn } from "@/lib/utils";

type PlaceholderProps = {
  /** Descriptive label shown to communicate the intended image, e.g. "Drone View". */
  label: string;
  /** Uploaded image (data URL). When present, the real image is rendered. */
  src?: string;
  /** Visible photo number badge (top-left). */
  number?: number;
  /** Aspect ratio helper. Ignored when `fill` is used. */
  ratio?: "square" | "video" | "portrait" | "wide" | "ultrawide" | "auto";
  /** Fill the parent (parent must be relatively positioned with a height). */
  fill?: boolean;
  dark?: boolean;
  rounded?: string;
  className?: string;
  /** Optional index number rendered in the bottom corner (for galleries). */
  index?: number;
  /** Hide the bottom label caption (used when the placeholder is a background). */
  hideCaption?: boolean;
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
 * Premium image slot. If `src` is set (an uploaded image), it renders the real
 * photo; otherwise it shows a branded placeholder that preserves the layout.
 * Every slot can display a number badge so photos can be referenced/edited.
 */
export function Placeholder({
  label,
  src,
  number,
  ratio = "video",
  fill = false,
  dark = false,
  rounded = "rounded-3xl",
  className,
  index,
  hideCaption = false,
}: PlaceholderProps) {
  const shape = cn(
    "group relative overflow-hidden",
    fill ? "absolute inset-0 h-full w-full" : "w-full",
    !fill && ratioClass[ratio],
    rounded,
    className,
  );

  const numberBadge =
    typeof number === "number" ? (
      <span
        className={cn(
          "absolute left-3 top-3 z-10 inline-flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-[0.7rem] font-semibold tabular-nums",
          src || dark ? "bg-forest-950/70 text-sand-50 backdrop-blur-sm" : "bg-forest-900 text-sand-50",
        )}
      >
        {number}
      </span>
    ) : null;

  // Real uploaded image
  if (src) {
    return (
      <div className={shape} role="img" aria-label={label}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={label}
          className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
        />
        {numberBadge}
      </div>
    );
  }

  // Branded placeholder
  return (
    <div
      role="img"
      aria-label={`Заглушка изображения: ${label}`}
      className={cn(shape, dark ? "placeholder-surface--dark" : "placeholder-surface")}
    >
      {numberBadge}
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          rounded,
          dark ? "ring-1 ring-inset ring-white/10" : "ring-1 ring-inset ring-forest-900/10",
        )}
      />
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
      <div className={cn("absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-4", hideCaption && "hidden")}>
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
