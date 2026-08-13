"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ParticleField } from "@/templates/_shared/components/ParticleField";
import { Reveal } from "@/templates/_shared/components/Reveal";
import { ScrollHint } from "@/templates/_shared/components/ScrollHint";
import { TextureOverlay } from "@/templates/_shared/components/TextureOverlay";
import { PlaceLink } from "@/templates/_shared/components/VenueMap";
import { displayNames } from "@/templates/_shared/people";
import { themeStyle } from "@/templates/_shared/theme";
import type { TemplateData } from "@/templates/_shared/types";

const soft = [0.22, 1, 0.36, 1] as const;

function HeartMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden
    >
      <path
        d="M14 24s-9-5.8-9-12.2C5 8 7.6 6 10.2 6c1.6 0 3 .8 3.8 2 .8-1.2 2.2-2 3.8-2C20.4 6 23 8 23 11.8 23 18.2 14 24 14 24z"
        fill="currentColor"
      />
    </svg>
  );
}

function BookGate({
  first,
  second,
  subhead,
  onOpen,
}: {
  first: string;
  second?: string;
  subhead?: string;
  onOpen: () => void;
}) {
  const reduce = useReducedMotion();
  const [opening, setOpening] = useState(false);

  function open() {
    if (opening) return;
    setOpening(true);
    window.setTimeout(onOpen, reduce ? 200 : 1500);
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden px-6"
      style={{
        background: `
          radial-gradient(ellipse at 50% 25%, #f8dfe4 0%, transparent 48%),
          #FBF3F4
        `,
        perspective: "1600px",
      }}
      exit={
        reduce
          ? { opacity: 0 }
          : { opacity: 0, transition: { duration: 0.5, delay: 0.05 } }
      }
    >
      <TextureOverlay variant="paper" opacity={0.3} />
      <ParticleField
        variant="bokeh"
        count={16}
        colors={[
          "rgba(183,110,121,0.3)",
          "rgba(240,201,206,0.35)",
          "rgba(255,255,255,0.25)",
        ]}
      />

      <div className="relative z-10 flex w-full max-w-lg items-center justify-center">
        {/* Left page / cover */}
        <motion.div
          className="absolute h-[min(62vh,420px)] w-[min(42vw,210px)] origin-right rounded-l-md border"
          style={{
            right: "50%",
            background:
              "linear-gradient(180deg, #FFF8F9 0%, #F5E4E7 100%)",
            borderColor: "#E8D0D3",
            boxShadow: "-12px 16px 40px rgba(61,44,46,0.12)",
            transformStyle: "preserve-3d",
          }}
          animate={
            opening && !reduce
              ? { rotateY: -95, opacity: 0.35 }
              : { rotateY: 0, opacity: 1 }
          }
          transition={{ duration: 1.35, ease: [0.19, 1, 0.22, 1] }}
        >
          <div className="flex h-full flex-col items-center justify-center px-4 text-center">
            <HeartMark className="mb-3 text-[var(--hw-primary,#B76E79)] opacity-70" />
            <p
              className="text-[10px] tracking-[0.3em] uppercase"
              style={{ color: "#8F6F74" }}
            >
              Chapter I
            </p>
          </div>
        </motion.div>

        {/* Right page */}
        <motion.div
          className="absolute h-[min(62vh,420px)] w-[min(42vw,210px)] origin-left rounded-r-md border"
          style={{
            left: "50%",
            background:
              "linear-gradient(180deg, #FFF8F9 0%, #F8E8EB 100%)",
            borderColor: "#E8D0D3",
            boxShadow: "12px 16px 40px rgba(61,44,46,0.12)",
            transformStyle: "preserve-3d",
          }}
          animate={
            opening && !reduce
              ? { rotateY: 95, opacity: 0.35 }
              : { rotateY: 0, opacity: 1 }
          }
          transition={{ duration: 1.35, ease: [0.19, 1, 0.22, 1] }}
        >
          <div className="flex h-full flex-col items-center justify-center px-4 text-center">
            <p
              className="text-[10px] tracking-[0.3em] uppercase"
              style={{ color: "#8F6F74" }}
            >
              Forever
            </p>
          </div>
        </motion.div>

        {/* Center card */}
        <motion.div
          className="relative z-20 mx-auto w-full max-w-xs rounded-sm border px-6 py-10 text-center"
          style={{
            background: "rgba(255,248,249,0.97)",
            borderColor: "#E8D0D3",
            boxShadow: "0 20px 50px rgba(61,44,46,0.14)",
          }}
          animate={
            opening && !reduce
              ? { opacity: 0, y: -16, scale: 0.96 }
              : { opacity: 1, y: 0, scale: 1 }
          }
          transition={{ duration: 0.6, ease: soft }}
        >
          <motion.p
            className="text-[11px] tracking-[0.36em] uppercase"
            style={{ color: "#B76E79" }}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8, ease: soft }}
          >
            {subhead ?? "A love told in chapters"}
          </motion.p>
          <motion.p
            className="mt-5 font-[family-name:var(--font-display)] text-3xl leading-snug sm:text-4xl"
            style={{ color: "#3D2C2E" }}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.9, ease: soft }}
          >
            {first}
            {second ? (
              <>
                <span className="mx-2 text-xl italic" style={{ color: "#B76E79" }}>
                  &
                </span>
                {second}
              </>
            ) : null}
          </motion.p>
          <motion.button
            type="button"
            onClick={open}
            className="mt-8 rounded-full border px-7 py-3.5 text-[11px] tracking-[0.3em] uppercase"
            style={{
              borderColor: "#B76E79",
              background:
                "linear-gradient(180deg, #FFF8F9 0%, #F5E0E4 100%)",
              color: "#3D2C2E",
              boxShadow: "0 10px 28px rgba(183,110,121,0.2)",
            }}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8, ease: soft }}
            whileHover={reduce ? undefined : { scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
          >
            Open the book
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

function TimelineSpine() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.25"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      ref={ref}
      className="absolute top-0 bottom-0 left-[1.65rem] w-px sm:left-1/2 sm:-translate-x-px"
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{ background: "var(--hw-border)", opacity: 0.55 }}
      />
      {!reduce ? (
        <motion.div
          className="absolute top-0 left-0 w-full origin-top"
          style={{
            scaleY,
            height: "100%",
            background:
              "linear-gradient(to bottom, var(--hw-primary), color-mix(in srgb, var(--hw-primary) 40%, var(--hw-accent)))",
            boxShadow: "0 0 10px color-mix(in srgb, var(--hw-primary) 45%, transparent)",
          }}
        />
      ) : null}
    </div>
  );
}

function ChapterDivider({ label }: { label: string }) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <span
        className="flex h-8 w-8 items-center justify-center rounded-full border text-[10px] tracking-wider"
        style={{
          borderColor: "var(--hw-primary)",
          color: "var(--hw-primary)",
          background: "var(--hw-surface)",
          boxShadow: "0 0 16px color-mix(in srgb, var(--hw-primary) 25%, transparent)",
        }}
      >
        <HeartMark className="h-3.5 w-3.5" />
      </span>
      <span
        className="font-[family-name:var(--font-display)] text-sm tracking-[0.28em]"
        style={{ color: "var(--hw-primary)" }}
      >
        {label}
      </span>
    </div>
  );
}

export function Experience({ data }: { data: TemplateData }) {
  const reduce = useReducedMotion();
  const [first, second] = displayNames(data.people);
  const chapters = data.extras.timeline ?? [];
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
  const heroY = useTransform(scrollYProgress, [0, 0.18], [0, reduce ? 0 : -36]);
  const heroFade = useTransform(
    scrollYProgress,
    [0, 0.15],
    [1, reduce ? 1 : 0.4],
  );

  return (
    <main
      className="relative min-h-svh overflow-x-hidden bg-[var(--hw-bg)] font-[family-name:var(--font-body)] text-[var(--hw-text)]"
      style={themeStyle(data.palette)}
    >
      <AnimatePresence>
        {!opened ? (
          <BookGate
            key="gate"
            first={first}
            second={second}
            subhead={data.copy.subhead}
            onOpen={() => setOpened(true)}
          />
        ) : null}
      </AnimatePresence>

      <TextureOverlay variant="paper" opacity={0.22} />
      {opened ? (
        <ParticleField
          variant="bokeh"
          count={18}
          colors={[
            "rgba(183,110,121,0.28)",
            "rgba(240,201,206,0.3)",
            "rgba(255,255,255,0.22)",
          ]}
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
              background:
                "radial-gradient(ellipse at 50% 20%, color-mix(in srgb, var(--hw-accent) 55%, transparent), transparent 55%)",
            }}
          />

          <motion.div style={{ y: heroY, opacity: heroFade }} className="relative">
            <motion.p
              className="text-[11px] tracking-[0.36em] uppercase"
              style={{ color: "var(--hw-primary)" }}
              initial={reduce || !opened ? false : { opacity: 0, y: 10 }}
              animate={opened ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.2, duration: 0.8, ease: soft }}
            >
              {data.copy.subhead}
            </motion.p>

            <motion.h1
              className="mt-6 font-[family-name:var(--font-display)] text-5xl leading-[1.1] sm:text-7xl"
              style={{ color: "var(--hw-secondary)" }}
              initial={reduce || !opened ? false : { opacity: 0, y: 20 }}
              animate={opened ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.35, duration: 1, ease: soft }}
            >
              {first}
              {second ? (
                <>
                  <span
                    className="block text-2xl italic sm:text-3xl"
                    style={{ color: "var(--hw-primary)" }}
                  >
                    and
                  </span>
                  {second}
                </>
              ) : null}
            </motion.h1>

            <motion.p
              className="mt-8 max-w-md text-base leading-7"
              style={{ color: "var(--hw-muted)" }}
              initial={reduce || !opened ? false : { opacity: 0, y: 12 }}
              animate={opened ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.55, duration: 0.85, ease: soft }}
            >
              {data.copy.message}
            </motion.p>

            <motion.a
              href="#story"
              className="mt-10 inline-block text-[11px] tracking-[0.28em] uppercase"
              style={{ color: "var(--hw-primary)" }}
              initial={reduce || !opened ? false : { opacity: 0 }}
              animate={opened ? { opacity: 1 } : undefined}
              transition={{ delay: 0.75, duration: 0.8 }}
            >
              {data.copy.cta}
            </motion.a>
          </motion.div>

          {opened ? <ScrollHint label="Read on" /> : null}
        </section>

        <section id="story" className="relative mx-auto max-w-3xl px-6 pb-24">
          <TimelineSpine />

          <div className="space-y-20 sm:space-y-28">
            {chapters.map((chapter, index) => {
              const photo = chapter.photo ?? data.media.photos[index]?.src;
              const flip = index % 2 === 1;

              return (
                <Reveal key={`${chapter.label}-${chapter.title}`} delay={0.04}>
                  <article className="relative grid gap-6 sm:grid-cols-2 sm:items-center sm:gap-12">
                    {/* Spine node */}
                    <span
                      className="absolute top-2 left-[1.35rem] z-20 h-3 w-3 -translate-x-1/2 rounded-full sm:left-1/2"
                      style={{
                        background: "var(--hw-primary)",
                        boxShadow:
                          "0 0 14px color-mix(in srgb, var(--hw-primary) 55%, transparent)",
                      }}
                    />

                    <motion.div
                      className={`relative z-10 ${flip ? "sm:order-2" : ""}`}
                      initial={reduce ? false : { opacity: 0, x: flip ? 24 : -24 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.9, ease: soft }}
                    >
                      <ChapterDivider label={chapter.label} />
                      <h2
                        className="font-[family-name:var(--font-display)] text-3xl italic sm:text-4xl"
                        style={{ color: "var(--hw-secondary)" }}
                      >
                        {chapter.title}
                      </h2>
                      <p
                        className="mt-4 text-base leading-7"
                        style={{ color: "var(--hw-muted)" }}
                      >
                        {chapter.body}
                      </p>
                    </motion.div>

                    {photo ? (
                      <motion.div
                        className={`relative aspect-[4/5] overflow-hidden sm:aspect-[5/6] ${flip ? "sm:order-1" : ""}`}
                        style={{
                          boxShadow: "0 20px 48px rgba(61,44,46,0.12)",
                          border:
                            "1px solid color-mix(in srgb, var(--hw-border) 80%, transparent)",
                        }}
                        initial={
                          reduce
                            ? false
                            : { opacity: 0, y: 28, filter: "blur(6px)" }
                        }
                        whileInView={{
                          opacity: 1,
                          y: 0,
                          filter: "blur(0px)",
                        }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 1, ease: soft }}
                      >
                        <Image
                          src={photo}
                          alt={chapter.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 40vw"
                          className="object-cover"
                        />
                        <div
                          className="absolute inset-0"
                          style={{
                            background:
                              "linear-gradient(to top, rgba(61,44,46,0.2) 0%, transparent 40%)",
                          }}
                        />
                      </motion.div>
                    ) : (
                      <div
                        className={`flex aspect-[4/5] items-center justify-center border ${flip ? "sm:order-1" : ""}`}
                        style={{
                          borderColor: "var(--hw-border)",
                          background: "var(--hw-surface)",
                        }}
                      >
                        <p
                          className="font-[family-name:var(--font-display)] text-5xl italic"
                          style={{ color: "var(--hw-primary)" }}
                        >
                          {chapter.label}
                        </p>
                      </div>
                    )}
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

        {data.event ? (
          <footer className="px-6 pb-24 text-center">
            <Reveal>
              <p
                className="text-[11px] tracking-[0.3em] uppercase"
                style={{ color: "var(--hw-primary)" }}
              >
                The next chapter
              </p>
              <p
                className="mt-4 font-[family-name:var(--font-display)] text-2xl"
                style={{ color: "var(--hw-secondary)" }}
              >
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
            </Reveal>
          </footer>
        ) : null}
      </motion.div>
    </main>
  );
}
