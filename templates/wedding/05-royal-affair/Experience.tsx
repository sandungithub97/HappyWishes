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
import { GuestWall } from "@/templates/_shared/components/GuestWall";
import { ParticleField } from "@/templates/_shared/components/ParticleField";
import { Reveal } from "@/templates/_shared/components/Reveal";
import { ScrollHint } from "@/templates/_shared/components/ScrollHint";
import { TextureOverlay } from "@/templates/_shared/components/TextureOverlay";
import { PlaceLink } from "@/templates/_shared/components/VenueMap";
import { VideoWelcome } from "@/templates/_shared/components/VideoWelcome";
import { displayNames, namesLine } from "@/templates/_shared/people";
import { themeStyle } from "@/templates/_shared/theme";
import type { TemplateData } from "@/templates/_shared/types";

const soft = [0.22, 1, 0.36, 1] as const;

function Ornament() {
  return (
    <svg
      width="180"
      height="22"
      viewBox="0 0 180 22"
      fill="none"
      aria-hidden
      className="mx-auto"
    >
      <path d="M0 11h66M114 11h66" stroke="currentColor" strokeWidth="0.8" />
      <path d="M78 11h24M90 3v16" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="90" cy="11" r="5" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="90" cy="11" r="2" fill="currentColor" />
    </svg>
  );
}

function Crest({ monogram }: { monogram: string }) {
  return (
    <div className="relative mx-auto h-28 w-28">
      <svg viewBox="0 0 112 112" className="h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="goldCrest" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F5E6A8" />
            <stop offset="45%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#8A6A18" />
          </linearGradient>
        </defs>
        <circle
          cx="56"
          cy="56"
          r="50"
          fill="none"
          stroke="url(#goldCrest)"
          strokeWidth="1.4"
        />
        <circle
          cx="56"
          cy="56"
          r="42"
          fill="none"
          stroke="url(#goldCrest)"
          strokeWidth="0.7"
          strokeDasharray="2 3"
        />
        <path
          d="M56 18l4 10 11 1-8 7 3 11-10-5-10 5 3-11-8-7 11-1z"
          fill="url(#goldCrest)"
          opacity="0.9"
        />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center pt-8 font-[family-name:var(--font-display)] text-lg tracking-[0.2em]"
        style={{ color: "#D4AF37" }}
      >
        {monogram}
      </span>
    </div>
  );
}

function GoldShimmer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`bg-clip-text text-transparent ${className ?? ""}`}
      style={{
        backgroundImage:
          "linear-gradient(110deg, #F8F1E3 0%, #F8F1E3 32%, #D4AF37 48%, #F8F1E3 64%, #F8F1E3 100%)",
        backgroundSize: "220% 100%",
        animation: "hw-royal-shimmer 5.5s ease-in-out infinite",
      }}
    >
      {children}
    </span>
  );
}

function CurtainPanel({
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
      className={`absolute inset-y-0 ${isLeft ? "left-0" : "right-0"} w-[52%]`}
      animate={
        opening && !reduce
          ? { x: isLeft ? "-102%" : "102%", opacity: 0.4 }
          : { x: 0, opacity: 1 }
      }
      transition={{ duration: 1.55, ease: [0.19, 1, 0.22, 1] }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `
            repeating-linear-gradient(
              90deg,
              transparent 0px,
              transparent 18px,
              rgba(0,0,0,0.08) 18px,
              rgba(0,0,0,0.08) 20px
            ),
            linear-gradient(180deg, #6B1528 0%, #4A0E1C 40%, #2A0B14 100%)
          `,
          boxShadow: isLeft
            ? "inset -20px 0 40px rgba(0,0,0,0.35)"
            : "inset 20px 0 40px rgba(0,0,0,0.35)",
        }}
      />
      {/* Gold trim */}
      <div
        className={`absolute inset-y-0 ${isLeft ? "right-0" : "left-0"} w-1`}
        style={{
          background:
            "linear-gradient(180deg, #F5E6A8, #D4AF37 40%, #8A6A18 70%, #D4AF37)",
        }}
      />
      {/* Swag */}
      <div
        className="absolute top-0 right-0 left-0 h-16"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.25) 0%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}

function CurtainGate({
  headline,
  names,
  monogram,
  onOpen,
}: {
  headline: string;
  names: string;
  monogram: string;
  onOpen: () => void;
}) {
  const reduce = useReducedMotion();
  const [opening, setOpening] = useState(false);

  function open() {
    if (opening) return;
    setOpening(true);
    window.setTimeout(onOpen, reduce ? 200 : 1650);
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ background: "#1A060C" }}
      exit={
        reduce
          ? { opacity: 0 }
          : { opacity: 0, transition: { duration: 0.5, delay: 0.05 } }
      }
    >
      <ParticleField
        variant="sparkle"
        count={28}
        colors={["#F5E6A8", "#D4AF37", "#FFF8E0"]}
      />

      <div className="absolute inset-0 z-10">
        <CurtainPanel side="left" opening={opening} reduce={reduce} />
        <CurtainPanel side="right" opening={opening} reduce={reduce} />
      </div>

      {/* Stage glow when curtains open */}
      <motion.div
        className="pointer-events-none absolute inset-[8%] rounded-[40%]"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,55,0.28) 0%, transparent 65%)",
        }}
        animate={
          opening && !reduce
            ? { opacity: 1, scale: 1.2 }
            : { opacity: 0.25, scale: 0.9 }
        }
        transition={{ duration: 1.2, ease: soft }}
      />

      <motion.div
        className="relative z-30 mx-auto flex max-w-md flex-col items-center px-6 text-center"
        animate={
          opening && !reduce
            ? { opacity: 0, y: -14, scale: 0.97 }
            : { opacity: 1, y: 0, scale: 1 }
        }
        transition={{ duration: 0.55, ease: soft }}
      >
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: soft, delay: 0.15 }}
        >
          <Crest monogram={monogram} />
        </motion.div>

        <motion.p
          className="mt-6 text-[11px] tracking-[0.42em] uppercase"
          style={{ color: "#D4AF37" }}
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8, ease: soft }}
        >
          By invitation only
        </motion.p>

        <motion.h1
          className="mt-4 font-[family-name:var(--font-display)] text-2xl tracking-[0.16em] uppercase sm:text-3xl"
          style={{ color: "#F8F1E3" }}
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease: soft }}
        >
          {headline}
        </motion.h1>

        <motion.p
          className="mt-4 font-[family-name:var(--font-display)] text-sm tracking-[0.22em] uppercase"
          style={{ color: "#C4B08A" }}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          {names}
        </motion.p>

        <motion.button
          type="button"
          onClick={open}
          className="mt-10 rounded-full border px-8 py-3.5 text-[11px] tracking-[0.34em] uppercase"
          style={{
            borderColor: "#D4AF37",
            background:
              "linear-gradient(180deg, rgba(212,175,55,0.22) 0%, rgba(139,30,63,0.35) 100%)",
            color: "#F8F1E3",
            boxShadow: "0 0 36px rgba(212,175,55,0.28)",
          }}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8, ease: soft }}
          whileHover={reduce ? undefined : { scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
        >
          Part the curtains
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export function Experience({ data }: { data: TemplateData }) {
  const reduce = useReducedMotion();
  const names = displayNames(data.people);
  const monogram = names
    .map((n) => n[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
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
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, reduce ? 0 : -36]);
  const heroFade = useTransform(
    scrollYProgress,
    [0, 0.16],
    [1, reduce ? 1 : 0.4],
  );

  return (
    <main
      className="relative min-h-svh overflow-x-hidden bg-[var(--hw-bg)] font-[family-name:var(--font-body)] text-[var(--hw-text)]"
      style={themeStyle(data.palette)}
    >
      <style>{`
        @keyframes hw-royal-shimmer {
          0%, 100% { background-position: 100% 0; }
          50% { background-position: 0% 0; }
        }
      `}</style>

      <AnimatePresence>
        {!opened ? (
          <CurtainGate
            key="gate"
            headline={data.copy.headline}
            names={namesLine(data.people)}
            monogram={monogram || "IA"}
            onOpen={() => setOpened(true)}
          />
        ) : null}
      </AnimatePresence>

      <TextureOverlay variant="vignette" opacity={0.45} />
      <TextureOverlay variant="grain" opacity={0.18} />
      {opened ? (
        <ParticleField
          variant="sparkle"
          count={32}
          colors={["#F5E6A8", "#D4AF37", "#FFF8E0", "#E8C96A"]}
        />
      ) : null}

      <motion.div
        initial={false}
        animate={
          opened
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0, y: 20, filter: "blur(8px)" }
        }
        transition={{ duration: 1.05, ease: soft, delay: opened ? 0.05 : 0 }}
      >
        <section className="relative flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse at 50% 15%, rgba(212,175,55,0.18) 0%, transparent 45%),
                radial-gradient(ellipse at 50% 100%, rgba(139,30,63,0.25) 0%, transparent 40%)
              `,
            }}
          />

          <motion.div style={{ y: heroY, opacity: heroFade }} className="relative">
            <motion.div
              initial={reduce || !opened ? false : { opacity: 0, scale: 0.85 }}
              animate={opened ? { opacity: 1, scale: 1 } : undefined}
              transition={{ delay: 0.15, duration: 0.9, ease: soft }}
            >
              <Crest monogram={monogram || "IA"} />
            </motion.div>

            <motion.p
              className="mt-8 text-[11px] tracking-[0.42em] uppercase"
              style={{ color: "var(--hw-primary)" }}
              initial={reduce || !opened ? false : { opacity: 0, y: 10 }}
              animate={opened ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.3, duration: 0.8, ease: soft }}
            >
              {data.copy.subhead}
            </motion.p>

            <motion.h1
              className="mt-8 font-[family-name:var(--font-display)] text-4xl tracking-[0.18em] uppercase sm:text-6xl"
              initial={reduce || !opened ? false : { opacity: 0, y: 18 }}
              animate={opened ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.45, duration: 1, ease: soft }}
            >
              <GoldShimmer>{data.copy.headline}</GoldShimmer>
            </motion.h1>

            <motion.div
              className="mt-8"
              style={{ color: "var(--hw-primary)" }}
              initial={reduce || !opened ? false : { opacity: 0, scaleX: 0.6 }}
              animate={opened ? { opacity: 1, scaleX: 1 } : undefined}
              transition={{ delay: 0.65, duration: 0.8, ease: soft }}
            >
              <Ornament />
            </motion.div>

            <motion.p
              className="mt-8 font-[family-name:var(--font-display)] text-xl tracking-[0.2em] uppercase sm:text-2xl"
              style={{ color: "var(--hw-secondary)" }}
              initial={reduce || !opened ? false : { opacity: 0 }}
              animate={opened ? { opacity: 1 } : undefined}
              transition={{ delay: 0.8, duration: 0.85 }}
            >
              {namesLine(data.people)}
            </motion.p>

            {data.event?.timeLabel ? (
              <motion.p
                className="mt-6 text-sm"
                style={{ color: "var(--hw-muted)" }}
                initial={reduce || !opened ? false : { opacity: 0 }}
                animate={opened ? { opacity: 1 } : undefined}
                transition={{ delay: 0.95, duration: 0.8 }}
              >
                {data.event.timeLabel}
              </motion.p>
            ) : null}
          </motion.div>

          {opened ? <ScrollHint color="var(--hw-muted)" /> : null}
        </section>

        {data.extras.videoWelcome && data.media.video ? (
          <section className="px-6 py-8 sm:py-16">
            <Reveal>
              <div
                className="mx-auto max-w-3xl overflow-hidden border p-2 sm:p-3"
                style={{
                  borderColor: "color-mix(in srgb, var(--hw-primary) 45%, transparent)",
                  boxShadow: "0 0 40px rgba(212,175,55,0.12)",
                }}
              >
                <VideoWelcome
                  src={data.media.video.src}
                  poster={data.media.video.poster}
                  label="A welcome from the couple"
                />
              </div>
            </Reveal>
          </section>
        ) : null}

        {data.media.photos.length > 0 ? (
          <section className="mx-auto grid max-w-5xl gap-4 px-6 py-10 sm:grid-cols-3">
            {data.media.photos.map((photo, index) => (
              <Reveal key={photo.src} delay={index * 0.08}>
                <div
                  className="relative aspect-[3/4] overflow-hidden"
                  style={{
                    border:
                      "1px solid color-mix(in srgb, var(--hw-primary) 40%, transparent)",
                    boxShadow: "0 18px 44px rgba(0,0,0,0.35)",
                  }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(42,11,20,0.45) 0%, transparent 40%)",
                    }}
                  />
                </div>
              </Reveal>
            ))}
          </section>
        ) : null}

        <section className="mx-auto max-w-2xl px-6 py-16 text-center">
          <Reveal>
            <div style={{ color: "var(--hw-primary)" }} className="mb-8">
              <Ornament />
            </div>
            <p
              className="font-[family-name:var(--font-display)] text-2xl leading-9 tracking-wide"
              style={{ color: "var(--hw-secondary)" }}
            >
              {data.copy.message}
            </p>
            {data.event?.place ? (
              <p
                className="mt-8 text-sm tracking-[0.18em] uppercase"
                style={{ color: "var(--hw-muted)" }}
              >
                <PlaceLink
                  place={data.event.place}
                  className="underline underline-offset-4"
                />
              </p>
            ) : null}
          </Reveal>
        </section>

        {data.extras.guestWall ? (
          <section className="px-6 pb-24">
            <Reveal>
              <GuestWall
                storageKey={`hw-wishes-${data.meta.slug}-${data.meta.wishId}`}
                cta={data.copy.cta}
              />
            </Reveal>
          </section>
        ) : null}

        <footer className="px-6 pb-16 text-center">
          <Reveal>
            <div style={{ color: "var(--hw-primary)" }}>
              <Ornament />
            </div>
            <p
              className="mt-6 font-[family-name:var(--font-display)] text-lg tracking-[0.24em] uppercase"
              style={{ color: "var(--hw-secondary)" }}
            >
              {namesLine(data.people)}
            </p>
          </Reveal>
        </footer>
      </motion.div>
    </main>
  );
}
