"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const soft = [0.22, 1, 0.36, 1] as const;

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Extra blur on enter for a softer premium feel */
  blur?: boolean;
};

export function Reveal({
  children,
  className,
  delay = 0,
  blur = true,
}: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        reduce
          ? false
          : {
              opacity: 0,
              y: 28,
              filter: blur ? "blur(8px)" : "blur(0px)",
            }
      }
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.95, delay, ease: soft }}
    >
      {children}
    </motion.div>
  );
}
