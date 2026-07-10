import { NextResponse } from "next/server";
import { uploadImage, deleteImageByUrl, getSupabaseAdmin } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/** Same optional gate as /api/content: set ADMIN_TOKEN to require a header. */
function authorized(req: Request): boolean {
  const token = process.env.ADMIN_TOKEN;
  if (!token) return true;
  return req.headers.get("x-admin-token") === token;
}

/**
 * Upload a (already client-compressed) image to Supabase Storage.
 * Body: multipart/form-data with `file` (Blob) and optional `old` (URL of the
 * image being replaced, which is deleted after a successful upload).
 * Returns { url } — the public URL to store in the CMS content.
 */
export async function POST(req: Request) {
  if (!authorized(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (!getSupabaseAdmin()) return NextResponse.json({ error: "storage not configured" }, { status: 503 });

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof Blob)) return NextResponse.json({ error: "bad request" }, { status: 400 });

  const contentType = file.type || "image/webp";
  if (!contentType.startsWith("image/")) {
    return NextResponse.json({ error: "not an image" }, { status: 400 });
  }

  try {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const url = await uploadImage(bytes, contentType);

    const old = form?.get("old");
    if (typeof old === "string" && old) {
      await deleteImageByUrl(old).catch(() => {});
    }
    return NextResponse.json({ url });
  } catch (e) {
    // Surface the real Storage error (e.g. "Invalid path…") instead of masking
    // it, so misconfiguration is diagnosable from the client and logs.
    const message = e instanceof Error ? e.message : "upload failed";
    console.error("[api/upload] upload failed:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/** Delete a stored image by its public URL. Body: { url }. */
export async function DELETE(req: Request) {
  if (!authorized(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = (await req.json().catch(() => null)) as { url?: unknown } | null;
  const url = body?.url;
  if (typeof url !== "string" || !url) {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
  try {
    await deleteImageByUrl(url);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "delete failed" }, { status: 500 });
  }
}
