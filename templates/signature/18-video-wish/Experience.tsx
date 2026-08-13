"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ConfettiBurst } from "@/templates/_shared/components/ConfettiBurst";
import { ParticleField } from "@/templates/_shared/components/ParticleField";
import { Reveal } from "@/templates/_shared/components/Reveal";
import { TextureOverlay } from "@/templates/_shared/components/TextureOverlay";
import { PlaceSection } from "@/templates/_shared/components/VenueMap";
import { displayNames } from "@/templates/_shared/people";
import { themeStyle } from "@/templates/_shared/theme";
import type { TemplateData } from "@/templates/_shared/types";

const soft = [0.22, 1, 0.36, 1] as const;

function CurtainGate({
  headline,
  onOpen,
}: {
  headline: string;
  onOpen: () => void;
}) {
  const reduce = useReducedMotion();
  const [rising, setRising] = useState(false);

  function open() {
    if (rising) return;
    setRising(true);
    window.setTimeout(onOpen, reduce ? 200 : 1100);
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ background: "#061818" }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
    >
      <ParticleField
        variant="bokeh"
        count={24}
        colors={["rgba(198,166,100,0.4)", "rgba(250,246,239,0.2)", "rgba(20,82,85,0.5)"]}
      />

      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 origin-left border-r"
        style={{
          background:
            "linear-gradient(90deg, #0a2e2f 0%, #145255 55%, #0f3d3e 100%)",
          borderColor: "rgba(198,166,100,0.35)",
          boxShadow: "inset -20px 0 40px rgba(0,0,0,0.35)",
        }}
        animate={
          rising && !reduce
            ? { x: "-105%", rotateY: -8 }
            : { x: 0 }
        }
        transition={{ duration: 1.05, ease: soft }}
      />
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 origin-right border-l"
        style={{
          background:
            "linear-gradient(270deg, #0a2e2f 0%, #145255 55%, #0f3d3e 100%)",
          borderColor: "rgba(198,166,100,0.35)",
          boxShadow: "inset 20px 0 40px rgba(0,0,0,0.35)",
        }}
        animate={
          rising && !reduce
            ? { x: "105%", rotateY: 8 }
            : { x: 0 }
        }
        transition={{ duration: 1.05, ease: soft }}
      />

      {/* Gold trim bar across join */}
      <motion.div
        className="absolute top-0 bottom-0 left-1/2 z-10 w-px -translate-x-1/2"
        style={{ background: "rgba(198,166,100,0.55)" }}
        animate={rising ? { opacity: 0 } : { opacity: 1 }}
      />

      <motion.button
        type="button"
        onClick={open}
        className="relative z-20 px-6 text-center"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: rising ? 0 : 1, y: 0 }}
        transition={{ duration: 0.7, ease: soft }}
      >
        <p
          className="text-[11px] tracking-[0.35em] uppercase"
          style={{ color: "var(--hw-primary)" }}
        >
          Curtain call
        </p>
        <p
          className="mt-4 font-[family-name:var(--font-display)] text-3xl italic sm:text-4xl"
          style={{ color: "var(--hw-secondary)" }}
        >
          {headline}
        </p>
        <p
          className="mt-8 text-[11px] tracking-[0.28em] uppercase"
          style={{ color: "var(--hw-muted)" }}
        >
          Tap to raise the curtain
        </p>
      </motion.button>
    </motion.div>
  );
}

function FramedVideo({
  src,
  poster,
  label,
  onEnded,
}: {
  src: string;
  poster?: string;
  label?: string;
  onEnded: () => void;
}) {
  const [failed, setFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <figure className="relative mx-auto w-full max-w-3xl">
      <div
        className="relative overflow-hidden rounded-[1.6rem] border"
        style={{
          borderColor: "var(--hw-primary)",
          background: "var(--hw-surface)",
          boxShadow:
            "0 0 0 8px color-mix(in srgb, var(--hw-primary) 22%, transparent), 0 30px 80px rgba(0,0,0,0.35)",
        }}
      >
        <div className="relative aspect-video">
          {!failed ? (
            <video
              ref={videoRef}
              src={src}
              poster={poster}
              controls
              playsInline
              className="h-full w-full object-cover"
              onError={() => setFailed(true)}
              onEnded={onEnded}
            />
          ) : poster ? (
            <Image
              src={poster}
              alt={label ?? "Welcome still"}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          ) : (
            <div
              className="flex h-full items-center justify-center px-6 text-center text-sm"
              style={{ color: "var(--hw-muted)" }}
            >
              Add a video at this template&apos;s media path to play a welcome message.
            </div>
          )}
        </div>
      </div>
      {label ? (
        <figcaption
          className="mt-4 text-center text-[11px] tracking-[0.24em] uppercase"
          style={{ color: "var(--hw-muted)" }}
        >
          {label}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function Experience({ data }: { data: TemplateData }) {
  const from = displayNames(data.people)[0] ?? data.people[0]?.name ?? "";
  const video = data.media.video;
  const [opened, setOpened] = useState(false);
  const [burstKey, setBurstKey] = useState(0);

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
      className="relative flex min-h-svh flex-col items-center justify-center overflow-x-hidden bg-[var(--hw-bg)] px-6 py-16 font-[family-name:var(--font-body)] text-[var(--hw-text)]"
      style={themeStyle(data.palette)}
    >
      <AnimatePresence>
        {!opened ? (
          <CurtainGate
            key="curtain"
            headline={data.copy.headline}
            onOpen={() => setOpened(true)}
          />
        ) : null}
      </AnimatePresence>

      <ParticleField
        variant="bokeh"
        count={28}
        colors={["rgba(198,166,100,0.45)", "rgba(250,246,239,0.22)", "rgba(20,82,85,0.4)"]}
        className="fixed inset-0 -z-10 opacity-70"
      />
      <TextureOverlay variant="vignette" opacity={0.55} className="fixed inset-0 -z-[5]" />

      {burstKey > 0 ? (
        <div className="pointer-events-none fixed inset-0 z-40">
          <ConfettiBurst
            key={burstKey}
            colors={["#C6A664", "#FAF6EF", "#7ec8c4", "#e8d5a3"]}
            count={110}
            variant="sparkle"
          />
        </div>
      ) : null}

      <motion.div
        className="relative z-10 flex w-full flex-col items-center"
        initial={false}
        animate={opened ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        transition={{ duration: 1, ease: soft, delay: opened ? 0.15 : 0 }}
      >
        <Reveal>
          <p
            className="text-center text-[11px] tracking-[0.32em] uppercase"
            style={{ color: "var(--hw-primary)" }}
          >
            {data.copy.subhead}
          </p>
          <h1
            className="mt-4 text-center font-[family-name:var(--font-display)] text-4xl italic sm:text-6xl"
            style={{ color: "var(--hw-secondary)" }}
          >
            {data.copy.headline}
          </h1>
          <p
            className="mt-3 text-center text-sm tracking-[0.18em] uppercase"
            style={{ color: "var(--hw-muted)" }}
          >
            From {from}
          </p>
        </Reveal>

        {video ? (
          <div className="mt-10 w-full">
            <FramedVideo
              src={video.src}
              poster={video.poster}
              label={data.copy.cta}
              onEnded={() => setBurstKey((k) => k + 1)}
            />
          </div>
        ) : null}

        <Reveal delay={0.1}>
          <p
            className="mt-10 max-w-md text-center text-base leading-8"
            style={{ color: "var(--hw-muted)" }}
          >
            {data.copy.message}
          </p>
        </Reveal>
        <PlaceSection place={data.event?.place} />
      </motion.div>
    </main>
  );
}
