"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** How far the layer moves across the scroll range (px) */
  distance?: number;
  range?: [number, number];
};

/** Scroll-linked vertical parallax wrapper. */
export function ParallaxLayer({
  children,
  className,
  distance = 48,
  range = [0, 0.25],
}: Props) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(
    scrollYProgress,
    range,
    reduce ? [0, 0] : [0, -distance],
  );

  return (
    <motion.div className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}

export function useParallaxY(
  distance = 48,
  range: [number, number] = [0, 0.25],
): MotionValue<number> {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  return useTransform(
    scrollYProgress,
    range,
    reduce ? [0, 0] : [0, -distance],
  );
}
