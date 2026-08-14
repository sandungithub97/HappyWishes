"use client";

import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { ParallaxLayer } from "@/templates/_shared/components/ParallaxLayer";
import { ParticleField } from "@/templates/_shared/components/ParticleField";
import { Reveal } from "@/templates/_shared/components/Reveal";
import { ScrollHint } from "@/templates/_shared/components/ScrollHint";
import { TextureOverlay } from "@/templates/_shared/components/TextureOverlay";
import { PlaceSection } from "@/templates/_shared/components/VenueMap";
import { themeStyle } from "@/templates/_shared/theme";
import type { TemplateData } from "@/templates/_shared/types";

const soft = [0.22, 1, 0.36, 1] as const;

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.11, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.05, ease: soft },
  },
};

const FALLING_EMOJIS = ["♥", "💕", "💗", "💖", "🎂", "🎉", "✨", "🎈", "💝", "🥳"];

function HeartbeatIntro({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();

  useEffect(() => {
    const id = window.setTimeout(onDone, reduce ? 700 : 3200);
    return () => window.clearTimeout(id);
  }, [onDone, reduce]);

  const path =
    "M0 50 H40 L48 50 L55 18 L62 82 L70 42 L78 50 H120 L128 50 L135 18 L142 82 L150 42 L158 50 H200 L208 50 L215 18 L222 82 L230 42 L238 50 H280";

  return (
    <motion.div
      className="fixed inset-0 z-[45] flex items-center justify-center bg-[#FFFBFC] px-4"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.03, filter: "blur(8px)" }}
      transition={{ duration: 0.85, ease: soft }}
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
            <linearGradient id="ecgGradLgf" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F6C1D0" stopOpacity="0.2" />
              <stop offset="40%" stopColor="#E38AA8" stopOpacity="1" />
              <stop offset="100%" stopColor="#F6C1D0" stopOpacity="0.25" />
            </linearGradient>
            <filter id="ecgGlowLgf" x="-20%" y="-40%" width="140%" height="180%">
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
            stroke="url(#ecgGradLgf)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#ecgGlowLgf)"
            initial={{ pathLength: 0, opacity: 0.4 }}
            animate={
              reduce
                ? { pathLength: 1, opacity: 1 }
                : { pathLength: [0, 1], opacity: [0.5, 1, 1] }
            }
            transition={
              reduce ? { duration: 0.5 } : { duration: 2.2, ease: "easeInOut" }
            }
          />
        </svg>

        <motion.div
          className="mx-auto mt-8 flex justify-center"
          animate={
            reduce
              ? undefined
              : { scale: [1, 1.22, 1, 1.12, 1], opacity: [0.55, 1, 0.6, 1, 0.55] }
          }
          transition={{ duration: 1.05, repeat: Infinity, ease: "easeInOut" }}
        >
          <span
            className="text-3xl"
            style={{
              color: "var(--hw-primary)",
              filter: "drop-shadow(0 0 12px rgba(227,138,168,0.45))",
            }}
          >
            ♥
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

function FallingEmojiRain() {
  const reduce = useReducedMotion();
  const items = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        emoji: FALLING_EMOJIS[i % FALLING_EMOJIS.length]!,
        left: `${(i * 37) % 100}%`,
        delay: (i % 10) * 0.45,
        duration: 7 + (i % 6) * 1.2,
        size: 16 + (i % 5) * 5,
        drift: (i % 2 === 0 ? 1 : -1) * (8 + (i % 4) * 4),
      })),
    [],
  );

  if (reduce) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[6] overflow-hidden"
      style={{ opacity: 0.5 }}
      aria-hidden
    >
      {items.map((item) => (
        <motion.span
          key={item.id}
          className="absolute select-none"
          style={{
            left: item.left,
            top: "-6%",
            fontSize: item.size,
            lineHeight: 1,
          }}
          animate={{
            y: ["0vh", "108vh"],
            x: [0, item.drift, -item.drift * 0.5, 0],
            rotate: [0, item.drift > 0 ? 18 : -18, 0],
            opacity: [0, 0.85, 0.85, 0],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {item.emoji}
        </motion.span>
      ))}
    </div>
  );
}

function AutoMusic({ src, title }: { src: string; title?: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.65;
    audio.loop = true;

    const play = async () => {
      try {
        await audio.play();
        setPlaying(true);
        setBlocked(false);
      } catch {
        setBlocked(true);
      }
    };

    void play();
    const unlock = () => void play();
    window.addEventListener("pointerdown", unlock, { once: true });
    return () => window.removeEventListener("pointerdown", unlock);
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
      <motion.button
        type="button"
        onClick={toggle}
        className="fixed right-5 bottom-5 z-50 flex items-center gap-2.5 rounded-full border px-4 py-2.5 shadow-lg backdrop-blur-xl sm:right-8 sm:bottom-8"
        style={{
          background: "rgba(255,255,255,0.88)",
          borderColor: "var(--hw-border)",
          color: "var(--hw-primary)",
        }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8, ease: soft }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
      >
        <span className="flex h-3 items-end gap-0.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-0.5 rounded-full bg-current"
              animate={
                playing
                  ? { height: ["6px", "12px", "8px", "12px"] }
                  : { height: "6px" }
              }
              transition={{
                duration: 0.55,
                repeat: playing ? Infinity : 0,
                delay: i * 0.1,
                ease: "easeInOut",
              }}
            />
          ))}
        </span>
        <span className="text-[10px] tracking-[0.2em] uppercase">
          {blocked && !playing ? "Tap for music" : title ?? "For you"}
        </span>
      </motion.button>
    </>
  );
}

function SoftOrb({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <motion.div
      className={`pointer-events-none absolute rounded-full blur-3xl ${className ?? ""}`}
      style={{ background: "rgba(246,193,208,0.45)" }}
      animate={{
        scale: [1, 1.15, 1],
        opacity: [0.35, 0.55, 0.35],
      }}
      transition={{
        duration: 8 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

export function Experience({ data }: { data: TemplateData }) {
  const reduce = useReducedMotion();
  const [introDone, setIntroDone] = useState(reduce);
  const [ready, setReady] = useState(reduce);

  const to =
    data.people.find((p) => p.role === "To")?.name ?? data.people[0]?.name ?? "";
  const from =
    data.people.find((p) => p.role === "From")?.name ??
    data.people[1]?.name ??
    "";
  const firstName = to.split(" ")[0] ?? to;
  const letter = data.extras.letter;
  const heroPhoto = data.media.photos[0];
  const secondPhoto = data.media.photos[1];

  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(40);
  const springX = useSpring(mouseX, { stiffness: 35, damping: 24 });
  const springY = useSpring(mouseY, { stiffness: 35, damping: 24 });
  const glow = useMotionTemplate`radial-gradient(ellipse 50% 45% at ${springX}% ${springY}%, rgba(246,193,208,0.35), transparent 70%)`;

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0.15]);
  const heroScale = useTransform(
    scrollYProgress,
    [0, 0.25],
    reduce ? [1, 1] : [1, 0.96],
  );

  useEffect(() => {
    if (!introDone) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
    document.body.style.overflow = "";
  }, [introDone]);

  useEffect(() => {
    if (!introDone) return;
    const t = window.setTimeout(() => setReady(true), reduce ? 0 : 120);
    return () => window.clearTimeout(t);
  }, [introDone, reduce]);

  return (
    <main
      className="relative min-h-svh overflow-x-hidden bg-[var(--hw-bg)] font-[family-name:var(--font-body)] text-[var(--hw-text)]"
      style={themeStyle(data.palette)}
      onMouseMove={(e) => {
        if (reduce) return;
        const { innerWidth, innerHeight } = window;
        mouseX.set((e.clientX / innerWidth) * 100);
        mouseY.set((e.clientY / innerHeight) * 100);
      }}
    >
      {/* Ambient */}
      <div
        className="pointer-events-none fixed inset-0 -z-20"
        style={{
          background:
            "linear-gradient(165deg, #FFFBFC 0%, #FFF5F8 45%, #FFFBFC 100%)",
        }}
      />
      <motion.div
        className="pointer-events-none fixed inset-0 -z-[15]"
        style={{ background: glow }}
      />
      <SoftOrb className="left-[8%] top-[12%] h-56 w-56" delay={0} />
      <SoftOrb className="right-[5%] top-[35%] h-72 w-72" delay={2} />
      <SoftOrb className="bottom-[15%] left-[30%] h-48 w-48" delay={4} />
      <ParticleField
        variant="bokeh"
        count={14}
        colors={[
          "rgba(227,138,168,0.35)",
          "rgba(255,255,255,0.5)",
          "rgba(246,193,208,0.4)",
        ]}
        className="fixed inset-0 -z-10 opacity-60"
      />
      <TextureOverlay variant="grain" opacity={0.06} className="fixed inset-0 -z-[8]" />

      <FallingEmojiRain />

      <AnimatePresence>
        {!introDone ? <HeartbeatIntro key="intro" onDone={() => setIntroDone(true)} /> : null}
      </AnimatePresence>

      {/* Intro veil — fades once heartbeat ends */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-40 bg-[#FFFBFC]"
        initial={{ opacity: introDone ? 0 : 1 }}
        animate={{ opacity: introDone && ready ? 0 : introDone ? 0.4 : 1 }}
        transition={{ duration: 1.1, ease: soft }}
      />

      {introDone ? (
      <>
      {/* ——— Hero ——— */}
      <motion.section
        className="relative flex min-h-svh flex-col items-center justify-center px-6 pb-16 pt-24"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <motion.div
          className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-16"
          variants={reduce ? undefined : stagger}
          initial={reduce ? false : "hidden"}
          animate={ready ? "show" : "hidden"}
        >
          {heroPhoto ? (
            <motion.div variants={reduce ? undefined : fadeUp} className="w-full max-w-sm lg:max-w-md">
              <ParallaxLayer distance={32} range={[0, 0.3]}>
                <div
                  className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border shadow-2xl"
                  style={{
                    borderColor: "rgba(240,213,221,0.8)",
                    boxShadow:
                      "0 32px 80px rgba(227,138,168,0.22), 0 0 0 1px rgba(255,255,255,0.6) inset",
                  }}
                >
                  <Image
                    src={heroPhoto.src}
                    alt={heroPhoto.alt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 420px"
                    className="object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(255,251,252,0.5) 0%, transparent 35%)",
                    }}
                  />
                </div>
              </ParallaxLayer>
            </motion.div>
          ) : null}

          <div className="max-w-lg text-center lg:text-left">
            <motion.p
              variants={reduce ? undefined : fadeUp}
              className="text-[11px] tracking-[0.42em] uppercase"
              style={{ color: "var(--hw-muted)" }}
            >
              {data.copy.subhead}
            </motion.p>

            <motion.h1
              variants={reduce ? undefined : fadeUp}
              className="mt-5 font-[family-name:var(--font-display)] text-6xl leading-[1.05] sm:text-7xl lg:text-8xl"
              style={{ color: "var(--hw-primary)" }}
            >
              {firstName}
            </motion.h1>

            <motion.div
              variants={reduce ? undefined : fadeUp}
              className="mx-auto mt-5 h-px w-16 origin-left lg:mx-0"
              style={{ background: "var(--hw-primary)" }}
              initial={reduce ? false : { scaleX: 0 }}
              animate={ready ? { scaleX: 1 } : undefined}
              transition={{ delay: 0.85, duration: 1, ease: soft }}
            />

            <motion.p
              variants={reduce ? undefined : fadeUp}
              className="mt-6 font-[family-name:var(--font-body)] text-2xl leading-snug sm:text-3xl"
              style={{ color: "var(--hw-secondary)" }}
            >
              {data.copy.headline}
            </motion.p>

            {from ? (
              <motion.p
                variants={reduce ? undefined : fadeUp}
                className="mt-4 text-sm tracking-[0.22em] uppercase"
                style={{ color: "var(--hw-muted)" }}
              >
                With love · {from}
              </motion.p>
            ) : null}
          </div>
        </motion.div>

        {ready ? <ScrollHint color="var(--hw-muted)" /> : null}
      </motion.section>

      {/* ——— Letter ——— */}
      <section className="relative mx-auto max-w-2xl px-6 py-20">
        <Reveal>
          <article
            className="relative overflow-hidden rounded-[2rem] border px-8 py-12 sm:px-12 sm:py-14"
            style={{
              background: "rgba(255,255,255,0.72)",
              borderColor: "var(--hw-border)",
              boxShadow: "0 24px 64px rgba(227,138,168,0.12)",
              backdropFilter: "blur(12px)",
            }}
          >
            <TextureOverlay variant="paper" opacity={0.25} />
            <div className="relative z-10">
              <p
                className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl"
                style={{ color: "var(--hw-primary)" }}
              >
                {letter?.greeting ?? `My ${firstName},`}
              </p>
              <p
                className="mt-8 text-xl leading-[1.85] sm:text-2xl"
                style={{ color: "var(--hw-text)" }}
              >
                {data.copy.message}
              </p>
              <p
                className="mt-10 text-lg italic"
                style={{ color: "var(--hw-muted)" }}
              >
                {letter?.closing ?? "Always,"}
              </p>
              <p
                className="mt-3 font-[family-name:var(--font-display)] text-5xl"
                style={{ color: "var(--hw-secondary)" }}
              >
                {letter?.signature ?? from}
              </p>
            </div>
          </article>
        </Reveal>
      </section>

      {/* ——— Second moment / photo ——— */}
      {secondPhoto ? (
        <section className="relative mx-auto max-w-4xl px-6 pb-24">
          <Reveal delay={0.08}>
            <div className="grid items-center gap-10 sm:grid-cols-[1fr_1.1fr]">
              <div
                className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border shadow-xl"
                style={{
                  borderColor: "var(--hw-border)",
                  boxShadow: "0 20px 50px rgba(227,138,168,0.18)",
                }}
              >
                <Image
                  src={secondPhoto.src}
                  alt={secondPhoto.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 480px"
                  className="object-cover"
                />
              </div>
              <div className="text-center sm:text-left">
                <p
                  className="text-[11px] tracking-[0.35em] uppercase"
                  style={{ color: "var(--hw-primary)" }}
                >
                  Today is yours
                </p>
                <p
                  className="mt-4 font-[family-name:var(--font-display)] text-4xl leading-tight sm:text-5xl"
                  style={{ color: "var(--hw-secondary)" }}
                >
                  Make every moment feel like a little celebration.
                </p>
                {data.event?.timeLabel ? (
                  <p
                    className="mt-6 text-sm tracking-[0.18em] uppercase"
                    style={{ color: "var(--hw-muted)" }}
                  >
                    {data.event.timeLabel}
                  </p>
                ) : null}
              </div>
            </div>
          </Reveal>
        </section>
      ) : null}

      {/* ——— Closing ——— */}
      <footer className="px-6 pb-28 text-center">
        <Reveal>
          <motion.div
            className="mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-full"
            style={{
              background:
                "linear-gradient(145deg, #F9D5E0, #E38AA8)",
              boxShadow: "0 12px 32px rgba(227,138,168,0.35)",
            }}
            animate={
              reduce
                ? undefined
                : { scale: [1, 1.06, 1], opacity: [0.9, 1, 0.9] }
            }
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-xl text-white">♥</span>
          </motion.div>
          <p
            className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl"
            style={{ color: "var(--hw-primary)" }}
          >
            Happy birthday, {firstName}
          </p>
          <p
            className="mt-4 text-sm tracking-[0.24em] uppercase"
            style={{ color: "var(--hw-muted)" }}
          >
            {from ? `Forever · ${from}` : "With all my love"}
          </p>
        </Reveal>
      </footer>

      <PlaceSection place={data.event?.place} />
      </>
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
