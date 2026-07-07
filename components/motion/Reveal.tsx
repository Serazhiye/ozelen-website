"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in seconds */
  delay?: number;
  y?: number;
  as?: "div" | "section" | "article" | "li" | "span";
  once?: boolean;
};

/**
 * Scroll-reveal wrapper. Fades and lifts content into view once.
 * Honors reduced-motion by rendering statically.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  as = "div",
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </MotionTag>
  );
}

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

/** Staggered container — pair with <RevealItem> children. */
export function RevealGroup({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "ul" | "section";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag className={cn(className)} variants={itemVariants}>
      {children}
    </MotionTag>
  );
}
