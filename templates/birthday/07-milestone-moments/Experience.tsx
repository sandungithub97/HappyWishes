"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ParticleField } from "@/templates/_shared/components/ParticleField";
import { Reveal } from "@/templates/_shared/components/Reveal";
import { ScrollHint } from "@/templates/_shared/components/ScrollHint";
import { TextureOverlay } from "@/templates/_shared/components/TextureOverlay";
import { PlaceLink } from "@/templates/_shared/components/VenueMap";
import { displayNames } from "@/templates/_shared/people";
import { themeStyle } from "@/templates/_shared/theme";
import type { MemoryItem, TemplateData } from "@/templates/_shared/types";

const soft = [0.22, 1, 0.36, 1] as const;

function OdometerAge({ age }: { age: number }) {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? age : 0);
  const spring = useSpring(0, { stiffness: 60, damping: 18 });

  useEffect(() => {
    if (reduce) {
      setDisplay(age);
      return;
    }
    spring.set(age);
  }, [age, reduce, spring]);

  useMotionValueEvent(spring, "change", (v) => {
    setDisplay(Math.round(v));
  });

  return (
    <motion.span
      className="inline-block tabular-nums"
      initial={reduce ? false : { scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.9, ease: soft }}
    >
      {display}
    </motion.span>
  );
}

function MemoryCard({
  memory,
  index,
  progress,
  reduce,
}: {
  memory: MemoryItem;
  index: number;
  progress: MotionValue<number>;
  reduce: boolean | null;
}) {
  const y = useTransform(
    progress,
    [0.15, 0.55],
    reduce ? [0, 0] : [0, -10 - index * 10],
  );

  return (
    <Reveal delay={index * 0.1}>
      <motion.article style={{ y }}>
        <div
          className="relative aspect-[4/5] overflow-hidden"
          style={{
            boxShadow: "0 20px 48px rgba(0,0,0,0.12)",
            border:
              "1px solid color-mix(in srgb, var(--hw-primary) 25%, transparent)",
          }}
        >
          <Image
            src={memory.photo}
            alt={memory.caption}
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 45%)",
            }}
          />
          <span
            className="absolute top-3 right-3 rounded-full px-3 py-1 text-[10px] tracking-[0.18em] uppercase"
            style={{
              background:
                "color-mix(in srgb, var(--hw-primary) 90%, transparent)",
              color: "var(--hw-bg)",
            }}
          >
            Ch. {index + 1}
          </span>
        </div>
        <p
          className="mt-4 font-[family-name:var(--font-display)] text-4xl tracking-wide"
          style={{ color: "var(--hw-primary)" }}
        >
          {memory.year}
        </p>
        <p className="mt-1 text-sm" style={{ color: "var(--hw-muted)" }}>
          {memory.caption}
        </p>
      </motion.article>
    </Reveal>
  );
}

export function Experience({ data }: { data: TemplateData }) {
  const reduce = useReducedMotion();
  const name = displayNames(data.people)[0] ?? "";
  const age = data.extras.milestoneAge;
  const memories = data.extras.memoryGrid ?? [];
  const { scrollYProgress } = useScroll();

  return (
    <main
      className="relative min-h-svh overflow-x-hidden bg-[var(--hw-bg)] font-[family-name:var(--font-body)] text-[var(--hw-text)]"
      style={themeStyle(data.palette)}
    >
      <TextureOverlay variant="grain" opacity={0.15} />
      <ParticleField
        variant="bokeh"
        count={14}
        colors={[
          "color-mix(in srgb, var(--hw-primary) 35%, transparent)",
          "color-mix(in srgb, var(--hw-accent) 30%, transparent)",
          "rgba(255,255,255,0.2)",
        ]}
      />

      <section className="relative flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 25%, color-mix(in srgb, var(--hw-primary) 18%, transparent), transparent 50%)",
          }}
        />
        <motion.p
          className="text-[11px] font-medium tracking-[0.36em] uppercase"
          style={{ color: "var(--hw-accent)" }}
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: soft }}
        >
          {data.copy.subhead}
        </motion.p>
        {age ? (
          <h1
            className="mt-4 font-[family-name:var(--font-display)] text-[9rem] leading-none sm:text-[14rem]"
            style={{
              color: "var(--hw-primary)",
              textShadow:
                "0 0 48px color-mix(in srgb, var(--hw-primary) 35%, transparent)",
            }}
          >
            <OdometerAge age={age} />
          </h1>
        ) : (
          <h1
            className="mt-4 font-[family-name:var(--font-display)] text-7xl"
            style={{ color: "var(--hw-primary)" }}
          >
            {data.copy.headline}
          </h1>
        )}
        <motion.p
          className="mt-2 font-[family-name:var(--font-display)] text-4xl tracking-[0.2em] sm:text-5xl"
          style={{ color: "var(--hw-secondary)" }}
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9, ease: soft }}
        >
          {name}
        </motion.p>
        <motion.p
          className="mt-8 max-w-md text-base leading-7"
          style={{ color: "var(--hw-muted)" }}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.8 }}
        >
          {data.copy.message}
        </motion.p>
        <a
          href="#years"
          className="mt-10 text-[11px] tracking-[0.28em] uppercase"
          style={{ color: "var(--hw-primary)" }}
        >
          {data.copy.cta}
        </a>
        <ScrollHint />
      </section>

      <section id="years" className="relative mx-auto max-w-5xl px-6 pb-24">
        <div
          className="mb-10 hidden h-px w-full sm:block"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--hw-primary), transparent)",
            opacity: 0.35,
          }}
        />

        <div className="grid gap-8 sm:grid-cols-3">
          {memories.map((memory, index) => (
            <MemoryCard
              key={memory.year}
              memory={memory}
              index={index}
              progress={scrollYProgress}
              reduce={reduce}
            />
          ))}
        </div>

        {data.event ? (
          <Reveal className="mt-20 text-center">
            <p
              className="text-[11px] tracking-[0.3em] uppercase"
              style={{ color: "var(--hw-accent)" }}
            >
              Tonight
            </p>
            <p className="mt-3 text-lg" style={{ color: "var(--hw-secondary)" }}>
              {data.event.timeLabel}
            </p>
            {data.event.place ? (
              <p className="mt-1 text-sm" style={{ color: "var(--hw-muted)" }}>
                <PlaceLink
                  place={data.event.place}
                  className="underline underline-offset-4"
                />
              </p>
            ) : null}
          </Reveal>
        ) : null}
      </section>
    </main>
  );
}
