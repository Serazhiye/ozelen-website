import { site } from "@/lib/site";

/** Stylised interactive-map placeholder — abstract street grid + location pin. */
export function MapPlaceholder() {
  return (
    <div
      role="img"
      aria-label="Карта расположения головного офиса Nord Botanic"
      className="placeholder-surface--dark relative aspect-[16/10] w-full overflow-hidden rounded-4xl"
    >
      {/* Abstract street network */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 500" fill="none" aria-hidden="true">
        <g className="stroke-sand-100/10" strokeWidth="1.5">
          <path d="M0 120h800M0 250h800M0 380h800" />
          <path d="M160 0v500M360 0v500M520 0v500M680 0v500" />
        </g>
        <g className="stroke-sand-100/15" strokeWidth="3">
          <path d="M0 250h800" />
          <path d="M360 0v500" />
        </g>
        <path d="M0 60C200 90 240 200 420 210s280 120 380 90" className="stroke-forest-400/30" strokeWidth="6" fill="none" />
        <g className="fill-sand-100/5">
          <rect x="200" y="160" width="120" height="70" rx="6" />
          <rect x="420" y="290" width="150" height="60" rx="6" />
          <rect x="560" y="150" width="90" height="80" rx="6" />
        </g>
      </svg>

      {/* Pin */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
        <div className="flex flex-col items-center">
          <div className="rounded-2xl bg-sand-50 px-4 py-2 text-center shadow-lift">
            <p className="text-xs font-semibold text-forest-900">{site.office.label}</p>
            <p className="text-[0.7rem] text-forest-900/60">{site.office.lines[1]}</p>
          </div>
          <svg className="mt-1 h-6 w-6 text-sand-50" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 22s7-7.5 7-12a7 7 0 1 0-14 0c0 4.5 7 12 7 12Z" />
          </svg>
        </div>
      </div>

      <span className="absolute bottom-4 left-4 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-sand-100/50">
        Интерактивная карта
      </span>
    </div>
  );
}
