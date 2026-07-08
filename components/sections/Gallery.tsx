import { Placeholder } from "@/components/ui/Placeholder";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export type GalleryPhoto = { label: string; image?: string };

type GalleryProps = {
  /** Simple labels (branded placeholders). */
  labels?: string[];
  /** Rich items with optional uploaded images. */
  items?: GalleryPhoto[];
  dark?: boolean;
  /** Number of columns at lg breakpoint. */
  columns?: 2 | 3 | 4;
  /** Starting number for the photo badges. */
  startNumber?: number;
};

/**
 * Editorial gallery grid. Every tile is numbered. Renders uploaded images
 * when present, otherwise a branded placeholder.
 */
export function Gallery({ labels, items, dark = false, columns = 3, startNumber = 1 }: GalleryProps) {
  const photos: GalleryPhoto[] = items ?? (labels ?? []).map((label) => ({ label }));
  const colClass = { 2: "lg:grid-cols-2", 3: "lg:grid-cols-3", 4: "lg:grid-cols-4" }[columns];

  return (
    <RevealGroup className={cn("grid gap-4 sm:grid-cols-2", colClass)}>
      {photos.map((photo, i) => {
        const wide = i % 6 === 0;
        return (
          <RevealItem key={`${photo.label}-${i}`} className={cn(wide && "sm:col-span-2 lg:col-span-2")}>
            <Placeholder
              label={photo.label}
              src={photo.image}
              number={startNumber + i}
              index={i + 1}
              ratio={wide ? "ultrawide" : "video"}
              dark={dark}
              rounded="rounded-2xl"
            />
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
