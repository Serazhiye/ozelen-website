"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { projects } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

// Map project "span" to grid classes for a masonry-like rhythm.
const spanClass: Record<string, string> = {
  lg: "lg:col-span-2",
  md: "lg:col-span-1",
  sm: "lg:col-span-1",
};

export function ProjectsExplorer() {
  const [active, setActive] = useState("All");
  const reduce = useReducedMotion();

  const filtered = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active],
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
          {filtered.map((project) => (
            <motion.div
              key={project.slug}
              layout={!reduce}
              initial={{ opacity: 0, y: reduce ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: reduce ? 1 : 0.98 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className={cn(spanClass[project.span])}
            >
              <ProjectCard
                project={project}
                ratio={project.span === "lg" ? "ultrawide" : "wide"}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
