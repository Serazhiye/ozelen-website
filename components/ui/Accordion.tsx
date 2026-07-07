"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Faq } from "@/lib/data/services";

/** Accessible FAQ accordion with animated disclosure. */
export function Accordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-forest-900/10 border-y border-forest-900/10">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="text-lg font-medium text-ink">{item.question}</span>
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-forest-900/15 transition-transform duration-500 ease-out-expo ${
                    isOpen ? "rotate-45 bg-forest-900 text-sand-50" : "text-forest-700"
                  }`}
                  aria-hidden="true"
                >
                  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M8 3v10M3 8h10" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-6 text-base leading-relaxed text-ink/60">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
