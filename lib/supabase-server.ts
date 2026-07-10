import { randomUUID } from "node:crypto";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Shared server-side Supabase admin client (service-role key) and Storage
 * helpers. Everything here runs only on the server (API routes) — the
 * service-role key is never sent to the browser.
 */

// Trim env values: a stray space/newline in the URL or bucket name is a common
// cause of Storage's "Invalid path specified in request URL" (it becomes part
// of the object path). Trimming removes that whole class of failure.
const SUPABASE_URL = process.env.SUPABASE_URL?.trim();
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

/** Public Storage bucket that holds uploaded site images. */
export const STORAGE_BUCKET = (process.env.SUPABASE_STORAGE_BUCKET || "site-images").trim();

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

  // A UUID key is guaranteed valid (no spaces/edge cases) and collision-free —
  // unlike the previous timestamp+Math.random() scheme, which could produce an
  // empty segment and an invalid object path.
  const ext = (contentType.split("/")[1] || "bin").replace(/[^a-z0-9]/gi, "").toLowerCase() || "bin";
  const name = `uploads/${randomUUID()}.${ext}`;

  const { error } = await db.storage.from(STORAGE_BUCKET).upload(name, bytes, {
    contentType,
    cacheControl: "31536000",
    upsert: false,
  });
  if (error) throw error;

  return db.storage.from(STORAGE_BUCKET).getPublicUrl(name).data.publicUrl;
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
