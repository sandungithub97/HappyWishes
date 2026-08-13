"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { ParticleField } from "@/templates/_shared/components/ParticleField";
import { PlaceSection } from "@/templates/_shared/components/VenueMap";
import { displayNames } from "@/templates/_shared/people";
import { themeStyle } from "@/templates/_shared/theme";
import type { TemplateData } from "@/templates/_shared/types";

const soft = [0.22, 1, 0.36, 1] as const;

function splitLyrics(message: string): string[] {
  return message
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function VisualizerRing({ playing, level }: { playing: boolean; level: number }) {
  const reduce = useReducedMotion();
  const scale = 1 + (reduce ? 0 : level * 0.35);

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute rounded-full border"
          style={{
            width: `${40 + i * 18}%`,
            height: `${40 + i * 18}%`,
            borderColor: "color-mix(in srgb, var(--hw-primary) 55%, transparent)",
            boxShadow: playing
              ? `0 0 ${24 + level * 40}px color-mix(in srgb, var(--hw-primary) ${30 + level * 40}%, transparent)`
              : "none",
          }}
          animate={
            playing && !reduce
              ? {
                  scale: [scale * 0.92, scale, scale * 0.95],
                  opacity: [0.25, 0.55 - i * 0.1, 0.2],
                }
              : { scale: 1, opacity: 0.12 }
          }
          transition={{
            duration: 1.1 + i * 0.25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  );
}

export function Experience({ data }: { data: TemplateData }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);
  const [progress, setProgress] = useState(0);
  const [level, setLevel] = useState(0);
  const [lineIndex, setLineIndex] = useState(-1);
  const photo = data.media.photos[0];
  const track = data.media.music;
  const name = displayNames(data.people)[0] ?? "";
  const reduce = useReducedMotion();
  const lyrics = useMemo(() => splitLyrics(data.copy.message), [data.copy.message]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onError = () => {
      setAvailable(false);
      setPlaying(false);
    };
    const onEnded = () => {
      setPlaying(false);
      setProgress(0);
      setLineIndex(lyrics.length);
    };
    const onTime = () => {
      if (!audio.duration || !Number.isFinite(audio.duration)) return;
      const p = audio.currentTime / audio.duration;
      setProgress(p);
      if (lyrics.length === 0) return;
      const idx = Math.min(
        lyrics.length - 1,
        Math.floor(p * lyrics.length),
      );
      setLineIndex(idx);
    };
    audio.addEventListener("error", onError);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("timeupdate", onTime);
    return () => {
      audio.removeEventListener("error", onError);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("timeupdate", onTime);
    };
  }, [lyrics.length]);

  // Simulated reactive level when real analyser isn't available / file missing
  useEffect(() => {
    if (!playing || reduce) {
      setLevel(0);
      return;
    }
    let raf = 0;
    const tick = (t: number) => {
      const pulse =
        0.35 +
        0.35 * Math.sin(t / 220) +
        0.2 * Math.sin(t / 90) +
        0.1 * Math.sin(t / 40);
      setLevel(Math.max(0, Math.min(1, pulse)));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, reduce]);

  // Fallback lyric advance when audio file isn't playable
  useEffect(() => {
    if (!playing || available) return;
    if (lyrics.length === 0) return;
    setLineIndex(0);
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      if (i >= lyrics.length) {
        setLineIndex(lyrics.length - 1);
        window.clearInterval(id);
        return;
      }
      setLineIndex(i);
      setProgress((i + 1) / lyrics.length);
    }, 2200);
    return () => window.clearInterval(id);
  }, [playing, available, lyrics.length]);

  async function toggle() {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    if (!available) {
      // Still allow the visual/lyric experience without a file
      setPlaying(true);
      setLineIndex(0);
      return;
    }

    try {
      await audio.play();
      setPlaying(true);
      if (lineIndex < 0) setLineIndex(0);
    } catch {
      setAvailable(false);
      setPlaying(true);
      setLineIndex(0);
    }
  }

  const visibleLine =
    lineIndex >= 0 && lineIndex < lyrics.length ? lyrics[lineIndex] : null;

  return (
    <main
      className="relative flex min-h-svh items-center justify-center overflow-hidden bg-[var(--hw-bg)] font-[family-name:var(--font-body)] text-[var(--hw-text)]"
      style={themeStyle(data.palette)}
    >
      {photo ? (
        <motion.div
          className="absolute inset-0"
          animate={
            playing && !reduce
              ? { scale: 1 + level * 0.04 }
              : { scale: 1 }
          }
          transition={{ duration: 0.35 }}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      ) : null}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, color-mix(in srgb, var(--hw-bg) 86%, transparent), color-mix(in srgb, var(--hw-bg) 28%, transparent))",
        }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{
          opacity: playing ? 0.35 + level * 0.45 : 0.15,
        }}
        style={{
          background:
            "radial-gradient(circle at 50% 45%, color-mix(in srgb, var(--hw-primary) 55%, transparent), transparent 55%)",
        }}
      />
      {playing ? (
        <ParticleField
          variant="sparkle"
          count={20}
          colors={["#E11D48", "#fff", "#fda4af"]}
          className="absolute inset-0 opacity-60"
        />
      ) : null}

      {track ? <audio ref={audioRef} src={track.src} preload="metadata" /> : null}

      <div className="relative z-10 mx-auto w-full max-w-lg px-6 py-16 text-center">
        <VisualizerRing playing={playing} level={level} />

        <p
          className="relative text-[11px] tracking-[0.32em] uppercase"
          style={{ color: "var(--hw-primary)" }}
        >
          {data.copy.subhead}
        </p>
        <h1
          className="relative mt-5 font-[family-name:var(--font-display)] text-5xl leading-tight sm:text-6xl"
          style={{ color: "var(--hw-secondary)" }}
        >
          {data.copy.headline}
        </h1>

        <div className="relative mx-auto mt-8 min-h-[5.5rem] max-w-md">
          <AnimatePresence mode="wait">
            {visibleLine ? (
              <motion.p
                key={visibleLine}
                className="text-lg leading-8"
                style={{ color: "var(--hw-text)" }}
                initial={reduce ? false : { opacity: 0, y: 14, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.55, ease: soft }}
              >
                {visibleLine}
              </motion.p>
            ) : (
              <motion.p
                key="idle"
                className="text-lg leading-8"
                style={{ color: "var(--hw-muted)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {playing ? data.copy.message : "Press play — the lines will find you."}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <p className="relative mt-3 text-sm" style={{ color: "var(--hw-muted)" }}>
          For {name}
        </p>

        {track ? (
          <motion.button
            type="button"
            onClick={toggle}
            className="relative mt-10 inline-flex h-16 w-16 items-center justify-center rounded-full"
            style={{
              background: "var(--hw-primary)",
              color: "var(--hw-surface)",
              boxShadow: playing
                ? `0 0 ${28 + level * 40}px color-mix(in srgb, var(--hw-primary) 70%, transparent)`
                : "0 12px 30px rgba(0,0,0,0.2)",
            }}
            whileHover={reduce ? undefined : { scale: 1.05 }}
            whileTap={reduce ? undefined : { scale: 0.96 }}
            animate={
              playing && !reduce
                ? { scale: 1 + level * 0.06 }
                : { scale: 1 }
            }
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
          </motion.button>
        ) : null}

        {track ? (
          <p
            className="relative mt-4 text-xs tracking-[0.2em] uppercase"
            style={{ color: "var(--hw-muted)" }}
          >
            {track.title}
            {track.artist ? ` · ${track.artist}` : ""}
          </p>
        ) : null}

        <div
          className="relative mx-auto mt-6 h-0.5 w-40 overflow-hidden rounded-full"
          style={{ background: "rgba(255,255,255,0.25)" }}
        >
          <motion.div
            className="h-full origin-left rounded-full"
            style={{
              background: "var(--hw-primary)",
              scaleX: progress,
            }}
          />
        </div>
      </div>
      <PlaceSection place={data.event?.place} />
    </main>
  );
}
