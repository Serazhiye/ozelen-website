import { NextResponse } from "next/server";
import { readContent, writeContentKey } from "@/lib/server-content";

// Content must be read/written at request time.
export const dynamic = "force-dynamic";

const ALLOWED_KEYS = ["team", "projects", "press", "services", "positions", "staticImages"];

/** Public read of all editable content. */
export async function GET() {
  const content = await readContent();
  return NextResponse.json(content, {
    headers: { "cache-control": "no-store" },
  });
}

/**
 * Save one collection: body { key, value }.
 * Optional gate: set ADMIN_TOKEN env to require an x-admin-token header.
 */
export async function POST(req: Request) {
  const token = process.env.ADMIN_TOKEN;
  if (token && req.headers.get("x-admin-token") !== token) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  if (!body || typeof body.key !== "string" || !ALLOWED_KEYS.includes(body.key)) {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }

  try {
    await writeContentKey(body.key, body.value);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "write failed" }, { status: 500 });
  }
}
