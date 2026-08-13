"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { ParticleField } from "@/templates/_shared/components/ParticleField";
import { PlaceSection } from "@/templates/_shared/components/VenueMap";
import { TextureOverlay } from "@/templates/_shared/components/TextureOverlay";
import { themeStyle } from "@/templates/_shared/theme";
import type { TemplateData } from "@/templates/_shared/types";

const soft = [0.22, 1, 0.36, 1] as const;

function HandwritingReveal({
  text,
  className,
  style,
  delay = 0,
}: {
  text: string;
  className?: string;
  style?: CSSProperties;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const words = useMemo(() => text.split(" "), [text]);

  if (reduce) {
    return (
      <p className={className} style={style}>
        {text}
      </p>
    );
  }

  return (
    <p className={className} style={style}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block"
          initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: delay + i * 0.045, duration: 0.45, ease: soft }}
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </p>
  );
}

function WaxSeal({ cracked }: { cracked: boolean }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="relative flex h-16 w-16 items-center justify-center"
      animate={
        cracked && !reduce
          ? { scale: [1, 1.15, 0.85], rotate: [0, -8, 12], opacity: [1, 1, 0] }
          : { scale: 1, opacity: 1 }
      }
      transition={{ duration: 0.65, ease: soft }}
    >
      <svg viewBox="0 0 64 64" className="h-full w-full drop-shadow-lg" aria-hidden>
        <circle cx="32" cy="32" r="28" fill="#9B2C2C" />
        <circle cx="32" cy="32" r="22" fill="none" stroke="#C45A5A" strokeWidth="1.5" />
        <path
          d="M32 18c-6 0-10 4.5-10 10 0 7 10 16 10 16s10-9 10-16c0-5.5-4-10-10-10z"
          fill="#FBF3E0"
          opacity="0.9"
        />
      </svg>
      {cracked && !reduce ? (
        <>
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-[#FBF3E0]/50"
            initial={{ scale: 0.8, opacity: 0.8 }}
            animate={{ scale: 2.2, opacity: 0 }}
            transition={{ duration: 0.55 }}
          />
          <motion.span
            className="absolute left-1/2 top-1/2 h-px w-10 -translate-x-1/2 bg-[#FBF3E0]/70"
            initial={{ rotate: -25, scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.25 }}
          />
        </>
      ) : null}
    </motion.div>
  );
}

export function Experience({ data }: { data: TemplateData }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [cracking, setCracking] = useState(false);
  const letter = data.extras.letter;
  const from =
    data.people.find((person) => person.role === "From")?.name ??
    data.people[0]?.name;
  const to =
    data.people.find((person) => person.role === "To")?.name ??
    data.people[1]?.name;

  function openLetter() {
    if (cracking || open) return;
    setCracking(true);
    window.setTimeout(() => setOpen(true), reduce ? 180 : 720);
  }

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
    document.body.style.overflow = "";
  }, [open]);

  return (
    <main
      className="relative min-h-svh overflow-x-hidden bg-[var(--hw-bg)] font-[family-name:var(--font-body)] text-[var(--hw-text)]"
      style={themeStyle(data.palette)}
    >
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 40%, rgba(196,165,116,0.18) 0%, transparent 60%), var(--hw-bg)",
        }}
      />
      <TextureOverlay variant="paper" opacity={0.35} className="fixed inset-0 -z-[5]" />
      <ParticleField
        variant="petal"
        count={22}
        colors={["#F7C1D0", "#E8A0B4", "#C97B84", "#D9C4A0"]}
        className="fixed inset-0 -z-[4] opacity-80"
      />

      <div className="relative flex min-h-svh items-center justify-center px-4 py-16">
        <AnimatePresence mode="wait">
          {!open ? (
            <motion.button
              key="envelope"
              type="button"
              onClick={openLetter}
              className="relative w-full max-w-md cursor-pointer text-left"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={
                reduce
                  ? { opacity: 0 }
                  : { opacity: 0, y: -36, rotateX: -22, scale: 0.96 }
              }
              transition={{ duration: 0.75, ease: soft }}
              style={{ perspective: "1200px" }}
            >
              <div
                className="relative overflow-hidden rounded-sm border shadow-2xl"
                style={{
                  background: "var(--hw-surface)",
                  borderColor: "var(--hw-border)",
                  aspectRatio: "1.55 / 1",
                }}
              >
                <TextureOverlay variant="washi" opacity={0.4} />
                <motion.div
                  className="absolute inset-x-0 top-0 z-10 h-1/2 origin-top"
                  style={{
                    background:
                      "linear-gradient(to bottom, var(--hw-accent), var(--hw-border))",
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  }}
                  animate={
                    cracking && !reduce
                      ? { rotateX: -118, opacity: 0.85 }
                      : { rotateX: 0 }
                  }
                  transition={{ duration: 0.7, ease: soft }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center pt-10">
                  <p
                    className="text-[11px] tracking-[0.28em] uppercase"
                    style={{ color: "var(--hw-muted)" }}
                  >
                    {data.copy.subhead}
                  </p>
                  <p
                    className="mt-3 font-[family-name:var(--font-display)] text-4xl"
                    style={{ color: "var(--hw-primary)" }}
                  >
                    {to}
                  </p>
                  <p
                    className="mt-6 text-[11px] tracking-[0.24em] uppercase"
                    style={{ color: "var(--hw-secondary)" }}
                  >
                    {data.copy.cta}
                  </p>
                </div>
                <div className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2">
                  <WaxSeal cracked={cracking} />
                </div>
              </div>
            </motion.button>
          ) : (
            <motion.article
              key="letter"
              className="relative w-full max-w-lg origin-top overflow-hidden rounded-sm border px-8 py-12 shadow-2xl sm:px-12 sm:py-16"
              style={{
                background: "var(--hw-surface)",
                borderColor: "var(--hw-border)",
              }}
              initial={
                reduce
                  ? { opacity: 0 }
                  : { opacity: 0, y: 48, scaleY: 0.72, rotateX: 18 }
              }
              animate={{ opacity: 1, y: 0, scaleY: 1, rotateX: 0 }}
              transition={{ duration: 0.95, ease: soft }}
            >
              <TextureOverlay variant="paper" opacity={0.45} />
              <div className="relative z-10">
                <HandwritingReveal
                  text={letter?.greeting ?? data.copy.headline}
                  className="font-[family-name:var(--font-display)] text-3xl"
                  style={{ color: "var(--hw-primary)" }}
                  delay={0.15}
                />
                <HandwritingReveal
                  text={data.copy.message}
                  className="mt-8 text-xl leading-9"
                  style={{ color: "var(--hw-text)" }}
                  delay={0.55}
                />
                {letter?.closing ? (
                  <HandwritingReveal
                    text={letter.closing}
                    className="mt-10 text-lg leading-8"
                    style={{ color: "var(--hw-muted)" }}
                    delay={1.35}
                  />
                ) : null}
                <motion.p
                  className="mt-4 font-[family-name:var(--font-display)] text-4xl"
                  style={{ color: "var(--hw-secondary)" }}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.85, duration: 0.7, ease: soft }}
                >
                  {letter?.signature ?? from}
                </motion.p>
              </div>
            </motion.article>
          )}
        </AnimatePresence>
      </div>

      {open ? <PlaceSection place={data.event?.place} /> : null}
    </main>
  );
}
