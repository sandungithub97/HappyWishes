"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useState } from "react";
import { Countdown } from "@/templates/_shared/components/Countdown";
import { MusicToggle } from "@/templates/_shared/components/MusicToggle";
import { ParticleField } from "@/templates/_shared/components/ParticleField";
import { PhotoCarousel } from "@/templates/_shared/components/PhotoCarousel";
import { Reveal } from "@/templates/_shared/components/Reveal";
import { ScrollHint } from "@/templates/_shared/components/ScrollHint";
import { TextureOverlay } from "@/templates/_shared/components/TextureOverlay";
import { PlaceLink } from "@/templates/_shared/components/VenueMap";
import { displayNames, monogram } from "@/templates/_shared/people";
import { themeStyle } from "@/templates/_shared/theme";
import type { TemplateData } from "@/templates/_shared/types";

const ease = [0.22, 1, 0.36, 1] as const;

function Flourish() {
  return (
    <svg
      width="120"
      height="12"
      viewBox="0 0 120 12"
      fill="none"
      aria-hidden
      className="mx-auto"
      style={{ color: "var(--hw-primary)" }}
    >
      <path d="M0 6h46" stroke="currentColor" strokeWidth="0.7" />
      <path d="M74 6h46" stroke="currentColor" strokeWidth="0.7" />
      <circle cx="60" cy="6" r="2.2" fill="currentColor" />
      <circle cx="60" cy="6" r="5" stroke="currentColor" strokeWidth="0.6" fill="none" />
    </svg>
  );
}

function Corner({ className }: { className: string }) {
  return (
    <svg
      className={className}
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      aria-hidden
      style={{ color: "var(--hw-primary)" }}
    >
      <path d="M6 50V10h40" stroke="currentColor" strokeWidth="0.8" />
      <path d="M6 18h10M14 10v10" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  );
}

function WaxSeal({ mark }: { mark: string }) {
  return (
    <div className="relative mx-auto h-24 w-24">
      <svg viewBox="0 0 96 96" className="h-full w-full" aria-hidden>
        <defs>
          <radialGradient id="waxFill" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#D4B06A" />
            <stop offset="55%" stopColor="#B8913F" />
            <stop offset="100%" stopColor="#8A6A28" />
          </radialGradient>
        </defs>
        <circle cx="48" cy="48" r="40" fill="url(#waxFill)" />
        <circle
          cx="48"
          cy="48"
          r="34"
          fill="none"
          stroke="rgba(255,248,220,0.35)"
          strokeWidth="1.2"
        />
        <circle
          cx="48"
          cy="48"
          r="28"
          fill="none"
          stroke="rgba(255,248,220,0.2)"
          strokeWidth="0.8"
          strokeDasharray="2 3"
        />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center font-[family-name:var(--font-display)] text-lg tracking-[0.18em]"
        style={{ color: "#FFF8E8", textShadow: "0 1px 2px rgba(0,0,0,0.25)" }}
      >
        {mark}
      </span>
    </div>
  );
}

function EnvelopeGate({
  names,
  mark,
  onOpen,
}: {
  names: string;
  mark: string;
  onOpen: () => void;
}) {
  const reduce = useReducedMotion();
  const [opening, setOpening] = useState(false);

  function open() {
    if (opening) return;
    setOpening(true);
    window.setTimeout(onOpen, reduce ? 200 : 1400);
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden px-6"
      style={{
        background: `
          radial-gradient(ellipse at 50% 20%, #f5e8c8 0%, transparent 50%),
          #FBF7F0
        `,
      }}
      exit={
        reduce
          ? { opacity: 0 }
          : { opacity: 0, transition: { duration: 0.5, delay: 0.05 } }
      }
    >
      <ParticleField
        variant="bokeh"
        count={18}
        colors={[
          "rgba(196,163,90,0.4)",
          "rgba(232,213,163,0.3)",
          "rgba(255,255,255,0.25)",
        ]}
      />
      <TextureOverlay variant="paper" opacity={0.4} />

      <motion.div
        className="relative w-full max-w-md"
        animate={
          opening && !reduce
            ? { opacity: 0, y: -24, scale: 0.96 }
            : { opacity: 1, y: 0, scale: 1 }
        }
        transition={{ duration: 0.7, ease }}
      >
        {/* Envelope body */}
        <div
          className="relative overflow-hidden rounded-sm border px-8 pt-10 pb-12 text-center shadow-[0_24px_60px_rgba(44,36,22,0.12)]"
          style={{
            background: "linear-gradient(180deg, #FFFDF8 0%, #F7EFE0 100%)",
            borderColor: "#E6D9C2",
          }}
        >
          {/* Flap */}
          <motion.div
            className="pointer-events-none absolute top-0 right-0 left-0 h-28 origin-top"
            style={{
              background:
                "linear-gradient(180deg, #EFE2C8 0%, #E6D5B0 100%)",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              borderBottom: "1px solid #D9C8A4",
            }}
            animate={
              opening && !reduce
                ? { rotateX: -160, opacity: 0.3 }
                : { rotateX: 0, opacity: 1 }
            }
            transition={{ duration: 0.9, ease }}
          />

          <motion.div
            className="relative z-10"
            animate={
              opening && !reduce
                ? { y: -8, scale: 0.98 }
                : { y: 0, scale: 1 }
            }
          >
            <motion.div
              initial={reduce ? false : { scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease, delay: 0.15 }}
            >
              <WaxSeal mark={mark} />
            </motion.div>

            <motion.p
              className="mt-8 text-[11px] tracking-[0.38em] uppercase"
              style={{ color: "#8A7A62" }}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.8, ease }}
            >
              You are invited
            </motion.p>

            <motion.p
              className="mt-4 font-[family-name:var(--font-display)] text-3xl italic leading-snug sm:text-4xl"
              style={{ color: "#2C2416" }}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.9, ease }}
            >
              {names}
            </motion.p>

            <motion.button
              type="button"
              onClick={open}
              className="mt-10 rounded-full border px-8 py-3.5 text-[11px] tracking-[0.32em] uppercase transition-transform hover:scale-[1.03] active:scale-[0.98]"
              style={{
                borderColor: "#C4A35A",
                background:
                  "linear-gradient(180deg, #FFFDF8 0%, #F3E6C8 100%)",
                color: "#2C2416",
                boxShadow: "0 10px 28px rgba(196,163,90,0.22)",
              }}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8, ease }}
              whileHover={reduce ? undefined : { scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
            >
              Break the seal
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Experience({ data }: { data: TemplateData }) {
  const reduce = useReducedMotion();
  const names = displayNames(data.people);
  const mark = monogram(data.people);
  const [first, second] = names;
  const coupleLine = names.join(" & ");
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
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, reduce ? 0 : -42]);
  const heroFade = useTransform(
    scrollYProgress,
    [0, 0.18],
    [1, reduce ? 1 : 0.45],
  );
  const glowY = useTransform(scrollYProgress, [0, 0.3], [0, reduce ? 0 : 60]);

  return (
    <main
      className="relative min-h-svh overflow-x-hidden bg-[var(--hw-bg)] font-[family-name:var(--font-body)] text-[var(--hw-text)]"
      style={themeStyle(data.palette)}
    >
      <AnimatePresence>
        {!opened ? (
          <EnvelopeGate
            key="gate"
            names={coupleLine}
            mark={mark}
            onOpen={() => setOpened(true)}
          />
        ) : null}
      </AnimatePresence>

      <TextureOverlay variant="grain" opacity={0.28} />
      {opened ? (
        <ParticleField
          variant="bokeh"
          count={22}
          colors={[
            "rgba(196,163,90,0.38)",
            "rgba(232,213,163,0.28)",
            "rgba(255,255,255,0.2)",
          ]}
        />
      ) : null}

      <motion.div
        initial={false}
        animate={
          opened
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0, y: 20, filter: "blur(8px)" }
        }
        transition={{ duration: 1.05, ease, delay: opened ? 0.05 : 0 }}
      >
        <section className="relative flex min-h-svh flex-col items-center justify-center px-6 py-20">
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-90"
            style={{
              y: glowY,
              background: `radial-gradient(ellipse at 50% 18%, color-mix(in srgb, var(--hw-accent) 70%, transparent), transparent 58%)`,
            }}
          />

          <motion.div
            className="relative mx-auto w-full max-w-3xl px-4 py-16 sm:px-12 sm:py-20"
            style={{ y: heroY, opacity: heroFade }}
          >
            <Corner className="absolute top-0 left-0" />
            <Corner className="absolute top-0 right-0 rotate-90" />
            <Corner className="absolute bottom-0 left-0 -rotate-90" />
            <Corner className="absolute right-0 bottom-0 rotate-180" />

            <motion.div
              className="flex flex-col items-center text-center"
              initial="hidden"
              animate={opened ? "show" : "hidden"}
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: 0.14, delayChildren: 0.2 },
                },
              }}
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.88 },
                  show: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.85, ease },
                  },
                }}
                className="flex h-16 w-16 items-center justify-center rounded-full border"
                style={{
                  borderColor: "var(--hw-primary)",
                  color: "var(--hw-primary)",
                  boxShadow: "0 0 28px color-mix(in srgb, var(--hw-primary) 28%, transparent)",
                }}
              >
                <span className="font-[family-name:var(--font-display)] text-xl tracking-[0.2em]">
                  {mark}
                </span>
              </motion.div>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.85, ease },
                  },
                }}
                className="mt-8 text-[11px] font-medium tracking-[0.38em] uppercase"
                style={{ color: "var(--hw-muted)" }}
              >
                The wedding of
              </motion.p>

              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 22 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 1, ease },
                  },
                }}
                className="mt-4 font-[family-name:var(--font-display)] text-5xl leading-[1.05] sm:text-7xl md:text-8xl"
                style={{ color: "var(--hw-secondary)" }}
              >
                <span className="italic">{first}</span>
                {second ? (
                  <>
                    <span
                      className="mx-3 align-middle text-2xl not-italic sm:text-3xl"
                      style={{ color: "var(--hw-primary)" }}
                    >
                      &
                    </span>
                    <span className="italic">{second}</span>
                  </>
                ) : null}
              </motion.h1>

              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { duration: 0.8, ease },
                  },
                }}
                className="mt-8"
              >
                <Flourish />
              </motion.div>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.85, ease },
                  },
                }}
                className="mt-8 max-w-md text-sm leading-7 sm:text-base"
                style={{ color: "var(--hw-muted)" }}
              >
                {data.copy.subhead}
              </motion.p>

              {data.event?.timeLabel ? (
                <motion.p
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.85, ease },
                    },
                  }}
                  className="mt-6 font-[family-name:var(--font-display)] text-lg tracking-wide sm:text-xl"
                  style={{ color: "var(--hw-secondary)" }}
                >
                  {data.event.timeLabel}
                </motion.p>
              ) : null}
            </motion.div>
          </motion.div>

          {opened ? <ScrollHint /> : null}
        </section>

        {data.extras.photoCarousel && data.media.photos.length > 0 ? (
          <section className="relative px-0 py-8 sm:px-8 sm:py-16">
            <Reveal>
              <PhotoCarousel photos={data.media.photos} />
            </Reveal>
          </section>
        ) : null}

        <section className="relative mx-auto max-w-2xl px-6 py-20 sm:py-28">
          <Reveal>
            <p
              className="text-center text-[11px] tracking-[0.32em] uppercase"
              style={{ color: "var(--hw-primary)" }}
            >
              {data.copy.headline}
            </p>
            <p
              className="mt-8 text-center font-[family-name:var(--font-display)] text-2xl leading-10 italic sm:text-3xl sm:leading-[1.55]"
              style={{ color: "var(--hw-secondary)" }}
            >
              {data.copy.message}
            </p>
          </Reveal>
        </section>

        {data.extras.countdown && data.event?.date ? (
          <section className="relative px-6 py-8 sm:py-12">
            <Reveal delay={0.05}>
              <Countdown date={data.event.date} />
            </Reveal>
          </section>
        ) : null}

        {data.event?.place || data.event?.timeLabel ? (
          <section className="relative mx-auto max-w-3xl px-6 py-20 sm:py-28">
            <Reveal>
              <div
                className="grid gap-10 rounded-3xl border px-8 py-12 sm:grid-cols-2 sm:gap-0 sm:px-0 sm:py-14"
                style={{
                  borderColor: "var(--hw-border)",
                  background: "var(--hw-surface)",
                  boxShadow: "0 20px 50px rgba(44,36,22,0.06)",
                }}
              >
                <div className="text-center sm:px-10">
                  <p
                    className="text-[11px] tracking-[0.3em] uppercase"
                    style={{ color: "var(--hw-primary)" }}
                  >
                    When
                  </p>
                  <p
                    className="mt-4 font-[family-name:var(--font-display)] text-2xl leading-snug"
                    style={{ color: "var(--hw-secondary)" }}
                  >
                    {data.event.timeLabel ?? data.event.date}
                  </p>
                </div>
                <div
                  className="text-center sm:border-l sm:px-10"
                  style={{ borderColor: "var(--hw-border)" }}
                >
                  <p
                    className="text-[11px] tracking-[0.3em] uppercase"
                    style={{ color: "var(--hw-primary)" }}
                  >
                    Where
                  </p>
                  <PlaceLink place={data.event.place} className="mt-4 block">
                    <span
                      className="block font-[family-name:var(--font-display)] text-2xl leading-snug"
                      style={{ color: "var(--hw-secondary)" }}
                    >
                      {data.event.place?.name}
                    </span>
                    {data.event.place?.city ? (
                      <span
                        className="mt-2 block text-sm"
                        style={{ color: "var(--hw-muted)" }}
                      >
                        {data.event.place.city}
                      </span>
                    ) : null}
                  </PlaceLink>
                </div>
              </div>
            </Reveal>
          </section>
        ) : null}

        <footer className="relative px-6 pt-8 pb-24 text-center">
          <Reveal>
            <Flourish />
            <p
              className="mt-8 font-[family-name:var(--font-display)] text-3xl italic"
              style={{ color: "var(--hw-secondary)" }}
            >
              {data.copy.headline}
            </p>
            <p
              className="mt-3 text-sm tracking-[0.18em] uppercase"
              style={{ color: "var(--hw-muted)" }}
            >
              {names.join("  ·  ")}
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
