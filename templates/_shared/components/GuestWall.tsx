"use client";

import { useEffect, useState, type FormEvent } from "react";

type Wish = {
  name: string;
  message: string;
};

type Props = {
  storageKey: string;
  cta?: string;
};

export function GuestWall({ storageKey, cta = "Leave a wish" }: Props) {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) setWishes(JSON.parse(raw) as Wish[]);
    } catch {
      setWishes([]);
    }
  }, [storageKey]);

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!name.trim() || !message.trim()) return;
    const next = [{ name: name.trim(), message: message.trim() }, ...wishes];
    setWishes(next);
    setName("");
    setMessage("");
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(next));
    } catch {
      /* ignore quota */
    }
  }

  return (
    <div className="mx-auto w-full max-w-xl">
      <form
        onSubmit={submit}
        className="rounded-2xl border px-6 py-7"
        style={{
          borderColor: "var(--hw-border)",
          background: "var(--hw-surface)",
        }}
      >
        <p
          className="text-center text-[11px] tracking-[0.28em] uppercase"
          style={{ color: "var(--hw-primary)" }}
        >
          {cta}
        </p>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name"
          required
          className="mt-5 w-full rounded-xl border bg-transparent px-4 py-3 outline-none"
          style={{ borderColor: "var(--hw-border)", color: "var(--hw-text)" }}
        />
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="A few words"
          required
          rows={3}
          className="mt-3 w-full resize-none rounded-xl border bg-transparent px-4 py-3 outline-none"
          style={{ borderColor: "var(--hw-border)", color: "var(--hw-text)" }}
        />
        <button
          type="submit"
          className="mt-4 w-full rounded-xl py-3 text-sm font-semibold tracking-wide uppercase"
          style={{ background: "var(--hw-primary)", color: "var(--hw-bg)" }}
        >
          Post
        </button>
      </form>

      <ul className="mt-6 space-y-3">
        {wishes.map((wish, index) => (
          <li
            key={`${wish.name}-${index}`}
            className="rounded-2xl border px-5 py-4"
            style={{
              borderColor: "var(--hw-border)",
              background: "var(--hw-surface)",
            }}
          >
            <p
              className="font-[family-name:var(--font-display)] text-lg"
              style={{ color: "var(--hw-secondary)" }}
            >
              {wish.name}
            </p>
            <p className="mt-1 text-sm leading-6" style={{ color: "var(--hw-muted)" }}>
              {wish.message}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
