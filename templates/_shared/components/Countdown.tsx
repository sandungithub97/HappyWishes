"use client";

import { useEffect, useState } from "react";

type Unit = {
  label: string;
  value: string;
};

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function remaining(target: string) {
  const diff = new Date(target).getTime() - Date.now();
  if (Number.isNaN(diff) || diff <= 0) {
    return { done: true, units: [] as Unit[] };
  }

  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);

  return {
    done: false,
    units: [
      { label: "Days", value: String(days) },
      { label: "Hours", value: pad(hours) },
      { label: "Minutes", value: pad(minutes) },
      { label: "Seconds", value: pad(seconds) },
    ],
  };
}

const placeholder = {
  done: false,
  units: [
    { label: "Days", value: "—" },
    { label: "Hours", value: "—" },
    { label: "Minutes", value: "—" },
    { label: "Seconds", value: "—" },
  ],
};

type Props = {
  date: string;
  caption?: string;
  doneLabel?: string;
};

export function Countdown({
  date,
  caption = "Until we say forever",
  doneLabel = "Forever has begun",
}: Props) {
  const [state, setState] = useState(placeholder);

  useEffect(() => {
    setState(remaining(date));
    const id = window.setInterval(() => setState(remaining(date)), 1000);
    return () => window.clearInterval(id);
  }, [date]);

  if (state.done) {
    return (
      <p
        className="text-center font-[family-name:var(--font-display)] text-3xl italic"
        style={{ color: "var(--hw-primary)" }}
      >
        {doneLabel}
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <p
        className="text-[11px] font-medium tracking-[0.32em] uppercase"
        style={{ color: "var(--hw-muted)" }}
      >
        {caption}
      </p>
      <div className="grid w-full max-w-lg grid-cols-4 gap-2 sm:gap-4">
        {state.units.map((unit) => (
          <div
            key={unit.label}
            className="flex flex-col items-center rounded-2xl border px-1 py-4 sm:py-5"
            style={{
              borderColor: "var(--hw-border)",
              background: "var(--hw-surface)",
            }}
          >
            <span
              className="font-[family-name:var(--font-display)] text-3xl tabular-nums sm:text-5xl"
              style={{ color: "var(--hw-secondary)" }}
            >
              {unit.value}
            </span>
            <span
              className="mt-2 text-[9px] tracking-[0.22em] uppercase sm:text-[10px]"
              style={{ color: "var(--hw-muted)" }}
            >
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
