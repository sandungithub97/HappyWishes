import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { get, put } from "@vercel/blob";

export type RsvpComing = "yes" | "no";

export type RsvpEntry = {
  id: string;
  name: string;
  coming: RsvpComing;
  createdAt: string;
};

export type WishKey = {
  occasion: string;
  slug: string;
  wishId: string;
};

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/i;

export function normalizeWishKey(input: WishKey): WishKey | null {
  const occasion = input.occasion?.trim() ?? "";
  const slug = input.slug?.trim() ?? "";
  const wishId = input.wishId?.trim() ?? "";
  if (!occasion || !slug || !wishId) return null;
  if (![occasion, slug, wishId].every((part) => SLUG_RE.test(part))) {
    return null;
  }
  return {
    occasion: occasion.toLowerCase(),
    slug: slug.toLowerCase(),
    wishId: wishId.toLowerCase(),
  };
}

export function wishStorageKey(key: WishKey): string {
  return `${key.occasion}__${key.slug}__${key.wishId}`;
}

function blobPathname(key: WishKey): string {
  return `rsvp/${key.occasion}/${key.slug}/${key.wishId}.json`;
}

function localFilePath(key: WishKey): string {
  return path.join(process.cwd(), ".data", "rsvp", `${wishStorageKey(key)}.json`);
}

function useBlob(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function streamToText(stream: ReadableStream<Uint8Array>): Promise<string> {
  return new Response(stream).text();
}

async function readLocal(key: WishKey): Promise<RsvpEntry[]> {
  try {
    const raw = await readFile(localFilePath(key), "utf8");
    const parsed = JSON.parse(raw) as RsvpEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeLocal(key: WishKey, entries: RsvpEntry[]): Promise<void> {
  const file = localFilePath(key);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, `${JSON.stringify(entries, null, 2)}\n`, "utf8");
}

async function readBlob(key: WishKey): Promise<RsvpEntry[]> {
  const result = await get(blobPathname(key), {
    access: "private",
    useCache: false,
  });
  if (!result || result.statusCode !== 200 || !result.stream) return [];
  try {
    const parsed = JSON.parse(await streamToText(result.stream)) as RsvpEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeBlob(key: WishKey, entries: RsvpEntry[]): Promise<void> {
  await put(blobPathname(key), JSON.stringify(entries, null, 2), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

export async function listRsvps(key: WishKey): Promise<RsvpEntry[]> {
  const entries = useBlob() ? await readBlob(key) : await readLocal(key);
  return [...entries].sort(
    (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt),
  );
}

export async function appendRsvp(
  key: WishKey,
  input: { name: string; coming: RsvpComing },
): Promise<RsvpEntry> {
  const name = input.name.trim().replace(/\s+/g, " ");
  if (!name) {
    throw new Error("Name is required");
  }
  if (input.coming !== "yes" && input.coming !== "no") {
    throw new Error("Invalid RSVP choice");
  }

  const entry: RsvpEntry = {
    id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    coming: input.coming,
    createdAt: new Date().toISOString(),
  };

  const existing = useBlob() ? await readBlob(key) : await readLocal(key);
  const next = [...existing, entry];

  try {
    if (useBlob()) {
      await writeBlob(key, next);
    } else {
      await writeLocal(key, next);
    }
  } catch (error) {
    const hint = useBlob()
      ? "Could not save RSVP to Blob storage."
      : "Could not save RSVP locally. On Vercel, set BLOB_READ_WRITE_TOKEN.";
    throw new Error(
      error instanceof Error ? `${hint} ${error.message}` : hint,
    );
  }

  return entry;
}
