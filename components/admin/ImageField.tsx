"use client";

import { useRef, useState } from "react";
import { fileToCompressedBlob, blobToDataUrl } from "@/lib/image";

function adminHeaders(): Record<string, string> {
  const token = typeof window !== "undefined" ? window.localStorage.getItem("nb_admin_token") : null;
  return token ? { "x-admin-token": token } : {};
}

/**
 * Upload the compressed image to Supabase Storage via /api/upload and return
 * the public URL. `old` (the URL being replaced) is deleted server-side after
 * a successful upload. Returns null if Storage is unavailable so the caller
 * can fall back to an inline data URL.
 */
async function uploadToStorage(blob: Blob, type: string, old?: string): Promise<string | null> {
  try {
    const fd = new FormData();
    fd.append("file", blob, type === "image/webp" ? "image.webp" : "image.jpg");
    if (old) fd.append("old", old);
    const res = await fetch("/api/upload", { method: "POST", body: fd, headers: adminHeaders() });
    if (!res.ok) return null;
    const data = (await res.json()) as { url?: string };
    return typeof data.url === "string" ? data.url : null;
  } catch {
    return null;
  }
}

/** Fire-and-forget delete of a Storage-hosted image (skips base64/foreign). */
function deleteFromStorage(url?: string) {
  if (!url || !/^https?:\/\//.test(url)) return;
  fetch("/api/upload", {
    method: "DELETE",
    headers: { "content-type": "application/json", ...adminHeaders() },
    body: JSON.stringify({ url }),
  }).catch(() => {});
}

/**
 * Upload / preview / remove control for a single image.
 * Images are compressed to WebP and uploaded to Supabase Storage; only the URL
 * is stored in the CMS. When Storage isn't configured it falls back to an inline
 * data URL so local dev keeps working. Existing base64 values still render.
 */
export function ImageField({
  label,
  value,
  onChange,
  aspect = "aspect-[16/10]",
}: {
  label: string;
  value?: string;
  onChange: (url: string | undefined) => void;
  aspect?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const handleFile = async (file?: File) => {
    if (!file) return;
    setBusy(true);
    try {
      const { blob, type } = await fileToCompressedBlob(file);
      const url = await uploadToStorage(blob, type, value);
      if (url) {
        onChange(url);
      } else {
        // Storage unavailable — keep working with an inline data URL.
        onChange(await blobToDataUrl(blob));
      }
    } catch {
      // ignore
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleRemove = () => {
    deleteFromStorage(value);
    onChange(undefined);
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
          disabled={busy}
          onClick={() => inputRef.current?.click()}
          className="rounded-full border border-forest-900/15 px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:bg-forest-50 disabled:opacity-50"
        >
          {busy ? "Загрузка…" : value ? "Заменить" : "Загрузить"}
        </button>
        {value && !busy && (
          <button
            type="button"
            onClick={handleRemove}
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
