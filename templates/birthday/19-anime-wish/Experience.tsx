"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { MusicToggle } from "@/templates/_shared/components/MusicToggle";
import { RsvpCard } from "@/templates/_shared/components/RsvpCard";
import { ScrollHint } from "@/templates/_shared/components/ScrollHint";
import { PlaceLink } from "@/templates/_shared/components/VenueMap";
import { displayNames } from "@/templates/_shared/people";
import { themeStyle } from "@/templates/_shared/theme";
import type { TemplateData } from "@/templates/_shared/types";

const soft = [0.22, 1, 0.36, 1] as const;
const FOLDER = "19-anime-wish";

function wishImg(data: TemplateData, file: string) {
  return `/media/${data.meta.occasion}/${FOLDER}/wishes/${data.meta.wishId}/images/${file}`;
}

function Starfield({ count = 64 }: { count?: number }) {
  const reduce = useReducedMotion();
  const stars = useMemo(
    () =>
      Array.from({ length: reduce ? Math.min(count, 18) : count }, (_, i) => ({
        id: i,
        left: `${(i * 47) % 100}%`,
        top: `${(i * 31) % 92}%`,
        size: 1 + (i % 4),
        delay: (i % 14) * 0.28,
        duration: 1.8 + (i % 6) * 0.45,
      })),
    [count, reduce],
  );

  if (reduce) {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-50">
        {stars.map((star) => (
          <span
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((star) => (
        <motion.span
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            boxShadow: `0 0 ${4 + star.size * 2}px rgba(255,255,255,0.9)`,
          }}
          animate={{ opacity: [0.15, 1, 0.2], scale: [1, 1.5, 1] }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function SparkleRain({ active }: { active: boolean }) {
  const reduce = useReducedMotion();
  const sparks = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        left: `${(i * 37) % 100}%`,
        delay: (i % 10) * 0.35,
        duration: 4 + (i % 5),
        size: 3 + (i % 5),
        color: ["#fff6e8", "#7EC8FF", "#FF6B9D", "#F4C27A"][i % 4],
      })),
    [],
  );

  if (reduce || !active) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {sparks.map((spark) => (
        <motion.span
          key={spark.id}
          className="absolute rounded-full"
          style={{
            left: spark.left,
            top: "-8%",
            width: spark.size,
            height: spark.size,
            background: spark.color,
            boxShadow: `0 0 12px ${spark.color}`,
          }}
          animate={{ y: ["0vh", "110vh"], opacity: [0, 1, 1, 0], rotate: [0, 180] }}
          transition={{
            duration: spark.duration,
            delay: spark.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

function LightRays() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="absolute top-[-20%] left-1/2 h-[140%] w-16 origin-top"
          style={{
            marginLeft: -32,
            background:
              "linear-gradient(180deg, rgba(255,246,232,0.35), transparent 70%)",
            rotate: `${-28 + i * 14}deg`,
            filter: "blur(8px)",
          }}
          animate={{ opacity: [0.15, 0.45, 0.15] }}
          transition={{
            duration: 5 + i * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
}

function CometBurst({ active }: { active: boolean }) {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute h-[2px] origin-left rounded-full"
          style={{
            top: `${12 + i * 14}%`,
            left: "-30%",
            width: `${40 + i * 8}%`,
            background:
              "linear-gradient(90deg, transparent, #fff6e8 25%, #7EC8FF 60%, #FF6B9D, transparent)",
            boxShadow: "0 0 24px rgba(126,200,255,0.65)",
            rotate: `${-22 - i * 5}deg`,
          }}
          initial={{ x: 0, opacity: 0 }}
          animate={
            active
              ? { x: ["0%", "180%"], opacity: [0, 1, 0.9, 0] }
              : { opacity: 0 }
          }
          transition={{ duration: 1.55, delay: 0.1 + i * 0.14, ease: soft }}
        />
      ))}
    </div>
  );
}

function GlowPulse() {
  return (
    <motion.div
      className="pointer-events-none absolute top-[18%] left-1/2 h-64 w-64 -translate-x-1/2 rounded-full"
      style={{
        background:
          "radial-gradient(circle, rgba(255,107,157,0.28) 0%, rgba(126,200,255,0.12) 40%, transparent 70%)",
        filter: "blur(8px)",
      }}
      animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.85, 0.5] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function OpeningGate({
  data,
  name,
  onEnter,
}: {
  data: TemplateData;
  name: string;
  onEnter: () => void;
}) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<"idle" | "burst" | "exit">("idle");

  useEffect(() => {
    if (reduce) return;
    const t = window.setTimeout(() => setPhase("burst"), 350);
    return () => window.clearTimeout(t);
  }, [reduce]);

  function enter() {
    if (phase === "exit") return;
    setPhase("exit");
    window.setTimeout(onEnter, reduce ? 160 : 950);
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center overflow-hidden sm:items-center"
      animate={phase === "exit" ? { opacity: 0, scale: 1.04 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: soft }}
    >
      <Image
        src={wishImg(data, "anime-world-sky.png")}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(7,11,26,0.35) 0%, rgba(7,11,26,0.55) 45%, rgba(7,11,26,0.92) 100%)",
        }}
      />
      <Starfield count={50} />
      <LightRays />
      <CometBurst active={phase !== "idle"} />
      <GlowPulse />

      {/* Spirit fox floating */}
      <motion.div
        className="absolute top-[12%] right-[6%] w-28 sm:top-[16%] sm:right-[12%] sm:w-36"
        initial={reduce ? false : { opacity: 0, y: 30, scale: 0.8 }}
        animate={{ opacity: 1, y: [0, -12, 0], scale: 1 }}
        transition={{
          opacity: { delay: 0.7, duration: 0.8 },
          scale: { delay: 0.7, duration: 0.8 },
          y: { delay: 1.2, duration: 3.2, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <div
          className="relative aspect-square overflow-hidden rounded-full"
          style={{
            boxShadow: "0 0 40px rgba(244,194,122,0.35)",
            border: "2px solid rgba(255,246,232,0.35)",
          }}
        >
          <Image
            src={wishImg(data, "anime-spirit-fox.png")}
            alt="Spirit companion"
            fill
            className="object-cover"
            sizes="160px"
          />
        </div>
      </motion.div>

      {/* Heroine */}
      <motion.div
        className="absolute bottom-0 left-[-4%] w-[58%] max-w-md sm:left-[2%] sm:w-[42%]"
        initial={reduce ? false : { opacity: 0, x: -48, filter: "blur(10px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ delay: 0.55, duration: 1.15, ease: soft }}
      >
        <div className="relative aspect-[3/4] w-full">
          <Image
            src={wishImg(data, "anime-hero-girl.png")}
            alt="Anime heroine"
            fill
            priority
            className="object-contain object-bottom drop-shadow-[0_20px_50px_rgba(126,200,255,0.35)]"
            sizes="(max-width: 640px) 60vw, 40vw"
          />
        </div>
      </motion.div>

      <div className="relative z-10 mb-16 ml-auto w-full max-w-md px-6 text-center sm:mb-0 sm:mr-[6%] sm:ml-0 sm:text-left">
        <motion.p
          className="text-[11px] tracking-[0.42em] uppercase"
          style={{ color: "#7EC8FF" }}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.8, ease: soft }}
        >
          {data.copy.subhead ?? "Anime world"}
        </motion.p>
        <motion.h1
          className="mt-4 font-[family-name:var(--font-display)] text-3xl leading-tight sm:text-5xl"
          style={{
            color: "#F4F1FF",
            textShadow: "0 0 36px rgba(255,107,157,0.45)",
          }}
          initial={reduce ? false : { opacity: 0, y: 22, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 1.05, duration: 1, ease: soft }}
        >
          {name}&apos;s anime night
        </motion.h1>
        <motion.p
          className="mt-3 text-sm leading-relaxed"
          style={{ color: "#C5CBE8" }}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          Step into the movie world. The comet is waiting.
        </motion.p>
        <motion.button
          type="button"
          onClick={enter}
          className="mt-8 rounded-full border px-8 py-3.5 text-[11px] tracking-[0.34em] uppercase"
          style={{
            borderColor: "rgba(255,107,157,0.55)",
            background:
              "linear-gradient(180deg, rgba(255,107,157,0.25), rgba(126,200,255,0.15))",
            color: "#F4F1FF",
            boxShadow: "0 0 40px rgba(255,107,157,0.28)",
          }}
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.75, ease: soft }}
          whileHover={reduce ? undefined : { scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          Enter the world
        </motion.button>
      </div>
    </motion.div>
  );
}

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.95, delay, ease: soft }}
    >
      {children}
    </motion.div>
  );
}

function IdleHero({
  src,
  alt,
  opened,
}: {
  src: string;
  alt: string;
  opened: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="relative mx-auto aspect-[3/4] w-full max-w-md"
      initial={reduce || !opened ? false : { opacity: 0, x: -30 }}
      animate={
        opened
          ? {
              opacity: 1,
              x: 0,
              y: reduce ? 0 : [0, -6, 0],
              scale: reduce ? 1 : [1, 1.012, 1],
            }
          : undefined
      }
      transition={{
        opacity: { delay: 0.25, duration: 1, ease: soft },
        x: { delay: 0.25, duration: 1, ease: soft },
        y: { duration: 4.2, repeat: Infinity, ease: "easeInOut" },
        scale: { duration: 4.2, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain object-bottom drop-shadow-[0_30px_60px_rgba(255,107,157,0.35)]"
        sizes="(max-width: 640px) 90vw, 420px"
        priority
      />
      {!reduce && opened ? (
        <motion.span
          className="pointer-events-none absolute top-[22%] left-[38%] h-1 w-5 rounded-full bg-[#2a1a35]/80"
          animate={{ scaleY: [1, 0.08, 1], opacity: [1, 1, 1] }}
          transition={{
            duration: 0.12,
            repeat: Infinity,
            repeatDelay: 3.8,
            ease: "easeInOut",
          }}
        />
      ) : null}
    </motion.div>
  );
}

function SceneSection({
  children,
  className,
  wipe = "left",
}: {
  children: ReactNode;
  className?: string;
  wipe?: "left" | "right";
}) {
  const reduce = useReducedMotion();
  const clipFrom =
    wipe === "left"
      ? "inset(0 100% 0 0 round 0px)"
      : "inset(0 0 0 100% round 0px)";

  return (
    <motion.section
      className={className}
      initial={reduce ? false : { clipPath: clipFrom, opacity: 0.6 }}
      whileInView={{ clipPath: "inset(0 0 0 0 round 0px)", opacity: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 1.05, ease: soft }}
    >
      {children}
    </motion.section>
  );
}

export function Experience({ data }: { data: TemplateData }) {
  const reduce = useReducedMotion();
  const name = displayNames(data.people)[0] ?? "";
  const age = data.extras.milestoneAge;
  const [opened, setOpened] = useState(false);

  const stills = data.media.photos.filter(
    (p) =>
      !p.src.includes("anime-hero-girl") &&
      !p.src.includes("anime-spirit-fox") &&
      !p.src.includes("anime-world-sky"),
  );
  // After bindMedia, paths are absolute — also show character cards from known files
  const gallery = data.media.photos;

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
  const bgY = useTransform(scrollYProgress, [0, 0.35], [0, reduce ? 0 : 80]);

  return (
    <main
      className="relative min-h-svh overflow-x-hidden bg-[var(--hw-bg)] font-[family-name:var(--font-body)] text-[var(--hw-text)]"
      style={themeStyle(data.palette)}
    >
      <AnimatePresence>
        {!opened ? (
          <OpeningGate
            key="gate"
            data={data}
            name={name}
            onEnter={() => setOpened(true)}
          />
        ) : null}
      </AnimatePresence>

      {/* Living world backdrop */}
      <motion.div className="pointer-events-none fixed inset-0 -z-10" style={{ y: bgY }}>
        <Image
          src={wishImg(data, "anime-world-sky.png")}
          alt=""
          fill
          className="object-cover opacity-55"
          sizes="100vw"
          priority={opened}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(7,11,26,0.55) 0%, rgba(7,11,26,0.72) 40%, rgba(7,11,26,0.94) 100%)",
          }}
        />
      </motion.div>
      {opened ? <Starfield count={44} /> : null}
      {opened ? <SparkleRain active /> : null}
      {opened ? <LightRays /> : null}

      <motion.div
        initial={false}
        animate={
          opened
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0, y: 28, filter: "blur(12px)" }
        }
        transition={{ duration: 1.15, ease: soft, delay: opened ? 0.05 : 0 }}
      >
        {/* Hero with characters */}
        <section className="relative flex min-h-svh items-end justify-center px-4 pb-10 pt-24 sm:items-center sm:pb-20">
          <motion.div
            style={{ y: heroY }}
            className="relative grid w-full max-w-5xl items-end gap-6 sm:grid-cols-[1.05fr_0.95fr]"
          >
            <div className="relative order-2 sm:order-1">
              <GlowPulse />
              <IdleHero
                src={wishImg(data, "anime-hero-girl.png")}
                alt={`${name} anime heroine`}
                opened={opened}
              />

              <motion.div
                className="absolute top-[8%] right-[2%] w-24 sm:w-32"
                animate={
                  reduce
                    ? undefined
                    : { y: [0, -14, 0], rotate: [-2, 3, -2] }
                }
                transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <div
                  className="relative aspect-square overflow-hidden rounded-full"
                  style={{
                    boxShadow: "0 0 36px rgba(126,200,255,0.4)",
                    border: "2px solid rgba(255,246,232,0.4)",
                  }}
                >
                  <Image
                    src={wishImg(data, "anime-spirit-fox.png")}
                    alt="Spirit friend"
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>
              </motion.div>
            </div>

            <div className="order-1 px-2 text-center sm:order-2 sm:pb-24 sm:text-left">
              <motion.p
                className="text-[11px] tracking-[0.4em] uppercase"
                style={{ color: "var(--hw-accent)" }}
                initial={reduce || !opened ? false : { opacity: 0, y: 10 }}
                animate={opened ? { opacity: 1, y: 0 } : undefined}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                {data.copy.subhead ?? "Anime world"}
              </motion.p>

              {age ? (
                <motion.p
                  className="mt-4 font-[family-name:var(--font-display)] text-[5.5rem] leading-none sm:text-[7rem]"
                  style={{
                    color: "var(--hw-primary)",
                    textShadow:
                      "0 0 40px rgba(255,107,157,0.55), 0 0 80px rgba(126,200,255,0.25)",
                  }}
                  initial={
                    reduce || !opened
                      ? false
                      : { opacity: 0, scale: 0.8, filter: "blur(14px)" }
                  }
                  animate={
                    opened
                      ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                      : undefined
                  }
                  transition={{ delay: 0.35, duration: 1.1, ease: soft }}
                >
                  {age}
                </motion.p>
              ) : null}

              <motion.h1
                className="mt-2 font-[family-name:var(--font-display)] text-4xl sm:text-5xl"
                style={{ color: "var(--hw-text)" }}
                initial={reduce || !opened ? false : { opacity: 0, y: 16 }}
                animate={opened ? { opacity: 1, y: 0 } : undefined}
                transition={{ delay: 0.5, duration: 0.85, ease: soft }}
              >
                {name}
              </motion.h1>

              <motion.p
                className="mt-3 text-lg"
                style={{ color: "var(--hw-secondary)" }}
                initial={reduce || !opened ? false : { opacity: 0 }}
                animate={opened ? { opacity: 1 } : undefined}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                {data.copy.headline}
              </motion.p>

              {/* Anime speech bubble */}
              <motion.div
                className="relative mx-auto mt-8 max-w-sm rounded-3xl rounded-bl-md border px-5 py-4 text-left sm:mx-0"
                style={{
                  background: "rgba(18,24,51,0.88)",
                  borderColor: "rgba(126,200,255,0.35)",
                  boxShadow: "0 16px 40px rgba(0,0,0,0.35)",
                }}
                initial={reduce || !opened ? false : { opacity: 0, y: 18 }}
                animate={opened ? { opacity: 1, y: 0 } : undefined}
                transition={{ delay: 0.9, duration: 0.85, ease: soft }}
              >
                <p className="text-sm leading-7">{data.copy.message}</p>
                <span
                  className="absolute -bottom-2 left-8 h-3 w-3 rotate-45 border-r border-b"
                  style={{
                    background: "rgba(18,24,51,0.88)",
                    borderColor: "rgba(126,200,255,0.35)",
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
          {opened ? <ScrollHint className="!bottom-6" /> : null}
        </section>

        {/* Character gallery / stills */}
        <SceneSection className="relative mx-auto max-w-5xl px-6 py-12" wipe="left">
          <Reveal>
            <p
              className="mb-8 text-center text-[11px] tracking-[0.32em] uppercase"
              style={{ color: "var(--hw-accent)" }}
            >
              Cast & world
            </p>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-3">
            {(stills.length > 0 ? stills : gallery).map((photo, index) => (
              <Reveal key={photo.src} delay={index * 0.1}>
                <figure
                  className="group relative overflow-hidden rounded-2xl border"
                  style={{
                    borderColor: "rgba(126,200,255,0.25)",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
                  }}
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(7,11,26,0.8) 0%, transparent 50%)",
                      }}
                    />
                    <motion.div
                      className="pointer-events-none absolute inset-0 opacity-0 mix-blend-screen group-hover:opacity-40"
                      style={{
                        background:
                          "radial-gradient(circle at 30% 20%, rgba(255,246,232,0.5), transparent 50%)",
                      }}
                    />
                  </div>
                  {photo.caption ? (
                    <figcaption
                      className="absolute right-0 bottom-0 left-0 px-4 pb-4 text-sm tracking-[0.16em] uppercase"
                      style={{ color: "var(--hw-text)" }}
                    >
                      {photo.caption}
                    </figcaption>
                  ) : null}
                </figure>
              </Reveal>
            ))}
          </div>
        </SceneSection>

        {/* Party / RSVP */}
        <SceneSection className="relative mx-auto max-w-md px-6 py-20" wipe="right">
          <Reveal>
            {data.event ? (
              <div className="mb-10 text-center">
                <p
                  className="text-[11px] tracking-[0.32em] uppercase"
                  style={{ color: "var(--hw-accent)" }}
                >
                  Next episode
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
        </SceneSection>

        <SceneSection className="px-6 pb-16 text-center" wipe="left">
          <Reveal>
            <p
              className="font-[family-name:var(--font-display)] text-xl"
              style={{ color: "var(--hw-secondary)" }}
            >
              {name}
            </p>
            <p
              className="mt-2 text-[11px] tracking-[0.28em] uppercase"
              style={{ color: "var(--hw-muted)" }}
            >
              Main character energy
            </p>
          </Reveal>
        </SceneSection>
      </motion.div>

      {opened && data.extras.backgroundMusic && data.media.music ? (
        <MusicToggle track={data.media.music} />
      ) : null}
    </main>
  );
}
