import { cn } from "@/lib/utils";

const fieldBase =
  "w-full rounded-2xl border border-forest-900/12 bg-paper px-4 py-3.5 text-sm text-ink placeholder:text-ink/35 transition-colors focus:border-forest-500 focus:outline-none focus:ring-4 focus:ring-forest-500/10";

export function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-ink/80">
      {children}
    </label>
  );
}

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(fieldBase, className)} {...props} />;
}

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(fieldBase, "min-h-32 resize-y", className)} {...props} />;
}

export function Select({ className, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(fieldBase, "appearance-none pr-10", className)} {...props}>
      {children}
    </select>
  );
}
