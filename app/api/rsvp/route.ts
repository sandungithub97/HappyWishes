import { NextResponse } from "next/server";
import {
  appendRsvp,
  listRsvps,
  normalizeWishKey,
  type RsvpComing,
} from "@/lib/rsvp/store";

export const runtime = "nodejs";

function adminSecretOk(secret: string | null): boolean {
  const expected = process.env.RSVP_ADMIN_SECRET;
  return Boolean(expected && secret && secret === expected);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  if (!adminSecretOk(secret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const key = normalizeWishKey({
    occasion: searchParams.get("occasion") ?? "",
    slug: searchParams.get("slug") ?? searchParams.get("template") ?? "",
    wishId: searchParams.get("wishId") ?? searchParams.get("wish") ?? "",
  });
  if (!key) {
    return NextResponse.json(
      { error: "Valid occasion, slug, and wishId are required" },
      { status: 400 },
    );
  }

  try {
    const entries = await listRsvps(key);
    const attending = entries.filter((entry) => entry.coming === "yes").length;
    const declining = entries.filter((entry) => entry.coming === "no").length;
    return NextResponse.json({
      wish: key,
      totals: { attending, declining, total: entries.length },
      entries,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to load RSVPs",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const record = body as Record<string, unknown>;
  const key = normalizeWishKey({
    occasion: String(record.occasion ?? ""),
    slug: String(record.slug ?? ""),
    wishId: String(record.wishId ?? ""),
  });
  if (!key) {
    return NextResponse.json(
      { error: "Valid occasion, slug, and wishId are required" },
      { status: 400 },
    );
  }

  const name = typeof record.name === "string" ? record.name : "";
  const coming = record.coming as RsvpComing;
  if (!name.trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }
  if (coming !== "yes" && coming !== "no") {
    return NextResponse.json(
      { error: 'coming must be "yes" or "no"' },
      { status: 400 },
    );
  }

  try {
    const entry = await appendRsvp(key, { name, coming });
    return NextResponse.json({ ok: true, entry }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to save RSVP",
      },
      { status: 500 },
    );
  }
}
