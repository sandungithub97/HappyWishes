"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { ConfettiBurst } from "@/templates/_shared/components/ConfettiBurst";
import { FadeIn } from "@/templates/_shared/components/FadeIn";
import { MusicToggle } from "@/templates/_shared/components/MusicToggle";
import { RsvpCard } from "@/templates/_shared/components/RsvpCard";
import { PlaceLink } from "@/templates/_shared/components/VenueMap";
import { displayNames } from "@/templates/_shared/people";
import { themeStyle } from "@/templates/_shared/theme";
import type { TemplateData } from "@/templates/_shared/types";

const stickerSlots: Array<{
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  delay: number;
}> = [
  { top: "7%", left: "5%", delay: 0 },
  { top: "12%", right: "7%", delay: 0.12 },
  { top: "40%", left: "3%", delay: 0.24 },
  { top: "44%", right: "4%", delay: 0.18 },
  { bottom: "16%", left: "8%", delay: 0.3 },
  { bottom: "12%", right: "8%", delay: 0.22 },
];

const panelTilt = ["-rotate-2", "rotate-1", "rotate-2"];

export function Experience({ data }: { data: TemplateData }) {
  const reduce = useReducedMotion();
  const name = displayNames(data.people)[0] ?? "";
  const age = data.extras.milestoneAge;
  const stickers = data.extras.stickers ?? [];

  return (
    <main
      className="relative min-h-svh overflow-x-hidden bg-[var(--hw-bg)] font-[family-name:var(--font-body)] text-[var(--hw-text)]"
      style={themeStyle(data.palette)}
    >
      <ConfettiBurst
        colors={[
          data.palette.primary,
          data.palette.secondary,
          data.palette.accent,
          "#ffffff",
        ]}
        variant="sparkle"
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 0%, color-mix(in srgb, var(--hw-primary) 28%, transparent), transparent 45%),
            radial-gradient(ellipse at 90% 15%, color-mix(in srgb, var(--hw-accent) 22%, transparent), transparent 40%)
          `,
        }}
      />

      {stickers.map((sticker, index) => {
        const slot = stickerSlots[index % stickerSlots.length];
        return (
          <motion.span
            key={`${sticker}-${index}`}
            className="hw-float pointer-events-none absolute z-20 text-3xl sm:text-4xl"
            style={{
              top: slot.top,
              left: slot.left,
              right: slot.right,
              bottom: slot.bottom,
              color: "var(--hw-secondary)",
              animationDelay: `${slot.delay}s`,
            }}
            initial={reduce ? false : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 + slot.delay }}
          >
            {sticker}
          </motion.span>
        );
      })}

      <section className="relative flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center">
        <p
          className="text-sm tracking-[0.28em]"
          style={{ color: "var(--hw-accent)" }}
        >
          {data.copy.subhead}
        </p>
        {age ? (
          <h1
            className="mt-3 font-[family-name:var(--font-display)] text-[7rem] leading-none font-extrabold sm:text-[9rem]"
            style={{
              color: "var(--hw-primary)",
              textShadow: "6px 6px 0 var(--hw-secondary)",
            }}
          >
            {age}
          </h1>
        ) : null}
        <p
          className="mt-2 font-[family-name:var(--font-display)] text-4xl font-extrabold sm:text-6xl"
          style={{ color: "var(--hw-text)" }}
        >
          {name}
        </p>
        <p className="mt-3 text-lg" style={{ color: "var(--hw-secondary)" }}>
          {data.copy.headline}
        </p>

        <div
          className="relative mt-10 max-w-md rounded-[2rem] rounded-bl-sm border px-6 py-5 text-left"
          style={{
            background: "var(--hw-surface)",
            borderColor: "var(--hw-border)",
          }}
        >
          <p className="text-base leading-7">{data.copy.message}</p>
          <span
            className="absolute -bottom-3 left-8 h-0 w-0 border-x-[12px] border-t-[14px] border-x-transparent"
            style={{ borderTopColor: "var(--hw-surface)" }}
          />
        </div>
      </section>

      {data.media.photos.length > 0 ? (
        <section className="relative mx-auto grid max-w-5xl grid-cols-2 gap-4 px-6 pb-8 sm:grid-cols-3">
          {data.media.photos.map((photo, index) => (
            <FadeIn key={photo.src} delay={index * 0.08}>
              <div
                className={`overflow-hidden border-4 bg-[var(--hw-surface)] p-2 ${panelTilt[index % panelTilt.length]}`}
                style={{ borderColor: "var(--hw-text)" }}
              >
                <div className="relative aspect-[3/4]">
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
                    className="mt-2 text-center font-[family-name:var(--font-display)] text-sm font-bold"
                    style={{ color: "var(--hw-secondary)" }}
                  >
                    {photo.caption}
                  </p>
                ) : null}
              </div>
            </FadeIn>
          ))}
        </section>
      ) : null}

      <section className="relative mx-auto max-w-md px-6 py-16">
        <FadeIn>
          {data.event ? (
            <div className="mb-8 text-center">
              <p className="text-[11px] tracking-[0.28em] uppercase" style={{ color: "var(--hw-accent)" }}>
                Next episode
              </p>
              <p className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold">
                {data.event.timeLabel}
              </p>
              {data.event.place ? (
                <p className="mt-1 text-sm" style={{ color: "var(--hw-muted)" }}>
                  <PlaceLink place={data.event.place} className="underline underline-offset-4" />
                </p>
              ) : null}
            </div>
          ) : null}
          {data.extras.rsvp?.enabled ? (
            <RsvpCard
              note={data.extras.rsvp.note}
              cta={data.copy.cta}
              storageKey={`hw-rsvp-${data.meta.slug}`}
            />
          ) : null}
        </FadeIn>
      </section>

      {data.extras.backgroundMusic && data.media.music ? (
        <MusicToggle track={data.media.music} />
      ) : null}
    </main>
  );
}
