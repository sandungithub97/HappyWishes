"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ConfettiBurst } from "@/templates/_shared/components/ConfettiBurst";
import { ParticleField } from "@/templates/_shared/components/ParticleField";
import { Reveal } from "@/templates/_shared/components/Reveal";
import { ScrollHint } from "@/templates/_shared/components/ScrollHint";
import { PlaceLink } from "@/templates/_shared/components/VenueMap";
import { displayNames } from "@/templates/_shared/people";
import { themeStyle } from "@/templates/_shared/theme";
import type { TemplateData } from "@/templates/_shared/types";

const soft = [0.22, 1, 0.36, 1] as const;

function GiftBox({ opening }: { opening: boolean }) {
  const reduce = useReducedMotion();
  return (
    <div className="relative mx-auto h-44 w-44">
      {/* Box body */}
      <motion.div
        className="absolute bottom-0 left-1/2 h-28 w-36 -translate-x-1/2 rounded-md"
        style={{
          background: "linear-gradient(180deg, #E85A71 0%, #C23B52 100%)",
          boxShadow: "0 16px 40px rgba(0,0,0,0.25)",
        }}
        animate={
          opening && !reduce
            ? { y: 20, opacity: 0.5, scale: 0.95 }
            : { y: 0, opacity: 1, scale: 1 }
        }
        transition={{ duration: 0.7, ease: soft }}
      >
        <div
          className="absolute top-0 bottom-0 left-1/2 w-5 -translate-x-1/2"
          style={{ background: "#F4C95A" }}
        />
      </motion.div>
      {/* Lid */}
      <motion.div
        className="absolute bottom-[6.5rem] left-1/2 h-10 w-40 -translate-x-1/2 rounded-md"
        style={{
          background: "linear-gradient(180deg, #F07488 0%, #E85A71 100%)",
          boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
          transformOrigin: "50% 100%",
        }}
        animate={
          opening && !reduce
            ? { rotateX: -110, y: -40, opacity: 0.4 }
            : { rotateX: 0, y: 0, opacity: 1 }
        }
        transition={{ duration: 0.85, ease: soft }}
      >
        <div
          className="absolute top-0 bottom-0 left-1/2 w-5 -translate-x-1/2"
          style={{ background: "#F4C95A" }}
        />
        {/* Bow */}
        <div className="absolute -top-5 left-1/2 flex -translate-x-1/2 gap-0">
          <span
            className="h-8 w-10 rounded-full"
            style={{ background: "#F4C95A", transform: "rotate(-25deg)" }}
          />
          <span
            className="h-8 w-10 rounded-full"
            style={{ background: "#F4C95A", transform: "rotate(25deg)" }}
          />
        </div>
      </motion.div>
    </div>
  );
}

export function Experience({ data }: { data: TemplateData }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [unwrapping, setUnwrapping] = useState(false);
  const name = displayNames(data.people)[0] ?? "";
  const lockedPhoto = data.media.photos[0];
  const reveal = data.extras.reveal;

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
    document.body.style.overflow = "";
  }, [open]);

  function startUnwrap() {
    if (unwrapping) return;
    setUnwrapping(true);
    window.setTimeout(() => setOpen(true), reduce ? 200 : 950);
  }

  return (
    <main
      className="relative min-h-svh overflow-x-hidden bg-[var(--hw-bg)] font-[family-name:var(--font-body)] text-[var(--hw-text)]"
      style={themeStyle(data.palette)}
    >
      <AnimatePresence>
        {!open ? (
          <motion.div
            key="lock"
            className="fixed inset-0 z-50 flex cursor-pointer flex-col items-center justify-center px-6"
            onClick={startUnwrap}
            exit={
              reduce
                ? { opacity: 0 }
                : { opacity: 0, filter: "blur(16px)", scale: 1.04 }
            }
            transition={{ duration: 0.65, ease: soft }}
          >
            {lockedPhoto ? (
              <Image
                src={lockedPhoto.src}
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover blur-2xl brightness-50"
              />
            ) : (
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 40%, #4a2030 0%, #1a0c12 70%)",
                }}
              />
            )}
            <div className="relative z-10 text-center">
              <GiftBox opening={unwrapping} />
              <p
                className="mt-10 text-[11px] tracking-[0.36em] uppercase"
                style={{ color: "var(--hw-primary)" }}
              >
                {reveal?.lockedLabel ?? data.copy.cta}
              </p>
              <p
                className="mt-4 font-[family-name:var(--font-display)] text-3xl italic sm:text-4xl"
                style={{ color: "var(--hw-text)" }}
              >
                {unwrapping ? "Opening…" : "Unwrap the surprise"}
              </p>
            </div>
            {unwrapping ? (
              <ConfettiBurst
                colors={[
                  data.palette.primary,
                  data.palette.secondary,
                  data.palette.accent,
                  "#ffffff",
                ]}
              />
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>

      {open ? (
        <>
          <ConfettiBurst
            colors={[
              data.palette.primary,
              data.palette.secondary,
              data.palette.accent,
              "#ffffff",
            ]}
          />
          <ParticleField
            variant="sparkle"
            count={22}
            colors={[
              data.palette.primary,
              data.palette.accent,
              "#ffffff",
            ]}
          />
        </>
      ) : null}

      <motion.div
        initial={false}
        animate={
          open
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0, y: 18, filter: "blur(10px)" }
        }
        transition={{ duration: 1, ease: soft, delay: open ? 0.05 : 0 }}
      >
        <section className="relative flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 30%, color-mix(in srgb, var(--hw-primary) 22%, transparent), transparent 50%)",
            }}
          />
          <motion.p
            className="text-[11px] tracking-[0.32em] uppercase"
            style={{ color: "var(--hw-primary)" }}
            initial={reduce || !open ? false : { opacity: 0, y: 10 }}
            animate={open ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {data.copy.subhead}
          </motion.p>
          <motion.h1
            className="mt-5 font-[family-name:var(--font-display)] text-4xl italic sm:text-6xl"
            style={{
              color: "var(--hw-secondary)",
              textShadow:
                "0 0 40px color-mix(in srgb, var(--hw-primary) 35%, transparent)",
            }}
            initial={
              reduce || !open
                ? false
                : { opacity: 0, scale: 0.92, filter: "blur(8px)" }
            }
            animate={
              open
                ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                : undefined
            }
            transition={{ delay: 0.35, duration: 1, ease: soft }}
          >
            {reveal?.unlockedHeadline ?? data.copy.headline}
          </motion.h1>
          {data.extras.milestoneAge ? (
            <p
              className="mt-4 text-sm tracking-[0.2em] uppercase"
              style={{ color: "var(--hw-muted)" }}
            >
              {name} · {data.extras.milestoneAge}
            </p>
          ) : null}
          <p
            className="mt-8 max-w-md text-base leading-7"
            style={{ color: "var(--hw-muted)" }}
          >
            {data.copy.message}
          </p>
          {open ? <ScrollHint /> : null}
        </section>

        {data.media.photos.length > 0 ? (
          <section className="mx-auto grid max-w-4xl grid-cols-2 gap-3 px-6 pb-8 sm:grid-cols-3">
            {data.media.photos.map((photo, index) => (
              <Reveal key={photo.src} delay={index * 0.08}>
                <div
                  className="relative aspect-[3/4] overflow-hidden"
                  style={{
                    boxShadow: "0 16px 40px rgba(0,0,0,0.18)",
                  }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            ))}
          </section>
        ) : null}

        {data.event ? (
          <footer className="px-6 py-16 text-center">
            <Reveal>
              <p
                className="font-[family-name:var(--font-display)] text-2xl"
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
