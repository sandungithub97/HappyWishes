"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import type { Photo, TemplateData } from "@/templates/_shared/types";
import { RsvpCard } from "@/templates/_shared/components/RsvpCard";
import { PlaceLink } from "@/templates/_shared/components/VenueMap";
import { MusicToggle } from "@/templates/_shared/components/MusicToggle";
import { Reveal } from "@/templates/_shared/components/Reveal";
import { ParticleField } from "@/templates/_shared/components/ParticleField";
import { TextureOverlay } from "@/templates/_shared/components/TextureOverlay";
import { ScrollHint } from "@/templates/_shared/components/ScrollHint";
import { displayNames } from "@/templates/_shared/people";
import { themeStyle } from "@/templates/_shared/theme";

const soft = [0.22, 1, 0.36, 1] as const;

function GoldRule({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="140"
      height="14"
      viewBox="0 0 140 14"
      fill="none"
      aria-hidden
    >
      <path d="M0 7h52M88 7h52" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="70" cy="7" r="2.5" fill="currentColor" />
      <path d="M66 7h8" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  );
}

function AlbumGate({
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
    window.setTimeout(onOpen, reduce ? 320 : 1600);
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      style={{ background: "rgba(26,18,10,0.97)" }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.85 } }}
    >
      <TextureOverlay variant="grain" opacity={0.14} />
      <ParticleField
        variant="bokeh"
        count={18}
        colors={[
          "rgba(212,175,55,0.45)",
          "rgba(255,230,180,0.35)",
          "rgba(196,163,90,0.3)",
        ]}
        className="opacity-80"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 45%, rgba(212,175,55,0.16) 0%, transparent 65%)",
        }}
      />

      <motion.div
        className="relative w-full max-w-sm"
        initial={reduce ? false : { scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: soft }}
      >
        <div className="relative aspect-[4/5] [perspective:1200px]">
          <motion.div
            className="absolute inset-y-0 left-0 z-20 w-1/2 origin-left rounded-l-xl border border-r-0"
            style={{
              background:
                "linear-gradient(135deg, #3d2817 0%, #2a1a0e 50%, #1f1409 100%)",
              borderColor: "rgba(212,175,55,0.35)",
              boxShadow: "inset -4px 0 12px rgba(0,0,0,0.4)",
            }}
            initial={{ rotateY: 0 }}
            animate={
              opening && !reduce ? { rotateY: -112 } : { rotateY: 0 }
            }
            transition={{ duration: 1.35, ease: soft }}
          >
            <div className="flex h-full flex-col items-center justify-center p-6">
              <span
                className="font-[family-name:var(--font-display)] text-2xl tracking-wide italic"
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
            initial={{ opacity: 0.35 }}
            animate={{ opacity: opening ? 1 : 0.35 }}
            transition={{ duration: 0.8, delay: opening ? 0.35 : 0 }}
          >
            <div
              className="flex h-full flex-col items-center justify-center px-6 text-center"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,248,235,0.06) 0%, transparent 100%)",
              }}
            >
              <p
                className="text-[10px] tracking-[0.35em] uppercase"
                style={{ color: "var(--hw-accent)" }}
              >
                Golden years
              </p>
              <h2
                className="mt-4 font-[family-name:var(--font-display)] text-3xl italic"
                style={{ color: "var(--hw-text)" }}
              >
                {name}
              </h2>
              {age ? (
                <p
                  className="mt-2 font-[family-name:var(--font-display)] text-5xl"
                  style={{
                    color: "var(--hw-primary)",
                    textShadow: "0 0 32px rgba(212,175,55,0.35)",
                  }}
                >
                  {age}
                </p>
              ) : null}
              <motion.button
                type="button"
                onClick={open}
                disabled={opening}
                className="mt-8 rounded-full border px-8 py-3 text-sm tracking-[0.18em] uppercase transition-colors hover:bg-white/5 disabled:opacity-60"
                style={{
                  borderColor: "rgba(212,175,55,0.45)",
                  color: "var(--hw-accent)",
                }}
                whileHover={reduce ? undefined : { scale: 1.03 }}
                whileTap={reduce ? undefined : { scale: 0.98 }}
              >
                {opening ? "Opening…" : "Open the album"}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function VintagePhoto({
  photo,
  index,
}: {
  photo: Photo;
  index: number;
}) {
  const reduce = useReducedMotion();
  const directions = [
    { scale: [1, 1.1], x: ["0%", "-3%"], y: ["0%", "-2%"] },
    { scale: [1.06, 1], x: ["-2%", "2%"], y: ["-1%", "2%"] },
    { scale: [1, 1.08], x: ["2%", "-2%"], y: ["1%", "-2%"] },
  ];
  const dir = directions[index % directions.length];

  return (
    <figure className="group relative min-w-0">
      <div
        className="relative overflow-hidden rounded-lg border shadow-lg transition-transform duration-500 group-hover:scale-[1.02]"
        style={{
          borderColor: "rgba(212,175,55,0.28)",
          boxShadow: "0 14px 36px rgba(0,0,0,0.28)",
        }}
      >
        <div className="relative aspect-[3/4] overflow-hidden">
          <motion.div
            className="absolute inset-[-10%]"
            animate={reduce ? undefined : dir}
            transition={{
              duration: 16 + index * 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 640px) 33vw, 22vw"
              className="object-cover sepia-[0.32] contrast-[1.06] saturate-[0.92]"
            />
          </motion.div>
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(26,18,10,0.72) 0%, transparent 48%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-25 mix-blend-overlay"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, transparent 42%, rgba(26,18,10,0.55) 100%)",
            }}
          />
        </div>
      </div>
      {photo.caption ? (
        <figcaption
          className="mt-2 truncate text-center text-[11px] italic sm:text-xs"
          style={{ color: "var(--hw-muted)" }}
        >
          {photo.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function chunkPhotos(photos: Photo[], size = 3): Photo[][] {
  const pages: Photo[][] = [];
  for (let i = 0; i < photos.length; i += size) {
    pages.push(photos.slice(i, i + size));
  }
  return pages;
}

/** Sticky album window — three photos visible; scroll drives horizontal page turns. */
function TriptychScrollGallery({ photos }: { photos: Photo[] }) {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);
  const pages = useMemo(() => chunkPhotos(photos, 3), [photos]);
  const pageCount = pages.length;
  const multiPage = pageCount > 1;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    reduce || !multiPage
      ? ["0%", "0%"]
      : ["0%", `-${(pageCount - 1) * 100}%`],
  );

  const progressLabel = useTransform(scrollYProgress, [0, 1], [1, pageCount]);
  const [pageIndicator, setPageIndicator] = useState(1);

  useEffect(() => {
    if (reduce || !multiPage) return;
    return progressLabel.on("change", (v) => {
      setPageIndicator(Math.min(pageCount, Math.max(1, Math.round(v))));
    });
  }, [multiPage, pageCount, progressLabel, reduce]);

  const sectionHeight = multiPage ? `${pageCount * 100}vh` : undefined;

  return (
    <section
      ref={containerRef}
      className="relative"
      style={sectionHeight ? { height: sectionHeight } : undefined}
    >
      <div
        className={
          multiPage
            ? "sticky top-0 flex h-svh items-center justify-center px-4 py-10 sm:px-6"
            : "flex items-center justify-center px-4 py-16 sm:px-6"
        }
      >
        <div className="relative w-full max-w-6xl">
          <Reveal>
            <p
              className="mb-6 text-center text-[11px] tracking-[0.32em] uppercase"
              style={{ color: "var(--hw-accent)" }}
            >
              Through the years
            </p>
          </Reveal>

          {/* Album window frame */}
          <div
            className="relative rounded-2xl border-2 p-3 sm:p-4"
            style={{
              borderColor: "rgba(212,175,55,0.42)",
              background:
                "linear-gradient(145deg, rgba(60,40,22,0.55) 0%, rgba(26,18,10,0.75) 100%)",
              boxShadow:
                "0 28px 60px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,230,180,0.12)",
            }}
          >
            <div
              className="pointer-events-none absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 rounded-full border"
              style={{
                borderColor: "rgba(212,175,55,0.35)",
                background: "rgba(42,26,14,0.9)",
              }}
            />

            <div className="overflow-hidden rounded-xl border bg-[#1a120a]/80 p-2 sm:p-3"
              style={{ borderColor: "rgba(212,175,55,0.22)" }}
            >
              <motion.div className="flex" style={{ x }}>
                {pages.map((page, pageIndex) => (
                  <div
                    key={pageIndex}
                    className="grid min-w-full grid-cols-3 gap-2 sm:gap-3"
                  >
                    {page.map((photo, index) => (
                      <VintagePhoto
                        key={photo.src}
                        photo={photo}
                        index={pageIndex * 3 + index}
                      />
                    ))}
                    {page.length < 3
                      ? Array.from({ length: 3 - page.length }).map((_, i) => (
                          <div
                            key={`pad-${i}`}
                            className="aspect-[3/4] rounded-lg border border-dashed opacity-20"
                            style={{ borderColor: "rgba(212,175,55,0.4)" }}
                          />
                        ))
                      : null}
                  </div>
                ))}
              </motion.div>
            </div>

            {multiPage ? (
              <div className="mt-4 flex items-center justify-between px-1">
                <p
                  className="text-[10px] tracking-[0.28em] uppercase"
                  style={{ color: "rgba(212,175,55,0.75)" }}
                >
                  Scroll to turn the page
                </p>
                <p
                  className="font-[family-name:var(--font-display)] text-sm tabular-nums"
                  style={{ color: "var(--hw-accent)" }}
                >
                  {pageIndicator} / {pageCount}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
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
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, reduce ? 0 : -48]);
  const heroFade = useTransform(scrollYProgress, [0, 0.16], [1, reduce ? 1 : 0.35]);
  const heroScale = useTransform(scrollYProgress, [0, 0.18], [1, reduce ? 1 : 0.94]);
  const grainOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.15, 0.08]);

  return (
    <main
      className="relative min-h-svh overflow-x-hidden bg-[var(--hw-bg)] font-[family-name:var(--font-body)] text-[var(--hw-text)]"
      style={themeStyle(data.palette)}
    >
      <AnimatePresence>
        {!opened ? (
          <AlbumGate
            key="gate"
            name={name}
            age={age}
            onOpen={() => setOpened(true)}
          />
        ) : null}
      </AnimatePresence>

      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 30%, rgba(212,175,55,0.1) 0%, transparent 55%), linear-gradient(180deg, var(--hw-bg) 0%, #1a120a 100%)",
        }}
      />
      {data.media.heroImage ? (
        <div className="pointer-events-none fixed inset-0 -z-[9]">
          <Image
            src={data.media.heroImage.src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center opacity-[0.12] sepia-[0.4]"
          />
        </div>
      ) : null}
      {opened ? (
        <ParticleField
          variant="bokeh"
          count={24}
          colors={[
            "rgba(212,175,55,0.55)",
            "rgba(255,230,180,0.4)",
            "rgba(196,163,90,0.35)",
          ]}
          className="fixed inset-0 -z-[5] opacity-70"
        />
      ) : null}
      {opened ? (
        <motion.div
          className="pointer-events-none fixed inset-0 -z-[4]"
          style={{ opacity: grainOpacity }}
        >
          <TextureOverlay variant="grain" opacity={1} />
        </motion.div>
      ) : null}
      <TextureOverlay variant="vignette" opacity={0.65} className="fixed inset-0 -z-[3]" />

      <motion.div
        initial={false}
        animate={
          opened
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0, y: 24, filter: "blur(8px)" }
        }
        transition={{ duration: 1.05, ease: soft, delay: opened ? 0.12 : 0 }}
      >
        <section className="relative flex min-h-svh flex-col items-center justify-center px-6 pt-20 pb-16 text-center">
          <motion.div
            style={{ y: heroY, opacity: heroFade, scale: heroScale }}
            className="relative z-10 max-w-lg"
          >
            <motion.div
              initial={reduce || !opened ? false : { opacity: 0, y: 16 }}
              animate={opened ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.85, ease: soft }}
            >
              <p
                className="text-[11px] tracking-[0.35em] uppercase"
                style={{ color: "var(--hw-accent)" }}
              >
                {data.copy.subhead ?? "Golden years"}
              </p>
              {age ? (
                <p
                  className="mt-6 font-[family-name:var(--font-display)] text-7xl sm:text-[5.5rem]"
                  style={{
                    color: "var(--hw-primary)",
                    textShadow: "0 0 48px rgba(212,175,55,0.35)",
                  }}
                >
                  {age}
                </p>
              ) : null}
              <h1
                className="mt-3 font-[family-name:var(--font-display)] text-4xl italic sm:text-5xl"
                style={{ color: "var(--hw-text)" }}
              >
                {name}
              </h1>
              <div className="mt-5 flex justify-center" style={{ color: "var(--hw-primary)" }}>
                <GoldRule />
              </div>
              <p
                className="mx-auto mt-5 max-w-md text-lg leading-relaxed"
                style={{ color: "var(--hw-secondary)" }}
              >
                {data.copy.headline}
              </p>
            </motion.div>
          </motion.div>
          {opened ? <ScrollHint /> : null}
        </section>

        {photos.length > 0 ? <TriptychScrollGallery photos={photos} /> : null}

        <section className="mx-auto max-w-md px-6 py-16 sm:py-20">
          <Reveal>
            <div
              className="relative overflow-hidden rounded-2xl border px-7 py-9 text-center"
              style={{
                background: "rgba(255,248,235,0.05)",
                borderColor: "rgba(212,175,55,0.28)",
              }}
            >
              <TextureOverlay variant="paper" opacity={0.2} className="!absolute inset-0" />
              <p
                className="relative text-[10px] tracking-[0.32em] uppercase"
                style={{ color: "var(--hw-accent)" }}
              >
                A note from the family
              </p>
              <p className="relative mt-5 font-[family-name:var(--font-display)] text-xl italic leading-9 sm:text-2xl">
                {data.copy.message}
              </p>
            </div>

            {data.event ? (
              <div className="mt-14 text-center">
                <p
                  className="text-[11px] tracking-[0.32em] uppercase"
                  style={{ color: "var(--hw-accent)" }}
                >
                  Celebration
                </p>
                <p className="mt-3 font-[family-name:var(--font-display)] text-2xl italic">
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
            <div className="flex justify-center" style={{ color: "var(--hw-primary)" }}>
              <GoldRule />
            </div>
            <p
              className="mt-6 font-[family-name:var(--font-display)] text-xl italic"
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
