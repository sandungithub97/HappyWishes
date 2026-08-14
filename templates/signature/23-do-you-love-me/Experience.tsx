"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ConfettiBurst } from "@/templates/_shared/components/ConfettiBurst";
import { ParticleField } from "@/templates/_shared/components/ParticleField";
import { TextureOverlay } from "@/templates/_shared/components/TextureOverlay";
import { themeStyle } from "@/templates/_shared/theme";
import type { TemplateData } from "@/templates/_shared/types";

const soft = [0.22, 1, 0.36, 1] as const;

const NO_HINTS = [
  "Nice try… that's not the one 💕",
  "Are you sure? Read the question again.",
  "Your No still means Yes — I love you too 💕",
];

const NO_CLICKS = 3;
const ZONE_PAD = 10;

type Point = { left: number; top: number };

function measureSlots(
  zone: HTMLElement,
  btn: HTMLElement,
): Point[] {
  const zw = zone.clientWidth;
  const zh = zone.clientHeight;
  const bw = btn.offsetWidth;
  const bh = btn.offsetHeight;
  const maxLeft = Math.max(ZONE_PAD, zw - bw - ZONE_PAD);
  const maxTop = Math.max(ZONE_PAD, zh - bh - ZONE_PAD);

  return [
    { left: Math.min(maxLeft, Math.max(ZONE_PAD, (zw - bw) / 2)), top: ZONE_PAD },
    { left: ZONE_PAD, top: Math.min(maxTop, Math.max(ZONE_PAD, (zh - bh) / 2)) },
    { left: maxLeft, top: maxTop },
  ];
}

function DodgingNoButton({ onGiveUp }: { onGiveUp: () => void }) {
  const reduce = useReducedMotion();
  const zoneRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const slotsRef = useRef<Point[]>([]);
  const [pos, setPos] = useState<Point>({ left: 0, top: 0 });
  const [clicks, setClicks] = useState(0);
  const [hint, setHint] = useState<string | null>(null);
  const [laidOut, setLaidOut] = useState(false);

  const applyLayout = useCallback((clickCount: number) => {
    const zone = zoneRef.current;
    const btn = btnRef.current;
    if (!zone || !btn) return;

    const slots = measureSlots(zone, btn);
    slotsRef.current = slots;
    const slotIndex = Math.min(clickCount, NO_CLICKS - 1);
    setPos(slots[slotIndex] ?? slots[0]!);
    setLaidOut(true);
  }, []);

  useEffect(() => {
    applyLayout(clicks);

    function onResize() {
      applyLayout(clicks);
    }

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [applyLayout, clicks]);

  function handleNoClick() {
    const next = clicks + 1;
    setHint(NO_HINTS[Math.min(next - 1, NO_HINTS.length - 1)] ?? NO_HINTS[0]!);

    if (next >= NO_CLICKS) {
      setClicks(next);
      const slots = slotsRef.current;
      if (slots[2]) setPos(slots[2]);
      window.setTimeout(onGiveUp, reduce ? 200 : 900);
      return;
    }

    setClicks(next);
    const slots = slotsRef.current;
    if (slots[next]) setPos(slots[next]);
  }

  return (
    <div className="mt-8 w-full max-w-sm">
      <div
        ref={zoneRef}
        className="relative mx-auto h-36 w-full sm:h-40"
      >
        <motion.button
          ref={btnRef}
          type="button"
          onClick={handleNoClick}
          className="absolute z-10 rounded-full border px-8 py-3.5 text-sm tracking-[0.14em] uppercase whitespace-nowrap touch-manipulation"
          style={{
            borderColor: "var(--hw-border)",
            background: "rgba(255,255,255,0.92)",
            color: "var(--hw-muted)",
            visibility: laidOut ? "visible" : "hidden",
          }}
          animate={{ left: pos.left, top: pos.top }}
          transition={
            reduce
              ? { duration: 0 }
              : { type: "spring", stiffness: 340, damping: 26 }
          }
          whileTap={{ scale: 0.96 }}
        >
          No
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        {hint ? (
          <motion.p
            key={hint}
            className="mx-auto mt-4 max-w-xs px-2 text-center text-sm italic"
            style={{ color: "var(--hw-primary)" }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: soft }}
          >
            {hint}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function FallingHearts() {
  const reduce = useReducedMotion();
  const items = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        left: `${(i * 41) % 100}%`,
        delay: (i % 8) * 0.5,
        duration: 6 + (i % 5),
        emoji: ["♥", "💕", "💖", "💗"][i % 4],
        size: 14 + (i % 4) * 4,
      })),
    [],
  );
  if (reduce) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[4] overflow-hidden opacity-50" aria-hidden>
      {items.map((item) => (
        <motion.span
          key={item.id}
          className="absolute"
          style={{ left: item.left, top: "-5%", fontSize: item.size }}
          animate={{ y: ["0vh", "105vh"], opacity: [0, 0.9, 0.9, 0] }}
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
    audio.volume = 0.6;
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

  return (
    <>
      <audio ref={audioRef} src={src} preload="auto" playsInline />
      <button
        type="button"
        onClick={async () => {
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
        }}
        className="fixed right-5 bottom-5 z-50 flex items-center gap-2 rounded-full border px-4 py-2.5 text-[10px] tracking-[0.18em] uppercase shadow-lg backdrop-blur-xl"
        style={{
          background: "rgba(255,255,255,0.9)",
          borderColor: "var(--hw-border)",
          color: "var(--hw-primary)",
        }}
      >
        {blocked && !playing ? "Tap for music" : playing ? "♪ On" : title ?? "Music"}
      </button>
    </>
  );
}

function RomanticReveal({
  data,
  firstName,
  from,
  viaNo,
}: {
  data: TemplateData;
  firstName: string;
  from: string;
  viaNo: boolean;
}) {
  const reduce = useReducedMotion();
  const letter = data.extras.letter;
  const reveal = data.extras.reveal;
  const photo = data.media.photos[0];
  const headline =
    reveal?.unlockedHeadline ?? data.copy.headline ?? "I love you too";

  return (
    <motion.div
      className="relative flex min-h-svh flex-col items-center justify-center px-6 py-20 text-center"
      initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, filter: "blur(8px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 1.1, ease: soft }}
    >
      {!reduce ? (
        <div className="pointer-events-none fixed inset-0 z-[8]">
          <ConfettiBurst
            colors={["#E38AA8", "#F6C1D0", "#FFFFFF", "#C96B8A"]}
            count={100}
            variant="sparkle"
          />
        </div>
      ) : null}

      <motion.div
        className="relative z-10 mb-8 flex h-16 w-16 items-center justify-center rounded-full"
        style={{
          background: "linear-gradient(145deg, #F9D5E0, #E38AA8)",
          boxShadow: "0 16px 40px rgba(227,138,168,0.4)",
        }}
        animate={reduce ? undefined : { scale: [1, 1.12, 1] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-2xl text-white">♥</span>
      </motion.div>

      {viaNo ? (
        <motion.p
          className="relative z-10 mb-4 max-w-sm text-base italic"
          style={{ color: "var(--hw-primary)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {reveal?.lockedLabel ??
            `Your "No" still sounds like Yes to me, ${firstName}.`}
        </motion.p>
      ) : null}

      <motion.h1
        className="relative z-10 font-[family-name:var(--font-display)] text-5xl sm:text-7xl"
        style={{ color: "var(--hw-primary)" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: viaNo ? 0.45 : 0.2, duration: 0.9, ease: soft }}
      >
        {headline}
      </motion.h1>

      <motion.p
        className="relative z-10 mt-4 text-sm tracking-[0.22em] uppercase"
        style={{ color: "var(--hw-muted)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
      >
        {from ? `— ${from}` : ""}
      </motion.p>

      {photo ? (
        <motion.div
          className="relative z-10 mt-10 aspect-[4/5] w-full max-w-xs overflow-hidden rounded-[2rem] border shadow-xl"
          style={{ borderColor: "var(--hw-border)" }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.9, ease: soft }}
        >
          <Image src={photo.src} alt={photo.alt} fill sizes="320px" className="object-cover" />
        </motion.div>
      ) : null}

      <motion.article
        className="relative z-10 mt-10 max-w-lg rounded-[1.75rem] border px-8 py-10 text-left shadow-sm"
        style={{
          background: "rgba(255,255,255,0.88)",
          borderColor: "var(--hw-border)",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.85, ease: soft }}
      >
        <p
          className="font-[family-name:var(--font-display)] text-3xl"
          style={{ color: "var(--hw-primary)" }}
        >
          {letter?.greeting ?? `My ${firstName},`}
        </p>
        <p className="mt-6 text-xl leading-8" style={{ color: "var(--hw-text)" }}>
          {data.copy.message}
        </p>
        <p className="mt-8 italic" style={{ color: "var(--hw-muted)" }}>
          {letter?.closing ?? "Always,"}
        </p>
        <p
          className="mt-2 font-[family-name:var(--font-display)] text-4xl"
          style={{ color: "var(--hw-secondary)" }}
        >
          {letter?.signature ?? from}
        </p>
      </motion.article>
    </motion.div>
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
  const firstName = to.split(" ")[0] ?? to;

  type Phase = "question" | "yes" | "no";
  const [phase, setPhase] = useState<Phase>("question");

  return (
    <main
      className="relative min-h-svh overflow-hidden bg-[var(--hw-bg)] font-[family-name:var(--font-body)] text-[var(--hw-text)]"
      style={themeStyle(data.palette)}
    >
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 35%, rgba(246,193,208,0.4) 0%, transparent 55%), linear-gradient(180deg, #FFFBFC, #FFF5F8)",
        }}
      />
      <ParticleField
        variant="bokeh"
        count={12}
        colors={["rgba(227,138,168,0.35)", "rgba(255,255,255,0.45)"]}
        className="fixed inset-0 -z-[5] opacity-60"
      />
      <TextureOverlay variant="grain" opacity={0.05} className="fixed inset-0" />
      <FallingHearts />

      <AnimatePresence mode="wait">
        {phase === "question" ? (
          <motion.section
            key="question"
            className="relative flex min-h-svh flex-col items-center justify-center px-6 pb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98, filter: "blur(6px)" }}
            transition={{ duration: 0.7, ease: soft }}
          >
            <motion.p
              className="text-[11px] tracking-[0.4em] uppercase"
              style={{ color: "var(--hw-muted)" }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              {data.copy.subhead ?? "One little question"}
            </motion.p>

            <motion.h1
              className="mt-6 max-w-lg text-center font-[family-name:var(--font-display)] text-5xl leading-tight sm:text-6xl"
              style={{ color: "var(--hw-primary)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.9, ease: soft }}
            >
              {data.copy.headline ?? `Do you love me, ${firstName}?`}
            </motion.h1>

            <motion.p
              className="mt-4 text-center text-sm"
              style={{ color: "var(--hw-muted)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {from ? `${from} is waiting for the right answer…` : "Choose wisely."}
            </motion.p>

            <motion.div
              className="mt-14 flex w-full max-w-md flex-col items-center"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.8 }}
            >
              <motion.button
                type="button"
                onClick={() => setPhase("yes")}
                className="rounded-full px-10 py-4 text-sm font-medium tracking-[0.16em] uppercase text-white shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #E38AA8, #C96B8A)",
                  boxShadow: "0 12px 32px rgba(227,138,168,0.45)",
                }}
                whileHover={reduce ? undefined : { scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                animate={
                  reduce
                    ? undefined
                    : { scale: [1, 1.03, 1] }
                }
                transition={{
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                {data.copy.cta ?? "Yes"}
              </motion.button>

              <DodgingNoButton onGiveUp={() => setPhase("no")} />
            </motion.div>
          </motion.section>
        ) : null}

        {phase === "yes" ? (
          <RomanticReveal
            key="yes"
            data={data}
            firstName={firstName}
            from={from}
            viaNo={false}
          />
        ) : null}

        {phase === "no" ? (
          <RomanticReveal
            key="no"
            data={data}
            firstName={firstName}
            from={from}
            viaNo={true}
          />
        ) : null}
      </AnimatePresence>

      {data.extras.backgroundMusic && data.media.music ? (
        <AutoMusic src={data.media.music.src} title={data.media.music.title} />
      ) : null}
    </main>
  );
}
