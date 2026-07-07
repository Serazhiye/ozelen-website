"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { articles, newsCategories } from "@/lib/data/news";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 6;

export function NewsExplorer() {
  const [category, setCategory] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const reduce = useReducedMotion();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      const matchesCat = category === "All" || a.category === category;
      const matchesQuery =
        !q || a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [category, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const paged = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const reset = (fn: () => void) => {
    fn();
    setPage(1);
  };

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col gap-6 border-b border-forest-900/10 pb-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {newsCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => reset(() => setCategory(cat))}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                category === cat
                  ? "bg-forest-900 text-sand-50"
                  : "text-ink/55 hover:text-ink",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative lg:w-72">
          <svg
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <circle cx="7" cy="7" r="5" />
            <path d="M11 11l3 3" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => reset(() => setQuery(e.target.value))}
            placeholder="Search articles"
            aria-label="Search articles"
            className="w-full rounded-full border border-forest-900/12 bg-paper py-3 pl-11 pr-4 text-sm text-ink placeholder:text-ink/40 focus:border-forest-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Results */}
      {paged.length > 0 ? (
        <motion.div layout className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {paged.map((article) => (
              <motion.div
                key={article.slug}
                layout={!reduce}
                initial={{ opacity: 0, y: reduce ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <ArticleCard article={article} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <p className="mt-16 text-center text-ink/50">No articles match your search.</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-16 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPage(i + 1)}
              aria-label={`Page ${i + 1}`}
              aria-current={current === i + 1}
              className={cn(
                "h-10 w-10 rounded-full text-sm font-medium transition-colors",
                current === i + 1
                  ? "bg-forest-900 text-sand-50"
                  : "border border-forest-900/12 text-ink/60 hover:border-forest-900/30",
              )}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
