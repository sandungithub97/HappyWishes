"use client";

import { motion, useReducedMotion } from "motion/react";

type Props = {
  label?: string;
  color?: string;
  className?: string;
};

export function ScrollHint({
  label = "Scroll",
  color = "var(--hw-muted)",
  className,
}: Props) {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <motion.div
      className={`absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 ${className ?? ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8 }}
    >
      <span
        className="text-[9px] tracking-[0.28em] uppercase"
        style={{ color }}
      >
        {label}
      </span>
      <motion.span
        className="block h-8 w-px"
        style={{ background: "var(--hw-primary)" }}
        animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
