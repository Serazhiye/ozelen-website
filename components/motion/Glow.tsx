"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Soft, slowly-breathing blurred blob used to add depth to otherwise flat
 * light sections. Purely decorative.
 */
export function Glow({
  className,
  color = "forest",
  delay = 0,
}: {
  className?: string;
  color?: "forest" | "sand";
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const tint = color === "forest" ? "bg-forest-400/20" : "bg-sand-300/25";

  return (
    <motion.div
      aria-hidden="true"
      className={cn("pointer-events-none absolute rounded-full blur-3xl", tint, className)}
      animate={reduce ? undefined : { scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}
