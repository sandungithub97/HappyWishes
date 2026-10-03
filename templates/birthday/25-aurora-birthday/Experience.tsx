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
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
} from "react";
import { ConfettiBurst } from "@/templates/_shared/components/ConfettiBurst";
import { Reveal } from "@/templates/_shared/components/Reveal";
import { ScrollHint } from "@/templates/_shared/components/ScrollHint";
import { TextureOverlay } from "@/templates/_shared/components/TextureOverlay";
import { PlaceSection } from "@/templates/_shared/components/VenueMap";
import { themeStyle } from "@/templates/_shared/theme";
import type { TemplateData } from "@/templates/_shared/types";

const soft = [0.22, 1, 0.36, 1] as const;

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const ZODIAC: [number, number, string, string][] = [
  [1, 19, "Capricorn", "♑"],
  [2, 18, "Aquarius", "♒"],
  [3, 20, "Pisces", "♓"],
  [4, 19, "Aries", "♈"],
  [5, 20, "Taurus", "♉"],
  [6, 20, "Gemini", "♊"],
  [7, 22, "Cancer", "♋"],
  [8, 22, "Leo", "♌"],
  [9, 22, "Virgo", "♍"],
  [10, 22, "Libra", "♎"],
  [11, 21, "Scorpio", "♏"],
  [12, 21, "Sagittarius", "♐"],
  [12, 31, "Capricorn", "♑"],
];

const DAY_MS = 86_400_000;

const gradientText: CSSProperties = {
  backgroundImage:
    "linear-gradient(100deg, var(--hw-primary), var(--hw-accent) 30%, var(--hw-secondary) 60%, var(--hw-primary))",
  backgroundSize: "200% auto",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
};

function zodiac(month: number, day: number) {
  const hit = ZODIAC.find(([m, d]) => month < m || (month === m && day <= d));
  return hit ? { name: hit[2], symbol: `${hit[3]}\uFE0E` } : null;
}

function ordinal(n: number) {
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${n}th`;
  return `${n}${["th", "st", "nd", "rd"][n % 10] ?? "th"}`;
}

function formatNumber(n: number) {
  return Math.floor(n).toLocaleString("en-US");
}

function useNow(interval = 1000) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, interval);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, [interval]);
  return now;
}

/* ——— Backdrop ——— */

function AuroraBlob({
  className,
  color,
  duration,
  path,
}: {
  className: string;
  color: string;
  duration: number;
  path: { x: string[]; y: string[] };
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`absolute rounded-full blur-[110px] ${className}`}
      style={{
        background: `radial-gradient(circle, color-mix(in srgb, ${color} 70%, transparent), transparent 68%)`,
      }}
      animate={reduce ? undefined : { x: path.x, y: path.y, scale: [1, 1.15, 0.95, 1] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function Starfield() {
  const reduce = useReducedMotion();
  const stars = useMemo(
    () =>
      Array.from({ length: 64 }, (_, i) => ({
        id: i,
        left: `${(i * 61.8) % 100}%`,
        top: `${(i * 37.3 + (i % 7) * 11) % 100}%`,
        size: 1 + (i % 3) * 0.8,
        delay: (i % 9) * 0.6,
        duration: 2.6 + (i % 5) * 0.9,
      })),
    [],
  );

  return (
    <div className="absolute inset-0">
      {stars.map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{ left: s.left, top: s.top, width: s.size, height: s.size }}
          animate={reduce ? { opacity: 0.5 } : { opacity: [0.15, 0.9, 0.15] }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function Backdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[var(--hw-bg)]">
      <AuroraBlob
        className="-left-[10%] -top-[15%] h-[60vh] w-[60vh]"
        color="var(--hw-primary)"
        duration={22}
        path={{ x: ["0vw", "18vw", "6vw", "0vw"], y: ["0vh", "10vh", "24vh", "0vh"] }}
      />
      <AuroraBlob
        className="-right-[12%] top-[20%] h-[70vh] w-[70vh]"
        color="var(--hw-secondary)"
        duration={26}
        path={{ x: ["0vw", "-16vw", "-4vw", "0vw"], y: ["0vh", "-12vh", "14vh", "0vh"] }}
      />
      <AuroraBlob
        className="bottom-[-25%] left-[25%] h-[55vh] w-[55vh] opacity-70"
        color="var(--hw-accent)"
        duration={30}
        path={{ x: ["0vw", "12vw", "-10vw", "0vw"], y: ["0vh", "-14vh", "-6vh", "0vh"] }}
      />
      <Starfield />
      <TextureOverlay variant="grain" opacity={0.08} className="fixed inset-0" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 50% 0%, transparent 40%, color-mix(in srgb, var(--hw-bg) 85%, transparent) 100%)",
        }}
      />
    </div>
  );
}

function RisingStickers({ stickers }: { stickers: string[] }) {
  const reduce = useReducedMotion();
  const items = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        emoji: stickers[i % stickers.length] ?? "✨",
        left: `${(i * 43 + 7) % 100}%`,
        delay: i * 1.3,
        duration: 16 + (i % 5) * 3,
        size: 14 + (i % 4) * 6,
        drift: (i % 2 === 0 ? 1 : -1) * (12 + (i % 3) * 10),
      })),
    [stickers],
  );

  if (reduce || stickers.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden>
      {items.map((item) => (
        <motion.span
          key={item.id}
          className="absolute bottom-[-8%] select-none"
          style={{ left: item.left, fontSize: item.size }}
          animate={{
            y: ["0vh", "-115vh"],
            x: [0, item.drift, -item.drift, 0],
            opacity: [0, 0.55, 0.55, 0],
            rotate: [0, item.drift > 0 ? 20 : -20],
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

/* ——— Shared UI ——— */

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p
      className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[10px] font-semibold tracking-[0.32em] uppercase backdrop-blur-md"
      style={{
        borderColor: "color-mix(in srgb, var(--hw-border) 80%, transparent)",
        background: "color-mix(in srgb, var(--hw-surface) 45%, transparent)",
        color: "var(--hw-muted)",
      }}
    >
      <span style={{ color: "var(--hw-accent)" }}>✦</span>
      {children}
    </p>
  );
}

function GlowCard({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  function track(e: PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      onPointerMove={track}
      className={`group relative overflow-hidden rounded-[1.75rem] p-px ${className ?? ""}`}
      style={{
        background:
          "linear-gradient(140deg, color-mix(in srgb, var(--hw-primary) 55%, transparent), color-mix(in srgb, var(--hw-border) 60%, transparent) 40%, color-mix(in srgb, var(--hw-secondary) 50%, transparent))",
        ...style,
      }}
    >
      <div
        className="relative h-full overflow-hidden rounded-[calc(1.75rem-1px)] backdrop-blur-xl"
        style={{ background: "color-mix(in srgb, var(--hw-surface) 82%, transparent)" }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--hw-primary) 16%, transparent), transparent 45%)",
          }}
        />
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}

function PillButton({
  children,
  onClick,
  variant = "solid",
}: {
  children: ReactNode;
  onClick: () => void;
  variant?: "solid" | "ghost";
}) {
  const solid = variant === "solid";
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="relative inline-flex items-center gap-2.5 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide"
      style={
        solid
          ? {
              background:
                "linear-gradient(120deg, var(--hw-primary), var(--hw-secondary))",
              color: "var(--hw-bg)",
              boxShadow:
                "0 12px 40px color-mix(in srgb, var(--hw-primary) 40%, transparent)",
            }
          : {
              border: "1px solid var(--hw-border)",
              background: "color-mix(in srgb, var(--hw-surface) 50%, transparent)",
              color: "var(--hw-text)",
            }
      }
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
    >
      {solid ? (
        <motion.span
          className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)",
          }}
          initial={{ left: "-40%" }}
          animate={{ left: ["-40%", "140%"] }}
          transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.6, ease: "easeInOut" }}
        />
      ) : null}
      <span className="relative">{children}</span>
    </motion.button>
  );
}

/* ——— Gate ——— */

function BirthdayStatus({ date }: { date?: string }) {
  const now = useNow(1000);
  if (!date || now === null) {
    return <span className="opacity-0">.</span>;
  }

  const start = new Date(date).getTime();
  const diff = start - now;

  if (diff > 0) {
    const h = Math.floor(diff / 3_600_000);
    const m = Math.floor((diff % 3_600_000) / 60_000);
    const s = Math.floor((diff % 60_000) / 1000);
    const pad = (v: number) => String(v).padStart(2, "0");
    const days = Math.floor(h / 24);
    return (
      <span>
        Your day begins in{" "}
        <span className="font-semibold tabular-nums" style={{ color: "var(--hw-text)" }}>
          {days > 0 ? `${days}d ` : ""}
          {pad(h % 24)}h {pad(m)}m {pad(s)}s
        </span>
      </span>
    );
  }

  if (now - start < DAY_MS) {
    return (
      <span>
        <span style={{ color: "var(--hw-accent)" }}>●</span> It&apos;s your day — right now
      </span>
    );
  }

  return <span>Celebrating you, always</span>;
}

function Gate({
  name,
  age,
  date,
  onOpen,
}: {
  name: string;
  age?: number;
  date?: string;
  onOpen: () => void;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center px-6 text-center"
      exit={{ opacity: 0, scale: 1.08, filter: "blur(14px)" }}
      transition={{ duration: 1.1, ease: soft }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: soft }}
      >
        <Eyebrow>A little something for you</Eyebrow>
      </motion.div>

      <motion.div
        className="relative mt-12 flex h-52 w-52 items-center justify-center sm:h-60 sm:w-60"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 1.2, ease: soft }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, var(--hw-primary), var(--hw-accent), var(--hw-secondary), var(--hw-primary))",
            mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))",
            WebkitMask:
              "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))",
          }}
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-6 rounded-full blur-2xl"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--hw-primary) 55%, transparent), transparent 70%)",
          }}
          animate={reduce ? undefined : { scale: [1, 1.18, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="absolute inset-3 rounded-full border backdrop-blur-xl"
          style={{
            borderColor: "color-mix(in srgb, var(--hw-border) 70%, transparent)",
            background: "color-mix(in srgb, var(--hw-surface) 55%, transparent)",
          }}
        />
        <div className="relative">
          <p
            className="font-[family-name:var(--font-display)] text-8xl leading-none italic sm:text-9xl"
            style={gradientText}
          >
            {age ?? "✦"}
          </p>
        </div>
      </motion.div>

      <motion.h2
        className="mt-12 font-[family-name:var(--font-display)] text-5xl sm:text-6xl"
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: 0.45, duration: 1, ease: soft }}
      >
        For <span className="italic" style={gradientText}>{name}</span>
      </motion.h2>
      <motion.p
        className="mt-4 max-w-sm text-sm leading-relaxed"
        style={{ color: "var(--hw-muted)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 1 }}
      >
        Someone made this just for you. Turn your sound on and tap below.
      </motion.p>

      <motion.div
        className="mt-10"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.9, ease: soft }}
      >
        <PillButton onClick={onOpen}>Open your wish ✦</PillButton>
      </motion.div>

      <motion.p
        className="mt-8 text-xs tracking-[0.12em]"
        style={{ color: "var(--hw-muted)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <BirthdayStatus date={date} />
      </motion.p>
    </motion.div>
  );
}

/* ——— Intro video ——— */

function IntroVideo({ src, onDone }: { src: string; onDone: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const backdropRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(false);
  const [needsTap, setNeedsTap] = useState(false);
  const [muted, setMuted] = useState(false);

  function finish() {
    if (doneRef.current) return;
    doneRef.current = true;
    onDone();
  }

  async function start() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    try {
      await video.play();
      setMuted(false);
      setNeedsTap(false);
      void backdropRef.current?.play().catch(() => undefined);
    } catch {
      setNeedsTap(true);
    }
  }

  // Browsers block autoplay with sound until the visitor interacts, so try
  // with sound first and fall back to muted playback that unmutes on a tap.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const playBackdrop = () => {
      void backdropRef.current?.play().catch(() => undefined);
    };

    video.muted = false;
    video
      .play()
      .then(playBackdrop)
      .catch(() => {
        video.muted = true;
        setMuted(true);
        return video
          .play()
          .then(playBackdrop)
          .catch(() => setNeedsTap(true));
      });
  }, []);

  useEffect(() => {
    if (!muted) return;
    const unmute = () => {
      const video = videoRef.current;
      if (!video) return;
      video.muted = false;
      setMuted(false);
    };
    window.addEventListener("pointerdown", unmute);
    window.addEventListener("keydown", unmute);
    return () => {
      window.removeEventListener("pointerdown", unmute);
      window.removeEventListener("keydown", unmute);
    };
  }, [muted]);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const video = videoRef.current;
      const bar = barRef.current;
      if (video && bar && video.duration > 0) {
        bar.style.transform = `scaleX(${Math.min(1, video.currentTime / video.duration)})`;
      }
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[60] overflow-hidden bg-black"
      exit={{ opacity: 0, scale: 1.06, filter: "blur(14px)" }}
      transition={{ duration: 1.1, ease: soft }}
    >
      <video
        ref={backdropRef}
        src={src}
        muted
        playsInline
        loop
        preload="auto"
        aria-hidden
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-50 blur-2xl"
      />
      <video
        ref={videoRef}
        src={src}
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        onEnded={finish}
        onError={finish}
        className="relative h-full w-full object-cover sm:object-contain"
      />

      <div className="absolute inset-x-4 top-4 h-[3px] overflow-hidden rounded-full bg-white/20 sm:inset-x-8 sm:top-6">
        <div
          ref={barRef}
          className="h-full origin-left rounded-full bg-white"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      <button
        type="button"
        onClick={finish}
        className="absolute right-4 bottom-6 rounded-full border border-white/25 bg-black/30 px-4 py-2 text-[11px] font-semibold tracking-[0.2em] text-white/80 uppercase backdrop-blur-md transition hover:text-white sm:right-8 sm:bottom-8"
      >
        Skip ›
      </button>

      <AnimatePresence>
        {muted && !needsTap ? (
          <motion.button
            key="sound"
            type="button"
            className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/25 bg-black/40 px-5 py-2.5 text-xs font-semibold text-white backdrop-blur-md sm:bottom-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: [0, -4, 0] }}
            exit={{ opacity: 0, y: 10, transition: { duration: 0.3 } }}
            transition={{ y: { duration: 1.6, repeat: Infinity, ease: "easeInOut" } }}
          >
            <span aria-hidden>🔊</span> Tap for sound
          </motion.button>
        ) : null}
        {needsTap ? (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <PillButton onClick={() => void start()}>Tap to start ✦</PillButton>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

/* ——— Life counter ——— */

function LifeCounter({ birthMs, age }: { birthMs: number; age: number }) {
  const now = useNow(1000);
  const lived = now === null ? null : Math.max(0, now - birthMs);

  const tiles = [
    { label: "Days", value: lived === null ? "—" : formatNumber(lived / DAY_MS) },
    { label: "Hours", value: lived === null ? "—" : formatNumber(lived / 3_600_000) },
    { label: "Minutes", value: lived === null ? "—" : formatNumber(lived / 60_000) },
    { label: "Seconds", value: lived === null ? "—" : formatNumber(lived / 1000) },
  ];

  const heartbeats = lived === null ? "—" : formatNumber((lived / 60_000) * 80);

  return (
    <section className="relative mx-auto max-w-5xl px-6 py-24 sm:py-32">
      <Reveal className="text-center">
        <Eyebrow>Since the day you arrived</Eyebrow>
        <h2 className="mt-6 font-[family-name:var(--font-display)] text-4xl leading-tight sm:text-6xl">
          You&apos;ve been lighting up
          <br />
          this world for{" "}
          <span className="italic" style={gradientText}>
            {age} years
          </span>
        </h2>
      </Reveal>

      <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {tiles.map((tile, i) => (
          <Reveal key={tile.label} delay={i * 0.08}>
            <GlowCard>
              <div className="px-5 py-7 text-center sm:py-9">
                <p
                  className="font-[family-name:var(--font-display)] text-3xl tabular-nums sm:text-4xl lg:text-[2.6rem]"
                  style={{ color: "var(--hw-text)" }}
                >
                  {tile.value}
                </p>
                <p
                  className="mt-2 text-[10px] font-semibold tracking-[0.3em] uppercase"
                  style={{ color: "var(--hw-muted)" }}
                >
                  {tile.label}
                </p>
              </div>
            </GlowCard>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <p className="mt-10 text-center text-sm leading-relaxed" style={{ color: "var(--hw-muted)" }}>
          That&apos;s about{" "}
          <span className="font-semibold tabular-nums" style={{ color: "var(--hw-primary)" }}>
            {heartbeats}
          </span>{" "}
          heartbeats and {age} trips around the sun — and every one of them made the world better.
        </p>
      </Reveal>
    </section>
  );
}

/* ——— Letter ——— */

function WordReveal({ text }: { text: string }) {
  const reduce = useReducedMotion();
  const words = text.split(/\s+/);

  if (reduce) return <>{text}</>;

  return (
    <motion.span
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={{ show: { transition: { staggerChildren: 0.025 } } }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 10, filter: "blur(6px)" },
            show: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.6, ease: soft },
            },
          }}
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* ——— Cake ——— */

function Flame({ lit }: { lit: boolean }) {
  const reduce = useReducedMotion();
  return (
    <div className="relative mx-auto h-10 w-5">
      <AnimatePresence>
        {lit ? (
          <motion.div
            key="flame"
            className="absolute inset-x-0 bottom-0 mx-auto h-9 w-[18px]"
            style={{
              borderRadius: "50% 50% 50% 50% / 62% 62% 38% 38%",
              background:
                "radial-gradient(circle at 50% 72%, #ffffff 0%, #FFF1B8 22%, #FFC56B 52%, #FF7A59 82%, transparent 100%)",
              boxShadow: "0 0 28px 10px rgba(255, 190, 110, 0.45)",
              transformOrigin: "50% 100%",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={
              reduce
                ? { scale: 1, opacity: 1 }
                : {
                    scale: [1, 1.1, 0.94, 1.05, 1],
                    rotate: [-3, 3, -2, 2, -3],
                    opacity: 1,
                  }
            }
            exit={{ scale: 0, opacity: 0, transition: { duration: 0.25 } }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
        ) : (
          <motion.div key="smoke" className="absolute inset-x-0 bottom-0">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full blur-[3px]"
                style={{ background: "rgba(220,215,235,0.45)" }}
                initial={{ y: 0, opacity: 0.8, scale: 0.6 }}
                animate={{ y: -60 - i * 14, x: (i - 1) * 10, opacity: 0, scale: 2 }}
                transition={{ duration: 1.8, delay: i * 0.15, ease: "easeOut" }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute bottom-[-6px] left-1/2 h-2 w-[2px] -translate-x-1/2 rounded bg-[#2b2235]" />
    </div>
  );
}

function CakeSection({
  name,
  age,
  onWish,
}: {
  name: string;
  age?: number;
  onWish: () => void;
}) {
  const [lit, setLit] = useState(true);
  const digits = age ? String(age).split("") : ["✦"];
  const sprinkles = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        left: `${6 + ((i * 41) % 88)}%`,
        top: `${18 + ((i * 29) % 64)}%`,
        rotate: (i * 47) % 180,
        color: ["var(--hw-accent)", "#ffffff", "var(--hw-secondary)"][i % 3],
      })),
    [],
  );

  function blow() {
    setLit(false);
    onWish();
  }

  return (
    <section className="relative mx-auto max-w-3xl px-6 py-24 text-center sm:py-32">
      <Reveal>
        <Eyebrow>Close your eyes</Eyebrow>
        <h2 className="mt-6 font-[family-name:var(--font-display)] text-4xl sm:text-6xl">
          Make a wish, <span className="italic" style={gradientText}>{name}</span>
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="relative mx-auto mt-16 w-[280px] sm:w-[320px]">
          <div className="relative z-10 flex items-end justify-center gap-5">
            {digits.map((digit, i) => (
              <div key={`${digit}-${i}`} className="flex flex-col items-center">
                <Flame lit={lit} />
                <span
                  className="mt-1 font-[family-name:var(--font-display)] text-7xl leading-[0.8] italic sm:text-8xl"
                  style={{
                    ...gradientText,
                    filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.35))",
                  }}
                >
                  {digit}
                </span>
              </div>
            ))}
          </div>

          <div
            className="relative mx-auto -mt-1 h-20 w-[78%] rounded-t-[1.6rem]"
            style={{
              background:
                "linear-gradient(180deg, color-mix(in srgb, var(--hw-primary) 90%, white) 0%, var(--hw-primary) 100%)",
              boxShadow: "inset 0 -10px 20px rgba(0,0,0,0.12)",
            }}
          >
            <div className="absolute inset-x-0 top-0 flex justify-around px-2">
              {Array.from({ length: 7 }, (_, i) => (
                <span
                  key={i}
                  className="block w-5 rounded-b-full"
                  style={{
                    height: 14 + (i % 3) * 7,
                    background: "color-mix(in srgb, white 88%, var(--hw-primary))",
                  }}
                />
              ))}
            </div>
          </div>
          <div
            className="relative mx-auto h-24 w-full overflow-hidden rounded-t-[1.2rem] rounded-b-[0.8rem]"
            style={{
              background:
                "linear-gradient(180deg, color-mix(in srgb, var(--hw-secondary) 85%, white) 0%, var(--hw-secondary) 100%)",
              boxShadow: "inset 0 -14px 24px rgba(0,0,0,0.15)",
            }}
          >
            {sprinkles.map((s) => (
              <span
                key={s.id}
                className="absolute h-1 w-2.5 rounded-full"
                style={{
                  left: s.left,
                  top: s.top,
                  rotate: `${s.rotate}deg`,
                  background: s.color,
                  opacity: 0.85,
                }}
              />
            ))}
          </div>
          <div
            className="mx-auto -mt-2 h-6 w-[115%] -translate-x-[6.5%] rounded-[50%]"
            style={{
              background: "color-mix(in srgb, var(--hw-surface) 70%, white 8%)",
              boxShadow: "0 18px 40px rgba(0,0,0,0.45)",
            }}
          />
        </div>
      </Reveal>

      <div className="mt-14 flex min-h-[110px] flex-col items-center justify-start gap-5">
        <AnimatePresence mode="wait">
          {lit ? (
            <motion.div
              key="blow"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <PillButton onClick={blow}>Blow the candles 🌬️</PillButton>
            </motion.div>
          ) : (
            <motion.div
              key="done"
              className="flex flex-col items-center gap-5"
              initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: soft }}
            >
              <p className="font-[family-name:var(--font-display)] text-2xl italic sm:text-3xl">
                Your wish is on its way to the stars ✨
              </p>
              <PillButton variant="ghost" onClick={() => setLit(true)}>
                Light them again
              </PillButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ——— Music ——— */

function MusicPlayer({
  src,
  title,
  start,
}: {
  src: string;
  title?: string;
  start: boolean;
}) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const userToggled = useRef(false);
  const [playing, setPlaying] = useState(false);

  // Browsers only allow sound after a user gesture: prime the element on the
  // first tap during the intro, or start playback on the first tap after it.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.6;
    audio.loop = true;

    const events = ["pointerdown", "keydown", "touchend"] as const;
    const off = (handler: (e: Event) => void) =>
      events.forEach((e) => window.removeEventListener(e, handler));
    const on = (handler: (e: Event) => void) =>
      events.forEach((e) => window.addEventListener(e, handler));

    if (!start) {
      const prime = () => {
        off(prime);
        audio.muted = true;
        audio
          .play()
          .then(() => {
            audio.pause();
            audio.currentTime = 0;
          })
          .catch(() => undefined)
          .finally(() => {
            audio.muted = false;
          });
      };
      on(prime);
      return () => off(prime);
    }

    const resume = (e: Event) => {
      if (e.target instanceof Element && e.target.closest("[data-music-toggle]")) return;
      off(resume);
      if (userToggled.current) return;
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    };

    audio.muted = false;
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => {
        setPlaying(false);
        on(resume);
      });
    return () => off(resume);
  }, [start, src]);

  async function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    userToggled.current = true;
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
    <>
      <audio ref={audioRef} src={src} preload="auto" playsInline />
      {start ? (
        <motion.button
          type="button"
          onClick={toggle}
          data-music-toggle
          aria-label={playing ? "Pause music" : "Play music"}
          className="fixed right-5 bottom-5 z-50 flex items-center gap-2.5 rounded-full border px-4 py-3 shadow-lg backdrop-blur-xl sm:right-8 sm:bottom-8"
          style={{
            background: "color-mix(in srgb, var(--hw-surface) 75%, transparent)",
            borderColor: "var(--hw-border)",
            color: "var(--hw-primary)",
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: soft }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="flex h-3.5 items-end gap-[3px]">
            {[0, 1, 2, 3].map((i) => (
              <motion.span
                key={i}
                className="w-[3px] rounded-full bg-current"
                animate={
                  playing ? { height: ["5px", "14px", "8px", "12px", "5px"] } : { height: "5px" }
                }
                transition={{
                  duration: 0.9,
                  repeat: playing ? Infinity : 0,
                  delay: i * 0.12,
                  ease: "easeInOut",
                }}
              />
            ))}
          </span>
          <span className="text-[10px] font-semibold tracking-[0.22em] uppercase">
            {playing ? (title ?? "Playing") : "Tap for music"}
          </span>
        </motion.button>
      ) : null}
    </>
  );
}

/* ——— Experience ——— */

export function Experience({ data }: { data: TemplateData }) {
  const reduce = useReducedMotion();
  const [opened, setOpened] = useState(false);
  const [burst, setBurst] = useState(0);

  const to =
    data.people.find((p) => p.role === "To")?.name ?? data.people[0]?.name ?? "";
  const from = data.people.find((p) => p.role === "From")?.name ?? "";
  const firstName = to.split(" ")[0] ?? to;
  const age = data.extras.milestoneAge;
  const letter = data.extras.letter;
  const wishes = data.extras.timeline ?? [];
  const photos = data.media.photos;
  const stickers = data.extras.stickers ?? ["✨", "🎂", "💖", "🎈"];

  const eventDate = data.event?.date;
  const dateParts = eventDate?.slice(0, 10).split("-").map(Number);
  const [year, month, day] = dateParts ?? [];
  const sign = month && day ? zodiac(month, day) : null;
  const birthYear = year && age ? year - age : undefined;
  const birthMs = useMemo(() => {
    if (!eventDate || !age) return null;
    const d = new Date(eventDate);
    d.setFullYear(d.getFullYear() - age);
    return d.getTime();
  }, [eventDate, age]);

  const confettiColors = useMemo(
    () => [
      data.palette.primary,
      data.palette.secondary,
      data.palette.accent,
      "#FFFFFF",
    ],
    [data.palette],
  );

  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(30);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 22 });
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${springX}% ${springY}%, color-mix(in srgb, var(--hw-primary) 12%, transparent), transparent 60%)`;

  const { scrollYProgress } = useScroll();
  const ageY = useTransform(scrollYProgress, [0, 0.3], reduce ? [0, 0] : [0, 160]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.2]);

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  function open() {
    window.scrollTo({ top: 0 });
    setOpened(true);
    setBurst((n) => n + 1);
  }

  const celebrate = () => setBurst((n) => n + 1);

  return (
    <main
      className="relative min-h-svh overflow-x-hidden font-[family-name:var(--font-body)] text-[var(--hw-text)]"
      style={themeStyle(data.palette)}
      onMouseMove={(e) => {
        if (reduce) return;
        mouseX.set((e.clientX / window.innerWidth) * 100);
        mouseY.set((e.clientY / window.innerHeight) * 100);
      }}
    >
      <Backdrop />
      <motion.div className="pointer-events-none fixed inset-0 -z-[5]" style={{ background: spotlight }} />

      <AnimatePresence>
        {!opened ? (
          data.media.video ? (
            <IntroVideo key="intro" src={data.media.video.src} onDone={open} />
          ) : (
            <Gate key="gate" name={firstName} age={age} date={data.event?.date} onOpen={open} />
          )
        ) : null}
      </AnimatePresence>

      {burst > 0 ? <ConfettiBurst key={burst} colors={confettiColors} count={160} /> : null}

      {opened ? (
        <>
          <RisingStickers stickers={stickers} />

          {/* ——— Hero ——— */}
          <motion.section
            className="relative flex min-h-svh flex-col items-center justify-center px-6 pt-20 pb-24 text-center"
            style={{ opacity: heroOpacity }}
          >
            {age ? (
              <motion.p
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 font-[family-name:var(--font-display)] text-[48vw] leading-none italic select-none sm:text-[38vw]"
                style={{
                  y: ageY,
                  color: "transparent",
                  WebkitTextStroke: "1px color-mix(in srgb, var(--hw-primary) 22%, transparent)",
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.8, ease: soft }}
              >
                {age}
              </motion.p>
            ) : null}

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.9, ease: soft }}
            >
              <Eyebrow>
                {day && month ? `${day} ${MONTHS[month - 1]} · ` : ""}
                {data.copy.cta ?? "Today is yours"}
              </Eyebrow>
            </motion.div>

            <motion.p
              className="relative mt-8 font-[family-name:var(--font-display)] text-3xl italic sm:text-5xl"
              style={{ color: "var(--hw-muted)" }}
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.5, duration: 1.1, ease: soft }}
            >
              Happy Birthday
            </motion.p>

            <motion.h1
              className="relative mt-2 font-[family-name:var(--font-display)] text-[26vw] leading-[0.9] sm:text-[17vw] lg:text-[13rem]"
              style={gradientText}
              initial={{ opacity: 0, y: 60, filter: "blur(20px)", clipPath: "inset(0 0 100% 0)" }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                clipPath: "inset(-20% -10% -20% -10%)",
                backgroundPosition: reduce ? "0% center" : ["0% center", "200% center"],
              }}
              transition={{
                default: { delay: 0.7, duration: 1.4, ease: soft },
                backgroundPosition: { duration: 9, repeat: Infinity, ease: "linear" },
              }}
            >
              {firstName}
            </motion.h1>

            {data.copy.subhead ? (
              <motion.p
                className="relative mt-6 max-w-xl text-base leading-relaxed sm:text-lg"
                style={{ color: "var(--hw-muted)" }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 1, ease: soft }}
              >
                {data.copy.subhead}
              </motion.p>
            ) : null}

            <motion.div
              className="relative mt-10 flex flex-wrap items-center justify-center gap-2.5"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 1.4 } } }}
            >
              {[
                birthYear && month && day
                  ? `Born ${String(day).padStart(2, "0")}.${String(month).padStart(2, "0")}.${birthYear}`
                  : null,
                age ? `Turning ${age}` : null,
                sign ? `${sign.name} ${sign.symbol}` : null,
              ]
                .filter(Boolean)
                .map((chip) => (
                  <motion.span
                    key={chip}
                    className="rounded-full border px-4 py-2 text-xs font-medium backdrop-blur-md"
                    style={{
                      borderColor: "var(--hw-border)",
                      background: "color-mix(in srgb, var(--hw-surface) 50%, transparent)",
                    }}
                    variants={{
                      hidden: { opacity: 0, y: 10, scale: 0.95 },
                      show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: soft } },
                    }}
                  >
                    {chip}
                  </motion.span>
                ))}
            </motion.div>

            {data.media.video ? (
              <motion.p
                className="relative mt-6 text-xs tracking-[0.12em]"
                style={{ color: "var(--hw-muted)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.9, duration: 1 }}
              >
                <BirthdayStatus date={data.event?.date} />
              </motion.p>
            ) : null}

            <ScrollHint color="var(--hw-muted)" />
          </motion.section>

          {birthMs !== null && age ? <LifeCounter birthMs={birthMs} age={age} /> : null}

          {/* ——— Letter ——— */}
          <section className="relative mx-auto max-w-3xl px-6 py-20 sm:py-28">
            <Reveal>
              <GlowCard>
                <div className="px-7 py-12 sm:px-14 sm:py-16">
                  <p
                    className="font-[family-name:var(--font-display)] text-4xl italic sm:text-5xl"
                    style={gradientText}
                  >
                    {letter?.greeting ?? `Dear ${firstName},`}
                  </p>
                  <p
                    className="mt-8 text-lg leading-[1.9] font-light sm:text-xl"
                    style={{ color: "color-mix(in srgb, var(--hw-text) 90%, transparent)" }}
                  >
                    <WordReveal text={data.copy.message} />
                  </p>
                  <div className="mt-12 flex items-end justify-between gap-6">
                    <div>
                      <p className="text-sm italic" style={{ color: "var(--hw-muted)" }}>
                        {letter?.closing ?? "With love,"}
                      </p>
                      <p className="mt-2 font-[family-name:var(--font-display)] text-4xl italic">
                        {letter?.signature ?? from}
                      </p>
                    </div>
                    <motion.span
                      className="text-4xl"
                      animate={reduce ? undefined : { scale: [1, 1.15, 1] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    >
                      💖
                    </motion.span>
                  </div>
                </div>
              </GlowCard>
            </Reveal>
          </section>

          {/* ——— Gallery ——— */}
          {photos.length > 0 ? (
            <section className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
              <Reveal className="text-center">
                <Eyebrow>Moments</Eyebrow>
                <h2 className="mt-6 font-[family-name:var(--font-display)] text-4xl sm:text-6xl">
                  The many shades of <span className="italic" style={gradientText}>you</span>
                </h2>
              </Reveal>
              <div className="mt-14 grid auto-rows-[160px] grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-[220px] sm:gap-4 md:grid-cols-4">
                {photos.map((photo, i) => (
                  <Reveal
                    key={`${photo.src}-${i}`}
                    delay={(i % 4) * 0.07}
                    className={i === 0 ? "col-span-2 row-span-2" : ""}
                  >
                    <motion.figure
                      className="group relative h-full w-full overflow-hidden rounded-[1.5rem] border"
                      style={{ borderColor: "var(--hw-border)" }}
                      whileHover={reduce ? undefined : { y: -4 }}
                      transition={{ duration: 0.4, ease: soft }}
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes={i === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                        className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.07]"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to top, color-mix(in srgb, var(--hw-bg) 75%, transparent), transparent 50%)",
                        }}
                      />
                      {photo.caption ? (
                        <figcaption className="absolute bottom-4 left-4 right-4 text-left text-sm font-medium">
                          {photo.caption}
                        </figcaption>
                      ) : null}
                    </motion.figure>
                  </Reveal>
                ))}
              </div>
            </section>
          ) : null}

          {/* ——— Wishes ——— */}
          {wishes.length > 0 ? (
            <section className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
              <Reveal className="text-center">
                <Eyebrow>For your {age ? ordinal(age) : "new"} year</Eyebrow>
                <h2 className="mt-6 font-[family-name:var(--font-display)] text-4xl sm:text-6xl">
                  Everything I wish <span className="italic" style={gradientText}>for you</span>
                </h2>
              </Reveal>
              <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {wishes.map((wish, i) => (
                  <Reveal key={wish.title} delay={(i % 3) * 0.08}>
                    <GlowCard className="h-full">
                      <div className="flex h-full flex-col px-7 py-8">
                        <span
                          className="font-[family-name:var(--font-display)] text-5xl italic"
                          style={gradientText}
                        >
                          {wish.label}
                        </span>
                        <h3 className="mt-5 text-lg font-semibold">{wish.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--hw-muted)" }}>
                          {wish.body}
                        </p>
                      </div>
                    </GlowCard>
                  </Reveal>
                ))}
              </div>
            </section>
          ) : null}

          <CakeSection name={firstName} age={age} onWish={celebrate} />

          {/* ——— Closing ——— */}
          <footer className="relative px-6 pt-16 pb-36 text-center">
            <Reveal>
              <p className="text-sm tracking-[0.3em] uppercase" style={{ color: "var(--hw-muted)" }}>
                Here&apos;s to you
              </p>
              <h2
                className="mt-6 font-[family-name:var(--font-display)] text-6xl leading-[0.95] italic sm:text-8xl"
                style={gradientText}
              >
                Happy {age ? ordinal(age) : "Birthday"},
                <br />
                {firstName}
              </h2>
              <p className="mx-auto mt-8 max-w-md text-sm leading-relaxed" style={{ color: "var(--hw-muted)" }}>
                {from ? `With all my love · ${from}` : "May this year be your most beautiful one yet."}
              </p>
              <div className="mt-10">
                <PillButton variant="ghost" onClick={celebrate}>
                  Celebrate again 🎉
                </PillButton>
              </div>
            </Reveal>
          </footer>

          <PlaceSection place={data.event?.place} />
        </>
      ) : null}

      {data.extras.backgroundMusic && data.media.music ? (
        <MusicPlayer src={data.media.music.src} title={data.media.music.title} start={opened} />
      ) : null}
    </main>
  );
}
