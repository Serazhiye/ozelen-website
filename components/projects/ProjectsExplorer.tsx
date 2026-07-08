"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { useProjects } from "@/components/admin/useStore";
import { cn } from "@/lib/utils";

const ALL = "Все";

export function ProjectsExplorer() {
  const projects = useProjects();
  const [active, setActive] = useState(ALL);
  const reduce = useReducedMotion();

  const categories = useMemo(
    () => [ALL, ...Array.from(new Set(projects.map((p) => p.category)))],
    [projects],
  );

  const filtered = useMemo(
    () => (active === ALL ? projects : projects.filter((p) => p.category === active)),
    [active, projects],
  );

  return (
    <div>
      {/* Filter tabs */}
      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className={cn(
              "shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300",
              active === cat
                ? "bg-forest-900 text-sand-50"
                : "border border-forest-900/12 text-ink/60 hover:border-forest-900/30 hover:text-ink",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="mt-10 grid gap-8 lg:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              layout={!reduce}
              initial={{ opacity: 0, y: reduce ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: reduce ? 1 : 0.98 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard project={project} number={i + 1} ratio="wide" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-ink/50">В этой категории проектов пока нет.</p>
      )}
    </div>
  );
}
