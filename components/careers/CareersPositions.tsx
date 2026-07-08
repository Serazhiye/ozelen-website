"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePositions } from "@/components/admin/usePositions";

/** Open-positions list that reflects live admin edits (localStorage). */
export function CareersPositions() {
  const positions = usePositions();

  return (
    <div className="mt-14 divide-y divide-forest-900/10 border-y border-forest-900/10">
      {positions.length === 0 && (
        <p className="py-12 text-center text-ink/50">
          Сейчас открытых вакансий нет — отправьте инициативную заявку ниже.
        </p>
      )}
      <AnimatePresence initial={false}>
        {positions.map((p, i) => (
          <motion.a
            key={`${p.title}-${p.location}-${i}`}
            href="#apply"
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="group grid grid-cols-1 items-center gap-3 py-6 sm:grid-cols-12 sm:gap-6"
          >
            <div className="sm:col-span-5">
              <h3 className="text-lg font-semibold text-ink transition-colors group-hover:text-forest-700">
                {p.title}
              </h3>
            </div>
            <div className="text-sm text-ink/55 sm:col-span-3">{p.department}</div>
            <div className="text-sm text-ink/55 sm:col-span-2">{p.location}</div>
            <div className="flex items-center justify-between sm:col-span-2 sm:justify-end">
              <span className="rounded-full bg-forest-50 px-3 py-1 text-xs font-medium text-forest-700">
                {p.type}
              </span>
              <svg className="ml-4 h-4 w-4 text-forest-600 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </motion.a>
        ))}
      </AnimatePresence>
    </div>
  );
}
