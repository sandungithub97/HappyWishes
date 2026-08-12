"use client";

import Image from "next/image";
import { FadeIn } from "@/templates/_shared/components/FadeIn";
import { PlaceSection } from "@/templates/_shared/components/VenueMap";
import { themeStyle } from "@/templates/_shared/theme";
import type { TemplateData } from "@/templates/_shared/types";

export function Experience({ data }: { data: TemplateData }) {
  const scenes = data.extras.timeline ?? [];

  return (
    <main
      className="relative bg-[var(--hw-bg)] font-[family-name:var(--font-body)] text-[var(--hw-text)]"
      style={themeStyle(data.palette)}
    >
      <section className="flex min-h-svh flex-col items-center justify-center px-6 text-center">
        <p className="text-[11px] tracking-[0.32em] uppercase" style={{ color: "var(--hw-primary)" }}>
          {data.copy.subhead}
        </p>
        <h1
          className="mt-5 font-[family-name:var(--font-display)] text-6xl italic sm:text-8xl"
          style={{ color: "var(--hw-secondary)" }}
        >
          {data.copy.headline}
        </h1>
        <p className="mt-6 max-w-md text-base leading-7" style={{ color: "var(--hw-muted)" }}>
          {data.copy.message}
        </p>
        <p className="mt-10 text-[11px] tracking-[0.28em] uppercase" style={{ color: "var(--hw-accent)" }}>
          {data.copy.cta}
        </p>
      </section>

      {scenes.map((scene, index) => {
        const photo = scene.photo ?? data.media.photos[index];
        return (
          <section key={`${scene.label}-${scene.title}`} className="relative min-h-svh">
            {photo ? (
              <Image
                src={typeof photo === "string" ? photo : photo.src}
                alt={scene.title}
                fill
                sizes="100vw"
                className="object-cover"
              />
            ) : null}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, color-mix(in srgb, var(--hw-bg) 88%, transparent), color-mix(in srgb, var(--hw-bg) 20%, transparent) 55%)",
              }}
            />
            <div className="relative flex min-h-svh items-end px-6 py-16 sm:px-16">
              <FadeIn className="max-w-xl">
                <p className="text-[11px] tracking-[0.32em] uppercase" style={{ color: "var(--hw-primary)" }}>
                  {scene.label}
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
              </FadeIn>
            </div>
          </section>
        );
      })}
      <PlaceSection place={data.event?.place} />
    </main>
  );
}
