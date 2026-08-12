"use client";

import Image from "next/image";
import { useState } from "react";
import { FadeIn } from "@/templates/_shared/components/FadeIn";
import { MusicToggle } from "@/templates/_shared/components/MusicToggle";
import { PlaceSection } from "@/templates/_shared/components/VenueMap";
import { namesLine } from "@/templates/_shared/people";
import { themeStyle } from "@/templates/_shared/theme";
import type { TemplateData } from "@/templates/_shared/types";

export function Experience({ data }: { data: TemplateData }) {
  const songs = data.extras.songs ?? [];
  const [active, setActive] = useState(0);
  const current = songs[active];

  return (
    <main
      className="relative min-h-svh overflow-x-hidden bg-[var(--hw-bg)] font-[family-name:var(--font-body)] text-[var(--hw-text)]"
      style={themeStyle(data.palette)}
    >
      <section className="px-6 pt-16 pb-10 text-center sm:pt-24">
        <p className="text-[11px] tracking-[0.32em] uppercase" style={{ color: "var(--hw-primary)" }}>
          {data.copy.subhead}
        </p>
        <h1
          className="mt-4 font-[family-name:var(--font-display)] text-5xl uppercase sm:text-7xl"
          style={{ color: "var(--hw-secondary)" }}
        >
          {data.copy.headline}
        </h1>
        <p className="mt-3 text-sm tracking-[0.18em] uppercase" style={{ color: "var(--hw-muted)" }}>
          {namesLine(data.people)}
        </p>
        <p className="mx-auto mt-8 max-w-md text-base leading-7" style={{ color: "var(--hw-muted)" }}>
          {data.copy.message}
        </p>
      </section>

      {current ? (
        <section className="mx-auto grid max-w-5xl gap-8 px-6 pb-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          {current.photo ? (
            <FadeIn>
              <div className="relative aspect-square overflow-hidden rounded-full border" style={{ borderColor: "var(--hw-border)" }}>
                <Image
                  src={current.photo}
                  alt={current.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </FadeIn>
          ) : null}
          <FadeIn>
            <p className="text-[11px] tracking-[0.28em] uppercase" style={{ color: "var(--hw-primary)" }}>
              Track {String(active + 1).padStart(2, "0")}
            </p>
            <h2
              className="mt-3 font-[family-name:var(--font-display)] text-4xl uppercase"
              style={{ color: "var(--hw-secondary)" }}
            >
              {current.title}
            </h2>
            <p className="mt-2 text-sm" style={{ color: "var(--hw-muted)" }}>
              {current.artist}
            </p>
            <p className="mt-6 text-lg leading-8" style={{ color: "var(--hw-text)" }}>
              {current.memory}
            </p>
          </FadeIn>
        </section>
      ) : null}

      <section className="mx-auto max-w-2xl px-6 pb-28">
        <ol className="divide-y" style={{ borderColor: "var(--hw-border)" }}>
          {songs.map((song, index) => (
            <li key={`${song.title}-${song.artist}`}>
              <button
                type="button"
                onClick={() => setActive(index)}
                className="flex w-full items-baseline justify-between gap-4 py-4 text-left"
              >
                <span className="text-xs tabular-nums" style={{ color: "var(--hw-primary)" }}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex-1">
                  <span
                    className="block font-[family-name:var(--font-display)] text-lg uppercase"
                    style={{ color: index === active ? "var(--hw-primary)" : "var(--hw-secondary)" }}
                  >
                    {song.title}
                  </span>
                  <span className="text-sm" style={{ color: "var(--hw-muted)" }}>
                    {song.artist}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </section>

      <PlaceSection place={data.event?.place} />

      {data.extras.backgroundMusic && data.media.music ? (
        <MusicToggle track={data.media.music} />
      ) : null}
    </main>
  );
}
