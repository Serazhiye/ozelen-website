"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Placeholder } from "@/components/ui/Placeholder";
import { useTeam } from "@/components/admin/useStore";

/** Team grid driven by the CMS store (editable via the admin panel). */
export function TeamGrid({ columns = 3 }: { columns?: 3 | 4 }) {
  const team = useTeam();
  const colClass = columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";

  return (
    <motion.div layout className={`mt-14 grid gap-8 sm:grid-cols-2 ${colClass}`}>
      <AnimatePresence initial={false}>
        {team.map((person, i) => (
          <motion.div
            key={person.id}
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.04 }}
            className="group"
          >
            <Placeholder
              label={`Портрет — ${person.name}`}
              src={person.photo}
              number={i + 1}
              ratio="portrait"
              rounded="rounded-3xl"
            />
            <h3 className="mt-5 text-lg font-semibold text-ink">{person.name}</h3>
            <p className="text-sm font-medium text-forest-700">{person.role}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink/55">{person.bio}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
