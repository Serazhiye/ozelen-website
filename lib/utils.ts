/** Tiny className joiner — avoids a dependency for such a small need. */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
