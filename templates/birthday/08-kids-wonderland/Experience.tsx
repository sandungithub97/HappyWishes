"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { FadeIn } from "@/templates/_shared/components/FadeIn";
import { RsvpCard } from "@/templates/_shared/components/RsvpCard";
import { PlaceLink } from "@/templates/_shared/components/VenueMap";
import { displayNames } from "@/templates/_shared/people";
import { themeStyle } from "@/templates/_shared/theme";
import type { TemplateData } from "@/templates/_shared/types";

const bubbles: Array<{
  size: number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  color: string;
}> = [
  { size: 88, top: "8%", left: "6%", color: "var(--hw-accent)" },
  { size: 56, top: "18%", right: "10%", color: "var(--hw-primary)" },
  { size: 72, bottom: "16%", left: "12%", color: "var(--hw-secondary)" },
  { size: 40, bottom: "22%", right: "8%", color: "var(--hw-accent)" },
];

export function Experience({ data }: { data: TemplateData }) {
  const reduce = useReducedMotion();
  const name = displayNames(data.people)[0] ?? "";
  const age = data.extras.milestoneAge;

  return (
    <main
      className="relative min-h-svh overflow-x-hidden bg-[var(--hw-bg)] font-[family-name:var(--font-body)] text-[var(--hw-text)]"
      style={themeStyle(data.palette)}
    >
      {bubbles.map((bubble, index) => (
        <motion.span
          key={index}
          className="pointer-events-none absolute rounded-full opacity-70"
          style={{
            width: bubble.size,
            height: bubble.size,
            top: bubble.top,
            left: bubble.left,
            right: bubble.right,
            bottom: bubble.bottom,
            background: bubble.color,
          }}
          animate={reduce ? undefined : { y: [0, -16, 0] }}
          transition={{ duration: 3 + index * 0.4, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <section className="relative flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center">
        <p className="text-sm font-bold tracking-wide" style={{ color: "var(--hw-secondary)" }}>
          {data.copy.subhead}
        </p>
        <motion.h1
          className="mt-3 font-[family-name:var(--font-display)] text-6xl sm:text-8xl"
          style={{ color: "var(--hw-primary)" }}
          animate={reduce ? undefined : { y: [0, -8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          {data.copy.headline}
        </motion.h1>
        {age ? (
          <p
            className="mt-2 font-[family-name:var(--font-display)] text-3xl"
            style={{ color: "var(--hw-secondary)" }}
          >
            {name} is {age}
          </p>
        ) : null}
        <p className="mt-6 max-w-md text-base leading-7" style={{ color: "var(--hw-muted)" }}>
          {data.copy.message}
        </p>
      </section>

      {data.media.photos.length > 0 ? (
        <section className="relative mx-auto grid max-w-4xl grid-cols-2 gap-4 px-6 pb-8 sm:grid-cols-3">
          {data.media.photos.map((photo, index) => (
            <FadeIn key={photo.src} delay={index * 0.06} className={index === 2 ? "col-span-2 sm:col-span-1" : ""}>
              <div
                className="relative aspect-square overflow-hidden rounded-[2rem] border-4"
                style={{ borderColor: "var(--hw-surface)" }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 30vw"
                  className="object-cover"
                />
              </div>
            </FadeIn>
          ))}
        </section>
      ) : null}

      <section className="relative mx-auto max-w-md px-6 py-16">
        <FadeIn>
          {data.event ? (
            <div
              className="mb-8 rounded-[2rem] border px-6 py-8 text-center"
              style={{
                background: "var(--hw-surface)",
                borderColor: "var(--hw-border)",
              }}
            >
              <p className="font-[family-name:var(--font-display)] text-2xl" style={{ color: "var(--hw-secondary)" }}>
                {data.event.timeLabel}
              </p>
              {data.event.place ? (
                <p className="mt-2 text-sm" style={{ color: "var(--hw-muted)" }}>
                  <PlaceLink place={data.event.place} className="underline underline-offset-4" />
                </p>
              ) : null}
            </div>
          ) : null}
          {data.extras.rsvp?.enabled ? (
            <RsvpCard
              note={data.extras.rsvp.note}
              cta={data.copy.cta}
              storageKey={`hw-rsvp-${data.meta.slug}-${data.meta.wishId}`}
            />
          ) : null}
        </FadeIn>
      </section>
    </main>
  );
}
