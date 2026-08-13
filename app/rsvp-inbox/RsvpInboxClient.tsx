"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type RsvpEntry = {
  id: string;
  name: string;
  coming: "yes" | "no";
  createdAt: string;
};

type InboxPayload = {
  wish: { occasion: string; slug: string; wishId: string };
  totals: { attending: number; declining: number; total: number };
  entries: RsvpEntry[];
  error?: string;
};

function formatWhen(iso: string): string {
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function RsvpInboxClient() {
  const params = useSearchParams();
  const occasion = params.get("occasion") ?? "";
  const slug = params.get("template") ?? params.get("slug") ?? "";
  const wishId = params.get("wish") ?? params.get("wishId") ?? "";
  const secretFromUrl = params.get("secret") ?? "";

  const [secret, setSecret] = useState(secretFromUrl);
  const [data, setData] = useState<InboxPayload | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const queryReady = Boolean(occasion && slug && wishId);

  const load = useCallback(
    async (adminSecret: string) => {
      if (!queryReady) {
        setError("Add occasion, template, and wish query params.");
        return;
      }
      if (!adminSecret) {
        setError("Enter the RSVP admin secret.");
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const url = new URL("/api/rsvp", window.location.origin);
        url.searchParams.set("occasion", occasion);
        url.searchParams.set("slug", slug);
        url.searchParams.set("wishId", wishId);
        url.searchParams.set("secret", adminSecret);
        const response = await fetch(url);
        const payload = (await response.json()) as InboxPayload & {
          error?: string;
        };
        if (!response.ok) {
          throw new Error(payload.error || "Could not load RSVPs");
        }
        setData(payload);
      } catch (err) {
        setData(null);
        setError(err instanceof Error ? err.message : "Could not load RSVPs");
      } finally {
        setLoading(false);
      }
    },
    [occasion, queryReady, slug, wishId],
  );

  useEffect(() => {
    if (secretFromUrl && queryReady) {
      void load(secretFromUrl);
    }
  }, [load, queryReady, secretFromUrl]);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    void load(secret);
  }

  const title = useMemo(() => {
    if (!queryReady) return "RSVP inbox";
    return `${occasion} / ${slug} / ${wishId}`;
  }, [occasion, queryReady, slug, wishId]);

  return (
    <main className="mx-auto min-h-svh max-w-2xl px-6 py-16 text-[#1f1a17]">
      <p className="text-[11px] tracking-[0.32em] uppercase text-[#8a736c]">
        Host only
      </p>
      <h1 className="mt-3 font-serif text-3xl tracking-tight">{title}</h1>
      <p className="mt-2 text-sm text-[#6f5e57]">
        Name-wise replies for this wish only — other wishes never mix in.
      </p>

      <form
        onSubmit={onSubmit}
        className="mt-8 flex flex-col gap-3 rounded-2xl border border-[#e6d2cc] bg-[#fff9f7] p-5 sm:flex-row sm:items-end"
      >
        <label className="block flex-1 text-sm">
          <span className="mb-1 block text-[#8a736c]">Admin secret</span>
          <input
            type="password"
            value={secret}
            onChange={(event) => setSecret(event.target.value)}
            className="w-full rounded-xl border border-[#e6d2cc] bg-white px-3 py-2.5 outline-none"
            autoComplete="current-password"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-[#2b2422] px-5 py-2.5 text-sm font-medium text-white disabled:opacity-60"
        >
          {loading ? "Loading…" : "Load replies"}
        </button>
      </form>

      {!queryReady ? (
        <p className="mt-6 text-sm text-[#8a736c]">
          Example:{" "}
          <code className="rounded bg-[#f3ebe6] px-1.5 py-0.5 text-[12px]">
            /rsvp-inbox?occasion=wedding&amp;template=sakura-vows&amp;wish=shehani-lasith&amp;secret=…
          </code>
        </p>
      ) : null}

      {error ? (
        <p className="mt-6 rounded-xl border border-[#f0c7c0] bg-[#fff5f3] px-4 py-3 text-sm text-[#b42318]">
          {error}
        </p>
      ) : null}

      {data ? (
        <section className="mt-10">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-2xl border border-[#e6d2cc] bg-white px-3 py-4">
              <p className="text-2xl font-semibold">{data.totals.attending}</p>
              <p className="mt-1 text-[11px] tracking-[0.18em] uppercase text-[#8a736c]">
                Attending
              </p>
            </div>
            <div className="rounded-2xl border border-[#e6d2cc] bg-white px-3 py-4">
              <p className="text-2xl font-semibold">{data.totals.declining}</p>
              <p className="mt-1 text-[11px] tracking-[0.18em] uppercase text-[#8a736c]">
                Declining
              </p>
            </div>
            <div className="rounded-2xl border border-[#e6d2cc] bg-white px-3 py-4">
              <p className="text-2xl font-semibold">{data.totals.total}</p>
              <p className="mt-1 text-[11px] tracking-[0.18em] uppercase text-[#8a736c]">
                Total
              </p>
            </div>
          </div>

          <ul className="mt-8 divide-y divide-[#efe3dd] rounded-2xl border border-[#e6d2cc] bg-white">
            {data.entries.length === 0 ? (
              <li className="px-5 py-8 text-center text-sm text-[#8a736c]">
                No RSVPs yet for this wish.
              </li>
            ) : (
              data.entries.map((entry) => (
                <li
                  key={entry.id}
                  className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-medium">{entry.name}</p>
                    <p className="text-xs text-[#8a736c]">
                      {formatWhen(entry.createdAt)}
                    </p>
                  </div>
                  <p
                    className="text-sm font-medium"
                    style={{
                      color: entry.coming === "yes" ? "#2f6b4f" : "#8a4a3d",
                    }}
                  >
                    {entry.coming === "yes" ? "Attending" : "Declines"}
                  </p>
                </li>
              ))
            )}
          </ul>
        </section>
      ) : null}
    </main>
  );
}
