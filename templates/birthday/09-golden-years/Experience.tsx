"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import type { TemplateData } from "@/templates/_shared/types";
import { RsvpCard } from "@/templates/_shared/components/RsvpCard";
import { PlaceLink } from "@/templates/_shared/components/VenueMap";
import { MusicToggle } from "@/templates/_shared/components/MusicToggle";
import { Reveal } from "@/templates/_shared/components/Reveal";
import { ParticleField } from "@/templates/_shared/components/ParticleField";
import { TextureOverlay } from "@/templates/_shared/components/TextureOverlay";
import { ScrollHint } from "@/templates/_shared/components/ScrollHint";
import { ParallaxLayer } from "@/templates/_shared/components/ParallaxLayer";
import { displayNames } from "@/templates/_shared/people";
import { themeStyle } from "@/templates/_shared/theme";

const soft = [0.22, 1, 0.36, 1] as const;

function AlbumGate({
  name,
  onOpen,
}: {
  name: string;
  onOpen: () => void;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      style={{ background: "rgba(26,18,10,0.96)" }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.85 } }}
    >
      <TextureOverlay variant="grain" opacity={0.14} />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 45%, rgba(212,175,55,0.12) 0%, transparent 65%)",
        }}
      />

      <motion.div
        className="relative w-full max-w-sm"
        initial={reduce ? false : { scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: soft }}
      >
        <div className="relative aspect-[4/5] perspective-[1200px]">
          <motion.div
            className="absolute inset-y-0 left-0 z-20 w-1/2 origin-left rounded-l-xl border border-r-0"
            style={{
              background:
                "linear-gradient(135deg, #3d2817 0%, #2a1a0e 50%, #1f1409 100%)",
              borderColor: "rgba(212,175,55,0.35)",
              boxShadow: "inset -4px 0 12px rgba(0,0,0,0.4)",
            }}
            initial={{ rotateY: 0 }}
            animate={reduce ? {} : { rotateY: -108 }}
            transition={{ delay: 0.6, duration: 1.4, ease: soft }}
          >
            <div className="flex h-full flex-col items-center justify-center p-6">
              <span
                className="font-[family-name:var(--font-display)] text-2xl tracking-wide"
                style={{ color: "var(--hw-accent)" }}
              >
                Memories
              </span>
              <div
                className="mt-4 h-px w-16"
                style={{ background: "rgba(212,175,55,0.5)" }}
              />
              <p
                className="mt-4 text-center text-xs tracking-[0.2em] uppercase"
                style={{ color: "var(--hw-muted)" }}
              >
                A life well lived
              </p>
            </div>
          </motion.div>

          <div
            className="absolute inset-y-0 right-0 w-1/2 rounded-r-xl border border-l-0"
            style={{
              background:
                "linear-gradient(225deg, #3d2817 0%, #2a1a0e 50%, #1f1409 100%)",
              borderColor: "rgba(212,175,55,0.35)",
              boxShadow: "inset 4px 0 12px rgba(0,0,0,0.35)",
            }}
          />

          <motion.div
            className="absolute inset-2 overflow-hidden rounded-lg border"
            style={{
              background: "var(--hw-surface)",
              borderColor: "rgba(212,175,55,0.25)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <div
              className="flex h-full flex-col items-center justify-center px-6 text-center"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,248,235,0.04) 0%, transparent 100%)",
              }}
            >
              <p
                className="text-[10px] tracking-[0.35em] uppercase"
                style={{ color: "var(--hw-accent)" }}
              >
                Golden years
              </p>
              <h2
                className="mt-4 font-[family-name:var(--font-display)] text-3xl"
                style={{ color: "var(--hw-text)" }}
              >
                {name}
              </h2>
              <motion.button
                type="button"
                onClick={onOpen}
                className="mt-8 rounded-full border px-8 py-3 text-sm tracking-[0.18em] uppercase transition-colors hover:bg-white/5"
                style={{
                  borderColor: "rgba(212,175,55,0.45)",
                  color: "var(--hw-accent)",
                }}
                whileHover={reduce ? undefined : { scale: 1.03 }}
                whileTap={reduce ? undefined : { scale: 0.98 }}
              >
                Open the album
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function KenBurnsPhoto({
  src,
  alt,
  index,
}: {
  src: string;
  alt: string;
  index: number;
}) {
  const reduce = useReducedMotion();
  const directions = [
    { scale: [1, 1.12], x: ["0%", "-4%"], y: ["0%", "-2%"] },
    { scale: [1.08, 1], x: ["-3%", "2%"], y: ["-2%", "1%"] },
    { scale: [1, 1.1], x: ["2%", "-2%"], y: ["1%", "-3%"] },
  ];
  const dir = directions[index % directions.length];

  return (
    <figure
      className="group relative overflow-hidden rounded-xl border shadow-lg"
      style={{
        borderColor: "rgba(212,175,55,0.2)",
        boxShadow: "0 16px 40px rgba(0,0,0,0.25)",
      }}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <motion.div
          className="absolute inset-[-8%]"
          animate={reduce ? undefined : dir}
          transition={{
            duration: 14 + index * 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            className="object-cover sepia-[0.35] contrast-[1.05]"
          />
        </motion.div>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(26,18,10,0.75) 0%, transparent 45%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, transparent 40%, rgba(26,18,10,0.6) 100%)",
          }}
        />
      </div>
    </figure>
  );
}

export function Experience({ data }: { data: TemplateData }) {
  const name = displayNames(data.people)[0] ?? "";
  const age = data.extras.milestoneAge;
  const photos = data.media.photos;
  const reduce = useReducedMotion();
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
  const grainOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.14, 0.08]);

  return (
    <main
      className="relative min-h-svh overflow-x-hidden bg-[var(--hw-bg)] font-[family-name:var(--font-body)] text-[var(--hw-text)]"
      style={themeStyle(data.palette)}
    >
      <AnimatePresence>
        {!opened ? (
          <AlbumGate key="gate" name={name} onOpen={() => setOpened(true)} />
        ) : null}
      </AnimatePresence>

      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 30%, rgba(212,175,55,0.08) 0%, transparent 55%), linear-gradient(180deg, var(--hw-bg) 0%, #1a120a 100%)",
        }}
      />
      {opened ? (
        <ParticleField
          variant="bokeh"
          count={28}
          colors={["rgba(212,175,55,0.55)", "rgba(255,230,180,0.4)", "rgba(196,163,90,0.35)"]}
          className="fixed inset-0 -z-[5] opacity-70"
        />
      ) : null}
      {opened ? (
        <motion.div className="pointer-events-none fixed inset-0 -z-[4]" style={{ opacity: grainOpacity }}>
          <TextureOverlay variant="grain" opacity={1} />
        </motion.div>
      ) : null}
      <TextureOverlay variant="vignette" opacity={0.65} className="fixed inset-0 -z-[3]" />

      <motion.div
        initial={false}
        animate={
          opened
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 24 }
        }
        transition={{ duration: 1, ease: soft, delay: opened ? 0.1 : 0 }}
      >
        <section className="relative flex min-h-svh flex-col items-center justify-center px-6 pt-20 pb-16 text-center">
          <ParallaxLayer distance={40}>
            <Reveal>
              <p
                className="text-[11px] tracking-[0.35em] uppercase"
                style={{ color: "var(--hw-accent)" }}
              >
                {data.copy.subhead ?? "Golden years"}
              </p>
              {age ? (
                <p
                  className="mt-6 font-[family-name:var(--font-display)] text-7xl sm:text-8xl"
                  style={{
                    color: "var(--hw-primary)",
                    textShadow: "0 0 48px rgba(212,175,55,0.35)",
                  }}
                >
                  {age}
                </p>
              ) : null}
              <h1
                className="mt-4 font-[family-name:var(--font-display)] text-4xl sm:text-5xl"
                style={{ color: "var(--hw-text)" }}
              >
                {name}
              </h1>
              <p
                className="mx-auto mt-4 max-w-md text-lg leading-relaxed"
                style={{ color: "var(--hw-secondary)" }}
              >
                {data.copy.headline}
              </p>
            </Reveal>
          </ParallaxLayer>
          {opened ? <ScrollHint /> : null}
        </section>

        {photos.length > 0 ? (
          <section className="mx-auto max-w-5xl px-6 py-16">
            <Reveal>
              <p
                className="mb-10 text-center text-[11px] tracking-[0.32em] uppercase"
                style={{ color: "var(--hw-accent)" }}
              >
                Through the years
              </p>
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {photos.map((photo, index) => (
                <Reveal key={photo.src} delay={index * 0.08}>
                  <KenBurnsPhoto
                    src={photo.src}
                    alt={photo.alt}
                    index={index}
                  />
                  {photo.caption ? (
                    <p
                      className="mt-3 text-center text-sm italic"
                      style={{ color: "var(--hw-muted)" }}
                    >
                      {photo.caption}
                    </p>
                  ) : null}
                </Reveal>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mx-auto max-w-md px-6 py-16">
          <Reveal>
            <div
              className="rounded-2xl border px-6 py-8 text-center"
              style={{
                background: "rgba(255,248,235,0.04)",
                borderColor: "rgba(212,175,55,0.25)",
              }}
            >
              <p className="text-sm leading-8">{data.copy.message}</p>
            </div>

            {data.event ? (
              <div className="mt-12 text-center">
                <p
                  className="text-[11px] tracking-[0.32em] uppercase"
                  style={{ color: "var(--hw-accent)" }}
                >
                  Celebration
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
              <div className="mt-10">
                <RsvpCard
                  note={data.extras.rsvp.note}
                  cta={data.copy.cta}
                  storageKey={`hw-rsvp-${data.meta.slug}-${data.meta.wishId}`}
                  occasion={data.meta.occasion}
                  slug={data.meta.slug}
                  wishId={data.meta.wishId}
                />
              </div>
            ) : null}
          </Reveal>
        </section>

        <footer className="px-6 pb-16 text-center">
          <Reveal>
            <p
              className="font-[family-name:var(--font-display)] text-xl"
              style={{ color: "var(--hw-secondary)" }}
            >
              With love & gratitude
            </p>
            <p
              className="mt-2 text-[11px] tracking-[0.28em] uppercase"
              style={{ color: "var(--hw-muted)" }}
            >
              {name}
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
