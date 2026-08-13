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
import { PetalFall } from "@/templates/_shared/components/PetalFall";
import { PlaceLink } from "@/templates/_shared/components/VenueMap";
import { RsvpCard } from "@/templates/_shared/components/RsvpCard";
import { namesLine } from "@/templates/_shared/people";
import { themeStyle } from "@/templates/_shared/theme";
import type { TemplateData } from "@/templates/_shared/types";

const softEase = [0.22, 1, 0.36, 1] as const;
const brushEase = [0.16, 1, 0.3, 1] as const;

function InkRule({ className }: { className?: string }) {
  return (
    <motion.svg
      className={className}
      width="160"
      height="12"
      viewBox="0 0 160 12"
      fill="none"
      aria-hidden
      initial={{ opacity: 0, scaleX: 0.4 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 1.1, ease: brushEase }}
      style={{ originX: 0.5, color: "var(--hw-primary)" }}
    >
      <path
        d="M8 6h60M92 6h60"
        stroke="currentColor"
        strokeWidth="0.7"
        strokeLinecap="round"
      />
      <circle cx="80" cy="6" r="2.2" stroke="currentColor" strokeWidth="0.7" />
      <path
        d="M76 6h8"
        stroke="currentColor"
        strokeWidth="0.7"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}

function Reveal({
  children,
  className,
  delay = 0,
  y = 36,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.25, margin: "-6% 0px" }}
      transition={{ duration: 1.05, delay, ease: softEase }}
    >
      {children}
    </motion.div>
  );
}

function WelcomeGate({
  names,
  onOpen,
}: {
  names: string;
  onOpen: () => void;
}) {
  const reduce = useReducedMotion();
  const [opening, setOpening] = useState(false);

  function open() {
    if (opening) return;
    setOpening(true);
    window.setTimeout(onOpen, reduce ? 200 : 1400);
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ background: "var(--hw-bg)" }}
      exit={
        reduce
          ? { opacity: 0 }
          : { opacity: 0, transition: { duration: 0.5, delay: 0.15 } }
      }
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(ellipse at 50% 20%, color-mix(in srgb, var(--hw-primary) 22%, transparent), transparent 55%),
            radial-gradient(ellipse at 50% 100%, color-mix(in srgb, var(--hw-accent) 28%, transparent), transparent 50%)
          `,
        }}
      />

      {/* Left shoji door */}
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 origin-left"
        style={{
          background: `
            linear-gradient(90deg, #f7efe8 0%, #fff9f5 55%, #f3e6df 100%)
          `,
          borderRight: "1px solid color-mix(in srgb, var(--hw-border) 80%, transparent)",
          boxShadow: "inset -18px 0 40px rgba(43, 36, 34, 0.05)",
        }}
        animate={
          opening && !reduce
            ? { x: "-102%", rotateY: -8 }
            : { x: 0, rotateY: 0 }
        }
        transition={{ duration: 1.25, ease: softEase }}
      >
        <div
          className="absolute inset-4 grid grid-cols-3 grid-rows-4 gap-px opacity-35"
          style={{ border: "1px solid var(--hw-border)" }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} style={{ border: "1px solid var(--hw-border)" }} />
          ))}
        </div>
      </motion.div>

      {/* Right shoji door */}
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 origin-right"
        style={{
          background: `
            linear-gradient(270deg, #f7efe8 0%, #fff9f5 55%, #f3e6df 100%)
          `,
          borderLeft: "1px solid color-mix(in srgb, var(--hw-border) 80%, transparent)",
          boxShadow: "inset 18px 0 40px rgba(43, 36, 34, 0.05)",
        }}
        animate={
          opening && !reduce
            ? { x: "102%", rotateY: 8 }
            : { x: 0, rotateY: 0 }
        }
        transition={{ duration: 1.25, ease: softEase }}
      >
        <div
          className="absolute inset-4 grid grid-cols-3 grid-rows-4 gap-px opacity-35"
          style={{ border: "1px solid var(--hw-border)" }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} style={{ border: "1px solid var(--hw-border)" }} />
          ))}
        </div>
      </motion.div>

      <motion.div
        className="relative z-10 mx-auto flex max-w-md flex-col items-center px-6 text-center"
        animate={opening && !reduce ? { opacity: 0, scale: 0.96 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: softEase }}
      >
        <motion.p
          className="text-[11px] tracking-[0.42em] uppercase"
          style={{ color: "var(--hw-primary)" }}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: softEase }}
        >
          ようこそ · Welcome
        </motion.p>
        <motion.p
          className="mt-6 font-[family-name:var(--font-display)] text-3xl leading-snug sm:text-4xl"
          style={{ color: "var(--hw-secondary)" }}
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: softEase }}
        >
          {names}
        </motion.p>
        <motion.p
          className="mt-4 text-sm tracking-[0.18em]"
          style={{ color: "var(--hw-muted)" }}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.55 }}
        >
          桜の誓い · Sakura vows
        </motion.p>

        <motion.button
          type="button"
          onClick={open}
          className="mt-12 rounded-full border px-8 py-3.5 text-[11px] tracking-[0.32em] uppercase transition-transform hover:scale-[1.03] active:scale-[0.98]"
          style={{
            borderColor: "var(--hw-border)",
            background: "color-mix(in srgb, var(--hw-surface) 85%, transparent)",
            color: "var(--hw-secondary)",
          }}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75, ease: softEase }}
          whileTap={{ scale: 0.98 }}
        >
          Open the gate
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

function ScrollHint() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <motion.div
      className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.6, duration: 0.8 }}
    >
      <p
        className="text-[10px] tracking-[0.28em] uppercase"
        style={{ color: "var(--hw-muted)" }}
      >
        Scroll
      </p>
      <motion.span
        className="h-8 w-px"
        style={{ background: "var(--hw-primary)" }}
        animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.35, 1, 0.35] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

export function Experience({ data }: { data: TemplateData }) {
  const reduce = useReducedMotion();
  const [first, second] = data.people.map((person) => person.name.split(" ")[0]);
  const couple = [first, second].filter(Boolean).join(" & ") || namesLine(data.people);
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
  const heroLift = useTransform(scrollYProgress, [0, 0.18], [0, reduce ? 0 : -48]);
  const heroFade = useTransform(scrollYProgress, [0, 0.16], [1, reduce ? 1 : 0.35]);

  return (
    <main
      className="relative min-h-svh overflow-x-hidden bg-[var(--hw-bg)] font-[family-name:var(--font-body)] text-[var(--hw-text)]"
      style={themeStyle(data.palette)}
    >
      <AnimatePresence>
        {!opened ? (
          <WelcomeGate key="gate" names={couple} onOpen={() => setOpened(true)} />
        ) : null}
      </AnimatePresence>

      {opened ? (
        <PetalFall
          colors={[
            data.palette.primary,
            data.palette.accent,
            "#F7C1D0",
            "#FFD6E0",
          ]}
          count={56}
        />
      ) : null}

      <motion.div
        initial={false}
        animate={
          opened
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0, y: 18, filter: "blur(8px)" }
        }
        transition={{ duration: 1.1, ease: softEase, delay: opened ? 0.05 : 0 }}
      >
        {/* Hero invitation */}
        <section className="relative flex min-h-svh items-center justify-center px-4 py-20">
          <motion.div
            className="relative w-full max-w-lg"
            style={{ y: heroLift, opacity: heroFade }}
          >
            <motion.div
              className="relative border px-8 py-16 text-center sm:px-12 sm:py-20"
              style={{
                background:
                  "color-mix(in srgb, var(--hw-surface) 92%, transparent)",
                borderColor: "var(--hw-border)",
              }}
              initial={reduce || !opened ? false : { opacity: 0, y: 28, scale: 0.98 }}
              animate={opened ? { opacity: 1, y: 0, scale: 1 } : undefined}
              transition={{ duration: 1.2, delay: 0.2, ease: softEase }}
            >
              <p
                className="text-sm tracking-[0.2em]"
                style={{ color: "var(--hw-primary)" }}
              >
                {data.copy.subhead}
              </p>
              <h1
                className="mt-8 font-[family-name:var(--font-display)] text-5xl leading-tight sm:text-6xl"
                style={{ color: "var(--hw-secondary)" }}
              >
                {first}
                {second ? (
                  <>
                    <span
                      className="my-3 block text-xl tracking-[0.4em]"
                      style={{ color: "var(--hw-primary)" }}
                    >
                      ❀
                    </span>
                    {second}
                  </>
                ) : (
                  namesLine(data.people)
                )}
              </h1>
              <InkRule className="mx-auto mt-8" />
              <p
                className="mt-8 text-base leading-8"
                style={{ color: "var(--hw-muted)" }}
              >
                {data.copy.message}
              </p>
              {data.event?.timeLabel ? (
                <p
                  className="mt-10 font-[family-name:var(--font-display)] text-lg"
                  style={{ color: "var(--hw-secondary)" }}
                >
                  {data.event.timeLabel}
                </p>
              ) : null}
              {data.event?.place ? (
                <p className="mt-2 text-sm" style={{ color: "var(--hw-muted)" }}>
                  <PlaceLink
                    place={data.event.place}
                    className="underline underline-offset-4"
                  />
                </p>
              ) : null}
            </motion.div>
          </motion.div>
          {opened ? <ScrollHint /> : null}
        </section>

        {/* Chapter: season */}
        <section className="relative mx-auto max-w-2xl px-6 py-20 text-center">
          <Reveal>
            <p
              className="text-[11px] tracking-[0.36em] uppercase"
              style={{ color: "var(--hw-primary)" }}
            >
              春 · Spring chapter
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <h2
              className="mt-5 font-[family-name:var(--font-display)] text-3xl leading-snug sm:text-4xl"
              style={{ color: "var(--hw-secondary)" }}
            >
              Under falling blossoms
            </h2>
          </Reveal>
          <Reveal delay={0.22}>
            <p
              className="mx-auto mt-5 max-w-md text-base leading-8"
              style={{ color: "var(--hw-muted)" }}
            >
              A quiet Japanese welcome — ink, ivory, and sakura drifting as the
              evening begins.
            </p>
          </Reveal>
          <InkRule className="mx-auto mt-10" />
        </section>

        {/* Photos with staggered Japanese reveals */}
        {data.media.photos.length > 0 ? (
          <section className="relative mx-auto max-w-5xl px-4 pb-8 sm:px-8">
            <div className="grid gap-5 sm:grid-cols-3 sm:gap-4">
              {data.media.photos.map((photo, index) => (
                <Reveal
                  key={photo.src}
                  delay={index * 0.12}
                  y={48}
                  className={index === 1 ? "sm:mt-10" : undefined}
                >
                  <motion.div
                    className="relative aspect-[3/4] overflow-hidden"
                    style={{ border: "1px solid var(--hw-border)" }}
                    whileHover={
                      reduce
                        ? undefined
                        : { y: -6, transition: { duration: 0.45, ease: softEase } }
                    }
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, color-mix(in srgb, var(--hw-bg) 35%, transparent), transparent 45%)",
                      }}
                    />
                  </motion.div>
                  {photo.alt ? (
                    <p
                      className="mt-3 text-center text-[11px] tracking-[0.22em] uppercase"
                      style={{ color: "var(--hw-muted)" }}
                    >
                      {photo.alt}
                    </p>
                  ) : null}
                </Reveal>
              ))}
            </div>
          </section>
        ) : null}

        {/* Closing / RSVP */}
        {data.extras.rsvp?.enabled ? (
          <section className="relative mx-auto max-w-md px-6 py-24">
            <Reveal>
              <p
                className="mb-8 text-center text-[11px] tracking-[0.36em] uppercase"
                style={{ color: "var(--hw-primary)" }}
              >
                ご出席のほど · Kindly reply
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <RsvpCard
                note={data.extras.rsvp.note}
                cta={data.copy.cta}
                storageKey={`hw-rsvp-${data.meta.slug}`}
              />
            </Reveal>
          </section>
        ) : null}

        <footer className="relative px-6 pb-16 pt-4 text-center">
          <Reveal>
            <p
              className="font-[family-name:var(--font-display)] text-2xl"
              style={{ color: "var(--hw-secondary)" }}
            >
              {couple}
            </p>
            <p
              className="mt-3 text-[11px] tracking-[0.28em] uppercase"
              style={{ color: "var(--hw-muted)" }}
            >
              With love · ありがとう
            </p>
          </Reveal>
        </footer>
      </motion.div>
    </main>
  );
}
