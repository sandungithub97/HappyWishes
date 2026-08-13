"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { MusicToggle } from "@/templates/_shared/components/MusicToggle";
import { ParticleField } from "@/templates/_shared/components/ParticleField";
import { Reveal } from "@/templates/_shared/components/Reveal";
import { TextureOverlay } from "@/templates/_shared/components/TextureOverlay";
import { PlaceSection } from "@/templates/_shared/components/VenueMap";
import { namesLine } from "@/templates/_shared/people";
import { themeStyle } from "@/templates/_shared/theme";
import type { TemplateData } from "@/templates/_shared/types";

const soft = [0.22, 1, 0.36, 1] as const;

function Equalizer({ active }: { active: boolean }) {
  const reduce = useReducedMotion();
  const bars = [0.4, 0.7, 1, 0.55, 0.85, 0.45, 0.95, 0.6, 0.75, 0.5, 0.9, 0.65];

  return (
    <div className="flex h-16 items-end justify-center gap-1.5">
      {bars.map((base, i) => (
        <motion.span
          key={i}
          className="w-1.5 rounded-full origin-bottom"
          style={{ background: "var(--hw-primary)", height: "100%" }}
          animate={
            reduce || !active
              ? { scaleY: base * 0.35 }
              : { scaleY: [base * 0.25, base, base * 0.4, base * 0.85] }
          }
          transition={{
            duration: 0.55 + (i % 4) * 0.12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.04,
          }}
        />
      ))}
    </div>
  );
}

function Vinyl({
  src,
  alt,
  spinning,
}: {
  src: string;
  alt: string;
  spinning: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <motion.div
        className="absolute inset-0 rounded-full border"
        style={{
          borderColor: "var(--hw-border)",
          background:
            "radial-gradient(circle at 50% 50%, #2a2a2a 0%, #0d0d0d 42%, #1a1a1a 43%, #0a0a0a 100%)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.55)",
        }}
        animate={
          spinning && !reduce
            ? { rotate: 360 }
            : { rotate: 0 }
        }
        transition={
          spinning && !reduce
            ? { duration: 8, repeat: Infinity, ease: "linear" }
            : { duration: 0.6 }
        }
      >
        <div className="absolute inset-[18%] overflow-hidden rounded-full border border-white/10">
          <Image src={src} alt={alt} fill sizes="(max-width: 768px) 90vw, 420px" className="object-cover" />
        </div>
        <div
          className="absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "var(--hw-primary)", boxShadow: "0 0 20px var(--hw-primary)" }}
        />
      </motion.div>
      <div
        className="pointer-events-none absolute -inset-4 -z-10 rounded-full opacity-40 blur-2xl"
        style={{ background: "radial-gradient(circle, var(--hw-primary), transparent 65%)" }}
      />
    </div>
  );
}

export function Experience({ data }: { data: TemplateData }) {
  const songs = data.extras.songs ?? [];
  const [active, setActive] = useState(0);
  const current = songs[active];
  const reduce = useReducedMotion();

  return (
    <main
      className="relative min-h-svh overflow-x-hidden bg-[var(--hw-bg)] font-[family-name:var(--font-body)] text-[var(--hw-text)]"
      style={themeStyle(data.palette)}
    >
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255,90,95,0.18) 0%, transparent 55%), var(--hw-bg)",
        }}
      />
      <ParticleField
        variant="sparkle"
        count={18}
        colors={["#FF5A5F", "#F5F0E8", "#ff9a9d"]}
        className="fixed inset-0 -z-[5] opacity-50"
      />
      <TextureOverlay variant="vignette" opacity={0.5} className="fixed inset-0 -z-[4]" />

      <section className="px-6 pt-16 pb-8 text-center sm:pt-24">
        <Reveal>
          <Equalizer active />
          <p
            className="mt-6 text-[11px] tracking-[0.32em] uppercase"
            style={{ color: "var(--hw-primary)" }}
          >
            {data.copy.subhead}
          </p>
          <h1
            className="mt-4 font-[family-name:var(--font-display)] text-5xl uppercase sm:text-7xl"
            style={{ color: "var(--hw-secondary)" }}
          >
            {data.copy.headline}
          </h1>
          <p
            className="mt-3 text-sm tracking-[0.18em] uppercase"
            style={{ color: "var(--hw-muted)" }}
          >
            {namesLine(data.people)}
          </p>
          <p
            className="mx-auto mt-8 max-w-md text-base leading-7"
            style={{ color: "var(--hw-muted)" }}
          >
            {data.copy.message}
          </p>
        </Reveal>
      </section>

      {current ? (
        <section className="mx-auto grid max-w-5xl gap-10 px-6 pb-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.photo ?? current.title}
              initial={reduce ? false : { opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: -12 }}
              transition={{ duration: 0.55, ease: soft }}
            >
              {current.photo ? (
                <Vinyl src={current.photo} alt={current.title} spinning />
              ) : null}
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${current.title}-${current.artist}`}
              initial={reduce ? false : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: -16 }}
              transition={{ duration: 0.45, ease: soft }}
            >
              <p
                className="text-[11px] tracking-[0.28em] uppercase"
                style={{ color: "var(--hw-primary)" }}
              >
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
            </motion.div>
          </AnimatePresence>
        </section>
      ) : null}

      <section className="mx-auto max-w-2xl px-6 pb-28">
        <ol className="divide-y" style={{ borderColor: "var(--hw-border)" }}>
          {songs.map((song, index) => {
            const isActive = index === active;
            return (
              <li key={`${song.title}-${song.artist}`} style={{ borderColor: "var(--hw-border)" }}>
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  className="flex w-full items-center justify-between gap-4 py-4 text-left transition-colors"
                >
                  <span className="flex min-w-0 flex-1 items-baseline gap-4">
                    <span className="text-xs tabular-nums" style={{ color: "var(--hw-primary)" }}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className="block font-[family-name:var(--font-display)] text-lg uppercase"
                        style={{
                          color: isActive ? "var(--hw-primary)" : "var(--hw-secondary)",
                        }}
                      >
                        {song.title}
                      </span>
                      <span className="text-sm" style={{ color: "var(--hw-muted)" }}>
                        {song.artist}
                      </span>
                    </span>
                  </span>
                  {isActive ? (
                    <span className="flex h-6 items-end gap-0.5">
                      {[0.4, 0.8, 0.55].map((h, i) => (
                        <motion.span
                          key={i}
                          className="w-1 rounded-full bg-[var(--hw-primary)]"
                          style={{ height: "100%" }}
                          animate={
                            reduce
                              ? { scaleY: h }
                              : { scaleY: [h * 0.4, h, h * 0.55] }
                          }
                          transition={{
                            duration: 0.45,
                            repeat: Infinity,
                            delay: i * 0.08,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ol>
      </section>

      <PlaceSection place={data.event?.place} />

      {data.extras.backgroundMusic && data.media.music ? (
        <MusicToggle track={data.media.music} />
      ) : null}
    </main>
  );
}
