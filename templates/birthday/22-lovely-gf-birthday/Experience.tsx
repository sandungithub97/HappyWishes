"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ParticleField } from "@/templates/_shared/components/ParticleField";
import { Reveal } from "@/templates/_shared/components/Reveal";
import { PlaceSection } from "@/templates/_shared/components/VenueMap";
import { themeStyle } from "@/templates/_shared/theme";
import type { TemplateData } from "@/templates/_shared/types";

const soft = [0.22, 1, 0.36, 1] as const;

const FLOAT_PHRASES = [
  "forever yours",
  "my heartbeat",
  "so beautiful",
  "always",
  "my love",
  "only you",
];

type Particle = {
  tx: number;
  ty: number;
  x: number;
  y: number;
  size: number;
  alpha: number;
  delay: number;
};

function sampleHeartParticles(count: number): Array<{ x: number; y: number }> {
  const pts: Array<{ x: number; y: number }> = [];
  let guard = 0;
  while (pts.length < count && guard < count * 80) {
    guard++;
    const t = Math.random() * Math.PI * 2;
    const hx = 16 * Math.sin(t) ** 3;
    const hy = -(
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t)
    );
    const scale = 0.55 + Math.random() * 0.48;
    const x = hx * 7.2 * scale;
    const y = hy * 6.8 * scale - 8;
    if (Math.random() < 0.72) {
      pts.push({ x, y });
    }
  }
  return pts;
}

function ParticleHeartCanvas({
  name,
  active,
  onDone,
}: {
  name: string;
  active: boolean;
  onDone: () => void;
}) {
  const reduce = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const startRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const [showName, setShowName] = useState(false);

  const targets = useMemo(() => sampleHeartParticles(reduce ? 120 : 420), [reduce]);

  useEffect(() => {
    particlesRef.current = targets.map((t, i) => ({
      tx: t.x,
      ty: t.y,
      x: (Math.random() - 0.5) * 520,
      y: 180 + Math.random() * 120,
      size: 1.2 + (i % 4) * 0.45,
      alpha: 0.35 + (i % 5) * 0.12,
      delay: (i % 12) * 0.018,
    }));
  }, [targets]);

  useEffect(() => {
    if (!active) return;
    const id = window.setTimeout(onDone, reduce ? 1400 : 5200);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, reduce]);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener("resize", resize);
    startRef.current = performance.now();

    const tick = (now: number) => {
      const w = canvas!.width / dpr;
      const h = canvas!.height / dpr;
      const elapsed = (now - startRef.current) / 1000;
      const formT = Math.min(1, elapsed / (reduce ? 0.5 : 1.8));
      const ease = 1 - (1 - formT) ** 3;

      const beat =
        1 +
        (reduce ? 0.04 : 0.07) *
          Math.sin(elapsed * Math.PI * 1.05) ** 14 +
        (reduce ? 0.02 : 0.035) *
          Math.sin(elapsed * Math.PI * 2.1);

      if (formT > 0.75 && !showName) setShowName(true);

      ctx!.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2 - 10;

      for (const p of particlesRef.current) {
        const localEase = Math.min(1, Math.max(0, (ease - p.delay) / (1 - p.delay)));
        const e = 1 - (1 - localEase) ** 2.5;
        const px = p.x + (p.tx - p.x) * e;
        const py = p.y + (p.ty - p.y) * e;
        const sx = cx + px * beat;
        const sy = cy + py * beat;

        const grad = ctx!.createRadialGradient(sx, sy, 0, sx, sy, p.size * 2.2);
        grad.addColorStop(0, `rgba(255, 240, 245, ${p.alpha})`);
        grad.addColorStop(0.45, `rgba(227, 138, 168, ${p.alpha * 0.95})`);
        grad.addColorStop(1, "rgba(227, 138, 168, 0)");

        ctx!.beginPath();
        ctx!.fillStyle = grad;
        ctx!.arc(sx, sy, p.size * beat, 0, Math.PI * 2);
        ctx!.fill();
      }

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [active, reduce, showName]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: "blur(6px)" }}
      transition={{ duration: 0.65 }}
    >
      {/* Glossy 3D heart layers behind particles */}
      <motion.div
        className="pointer-events-none absolute"
        style={{ perspective: 900, transformStyle: "preserve-3d" }}
        animate={
          reduce
            ? undefined
            : {
                rotateY: [-14, 14, -14],
                rotateX: [8, -6, 8],
                scale: [1, 1.04, 1, 1.07, 1],
              }
        }
        transition={{
          rotateY: { duration: 7, repeat: Infinity, ease: "easeInOut" },
          rotateX: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 1.05, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <div
          className="relative h-48 w-48 sm:h-56 sm:w-56"
          style={{
            filter: "drop-shadow(0 28px 48px rgba(227,138,168,0.42))",
          }}
        >
          <div
            className="absolute inset-0 opacity-90"
            style={{
              background:
                "radial-gradient(circle at 32% 28%, #FFF0F4 0%, #F6C1D0 22%, #E38AA8 55%, #C96B8A 78%, #A84F6E 100%)",
              clipPath:
                "path('M50% 88% C50% 88% 8% 58% 8% 36 C8 22 22 12 36 12 C46 12 50 22 50 28 C50 22 54 12 64 12 C78 12 92 22 92 36 C92 58 50% 88% 50% 88% Z')",
              transform: "translateZ(-18px) scale(1.08)",
            }}
          />
          <div
            className="absolute inset-[6%] opacity-75"
            style={{
              background:
                "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.65) 0%, transparent 55%)",
              clipPath:
                "path('M50% 88% C50% 88% 8% 58% 8% 36 C8 22 22 12 36 12 C46 12 50 22 50 28 C50 22 54 12 64 12 C78 12 92 22 92 36 C92 58 50% 88% 50% 88% Z')",
            }}
          />
        </div>
      </motion.div>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10"
        aria-hidden
      />

      <motion.div
        className="pointer-events-none relative z-20 text-center"
        initial={{ opacity: 0, scale: 0.85, y: 12 }}
        animate={
          showName || reduce
            ? { opacity: 1, scale: 1, y: 0 }
            : { opacity: 0, scale: 0.85, y: 12 }
        }
        transition={{ duration: 0.9, ease: soft }}
      >
        <p
          className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl"
          style={{
            color: "#FFFFFF",
            textShadow:
              "0 2px 24px rgba(168,79,110,0.55), 0 0 40px rgba(227,138,168,0.45)",
          }}
        >
          {name}
        </p>
        <p
          className="mt-3 text-[11px] tracking-[0.38em] uppercase"
          style={{ color: "var(--hw-primary)" }}
        >
          Happy birthday
        </p>
      </motion.div>

      {/* Floating romantic phrases — orbit, not word-cloud heart */}
      {!reduce
        ? FLOAT_PHRASES.map((phrase, i) => (
            <motion.span
              key={phrase}
              className="pointer-events-none absolute z-20 font-[family-name:var(--font-body)] text-sm italic sm:text-base"
              style={{
                color: "rgba(227,138,168,0.75)",
                left: "50%",
                top: "50%",
              }}
              initial={{ opacity: 0, x: 0, y: 0 }}
              animate={{
                opacity: [0, 0.85, 0.85, 0],
                x: [
                  0,
                  Math.cos((i / FLOAT_PHRASES.length) * Math.PI * 2) * 130,
                  Math.cos((i / FLOAT_PHRASES.length) * Math.PI * 2) * 145,
                ],
                y: [
                  0,
                  Math.sin((i / FLOAT_PHRASES.length) * Math.PI * 2) * 100 - 20,
                  Math.sin((i / FLOAT_PHRASES.length) * Math.PI * 2) * 110 - 30,
                ],
              }}
              transition={{
                delay: 1.2 + i * 0.35,
                duration: 2.8,
                ease: soft,
              }}
            >
              {phrase}
            </motion.span>
          ))
        : null}

      <motion.p
        className="absolute bottom-[10%] text-[11px] tracking-[0.35em] uppercase"
        style={{ color: "var(--hw-muted)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduce ? 0.3 : 1.8 }}
      >
        Every beat leads to you
      </motion.p>
    </motion.div>
  );
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
    const id = window.setTimeout(onDone, reduce ? 900 : 3000);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, reduce]);

  const path =
    "M0 50 H40 L48 50 L55 18 L62 82 L70 42 L78 50 H120 L128 50 L135 18 L142 82 L150 42 L158 50 H200 L208 50 L215 18 L222 82 L230 42 L238 50 H280";

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-4"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.08, filter: "blur(10px)" }}
      transition={{ duration: 0.75, ease: soft }}
    >
      <div className="relative w-full max-w-2xl">
        <motion.p
          className="mb-8 text-center text-[11px] tracking-[0.42em] uppercase"
          style={{ color: "var(--hw-muted)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          Listening for you
        </motion.p>

        <svg viewBox="0 0 280 100" className="h-auto w-full overflow-visible" aria-hidden>
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
                : { pathLength: [0, 1], opacity: [0.5, 1, 1] }
            }
            transition={
              reduce ? { duration: 0.6 } : { duration: 2.2, ease: "easeInOut" }
            }
          />
        </svg>

        <motion.div
          className="mx-auto mt-8 flex justify-center"
          animate={
            reduce
              ? undefined
              : { scale: [1, 1.25, 1, 1.15, 1], opacity: [0.6, 1, 0.65, 1, 0.6] }
          }
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        >
          <span
            className="text-3xl"
            style={{
              color: "var(--hw-primary)",
              filter: "drop-shadow(0 0 12px rgba(227,138,168,0.5))",
            }}
          >
            ♥
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

function AutoMusic({ src, title }: { src: string; title?: string }) {
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
  const firstName = to.split(" ")[0] ?? to;

  type Phase = "wave" | "heart" | "wish";
  const [phase, setPhase] = useState<Phase>("wave");

  const goHeart = useCallback(() => setPhase("heart"), []);
  const goWish = useCallback(() => setPhase("wish"), []);

  return (
    <main
      className="relative min-h-svh overflow-x-hidden bg-[var(--hw-bg)] font-[family-name:var(--font-body)] text-[var(--hw-text)]"
      style={themeStyle(data.palette)}
    >
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

      <div className="relative min-h-svh">
        <AnimatePresence mode="wait">
          {phase === "wave" ? (
            <HeartbeatWave key="wave" active onDone={goHeart} />
          ) : null}
          {phase === "heart" ? (
            <ParticleHeartCanvas
              key="heart"
              name={firstName}
              active
              onDone={goWish}
            />
          ) : null}
        </AnimatePresence>
      </div>

      {phase === "wish" ? (
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, ease: soft }}
        >
          <section className="relative flex min-h-svh flex-col items-center justify-center px-6 py-20 text-center">
            <motion.div
              className="relative mb-8"
              style={{ perspective: 800 }}
              animate={
                reduce ? undefined : { y: [0, -8, 0], rotateY: [-8, 8, -8] }
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
                  {letter?.greeting ?? `My ${firstName},`}
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
        <AutoMusic src={data.media.music.src} title={data.media.music.title} />
      ) : null}
    </main>
  );
}
