import { Placeholder } from "@/components/ui/Placeholder";
import { cn } from "@/lib/utils";

export type ArticleCardData = {
  title: string;
  source: string;
  category: string;
  date: string;
  url: string;
  excerpt: string;
  image?: string;
};

/** External-press card — links out to the publishing outlet in a new tab. */
export function ArticleCard({
  article,
  number,
  className,
}: {
  article: ArticleCardData;
  number?: number;
  className?: string;
}) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("group block", className)}
    >
      <div className="relative overflow-hidden rounded-3xl">
        <Placeholder
          label={article.source}
          src={article.image}
          number={number}
          ratio="wide"
          rounded="rounded-3xl"
          className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
        />
        <span className="absolute right-4 top-4 z-10 rounded-full bg-sand-50/90 px-3 py-1 text-[0.7rem] font-medium text-forest-900">
          {article.source}
        </span>
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
        <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-forest-700">
          Читать в источнике
          <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M4 12L12 4M6 4h6v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </p>
      </div>
    </a>
  );
}
