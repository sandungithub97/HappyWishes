"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { PetalFall } from "@/templates/_shared/components/PetalFall";
import { TextureOverlay } from "@/templates/_shared/components/TextureOverlay";
import { PlaceLink } from "@/templates/_shared/components/VenueMap";
import { RsvpCard } from "@/templates/_shared/components/RsvpCard";
import { namesLine } from "@/templates/_shared/people";
import { themeStyle } from "@/templates/_shared/theme";
import type { TemplateData } from "@/templates/_shared/types";

const softEase = [0.22, 1, 0.36, 1] as const;
const brushEase = [0.16, 1, 0.3, 1] as const;

function InkRule({ className }: { className?: string }) {
  return (
    <motion.svg
      className={className}
      width="160"
      height="12"
      viewBox="0 0 160 12"
      fill="none"
      aria-hidden
      initial={{ opacity: 0, scaleX: 0.4 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 1.1, ease: brushEase }}
      style={{ originX: 0.5, color: "var(--hw-primary)" }}
    >
      <path
        d="M8 6h60M92 6h60"
        stroke="currentColor"
        strokeWidth="0.7"
        strokeLinecap="round"
      />
      <circle cx="80" cy="6" r="2.2" stroke="currentColor" strokeWidth="0.7" />
      <path
        d="M76 6h8"
        stroke="currentColor"
        strokeWidth="0.7"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}

function Reveal({
  children,
  className,
  delay = 0,
  y = 36,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.25, margin: "-6% 0px" }}
      transition={{ duration: 1.05, delay, ease: softEase }}
    >
      {children}
    </motion.div>
  );
}

function SakuraBloom({
  className,
  size = 28,
  color = "#E8A0B4",
  delay = 0,
}: {
  className?: string;
  size?: number;
  color?: string;
  delay?: number;
}) {
  return (
    <motion.svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden
      initial={{ opacity: 0, scale: 0.4, rotate: -20 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.9, delay, ease: softEase }}
    >
      {[0, 72, 144, 216, 288].map((deg) => (
        <ellipse
          key={deg}
          cx="20"
          cy="11"
          rx="5.2"
          ry="9"
          fill={color}
          opacity="0.92"
          transform={`rotate(${deg} 20 20)`}
        />
      ))}
      <circle cx="20" cy="20" r="3.2" fill="#F7E7B8" />
    </motion.svg>
  );
}

const doorFlowers = [
  { top: "8%", left: "12%", size: 34, color: "#F2B6C6", delay: 0.2 },
  { top: "14%", left: "58%", size: 26, color: "#E89BB0", delay: 0.35 },
  { top: "28%", left: "22%", size: 22, color: "#F7C1D0", delay: 0.45 },
  { top: "38%", left: "68%", size: 30, color: "#D4849A", delay: 0.28 },
  { top: "52%", left: "18%", size: 28, color: "#E8A0B4", delay: 0.5 },
  { top: "62%", left: "55%", size: 24, color: "#F2B6C6", delay: 0.4 },
  { top: "74%", left: "30%", size: 32, color: "#E89BB0", delay: 0.55 },
  { top: "82%", left: "64%", size: 20, color: "#F7C1D0", delay: 0.32 },
] as const;

const burstPetals = Array.from({ length: 22 }, (_, i) => {
  const angle = (i / 22) * Math.PI * 2;
  const distance = 120 + (i % 5) * 38;
  return {
    id: i,
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance - 40,
    rotate: i * 28,
    size: 14 + (i % 4) * 6,
    color: ["#F2B6C6", "#E89BB0", "#F7C1D0", "#D4849A", "#FFD6E0"][i % 5]!,
    delay: 0.08 + (i % 7) * 0.03,
  };
});

function FloweredDoorPanel({
  side,
  opening,
  reduce,
}: {
  side: "left" | "right";
  opening: boolean;
  reduce: boolean | null;
}) {
  const isLeft = side === "left";

  return (
    <motion.div
      className={`absolute inset-y-0 ${isLeft ? "left-0 origin-left" : "right-0 origin-right"} w-[42%] max-w-[380px] sm:w-[min(44vw,400px)]`}
      style={{ transformStyle: "preserve-3d" }}
      animate={
        opening && !reduce
          ? {
              rotateY: isLeft ? -78 : 78,
              x: isLeft ? "-8%" : "8%",
              opacity: 0.2,
            }
          : { rotateY: 0, x: 0, opacity: 1 }
      }
      transition={{ duration: 1.65, ease: [0.19, 1, 0.22, 1] }}
    >
      <div
        className="relative h-full w-full overflow-hidden"
        style={{
          background: `
            linear-gradient(
              ${isLeft ? "90deg" : "270deg"},
              #5c2f2a 0%,
              #8a4a3d 12%,
              #c9a27a 14%,
              #f7efe6 16%,
              #fff8f2 48%,
              #f3e4da 84%,
              #c9a27a 86%,
              #8a4a3d 92%,
              #5c2f2a 100%
            )
          `,
          boxShadow: isLeft
            ? "inset -24px 0 50px rgba(43, 36, 34, 0.12), 8px 0 40px rgba(43, 36, 34, 0.18)"
            : "inset 24px 0 50px rgba(43, 36, 34, 0.12), -8px 0 40px rgba(43, 36, 34, 0.18)",
          borderRight: isLeft ? "2px solid #c9a27a" : undefined,
          borderLeft: !isLeft ? "2px solid #c9a27a" : undefined,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Lattice */}
        <div
          className="absolute inset-[10%] opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(to right, color-mix(in srgb, #8a4a3d 55%, transparent) 1px, transparent 1px),
              linear-gradient(to bottom, color-mix(in srgb, #8a4a3d 55%, transparent) 1px, transparent 1px)
            `,
            backgroundSize: "28% 22%",
            border: "1px solid color-mix(in srgb, #8a4a3d 45%, transparent)",
          }}
        />

        {/* Center crest */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="relative flex h-24 w-24 items-center justify-center rounded-full sm:h-28 sm:w-28"
            style={{
              border: "1.5px solid #c9a27a",
              background:
                "radial-gradient(circle, #fff9f4 0%, #f3e4da 70%, #e8c9a8 100%)",
              boxShadow: "0 0 0 6px color-mix(in srgb, #fff8f2 70%, transparent)",
            }}
          >
            <SakuraBloom size={42} color="#D4849A" delay={0.4} />
          </div>
        </div>

        {/* Scattered blossoms on door */}
        {doorFlowers.map((flower, index) => (
          <div
            key={`pos-${side}-${index}`}
            className="pointer-events-none absolute"
            style={{
              top: flower.top,
              left: isLeft ? flower.left : undefined,
              right: isLeft ? undefined : flower.left,
            }}
          >
            <SakuraBloom
              size={flower.size}
              color={flower.color}
              delay={flower.delay + (isLeft ? 0 : 0.08)}
            />
          </div>
        ))}

        {/* Soft hanging cords */}
        <div
          className={`absolute top-[18%] ${isLeft ? "right-5" : "left-5"} h-[28%] w-px`}
          style={{ background: "color-mix(in srgb, #8a4a3d 55%, transparent)" }}
        />
        <div
          className={`absolute top-[18%] ${isLeft ? "right-4" : "left-4"} h-3 w-3 rounded-full`}
          style={{ background: "#D4849A" }}
        />
      </div>
    </motion.div>
  );
}

function WelcomeGate({
  names,
  onOpen,
}: {
  names: string;
  onOpen: () => void;
}) {
  const reduce = useReducedMotion();
  const [opening, setOpening] = useState(false);

  function open() {
    if (opening) return;
    setOpening(true);
    window.setTimeout(onOpen, reduce ? 220 : 1950);
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at 50% 18%, #ffe8ef 0%, transparent 42%),
          radial-gradient(ellipse at 50% 100%, #f3e4da 0%, transparent 48%),
          #fbf6f2
        `,
      }}
      exit={
        reduce
          ? { opacity: 0 }
          : { opacity: 0, transition: { duration: 0.55, delay: 0.1 } }
      }
    >
      {/* Floral arch header */}
      <div className="pointer-events-none absolute top-0 right-0 left-0 z-20 flex justify-center pt-3 sm:pt-5">
        <motion.div
          className="relative flex w-[min(96vw,600px)] items-end justify-center"
          initial={reduce ? false : { opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: softEase }}
        >
          <div
            className="absolute inset-x-4 bottom-0 h-14 rounded-t-[999px]"
            style={{
              background:
                "linear-gradient(to top, color-mix(in srgb, #8a4a3d 55%, transparent), transparent)",
              opacity: 0.3,
            }}
          />
          {/* Layered arch — denser floral canopy */}
          <div className="relative flex items-end justify-center gap-0.5 sm:gap-1">
            {[
              { size: 22, y: 18, c: "#F2B6C6" },
              { size: 30, y: 8, c: "#E89BB0" },
              { size: 38, y: 2, c: "#D4849A" },
              { size: 46, y: 0, c: "#F7C1D0" },
              { size: 54, y: -4, c: "#E89BB0" },
              { size: 46, y: 0, c: "#F2B6C6" },
              { size: 38, y: 2, c: "#D4849A" },
              { size: 30, y: 8, c: "#F7C1D0" },
              { size: 22, y: 18, c: "#E89BB0" },
            ].map((bloom, i) => (
              <motion.div
                key={i}
                style={{ marginBottom: bloom.y }}
                animate={
                  reduce
                    ? undefined
                    : { y: [0, -3, 0], rotate: [-2, 2, -2] }
                }
                transition={{
                  duration: 3.2 + (i % 3) * 0.4,
                  delay: i * 0.08,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <SakuraBloom
                  size={bloom.size}
                  color={bloom.c}
                  delay={0.12 + i * 0.05}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Warm courtyard glow behind doors */}
      <motion.div
        className="pointer-events-none absolute inset-[12%] rounded-[40%] opacity-0"
        style={{
          background:
            "radial-gradient(circle, #fff7f2 0%, #ffe0ea 35%, transparent 70%)",
        }}
        animate={
          opening && !reduce
            ? { opacity: 1, scale: 1.15 }
            : { opacity: 0, scale: 0.85 }
        }
        transition={{ duration: 1.2, ease: softEase }}
      />

      <div
        className="absolute inset-0 z-10"
        style={{ perspective: "1600px", perspectiveOrigin: "50% 50%" }}
      >
        <FloweredDoorPanel side="left" opening={opening} reduce={reduce} />
        <FloweredDoorPanel side="right" opening={opening} reduce={reduce} />
      </div>

      {/* Center seam / latch */}
      <motion.div
        className="pointer-events-none absolute inset-y-[12%] left-1/2 z-20 w-px -translate-x-1/2"
        style={{
          background:
            "linear-gradient(to bottom, transparent, #c9a27a 20%, #c9a27a 80%, transparent)",
        }}
        animate={opening ? { opacity: 0 } : { opacity: 0.8 }}
        transition={{ duration: 0.4 }}
      />

      {/* Petal burst when doors open */}
      <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
        {burstPetals.map((petal) => (
          <motion.div
            key={petal.id}
            className="absolute"
            initial={{ opacity: 0, x: 0, y: 0, scale: 0.3, rotate: 0 }}
            animate={
              opening && !reduce
                ? {
                    opacity: [0, 1, 0],
                    x: petal.x,
                    y: petal.y,
                    scale: [0.3, 1.1, 0.7],
                    rotate: petal.rotate,
                  }
                : { opacity: 0, x: 0, y: 0 }
            }
            transition={{
              duration: 1.45,
              delay: petal.delay,
              ease: softEase,
            }}
          >
            <SakuraBloom size={petal.size} color={petal.color} delay={0} />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="relative z-40 mx-auto flex w-full max-w-[min(92vw,22rem)] flex-col items-center overflow-hidden px-5 py-8 text-center sm:max-w-md sm:px-8 sm:py-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,249,244,0.97) 0%, rgba(255,244,238,0.96) 100%)",
          border: "1px solid #c9a27a",
          boxShadow:
            "0 18px 50px rgba(43, 36, 34, 0.18), 0 0 0 6px rgba(255, 249, 244, 0.55)",
          backdropFilter: "blur(8px)",
        }}
        animate={
          opening && !reduce
            ? { opacity: 0, y: -12, scale: 0.97 }
            : { opacity: 1, y: 0, scale: 1 }
        }
        transition={{ duration: 0.55, ease: softEase }}
      >
        <TextureOverlay variant="washi" opacity={0.4} className="!absolute inset-0 z-0" />
        <div className="relative z-10 flex w-full flex-col items-center">
        <motion.p
          className="text-[11px] tracking-[0.42em] uppercase"
          style={{ color: "#D4849A" }}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: softEase }}
        >
          ようこそ · Welcome
        </motion.p>
        <motion.p
          className="mt-5 font-[family-name:var(--font-display)] text-[1.85rem] leading-snug sm:text-4xl"
          style={{ color: "#2B2422" }}
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: softEase }}
        >
          {names}
        </motion.p>
        <motion.p
          className="mt-4 text-sm tracking-[0.18em]"
          style={{ color: "#8A736C" }}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.6 }}
        >
          桜の門 · Flowered wedding doors
        </motion.p>

        <motion.button
          type="button"
          onClick={open}
          className="mt-8 rounded-full border px-8 py-3.5 text-[11px] tracking-[0.32em] uppercase transition-transform hover:scale-[1.03] active:scale-[0.98]"
          style={{
            borderColor: "#c9a27a",
            background:
              "linear-gradient(180deg, #fff9f4 0%, #f7ebe3 100%)",
            color: "#2B2422",
            boxShadow: "0 10px 30px rgba(212, 132, 154, 0.18)",
          }}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8, ease: softEase }}
          whileHover={reduce ? undefined : { scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
        >
          Open the flowered doors
        </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ScrollHint() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <motion.div
      className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.6, duration: 0.8 }}
    >
      <p
        className="text-[10px] tracking-[0.28em] uppercase"
        style={{ color: "var(--hw-muted)" }}
      >
        Scroll
      </p>
      <motion.span
        className="h-8 w-px"
        style={{ background: "var(--hw-primary)" }}
        animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.35, 1, 0.35] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

export function Experience({ data }: { data: TemplateData }) {
  const reduce = useReducedMotion();
  const [first, second] = data.people.map((person) => person.name.split(" ")[0]);
  const couple = [first, second].filter(Boolean).join(" & ") || namesLine(data.people);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (!opened) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
    document.body.style.overflow = "";
  }, [opened]);

  const { scrollYProgress } = useScroll();
  const heroLift = useTransform(scrollYProgress, [0, 0.18], [0, reduce ? 0 : -48]);
  const heroFade = useTransform(scrollYProgress, [0, 0.16], [1, reduce ? 1 : 0.35]);

  return (
    <main
      className="relative min-h-svh overflow-x-hidden bg-[var(--hw-bg)] font-[family-name:var(--font-body)] text-[var(--hw-text)]"
      style={themeStyle(data.palette)}
    >
      <AnimatePresence>
        {!opened ? (
          <WelcomeGate key="gate" names={couple} onOpen={() => setOpened(true)} />
        ) : null}
      </AnimatePresence>

      {opened ? (
        <PetalFall
          colors={[
            data.palette.primary,
            data.palette.accent,
            "#F7C1D0",
            "#FFD6E0",
          ]}
          count={56}
        />
      ) : null}

      <motion.div
        initial={false}
        animate={
          opened
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0, y: 18, filter: "blur(8px)" }
        }
        transition={{ duration: 1.1, ease: softEase, delay: opened ? 0.05 : 0 }}
      >
        {/* Hero invitation */}
        <section className="relative flex min-h-svh items-center justify-center px-4 py-20">
          <motion.div
            className="relative w-full max-w-lg"
            style={{ y: heroLift, opacity: heroFade }}
          >
            <motion.div
              className="relative overflow-hidden border px-8 py-16 text-center sm:px-12 sm:py-20"
              style={{
                background:
                  "color-mix(in srgb, var(--hw-surface) 92%, transparent)",
                borderColor: "var(--hw-border)",
              }}
              initial={reduce || !opened ? false : { opacity: 0, y: 28, scale: 0.98 }}
              animate={opened ? { opacity: 1, y: 0, scale: 1 } : undefined}
              transition={{ duration: 1.2, delay: 0.2, ease: softEase }}
            >
              <TextureOverlay variant="washi" opacity={0.35} className="!absolute inset-0" />
              <div className="relative z-10">
              <p
                className="text-sm tracking-[0.2em]"
                style={{ color: "var(--hw-primary)" }}
              >
                {data.copy.subhead}
              </p>
              <h1
                className="mt-8 font-[family-name:var(--font-display)] text-5xl leading-tight sm:text-6xl"
                style={{ color: "var(--hw-secondary)" }}
              >
                {first}
                {second ? (
                  <>
                    <span
                      className="my-3 block text-xl tracking-[0.4em]"
                      style={{ color: "var(--hw-primary)" }}
                    >
                      ❀
                    </span>
                    {second}
                  </>
                ) : (
                  namesLine(data.people)
                )}
              </h1>
              <InkRule className="mx-auto mt-8" />
              <p
                className="mt-8 text-base leading-8"
                style={{ color: "var(--hw-muted)" }}
              >
                {data.copy.message}
              </p>
              {data.event?.timeLabel ? (
                <p
                  className="mt-10 font-[family-name:var(--font-display)] text-lg"
                  style={{ color: "var(--hw-secondary)" }}
                >
                  {data.event.timeLabel}
                </p>
              ) : null}
              {data.event?.place ? (
                <p className="mt-2 text-sm" style={{ color: "var(--hw-muted)" }}>
                  <PlaceLink
                    place={data.event.place}
                    className="underline underline-offset-4"
                  />
                </p>
              ) : null}
              </div>
            </motion.div>
          </motion.div>
          {opened ? <ScrollHint /> : null}
        </section>

        {/* Chapter: season */}
        <section className="relative mx-auto max-w-2xl px-6 py-20 text-center">
          <Reveal>
            <p
              className="text-[11px] tracking-[0.36em] uppercase"
              style={{ color: "var(--hw-primary)" }}
            >
              春 · Spring chapter
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <h2
              className="mt-5 font-[family-name:var(--font-display)] text-3xl leading-snug sm:text-4xl"
              style={{ color: "var(--hw-secondary)" }}
            >
              Under falling blossoms
            </h2>
          </Reveal>
          <Reveal delay={0.22}>
            <p
              className="mx-auto mt-5 max-w-md text-base leading-8"
              style={{ color: "var(--hw-muted)" }}
            >
              A quiet Japanese welcome — ink, ivory, and sakura drifting as the
              evening begins.
            </p>
          </Reveal>
          <InkRule className="mx-auto mt-10" />
        </section>

        {/* Photos with staggered Japanese reveals */}
        {data.media.photos.length > 0 ? (
          <section className="relative mx-auto max-w-5xl px-4 pb-8 sm:px-8">
            <div className="grid gap-5 sm:grid-cols-3 sm:gap-4">
              {data.media.photos.map((photo, index) => (
                <Reveal
                  key={photo.src}
                  delay={index * 0.12}
                  y={48}
                  className={index === 1 ? "sm:mt-10" : undefined}
                >
                  <motion.div
                    className="relative aspect-[3/4] overflow-hidden"
                    style={{ border: "1px solid var(--hw-border)" }}
                    whileHover={
                      reduce
                        ? undefined
                        : { y: -6, transition: { duration: 0.45, ease: softEase } }
                    }
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, color-mix(in srgb, var(--hw-bg) 35%, transparent), transparent 45%)",
                      }}
                    />
                  </motion.div>
                  {photo.alt ? (
                    <p
                      className="mt-3 text-center text-[11px] tracking-[0.22em] uppercase"
                      style={{ color: "var(--hw-muted)" }}
                    >
                      {photo.alt}
                    </p>
                  ) : null}
                </Reveal>
              ))}
            </div>
          </section>
        ) : null}

        {/* Closing / RSVP */}
        {data.extras.rsvp?.enabled ? (
          <section className="relative mx-auto max-w-md px-6 py-24">
            <Reveal>
              <p
                className="mb-8 text-center text-[11px] tracking-[0.36em] uppercase"
                style={{ color: "var(--hw-primary)" }}
              >
                ご出席のほど · Kindly reply
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <RsvpCard
                note={data.extras.rsvp.note}
                cta={data.copy.cta}
                storageKey={`hw-rsvp-${data.meta.slug}-${data.meta.wishId}`}
                occasion={data.meta.occasion}
                slug={data.meta.slug}
                wishId={data.meta.wishId}
              />
            </Reveal>
          </section>
        ) : null}

        <footer className="relative px-6 pb-16 pt-4 text-center">
          <Reveal>
            <p
              className="font-[family-name:var(--font-display)] text-2xl"
              style={{ color: "var(--hw-secondary)" }}
            >
              {couple}
            </p>
            <p
              className="mt-3 text-[11px] tracking-[0.28em] uppercase"
              style={{ color: "var(--hw-muted)" }}
            >
              With love · ありがとう
            </p>
          </Reveal>
        </footer>
      </motion.div>
    </main>
  );
}
