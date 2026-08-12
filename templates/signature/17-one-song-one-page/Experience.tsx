"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PlaceSection } from "@/templates/_shared/components/VenueMap";
import { displayNames } from "@/templates/_shared/people";
import { themeStyle } from "@/templates/_shared/theme";
import type { TemplateData } from "@/templates/_shared/types";

export function Experience({ data }: { data: TemplateData }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);
  const photo = data.media.photos[0];
  const track = data.media.music;
  const name = displayNames(data.people)[0] ?? "";

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onError = () => {
      setAvailable(false);
      setPlaying(false);
    };
    const onEnded = () => setPlaying(false);
    audio.addEventListener("error", onError);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("error", onError);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  async function toggle() {
    const audio = audioRef.current;
    if (!audio || !available) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  }

  return (
    <main
      className="relative flex min-h-svh items-center justify-center overflow-hidden bg-[var(--hw-bg)] font-[family-name:var(--font-body)] text-[var(--hw-text)]"
      style={themeStyle(data.palette)}
    >
      {photo ? (
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      ) : null}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, color-mix(in srgb, var(--hw-bg) 82%, transparent), color-mix(in srgb, var(--hw-bg) 25%, transparent))",
        }}
      />

      {track ? <audio ref={audioRef} src={track.src} loop preload="none" /> : null}

      <div className="relative z-10 mx-auto max-w-lg px-6 py-16 text-center">
        <p className="text-[11px] tracking-[0.32em] uppercase" style={{ color: "var(--hw-primary)" }}>
          {data.copy.subhead}
        </p>
        <h1
          className="mt-5 font-[family-name:var(--font-display)] text-5xl leading-tight sm:text-6xl"
          style={{ color: "var(--hw-secondary)" }}
        >
          {data.copy.headline}
        </h1>
        <p className="mt-6 text-lg leading-8" style={{ color: "var(--hw-text)" }}>
          {data.copy.message}
        </p>
        <p className="mt-3 text-sm" style={{ color: "var(--hw-muted)" }}>
          For {name}
        </p>
        {track ? (
          <button
            type="button"
            onClick={toggle}
            disabled={!available}
            className="mt-10 inline-flex h-16 w-16 items-center justify-center rounded-full"
            style={{
              background: "var(--hw-primary)",
              color: "var(--hw-surface)",
              opacity: available ? 1 : 0.45,
            }}
            aria-label={playing ? `Pause ${track.title}` : data.copy.cta ?? `Play ${track.title}`}
          >
            {playing ? (
              <span className="flex gap-1">
                <span className="h-4 w-1 bg-current" />
                <span className="h-4 w-1 bg-current" />
              </span>
            ) : (
              <span className="ml-0.5 border-y-8 border-l-[14px] border-y-transparent border-l-current" />
            )}
          </button>
        ) : null}
        {track ? (
          <p className="mt-4 text-xs tracking-[0.2em] uppercase" style={{ color: "var(--hw-muted)" }}>
            {track.title}
            {track.artist ? ` · ${track.artist}` : ""}
          </p>
        ) : null}
      </div>
      <PlaceSection place={data.event?.place} />
    </main>
  );
}
