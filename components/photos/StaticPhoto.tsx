"use client";

import { Placeholder } from "@/components/ui/Placeholder";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { useStaticImages } from "@/components/admin/useStore";
import { getSlot, slotsByPrefix } from "@/lib/photos";
import { cn } from "@/lib/utils";

type Ratio = "square" | "video" | "portrait" | "wide" | "ultrawide" | "auto";

/** A single registry-backed static photo (numbered, replaceable from admin). */
export function StaticPhoto({
  id,
  ratio = "video",
  dark = false,
  rounded = "rounded-3xl",
  fill = false,
  hideCaption = false,
  className,
}: {
  id: string;
  ratio?: Ratio;
  dark?: boolean;
  rounded?: string;
  fill?: boolean;
  hideCaption?: boolean;
  className?: string;
}) {
  const images = useStaticImages();
  const slot = getSlot(id);
  return (
    <Placeholder
      label={slot?.label ?? id}
      src={images[id]}
      number={slot?.number}
      ratio={ratio}
      dark={dark}
      rounded={rounded}
      fill={fill}
      hideCaption={hideCaption}
      className={className}
    />
  );
}

/** Gallery of registry-backed static photos, addressed by id prefix. */
export function StaticGallery({ prefix, columns = 3 }: { prefix: string; columns?: 2 | 3 | 4 }) {
  const images = useStaticImages();
  const slots = slotsByPrefix(prefix);
  const colClass = { 2: "lg:grid-cols-2", 3: "lg:grid-cols-3", 4: "lg:grid-cols-4" }[columns];

  return (
    <RevealGroup className={cn("grid gap-4 sm:grid-cols-2", colClass)}>
      {slots.map((slot, i) => {
        const wide = i % 6 === 0;
        return (
          <RevealItem key={slot.id} className={cn(wide && "sm:col-span-2 lg:col-span-2")}>
            <Placeholder
              label={slot.label}
              src={images[slot.id]}
              number={slot.number}
              ratio={wide ? "ultrawide" : "video"}
              rounded="rounded-2xl"
            />
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
