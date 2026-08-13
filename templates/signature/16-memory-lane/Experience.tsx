"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { Reveal } from "@/templates/_shared/components/Reveal";
import { ScrollHint } from "@/templates/_shared/components/ScrollHint";
import { TextureOverlay } from "@/templates/_shared/components/TextureOverlay";
import { PlaceSection } from "@/templates/_shared/components/VenueMap";
import { themeStyle } from "@/templates/_shared/theme";
import type { TemplateData, TimelineItem } from "@/templates/_shared/types";

function SceneChapter({
  scene,
  photoSrc,
  index,
}: {
  scene: TimelineItem;
  photoSrc?: string;
  index: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const kenBurnsScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [1, 1] : index % 2 === 0 ? [1.05, 1.18] : [1.16, 1.04],
  );
  const kenBurnsX = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : index % 2 === 0 ? ["0%", "-4%"] : ["-3%", "2%"],
  );
  const textY = useTransform(
    scrollYProgress,
    [0.2, 0.55],
    reduce ? [0, 0] : [40, 0],
  );
  const textOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.4, 0.75, 0.95],
    [0, 1, 1, 0.35],
  );
  const crossfade = useTransform(
    scrollYProgress,
    [0, 0.12, 0.88, 1],
    [0, 1, 1, 0],
  );

  return (
    <section ref={ref} className="relative min-h-svh overflow-hidden">
      {photoSrc ? (
        <motion.div className="absolute inset-0" style={{ opacity: crossfade }}>
          <motion.div
            className="absolute inset-[-8%]"
            style={{ scale: kenBurnsScale, x: kenBurnsX }}
          >
            <Image
              src={photoSrc}
              alt={scene.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority={index === 0}
            />
          </motion.div>
        </motion.div>
      ) : (
        <div className="absolute inset-0" style={{ background: "var(--hw-surface)" }} />
      )}

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, color-mix(in srgb, var(--hw-bg) 90%, transparent), color-mix(in srgb, var(--hw-bg) 18%, transparent) 55%)",
        }}
      />
      <TextureOverlay variant="grain" opacity={0.12} />

      {/* Film stamp */}
      <motion.div
        className="absolute top-8 right-6 z-10 rotate-[-6deg] border px-3 py-2 sm:top-12 sm:right-12"
        style={{
          borderColor: "rgba(255,255,255,0.55)",
          background: "rgba(44,42,38,0.35)",
          backdropFilter: "blur(4px)",
          opacity: textOpacity,
        }}
      >
        <p
          className="font-[family-name:var(--font-display)] text-lg tracking-wide text-white"
        >
          {scene.label}
        </p>
        {scene.place ? (
          <p className="mt-0.5 text-[10px] tracking-[0.2em] uppercase text-white/75">
            {scene.place}
          </p>
        ) : null}
      </motion.div>

      <motion.div
        className="relative flex min-h-svh items-end px-6 py-16 sm:px-16"
        style={{ y: textY, opacity: textOpacity }}
      >
        <div className="max-w-xl">
          <p
            className="text-[11px] tracking-[0.32em] uppercase"
            style={{ color: "var(--hw-primary)" }}
          >
            Scene {String(index + 1).padStart(2, "0")}
          </p>
          <h2
            className="mt-3 font-[family-name:var(--font-display)] text-4xl italic sm:text-6xl"
            style={{ color: "var(--hw-secondary)" }}
          >
            {scene.title}
          </h2>
          <p className="mt-4 text-lg leading-8" style={{ color: "var(--hw-text)" }}>
            {scene.body}
          </p>
        </div>
      </motion.div>
    </section>
  );
}

export function Experience({ data }: { data: TemplateData }) {
  const scenes = data.extras.timeline ?? [];

  return (
    <main
      className="relative bg-[var(--hw-bg)] font-[family-name:var(--font-body)] text-[var(--hw-text)]"
      style={themeStyle(data.palette)}
    >
      <section className="relative flex min-h-svh flex-col items-center justify-center px-6 text-center">
        <TextureOverlay variant="paper" opacity={0.25} />
        <Reveal>
          <p
            className="text-[11px] tracking-[0.32em] uppercase"
            style={{ color: "var(--hw-primary)" }}
          >
            {data.copy.subhead}
          </p>
          <h1
            className="mt-5 font-[family-name:var(--font-display)] text-6xl italic sm:text-8xl"
            style={{ color: "var(--hw-secondary)" }}
          >
            {data.copy.headline}
          </h1>
          <p
            className="mt-6 max-w-md text-base leading-7"
            style={{ color: "var(--hw-muted)" }}
          >
            {data.copy.message}
          </p>
          <p
            className="mt-10 text-[11px] tracking-[0.28em] uppercase"
            style={{ color: "var(--hw-accent)" }}
          >
            {data.copy.cta}
          </p>
        </Reveal>
        <ScrollHint />
      </section>

      {scenes.map((scene, index) => {
        const photo = scene.photo ?? data.media.photos[index];
        const photoSrc = typeof photo === "string" ? photo : photo?.src;
        return (
          <SceneChapter
            key={`${scene.label}-${scene.title}`}
            scene={scene}
            photoSrc={photoSrc}
            index={index}
          />
        );
      })}
      <PlaceSection place={data.event?.place} />
    </main>
  );
}
