"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  src: string;
  poster?: string;
  label?: string;
};

export function VideoWelcome({ src, poster, label }: Props) {
  const [failed, setFailed] = useState(false);

  return (
    <figure className="mx-auto w-full max-w-3xl">
      <div
        className="relative overflow-hidden rounded-[1.6rem] border"
        style={{
          borderColor: "var(--hw-primary)",
          background: "var(--hw-surface)",
          boxShadow: "0 0 0 8px color-mix(in srgb, var(--hw-primary) 22%, transparent)",
        }}
      >
        <div className="relative aspect-video">
          {!failed ? (
            <video
              src={src}
              poster={poster}
              controls
              playsInline
              className="h-full w-full object-cover"
              onError={() => setFailed(true)}
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
