"use client";

import { motion, useReducedMotion } from "motion/react";
import type { TemplateData } from "@/templates/_shared/types";
import { Countdown } from "@/templates/_shared/components/Countdown";
import { FadeIn } from "@/templates/_shared/components/FadeIn";
import { MusicToggle } from "@/templates/_shared/components/MusicToggle";
import { PhotoCarousel } from "@/templates/_shared/components/PhotoCarousel";
import { PlaceLink } from "@/templates/_shared/components/VenueMap";
import { displayNames, monogram } from "@/templates/_shared/people";
import { themeStyle } from "@/templates/_shared/theme";

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

export function Experience({ data }: { data: TemplateData }) {
  const reduce = useReducedMotion();
  const names = displayNames(data.people);
  const mark = monogram(data.people);
  const [first, second] = names;

  return (
    <main
      className="relative min-h-svh overflow-x-hidden bg-[var(--hw-bg)] font-[family-name:var(--font-body)] text-[var(--hw-text)]"
      style={themeStyle(data.palette)}
    >
      <div className="hw-grain pointer-events-none absolute inset-0 z-10" />

      <section className="relative flex min-h-svh flex-col items-center justify-center px-6 py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background: `radial-gradient(ellipse at 50% 18%, color-mix(in srgb, var(--hw-accent) 70%, transparent), transparent 58%)`,
          }}
        />

        <div className="relative mx-auto w-full max-w-3xl px-4 py-16 sm:px-12 sm:py-20">
          <Corner className="absolute top-0 left-0" />
          <Corner className="absolute top-0 right-0 rotate-90" />
          <Corner className="absolute bottom-0 left-0 -rotate-90" />
          <Corner className="absolute right-0 bottom-0 rotate-180" />

          <motion.div
            className="flex flex-col items-center text-center"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.16, delayChildren: 0.12 },
              },
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.92 },
                show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease } },
              }}
              className="flex h-16 w-16 items-center justify-center rounded-full border"
              style={{
                borderColor: "var(--hw-primary)",
                color: "var(--hw-primary)",
              }}
            >
              <span className="font-[family-name:var(--font-display)] text-xl tracking-[0.2em]">
                {mark}
              </span>
            </motion.div>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.85, ease } },
              }}
              className="mt-8 text-[11px] font-medium tracking-[0.38em] uppercase"
              style={{ color: "var(--hw-muted)" }}
            >
              The wedding of
            </motion.p>

            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 22 },
                show: { opacity: 1, y: 0, transition: { duration: 1, ease } },
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
                show: { opacity: 1, transition: { duration: 0.8, ease } },
              }}
              className="mt-8"
            >
              <Flourish />
            </motion.div>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.85, ease } },
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
                  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease } },
                }}
                className="mt-6 font-[family-name:var(--font-display)] text-lg tracking-wide sm:text-xl"
                style={{ color: "var(--hw-secondary)" }}
              >
                {data.event.timeLabel}
              </motion.p>
            ) : null}
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <span
            className="text-[9px] tracking-[0.28em] uppercase"
            style={{ color: "var(--hw-muted)" }}
          >
            Scroll
          </span>
          <motion.span
            className="block h-8 w-px"
            style={{ background: "var(--hw-primary)" }}
            animate={reduce ? undefined : { scaleY: [0.4, 1, 0.4], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {data.extras.photoCarousel && data.media.photos.length > 0 ? (
        <section className="relative px-0 py-8 sm:px-8 sm:py-16">
          <FadeIn>
            <PhotoCarousel photos={data.media.photos} />
          </FadeIn>
        </section>
      ) : null}

      <section className="relative mx-auto max-w-2xl px-6 py-20 sm:py-28">
        <FadeIn>
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
        </FadeIn>
      </section>

      {data.extras.countdown && data.event?.date ? (
        <section className="relative px-6 py-8 sm:py-12">
          <FadeIn>
            <Countdown date={data.event.date} />
          </FadeIn>
        </section>
      ) : null}

      {data.event?.place || data.event?.timeLabel ? (
        <section className="relative mx-auto max-w-3xl px-6 py-20 sm:py-28">
          <FadeIn>
            <div
              className="grid gap-10 rounded-3xl border px-8 py-12 sm:grid-cols-2 sm:gap-0 sm:px-0 sm:py-14"
              style={{
                borderColor: "var(--hw-border)",
                background: "var(--hw-surface)",
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
                    <span className="mt-2 block text-sm" style={{ color: "var(--hw-muted)" }}>
                      {data.event.place.city}
                    </span>
                  ) : null}
                </PlaceLink>
              </div>
            </div>
          </FadeIn>
        </section>
      ) : null}

      <footer className="relative px-6 pb-24 pt-8 text-center">
        <FadeIn>
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
        </FadeIn>
      </footer>

      {data.extras.backgroundMusic && data.media.music ? (
        <MusicToggle track={data.media.music} />
      ) : null}
    </main>
  );
}
