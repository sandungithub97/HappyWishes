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
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
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
  heroSrc,
  onEnter,
}: {
  data: TemplateData;
  name: string;
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
      className="fixed inset-0 z-50 flex items-end justify-center overflow-hidden sm:items-center"
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
            "linear-gradient(180deg, rgba(7,11,26,0.3) 0%, rgba(7,11,26,0.5) 42%, rgba(7,11,26,0.94) 100%)",
        }}
      />
      <Starfield count={52} />
      <LightRays />
      <CometBurst active={phase !== "idle"} />
      <GlowPulse />

      <motion.div
        className="absolute top-[10%] right-[5%] w-24 sm:top-[14%] sm:right-[10%] sm:w-32"
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
            sizes="128px"
          />
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-[-2%] w-[62%] max-w-lg sm:left-[4%] sm:w-[44%]"
        initial={reduce ? false : { opacity: 0, x: -56, filter: "blur(12px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ delay: 0.4, duration: 1.2, ease: soft }}
      >
        <motion.div
          className="relative aspect-[3/4] w-full"
          animate={reduce ? undefined : { y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src={heroSrc}
            alt="Anime heroine"
            fill
            priority
            className="object-contain object-bottom drop-shadow-[0_24px_60px_rgba(126,200,255,0.45)]"
            sizes="(max-width: 640px) 62vw, 44vw"
          />
        </motion.div>
      </motion.div>

      <div className="relative z-10 mb-14 ml-auto w-full max-w-md px-6 text-center sm:mb-0 sm:mr-[7%] sm:ml-0 sm:text-left">
        <motion.p
          className="text-[11px] tracking-[0.42em] uppercase"
          style={{ color: "#7EC8FF" }}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.8, ease: soft }}
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
          transition={{ delay: 0.95, duration: 1, ease: soft }}
        >
          {name}&apos;s anime night
        </motion.h1>
        <motion.p
          className="mt-3 text-sm leading-relaxed"
          style={{ color: "#C5CBE8" }}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          The comet is crossing. Step into her movie.
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
          transition={{ delay: 1.4, duration: 0.75, ease: soft }}
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
      className="relative mx-auto aspect-[3/4] w-full max-w-md"
      initial={reduce || !opened ? false : { opacity: 0, x: -36, filter: "blur(12px)" }}
      animate={
        opened
          ? {
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
              y: reduce ? 0 : [0, -8, 0],
            }
          : undefined
      }
      transition={{
        opacity: { delay: 0.2, duration: 1.1, ease: soft },
        x: { delay: 0.2, duration: 1.1, ease: soft },
        filter: { delay: 0.2, duration: 1.1 },
        y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      <div
        className="absolute inset-[8%] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,107,157,0.35) 0%, rgba(126,200,255,0.2) 50%, transparent 70%)",
        }}
      />
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain object-bottom drop-shadow-[0_30px_70px_rgba(255,107,157,0.4)]"
        sizes="(max-width: 640px) 90vw, 420px"
        priority
      />
    </motion.div>
  );
}

/** Three anime stills in one cinematic viewport — scroll parallax per panel. */
function AnimeTriptych({ photos }: { photos: Photo[] }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const frameY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -40]);
  const glowOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.3, 0.7, 0.3]);

  const offsets = [-12, 0, 12];

  return (
    <section ref={ref} className="relative px-4 py-20 sm:px-6 sm:py-28">
      <Reveal>
        <p
          className="mb-8 text-center text-[11px] tracking-[0.34em] uppercase"
          style={{ color: "var(--hw-accent)" }}
        >
          Character scroll
        </p>
      </Reveal>

      <motion.div style={{ y: frameY }} className="relative mx-auto max-w-6xl">
        <motion.div
          className="pointer-events-none absolute -inset-4 rounded-3xl opacity-50 blur-2xl"
          style={{
            opacity: glowOpacity,
            background:
              "linear-gradient(135deg, rgba(255,107,157,0.25), rgba(126,200,255,0.2))",
          }}
        />

        <div
          className="relative overflow-hidden rounded-2xl border p-3 sm:p-4"
          style={{
            borderColor: "rgba(126,200,255,0.35)",
            background: "rgba(10,14,32,0.85)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,246,232,0.08)",
          }}
        >
          <div className="mb-3 flex items-center justify-between px-1">
            <span
              className="text-[10px] tracking-[0.28em] uppercase"
              style={{ color: "var(--hw-muted)" }}
            >
              Film stills · 24 fps
            </span>
            <span
              className="font-[family-name:var(--font-display)] text-xs"
              style={{ color: "var(--hw-secondary)" }}
            >
              Act II
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {photos.slice(0, 3).map((photo, index) => (
              <motion.figure
                key={photo.src}
                className="group relative min-w-0 overflow-hidden rounded-xl border"
                style={{
                  borderColor: "rgba(126,200,255,0.22)",
                }}
                initial={
                  reduce ? false : { opacity: 0, y: 24 + index * 8 + (offsets[index] ?? 0) }
                }
                whileInView={{ opacity: 1, y: offsets[index] ?? 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.12, duration: 0.9, ease: soft }}
                whileHover={reduce ? undefined : { y: (offsets[index] ?? 0) - 6, scale: 1.02 }}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-black/40">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 30vw, 20vw"
                    className="object-contain object-bottom transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(7,11,26,0.85) 0%, transparent 55%)",
                    }}
                  />
                  <motion.div
                    className="pointer-events-none absolute inset-0 opacity-0 mix-blend-screen group-hover:opacity-50"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 80%, rgba(126,200,255,0.45), transparent 60%)",
                    }}
                  />
                </div>
                {photo.caption ? (
                  <figcaption
                    className="absolute right-0 bottom-0 left-0 px-2 py-2 text-center text-[9px] tracking-[0.14em] uppercase sm:text-[10px]"
                    style={{ color: "var(--hw-text)" }}
                  >
                    {photo.caption}
                  </figcaption>
                ) : null}
              </motion.figure>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export function Experience({ data }: { data: TemplateData }) {
  const reduce = useReducedMotion();
  const name = displayNames(data.people)[0] ?? "";
  const age = data.extras.milestoneAge;
  const chapters = data.extras.timeline ?? [];
  const [opened, setOpened] = useState(false);

  const heroSrc =
    data.media.heroImage?.src ??
    data.media.photos[0]?.src ??
    wishImg(data, "anime-hero-girl.png");

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
        <section className="relative flex min-h-svh items-end justify-center px-4 pb-12 pt-24 sm:items-center sm:pb-20">
          <motion.div
            style={{ y: heroY, opacity: heroFade }}
            className="relative grid w-full max-w-5xl items-end gap-8 sm:grid-cols-[1.05fr_0.95fr] sm:gap-6"
          >
            <div className="relative order-2 sm:order-1">
              <GlowPulse className="top-[10%] left-1/2 h-72 w-72 -translate-x-1/2" />
              <HeroCharacter src={heroSrc} alt={`${name} — main character`} opened={opened} />

              <motion.div
                className="absolute top-[6%] right-[0%] w-20 sm:top-[8%] sm:right-[4%] sm:w-28"
                animate={reduce ? undefined : { y: [0, -16, 0], rotate: [-3, 4, -3] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <div
                  className="relative aspect-square overflow-hidden rounded-full"
                  style={{
                    boxShadow: "0 0 36px rgba(126,200,255,0.45)",
                    border: "2px solid rgba(255,246,232,0.4)",
                  }}
                >
                  <Image
                    src={wishImg(data, "anime-spirit-fox.png")}
                    alt="Spirit friend"
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                </div>
              </motion.div>
            </div>

            <div className="order-1 px-1 text-center sm:order-2 sm:pb-20 sm:text-left">
              <motion.p
                className="text-[11px] tracking-[0.4em] uppercase"
                style={{ color: "var(--hw-accent)" }}
                initial={reduce || !opened ? false : { opacity: 0, y: 10 }}
                animate={opened ? { opacity: 1, y: 0 } : undefined}
                transition={{ delay: 0.15, duration: 0.8 }}
              >
                {data.copy.subhead}
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
                      : { opacity: 0, scale: 0.75, filter: "blur(16px)" }
                  }
                  animate={
                    opened
                      ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                      : undefined
                  }
                  transition={{ delay: 0.3, duration: 1.1, ease: soft }}
                >
                  {age}
                </motion.p>
              ) : null}

              <motion.h1
                className="mt-2 font-[family-name:var(--font-display)] text-4xl sm:text-5xl"
                style={{ color: "var(--hw-text)" }}
                initial={reduce || !opened ? false : { opacity: 0, y: 18 }}
                animate={opened ? { opacity: 1, y: 0 } : undefined}
                transition={{ delay: 0.45, duration: 0.85, ease: soft }}
              >
                {name}
              </motion.h1>

              <motion.p
                className="mt-3 text-lg"
                style={{ color: "var(--hw-secondary)" }}
                initial={reduce || !opened ? false : { opacity: 0 }}
                animate={opened ? { opacity: 1 } : undefined}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                {data.copy.headline}
              </motion.p>

              <motion.div
                className="relative mx-auto mt-8 max-w-sm rounded-3xl rounded-bl-md border px-5 py-4 text-left sm:mx-0"
                style={{
                  background: "rgba(18,24,51,0.9)",
                  borderColor: "rgba(126,200,255,0.35)",
                  boxShadow: "0 16px 40px rgba(0,0,0,0.35)",
                }}
                initial={reduce || !opened ? false : { opacity: 0, y: 20 }}
                animate={opened ? { opacity: 1, y: 0 } : undefined}
                transition={{ delay: 0.75, duration: 0.85, ease: soft }}
              >
                <p className="text-sm leading-7">{data.copy.message}</p>
                <span
                  className="absolute -bottom-2 left-8 h-3 w-3 rotate-45 border-r border-b"
                  style={{
                    background: "rgba(18,24,51,0.9)",
                    borderColor: "rgba(126,200,255,0.35)",
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
          {opened ? <ScrollHint className="!bottom-8" /> : null}
        </section>

        {/* Act II — triptych gallery */}
        {data.media.photos.length > 0 ? (
          <AnimeTriptych photos={data.media.photos} />
        ) : null}

        {/* Act chapters */}
        {chapters.length > 0 ? (
          <SceneSection className="relative mx-auto max-w-lg px-6 py-12" wipe="right">
            <div className="space-y-4">
              {chapters.map((chapter, index) => (
                <Reveal key={chapter.title} delay={index * 0.06}>
                  <div
                    className="rounded-2xl border px-5 py-5"
                    style={{
                      background: "rgba(18,24,51,0.75)",
                      borderColor: "rgba(126,200,255,0.22)",
                    }}
                  >
                    <p
                      className="text-[10px] tracking-[0.3em] uppercase"
                      style={{ color: "var(--hw-accent)" }}
                    >
                      {chapter.label}
                    </p>
                    <h2
                      className="mt-2 font-[family-name:var(--font-display)] text-xl"
                      style={{ color: "var(--hw-secondary)" }}
                    >
                      {chapter.title}
                    </h2>
                    <p
                      className="mt-2 text-sm leading-6"
                      style={{ color: "var(--hw-muted)" }}
                    >
                      {chapter.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </SceneSection>
        ) : null}

        {/* Act III — party */}
        <SceneSection className="relative mx-auto max-w-md px-6 py-20" wipe="left">
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

        <SceneSection className="px-6 pb-20 text-center" wipe="right">
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
              Main character · To be continued
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
