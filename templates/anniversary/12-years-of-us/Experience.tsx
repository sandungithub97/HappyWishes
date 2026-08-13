"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ParticleField } from "@/templates/_shared/components/ParticleField";
import { Reveal } from "@/templates/_shared/components/Reveal";
import { ScrollHint } from "@/templates/_shared/components/ScrollHint";
import { TextureOverlay } from "@/templates/_shared/components/TextureOverlay";
import { PlaceSection } from "@/templates/_shared/components/VenueMap";
import { namesLine } from "@/templates/_shared/people";
import { themeStyle } from "@/templates/_shared/theme";
import type { TemplateData } from "@/templates/_shared/types";

const soft = [0.22, 1, 0.36, 1] as const;

function since(date: string) {
  const start = new Date(date).getTime();
  const diff = Date.now() - start;
  if (!Number.isFinite(diff) || diff < 0) {
    return { years: 0, days: 0 };
  }
  const days = Math.floor(diff / 86_400_000);
  return { years: Math.floor(days / 365), days: days % 365 };
}

function CountUp({ value, pulse }: { value: number; pulse?: boolean }) {
  const reduce = useReducedMotion();
  const spring = useSpring(0, { stiffness: 55, damping: 18 });
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (reduce) {
      setDisplay(value);
      return;
    }
    spring.set(value);
  }, [value, reduce, spring]);

  useMotionValueEvent(spring, "change", (v) => {
    setDisplay(Math.round(v));
  });

  return (
    <motion.p
      className="font-[family-name:var(--font-display)] text-5xl tabular-nums sm:text-6xl"
      style={{ color: "var(--hw-primary)" }}
      animate={
        pulse && !reduce
          ? { scale: [1, 1.08, 1], textShadow: ["0 0 0 transparent", "0 0 24px rgba(196,120,74,0.45)", "0 0 0 transparent"] }
          : undefined
      }
      transition={{ duration: 1.6, delay: 1.2, ease: soft }}
    >
      {display}
    </motion.p>
  );
}

function TimelineMarker({ index }: { index: number }) {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden className="mx-auto">
      <circle cx="18" cy="18" r="16" stroke="var(--hw-primary)" strokeWidth="1" opacity="0.35" />
      <circle cx="18" cy="18" r="6" fill="var(--hw-primary)" />
      <path
        d="M18 4v4M18 28v4M4 18h4M28 18h4"
        stroke="var(--hw-accent)"
        strokeWidth="1.2"
        opacity={0.7 + (index % 3) * 0.1}
      />
    </svg>
  );
}

export function Experience({ data }: { data: TemplateData }) {
  const [elapsed, setElapsed] = useState<{ years: number; days: number } | null>(
    null,
  );
  const chapters = data.extras.timeline ?? [];
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const spineHeight = useTransform(scrollYProgress, [0.15, 0.85], ["0%", "100%"]);

  useEffect(() => {
    if (!data.event?.date) return;
    const tick = () => setElapsed(since(data.event!.date!));
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, [data.event]);

  return (
    <main
      className="relative min-h-svh overflow-x-hidden bg-[var(--hw-bg)] font-[family-name:var(--font-body)] text-[var(--hw-text)]"
      style={themeStyle(data.palette)}
    >
      <TextureOverlay variant="paper" opacity={0.2} className="fixed inset-0 -z-10" />
      <ParticleField
        variant="bokeh"
        count={20}
        colors={["rgba(196,120,74,0.35)", "rgba(232,184,146,0.3)", "rgba(255,255,255,0.25)"]}
        className="fixed inset-0 -z-[5] opacity-70"
      />

      <section className="relative flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center">
        <Reveal>
          <p
            className="text-[11px] tracking-[0.32em] uppercase"
            style={{ color: "var(--hw-primary)" }}
          >
            {data.copy.subhead}
          </p>
          <h1
            className="mt-4 font-[family-name:var(--font-display)] text-5xl sm:text-7xl"
            style={{ color: "var(--hw-secondary)" }}
          >
            {data.copy.headline}
          </h1>
          <p
            className="mt-3 text-sm tracking-[0.18em] uppercase"
            style={{ color: "var(--hw-muted)" }}
          >
            {namesLine(data.people)}
          </p>
        </Reveal>

        {elapsed ? (
          <div className="mt-10 flex gap-10">
            <div>
              <CountUp value={elapsed.years} pulse />
              <p
                className="text-[10px] tracking-[0.22em] uppercase"
                style={{ color: "var(--hw-muted)" }}
              >
                Years
              </p>
            </div>
            <div>
              <CountUp value={elapsed.days} />
              <p
                className="text-[10px] tracking-[0.22em] uppercase"
                style={{ color: "var(--hw-muted)" }}
              >
                Days more
              </p>
            </div>
          </div>
        ) : null}

        <a
          href="#years"
          className="mt-10 text-[11px] tracking-[0.28em] uppercase"
          style={{ color: "var(--hw-primary)" }}
        >
          {data.copy.cta}
        </a>
        <ScrollHint className="!bottom-10" />
      </section>

      <section id="years" className="relative mx-auto max-w-3xl px-6 pb-24">
        <Reveal>
          <p className="mb-16 max-w-lg text-lg leading-8" style={{ color: "var(--hw-muted)" }}>
            {data.copy.message}
          </p>
        </Reveal>

        <div className="relative">
          <div
            className="absolute top-0 bottom-0 left-[17px] w-px sm:left-[69px]"
            style={{ background: "rgba(196,120,74,0.2)" }}
          />
          <motion.div
            className="absolute top-0 left-[17px] w-px origin-top sm:left-[69px]"
            style={{
              height: reduce ? "100%" : spineHeight,
              background:
                "linear-gradient(180deg, var(--hw-primary), var(--hw-accent))",
            }}
          />

          <div className="space-y-20">
            {chapters.map((chapter, index) => {
              const photo = chapter.photo ?? data.media.photos[index]?.src;
              return (
                <Reveal key={`${chapter.label}-${chapter.title}`} delay={index * 0.06}>
                  <article className="grid items-start gap-6 sm:grid-cols-[140px_1fr]">
                    <div className="relative z-10 flex flex-col items-start gap-2 sm:items-center">
                      <TimelineMarker index={index} />
                      <p
                        className="font-[family-name:var(--font-display)] text-4xl"
                        style={{ color: "var(--hw-primary)" }}
                      >
                        {chapter.label}
                      </p>
                    </div>
                    <div>
                      {photo ? (
                        <motion.div
                          className="relative mb-5 aspect-[16/10] overflow-hidden rounded-lg"
                          whileInView={
                            reduce
                              ? undefined
                              : { y: [12, 0], opacity: [0.7, 1] }
                          }
                          viewport={{ once: true, amount: 0.35 }}
                          transition={{ duration: 0.9, ease: soft }}
                        >
                          <Image
                            src={photo}
                            alt={chapter.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 560px"
                            className="object-cover"
                          />
                          <div
                            className="pointer-events-none absolute inset-0"
                            style={{
                              background:
                                "linear-gradient(to top, rgba(43,24,16,0.25), transparent 40%)",
                            }}
                          />
                        </motion.div>
                      ) : null}
                      <h2
                        className="font-[family-name:var(--font-display)] text-3xl"
                        style={{ color: "var(--hw-secondary)" }}
                      >
                        {chapter.title}
                      </h2>
                      <p
                        className="mt-2 text-base leading-7"
                        style={{ color: "var(--hw-muted)" }}
                      >
                        {chapter.body}
                      </p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
      <PlaceSection place={data.event?.place} />
    </main>
  );
}
