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

const PARTY_EMOJIS = ["🎈", "🎂", "⭐", "🦕", "🎉", "✨", "🧁", "🎁", "🌈", "🎪"];

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

const photoTilt = ["-rotate-3", "rotate-2", "-rotate-2", "rotate-1", "-rotate-1"];

const gateBalloons = [
  { x: "8%", y: "18%", color: "#FB7185", delay: 0 },
  { x: "82%", y: "12%", color: "#0369A1", delay: 0.4 },
  { x: "14%", y: "62%", color: "#FDE047", delay: 0.8 },
  { x: "78%", y: "58%", color: "#7AE7FF", delay: 0.55 },
];

/** Original cute star-critter mascot (not from any franchise). */
function StarBuddy({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      aria-hidden
      width="120"
      height="120"
    >
      <circle cx="60" cy="62" r="38" fill="#FFE066" />
      <circle cx="60" cy="62" r="32" fill="#FFF3A8" />
      <ellipse cx="48" cy="58" rx="5" ry="7" fill="#2B2422" />
      <ellipse cx="72" cy="58" rx="5" ry="7" fill="#2B2422" />
      <circle cx="50" cy="56" r="1.5" fill="#fff" />
      <circle cx="74" cy="56" r="1.5" fill="#fff" />
      <path
        d="M52 72c4 6 12 6 16 0"
        stroke="#E85A71"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="42" cy="68" r="5" fill="#FFB4C4" opacity="0.7" />
      <circle cx="78" cy="68" r="5" fill="#FFB4C4" opacity="0.7" />
      <path
        d="M60 18l4 12 12 2-9 8 3 12-10-6-10 6 3-12-9-8 12-2z"
        fill="#FF9F1C"
      />
    </svg>
  );
}

function FloatingBalloon({
  x,
  y,
  color,
  delay,
  reduce,
}: {
  x: string;
  y: string;
  color: string;
  delay: number;
  reduce: boolean;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute"
      style={{ left: x, top: y }}
      animate={reduce ? undefined : { y: [0, -18, 0], rotate: [-2, 2, -2] }}
      transition={{ duration: 3.6 + delay, repeat: Infinity, ease: "easeInOut", delay }}
      aria-hidden
    >
      <svg width="52" height="72" viewBox="0 0 52 72">
        <ellipse cx="26" cy="28" rx="22" ry="26" fill={color} />
        <ellipse cx="18" cy="20" rx="6" ry="9" fill="rgba(255,255,255,0.35)" />
        <path d="M26 54 L22 64 L30 64 Z" fill={color} opacity="0.85" />
        <path
          d="M26 64 Q20 68 26 72 Q32 68 26 64"
          stroke="#94A3B8"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    </motion.div>
  );
}

function FallingPartyRain() {
  const reduce = useReducedMotion();
  const items = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        emoji: PARTY_EMOJIS[i % PARTY_EMOJIS.length]!,
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
      style={{ opacity: 0.55 }}
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

function CastleGate({
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
          radial-gradient(ellipse at 50% 15%, rgba(255,255,255,0.75) 0%, transparent 50%),
          radial-gradient(ellipse at 20% 80%, rgba(253,224,71,0.35) 0%, transparent 42%),
          linear-gradient(180deg, #7EC8FF 0%, #C4E7FF 35%, #FFE8F0 70%, #FFF5E8 100%)
        `,
      }}
      exit={{ opacity: 0, transition: { duration: 0.55 } }}
    >
      <ParticleField
        variant="bubble"
        count={16}
        colors={["rgba(255,255,255,0.55)", "rgba(126,200,255,0.45)", "rgba(253,224,71,0.35)"]}
      />
      <ParticleField
        variant="sparkle"
        count={22}
        colors={["#ffffff", "#FFE066", "#FFB4C4", "#7EC8FF"]}
      />

      {gateBalloons.map((balloon) => (
        <FloatingBalloon key={balloon.x} {...balloon} reduce={!!reduce} />
      ))}

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
          style={{ color: "#5B4B8A" }}
        >
          You&apos;re invited
        </p>

        <div className="relative">
          <svg width="260" height="168" viewBox="0 0 260 168" aria-hidden>
            {/* Castle body */}
            <rect x="20" y="58" width="48" height="98" fill="#E8A87C" rx="2" />
            <rect x="106" y="38" width="48" height="118" fill="#D4916A" rx="2" />
            <rect x="192" y="58" width="48" height="98" fill="#E8A87C" rx="2" />
            <polygon points="44,58 20,32 68,32" fill="#FB7185" />
            <polygon points="130,38 106,8 154,8" fill="#FB7185" />
            <polygon points="216,58 192,32 240,32" fill="#FB7185" />
            <rect x="118" y="108" width="24" height="48" fill="#6B3F2A" rx="1" />
            <circle cx="130" cy="78" r="10" fill="#7EC8FF" opacity="0.85" />

            {/* Left door */}
            <motion.g
              animate={
                opening && !reduce ? { x: -58, opacity: 0.65 } : { x: 0, opacity: 1 }
              }
              transition={{ duration: 0.85, ease: soft }}
            >
              <rect x="118" y="108" width="12" height="48" fill="#8B5E3C" rx="1" />
            </motion.g>
            {/* Right door */}
            <motion.g
              animate={
                opening && !reduce ? { x: 58, opacity: 0.65 } : { x: 0, opacity: 1 }
              }
              transition={{ duration: 0.85, ease: soft }}
            >
              <rect x="130" y="108" width="12" height="48" fill="#8B5E3C" rx="1" />
            </motion.g>
            {/* Door arch highlight */}
            <rect x="118" y="108" width="24" height="6" fill="#A67C52" rx="1" />
          </svg>

          <motion.div
            className="absolute -top-2 left-1/2 -translate-x-1/2"
            animate={
              reduce
                ? undefined
                : opening
                  ? { y: -40, scale: 1.15, rotate: [0, -8, 8, 0] }
                  : { y: [0, -10, 0] }
            }
            transition={
              opening
                ? { duration: 0.9, ease: soft }
                : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <StarBuddy className="h-20 w-20" />
          </motion.div>
        </div>

        <motion.h1
          className="mt-2 font-[family-name:var(--font-display)] text-3xl sm:text-4xl"
          style={{ color: "#0369A1" }}
        >
          {name}&apos;s Wonderland
        </motion.h1>
        {age ? (
          <p
            className="mt-1 font-[family-name:var(--font-display)] text-xl"
            style={{ color: "#FB7185" }}
          >
            Turning {age}!
          </p>
        ) : null}

        <motion.button
          type="button"
          onClick={open}
          disabled={opening}
          className="mt-8 rounded-full px-9 py-4 text-sm font-extrabold tracking-wide uppercase disabled:opacity-70"
          style={{
            background: "linear-gradient(180deg, #FFE066, #FF9F1C)",
            color: "#2B2422",
            boxShadow: "0 8px 0 #E08500",
          }}
          whileHover={reduce ? undefined : { scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97, y: 2, boxShadow: "0 4px 0 #E08500" }}
        >
          {opening ? "Opening…" : "Open the castle"}
        </motion.button>
      </motion.div>

      {opening ? (
        <ConfettiBurst
          colors={["#FB7185", "#FDE047", "#0369A1", "#7AE7FF", "#ffffff"]}
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
    "#ffffff",
    "#7AE7FF",
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
          <CastleGate
            key="gate"
            name={name}
            age={age}
            onOpen={() => setOpened(true)}
          />
        ) : null}
      </AnimatePresence>

      {opened ? <ConfettiBurst colors={confettiColors} count={100} /> : null}
      {opened ? <FallingPartyRain /> : null}
      {opened ? (
        <ParticleField variant="sparkle" count={24} colors={confettiColors} />
      ) : null}
      {opened ? (
        <ParticleField
          variant="bubble"
          count={14}
          colors={[
            "rgba(251,113,133,0.35)",
            "rgba(253,224,71,0.3)",
            "rgba(3,105,161,0.25)",
          ]}
        />
      ) : null}

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
          {data.media.heroImage ? (
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <Image
                src={data.media.heroImage.src}
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
                style={{ opacity: 0.14 }}
              />
            </div>
          ) : null}

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
              <StarBuddy className="mx-auto" />
            </motion.div>

            <motion.p
              className="mt-4 text-[11px] font-extrabold tracking-[0.34em] uppercase"
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
                  textShadow:
                    "0 10px 0 color-mix(in srgb, var(--hw-secondary) 45%, transparent)",
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
              style={{ color: "var(--hw-text)" }}
              initial={reduce || !opened ? false : { opacity: 0, y: 28 }}
              animate={opened ? { opacity: 1, y: 0 } : undefined}
              transition={{ ...spring, delay: 0.12 }}
            >
              {name}
            </motion.h1>

            <motion.p
              className="mt-4 font-[family-name:var(--font-display)] text-2xl sm:text-3xl"
              style={{ color: "var(--hw-secondary)" }}
              initial={reduce || !opened ? false : { opacity: 0 }}
              animate={opened ? { opacity: 1 } : undefined}
              transition={{ delay: 0.35, duration: 0.6 }}
            >
              {data.copy.headline}
            </motion.p>

            <motion.p
              className="mx-auto mt-6 max-w-md text-base leading-7 sm:text-lg"
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
                className="mt-10 inline-flex rounded-full px-8 py-3.5 text-sm font-extrabold tracking-wide uppercase shadow-[0_8px_0_var(--hw-secondary)] transition-transform hover:-translate-y-0.5 active:translate-y-1 active:shadow-none"
                style={{
                  background: "var(--hw-accent)",
                  color: "var(--hw-text)",
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
                className="mb-8 text-center text-[11px] font-extrabold tracking-[0.32em] uppercase"
                style={{ color: "var(--hw-accent)" }}
              >
                Party vibes
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
                          style={{ color: "var(--hw-secondary)" }}
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
                className="mb-10 text-center text-[11px] font-extrabold tracking-[0.32em] uppercase"
                style={{ color: "var(--hw-primary)" }}
              >
                What we&apos;re doing
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
                        style={{ color: "var(--hw-secondary)" }}
                      >
                        {chapter.title}
                      </h2>
                      <p
                        className="mt-1 text-sm leading-6"
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
                  className="text-[11px] font-extrabold tracking-[0.32em] uppercase"
                  style={{ color: "var(--hw-accent)" }}
                >
                  When & where
                </p>
                <p
                  className="mt-4 font-[family-name:var(--font-display)] text-2xl"
                  style={{ color: "var(--hw-secondary)" }}
                >
                  {data.event.timeLabel}
                </p>
                {data.event.place ? (
                  <p className="mt-2 text-sm" style={{ color: "var(--hw-muted)" }}>
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
