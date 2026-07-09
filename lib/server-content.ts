import { promises as fs } from "fs";
import path from "path";

/**
 * Server-side content persistence for the admin CMS.
 * Stores all editable collections in a single JSON file on the server
 * filesystem. This makes admin edits shared across all visitors and durable
 * across sessions when the app runs on a persistent Node server.
 *
 * Note: ephemeral/serverless filesystems (e.g. some serverless platforms) do
 * not persist writes between invocations — deploy on a Node server/VM, or swap
 * readContent/writeContentKey for a database/KV store.
 */

const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "content.json");

export async function readContent(): Promise<Record<string, unknown>> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export async function writeContentKey(key: string, value: unknown): Promise<void> {
  const content = await readContent();
  content[key] = value;
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(content), "utf8");
}
