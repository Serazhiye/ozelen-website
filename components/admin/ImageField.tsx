"use client";

import { useRef, useState } from "react";
import { fileToCompressedBlob, blobToDataUrl } from "@/lib/image";

function adminHeaders(): Record<string, string> {
  const token = typeof window !== "undefined" ? window.localStorage.getItem("nb_admin_token") : null;
  return token ? { "x-admin-token": token } : {};
}

type UploadResult =
  | { ok: true; url: string }
  | { ok: false; notConfigured: true }
  | { ok: false; notConfigured: false; error: string };

/**
 * Upload the compressed image to Supabase Storage via /api/upload.
 * `old` (the URL being replaced) is deleted server-side after a successful
 * upload. Distinguishes "Storage not configured" (503 → caller falls back to a
 * data URL) from real failures (error surfaced to the admin, no silent fallback).
 */
async function uploadToStorage(blob: Blob, type: string, old?: string): Promise<UploadResult> {
  try {
    const fd = new FormData();
    fd.append("file", blob, type === "image/webp" ? "image.webp" : "image.jpg");
    if (old) fd.append("old", old);
    const res = await fetch("/api/upload", { method: "POST", body: fd, headers: adminHeaders() });

    if (res.ok) {
      const data = (await res.json()) as { url?: string };
      if (typeof data.url === "string") return { ok: true, url: data.url };
      return { ok: false, notConfigured: false, error: "Сервер не вернул URL изображения" };
    }
    if (res.status === 503) return { ok: false, notConfigured: true };

    const data = (await res.json().catch(() => null)) as { error?: string } | null;
    return { ok: false, notConfigured: false, error: data?.error || `Ошибка загрузки (HTTP ${res.status})` };
  } catch (e) {
    return { ok: false, notConfigured: false, error: e instanceof Error ? e.message : "Сеть недоступна" };
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
 * is stored in the CMS. When Storage isn't configured (503) it falls back to an
 * inline data URL so local dev keeps working; real Storage errors are shown to
 * the admin instead of being silently swallowed. Existing base64 values render.
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
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file?: File) => {
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const { blob, type } = await fileToCompressedBlob(file);
      const result = await uploadToStorage(blob, type, value);
      if (result.ok) {
        onChange(result.url);
      } else if (result.notConfigured) {
        // Storage genuinely not configured (local dev) — keep working inline.
        onChange(await blobToDataUrl(blob));
      } else {
        // Real failure — surface it, don't hide it behind a base64 fallback.
        setError(result.error);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Не удалось обработать изображение");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleRemove = () => {
    deleteFromStorage(value);
    setError(null);
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
      {error && (
        <p className="mt-2 text-xs text-red-600" role="alert">
          Не удалось загрузить в хранилище: {error}
        </p>
      )}
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
