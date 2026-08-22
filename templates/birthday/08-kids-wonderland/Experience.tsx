"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ConfettiBurst } from "@/templates/_shared/components/ConfettiBurst";
import { ParallaxLayer } from "@/templates/_shared/components/ParallaxLayer";
import { ParticleField } from "@/templates/_shared/components/ParticleField";
import { Reveal } from "@/templates/_shared/components/Reveal";
import { ScrollHint } from "@/templates/_shared/components/ScrollHint";
import { RsvpCard } from "@/templates/_shared/components/RsvpCard";
import { PlaceLink } from "@/templates/_shared/components/VenueMap";
import { displayNames } from "@/templates/_shared/people";
import { themeStyle } from "@/templates/_shared/theme";
import type { TemplateData } from "@/templates/_shared/types";

const spring = { type: "spring" as const, stiffness: 280, damping: 18 };
const soft = [0.22, 1, 0.36, 1] as const;
/** Deep blue for shadows & accents — kept separate from light text secondary. */
const DEEP_BLUE = "#1565C0";
const DISPLAY_GLOW = "0 2px 16px rgba(0,0,0,0.45)";

const WEB_EMOJIS = ["🕷️", "🕸️", "🦸", "⭐", "🎂", "🎉", "💥", "🎁", "🕷️", "🕸️"];

const stickerSlots: Array<{
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  delay: number;
}> = [
  { top: "7%", left: "5%", delay: 0 },
  { top: "12%", right: "6%", delay: 0.12 },
  { top: "36%", left: "2%", delay: 0.28 },
  { top: "40%", right: "3%", delay: 0.2 },
  { bottom: "20%", left: "8%", delay: 0.35 },
  { bottom: "16%", right: "7%", delay: 0.24 },
];

const photoTilt = ["-rotate-3", "rotate-2", "-rotate-2", "rotate-1"];

/** Original friendly web-hero mascot — not any licensed character. */
function WebHero({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      aria-hidden
      width="120"
      height="120"
    >
      <ellipse cx="60" cy="72" rx="28" ry="34" fill="#1565C0" />
      <ellipse cx="60" cy="74" rx="22" ry="28" fill="#1976D2" />
      <path
        d="M48 68h24M52 76h16M54 84h12"
        stroke="#0D47A1"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="60" cy="38" r="26" fill="#E62429" />
      <path d="M34 38c0-14 12-24 26-24s26 10 26 24" fill="#C62828" />
      <ellipse cx="48" cy="36" rx="9" ry="11" fill="#FFFFFF" />
      <ellipse cx="72" cy="36" rx="9" ry="11" fill="#FFFFFF" />
      <ellipse cx="49" cy="37" rx="4" ry="6" fill="#1E293B" />
      <ellipse cx="73" cy="37" rx="4" ry="6" fill="#1E293B" />
      <path
        d="M54 48c3 3 9 3 12 0"
        stroke="#1E293B"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M60 58 L52 72 M60 58 L68 72"
        stroke="#1565C0"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M38 52 L28 44 M82 52 L92 44"
        stroke="#1565C0"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CornerWeb({
  corner,
  className,
}: {
  corner: "tl" | "tr" | "bl" | "br";
  className?: string;
}) {
  const reduce = useReducedMotion();
  const position = {
    tl: "top-0 left-0",
    tr: "top-0 right-0 rotate-90",
    bl: "bottom-0 left-0 -rotate-90",
    br: "bottom-0 right-0 rotate-180",
  }[corner];

  const spokes = [0, 22, 45, 68, 90];
  const rings = [18, 36, 54, 72];

  return (
    <motion.svg
      className={`pointer-events-none absolute ${position} h-28 w-28 sm:h-40 sm:w-40 ${className ?? ""}`}
      viewBox="0 0 100 100"
      aria-hidden
      animate={reduce ? undefined : { opacity: [0.35, 0.65, 0.35] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <g stroke="rgba(255,255,255,0.5)" strokeWidth="0.9" fill="none">
        {spokes.map((deg) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <line
              key={deg}
              x1="0"
              y1="0"
              x2={Math.cos(rad) * 95}
              y2={Math.sin(rad) * 95}
            />
          );
        })}
        {rings.map((r) => (
          <path
            key={r}
            d={`M ${r} 0 A ${r} ${r} 0 0 1 0 ${r}`}
          />
        ))}
      </g>
    </motion.svg>
  );
}

function CornerWebs({ className }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}>
      <CornerWeb corner="tl" />
      <CornerWeb corner="tr" />
      <CornerWeb corner="bl" />
      <CornerWeb corner="br" />
    </div>
  );
}

/** Animated web strands in corners */
function SwingingWebStrands() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  const strands = [
    { x: "4%", y: "0", rotate: 35, delay: 0 },
    { x: "92%", y: "0", rotate: -35, delay: 0.5 },
    { x: "2%", y: "78%", rotate: -25, delay: 0.3 },
    { x: "88%", y: "80%", rotate: 25, delay: 0.7 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {strands.map((strand) => (
        <motion.div
          key={`${strand.x}-${strand.y}`}
          className="absolute h-32 w-px origin-top sm:h-44"
          style={{
            left: strand.x,
            top: strand.y,
            rotate: strand.rotate,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.55), rgba(255,255,255,0.05))",
          }}
          animate={{ rotate: [strand.rotate - 4, strand.rotate + 4, strand.rotate - 4] }}
          transition={{
            duration: 4 + strand.delay,
            repeat: Infinity,
            ease: "easeInOut",
            delay: strand.delay,
          }}
        />
      ))}
    </div>
  );
}

function FallingWebRain() {
  const reduce = useReducedMotion();
  const items = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        emoji: WEB_EMOJIS[i % WEB_EMOJIS.length]!,
        left: `${(i * 41) % 100}%`,
        delay: (i % 12) * 0.5,
        duration: 8 + (i % 7) * 1.1,
        size: 18 + (i % 5) * 4,
        drift: (i % 2 === 0 ? 1 : -1) * (10 + (i % 5) * 3),
      })),
    [],
  );

  if (reduce) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[5] overflow-hidden"
      style={{ opacity: 0.5 }}
      aria-hidden
    >
      {items.map((item) => (
        <motion.span
          key={item.id}
          className="absolute select-none"
          style={{
            left: item.left,
            top: "-8%",
            fontSize: item.size,
            lineHeight: 1,
          }}
          animate={{
            y: ["0vh", "112vh"],
            x: [0, item.drift, -item.drift * 0.45, 0],
            rotate: [0, item.drift > 0 ? 22 : -22, 0],
            opacity: [0, 0.9, 0.9, 0],
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

function WebGate({
  name,
  age,
  onOpen,
}: {
  name: string;
  age?: number;
  onOpen: () => void;
}) {
  const reduce = useReducedMotion();
  const [opening, setOpening] = useState(false);

  function open() {
    if (opening) return;
    setOpening(true);
    window.setTimeout(onOpen, reduce ? 280 : 1400);
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden px-4"
      style={{
        background: `
          radial-gradient(ellipse at 50% 0%, rgba(230,36,41,0.25) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 100%, rgba(21,101,192,0.35) 0%, transparent 45%),
          linear-gradient(180deg, #0B1628 0%, #152238 55%, #0B1628 100%)
        `,
      }}
      exit={{ opacity: 0, transition: { duration: 0.55 } }}
    >
      <CornerWebs />
      <SwingingWebStrands />
      <ParticleField
        variant="sparkle"
        count={20}
        colors={["#ffffff", "#E62429", "#1565C0", "#94A3B8"]}
      />

      <motion.div
        className="relative z-10 flex max-w-sm flex-col items-center text-center"
        animate={
          opening && !reduce
            ? { opacity: 0, y: -28, scale: 0.94 }
            : { opacity: 1, y: 0, scale: 1 }
        }
        transition={{ duration: 0.75, ease: soft }}
      >
        <p
          className="mb-3 text-[11px] font-extrabold tracking-[0.38em] uppercase"
          style={{ color: "var(--hw-muted)" }}
        >
          Hero alert
        </p>

        <div className="relative">
          <svg width="240" height="200" viewBox="0 0 240 200" aria-hidden>
            <circle cx="120" cy="100" r="88" fill="none" stroke="#1565C0" strokeWidth="3" opacity="0.5" />
            <circle cx="120" cy="100" r="70" fill="none" stroke="#E62429" strokeWidth="2" opacity="0.45" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              return (
                <line
                  key={deg}
                  x1="120"
                  y1="100"
                  x2={120 + Math.cos(rad) * 88}
                  y2={100 + Math.sin(rad) * 88}
                  stroke="rgba(255,255,255,0.35)"
                  strokeWidth="1"
                />
              );
            })}
            {[30, 55, 80].map((r) => (
              <circle
                key={r}
                cx="120"
                cy="100"
                r={r}
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="0.8"
              />
            ))}
            <motion.g
              animate={
                opening && !reduce ? { x: -52, opacity: 0.5 } : { x: 0, opacity: 1 }
              }
              transition={{ duration: 0.85, ease: soft }}
            >
              <path
                d="M120 55 L75 145 L120 125 L165 145 Z"
                fill="#E62429"
                opacity="0.85"
              />
            </motion.g>
            <motion.g
              animate={
                opening && !reduce ? { x: 52, opacity: 0.5 } : { x: 0, opacity: 1 }
              }
              transition={{ duration: 0.85, ease: soft }}
            >
              <path
                d="M120 55 L75 145 L120 125 L165 145 Z"
                fill="#1565C0"
                opacity="0.75"
                transform="scale(-1,1) translate(-240,0)"
              />
            </motion.g>
          </svg>

          <motion.div
            className="absolute -top-4 left-1/2 -translate-x-1/2"
            animate={
              reduce
                ? undefined
                : opening
                  ? { y: -36, scale: 1.12, rotate: [0, -10, 10, 0] }
                  : { y: [0, -10, 0] }
            }
            transition={
              opening
                ? { duration: 0.9, ease: soft }
                : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <WebHero className="h-24 w-24" />
          </motion.div>
        </div>

        <motion.h1
          className="mt-2 font-[family-name:var(--font-display)] text-4xl tracking-wide sm:text-5xl"
          style={{
            color: "var(--hw-primary)",
            textShadow: `0 3px 0 ${DEEP_BLUE}, ${DISPLAY_GLOW}`,
          }}
        >
          {name}&apos;s Web Party
        </motion.h1>
        {age ? (
          <p
            className="mt-1 font-[family-name:var(--font-display)] text-2xl tracking-wide"
            style={{ color: "var(--hw-text)", textShadow: DISPLAY_GLOW }}
          >
            Level {age}!
          </p>
        ) : null}

        <motion.button
          type="button"
          onClick={open}
          disabled={opening}
          className="mt-8 rounded-full px-9 py-4 text-sm font-extrabold tracking-wide uppercase disabled:opacity-70"
          style={{
            background: "linear-gradient(180deg, var(--hw-primary), #B71C1C)",
            color: "#FFFFFF",
            boxShadow: `0 8px 0 ${DEEP_BLUE}`,
          }}
          whileHover={reduce ? undefined : { scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97, y: 2, boxShadow: `0 4px 0 ${DEEP_BLUE}` }}
        >
          {opening ? "Swinging in…" : "Swing inside"}
        </motion.button>
      </motion.div>

      {opening ? (
        <ConfettiBurst
          colors={["#E62429", "#1565C0", "#FFFFFF", "#94A3B8"]}
        />
      ) : null}
    </motion.div>
  );
}

export function Experience({ data }: { data: TemplateData }) {
  const reduce = useReducedMotion();
  const name = displayNames(data.people)[0] ?? "";
  const age = data.extras.milestoneAge;
  const stickers = data.extras.stickers ?? [];
  const chapters = data.extras.timeline ?? [];
  const [opened, setOpened] = useState(false);

  const confettiColors = [
    data.palette.primary,
    data.palette.secondary,
    data.palette.accent,
    "#94A3B8",
  ];

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.22], [0, reduce ? 0 : -56]);
  const heroFade = useTransform(scrollYProgress, [0, 0.18], [1, reduce ? 1 : 0.35]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, reduce ? 1 : 0.92]);

  useEffect(() => {
    if (!opened) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
    document.body.style.overflow = "";
  }, [opened]);

  return (
    <main
      className="relative min-h-svh overflow-x-hidden bg-[var(--hw-bg)] font-[family-name:var(--font-body)] text-[var(--hw-text)]"
      style={themeStyle(data.palette)}
    >
      <AnimatePresence>
        {!opened ? (
          <WebGate
            key="gate"
            name={name}
            age={age}
            onOpen={() => setOpened(true)}
          />
        ) : null}
      </AnimatePresence>

      {opened ? <ConfettiBurst colors={confettiColors} count={100} /> : null}
      {opened ? <FallingWebRain /> : null}
      {opened ? (
        <ParticleField variant="sparkle" count={24} colors={confettiColors} />
      ) : null}

      <CornerWebs className="fixed inset-0 z-[4]" />
      {opened ? <SwingingWebStrands /> : null}

      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background: `
            radial-gradient(ellipse at 12% 0%, color-mix(in srgb, var(--hw-primary) 30%, transparent), transparent 44%),
            radial-gradient(ellipse at 88% 8%, color-mix(in srgb, var(--hw-accent) 32%, transparent), transparent 40%),
            radial-gradient(ellipse at 50% 100%, color-mix(in srgb, var(--hw-secondary) 14%, transparent), transparent 50%)
          `,
        }}
      />

      <motion.div
        initial={false}
        animate={
          opened
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0, y: 20, filter: "blur(10px)" }
        }
        transition={{ duration: 1, ease: soft, delay: opened ? 0.08 : 0 }}
      >
        {stickers.map((sticker, index) => {
          const slot = stickerSlots[index % stickerSlots.length];
          return (
            <motion.span
              key={`${sticker}-${index}`}
              className="hw-float pointer-events-none absolute z-20 text-4xl sm:text-5xl"
              style={{
                top: slot.top,
                left: slot.left,
                right: slot.right,
                bottom: slot.bottom,
                animationDelay: `${slot.delay}s`,
              }}
              initial={reduce || !opened ? false : { scale: 0, rotate: -24 }}
              animate={opened ? { scale: 1, rotate: 0 } : undefined}
              transition={{ ...spring, delay: 0.4 + slot.delay }}
            >
              {sticker}
            </motion.span>
          );
        })}

        <section className="relative flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center">
          <motion.div
            style={{ y: heroY, opacity: heroFade, scale: heroScale }}
            className="relative z-10"
          >
            <motion.div
              animate={
                reduce || !opened
                  ? undefined
                  : { y: [0, -12, 0], rotate: [-4, 4, -4] }
              }
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <WebHero className="mx-auto" />
            </motion.div>

            <motion.p
              className="mt-4 text-[11px] font-semibold tracking-[0.34em] uppercase"
              style={{ color: "var(--hw-secondary)" }}
              initial={reduce || !opened ? false : { opacity: 0, y: 14 }}
              animate={opened ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.55 }}
            >
              {data.copy.subhead}
            </motion.p>

            {age ? (
              <motion.p
                className="mt-3 font-[family-name:var(--font-display)] text-[7rem] leading-none font-bold sm:text-[9.5rem]"
                style={{
                  color: "var(--hw-primary)",
                  textShadow: `0 8px 0 ${DEEP_BLUE}, 0 0 32px rgba(255,77,85,0.45), ${DISPLAY_GLOW}`,
                }}
                initial={reduce || !opened ? false : { scale: 0.35, rotate: -10 }}
                animate={opened ? { scale: 1, rotate: 0 } : undefined}
                transition={spring}
              >
                {age}
              </motion.p>
            ) : null}

            <motion.h1
              className="mt-1 font-[family-name:var(--font-display)] text-5xl font-bold sm:text-7xl"
              style={{ color: "var(--hw-text)", textShadow: DISPLAY_GLOW }}
              initial={reduce || !opened ? false : { opacity: 0, y: 28 }}
              animate={opened ? { opacity: 1, y: 0 } : undefined}
              transition={{ ...spring, delay: 0.12 }}
            >
              {name}
            </motion.h1>

            <motion.p
              className="mt-4 font-[family-name:var(--font-display)] text-2xl sm:text-3xl"
              style={{ color: "var(--hw-secondary)", textShadow: DISPLAY_GLOW }}
              initial={reduce || !opened ? false : { opacity: 0 }}
              animate={opened ? { opacity: 1 } : undefined}
              transition={{ delay: 0.35, duration: 0.6 }}
            >
              {data.copy.headline}
            </motion.p>

            <motion.p
              className="mx-auto mt-6 max-w-md text-base font-normal leading-7 sm:text-lg"
              style={{ color: "var(--hw-muted)" }}
              initial={reduce || !opened ? false : { opacity: 0, y: 12 }}
              animate={opened ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.48, duration: 0.65 }}
            >
              {data.copy.message}
            </motion.p>

            {data.copy.cta ? (
              <motion.a
                href="#details"
                className="mt-10 inline-flex rounded-full px-8 py-3.5 text-sm font-extrabold tracking-wide uppercase transition-transform hover:-translate-y-0.5 active:translate-y-1 active:shadow-none"
                style={{
                  background: "var(--hw-primary)",
                  color: "#FFFFFF",
                  boxShadow: `0 8px 0 ${DEEP_BLUE}`,
                }}
                initial={reduce || !opened ? false : { opacity: 0, y: 18 }}
                animate={opened ? { opacity: 1, y: 0 } : undefined}
                transition={{ delay: 0.58, ...spring }}
              >
                Party details
              </motion.a>
            ) : null}
          </motion.div>

          {opened ? <ScrollHint /> : null}
        </section>

        {data.media.photos.length > 0 ? (
          <section className="relative mx-auto max-w-5xl px-6 py-10 sm:py-16">
            <Reveal>
              <p
                className="mb-8 text-center text-[11px] font-semibold tracking-[0.32em] uppercase"
                style={{ color: "var(--hw-secondary)" }}
              >
                Hero moments
              </p>
            </Reveal>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
              {data.media.photos.map((photo, index) => (
                <Reveal
                  key={photo.src}
                  delay={index * 0.07}
                  className={index === 0 ? "col-span-2 sm:col-span-1" : ""}
                  blur={false}
                >
                  <ParallaxLayer distance={20 + (index % 3) * 8} range={[0.1, 0.45]}>
                    <motion.div
                      className={`overflow-hidden rounded-[1.75rem] border-4 bg-[var(--hw-surface)] p-2 shadow-xl ${photoTilt[index % photoTilt.length]}`}
                      style={{ borderColor: "var(--hw-surface)" }}
                      whileHover={
                        reduce ? undefined : { rotate: 0, scale: 1.04, y: -4 }
                      }
                      transition={spring}
                    >
                      <div
                        className={`relative overflow-hidden rounded-[1.2rem] ${
                          index === 0 ? "aspect-[4/5]" : "aspect-square"
                        }`}
                      >
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          sizes="(max-width: 640px) 50vw, 30vw"
                          className="object-cover"
                        />
                      </div>
                      {photo.caption ? (
                        <p
                          className="px-2 py-3 text-center font-[family-name:var(--font-display)] text-sm font-semibold"
                          style={{ color: "var(--hw-text)" }}
                        >
                          {photo.caption}
                        </p>
                      ) : null}
                    </motion.div>
                  </ParallaxLayer>
                </Reveal>
              ))}
            </div>
          </section>
        ) : null}

        {chapters.length > 0 ? (
          <section className="relative mx-auto max-w-lg px-6 py-12 sm:py-16">
            <Reveal>
              <p
                className="mb-10 text-center text-[11px] font-semibold tracking-[0.32em] uppercase"
                style={{ color: "var(--hw-secondary)" }}
              >
                Mission schedule
              </p>
            </Reveal>
            <ol className="space-y-5">
              {chapters.map((chapter, index) => (
                <Reveal key={chapter.title} delay={index * 0.06}>
                  <li
                    className="flex gap-4 rounded-[1.5rem] border px-5 py-5"
                    style={{
                      background: "var(--hw-surface)",
                      borderColor: "var(--hw-border)",
                    }}
                  >
                    <span
                      className="font-[family-name:var(--font-display)] text-2xl font-bold tabular-nums"
                      style={{ color: "var(--hw-primary)" }}
                    >
                      {chapter.label}
                    </span>
                    <div className="text-left">
                      <h2
                        className="font-[family-name:var(--font-display)] text-xl font-bold"
                        style={{ color: "var(--hw-text)" }}
                      >
                        {chapter.title}
                      </h2>
                      <p
                        className="mt-1 text-sm font-normal leading-6"
                        style={{ color: "var(--hw-muted)" }}
                      >
                        {chapter.body}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </section>
        ) : null}

        <section
          id="details"
          className="relative mx-auto max-w-md scroll-mt-8 px-6 py-16 pb-28"
        >
          <Reveal>
            {data.event ? (
              <div
                className="mb-8 rounded-[2rem] border px-6 py-8 text-center"
                style={{
                  background: "var(--hw-surface)",
                  borderColor: "var(--hw-border)",
                }}
              >
                <p
                  className="text-[11px] font-semibold tracking-[0.32em] uppercase"
                  style={{ color: "var(--hw-secondary)" }}
                >
                  Hero HQ
                </p>
                <p
                  className="mt-4 font-[family-name:var(--font-display)] text-2xl"
                  style={{ color: "var(--hw-text)" }}
                >
                  {data.event.timeLabel}
                </p>
                {data.event.place ? (
                  <p className="mt-2 text-sm font-normal" style={{ color: "var(--hw-muted)" }}>
                    <PlaceLink
                      place={data.event.place}
                      className="underline underline-offset-4"
                    />
                  </p>
                ) : null}
              </div>
            ) : null}
            {data.extras.rsvp?.enabled ? (
              <RsvpCard
                note={data.extras.rsvp.note}
                cta={data.copy.cta}
                storageKey={`hw-rsvp-${data.meta.slug}-${data.meta.wishId}`}
                occasion={data.meta.occasion}
                slug={data.meta.slug}
                wishId={data.meta.wishId}
              />
            ) : null}
          </Reveal>
        </section>
      </motion.div>
    </main>
  );
}
