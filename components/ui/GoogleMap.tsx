import { cn } from "@/lib/utils";

/**
 * Interactive Google Maps embed (no API key required).
 * `query` is a free-form address/place searched by Google Maps.
 */
export function GoogleMap({
  query,
  title,
  zoom = 15,
  className,
}: {
  query: string;
  title: string;
  zoom?: number;
  className?: string;
}) {
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(
    query,
  )}&t=&z=${zoom}&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className={cn("overflow-hidden rounded-4xl border border-forest-900/10 shadow-subtle", className)}>
      <iframe
        title={title}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full w-full"
        style={{ border: 0, minHeight: "100%" }}
      />
    </div>
  );
}
