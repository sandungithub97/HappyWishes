"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { MusicToggle } from "@/templates/_shared/components/MusicToggle";
import { RsvpCard } from "@/templates/_shared/components/RsvpCard";
import { PlaceLink } from "@/templates/_shared/components/VenueMap";
import { displayNames } from "@/templates/_shared/people";
import { themeStyle } from "@/templates/_shared/theme";
import type { TemplateData } from "@/templates/_shared/types";

const soft = [0.22, 1, 0.36, 1] as const;

function Starfield({ count = 48 }: { count?: number }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${(i * 47) % 100}%`,
        top: `${(i * 31) % 100}%`,
        size: 1 + (i % 3),
        delay: (i % 12) * 0.35,
        duration: 2.2 + (i % 5) * 0.4,
      })),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((star) => (
        <motion.span
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            boxShadow: "0 0 6px rgba(255,255,255,0.85)",
          }}
          animate={{ opacity: [0.2, 1, 0.25], scale: [1, 1.35, 1] }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function CometTrail({ active }: { active: boolean }) {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      initial={false}
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute h-px origin-left"
          style={{
            top: `${18 + i * 16}%`,
            left: "-20%",
            width: "55%",
            background:
              "linear-gradient(90deg, transparent, #fff6e8 30%, #7EC8FF 70%, transparent)",
            boxShadow: "0 0 18px rgba(126, 200, 255, 0.55)",
            rotate: `${-18 - i * 4}deg`,
          }}
          initial={{ x: "-10%", opacity: 0 }}
          animate={
            active
              ? { x: ["0%", "160%"], opacity: [0, 1, 0.8, 0] }
              : { opacity: 0 }
          }
          transition={{
            duration: 1.8,
            delay: 0.15 + i * 0.22,
            ease: soft,
          }}
        />
      ))}
    </motion.div>
  );
}

/** Original silhouette pair — not based on any copyrighted character art. */
function SkyWatchers() {
  return (
    <svg
      viewBox="0 0 360 220"
      className="mx-auto h-auto w-full max-w-md"
      aria-hidden
    >
      <defs>
        <linearGradient id="skyGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7EC8FF" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#FF6B9D" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="figureFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a2244" />
          <stop offset="100%" stopColor="#070B1A" />
        </linearGradient>
      </defs>
      <ellipse cx="180" cy="200" rx="150" ry="18" fill="url(#skyGlow)" />
      {/* Left figure */}
      <g fill="url(#figureFill)" stroke="#7EC8FF" strokeWidth="1.2" opacity="0.95">
        <circle cx="128" cy="96" r="16" />
        <path d="M108 118c6-10 34-10 40 0l8 62H100l8-62z" />
        <path d="M118 180h20l4 28h-28z" />
      </g>
      {/* Right figure */}
      <g fill="url(#figureFill)" stroke="#FF6B9D" strokeWidth="1.2" opacity="0.95">
        <circle cx="232" cy="92" r="17" />
        <path d="M210 116c8-14 40-12 44 2l6 60h-56l6-62z" />
        <path d="M220 178h24l3 30h-30z" />
        <path
          d="M214 78c8-16 36-18 42-2"
          fill="none"
          stroke="#F4C27A"
          strokeWidth="1.5"
        />
      </g>
      {/* Shared comet spark between them */}
      <motion.circle
        cx="180"
        cy="70"
        r="4"
        fill="#fff6e8"
        animate={{ opacity: [0.4, 1, 0.4], r: [3, 5, 3] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <path
        d="M168 78 L192 62"
        stroke="#7EC8FF"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

function FloatingOrbs() {
  const orbs = useMemo(
    () =>
      [
        { x: "12%", y: "22%", s: 120, c: "rgba(126,200,255,0.14)" },
        { x: "78%", y: "18%", s: 160, c: "rgba(255,107,157,0.12)" },
        { x: "64%", y: "62%", s: 100, c: "rgba(244,194,122,0.1)" },
        { x: "22%", y: "70%", s: 140, c: "rgba(126,200,255,0.08)" },
      ] as const,
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-2xl"
          style={{
            left: orb.x,
            top: orb.y,
            width: orb.s,
            height: orb.s,
            background: orb.c,
            marginLeft: -orb.s / 2,
            marginTop: -orb.s / 2,
          }}
          animate={{ y: [0, -18, 0], opacity: [0.55, 0.9, 0.55] }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        />
      ))}
    </div>
  );
}

function OpeningGate({
  subhead,
  name,
  onEnter,
}: {
  subhead: string;
  name: string;
  onEnter: () => void;
}) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<"idle" | "streak" | "exit">("idle");

  useEffect(() => {
    if (reduce) return;
    const t = window.setTimeout(() => setPhase("streak"), 400);
    return () => window.clearTimeout(t);
  }, [reduce]);

  function enter() {
    if (phase === "exit") return;
    setPhase("exit");
    window.setTimeout(onEnter, reduce ? 180 : 900);
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 30%, #1a2750 0%, #070B1A 55%, #04060f 100%)",
      }}
      animate={phase === "exit" ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.85, ease: soft }}
    >
      <Starfield count={56} />
      <CometTrail active={phase !== "idle"} />
      <FloatingOrbs />

      <div className="relative z-10 mx-auto flex max-w-lg flex-col items-center px-6 text-center">
        <motion.p
          className="text-[11px] tracking-[0.42em] uppercase"
          style={{ color: "#7EC8FF" }}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease: soft }}
        >
          {subhead}
        </motion.p>

        <motion.h1
          className="mt-6 font-[family-name:var(--font-display)] text-4xl leading-tight sm:text-5xl"
          style={{
            color: "#F4F1FF",
            textShadow: "0 0 40px rgba(126,200,255,0.35)",
          }}
          initial={reduce ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.85, duration: 1.1, ease: soft }}
        >
          A night for {name}
        </motion.h1>

        <motion.p
          className="mt-4 max-w-sm text-sm leading-relaxed"
          style={{ color: "#9AA3C7" }}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.9 }}
        >
          When the comet arrives, the story begins.
        </motion.p>

        <motion.button
          type="button"
          onClick={enter}
          className="mt-12 rounded-full border px-8 py-3.5 text-[11px] tracking-[0.34em] uppercase"
          style={{
            borderColor: "rgba(126,200,255,0.55)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(126,200,255,0.12))",
            color: "#F4F1FF",
            boxShadow: "0 0 32px rgba(126,200,255,0.2)",
          }}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.45, duration: 0.8, ease: soft }}
          whileHover={reduce ? undefined : { scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
        >
          Open the sky
        </motion.button>
      </div>
    </motion.div>
  );
}

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, delay, ease: soft }}
    >
      {children}
    </motion.div>
  );
}

export function Experience({ data }: { data: TemplateData }) {
  const reduce = useReducedMotion();
  const name = displayNames(data.people)[0] ?? "";
  const age = data.extras.milestoneAge;
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
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, reduce ? 0 : -40]);
  const heroFade = useTransform(
    scrollYProgress,
    [0, 0.18],
    [1, reduce ? 1 : 0.4],
  );

  return (
    <main
      className="relative min-h-svh overflow-x-hidden bg-[var(--hw-bg)] font-[family-name:var(--font-body)] text-[var(--hw-text)]"
      style={themeStyle(data.palette)}
    >
      <AnimatePresence>
        {!opened ? (
          <OpeningGate
            key="gate"
            subhead={data.copy.subhead ?? "Birthday"}
            name={name}
            onEnter={() => setOpened(true)}
          />
        ) : null}
      </AnimatePresence>

      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background: `
            radial-gradient(ellipse at 50% 0%, #1c2a58 0%, transparent 50%),
            radial-gradient(ellipse at 80% 40%, rgba(255,107,157,0.12) 0%, transparent 42%),
            radial-gradient(ellipse at 15% 70%, rgba(126,200,255,0.1) 0%, transparent 40%),
            #070B1A
          `,
        }}
      />
      {opened ? <Starfield count={40} /> : null}
      {opened ? <FloatingOrbs /> : null}

      <motion.div
        initial={false}
        animate={
          opened
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0, y: 24, filter: "blur(10px)" }
        }
        transition={{ duration: 1.1, ease: soft, delay: opened ? 0.05 : 0 }}
      >
        {/* Hero */}
        <section className="relative flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center">
          <motion.div style={{ y: heroY, opacity: heroFade }} className="relative w-full max-w-lg">
            <motion.p
              className="text-[11px] tracking-[0.4em] uppercase"
              style={{ color: "var(--hw-accent)" }}
              initial={reduce || !opened ? false : { opacity: 0, y: 12 }}
              animate={opened ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.2, duration: 0.8, ease: soft }}
            >
              {data.copy.subhead ?? "Birthday"}
            </motion.p>

            {age ? (
              <motion.p
                className="mt-5 font-[family-name:var(--font-display)] text-[6.5rem] leading-none sm:text-[8rem]"
                style={{
                  color: "var(--hw-primary)",
                  textShadow:
                    "0 0 48px rgba(255,107,157,0.45), 0 0 2px rgba(255,255,255,0.4)",
                }}
                initial={
                  reduce || !opened
                    ? false
                    : { opacity: 0, scale: 0.86, filter: "blur(12px)" }
                }
                animate={
                  opened
                    ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                    : undefined
                }
                transition={{ delay: 0.35, duration: 1.15, ease: soft }}
              >
                {age}
              </motion.p>
            ) : null}

            <motion.h1
              className="mt-2 font-[family-name:var(--font-display)] text-4xl sm:text-5xl"
              style={{ color: "var(--hw-text)" }}
              initial={reduce || !opened ? false : { opacity: 0, y: 18 }}
              animate={opened ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.55, duration: 0.9, ease: soft }}
            >
              {name}
            </motion.h1>

            <motion.p
              className="mt-4 text-lg"
              style={{ color: "var(--hw-secondary)" }}
              initial={reduce || !opened ? false : { opacity: 0 }}
              animate={opened ? { opacity: 1 } : undefined}
              transition={{ delay: 0.75, duration: 0.8 }}
            >
              {data.copy.headline}
            </motion.p>

            <motion.div
              className="mx-auto mt-10 h-px w-24"
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--hw-accent), transparent)",
              }}
              initial={reduce || !opened ? false : { scaleX: 0 }}
              animate={opened ? { scaleX: 1 } : undefined}
              transition={{ delay: 0.95, duration: 0.9, ease: soft }}
            />
          </motion.div>
        </section>

        {/* Wish letter */}
        <section className="relative mx-auto max-w-lg px-6 pb-8">
          <Reveal>
            <div
              className="relative overflow-hidden rounded-[1.75rem] border px-7 py-9 sm:px-10"
              style={{
                borderColor: "color-mix(in srgb, var(--hw-accent) 35%, transparent)",
                background:
                  "linear-gradient(165deg, rgba(18,24,51,0.92), rgba(12,16,36,0.88))",
                boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
              }}
            >
              <p
                className="text-[11px] tracking-[0.32em] uppercase"
                style={{ color: "var(--hw-accent)" }}
              >
                A wish across the sky
              </p>
              <p className="mt-5 text-base leading-8 sm:text-lg">
                {data.copy.message}
              </p>
            </div>
          </Reveal>
        </section>

        {/* Silhouette scene */}
        <section className="relative mx-auto max-w-xl px-6 py-16 text-center">
          <Reveal>
            <p
              className="mb-6 text-[11px] tracking-[0.32em] uppercase"
              style={{ color: "var(--hw-muted)" }}
            >
              When paths cross
            </p>
            <SkyWatchers />
            <p className="mt-4 text-sm" style={{ color: "var(--hw-muted)" }}>
              Original scene · inspired by the dusk of{" "}
              <span style={{ color: "var(--hw-secondary)" }}>Your Name</span>
            </p>
          </Reveal>
        </section>

        {/* Cinematic stills */}
        {data.media.photos.length > 0 ? (
          <section className="relative mx-auto max-w-5xl px-6 py-10">
            <Reveal>
              <p
                className="mb-8 text-center text-[11px] tracking-[0.32em] uppercase"
                style={{ color: "var(--hw-accent)" }}
              >
                Still frames
              </p>
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-3">
              {data.media.photos.map((photo, index) => (
                <Reveal key={photo.src} delay={index * 0.1}>
                  <figure className="group relative overflow-hidden rounded-2xl">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(7,11,26,0.75) 0%, transparent 45%)",
                        }}
                      />
                    </div>
                    {photo.caption ? (
                      <figcaption
                        className="absolute right-0 bottom-0 left-0 px-4 pb-4 text-sm tracking-[0.18em] uppercase"
                        style={{ color: "var(--hw-text)" }}
                      >
                        {photo.caption}
                      </figcaption>
                    ) : null}
                  </figure>
                </Reveal>
              ))}
            </div>
          </section>
        ) : null}

        {/* Party / RSVP */}
        <section className="relative mx-auto max-w-md px-6 py-20">
          <Reveal>
            {data.event ? (
              <div className="mb-10 text-center">
                <p
                  className="text-[11px] tracking-[0.32em] uppercase"
                  style={{ color: "var(--hw-accent)" }}
                >
                  The gathering
                </p>
                <p className="mt-3 font-[family-name:var(--font-display)] text-2xl">
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

        <footer className="px-6 pb-16 text-center">
          <Reveal>
            <p
              className="font-[family-name:var(--font-display)] text-xl"
              style={{ color: "var(--hw-secondary)" }}
            >
              {name}
            </p>
            <p
              className="mt-2 text-[11px] tracking-[0.28em] uppercase"
              style={{ color: "var(--hw-muted)" }}
            >
              See you under the comet
            </p>
          </Reveal>
        </footer>
      </motion.div>

      {opened && data.extras.backgroundMusic && data.media.music ? (
        <MusicToggle track={data.media.music} />
      ) : null}
    </main>
  );
}
