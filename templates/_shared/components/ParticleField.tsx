"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

export type ParticleVariant = "bokeh" | "sparkle" | "bubble" | "petal";

type Props = {
  variant?: ParticleVariant;
  count?: number;
  colors?: string[];
  className?: string;
};

export function ParticleField({
  variant = "bokeh",
  count = 24,
  colors,
  className,
}: Props) {
  const reduce = useReducedMotion();
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const effectiveCount = mobile ? Math.max(8, Math.ceil(count * 0.5)) : count;

  const palette =
    colors ??
    (variant === "bubble"
      ? ["rgba(255,180,200,0.35)", "rgba(180,220,255,0.3)", "rgba(255,220,160,0.25)"]
      : variant === "sparkle"
        ? ["#fff6e8", "#ffd6e8", "#ffe9a8"]
        : variant === "petal"
          ? ["#F7C1D0", "#E8A0B4", "#FFD6E0"]
          : ["rgba(196,163,90,0.35)", "rgba(232,213,163,0.28)", "rgba(255,255,255,0.22)"]);

  const particles = useMemo(
    () =>
      Array.from({ length: effectiveCount }, (_, i) => ({
        id: i,
        left: `${(i * 41) % 100}%`,
        top: `${(i * 29) % 100}%`,
        size:
          variant === "sparkle"
            ? 2 + (i % 3)
            : variant === "bubble"
              ? 10 + (i % 18)
              : 8 + (i % 22),
        delay: (i % 10) * 0.35,
        duration: 4 + (i % 6) * 0.7,
        color: palette[i % palette.length]!,
      })),
    [effectiveCount, palette, variant],
  );

  if (reduce) return null;

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
      aria-hidden
    >
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background:
              variant === "sparkle"
                ? p.color
                : `radial-gradient(circle, ${p.color} 0%, transparent 70%)`,
            boxShadow:
              variant === "sparkle"
                ? `0 0 8px ${p.color}`
                : variant === "bokeh"
                  ? `0 0 ${p.size}px ${p.color}`
                  : undefined,
            border:
              variant === "bubble"
                ? "1px solid rgba(255,255,255,0.35)"
                : undefined,
          }}
          animate={
            variant === "sparkle"
              ? { opacity: [0.15, 1, 0.2], scale: [1, 1.4, 1] }
              : { y: [0, -18, 0], opacity: [0.35, 0.8, 0.35], x: [0, 8, 0] }
          }
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
