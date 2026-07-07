import Link from "next/link";
import type { Article } from "@/lib/data/news";
import { Placeholder } from "@/components/ui/Placeholder";
import { cn } from "@/lib/utils";

export function ArticleCard({ article, className }: { article: Article; className?: string }) {
  return (
    <Link href={`/news/${article.slug}`} className={cn("group block", className)}>
      <div className="overflow-hidden rounded-3xl">
        <Placeholder
          label={article.category}
          ratio="wide"
          rounded="rounded-3xl"
          className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-5">
        <div className="flex items-center gap-3 text-xs text-ink/45">
          <span className="font-medium uppercase tracking-[0.14em] text-forest-600">
            {article.category}
          </span>
          <span aria-hidden="true">·</span>
          <span>{article.date}</span>
        </div>
        <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-forest-700">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink/55">{article.excerpt}</p>
        <p className="mt-4 text-xs text-ink/40">{article.readTime}</p>
      </div>
    </Link>
  );
}
