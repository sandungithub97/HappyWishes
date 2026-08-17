"use client";

import { useEffect, useState, type FormEvent } from "react";

type RsvpCopy = {
  namePlaceholder?: string;
  nameLabel?: string;
  yes?: string;
  no?: string;
  send?: string;
  sending?: string;
  thanksYes?: string;
  thanksNo?: string;
};

type Props = {
  note?: string;
  cta?: string;
  storageKey?: string;
  occasion: string;
  slug: string;
  wishId: string;
  copy?: RsvpCopy;
};

type Saved = {
  name: string;
  coming: "yes" | "no";
};

function withName(template: string, name: string) {
  return template.replaceAll("{name}", name);
}

export function RsvpCard({
  note,
  cta = "RSVP",
  storageKey,
  occasion,
  slug,
  wishId,
  copy,
}: Props) {
  const labels = {
    namePlaceholder: copy?.namePlaceholder ?? "Your name",
    nameLabel: copy?.nameLabel ?? "Your name",
    yes: copy?.yes ?? "Joyfully attends",
    no: copy?.no ?? "Regretfully declines",
    send: copy?.send ?? "Send",
    sending: copy?.sending ?? "Sending…",
    thanksYes: copy?.thanksYes ?? "Thank you, {name}. We cannot wait.",
    thanksNo: copy?.thanksNo ?? "We'll miss you, {name}.",
  };
  const [name, setName] = useState("");
  const [coming, setComing] = useState<"yes" | "no" | null>(null);
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!storageKey) return;
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) return;
      const saved = JSON.parse(raw) as Saved;
      setName(saved.name);
      setComing(saved.coming);
      setDone(true);
    } catch {
      /* ignore */
    }
  }, [storageKey]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!name.trim() || !coming || sending) return;
    setSending(true);
    setError(null);

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          occasion,
          slug,
          wishId,
          name: name.trim(),
          coming,
        }),
      });
      const payload = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;
      if (!response.ok) {
        throw new Error(payload?.error || "Could not send your RSVP");
      }

      if (storageKey) {
        try {
          window.localStorage.setItem(
            storageKey,
            JSON.stringify({ name: name.trim(), coming } satisfies Saved),
          );
        } catch {
          /* ignore quota */
        }
      }
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send your RSVP");
    } finally {
      setSending(false);
    }
  }

  if (done) {
    return (
      <p
        className="rounded-2xl border px-6 py-8 text-center font-[family-name:var(--font-display)] text-2xl"
        style={{
          borderColor: "var(--hw-border)",
          background: "var(--hw-surface)",
          color: "var(--hw-secondary)",
        }}
      >
        {coming === "yes"
          ? withName(labels.thanksYes, name.trim())
          : withName(labels.thanksNo, name.trim())}
      </p>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border px-6 py-8 sm:px-8"
      style={{
        borderColor: "var(--hw-border)",
        background: "var(--hw-surface)",
      }}
    >
      <p
        className="text-center font-[family-name:var(--font-accent,var(--font-display))] text-base font-medium"
        style={{ color: "var(--hw-primary)" }}
      >
        {cta}
      </p>
      <label className="mt-6 block">
        <span className="sr-only">{labels.nameLabel}</span>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder={labels.namePlaceholder}
          required
          disabled={sending}
          className="w-full rounded-xl border bg-transparent px-4 py-3 text-base outline-none"
          style={{
            borderColor: "var(--hw-border)",
            color: "var(--hw-text)",
          }}
        />
      </label>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {(
          [
            ["yes", labels.yes],
            ["no", labels.no],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setComing(value)}
            disabled={sending}
            className="rounded-xl border px-3 py-3 text-sm transition-colors"
            style={{
              borderColor: coming === value ? "var(--hw-primary)" : "var(--hw-border)",
              background:
                coming === value
                  ? "color-mix(in srgb, var(--hw-primary) 16%, transparent)"
                  : "transparent",
              color: "var(--hw-text)",
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <button
        type="submit"
        disabled={sending || !coming}
        className="mt-5 w-full rounded-xl py-3 text-sm font-semibold disabled:opacity-60"
        style={{ background: "var(--hw-primary)", color: "var(--hw-surface)" }}
      >
        {sending ? labels.sending : labels.send}
      </button>
      {error ? (
        <p className="mt-3 text-center text-xs" style={{ color: "#b42318" }}>
          {error}
        </p>
      ) : null}
      {note ? (
        <p className="mt-3 text-center text-xs" style={{ color: "var(--hw-muted)" }}>
          {note}
        </p>
      ) : null}
    </form>
  );
}
