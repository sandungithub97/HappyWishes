"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { TextureOverlay } from "@/templates/_shared/components/TextureOverlay";
import { PlaceLink } from "@/templates/_shared/components/VenueMap";
import { displayNames } from "@/templates/_shared/people";
import { themeStyle } from "@/templates/_shared/theme";
import type { TemplateData } from "@/templates/_shared/types";

const soft = [0.22, 1, 0.36, 1] as const;

function DrawLine({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`h-px origin-left ${className ?? ""}`}
      style={{ background: "var(--hw-primary)" }}
      initial={reduce ? false : { scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 1.1, delay: 0.85, ease: soft }}
    />
  );
}

export function Experience({ data }: { data: TemplateData }) {
  const reduce = useReducedMotion();
  const [pageUrl, setPageUrl] = useState("");
  const [ready, setReady] = useState(false);
  const hero = data.media.photos[0];
  const names = displayNames(data.people);

  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(30);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 22 });
  const glowBg = useMotionTemplate`radial-gradient(ellipse 55% 40% at ${springX}% ${springY}%, color-mix(in srgb, var(--hw-primary) 12%, transparent), transparent 70%)`;

  const { scrollYProgress } = useScroll();
  const tracking = useTransform(
    scrollYProgress,
    [0, 0.25],
    reduce ? ["-0.04em", "-0.04em"] : ["-0.04em", "0.02em"],
  );
  const typeScale = useTransform(
    scrollYProgress,
    [0, 0.2],
    reduce ? [1, 1] : [1, 0.94],
  );
  const photoScale = useTransform(
    scrollYProgress,
    [0, 0.3],
    reduce ? [1, 1] : [1.06, 1],
  );

  useEffect(() => {
    setPageUrl(window.location.href);
    const t = window.setTimeout(() => setReady(true), reduce ? 0 : 80);
    return () => window.clearTimeout(t);
  }, [reduce]);

  const qrSrc = pageUrl
    ? `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(pageUrl)}&margin=8`
    : null;

  return (
    <main
      className="relative min-h-svh overflow-x-hidden bg-[var(--hw-bg)] font-[family-name:var(--font-body)] text-[var(--hw-text)]"
      style={themeStyle(data.palette)}
      onMouseMove={(event) => {
        if (reduce) return;
        mouseX.set((event.clientX / window.innerWidth) * 100);
        mouseY.set((event.clientY / window.innerHeight) * 100);
      }}
    >
      <TextureOverlay variant="grain" opacity={0.22} />

      {!reduce ? (
        <motion.div
          className="pointer-events-none absolute inset-0 -z-10 opacity-70"
          style={{ background: glowBg }}
        />
      ) : null}

      <motion.div
        className="pointer-events-none fixed inset-0 z-40 bg-[var(--hw-bg)]"
        initial={{ scaleY: 1 }}
        animate={ready ? { scaleY: 0 } : { scaleY: 1 }}
        transition={{ duration: 0.95, ease: soft }}
        style={{ originY: 0 }}
      />

      <div className="relative mx-auto grid min-h-svh max-w-6xl lg:grid-cols-2">
        <section className="relative flex flex-col justify-between px-6 py-10 sm:px-12 sm:py-14">
          <motion.p
            className="text-[11px] font-medium tracking-[0.4em] uppercase"
            style={{ color: "var(--hw-primary)" }}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.8, ease: soft }}
          >
            {data.copy.subhead}
          </motion.p>

          <div>
            <motion.h1
              className="font-[family-name:var(--font-display)] text-6xl leading-[0.9] uppercase sm:text-8xl"
              style={{
                color: "var(--hw-secondary)",
                letterSpacing: tracking,
                scale: typeScale,
                transformOrigin: "left center",
              }}
            >
              {names.map((name, index) => (
                <span key={name} className="block overflow-hidden py-[0.02em]">
                  <motion.span
                    className="block"
                    initial={reduce ? false : { y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{
                      delay: 0.65 + index * 0.12,
                      duration: 0.95,
                      ease: soft,
                    }}
                  >
                    {name}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            <DrawLine className="mt-8 w-16" />

            <motion.p
              className="mt-8 max-w-sm text-base leading-7"
              style={{ color: "var(--hw-muted)" }}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.85, ease: soft }}
            >
              {data.copy.message}
            </motion.p>

            {data.event?.timeLabel ? (
              <motion.p
                className="mt-6 font-[family-name:var(--font-display)] text-sm tracking-[0.28em] uppercase"
                style={{ color: "var(--hw-secondary)" }}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                {data.event.timeLabel}
              </motion.p>
            ) : null}
          </div>

          <motion.div
            className="mt-12 flex items-end justify-between gap-6"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8, ease: soft }}
          >
            <div>
              {data.event?.place ? (
                <PlaceLink place={data.event.place}>
                  <p
                    className="text-[11px] tracking-[0.28em] uppercase underline underline-offset-4"
                    style={{ color: "var(--hw-muted)" }}
                  >
                    {data.event.place.name}
                  </p>
                  {data.event.place.city ? (
                    <p
                      className="mt-1 text-sm"
                      style={{ color: "var(--hw-secondary)" }}
                    >
                      {data.event.place.city}
                    </p>
                  ) : null}
                </PlaceLink>
              ) : null}
            </div>
            {data.extras.qrFriendly && qrSrc ? (
              <div className="text-right">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrSrc}
                  alt="QR code for this invite"
                  width={88}
                  height={88}
                  className="ml-auto"
                />
                <p
                  className="mt-2 text-[9px] tracking-[0.2em] uppercase"
                  style={{ color: "var(--hw-muted)" }}
                >
                  Scan
                </p>
              </div>
            ) : null}
          </motion.div>
        </section>

        {hero ? (
          <section className="relative min-h-[50vh] overflow-hidden lg:min-h-svh">
            <motion.div className="absolute inset-0" style={{ scale: photoScale }}>
              <Image
                src={hero.src}
                alt={hero.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover grayscale"
              />
            </motion.div>
            <motion.div
              className="absolute inset-y-0 left-0 w-1 origin-top"
              style={{ background: "var(--hw-primary)" }}
              initial={reduce ? false : { scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.9, duration: 1.1, ease: soft }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, color-mix(in srgb, var(--hw-bg) 18%, transparent), transparent 35%)",
              }}
            />
          </section>
        ) : null}
      </div>
    </main>
  );
}
