"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { ParticleField } from "@/templates/_shared/components/ParticleField";
import { Reveal } from "@/templates/_shared/components/Reveal";
import { PlaceSection } from "@/templates/_shared/components/VenueMap";
import { themeStyle } from "@/templates/_shared/theme";
import type { TemplateData } from "@/templates/_shared/types";

const soft = [0.22, 1, 0.36, 1] as const;

const LOVE_WORDS = [
  "love",
  "forever",
  "mine",
  "darling",
  "smile",
  "kiss",
  "soul",
  "home",
  "soft",
  "yours",
  "dream",
  "glow",
  "angel",
  "baby",
  "heart",
  "always",
  "beauty",
  "warmth",
  "promise",
  "stay",
  "adore",
  "bloom",
  "tender",
  "wish",
  "honey",
  "star",
  "pulse",
  "true",
  "gentle",
  "devoted",
  "precious",
  "radiant",
];

/** Classic heart parametric curve → points for word placement */
function heartPoints(count: number) {
  const pts: Array<{ x: number; y: number; scale: number }> = [];
  for (let i = 0; i < count; i++) {
    const t = Math.PI - (i / count) * Math.PI * 2;
    const x = 16 * Math.sin(t) ** 3;
    const y =
      -(
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t)
      );
    pts.push({
      x: x * 8.2,
      y: y * 7.6,
      scale: 0.72 + (i % 5) * 0.08,
    });
  }
  return pts;
}

function HeartbeatWave({
  active,
  onDone,
}: {
  active: boolean;
  onDone: () => void;
}) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!active) return;
    const id = window.setTimeout(onDone, reduce ? 900 : 3200);
    return () => window.clearTimeout(id);
    // Intentionally run once per active entrance
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, reduce]);

  // ECG path: flat → QRS spike → T wave → repeat fragment
  const path =
    "M0 50 H40 L48 50 L55 18 L62 82 L70 42 L78 50 H120 L128 50 L135 18 L142 82 L150 42 L158 50 H200 L208 50 L215 18 L222 82 L230 42 L238 50 H280";

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-4"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
      transition={{ duration: 0.7, ease: soft }}
    >
      <div className="relative w-full max-w-2xl">
        <motion.p
          className="mb-8 text-center text-[11px] tracking-[0.42em] uppercase"
          style={{ color: "var(--hw-muted)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Listening for you
        </motion.p>

        <svg
          viewBox="0 0 280 100"
          className="h-auto w-full overflow-visible"
          aria-hidden
        >
          <defs>
            <linearGradient id="ecgGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F6C1D0" stopOpacity="0.2" />
              <stop offset="40%" stopColor="#E38AA8" stopOpacity="1" />
              <stop offset="100%" stopColor="#F6C1D0" stopOpacity="0.25" />
            </linearGradient>
            <filter id="ecgGlow" x="-20%" y="-40%" width="140%" height="180%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Soft baseline */}
          <line
            x1="0"
            y1="50"
            x2="280"
            y2="50"
            stroke="rgba(227,138,168,0.15)"
            strokeWidth="1"
          />

          <motion.path
            d={path}
            fill="none"
            stroke="url(#ecgGrad)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#ecgGlow)"
            initial={{ pathLength: 0, opacity: 0.4 }}
            animate={
              reduce
                ? { pathLength: 1, opacity: 1 }
                : {
                    pathLength: [0, 1],
                    opacity: [0.5, 1, 1],
                  }
            }
            transition={
              reduce
                ? { duration: 0.6 }
                : { duration: 2.4, ease: "easeInOut", repeat: 0 }
            }
          />

          {/* Pulse dots at spikes */}
          {!reduce
            ? [55, 135, 215].map((cx, i) => (
                <motion.circle
                  key={cx}
                  cx={cx}
                  cy="18"
                  r="3.5"
                  fill="#E38AA8"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.4, 1.4, 0.6],
                  }}
                  transition={{
                    delay: 0.55 + i * 0.55,
                    duration: 0.55,
                    ease: "easeOut",
                  }}
                />
              ))
            : null}
        </svg>

        <motion.div
          className="mx-auto mt-6 h-1.5 w-1.5 rounded-full"
          style={{ background: "var(--hw-primary)" }}
          animate={
            reduce
              ? undefined
              : {
                  scale: [1, 1.8, 1, 1.35, 1],
                  opacity: [0.5, 1, 0.55, 1, 0.5],
                }
          }
          transition={{ duration: 1.05, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}

function WordHeart({
  name,
  active,
  onDone,
}: {
  name: string;
  active: boolean;
  onDone: () => void;
}) {
  const reduce = useReducedMotion();
  const points = useMemo(() => heartPoints(LOVE_WORDS.length), []);
  const words = useMemo(
    () => [name.toLowerCase(), ...LOVE_WORDS].slice(0, points.length),
    [name, points.length],
  );

  useEffect(() => {
    if (!active) return;
    const id = window.setTimeout(onDone, reduce ? 1200 : 4200);
    return () => window.clearTimeout(id);
    // Intentionally run once per active entrance
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, reduce]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6 }}
    >
      {/* 3D heart shell behind words */}
      <motion.div
        className="pointer-events-none absolute"
        style={{
          width: 220,
          height: 200,
          transformStyle: "preserve-3d",
          perspective: 900,
        }}
        animate={
          reduce
            ? undefined
            : {
                rotateY: [-12, 12, -12],
                rotateX: [6, -4, 6],
              }
        }
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, #F9D5E0 0%, #E38AA8 42%, #C96B8A 72%, #A84F6E 100%)",
            clipPath:
              "path('M110 180 C110 180 20 110 20 70 C20 40 45 25 70 25 C90 25 105 38 110 52 C115 38 130 25 150 25 C175 25 200 40 200 70 C200 110 110 180 110 180 Z')",
            boxShadow:
              "0 28px 60px rgba(227,138,168,0.45), inset -12px -16px 28px rgba(120,40,70,0.25), inset 10px 12px 24px rgba(255,255,255,0.35)",
            transform: "translateZ(-20px) scale(1.15)",
            opacity: 0.92,
          }}
        />
        {/* Highlight lobe for faux 3D */}
        <div
          className="absolute"
          style={{
            left: "18%",
            top: "18%",
            width: "34%",
            height: "28%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.55) 0%, transparent 70%)",
            transform: "translateZ(12px)",
            filter: "blur(1px)",
          }}
        />
      </motion.div>

      <div className="relative h-[320px] w-[300px] sm:h-[380px] sm:w-[360px]">
        {words.map((word, i) => {
          const p = points[i]!;
          return (
            <motion.span
              key={`${word}-${i}`}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 origin-center whitespace-nowrap font-[family-name:var(--font-body)] tracking-wide"
              style={{
                color: i === 0 ? "#FFFFFF" : "rgba(255,255,255,0.92)",
                fontSize: i === 0 ? "1.05rem" : `${0.62 + p.scale * 0.22}rem`,
                fontWeight: i === 0 ? 600 : 500,
                textShadow: "0 1px 8px rgba(120,40,70,0.35)",
                zIndex: i === 0 ? 5 : 1,
              }}
              initial={
                reduce
                  ? { opacity: 1, x: p.x, y: p.y, scale: p.scale }
                  : {
                      opacity: 0,
                      x: (Math.random() - 0.5) * 280,
                      y: 120 + Math.random() * 80,
                      scale: 0.4,
                      rotate: (Math.random() - 0.5) * 40,
                    }
              }
              animate={{
                opacity: 1,
                x: p.x,
                y: p.y,
                scale: p.scale,
                rotate: 0,
              }}
              transition={{
                delay: reduce ? 0 : 0.15 + i * 0.05,
                duration: 0.85,
                ease: soft,
              }}
            >
              {word}
            </motion.span>
          );
        })}
      </div>

      <motion.p
        className="absolute bottom-[12%] text-center text-[11px] tracking-[0.35em] uppercase"
        style={{ color: "var(--hw-muted)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduce ? 0.2 : 2.6 }}
      >
        Building a heart for you
      </motion.p>
    </motion.div>
  );
}

function AutoMusic({
  src,
  title,
}: {
  src: string;
  title?: string;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.72;
    audio.loop = true;

    const tryPlay = async () => {
      try {
        await audio.play();
        setPlaying(true);
        setBlocked(false);
      } catch {
        setBlocked(true);
        setPlaying(false);
      }
    };

    void tryPlay();

    const unlock = () => {
      void audio.play().then(() => {
        setPlaying(true);
        setBlocked(false);
      });
    };

    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, [src]);

  async function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    try {
      await audio.play();
      setPlaying(true);
      setBlocked(false);
    } catch {
      setBlocked(true);
    }
  }

  return (
    <>
      <audio ref={audioRef} src={src} preload="auto" playsInline />
      <button
        type="button"
        onClick={toggle}
        className="fixed right-5 bottom-5 z-50 flex h-12 items-center gap-2 rounded-full border px-4 shadow-lg backdrop-blur-md transition-transform hover:scale-105 active:scale-95 sm:right-8 sm:bottom-8"
        style={{
          background: "rgba(255,255,255,0.92)",
          borderColor: "var(--hw-border)",
          color: "var(--hw-primary)",
        }}
        aria-label={playing ? "Pause music" : "Play music"}
      >
        {playing ? (
          <span className="flex h-3 items-end gap-0.5">
            <span className="h-2 w-0.5 animate-pulse bg-current" />
            <span className="h-3 w-0.5 animate-pulse bg-current [animation-delay:120ms]" />
            <span className="h-2.5 w-0.5 animate-pulse bg-current [animation-delay:240ms]" />
          </span>
        ) : (
          <span className="ml-0.5 border-y-[6px] border-l-[10px] border-y-transparent border-l-current" />
        )}
        <span className="text-[10px] tracking-[0.18em] uppercase">
          {blocked && !playing ? "Tap for sound" : title ?? "Music"}
        </span>
      </button>
    </>
  );
}

export function Experience({ data }: { data: TemplateData }) {
  const reduce = useReducedMotion();
  const to =
    data.people.find((p) => p.role === "To")?.name ?? data.people[0]?.name ?? "";
  const from =
    data.people.find((p) => p.role === "From")?.name ??
    data.people[1]?.name ??
    "";
  const letter = data.extras.letter;
  const photo = data.media.photos[0];

  type Phase = "wave" | "heart" | "wish";
  const [phase, setPhase] = useState<Phase>("wave");

  return (
    <main
      className="relative min-h-svh overflow-x-hidden bg-[var(--hw-bg)] font-[family-name:var(--font-body)] text-[var(--hw-text)]"
      style={themeStyle(data.palette)}
    >
      {/* Soft feminine white atmosphere */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 50% 20%, rgba(246,193,208,0.35) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 80% 80%, rgba(227,138,168,0.12) 0%, transparent 50%),
            linear-gradient(180deg, #FFFBFC 0%, #FFF5F8 50%, #FFFBFC 100%)
          `,
        }}
      />
      {phase !== "wave" ? (
        <ParticleField
          variant="petal"
          count={18}
          colors={["#F6C1D0", "#E38AA8", "#FFE4EC", "#F9D5E0"]}
          className="fixed inset-0 -z-[5] opacity-70"
        />
      ) : null}

      <AnimatePresence mode="wait">
        {phase === "wave" ? (
          <HeartbeatWave
            key="wave"
            active
            onDone={() => setPhase("heart")}
          />
        ) : null}
        {phase === "heart" ? (
          <WordHeart
            key="heart"
            name={to}
            active
            onDone={() => setPhase("wish")}
          />
        ) : null}
      </AnimatePresence>

      {phase === "wish" ? (
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, ease: soft }}
        >
          <section className="relative flex min-h-svh flex-col items-center justify-center px-6 py-20 text-center">
            {/* Floating 3D heart badge */}
            <motion.div
              className="relative mb-8"
              style={{ perspective: 800 }}
              animate={
                reduce
                  ? undefined
                  : { y: [0, -8, 0], rotateY: [-8, 8, -8] }
              }
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div
                className="flex h-20 w-20 items-center justify-center rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, #F9D5E0, #E38AA8 60%, #C96B8A)",
                  boxShadow:
                    "0 18px 40px rgba(227,138,168,0.4), inset 0 2px 8px rgba(255,255,255,0.5)",
                }}
              >
                <span className="text-3xl text-white drop-shadow">♥</span>
              </div>
            </motion.div>

            <Reveal>
              <p
                className="text-[11px] tracking-[0.38em] uppercase"
                style={{ color: "var(--hw-primary)" }}
              >
                {data.copy.subhead}
              </p>
              <h1
                className="mt-4 font-[family-name:var(--font-display)] text-5xl sm:text-6xl"
                style={{ color: "var(--hw-primary)" }}
              >
                {data.copy.headline}
              </h1>
              <p
                className="mt-3 text-sm tracking-[0.22em] uppercase"
                style={{ color: "var(--hw-muted)" }}
              >
                For {to}
                {from ? ` · from ${from}` : ""}
              </p>
            </Reveal>

            {photo ? (
              <Reveal delay={0.12}>
                <div
                  className="relative mx-auto mt-10 aspect-[4/5] w-full max-w-xs overflow-hidden rounded-[2rem] border shadow-xl"
                  style={{
                    borderColor: "var(--hw-border)",
                    boxShadow: "0 24px 60px rgba(227,138,168,0.25)",
                  }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="320px"
                    className="object-cover"
                    priority
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(255,251,252,0.55) 0%, transparent 40%)",
                    }}
                  />
                </div>
              </Reveal>
            ) : null}

            <Reveal delay={0.2}>
              <article
                className="mx-auto mt-12 max-w-lg rounded-[1.75rem] border px-8 py-10 text-left shadow-sm"
                style={{
                  background: "rgba(255,255,255,0.85)",
                  borderColor: "var(--hw-border)",
                }}
              >
                <p
                  className="font-[family-name:var(--font-display)] text-3xl"
                  style={{ color: "var(--hw-primary)" }}
                >
                  {letter?.greeting ?? `My ${to},`}
                </p>
                <p className="mt-6 text-xl leading-9" style={{ color: "var(--hw-text)" }}>
                  {data.copy.message}
                </p>
                <p className="mt-8 text-lg" style={{ color: "var(--hw-muted)" }}>
                  {letter?.closing ?? "With every heartbeat,"}
                </p>
                <p
                  className="mt-2 font-[family-name:var(--font-display)] text-4xl"
                  style={{ color: "var(--hw-secondary)" }}
                >
                  {letter?.signature ?? from}
                </p>
              </article>
            </Reveal>

            {data.event?.timeLabel ? (
              <p
                className="mt-10 text-[11px] tracking-[0.28em] uppercase"
                style={{ color: "var(--hw-muted)" }}
              >
                {data.event.timeLabel}
              </p>
            ) : null}
          </section>

          <PlaceSection place={data.event?.place} />
        </motion.div>
      ) : null}

      {data.extras.backgroundMusic && data.media.music ? (
        <AutoMusic
          src={data.media.music.src}
          title={data.media.music.title}
        />
      ) : null}
    </main>
  );
}
