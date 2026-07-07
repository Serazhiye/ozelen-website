"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type CounterProps = {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
};

/**
 * Animated number that counts up once it enters the viewport.
 * Uses an eased requestAnimationFrame loop; respects reduced motion.
 */
export function Counter({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 1.8,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }

    let raf = 0;
    let start: number | null = null;
    const ms = duration * 1000;

    const tick = (t: number) => {
      if (start === null) start = t;
      const progress = Math.min((t - start) / ms, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(value * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, reduce]);

  const formatted = display.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
