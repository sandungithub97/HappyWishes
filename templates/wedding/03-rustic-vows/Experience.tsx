"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PetalFall } from "@/templates/_shared/components/PetalFall";
import { ParticleField } from "@/templates/_shared/components/ParticleField";
import { Reveal } from "@/templates/_shared/components/Reveal";
import { RsvpCard } from "@/templates/_shared/components/RsvpCard";
import { ScrollHint } from "@/templates/_shared/components/ScrollHint";
import { TextureOverlay } from "@/templates/_shared/components/TextureOverlay";
import { PlaceLink } from "@/templates/_shared/components/VenueMap";
import { displayNames, namesLine } from "@/templates/_shared/people";
import { themeStyle } from "@/templates/_shared/theme";
import type { TemplateData } from "@/templates/_shared/types";

const soft = [0.22, 1, 0.36, 1] as const;

const LEAF_COLORS = ["#6B7F5A", "#8FA87A", "#A65D3F", "#C4A882", "#D9CBB6"];

function GardenBackground({ src, alt }: { src: string; alt: string }) {
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.35, ease: soft, delay: 0.1 }}
      aria-hidden
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
        style={{ opacity: 0.2 }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(180deg, color-mix(in srgb, var(--hw-bg) 50%, transparent) 0%, color-mix(in srgb, var(--hw-bg) 30%, transparent) 40%, color-mix(in srgb, var(--hw-bg) 65%, transparent) 100%),
            radial-gradient(ellipse at 20% 10%, color-mix(in srgb, var(--hw-accent) 18%, transparent), transparent 45%)
          `,
        }}
      />
    </motion.div>
  );
}

function AmbientGlow() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[3]"
      aria-hidden
      animate={{ opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      style={{
        background: `
          radial-gradient(ellipse at 30% 15%, color-mix(in srgb, var(--hw-accent) 35%, transparent), transparent 50%),
          radial-gradient(ellipse at 75% 25%, color-mix(in srgb, var(--hw-primary) 18%, transparent), transparent 42%)
        `,
      }}
    />
  );
}

function FloatingPollen() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  const motes = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    left: `${(i * 23) % 100}%`,
    top: `${(i * 17) % 100}%`,
    size: 3 + (i % 4),
    delay: (i % 7) * 0.6,
    duration: 5 + (i % 5) * 1.2,
    drift: (i % 2 === 0 ? 1 : -1) * (12 + (i % 4) * 6),
  }));

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[6] overflow-hidden"
      aria-hidden
    >
      {motes.map((m) => (
        <motion.span
          key={m.id}
          className="absolute rounded-full"
          style={{
            left: m.left,
            top: m.top,
            width: m.size,
            height: m.size,
            background: "color-mix(in srgb, var(--hw-accent) 55%, #fff8e8)",
            boxShadow: "0 0 8px color-mix(in srgb, var(--hw-accent) 40%, transparent)",
          }}
          animate={{
            y: [0, -28, 0],
            x: [0, m.drift, 0],
            opacity: [0.2, 0.75, 0.2],
          }}
          transition={{
            duration: m.duration,
            delay: m.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function GrowingVine({
  className,
  flip,
}: {
  className?: string;
  flip?: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <svg
      className={className}
      width="88"
      height="120"
      viewBox="0 0 88 120"
      fill="none"
      aria-hidden
      style={{
        color: "var(--hw-accent)",
        transform: flip ? "scaleX(-1)" : undefined,
      }}
    >
      <motion.path
        d="M18 110C28 78 42 58 70 48"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: soft }}
      />
      <motion.path
        d="M48 62c10-4 18 2 20 12"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.35, ease: soft }}
      />
      <motion.ellipse
        cx="72"
        cy="44"
        rx="7"
        ry="4"
        fill="currentColor"
        opacity={0.55}
        initial={reduce ? false : { scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.55 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7, duration: 0.5, ease: soft }}
      />
      <motion.ellipse
        cx="66"
        cy="54"
        rx="5"
        ry="3"
        fill="currentColor"
        opacity={0.4}
        initial={reduce ? false : { scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.85, duration: 0.45, ease: soft }}
      />
      <motion.circle
        cx="58"
        cy="70"
        r="3.5"
        fill="var(--hw-primary)"
        opacity={0.7}
        initial={reduce ? false : { scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
      />
    </svg>
  );
}

function CornerVine({ className }: { className: string }) {
  return (
    <svg
      className={className}
      width="72"
      height="72"
      viewBox="0 0 72 72"
      fill="none"
      aria-hidden
      style={{ color: "var(--hw-accent)" }}
    >
      <path
        d="M8 64c8-18 18-28 36-32 2 10-4 22-16 28"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M28 28c6-2 12 2 14 8"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="44" cy="30" r="3" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

function BarnDoor({
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
      className={`absolute inset-y-0 ${isLeft ? "left-0 origin-left" : "right-0 origin-right"} w-1/2`}
      style={{ transformStyle: "preserve-3d" }}
      animate={
        opening && !reduce
          ? {
              rotateY: isLeft ? -78 : 78,
              x: isLeft ? "-4%" : "4%",
              opacity: 0.25,
            }
          : { rotateY: 0, x: 0, opacity: 1 }
      }
      transition={{ duration: 1.55, ease: [0.19, 1, 0.22, 1] }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `
            repeating-linear-gradient(
              90deg,
              #8B5E3C 0px,
              #8B5E3C 1px,
              #A06B45 1px,
              #A06B45 42px,
              #7A4E30 42px,
              #7A4E30 44px
            ),
            linear-gradient(180deg, #B07A4E 0%, #8B5E3C 55%, #6E452C 100%)
          `,
          boxShadow: isLeft
            ? "inset -8px 0 20px rgba(0,0,0,0.18)"
            : "inset 8px 0 20px rgba(0,0,0,0.18)",
        }}
      />
      {/* Cross brace */}
      <div
        className="absolute top-[18%] right-[12%] left-[12%] h-2 rounded-sm"
        style={{ background: "rgba(62,50,40,0.45)" }}
      />
      <div
        className="absolute top-[48%] right-[12%] left-[12%] h-2 rounded-sm"
        style={{ background: "rgba(62,50,40,0.45)" }}
      />
      <div
        className="absolute top-[78%] right-[12%] left-[12%] h-2 rounded-sm"
        style={{ background: "rgba(62,50,40,0.45)" }}
      />
      {/* Handle */}
      <div
        className={`absolute top-1/2 ${isLeft ? "right-4" : "left-4"} h-10 w-2.5 -translate-y-1/2 rounded-full`}
        style={{
          background: "linear-gradient(180deg, #C9A27A, #7A5A3A)",
          boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
        }}
      />
    </motion.div>
  );
}

function BarnGate({
  names,
  subhead,
  onOpen,
}: {
  names: string;
  subhead?: string;
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
      style={{
        background: `
          radial-gradient(ellipse at 50% 30%, #ebe0cc 0%, transparent 50%),
          #F3EDE3
        `,
        perspective: "1400px",
      }}
      exit={
        reduce
          ? { opacity: 0 }
          : { opacity: 0, transition: { duration: 0.5, delay: 0.08 } }
      }
    >
      <TextureOverlay variant="paper" opacity={0.5} />

      <div className="absolute inset-0 z-10">
        <BarnDoor side="left" opening={opening} reduce={reduce} />
        <BarnDoor side="right" opening={opening} reduce={reduce} />
      </div>

      {/* Warm light through doors when opening */}
      <motion.div
        className="pointer-events-none absolute inset-[10%] rounded-[40%] opacity-0"
        style={{
          background:
            "radial-gradient(circle, #fff8e8 0%, #e8d5a8 35%, transparent 70%)",
        }}
        animate={
          opening && !reduce
            ? { opacity: 1, scale: 1.15 }
            : { opacity: 0, scale: 0.85 }
        }
        transition={{ duration: 1.1, ease: soft }}
      />

      <motion.div
        className="relative z-30 mx-auto flex max-w-sm flex-col items-center px-6 text-center"
        animate={
          opening && !reduce
            ? { opacity: 0, y: -14, scale: 0.97 }
            : { opacity: 1, y: 0, scale: 1 }
        }
        transition={{ duration: 0.55, ease: soft }}
      >
        <div
          className="w-full rounded-sm border px-6 py-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(250,246,239,0.96) 0%, rgba(243,237,227,0.95) 100%)",
            borderColor: "#D9CBB6",
            boxShadow:
              "0 18px 48px rgba(62,50,40,0.18), 0 0 0 5px rgba(250,246,239,0.5)",
          }}
        >
          <motion.p
            className="text-[11px] tracking-[0.36em] uppercase"
            style={{ color: "#6B7F5A" }}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: soft }}
          >
            {subhead ?? "Under the trees"}
          </motion.p>
          <motion.p
            className="mt-5 font-[family-name:var(--font-display)] text-3xl leading-snug sm:text-4xl"
            style={{ color: "#3E3228" }}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9, ease: soft }}
          >
            {names}
          </motion.p>
          <motion.button
            type="button"
            onClick={open}
            className="mt-8 rounded-full border px-8 py-3.5 text-[11px] tracking-[0.3em] uppercase"
            style={{
              borderColor: "#A65D3F",
              background:
                "linear-gradient(180deg, #FAF6EF 0%, #EDE3D4 100%)",
              color: "#3E3228",
              boxShadow: "0 10px 28px rgba(166,93,63,0.18)",
            }}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.8, ease: soft }}
            whileHover={reduce ? undefined : { scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
          >
            Open the barn doors
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Experience({ data }: { data: TemplateData }) {
  const reduce = useReducedMotion();
  const couple =
    displayNames(data.people).join(" & ") || namesLine(data.people);
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
    [1, reduce ? 1 : 0.42],
  );

  return (
    <main
      className="relative min-h-svh overflow-x-hidden bg-[var(--hw-bg)] font-[family-name:var(--font-body)] text-[var(--hw-text)]"
      style={themeStyle(data.palette)}
    >
      <AnimatePresence>
        {!opened ? (
          <BarnGate
            key="gate"
            names={couple}
            subhead={data.copy.subhead}
            onOpen={() => setOpened(true)}
          />
        ) : null}
      </AnimatePresence>

      {opened && data.media.heroImage ? (
        <GardenBackground
          src={data.media.heroImage.src}
          alt={data.media.heroImage.alt}
        />
      ) : null}

      <TextureOverlay variant="paper" opacity={0.42} />
      {/* Soft watercolor wash */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(ellipse at 15% 20%, rgba(107,127,90,0.12) 0%, transparent 42%),
            radial-gradient(ellipse at 85% 15%, rgba(166,93,63,0.1) 0%, transparent 40%),
            radial-gradient(ellipse at 50% 90%, rgba(217,203,182,0.35) 0%, transparent 45%)
          `,
        }}
      />
      {opened ? <AmbientGlow /> : null}
      {opened ? (
        <PetalFall
          colors={LEAF_COLORS}
          count={32}
          className="z-[4] opacity-55"
        />
      ) : null}
      {opened ? (
        <ParticleField
          variant="bokeh"
          count={16}
          colors={[
            "rgba(107,127,90,0.28)",
            "rgba(166,93,63,0.2)",
            "rgba(255,248,235,0.25)",
          ]}
          className="fixed inset-0 z-[5]"
        />
      ) : null}
      {opened ? <FloatingPollen /> : null}

      <motion.div
        className="relative z-10"
        initial={false}
        animate={
          opened
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0, y: 20, filter: "blur(8px)" }
        }
        transition={{ duration: 1.05, ease: soft, delay: opened ? 0.05 : 0 }}
      >
        <section className="relative flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center">
          <GrowingVine className="absolute top-6 left-4 sm:left-10" />
          <GrowingVine className="absolute top-6 right-4 sm:right-10" flip />
          <CornerVine className="absolute bottom-16 left-6 rotate-180 opacity-60 sm:left-14" />
          <CornerVine className="absolute right-6 bottom-16 -rotate-90 opacity-60 sm:right-14" />

          <motion.div style={{ y: heroY, opacity: heroFade }} className="relative">
            <motion.p
              className="text-[11px] tracking-[0.32em] uppercase"
              style={{ color: "var(--hw-accent)" }}
              initial={reduce || !opened ? false : { opacity: 0, y: 10 }}
              animate={opened ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.2, duration: 0.8, ease: soft }}
            >
              {data.copy.subhead}
            </motion.p>

            <motion.h1
              className="mt-5 font-[family-name:var(--font-display)] text-4xl leading-tight sm:text-6xl"
              style={{ color: "var(--hw-secondary)" }}
              initial={reduce || !opened ? false : { opacity: 0, y: 18 }}
              animate={opened ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.35, duration: 1, ease: soft }}
            >
              {namesLine(data.people)}
            </motion.h1>

            <motion.p
              className="mt-4 font-[family-name:var(--font-display)] text-xl italic"
              style={{ color: "var(--hw-primary)" }}
              initial={reduce || !opened ? false : { opacity: 0 }}
              animate={opened ? { opacity: 1 } : undefined}
              transition={{ delay: 0.55, duration: 0.8 }}
            >
              {data.copy.headline}
            </motion.p>

            <motion.p
              className="mt-8 max-w-md text-base leading-7"
              style={{ color: "var(--hw-muted)" }}
              initial={reduce || !opened ? false : { opacity: 0, y: 12 }}
              animate={opened ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.7, duration: 0.85, ease: soft }}
            >
              {data.copy.message}
            </motion.p>

            {data.event?.timeLabel ? (
              <motion.p
                className="mt-8 text-sm tracking-wide"
                style={{ color: "var(--hw-secondary)" }}
                initial={reduce || !opened ? false : { opacity: 0 }}
                animate={opened ? { opacity: 1 } : undefined}
                transition={{ delay: 0.9, duration: 0.8 }}
              >
                {data.event.timeLabel}
              </motion.p>
            ) : null}
          </motion.div>

          {opened ? <ScrollHint /> : null}
        </section>

        {data.media.photos.length > 0 ? (
          <section className="mx-auto grid max-w-5xl gap-4 px-4 sm:grid-cols-3 sm:px-8">
            {data.media.photos.map((photo, index) => (
              <Reveal key={photo.src} delay={index * 0.08}>
                <div
                  className="relative aspect-[3/4] overflow-hidden"
                  style={{
                    boxShadow: "0 16px 40px rgba(62,50,40,0.12)",
                    border: "3px solid color-mix(in srgb, var(--hw-surface) 90%, var(--hw-border))",
                    transform: `rotate(${index % 2 === 0 ? -1.2 : 1.2}deg)`,
                  }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            ))}
          </section>
        ) : null}

        <section className="relative mx-auto max-w-lg px-6 py-20">
          <GrowingVine className="pointer-events-none absolute -top-4 left-0 opacity-70" />
          <Reveal>
            {data.event?.place ? (
              <div className="mb-10 text-center">
                <p
                  className="text-[11px] tracking-[0.3em] uppercase"
                  style={{ color: "var(--hw-accent)" }}
                >
                  The gathering
                </p>
                <PlaceLink place={data.event.place} className="mt-3 block">
                  <span
                    className="block font-[family-name:var(--font-display)] text-2xl"
                    style={{ color: "var(--hw-secondary)" }}
                  >
                    {data.event.place.name}
                  </span>
                  {data.event.place.city ? (
                    <span
                      className="mt-1 block text-sm underline underline-offset-4"
                      style={{ color: "var(--hw-muted)" }}
                    >
                      {data.event.place.city}
                    </span>
                  ) : null}
                </PlaceLink>
              </div>
            ) : null}
            {data.extras.rsvp?.enabled ? (
              <RsvpCard
                note={data.extras.rsvp.note}
                cta={data.copy.cta}
                storageKey={`hw-rsvp-${data.meta.slug}-${data.meta.wishId}`}
                occasion={data.meta.occasion}
                slug={data.meta.slug}
                wishId={data.meta.wishId}
              />
            ) : null}
          </Reveal>
        </section>

        <footer className="px-6 pb-16 text-center">
          <Reveal>
            <p
              className="font-[family-name:var(--font-display)] text-2xl italic"
              style={{ color: "var(--hw-primary)" }}
            >
              {couple}
            </p>
            <p
              className="mt-2 text-[11px] tracking-[0.24em] uppercase"
              style={{ color: "var(--hw-muted)" }}
            >
              Come as you are
            </p>
          </Reveal>
        </footer>
      </motion.div>
    </main>
  );
}
