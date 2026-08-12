"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { ConfettiBurst } from "@/templates/_shared/components/ConfettiBurst";
import { FadeIn } from "@/templates/_shared/components/FadeIn";
import { PlaceLink } from "@/templates/_shared/components/VenueMap";
import { displayNames } from "@/templates/_shared/people";
import { themeStyle } from "@/templates/_shared/theme";
import type { TemplateData } from "@/templates/_shared/types";

export function Experience({ data }: { data: TemplateData }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const name = displayNames(data.people)[0] ?? "";
  const lockedPhoto = data.media.photos[0];
  const reveal = data.extras.reveal;

  return (
    <main
      className="relative min-h-svh overflow-x-hidden bg-[var(--hw-bg)] font-[family-name:var(--font-body)] text-[var(--hw-text)]"
      style={themeStyle(data.palette)}
    >
      <AnimatePresence>
        {!open ? (
          <motion.button
            key="lock"
            type="button"
            onClick={() => setOpen(true)}
            className="fixed inset-0 z-50 flex cursor-pointer flex-col items-center justify-center px-6"
            exit={reduce ? { opacity: 0 } : { opacity: 0, filter: "blur(20px)", scale: 1.04 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {lockedPhoto ? (
              <Image
                src={lockedPhoto.src}
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover blur-2xl brightness-50"
              />
            ) : null}
            <div className="relative z-10 text-center">
              <p
                className="text-[11px] tracking-[0.36em] uppercase"
                style={{ color: "var(--hw-primary)" }}
              >
                {reveal?.lockedLabel ?? data.copy.cta}
              </p>
              <p
                className="mt-6 font-[family-name:var(--font-display)] text-3xl italic sm:text-5xl"
                style={{ color: "var(--hw-text)" }}
              >
                {data.copy.cta}
              </p>
            </div>
          </motion.button>
        ) : null}
      </AnimatePresence>

      {open ? (
        <ConfettiBurst
          colors={[data.palette.primary, data.palette.secondary, data.palette.accent, "#ffffff"]}
        />
      ) : null}

      <section className="relative flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center">
        <p className="text-[11px] tracking-[0.32em] uppercase" style={{ color: "var(--hw-primary)" }}>
          {data.copy.subhead}
        </p>
        <h1
          className="mt-5 font-[family-name:var(--font-display)] text-4xl italic sm:text-6xl"
          style={{ color: "var(--hw-secondary)" }}
        >
          {reveal?.unlockedHeadline ?? data.copy.headline}
        </h1>
        {data.extras.milestoneAge ? (
          <p className="mt-4 text-sm tracking-[0.2em] uppercase" style={{ color: "var(--hw-muted)" }}>
            {name} · {data.extras.milestoneAge}
          </p>
        ) : null}
        <p className="mt-8 max-w-md text-base leading-7" style={{ color: "var(--hw-muted)" }}>
          {data.copy.message}
        </p>
      </section>

      {data.media.photos.length > 0 ? (
        <section className="mx-auto grid max-w-4xl grid-cols-2 gap-3 px-6 pb-8 sm:grid-cols-3">
          {data.media.photos.map((photo) => (
            <FadeIn key={photo.src}>
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            </FadeIn>
          ))}
        </section>
      ) : null}

      {data.event ? (
        <footer className="px-6 py-16 text-center">
          <FadeIn>
            <p className="font-[family-name:var(--font-display)] text-2xl" style={{ color: "var(--hw-secondary)" }}>
              {data.event.timeLabel}
            </p>
            {data.event.place ? (
              <p className="mt-2 text-sm" style={{ color: "var(--hw-muted)" }}>
                <PlaceLink place={data.event.place} className="underline underline-offset-4" />
              </p>
            ) : null}
          </FadeIn>
        </footer>
      ) : null}
    </main>
  );
}
