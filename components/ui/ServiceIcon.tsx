import type { IconKey } from "@/lib/data/services";
import { cn } from "@/lib/utils";

/** Minimal, consistent line icons for services & industries. */
const paths: Record<IconKey, React.ReactNode> = {
  landscaping: (
    <>
      <path d="M4 26h24M8 26c0-6 3-10 6-10s6 4 6 10" strokeLinecap="round" />
      <path d="M14 16V9M11 12l3-3 3 3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="23" cy="20" r="3" />
    </>
  ),
  park: (
    <>
      <path d="M16 27v-9" strokeLinecap="round" />
      <path d="M16 18c-4 0-7-3-7-7 0-3 3-6 7-6s7 3 7 6c0 4-3 7-7 7Z" />
      <path d="M6 27h20" strokeLinecap="round" />
    </>
  ),
  boulevard: (
    <>
      <path d="M9 28l3-20M23 28l-3-20" strokeLinecap="round" />
      <path d="M16 6v22" strokeLinecap="round" strokeDasharray="2 3" />
      <circle cx="16" cy="6" r="2.5" />
    </>
  ),
  tree: (
    <>
      <path d="M16 28v-8" strokeLinecap="round" />
      <path d="M16 20c-3.5 0-6-2.2-6-5.5S12.5 6 16 6s6 5.2 6 8.5S19.5 20 16 20Z" />
      <path d="M13 15l3 3 3-3" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  infrastructure: (
    <>
      <rect x="6" y="6" width="9" height="9" rx="1.5" />
      <rect x="17" y="6" width="9" height="9" rx="1.5" />
      <rect x="6" y="17" width="9" height="9" rx="1.5" />
      <rect x="17" y="17" width="9" height="9" rx="1.5" />
    </>
  ),
  irrigation: (
    <>
      <path d="M16 5c3 4 5 7 5 10a5 5 0 0 1-10 0c0-3 2-6 5-10Z" />
      <path d="M8 24c2 1.5 3 1.5 5 0M19 24c2 1.5 3 1.5 5 0" strokeLinecap="round" />
    </>
  ),
  restoration: (
    <>
      <path d="M16 27c6 0 10-4 10-10-6 0-10 4-10 10Z" />
      <path d="M16 27C10 27 6 23 6 16c6 0 10 4 10 11Z" />
      <path d="M16 27V13" strokeLinecap="round" />
    </>
  ),
  maintenance: (
    <>
      <path d="M20 8a5 5 0 0 0-6.8 6.2L6 21.5 8.5 24l7.3-7.2A5 5 0 0 0 22 10l-2.5 2.5-2-2L20 8Z" strokeLinejoin="round" />
      <circle cx="16" cy="16" r="12" className="opacity-0" />
    </>
  ),
};

export function ServiceIcon({
  name,
  className,
}: {
  name: IconKey;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("h-8 w-8", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
