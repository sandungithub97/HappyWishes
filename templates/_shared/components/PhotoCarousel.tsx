"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { Photo } from "../types";

type Props = {
  photos: Photo[];
  intervalMs?: number;
};

export function PhotoCarousel({ photos, intervalMs = 5200 }: Props) {
  const [index, setIndex] = useState(0);
  const photo = photos[index];

  useEffect(() => {
    if (photos.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % photos.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [photos.length, intervalMs]);

  if (!photo) return null;

  return (
    <div className="relative mx-auto w-full max-w-4xl">
      <div
        className="relative aspect-[4/5] overflow-hidden sm:aspect-[16/10]"
        style={{ background: "var(--hw-surface)" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={photo.src}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1 }}
              animate={{ scale: 1.08 }}
              transition={{ duration: intervalMs / 1000 + 1.2, ease: "linear" }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                priority={index === 0}
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-cover"
              />
            </motion.div>
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, color-mix(in srgb, var(--hw-secondary) 38%, transparent), transparent 42%)",
              }}
            />
          </motion.div>
        </AnimatePresence>

        {photo.caption ? (
          <p
            className="absolute bottom-5 left-0 right-0 px-6 text-center font-[family-name:var(--font-display)] text-lg italic text-white sm:bottom-8 sm:text-2xl"
          >
            {photo.caption}
          </p>
        ) : null}
      </div>

      {photos.length > 1 ? (
        <div className="mt-5 flex justify-center gap-2">
          {photos.map((item, itemIndex) => (
            <button
              key={item.src}
              type="button"
              aria-label={`Show photo ${itemIndex + 1}`}
              onClick={() => setIndex(itemIndex)}
              className="h-1.5 rounded-full transition-all duration-500"
              style={{
                width: itemIndex === index ? 28 : 8,
                background:
                  itemIndex === index
                    ? "var(--hw-primary)"
                    : "var(--hw-border)",
              }}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
