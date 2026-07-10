#!/usr/bin/env node
/**
 * One-time migration: move any base64 data-URL images already stored in the
 * Supabase `content` table into Supabase Storage, replacing them with public
 * URLs. Safe to re-run — values that are already URLs are left untouched.
 *
 * Usage:
 *   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/migrate-images.mjs
 *
 * Optional: SUPABASE_STORAGE_BUCKET (defaults to "site-images").
 */
import { createClient } from "@supabase/supabase-js";

const URL = process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = process.env.SUPABASE_STORAGE_BUCKET || "site-images";

if (!URL || !KEY) {
  console.error("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in the environment.");
  process.exit(1);
}

const db = createClient(URL, KEY, { auth: { persistSession: false } });

const DATA_URL_RE = /^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/;
let uploaded = 0;

async function uploadDataUrl(dataUrl) {
  const m = DATA_URL_RE.exec(dataUrl);
  if (!m) return dataUrl;
  const contentType = m[1];
  const bytes = Buffer.from(m[2], "base64");
  const ext = contentType === "image/webp" ? "webp" : contentType.split("/")[1] || "bin";
  const name = `uploads/${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${ext}`;
  const { error } = await db.storage.from(BUCKET).upload(name, bytes, {
    contentType,
    cacheControl: "31536000",
    upsert: false,
  });
  if (error) throw error;
  uploaded += 1;
  return db.storage.from(BUCKET).getPublicUrl(name).data.publicUrl;
}

/** Recursively walk a value, replacing any base64 data-URL strings. */
async function walk(value) {
  if (typeof value === "string") {
    return DATA_URL_RE.test(value) ? await uploadDataUrl(value) : value;
  }
  if (Array.isArray(value)) {
    const out = [];
    for (const item of value) out.push(await walk(item));
    return out;
  }
  if (value && typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) out[k] = await walk(v);
    return out;
  }
  return value;
}

async function main() {
  const { data: rows, error } = await db.from("content").select("key, value");
  if (error) throw error;

  for (const row of rows ?? []) {
    const migrated = await walk(row.value);
    if (JSON.stringify(migrated) !== JSON.stringify(row.value)) {
      const { error: upErr } = await db
        .from("content")
        .upsert({ key: row.key, value: migrated }, { onConflict: "key" });
      if (upErr) throw upErr;
      console.log(`✓ updated "${row.key}"`);
    }
  }
  console.log(`Done. Uploaded ${uploaded} image(s) to bucket "${BUCKET}".`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
