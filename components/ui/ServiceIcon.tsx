import { cn } from "@/lib/utils";

/**
 * Renders an emoji glyph for a service or industry.
 * (Replaces the earlier custom line-icon set — the data layer now
 * provides an emoji per item.)
 */
export function ServiceIcon({
  emoji,
  className,
}: {
  emoji: string;
  className?: string;
}) {
  return (
    <span
      role="img"
      aria-hidden="true"
      className={cn("inline-flex select-none items-center justify-center leading-none", className)}
    >
      {emoji}
    </span>
  );
}
