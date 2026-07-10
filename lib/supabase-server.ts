import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Shared server-side Supabase admin client (service-role key) and Storage
 * helpers. Everything here runs only on the server (API routes) — the
 * service-role key is never sent to the browser.
 */

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

/** Public Storage bucket that holds uploaded site images. */
export const STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET || "site-images";

let cachedClient: SupabaseClient | null = null;

/** Lazily build the Supabase admin client; returns null when not configured. */
export function getSupabaseAdmin(): SupabaseClient | null {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) return null;
  if (!cachedClient) {
    cachedClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return cachedClient;
}

/** Upload image bytes to the bucket and return the public URL. */
export async function uploadImage(
  bytes: Uint8Array,
  contentType: string,
): Promise<string> {
  const db = getSupabaseAdmin();
  if (!db) throw new Error("Supabase not configured");

  const ext =
    contentType === "image/webp"
      ? "webp"
      : contentType.split("/")[1] || "bin";

  const name = `uploads/${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 10)}.${ext}`;

  const result = await db.storage
    .from(STORAGE_BUCKET)
    .upload(name, bytes, {
      contentType,
      cacheControl: "31536000",
      upsert: false,
    });

  console.log("UPLOAD RESULT:", JSON.stringify(result, null, 2));

  if (result.error) {
    throw new Error(JSON.stringify(result.error));
  }

  return db.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(name).data.publicUrl;
}

/** Extract the in-bucket path from one of our public URLs; null if not ours. */
export function storagePathFromUrl(url: string): string | null {
  if (!url) return null;
  const marker = `/storage/v1/object/public/${STORAGE_BUCKET}/`;
  const i = url.indexOf(marker);
  if (i === -1) return null;
  return decodeURIComponent(url.slice(i + marker.length));
}

/** Delete a file by its public URL. No-op for base64 or foreign URLs. */
export async function deleteImageByUrl(url: string): Promise<void> {
  const db = getSupabaseAdmin();
  if (!db) return;
  const path = storagePathFromUrl(url);
  if (!path) return;
  await db.storage.from(STORAGE_BUCKET).remove([path]);
}
