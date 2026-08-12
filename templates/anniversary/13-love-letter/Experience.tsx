"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { PlaceSection } from "@/templates/_shared/components/VenueMap";
import { themeStyle } from "@/templates/_shared/theme";
import type { TemplateData } from "@/templates/_shared/types";

export function Experience({ data }: { data: TemplateData }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const letter = data.extras.letter;
  const from = data.people.find((person) => person.role === "From")?.name ?? data.people[0]?.name;
  const to = data.people.find((person) => person.role === "To")?.name ?? data.people[1]?.name;

  return (
    <main
      className="relative flex min-h-svh items-center justify-center overflow-hidden bg-[var(--hw-bg)] px-4 py-16 font-[family-name:var(--font-body)] text-[var(--hw-text)]"
      style={themeStyle(data.palette)}
    >
      <AnimatePresence mode="wait">
        {!open ? (
          <motion.button
            key="envelope"
            type="button"
            onClick={() => setOpen(true)}
            className="relative w-full max-w-md cursor-pointer text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -40, rotateX: -18 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="relative overflow-hidden rounded-sm border shadow-xl"
              style={{
                background: "var(--hw-surface)",
                borderColor: "var(--hw-border)",
                aspectRatio: "1.6 / 1",
              }}
            >
              <div
                className="absolute inset-x-0 top-0 h-1/2 origin-top"
                style={{
                  background: "linear-gradient(to bottom, var(--hw-accent), var(--hw-border))",
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
                <p className="text-[11px] tracking-[0.28em] uppercase" style={{ color: "var(--hw-muted)" }}>
                  {data.copy.subhead}
                </p>
                <p
                  className="mt-3 font-[family-name:var(--font-display)] text-4xl"
                  style={{ color: "var(--hw-primary)" }}
                >
                  {to}
                </p>
                <p className="mt-6 text-[11px] tracking-[0.24em] uppercase" style={{ color: "var(--hw-secondary)" }}>
                  {data.copy.cta}
                </p>
              </div>
              <span
                className="absolute bottom-6 left-1/2 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full"
                style={{ background: "var(--hw-primary)", color: "var(--hw-surface)" }}
              >
                <span className="font-[family-name:var(--font-display)] text-xl">{from?.charAt(0)}</span>
              </span>
            </div>
          </motion.button>
        ) : (
          <motion.article
            key="letter"
            className="relative w-full max-w-lg rounded-sm border px-8 py-12 shadow-2xl sm:px-12 sm:py-16"
            style={{
              background: "var(--hw-surface)",
              borderColor: "var(--hw-border)",
            }}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="font-[family-name:var(--font-display)] text-3xl"
              style={{ color: "var(--hw-primary)" }}
            >
              {letter?.greeting ?? data.copy.headline}
            </p>
            <p className="mt-8 text-xl leading-9" style={{ color: "var(--hw-text)" }}>
              {data.copy.message}
            </p>
            <p className="mt-10 text-lg leading-8" style={{ color: "var(--hw-muted)" }}>
              {letter?.closing}
            </p>
            <p
              className="mt-4 font-[family-name:var(--font-display)] text-4xl"
              style={{ color: "var(--hw-secondary)" }}
            >
              {letter?.signature ?? from}
            </p>
          </motion.article>
        )}
      </AnimatePresence>
      <PlaceSection place={data.event?.place} />
    </main>
  );
}
