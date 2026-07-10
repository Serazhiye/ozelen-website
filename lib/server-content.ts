import { promises as fs } from "fs";
import path from "path";
import { getSupabaseAdmin } from "@/lib/supabase-server";

/**
 * Server-side content persistence for the admin CMS.
 *
 * Primary store: a Supabase table `content` with columns
 *   key   text  (primary key)
 *   value jsonb
 * Configure via env vars SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.
 * All access happens here on the server (through /api/content), so the
 * service-role key is never exposed to the browser.
 *
 * Fallback: when those env vars are absent (e.g. local dev without Supabase),
 * content is persisted to a single JSON file on the server filesystem so the
 * app keeps working. Note that ephemeral/serverless filesystems don't persist
 * writes between invocations — that's exactly why Supabase is the primary store.
 */

const TABLE = "content";

// ---- Filesystem fallback ------------------------------------------------

const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "content.json");

async function readFileContent(): Promise<Record<string, unknown>> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

async function writeFileContent(key: string, value: unknown): Promise<void> {
  const content = await readFileContent();
  content[key] = value;
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(content), "utf8");
}

// ---- Public API ---------------------------------------------------------

/** Read every editable collection as a single { key: value } object. */
export async function readContent(): Promise<Record<string, unknown>> {
  const db = getSupabaseAdmin();
  if (!db) return readFileContent();

  const { data, error } = await db.from(TABLE).select("key, value");
  if (error) throw error;

  const out: Record<string, unknown> = {};
  for (const row of data ?? []) {
    out[row.key as string] = (row as { value: unknown }).value;
  }
  return out;
}

/** Upsert a single collection by key. */
export async function writeContentKey(key: string, value: unknown): Promise<void> {
  const db = getSupabaseAdmin();
  if (!db) return writeFileContent(key, value);

  const { error } = await db
    .from(TABLE)
    .upsert({ key, value }, { onConflict: "key" });
  if (error) throw error;
}
