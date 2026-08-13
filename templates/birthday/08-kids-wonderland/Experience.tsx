"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ParticleField } from "@/templates/_shared/components/ParticleField";
import { Reveal } from "@/templates/_shared/components/Reveal";
import { ScrollHint } from "@/templates/_shared/components/ScrollHint";
import { RsvpCard } from "@/templates/_shared/components/RsvpCard";
import { PlaceLink } from "@/templates/_shared/components/VenueMap";
import { displayNames } from "@/templates/_shared/people";
import { themeStyle } from "@/templates/_shared/theme";
import type { TemplateData } from "@/templates/_shared/types";

const soft = [0.22, 1, 0.36, 1] as const;

const bubbles: Array<{
  size: number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  color: string;
}> = [
  { size: 88, top: "8%", left: "6%", color: "var(--hw-accent)" },
  { size: 56, top: "18%", right: "10%", color: "var(--hw-primary)" },
  { size: 72, bottom: "16%", left: "12%", color: "var(--hw-secondary)" },
  { size: 40, bottom: "22%", right: "8%", color: "var(--hw-accent)" },
];

/** Original cute star-critter mascot (not from any franchise). */
function StarBuddy({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      aria-hidden
      width="120"
      height="120"
    >
      <circle cx="60" cy="62" r="38" fill="#FFE066" />
      <circle cx="60" cy="62" r="32" fill="#FFF3A8" />
      <ellipse cx="48" cy="58" rx="5" ry="7" fill="#2B2422" />
      <ellipse cx="72" cy="58" rx="5" ry="7" fill="#2B2422" />
      <circle cx="50" cy="56" r="1.5" fill="#fff" />
      <circle cx="74" cy="56" r="1.5" fill="#fff" />
      <path
        d="M52 72c4 6 12 6 16 0"
        stroke="#E85A71"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="42" cy="68" r="5" fill="#FFB4C4" opacity="0.7" />
      <circle cx="78" cy="68" r="5" fill="#FFB4C4" opacity="0.7" />
      <path
        d="M60 18l4 12 12 2-9 8 3 12-10-6-10 6 3-12-9-8 12-2z"
        fill="#FF9F1C"
      />
    </svg>
  );
}

function CastleGate({
  name,
  onOpen,
}: {
  name: string;
  onOpen: () => void;
}) {
  const reduce = useReducedMotion();
  const [opening, setOpening] = useState(false);

  function open() {
    if (opening) return;
    setOpening(true);
    window.setTimeout(onOpen, reduce ? 200 : 1100);
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden px-6"
      style={{
        background: `
          radial-gradient(ellipse at 50% 20%, #b8e0ff 0%, transparent 45%),
          linear-gradient(180deg, #7EC8FF 0%, #FFE8F0 55%, #FFF5E8 100%)
        `,
      }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <ParticleField
        variant="sparkle"
        count={26}
        colors={["#ffffff", "#FFE066", "#FFB4C4", "#7EC8FF"]}
      />

      <motion.div
        className="relative z-10 flex max-w-sm flex-col items-center text-center"
        animate={
          opening && !reduce
            ? { opacity: 0, y: -20, scale: 0.96 }
            : { opacity: 1, y: 0, scale: 1 }
        }
        transition={{ duration: 0.7, ease: soft }}
      >
        {/* Simple castle silhouette */}
        <svg width="220" height="140" viewBox="0 0 220 140" aria-hidden>
          <rect x="30" y="50" width="40" height="90" fill="#E8A87C" />
          <rect x="90" y="30" width="40" height="110" fill="#D4916A" />
          <rect x="150" y="50" width="40" height="90" fill="#E8A87C" />
          <polygon points="50,50 30,30 70,30" fill="#E85A71" />
          <polygon points="110,30 90,8 130,8" fill="#E85A71" />
          <polygon points="170,50 150,30 190,30" fill="#E85A71" />
          <rect x="100" y="90" width="20" height="50" fill="#6B3F2A" />
          <circle cx="110" cy="70" r="8" fill="#7EC8FF" />
        </svg>

        <motion.div
          animate={reduce ? undefined : { y: [0, -8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="-mt-6"
        >
          <StarBuddy />
        </motion.div>

        <p
          className="mt-4 text-sm font-bold"
          style={{ color: "#5B4B8A" }}
        >
          {name}&apos;s wonderland
        </p>
        <button
          type="button"
          onClick={open}
          className="mt-6 rounded-full px-8 py-3.5 text-sm font-extrabold tracking-wide uppercase"
          style={{
            background: "linear-gradient(180deg, #FFE066, #FF9F1C)",
            color: "#2B2422",
            boxShadow: "0 8px 0 #E08500",
          }}
        >
          Open the castle
        </button>
      </motion.div>
    </motion.div>
  );
}

export function Experience({ data }: { data: TemplateData }) {
  const reduce = useReducedMotion();
  const name = displayNames(data.people)[0] ?? "";
  const age = data.extras.milestoneAge;
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
        {!opened ? (
          <CastleGate
            key="gate"
            name={name}
            onOpen={() => setOpened(true)}
          />
        ) : null}
      </AnimatePresence>

      {opened ? (
        <ParticleField
          variant="sparkle"
          count={28}
          colors={["#ffffff", "#FFE066", "#FFB4C4", "#7EC8FF"]}
        />
      ) : null}

      {bubbles.map((bubble, index) => (
        <motion.span
          key={index}
          className="pointer-events-none absolute rounded-full opacity-70"
          style={{
            width: bubble.size,
            height: bubble.size,
            top: bubble.top,
            left: bubble.left,
            right: bubble.right,
            bottom: bubble.bottom,
            background: bubble.color,
          }}
          animate={reduce || !opened ? undefined : { y: [0, -16, 0] }}
          transition={{
            duration: 3 + index * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div
        initial={false}
        animate={
          opened
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0, y: 18, filter: "blur(8px)" }
        }
        transition={{ duration: 0.95, ease: soft, delay: opened ? 0.05 : 0 }}
      >
        <section className="relative flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center">
          <motion.div
            className="mb-2"
            animate={
              reduce || !opened ? undefined : { y: [0, -10, 0], rotate: [-3, 3, -3] }
            }
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <StarBuddy className="mx-auto" />
          </motion.div>
          <p
            className="text-sm font-bold tracking-wide"
            style={{ color: "var(--hw-secondary)" }}
          >
            {data.copy.subhead}
          </p>
          <motion.h1
            className="mt-3 font-[family-name:var(--font-display)] text-6xl sm:text-8xl"
            style={{ color: "var(--hw-primary)" }}
            animate={reduce || !opened ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            {data.copy.headline}
          </motion.h1>
          {age ? (
            <p
              className="mt-2 font-[family-name:var(--font-display)] text-3xl"
              style={{ color: "var(--hw-secondary)" }}
            >
              {name} is {age}
            </p>
          ) : null}
          <p
            className="mt-6 max-w-md text-base leading-7"
            style={{ color: "var(--hw-muted)" }}
          >
            {data.copy.message}
          </p>
          {opened ? <ScrollHint /> : null}
        </section>

        {data.media.photos.length > 0 ? (
          <section className="relative mx-auto grid max-w-4xl grid-cols-2 gap-4 px-6 pb-8 sm:grid-cols-3">
            {data.media.photos.map((photo, index) => (
              <Reveal
                key={photo.src}
                delay={index * 0.06}
                className={index === 2 ? "col-span-2 sm:col-span-1" : ""}
                blur={false}
              >
                <motion.div
                  className="relative aspect-square overflow-hidden rounded-[2rem] border-4"
                  style={{ borderColor: "var(--hw-surface)" }}
                  whileHover={reduce ? undefined : { rotate: [-1, 1, 0], scale: 1.03 }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, 30vw"
                    className="object-cover"
                  />
                </motion.div>
              </Reveal>
            ))}
          </section>
        ) : null}

        <section className="relative mx-auto max-w-md px-6 py-16">
          <Reveal>
            {data.event ? (
              <div
                className="mb-8 rounded-[2rem] border px-6 py-8 text-center"
                style={{
                  background: "var(--hw-surface)",
                  borderColor: "var(--hw-border)",
                }}
              >
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
              </div>
            ) : null}
            {data.extras.rsvp?.enabled ? (
              <RsvpCard
                note={data.extras.rsvp.note}
                cta={data.copy.cta}
                storageKey={`hw-rsvp-${data.meta.slug}-${data.meta.wishId}`}
                occasion={data.meta.occasion}
                slug={data.meta.slug}
                wishId={data.meta.wishId}
              />
            ) : null}
          </Reveal>
        </section>
      </motion.div>
    </main>
  );
}
