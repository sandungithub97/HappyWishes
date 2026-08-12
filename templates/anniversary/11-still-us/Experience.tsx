"use client";

import Image from "next/image";
import { FadeIn } from "@/templates/_shared/components/FadeIn";
import { PlaceSection } from "@/templates/_shared/components/VenueMap";
import { namesLine } from "@/templates/_shared/people";
import { themeStyle } from "@/templates/_shared/theme";
import type { TemplateData } from "@/templates/_shared/types";

export function Experience({ data }: { data: TemplateData }) {
  const thenNow = data.extras.thenNow;

  return (
    <main
      className="relative min-h-svh overflow-x-hidden bg-[var(--hw-bg)] font-[family-name:var(--font-body)] text-[var(--hw-text)]"
      style={themeStyle(data.palette)}
    >
      <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-20 text-center">
        <p className="text-[11px] tracking-[0.32em] uppercase" style={{ color: "var(--hw-muted)" }}>
          {data.copy.subhead}
        </p>
        <h1
          className="mt-4 font-[family-name:var(--font-display)] text-6xl sm:text-8xl"
          style={{ color: "var(--hw-primary)" }}
        >
          {data.copy.headline}
        </h1>
        <p className="mt-2 text-sm tracking-[0.2em] uppercase" style={{ color: "var(--hw-secondary)" }}>
          {namesLine(data.people)}
        </p>
        {data.event?.timeLabel ? (
          <p className="mt-4 text-sm" style={{ color: "var(--hw-muted)" }}>
            {data.event.timeLabel}
          </p>
        ) : null}
      </section>

      {thenNow ? (
        <section id="then-now" className="grid min-h-[80vh] sm:grid-cols-2">
          {[thenNow.then, thenNow.now].map((photo) => (
            <div key={photo.src} className="relative min-h-[50vh]">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, color-mix(in srgb, var(--hw-secondary) 45%, transparent), transparent 50%)",
                }}
              />
              <p
                className="absolute bottom-8 left-0 right-0 text-center font-[family-name:var(--font-display)] text-4xl text-white sm:text-5xl"
              >
                {photo.caption}
              </p>
            </div>
          ))}
        </section>
      ) : null}

      <section className="mx-auto max-w-xl px-6 py-24">
        <FadeIn>
          <p
            className="text-center font-[family-name:var(--font-display)] text-3xl leading-snug sm:text-4xl"
            style={{ color: "var(--hw-secondary)" }}
          >
            {data.copy.message}
          </p>
        </FadeIn>
      </section>
      <PlaceSection place={data.event?.place} />
    </main>
  );
}
