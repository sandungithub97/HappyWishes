"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ConfettiBurst } from "@/templates/_shared/components/ConfettiBurst";
import { FadeIn } from "@/templates/_shared/components/FadeIn";
import { MusicToggle } from "@/templates/_shared/components/MusicToggle";
import { PlaceLink } from "@/templates/_shared/components/VenueMap";
import { displayNames } from "@/templates/_shared/people";
import { themeStyle } from "@/templates/_shared/theme";
import type { TemplateData } from "@/templates/_shared/types";

const spring = { type: "spring" as const, stiffness: 280, damping: 18 };

const stickerSlots: Array<{
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  delay: number;
}> = [
  { top: "8%", left: "6%", delay: 0 },
  { top: "14%", right: "8%", delay: 0.15 },
  { top: "38%", left: "3%", delay: 0.3 },
  { top: "42%", right: "4%", delay: 0.22 },
  { bottom: "18%", left: "10%", delay: 0.4 },
  { bottom: "14%", right: "9%", delay: 0.28 },
];

const photoTilt = ["-rotate-3", "rotate-2", "-rotate-1"];

export function Experience({ data }: { data: TemplateData }) {
  const reduce = useReducedMotion();
  const [inRsvp, setInRsvp] = useState(false);
  const rsvpKey = `hw-rsvp-${data.meta.slug}`;
  const name = displayNames(data.people)[0] ?? data.people[0]?.name ?? "";
  const age = data.extras.milestoneAge;
  const stickers = data.extras.stickers ?? [];
  const confettiColors = [
    data.palette.primary,
    data.palette.secondary,
    data.palette.accent,
    "#ffffff",
  ];

  useEffect(() => {
    try {
      setInRsvp(window.localStorage.getItem(rsvpKey) === "yes");
    } catch {
      /* ignore */
    }
  }, [rsvpKey]);

  return (
    <main
      className="relative min-h-svh overflow-x-hidden bg-[var(--hw-bg)] font-[family-name:var(--font-body)] text-[var(--hw-text)]"
      style={themeStyle(data.palette)}
    >
      <ConfettiBurst colors={confettiColors} />

      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background: `
            radial-gradient(ellipse at 15% 0%, color-mix(in srgb, var(--hw-primary) 34%, transparent), transparent 42%),
            radial-gradient(ellipse at 90% 10%, color-mix(in srgb, var(--hw-accent) 28%, transparent), transparent 40%),
            radial-gradient(ellipse at 50% 100%, color-mix(in srgb, var(--hw-secondary) 16%, transparent), transparent 48%)
          `,
        }}
      />

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
            initial={reduce ? false : { scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ ...spring, delay: 0.35 + slot.delay }}
          >
            {sticker}
          </motion.span>
        );
      })}

      <section className="relative flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center">
        <motion.p
          className="text-[11px] font-extrabold tracking-[0.34em] uppercase"
          style={{ color: "var(--hw-accent)" }}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {data.copy.subhead}
        </motion.p>

        {age ? (
          <motion.p
            className="mt-4 font-[family-name:var(--font-display)] text-[7.5rem] leading-none font-semibold sm:text-[10rem]"
            style={{
              color: "var(--hw-secondary)",
              textShadow: "0 12px 0 color-mix(in srgb, var(--hw-primary) 55%, transparent)",
            }}
            initial={reduce ? false : { scale: 0.4, rotate: -8 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={spring}
          >
            {age}
          </motion.p>
        ) : null}

        <motion.h1
          className="mt-2 font-[family-name:var(--font-display)] text-5xl font-semibold sm:text-7xl"
          style={{ color: "var(--hw-text)" }}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.15 }}
        >
          {name}
        </motion.h1>

        <motion.p
          className="mt-5 max-w-md text-base leading-7 sm:text-lg"
          style={{ color: "var(--hw-muted)" }}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.6 }}
        >
          {data.copy.headline}
        </motion.p>

        {data.copy.cta ? (
          <motion.a
            href="#details"
            className="mt-10 inline-flex rounded-full px-8 py-3.5 text-sm font-extrabold tracking-wide uppercase shadow-[0_8px_0_var(--hw-primary)] transition-transform hover:-translate-y-0.5 active:translate-y-1 active:shadow-none"
            style={{
              background: "var(--hw-secondary)",
              color: "var(--hw-bg)",
            }}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, ...spring }}
          >
            {data.copy.cta}
          </motion.a>
        ) : null}
      </section>

      {data.media.photos.length > 0 ? (
        <section className="relative mx-auto max-w-5xl px-6 py-8 sm:py-16">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
            {data.media.photos.map((photo, index) => (
              <FadeIn key={photo.src} delay={index * 0.08} className={index === 2 ? "col-span-2 sm:col-span-1" : ""}>
                <div
                  className={`overflow-hidden rounded-[1.6rem] border-4 bg-[var(--hw-surface)] p-2 shadow-xl ${photoTilt[index % photoTilt.length]}`}
                  style={{ borderColor: "var(--hw-surface)" }}
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.1rem]">
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
                      className="px-2 py-3 text-center font-[family-name:var(--font-display)] text-sm"
                      style={{ color: "var(--hw-secondary)" }}
                    >
                      {photo.caption}
                    </p>
                  ) : null}
                </div>
              </FadeIn>
            ))}
          </div>
        </section>
      ) : null}

      <section className="relative mx-auto max-w-xl px-6 py-16 text-center sm:py-24">
        <FadeIn>
          <p
            className="font-[family-name:var(--font-display)] text-2xl leading-9 sm:text-3xl sm:leading-10"
            style={{ color: "var(--hw-text)" }}
          >
            {data.copy.message}
          </p>
        </FadeIn>
      </section>

      <section id="details" className="relative mx-auto max-w-lg scroll-mt-8 px-6 pb-28">
        <FadeIn>
          <div
            className="rounded-[2rem] border px-8 py-10 text-center"
            style={{
              background: "var(--hw-surface)",
              borderColor: "var(--hw-border)",
            }}
          >
            <p
              className="text-[11px] font-extrabold tracking-[0.32em] uppercase"
              style={{ color: "var(--hw-accent)" }}
            >
              The party
            </p>
            {data.event?.timeLabel ? (
              <p
                className="mt-5 font-[family-name:var(--font-display)] text-2xl"
                style={{ color: "var(--hw-secondary)" }}
              >
                {data.event.timeLabel}
              </p>
            ) : null}
            {data.event?.place ? (
              <PlaceLink place={data.event.place} className="mt-3 block">
                <span className="block text-base underline underline-offset-4" style={{ color: "var(--hw-text)" }}>
                  {data.event.place.name}
                </span>
                {data.event.place.city ? (
                  <span className="mt-1 block text-sm" style={{ color: "var(--hw-muted)" }}>
                    {data.event.place.city}
                  </span>
                ) : null}
              </PlaceLink>
            ) : null}

            {data.extras.rsvp?.enabled ? (
              <button
                type="button"
                onClick={() => {
                  setInRsvp(true);
                  try {
                    window.localStorage.setItem(rsvpKey, "yes");
                  } catch {
                    /* ignore */
                  }
                }}
                className="mt-8 w-full rounded-full py-3.5 text-sm font-extrabold tracking-wide uppercase transition-transform hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: inRsvp ? "var(--hw-accent)" : "var(--hw-primary)",
                  color: "var(--hw-bg)",
                }}
              >
                {inRsvp ? "You're on the list" : data.copy.cta ?? "I'm in"}
              </button>
            ) : null}
            {data.extras.rsvp?.note ? (
              <p className="mt-3 text-xs" style={{ color: "var(--hw-muted)" }}>
                {data.extras.rsvp.note}
              </p>
            ) : null}
          </div>
        </FadeIn>
      </section>

      {data.extras.backgroundMusic && data.media.music ? (
        <MusicToggle track={data.media.music} />
      ) : null}
    </main>
  );
}
