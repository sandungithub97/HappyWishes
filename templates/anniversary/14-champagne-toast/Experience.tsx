"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { GuestWall } from "@/templates/_shared/components/GuestWall";
import { ParticleField } from "@/templates/_shared/components/ParticleField";
import { Reveal } from "@/templates/_shared/components/Reveal";
import { ScrollHint } from "@/templates/_shared/components/ScrollHint";
import { TextureOverlay } from "@/templates/_shared/components/TextureOverlay";
import { PlaceLink } from "@/templates/_shared/components/VenueMap";
import { namesLine } from "@/templates/_shared/people";
import { themeStyle } from "@/templates/_shared/theme";
import type { TemplateData } from "@/templates/_shared/types";

const soft = [0.22, 1, 0.36, 1] as const;

function GoldRule() {
  return (
    <svg width="180" height="16" viewBox="0 0 180 16" fill="none" aria-hidden className="mx-auto">
      <path d="M0 8h70M110 8h70" stroke="currentColor" strokeWidth="0.6" />
      <path d="M82 8h16M90 3v10" stroke="currentColor" strokeWidth="0.6" />
      <circle cx="90" cy="8" r="3.5" stroke="currentColor" strokeWidth="0.6" />
    </svg>
  );
}

function ShimmerHeading({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <span className="relative inline-block overflow-hidden">
      <span className="relative z-10">{children}</span>
      {!reduce ? (
        <motion.span
          className="pointer-events-none absolute inset-y-0 w-1/3 skew-x-[-18deg]"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(201,162,39,0.55), transparent)",
          }}
          animate={{ left: ["-40%", "140%"] }}
          transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 2.2, ease: "easeInOut" }}
        />
      ) : null}
    </span>
  );
}

function ClinkGate({
  years,
  names,
  onOpen,
}: {
  years?: number;
  names: string;
  onOpen: () => void;
}) {
  const reduce = useReducedMotion();
  const [clinking, setClinking] = useState(false);

  function open() {
    if (clinking) return;
    setClinking(true);
    window.setTimeout(onOpen, reduce ? 200 : 900);
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      style={{ background: "#050505" }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.7 } }}
    >
      <ParticleField
        variant="bubble"
        count={36}
        colors={["rgba(201,162,39,0.45)", "rgba(245,230,200,0.3)", "rgba(255,255,255,0.2)"]}
      />
      <TextureOverlay variant="vignette" opacity={0.7} />

      <motion.button
        type="button"
        onClick={open}
        className="relative z-10 flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: soft }}
      >
        <div className="relative mb-10 flex h-40 w-56 items-end justify-center">
          <motion.div
            className="absolute bottom-0 left-6 h-36 w-16 origin-bottom rounded-b-full border border-[#C9A227]/60"
            style={{
              background:
                "linear-gradient(180deg, rgba(201,162,39,0.15), rgba(201,162,39,0.05))",
            }}
            animate={
              clinking && !reduce
                ? { rotate: [-8, 12, 0], x: [0, 18, 8] }
                : { rotate: [-4, 0, -4] }
            }
            transition={
              clinking
                ? { duration: 0.7, ease: soft }
                : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
            }
          />
          <motion.div
            className="absolute bottom-0 right-6 h-36 w-16 origin-bottom rounded-b-full border border-[#C9A227]/60"
            style={{
              background:
                "linear-gradient(180deg, rgba(201,162,39,0.15), rgba(201,162,39,0.05))",
            }}
            animate={
              clinking && !reduce
                ? { rotate: [8, -12, 0], x: [0, -18, -8] }
                : { rotate: [4, 0, 4] }
            }
            transition={
              clinking
                ? { duration: 0.7, ease: soft }
                : { duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }
            }
          />
          {clinking && !reduce ? (
            <motion.span
              className="absolute top-8 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#C9A227]"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 4, opacity: 0 }}
              transition={{ duration: 0.6 }}
              style={{ boxShadow: "0 0 24px #C9A227" }}
            />
          ) : null}
        </div>

        <p
          className="text-[11px] tracking-[0.42em] uppercase"
          style={{ color: "var(--hw-primary)" }}
        >
          Raise a glass
        </p>
        <p
          className="mt-4 font-[family-name:var(--font-display)] text-2xl tracking-[0.18em] uppercase"
          style={{ color: "var(--hw-secondary)" }}
        >
          {names}
        </p>
        {years ? (
          <p className="mt-3 text-sm tracking-[0.24em] uppercase" style={{ color: "var(--hw-muted)" }}>
            {years} years
          </p>
        ) : null}
        <p
          className="mt-8 text-[11px] tracking-[0.28em] uppercase"
          style={{ color: "var(--hw-primary)" }}
        >
          Tap to toast
        </p>
      </motion.button>
    </motion.div>
  );
}

export function Experience({ data }: { data: TemplateData }) {
  const years = data.extras.milestoneAge;
  const [opened, setOpened] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!opened) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
    document.body.style.overflow = "";
  }, [opened]);

  return (
    <main
      className="relative min-h-svh overflow-x-hidden bg-[var(--hw-bg)] font-[family-name:var(--font-body)] text-[var(--hw-text)]"
      style={themeStyle(data.palette)}
    >
      <AnimatePresence>
        {!opened ? (
          <ClinkGate
            key="gate"
            years={years}
            names={namesLine(data.people)}
            onOpen={() => setOpened(true)}
          />
        ) : null}
      </AnimatePresence>

      {opened ? (
        <ParticleField
          variant="bubble"
          count={40}
          colors={["rgba(201,162,39,0.4)", "rgba(245,230,200,0.25)", "rgba(255,255,255,0.18)"]}
          className="fixed inset-0 -z-10 opacity-80"
        />
      ) : null}
      <TextureOverlay variant="vignette" opacity={0.55} className="fixed inset-0 -z-[5]" />

      <motion.div
        initial={false}
        animate={opened ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 1, ease: soft, delay: opened ? 0.1 : 0 }}
      >
        <section className="relative flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center">
          <Reveal>
            <p
              className="text-[11px] tracking-[0.42em] uppercase"
              style={{ color: "var(--hw-primary)" }}
            >
              {data.event?.timeLabel ?? data.copy.subhead}
            </p>
            <h1
              className="mt-8 font-[family-name:var(--font-display)] text-4xl tracking-[0.12em] uppercase sm:text-6xl"
              style={{ color: "var(--hw-secondary)" }}
            >
              <ShimmerHeading>{data.copy.headline}</ShimmerHeading>
            </h1>
            <div className="mt-8" style={{ color: "var(--hw-primary)" }}>
              <GoldRule />
            </div>
            <p
              className="mt-8 font-[family-name:var(--font-display)] text-lg tracking-[0.28em] uppercase"
              style={{ color: "var(--hw-secondary)" }}
            >
              {namesLine(data.people)}
            </p>
            {years ? (
              <p
                className="mt-4 text-sm tracking-[0.2em] uppercase"
                style={{ color: "var(--hw-muted)" }}
              >
                {years} years
              </p>
            ) : null}
          </Reveal>
          {opened ? <ScrollHint color="var(--hw-muted)" /> : null}
        </section>

        {data.media.photos.length > 0 ? (
          <section className="mx-auto grid max-w-5xl gap-3 px-6 sm:grid-cols-3">
            {data.media.photos.map((photo, index) => (
              <Reveal key={photo.src} delay={index * 0.08}>
                <div className="relative aspect-[3/4] overflow-hidden border" style={{ borderColor: "var(--hw-border)" }}>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(201,162,39,0.35), transparent 50%)",
                    }}
                  />
                </div>
              </Reveal>
            ))}
          </section>
        ) : null}

        <section className="mx-auto max-w-2xl px-6 py-20 text-center">
          <Reveal>
            <p
              className="font-[family-name:var(--font-display)] text-2xl leading-9 italic sm:text-3xl"
              style={{ color: "var(--hw-secondary)" }}
            >
              {data.copy.message}
            </p>
            {data.event?.place ? (
              <p
                className="mt-8 text-[11px] tracking-[0.28em] uppercase"
                style={{ color: "var(--hw-muted)" }}
              >
                <PlaceLink place={data.event.place} className="underline underline-offset-4" />
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
      </motion.div>
    </main>
  );
}
