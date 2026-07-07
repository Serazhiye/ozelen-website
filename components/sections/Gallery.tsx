import { Placeholder } from "@/components/ui/Placeholder";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

type GalleryProps = {
  labels: string[];
  dark?: boolean;
  /** Number of columns at lg breakpoint. */
  columns?: 2 | 3 | 4;
};

/**
 * Editorial gallery grid. First tile spans wide to create rhythm,
 * remaining tiles fill a balanced grid — layout is preserved for real photos.
 */
export function Gallery({ labels, dark = false, columns = 3 }: GalleryProps) {
  const colClass = { 2: "lg:grid-cols-2", 3: "lg:grid-cols-3", 4: "lg:grid-cols-4" }[columns];

  return (
    <RevealGroup className={cn("grid gap-4 sm:grid-cols-2", colClass)}>
      {labels.map((label, i) => {
        // Give the grid rhythm: the first and every 6th tile span two columns.
        const wide = i % 6 === 0;
        return (
          <RevealItem
            key={`${label}-${i}`}
            className={cn(wide && "sm:col-span-2 lg:col-span-2")}
          >
            <Placeholder
              label={label}
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
