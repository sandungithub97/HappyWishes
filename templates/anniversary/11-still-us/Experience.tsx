"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ParticleField } from "@/templates/_shared/components/ParticleField";
import { Reveal } from "@/templates/_shared/components/Reveal";
import { ScrollHint } from "@/templates/_shared/components/ScrollHint";
import { TextureOverlay } from "@/templates/_shared/components/TextureOverlay";
import { PlaceSection } from "@/templates/_shared/components/VenueMap";
import { namesLine } from "@/templates/_shared/people";
import { themeStyle } from "@/templates/_shared/theme";
import type { TemplateData } from "@/templates/_shared/types";

const soft = [0.22, 1, 0.36, 1] as const;

function PolaroidGate({
  thenSrc,
  thenAlt,
  names,
  onOpen,
}: {
  thenSrc: string;
  thenAlt: string;
  names: string;
  onOpen: () => void;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      style={{
        background:
          "radial-gradient(ellipse 60% 50% at 50% 40%, #FFEDEF 0%, #FFF8F6 55%, #F5E4E7 100%)",
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.7 } }}
    >
      <TextureOverlay variant="paper" opacity={0.25} />
      <ParticleField
        variant="bokeh"
        count={18}
        colors={["rgba(201,123,132,0.35)", "rgba(248,215,218,0.4)", "rgba(255,255,255,0.3)"]}
      />

      <motion.button
        type="button"
        onClick={onOpen}
        className="relative z-10 w-full max-w-xs cursor-pointer text-left"
        initial={reduce ? false : { y: -180, rotate: -12, opacity: 0 }}
        animate={{ y: 0, rotate: -3, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.15 }}
        whileHover={reduce ? undefined : { rotate: 0, y: -4 }}
        whileTap={reduce ? undefined : { scale: 0.98 }}
      >
        <div
          className="rounded-sm bg-white p-3 pb-12 shadow-2xl"
          style={{ boxShadow: "0 24px 60px rgba(74,44,50,0.22)" }}
        >
          <div className="relative aspect-[4/5] overflow-hidden bg-[#eee]">
            <Image src={thenSrc} alt={thenAlt} fill sizes="320px" className="object-cover" priority />
          </div>
          <p
            className="mt-4 text-center font-[family-name:var(--font-display)] text-2xl"
            style={{ color: "var(--hw-secondary)" }}
          >
            {names}
          </p>
          <p
            className="mt-1 text-center text-[10px] tracking-[0.28em] uppercase"
            style={{ color: "var(--hw-muted)" }}
          >
            Tap to open
          </p>
        </div>
      </motion.button>
    </motion.div>
  );
}

function ThenNowSlider({
  then,
  now,
}: {
  then: { src: string; alt: string; caption?: string };
  now: { src: string; alt: string; caption?: string };
}) {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(50);
  const dragging = useRef(false);
  const x = useMotionValue(50);

  useMotionValueEvent(x, "change", (v) => setPct(v));

  function setFromClientX(clientX: number) {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    x.set(next);
  }

  return (
    <div
      ref={trackRef}
      className="relative min-h-[70vh] w-full touch-none overflow-hidden select-none sm:min-h-[80vh]"
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        setFromClientX(e.clientX);
      }}
      onPointerMove={(e) => {
        if (!dragging.current) return;
        setFromClientX(e.clientX);
      }}
      onPointerUp={() => {
        dragging.current = false;
      }}
      onPointerCancel={() => {
        dragging.current = false;
      }}
    >
      <div className="absolute inset-0">
        <Image src={now.src} alt={now.alt} fill sizes="100vw" className="object-cover" priority />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(74,44,50,0.45) 0%, transparent 45%)",
          }}
        />
        <p className="absolute bottom-8 left-0 right-0 text-center font-[family-name:var(--font-display)] text-4xl text-white sm:text-5xl">
          {now.caption ?? "Now"}
        </p>
      </div>

      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
      >
        <Image src={then.src} alt={then.alt} fill sizes="100vw" className="object-cover" priority />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(74,44,50,0.45) 0%, transparent 45%)",
          }}
        />
        <p className="absolute bottom-8 left-0 right-0 text-center font-[family-name:var(--font-display)] text-4xl text-white sm:text-5xl">
          {then.caption ?? "Then"}
        </p>
      </div>

      <div
        className="absolute inset-y-0 z-10 w-0.5 bg-white/90 shadow-lg"
        style={{ left: `${pct}%` }}
      >
        <motion.div
          className="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-[var(--hw-primary)] text-white shadow-xl"
          animate={reduce ? undefined : { scale: [1, 1.06, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-[10px] tracking-wider uppercase">↔</span>
        </motion.div>
      </div>
    </div>
  );
}

function FloatingFrame({
  src,
  alt,
  caption,
  delay,
  rotate,
}: {
  src: string;
  alt: string;
  caption?: string;
  delay: number;
  rotate: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="rounded-sm bg-white p-2 pb-8 shadow-xl"
      style={{ rotate }}
      animate={reduce ? undefined : { y: [0, -10, 0] }}
      transition={{
        y: { duration: 4.2 + delay, repeat: Infinity, ease: "easeInOut", delay },
      }}
    >
      <div className="relative aspect-[4/5] w-40 overflow-hidden sm:w-48">
        <Image src={src} alt={alt} fill sizes="200px" className="object-cover" />
      </div>
      {caption ? (
        <p
          className="mt-2 text-center font-[family-name:var(--font-display)] text-lg"
          style={{ color: "var(--hw-secondary)" }}
        >
          {caption}
        </p>
      ) : null}
    </motion.div>
  );
}

export function Experience({ data }: { data: TemplateData }) {
  const thenNow = data.extras.thenNow;
  const reduce = useReducedMotion();
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

  return (
    <main
      className="relative min-h-svh overflow-x-hidden bg-[var(--hw-bg)] font-[family-name:var(--font-body)] text-[var(--hw-text)]"
      style={themeStyle(data.palette)}
    >
      <AnimatePresence>
        {!opened && thenNow ? (
          <PolaroidGate
            key="gate"
            thenSrc={thenNow.then.src}
            thenAlt={thenNow.then.alt}
            names={namesLine(data.people)}
            onOpen={() => setOpened(true)}
          />
        ) : null}
      </AnimatePresence>

      <ParticleField
        variant="bokeh"
        count={16}
        colors={["rgba(201,123,132,0.28)", "rgba(248,215,218,0.35)"]}
        className="fixed inset-0 -z-10 opacity-60"
      />

      <motion.div
        initial={false}
        animate={opened ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.9, ease: soft, delay: opened ? 0.05 : 0 }}
      >
        <section className="relative flex min-h-[70vh] flex-col items-center justify-center px-6 py-20 text-center">
          <Reveal>
            <p
              className="text-[11px] tracking-[0.32em] uppercase"
              style={{ color: "var(--hw-muted)" }}
            >
              {data.copy.subhead}
            </p>
            <h1
              className="mt-4 font-[family-name:var(--font-display)] text-6xl sm:text-8xl"
              style={{ color: "var(--hw-primary)" }}
            >
              {data.copy.headline}
            </h1>
            <p
              className="mt-2 text-sm tracking-[0.2em] uppercase"
              style={{ color: "var(--hw-secondary)" }}
            >
              {namesLine(data.people)}
            </p>
            {data.event?.timeLabel ? (
              <p className="mt-4 text-sm" style={{ color: "var(--hw-muted)" }}>
                {data.event.timeLabel}
              </p>
            ) : null}
          </Reveal>
          {opened ? <ScrollHint /> : null}
        </section>

        {thenNow ? (
          <section id="then-now" className="relative">
            <ThenNowSlider then={thenNow.then} now={thenNow.now} />
            <p
              className="py-4 text-center text-[10px] tracking-[0.28em] uppercase"
              style={{ color: "var(--hw-muted)" }}
            >
              Drag to compare then & now
            </p>
          </section>
        ) : null}

        {thenNow ? (
          <section className="flex flex-wrap items-end justify-center gap-8 px-6 py-16">
            <FloatingFrame
              src={thenNow.then.src}
              alt={thenNow.then.alt}
              caption={thenNow.then.caption}
              delay={0}
              rotate={reduce ? -4 : -6}
            />
            <FloatingFrame
              src={thenNow.now.src}
              alt={thenNow.now.alt}
              caption={thenNow.now.caption}
              delay={0.4}
              rotate={reduce ? 3 : 5}
            />
          </section>
        ) : null}

        <section className="mx-auto max-w-xl px-6 py-24">
          <Reveal>
            <p
              className="text-center font-[family-name:var(--font-display)] text-3xl leading-snug sm:text-4xl"
              style={{ color: "var(--hw-secondary)" }}
            >
              {data.copy.message}
            </p>
          </Reveal>
        </section>
        <PlaceSection place={data.event?.place} />
      </motion.div>
    </main>
  );
}
