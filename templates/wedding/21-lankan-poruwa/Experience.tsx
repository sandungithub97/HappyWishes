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
import { ParticleField } from "@/templates/_shared/components/ParticleField";
import { Reveal } from "@/templates/_shared/components/Reveal";
import { RsvpCard } from "@/templates/_shared/components/RsvpCard";
import { ScrollHint } from "@/templates/_shared/components/ScrollHint";
import { TextureOverlay } from "@/templates/_shared/components/TextureOverlay";
import { PlaceLink } from "@/templates/_shared/components/VenueMap";
import { displayNames } from "@/templates/_shared/people";
import { themeStyle } from "@/templates/_shared/theme";
import type { TemplateData } from "@/templates/_shared/types";

const soft = [0.22, 1, 0.36, 1] as const;

const displayFont = "font-[family-name:var(--font-display)]";
const accentFont = "font-[family-name:var(--font-accent)]";

function Kicker({
  children,
  className,
  color,
}: {
  children: ReactNode;
  className?: string;
  color?: string;
}) {
  return (
    <p
      className={`${accentFont} text-[1.05rem] font-medium leading-snug ${className ?? ""}`}
      style={{ color: color ?? "var(--hw-primary)" }}
    >
      {children}
    </p>
  );
}

function HeroBackground({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-contain object-center"
        style={{ opacity: 0.2 }}
      />
    </div>
  );
}

function GoldRule() {
  return (
    <svg
      width="160"
      height="18"
      viewBox="0 0 160 18"
      fill="none"
      aria-hidden
      className="mx-auto"
    >
      <path d="M0 9h58M102 9h58" stroke="currentColor" strokeWidth="0.9" />
      <path
        d="M70 9c0-5 5-8 10-8s10 3 10 8-5 8-10 8-10-3-10-8z"
        stroke="currentColor"
        strokeWidth="0.9"
        fill="none"
      />
      <circle cx="80" cy="9" r="2.2" fill="currentColor" />
    </svg>
  );
}

/** Decorative Kandyan-inspired lotus motif (original, not a temple seal). */
function LotusMotif({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden
      style={{ color: "var(--hw-primary)" }}
    >
      <path
        d="M40 62c-8-10-18-16-18-28 0-8 6-14 14-14 2 0 4 .4 6 1.2C40 14 44 8 40 4c-4 4 0 10-2 17.2 2-.8 4-1.2 6-1.2 8 0 14 6 14 14 0 12-10 18-18 28z"
        fill="currentColor"
        opacity="0.2"
      />
      <path
        d="M40 58c-6-8-14-13-14-22 0-6 4.5-11 11-11 1.5 0 3 .3 4.5.9C40 18 43 13 40 10c-3 3 0 8-1.5 13.9 1.5-.6 3-.9 4.5-.9 6.5 0 11 5 11 11 0 9-8 14-14 24z"
        stroke="currentColor"
        strokeWidth="1.1"
        fill="none"
      />
      <circle cx="40" cy="34" r="3" fill="currentColor" />
    </svg>
  );
}

function OilLamp({ lit }: { lit: boolean }) {
  return (
    <div className="relative mx-auto h-36 w-28">
      <svg viewBox="0 0 112 144" className="h-full w-full" aria-hidden>
        <defs>
          <radialGradient id="flameGlow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#FFE9A0" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#F0A020" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#C9A227" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="brass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E8C96A" />
            <stop offset="50%" stopColor="#C9A227" />
            <stop offset="100%" stopColor="#8A6A18" />
          </linearGradient>
        </defs>
        {/* Glow */}
        <motion.ellipse
          cx="56"
          cy="42"
          rx="34"
          ry="40"
          fill="url(#flameGlow)"
          initial={false}
          animate={
            lit
              ? { opacity: [0.55, 0.95, 0.6], scale: [1, 1.08, 1] }
              : { opacity: 0.15, scale: 0.9 }
          }
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Flame */}
        <motion.path
          d="M56 18c8 12 14 22 14 32 0 10-6 16-14 16s-14-6-14-16c0-10 6-20 14-32z"
          fill="#FFD56A"
          initial={false}
          animate={
            lit
              ? {
                  d: [
                    "M56 18c8 12 14 22 14 32 0 10-6 16-14 16s-14-6-14-16c0-10 6-20 14-32z",
                    "M56 14c10 14 16 24 13 34 0 10-5 16-13 16s-14-6-14-16c0-10 7-22 14-34z",
                    "M56 18c8 12 14 22 14 32 0 10-6 16-14 16s-14-6-14-16c0-10 6-20 14-32z",
                  ],
                  opacity: 1,
                }
              : { opacity: 0.2 }
          }
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.ellipse
          cx="56"
          cy="42"
          rx="5"
          ry="10"
          fill="#FFF6D6"
          animate={lit ? { opacity: [0.7, 1, 0.7] } : { opacity: 0.2 }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
        {/* Bowl */}
        <ellipse cx="56" cy="72" rx="28" ry="8" fill="url(#brass)" />
        <path
          d="M28 72c2 18 12 28 28 28s26-10 28-28"
          fill="url(#brass)"
          opacity="0.95"
        />
        <ellipse cx="56" cy="72" rx="22" ry="5" fill="#6B0F1A" opacity="0.35" />
        {/* Stand */}
        <rect x="50" y="98" width="12" height="22" rx="2" fill="url(#brass)" />
        <ellipse cx="56" cy="126" rx="22" ry="6" fill="url(#brass)" />
        <ellipse cx="56" cy="124" rx="16" ry="3.5" fill="#8A6A18" opacity="0.5" />
      </svg>
    </div>
  );
}

function OilLampGate({
  names,
  subhead,
  heroImage,
  onOpen,
}: {
  names: string;
  subhead?: string;
  heroImage?: { src: string; alt: string };
  onOpen: () => void;
}) {
  const reduce = useReducedMotion();
  const [lit, setLit] = useState(false);
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    if (reduce) {
      setLit(true);
      return;
    }
    const t = window.setTimeout(() => setLit(true), 500);
    return () => window.clearTimeout(t);
  }, [reduce]);

  function open() {
    if (opening) return;
    setOpening(true);
    window.setTimeout(onOpen, reduce ? 200 : 1200);
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden px-6"
      style={{
        background: `
          radial-gradient(ellipse at 50% 28%, rgba(201,162,39,0.28) 0%, transparent 48%),
          radial-gradient(ellipse at 50% 100%, rgba(107,15,26,0.18) 0%, transparent 45%),
          #F7F0E4
        `,
      }}
      exit={
        reduce
          ? { opacity: 0 }
          : { opacity: 0, transition: { duration: 0.55, delay: 0.05 } }
      }
    >
      <TextureOverlay variant="paper" opacity={0.45} />
      {heroImage ? <HeroBackground src={heroImage.src} alt={heroImage.alt} /> : null}
      <ParticleField
        variant="bokeh"
        count={20}
        colors={[
          "rgba(201,162,39,0.4)",
          "rgba(255,213,106,0.28)",
          "rgba(107,15,26,0.12)",
        ]}
      />

      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center text-center"
        animate={
          opening && !reduce
            ? { opacity: 0, y: -18, scale: 0.97 }
            : { opacity: 1, y: 0, scale: 1 }
        }
        transition={{ duration: 0.7, ease: soft }}
      >
        <LotusMotif className="mb-2 h-14 w-14 opacity-80" />

        <OilLamp lit={lit} />

        <motion.div
          className="mt-6"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: soft }}
        >
          <Kicker color="#C9A227">පෝරුව මංගල්‍යය</Kicker>
        </motion.div>

        {subhead ? (
          <motion.p
            className="mt-3 text-base leading-8"
            style={{ color: "#2F5D3A" }}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.8 }}
          >
            {subhead}
          </motion.p>
        ) : null}

        <motion.h1
          className={`mt-5 ${displayFont} text-3xl font-semibold leading-[1.45] sm:text-4xl`}
          style={{
            color: "#6B0F1A",
            textShadow: "0 0 28px rgba(201,162,39,0.25)",
          }}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.95, ease: soft }}
        >
          {names}
        </motion.h1>

        <motion.button
          type="button"
          onClick={open}
          className={`mt-10 rounded-full border px-8 py-3.5 ${accentFont} text-base font-medium`}
          style={{
            borderColor: "#C9A227",
            background:
              "linear-gradient(180deg, #FFF8EC 0%, #F0E0B8 100%)",
            color: "#6B0F1A",
            boxShadow: "0 12px 32px rgba(201,162,39,0.28)",
          }}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8, ease: soft }}
          whileHover={reduce ? undefined : { scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
        >
          පහන දල්වන්න
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

function ShimmerHeading({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`relative inline-block bg-clip-text text-transparent ${className ?? ""}`}
      style={{
        backgroundImage:
          "linear-gradient(110deg, #6B0F1A 0%, #6B0F1A 35%, #C9A227 48%, #6B0F1A 62%, #6B0F1A 100%)",
        backgroundSize: "220% 100%",
        animation: "hw-gold-shimmer 5s ease-in-out infinite",
      }}
    >
      {children}
    </span>
  );
}

export function Experience({ data }: { data: TemplateData }) {
  const reduce = useReducedMotion();
  const chapters = data.extras.timeline ?? [];
  const given = displayNames(data.people);
  const couple = given.join(" සහ ");
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
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, reduce ? 0 : -40]);
  const heroFade = useTransform(
    scrollYProgress,
    [0, 0.16],
    [1, reduce ? 1 : 0.4],
  );

  return (
    <main
      className="relative min-h-svh overflow-x-hidden bg-[var(--hw-bg)] font-[family-name:var(--font-body)] text-[var(--hw-text)]"
      style={themeStyle(data.palette)}
      lang="si"
    >
      <style>{`
        @keyframes hw-gold-shimmer {
          0%, 100% { background-position: 100% 0; }
          50% { background-position: 0% 0; }
        }
      `}</style>

      <AnimatePresence>
        {!opened ? (
          <OilLampGate
            key="gate"
            names={couple}
            subhead={data.copy.subhead}
            heroImage={data.media.heroImage}
            onOpen={() => setOpened(true)}
          />
        ) : null}
      </AnimatePresence>

      <TextureOverlay variant="paper" opacity={0.35} />
      {opened ? (
        <ParticleField
          variant="bokeh"
          count={18}
          colors={[
            "rgba(201,162,39,0.35)",
            "rgba(255,213,106,0.22)",
            "rgba(47,93,58,0.12)",
          ]}
        />
      ) : null}

      <motion.div
        initial={false}
        animate={
          opened
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0, y: 22, filter: "blur(8px)" }
        }
        transition={{ duration: 1.05, ease: soft, delay: opened ? 0.05 : 0 }}
      >
        <section className="relative flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center">
          {data.media.heroImage ? (
            <HeroBackground
              src={data.media.heroImage.src}
              alt={data.media.heroImage.alt}
            />
          ) : null}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse at 50% 12%, rgba(201,162,39,0.22) 0%, transparent 48%),
                radial-gradient(ellipse at 80% 80%, rgba(107,15,26,0.08) 0%, transparent 40%)
              `,
            }}
          />

          <motion.div style={{ y: heroY, opacity: heroFade }} className="relative z-10">
            <motion.div
              initial={reduce || !opened ? false : { opacity: 0, scale: 0.9 }}
              animate={opened ? { opacity: 1, scale: 1 } : undefined}
              transition={{ delay: 0.15, duration: 0.9, ease: soft }}
            >
              <LotusMotif className="mx-auto mb-4 h-16 w-16" />
            </motion.div>

            <motion.div
              className="mt-2"
              initial={reduce || !opened ? false : { opacity: 0, y: 10 }}
              animate={opened ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.25, duration: 0.8, ease: soft }}
            >
              <Kicker>පෝරුව මංගල්‍යය</Kicker>
            </motion.div>

            {data.copy.subhead ? (
              <motion.p
                className="mt-5 max-w-lg text-lg leading-9"
                style={{ color: "var(--hw-accent)" }}
                initial={reduce || !opened ? false : { opacity: 0 }}
                animate={opened ? { opacity: 1 } : undefined}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                {data.copy.subhead}
              </motion.p>
            ) : null}

            <motion.h1
              className={`mt-7 ${displayFont} text-[2.7rem] font-semibold leading-[1.4] sm:text-6xl`}
              initial={reduce || !opened ? false : { opacity: 0, y: 20 }}
              animate={opened ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.5, duration: 1, ease: soft }}
            >
              <span className="flex flex-col items-center gap-1">
                <ShimmerHeading>{given[0] ?? couple}</ShimmerHeading>
                {given[1] ? (
                  <>
                    <span
                      className={`${accentFont} text-xl font-medium sm:text-2xl`}
                      style={{ color: "var(--hw-primary)" }}
                    >
                      සහ
                    </span>
                    <ShimmerHeading>{given[1]}</ShimmerHeading>
                  </>
                ) : null}
              </span>
            </motion.h1>

            <motion.div
              className="mt-8"
              style={{ color: "var(--hw-primary)" }}
              initial={reduce || !opened ? false : { opacity: 0, scaleX: 0.6 }}
              animate={opened ? { opacity: 1, scaleX: 1 } : undefined}
              transition={{ delay: 0.7, duration: 0.8, ease: soft }}
            >
              <GoldRule />
            </motion.div>

            <motion.p
              className="mt-8 max-w-lg text-xl font-light leading-10"
              style={{ color: "var(--hw-muted)" }}
              initial={reduce || !opened ? false : { opacity: 0, y: 12 }}
              animate={opened ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.85, duration: 0.85, ease: soft }}
            >
              {data.copy.message}
            </motion.p>

            {data.event?.timeLabel ? (
              <motion.p
                className={`mt-8 ${accentFont} text-xl font-medium leading-9`}
                style={{ color: "var(--hw-secondary)" }}
                initial={reduce || !opened ? false : { opacity: 0 }}
                animate={opened ? { opacity: 1 } : undefined}
                transition={{ delay: 1, duration: 0.8 }}
              >
                {data.event.timeLabel}
              </motion.p>
            ) : null}

            {data.event?.place ? (
              <p className="mt-3 text-base leading-8" style={{ color: "var(--hw-muted)" }}>
                <PlaceLink
                  place={data.event.place}
                  className="underline underline-offset-4"
                />
              </p>
            ) : null}
          </motion.div>

          {opened ? <ScrollHint /> : null}
        </section>

        {chapters.length > 0 ? (
          <section className="relative mx-auto max-w-2xl px-6 pb-8">
            <Reveal>
              <Kicker className="mb-12 text-center">සම්ප්‍රදාය</Kicker>
            </Reveal>

            <div className="relative">
              {/* Ceremony spine */}
              <div
                className="absolute top-2 bottom-2 left-[1.6rem] hidden w-px sm:block"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, var(--hw-primary), transparent)",
                  opacity: 0.45,
                }}
              />

              <ol className="space-y-14">
                {chapters.map((chapter, index) => (
                  <Reveal key={chapter.title} delay={index * 0.04}>
                    <li className="relative grid gap-3 sm:grid-cols-[4.5rem_1fr] sm:items-start">
                      <div className="relative">
                        <p
                          className={`${displayFont} text-3xl font-semibold tabular-nums`}
                          style={{
                            color: "var(--hw-primary)",
                            textShadow:
                              "0 0 18px color-mix(in srgb, var(--hw-primary) 40%, transparent)",
                          }}
                        >
                          {chapter.label}
                        </p>
                        <span
                          className="absolute top-2 -left-[0.15rem] hidden h-2.5 w-2.5 rounded-full sm:block"
                          style={{
                            background: "var(--hw-primary)",
                            boxShadow:
                              "0 0 12px color-mix(in srgb, var(--hw-primary) 60%, transparent)",
                          }}
                        />
                      </div>
                      <div
                        className="rounded-2xl border px-5 py-5 sm:px-6"
                        style={{
                          borderColor: "var(--hw-border)",
                          background:
                            "color-mix(in srgb, var(--hw-surface) 92%, transparent)",
                          boxShadow: "0 14px 36px rgba(42,24,16,0.05)",
                        }}
                      >
                        <h2
                          className={`${displayFont} text-2xl font-semibold leading-[1.45] sm:text-3xl`}
                          style={{ color: "var(--hw-secondary)" }}
                        >
                          {chapter.title}
                        </h2>
                        <p
                          className="mt-3 text-lg font-light leading-9"
                          style={{ color: "var(--hw-muted)" }}
                        >
                          {chapter.body}
                        </p>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>
          </section>
        ) : null}

        {data.media.photos.length > 0 ? (
          <section className="mx-auto max-w-5xl px-6 py-16">
            <Reveal>
              <Kicker className="mb-10 text-center">අපේ ගැලරිය</Kicker>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-3">
            {data.media.photos.map((photo, index) => (
              <Reveal key={photo.src} delay={index * 0.08}>
                <div
                  className="relative aspect-[3/4] overflow-hidden"
                  style={{
                    boxShadow: "0 18px 40px rgba(42,24,16,0.12)",
                    border: "1px solid color-mix(in srgb, var(--hw-primary) 35%, transparent)",
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
                        "linear-gradient(to top, rgba(42,24,16,0.35) 0%, transparent 40%)",
                    }}
                  />
                </div>
              </Reveal>
            ))}
            </div>
          </section>
        ) : null}

        {data.extras.rsvp?.enabled ? (
          <section className="mx-auto max-w-md px-6 pb-24">
            <Reveal>
              <Kicker className="mb-8 text-center">කරුණාකර පිළිතුරු දෙන්න</Kicker>
              <RsvpCard
                note={data.extras.rsvp.note}
                cta={data.copy.cta}
                storageKey={`hw-rsvp-${data.meta.slug}-${data.meta.wishId}`}
                occasion={data.meta.occasion}
                slug={data.meta.slug}
                wishId={data.meta.wishId}
                copy={{
                  namePlaceholder: "ඔබේ නම",
                  nameLabel: "ඔබේ නම",
                  yes: "සතුටින් පැමිණෙනවා",
                  no: "කණගාටුවෙන් නොපැමිණෙනවා",
                  send: "යවන්න",
                  sending: "යවමින්…",
                  thanksYes: "ස්තුතියි, {name}. අපි ඔබව බලාගෙන ඉන්නවා.",
                  thanksNo: "අපට ඔබ අමතක වේවි, {name}.",
                }}
              />
            </Reveal>
          </section>
        ) : null}

        <footer className="px-6 pb-16 text-center">
          <Reveal>
            <div style={{ color: "var(--hw-primary)" }}>
              <GoldRule />
            </div>
            <p
              className={`mt-6 ${displayFont} text-2xl font-semibold leading-[1.5]`}
              style={{ color: "var(--hw-secondary)" }}
            >
              {couple}
            </p>
            <p
              className={`mt-3 ${accentFont} text-base font-medium`}
              style={{ color: "var(--hw-muted)" }}
            >
              දෙමාපියන්ගේ ආශීර්වාදයෙන්
            </p>
          </Reveal>
        </footer>
      </motion.div>
    </main>
  );
}
