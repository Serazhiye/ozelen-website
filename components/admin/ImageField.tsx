"use client";

import { useRef, useState } from "react";
import { fileToCompressedDataUrl } from "@/lib/image";

/** Upload / preview / remove control for a single image (stored as data URL). */
export function ImageField({
  label,
  value,
  onChange,
  aspect = "aspect-[16/10]",
}: {
  label: string;
  value?: string;
  onChange: (dataUrl: string | undefined) => void;
  aspect?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const handleFile = async (file?: File) => {
    if (!file) return;
    setBusy(true);
    try {
      const dataUrl = await fileToCompressedDataUrl(file);
      onChange(dataUrl);
    } catch {
      // ignore
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div>
      <p className="mb-2 text-xs font-medium text-ink/60">{label}</p>
      <div className={`relative w-full overflow-hidden rounded-2xl border border-forest-900/10 bg-mist ${aspect}`}>
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt={label} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-ink/35">
            {busy ? "Загрузка…" : "Нет изображения"}
          </div>
        )}
      </div>
      <div className="mt-2 flex gap-2">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="rounded-full border border-forest-900/15 px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:bg-forest-50"
        >
          {value ? "Заменить" : "Загрузить"}
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange(undefined)}
            className="rounded-full px-3 py-1.5 text-xs font-medium text-red-500 transition-colors hover:bg-red-50"
          >
            Удалить
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  );
}
