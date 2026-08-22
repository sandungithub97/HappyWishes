"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
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
import type { Photo, TemplateData } from "@/templates/_shared/types";

const soft = [0.22, 1, 0.36, 1] as const;
const FOLDER = "19-anime-wish";

function wishImg(data: TemplateData, file: string) {
  return `/media/${data.meta.occasion}/${FOLDER}/wishes/${data.meta.wishId}/images/${file}`;
}

function CinematicBars() {
  return (
    <>
      <div
        className="pointer-events-none fixed top-0 right-0 left-0 z-40 h-[5vh] min-h-[28px] max-h-[52px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.65) 70%, transparent)",
        }}
      />
      <div
        className="pointer-events-none fixed right-0 bottom-0 left-0 z-40 h-[5vh] min-h-[28px] max-h-[52px]"
        style={{
          background:
            "linear-gradient(0deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.65) 70%, transparent)",
        }}
      />
    </>
  );
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
      Array.from({ length: 32 }, (_, i) => ({
        id: i,
        left: `${(i * 37) % 100}%`,
        delay: (i % 10) * 0.35,
        duration: 5 + (i % 6),
        size: 2 + (i % 5),
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

function ScrollComet({ progress }: { progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const reduce = useReducedMotion();
  const x = useTransform(progress, [0, 0.45, 1], reduce ? ["0%", "0%", "0%"] : ["-15%", "55%", "120%"]);
  const y = useTransform(progress, [0, 0.5, 1], reduce ? ["0%", "0%", "0%"] : ["8%", "22%", "38%"]);
  const opacity = useTransform(progress, [0, 0.08, 0.5, 0.92, 1], [0, 1, 1, 0.6, 0]);

  if (reduce) return null;

  return (
    <motion.div
      className="pointer-events-none fixed z-[4] h-[2px] w-[min(42vw,280px)] origin-left rounded-full"
      style={{
        x,
        y,
        opacity,
        top: "18%",
        left: 0,
        rotate: -24,
        background:
          "linear-gradient(90deg, transparent, #fff6e8 20%, #7EC8FF 55%, #FF6B9D 80%, transparent)",
        boxShadow: "0 0 28px rgba(126,200,255,0.7), 0 0 60px rgba(255,107,157,0.35)",
      }}
    />
  );
}

function GlowPulse({ className }: { className?: string }) {
  return (
    <motion.div
      className={`pointer-events-none absolute rounded-full ${className ?? "top-[18%] left-1/2 h-64 w-64 -translate-x-1/2"}`}
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
  age,
  heroSrc,
  onEnter,
}: {
  data: TemplateData;
  name: string;
  age?: number;
  heroSrc: string;
  onEnter: () => void;
}) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<"idle" | "burst" | "exit">("idle");

  function enter() {
    if (phase === "exit") return;
    setPhase("burst");
    window.setTimeout(() => setPhase("exit"), reduce ? 80 : 650);
    window.setTimeout(onEnter, reduce ? 200 : 1200);
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden"
      animate={phase === "exit" ? { opacity: 0, scale: 1.05 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: soft }}
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
            "linear-gradient(180deg, rgba(7,11,26,0.45) 0%, rgba(7,11,26,0.55) 40%, rgba(7,11,26,0.88) 100%)",
        }}
      />
      <Starfield count={52} />
      <LightRays />
      <CometBurst active={phase !== "idle"} />
      <GlowPulse className="top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2" />

      {/* Character — anchored bottom, behind title */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex justify-center"
        initial={reduce ? false : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 1.1, ease: soft }}
      >
        <motion.div
          className="relative h-[min(52vh,480px)] w-full max-w-md sm:max-w-lg"
          animate={reduce ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src={heroSrc}
            alt=""
            fill
            priority
            className="object-contain object-bottom opacity-85"
            sizes="(max-width: 640px) 90vw, 480px"
          />
          <div
            className="absolute inset-x-0 bottom-0 h-1/3"
            style={{
              background:
                "linear-gradient(to top, rgba(7,11,26,0.95) 0%, transparent 100%)",
            }}
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute top-[8%] right-[5%] z-20 w-20 sm:top-[10%] sm:right-[8%] sm:w-28"
        animate={reduce ? undefined : { y: [0, -14, 0], rotate: [-2, 3, -2] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
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
            sizes="112px"
          />
        </div>
      </motion.div>

      {/* Title card — centered middle */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.p
          className="font-[family-name:var(--font-body)] text-[11px] tracking-[0.42em] uppercase"
          style={{ color: "#7EC8FF" }}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.85, ease: soft }}
        >
          {data.copy.subhead ?? "Anime world"}
        </motion.p>

        {age ? (
          <motion.p
            className="mt-5 font-[family-name:var(--font-display)] text-[4.5rem] leading-none sm:text-[6rem]"
            style={{
              color: "#FF6B9D",
              textShadow:
                "0 0 40px rgba(255,107,157,0.55), 0 0 80px rgba(126,200,255,0.3)",
            }}
            initial={reduce ? false : { opacity: 0, scale: 0.8, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.7, duration: 1, ease: soft }}
          >
            {age}
          </motion.p>
        ) : null}

        <motion.h1
          className={`font-[family-name:var(--font-display)] text-3xl leading-tight sm:text-5xl ${age ? "mt-2" : "mt-5"}`}
          style={{
            color: "#F4F1FF",
            textShadow: "0 0 36px rgba(255,107,157,0.45)",
          }}
          initial={reduce ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.85, duration: 1, ease: soft }}
        >
          {name}
        </motion.h1>

        <motion.p
          className="mt-3 max-w-sm font-[family-name:var(--font-display)] text-lg sm:text-xl"
          style={{ color: "#F4C27A" }}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05, duration: 0.8 }}
        >
          {data.copy.headline}
        </motion.p>

        <motion.p
          className="mt-4 max-w-sm text-sm leading-relaxed"
          style={{ color: "#C5CBE8" }}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.15, duration: 0.8 }}
        >
          Tap below — her birthday story begins.
        </motion.p>

        <motion.button
          type="button"
          onClick={enter}
          className="mt-8 rounded-full border px-9 py-3.5 font-[family-name:var(--font-display)] text-[11px] tracking-[0.34em] uppercase"
          style={{
            borderColor: "rgba(255,107,157,0.55)",
            background:
              "linear-gradient(180deg, rgba(255,107,157,0.25), rgba(126,200,255,0.15))",
            color: "#F4F1FF",
            boxShadow: "0 0 40px rgba(255,107,157,0.28)",
          }}
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.35, duration: 0.75, ease: soft }}
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
      initial={reduce ? false : { opacity: 0, y: 36, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, delay, ease: soft }}
    >
      {children}
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
      initial={reduce ? false : { clipPath: clipFrom, opacity: 0.55 }}
      whileInView={{ clipPath: "inset(0 0 0 0 round 0px)", opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1.1, ease: soft }}
    >
      {children}
    </motion.section>
  );
}

function HeroCharacter({
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
      className="relative mx-auto h-[min(46vh,380px)] w-full max-w-[min(100%,320px)] sm:max-w-sm"
      initial={reduce || !opened ? false : { opacity: 0, y: 24, filter: "blur(12px)" }}
      animate={
        opened
          ? {
              opacity: 1,
              y: reduce ? 0 : [0, -6, 0],
              filter: "blur(0px)",
            }
          : undefined
      }
      transition={{
        opacity: { delay: 0.2, duration: 1.1, ease: soft },
        y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
        filter: { delay: 0.2, duration: 1.1 },
      }}
    >
      <div
        className="absolute inset-[5%] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,107,157,0.35) 0%, rgba(126,200,255,0.2) 50%, transparent 70%)",
        }}
      />
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain object-bottom drop-shadow-[0_24px_50px_rgba(255,107,157,0.35)]"
        sizes="(max-width: 640px) 80vw, 320px"
        priority
      />
    </motion.div>
  );
}

/** Three scene stills in one view window — not a scroll gallery. */
function SceneViewWindow({ photos }: { photos: Photo[] }) {
  const reduce = useReducedMotion();
  const panels = photos.slice(0, 3);
  const offsets = [-10, 0, 10];

  if (panels.length === 0) return null;

  return (
    <section className="relative px-4 py-12 sm:px-6 sm:py-16">
      <Reveal>
        <p
          className="mb-6 text-center text-[11px] tracking-[0.32em] uppercase"
          style={{ color: "var(--hw-accent)" }}
        >
          Scene preview
        </p>
      </Reveal>

      <div className="relative mx-auto max-w-5xl">
        <div
          className="relative overflow-hidden rounded-2xl border p-3 sm:p-4"
          style={{
            borderColor: "rgba(126,200,255,0.35)",
            background: "rgba(10,14,32,0.88)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
          }}
        >
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {panels.map((photo, index) => (
              <motion.figure
                key={photo.src}
                className="group relative min-w-0 overflow-hidden rounded-xl border"
                style={{ borderColor: "rgba(126,200,255,0.22)" }}
                initial={reduce ? false : { opacity: 0, y: 20 + index * 6 }}
                whileInView={{ opacity: 1, y: offsets[index] ?? 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: index * 0.1, duration: 0.85, ease: soft }}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-black/50">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 30vw, 18vw"
                    className="object-contain object-bottom transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(7,11,26,0.8) 0%, transparent 50%)",
                    }}
                  />
                </div>
                {photo.caption ? (
                  <figcaption
                    className="absolute right-0 bottom-0 left-0 py-2 text-center text-[10px] tracking-[0.12em] uppercase"
                    style={{ color: "var(--hw-text)" }}
                  >
                    {photo.caption}
                  </figcaption>
                ) : null}
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Experience({ data }: { data: TemplateData }) {
  const reduce = useReducedMotion();
  const name = displayNames(data.people)[0] ?? "";
  const age = data.extras.milestoneAge;
  const [opened, setOpened] = useState(false);

  const heroSrc =
    data.media.heroImage?.src ??
    wishImg(data, "anime-hero-girl.png");

  const viewPhotos = data.media.photos.filter((photo) => photo.src !== heroSrc);

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
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });
  const heroY = useTransform(smoothProgress, [0, 0.22], [0, reduce ? 0 : -52]);
  const heroFade = useTransform(smoothProgress, [0, 0.18], [1, reduce ? 1 : 0.3]);
  const bgY = useTransform(smoothProgress, [0, 0.4], [0, reduce ? 0 : 100]);
  const bgScale = useTransform(smoothProgress, [0, 0.35], [1, reduce ? 1 : 1.08]);

  return (
    <main
      className="relative min-h-svh scroll-smooth overflow-x-hidden bg-[var(--hw-bg)] font-[family-name:var(--font-body)] text-[var(--hw-text)]"
      style={themeStyle(data.palette)}
    >
      <AnimatePresence>
        {!opened ? (
          <OpeningGate
            key="gate"
            data={data}
            name={name}
            age={age}
            heroSrc={heroSrc}
            onEnter={() => setOpened(true)}
          />
        ) : null}
      </AnimatePresence>

      {opened ? <CinematicBars /> : null}
      {opened ? <ScrollComet progress={smoothProgress} /> : null}

      <motion.div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{ y: bgY, scale: bgScale }}
      >
        <Image
          src={wishImg(data, "anime-world-sky.png")}
          alt=""
          fill
          className="object-cover opacity-50"
          sizes="100vw"
          priority={opened}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(7,11,26,0.5) 0%, rgba(7,11,26,0.72) 38%, rgba(7,11,26,0.96) 100%)",
          }}
        />
      </motion.div>

      {opened ? <Starfield count={48} /> : null}
      {opened ? <SparkleRain active /> : null}
      {opened ? <LightRays /> : null}

      <motion.div
        initial={false}
        animate={
          opened
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0, y: 28, filter: "blur(12px)" }
        }
        transition={{ duration: 1.15, ease: soft, delay: opened ? 0.08 : 0 }}
      >
        {/* Act I — hero */}
        <section className="relative px-4 pt-[max(5rem,10vh)] pb-6 sm:px-6 sm:pb-10">
          <motion.div
            style={{ y: heroY, opacity: heroFade }}
            className="relative mx-auto grid w-full max-w-5xl items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-10"
          >
            <div className="relative order-1 text-center lg:pr-4 lg:text-left">
              <motion.p
                className="text-xs font-semibold tracking-[0.28em] uppercase"
                style={{ color: "var(--hw-accent)" }}
                initial={reduce || !opened ? false : { opacity: 0, y: 10 }}
                animate={opened ? { opacity: 1, y: 0 } : undefined}
                transition={{ delay: 0.15, duration: 0.8 }}
              >
                {data.copy.subhead}
              </motion.p>

              <motion.p
                className="mt-4 font-[family-name:var(--font-display)] text-3xl leading-tight sm:text-4xl"
                style={{
                  color: "var(--hw-secondary)",
                  textShadow: "0 0 28px rgba(244,194,122,0.35)",
                }}
                initial={reduce || !opened ? false : { opacity: 0, y: 14 }}
                animate={opened ? { opacity: 1, y: 0 } : undefined}
                transition={{ delay: 0.22, duration: 0.85, ease: soft }}
              >
                {data.copy.headline}
              </motion.p>

              {age ? (
                <motion.p
                  className="mt-4 font-[family-name:var(--font-display)] text-[5rem] leading-none sm:text-[6.5rem]"
                  style={{
                    color: "var(--hw-primary)",
                    textShadow:
                      "0 0 40px rgba(255,107,157,0.6), 0 0 80px rgba(126,200,255,0.3)",
                  }}
                  initial={
                    reduce || !opened
                      ? false
                      : { opacity: 0, scale: 0.75, filter: "blur(16px)" }
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
                initial={reduce || !opened ? false : { opacity: 0, y: 18 }}
                animate={opened ? { opacity: 1, y: 0 } : undefined}
                transition={{ delay: 0.48, duration: 0.85, ease: soft }}
              >
                {name}
              </motion.h1>

              <motion.div
                className="relative mx-auto mt-8 max-w-md rounded-2xl border-2 px-6 py-6 text-left lg:mx-0"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(255,107,157,0.18) 0%, rgba(18,24,51,0.95) 45%)",
                  borderColor: "rgba(255,107,157,0.55)",
                  boxShadow:
                    "0 20px 50px rgba(0,0,0,0.4), 0 0 40px rgba(255,107,157,0.15)",
                }}
                initial={reduce || !opened ? false : { opacity: 0, y: 22 }}
                animate={opened ? { opacity: 1, y: 0 } : undefined}
                transition={{ delay: 0.62, duration: 0.9, ease: soft }}
              >
                <p
                  className="text-[10px] font-bold tracking-[0.3em] uppercase"
                  style={{ color: "var(--hw-primary)" }}
                >
                  Birthday wish
                </p>
                <p className="mt-3 text-base leading-8 font-medium sm:text-lg sm:leading-9">
                  {data.copy.message}
                </p>
              </motion.div>
            </div>

            <div className="relative order-2 flex justify-center lg:justify-end">
              <GlowPulse className="top-1/2 left-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2" />
              <HeroCharacter src={heroSrc} alt={`${name} — main character`} opened={opened} />
            </div>
          </motion.div>

          {opened ? (
            <div className="relative mt-8 flex justify-center">
              <ScrollHint />
            </div>
          ) : null}
        </section>

        {/* Scene view — three different characters, not the hero */}
        {viewPhotos.length > 0 ? <SceneViewWindow photos={viewPhotos} /> : null}

        {/* Party / RSVP */}
        <SceneSection className="relative mx-auto max-w-md px-6 py-20" wipe="left">
          <Reveal>
            {data.event ? (
              <div className="mb-10 text-center">
                <p
                  className="text-[11px] tracking-[0.32em] uppercase"
                  style={{ color: "var(--hw-accent)" }}
                >
                  Next scene
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

        <SceneSection className="px-6 pb-20 text-center" wipe="right">
          <Reveal>
            <p
              className="font-[family-name:var(--font-display)] text-2xl"
              style={{ color: "var(--hw-secondary)" }}
            >
              Happy Birthday, {name}!
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
