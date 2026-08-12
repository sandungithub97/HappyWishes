"use client";

import Image from "next/image";
import { FadeIn } from "@/templates/_shared/components/FadeIn";
import { GuestWall } from "@/templates/_shared/components/GuestWall";
import { PlaceLink } from "@/templates/_shared/components/VenueMap";
import { namesLine } from "@/templates/_shared/people";
import { themeStyle } from "@/templates/_shared/theme";
import type { TemplateData } from "@/templates/_shared/types";

function GoldRule() {
  return (
    <svg width="180" height="16" viewBox="0 0 180 16" fill="none" aria-hidden className="mx-auto">
      <path d="M0 8h70M110 8h70" stroke="currentColor" strokeWidth="0.6" />
      <path d="M82 8h16M90 3v10" stroke="currentColor" strokeWidth="0.6" />
      <circle cx="90" cy="8" r="3.5" stroke="currentColor" strokeWidth="0.6" />
    </svg>
  );
}

export function Experience({ data }: { data: TemplateData }) {
  const years = data.extras.milestoneAge;

  return (
    <main
      className="relative min-h-svh overflow-x-hidden bg-[var(--hw-bg)] font-[family-name:var(--font-body)] text-[var(--hw-text)]"
      style={themeStyle(data.palette)}
    >
      <section className="relative flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center">
        <p className="text-[11px] tracking-[0.42em] uppercase" style={{ color: "var(--hw-primary)" }}>
          {data.event?.timeLabel ?? data.copy.subhead}
        </p>
        <h1
          className="mt-8 font-[family-name:var(--font-display)] text-4xl tracking-[0.12em] uppercase sm:text-6xl"
          style={{ color: "var(--hw-secondary)" }}
        >
          {data.copy.headline}
        </h1>
        <div className="mt-8" style={{ color: "var(--hw-primary)" }}>
          <GoldRule />
        </div>
        <p
          className="mt-8 font-[family-name:var(--font-display)] text-lg tracking-[0.28em] uppercase"
          style={{ color: "var(--hw-secondary)" }}
        >
          {namesLine(data.people)}
        </p>
        {years ? (
          <p className="mt-4 text-sm tracking-[0.2em] uppercase" style={{ color: "var(--hw-muted)" }}>
            {years} years
          </p>
        ) : null}
      </section>

      {data.media.photos.length > 0 ? (
        <section className="mx-auto grid max-w-5xl gap-3 px-6 sm:grid-cols-3">
          {data.media.photos.map((photo) => (
            <FadeIn key={photo.src}>
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            </FadeIn>
          ))}
        </section>
      ) : null}

      <section className="mx-auto max-w-2xl px-6 py-20 text-center">
        <FadeIn>
          <p
            className="font-[family-name:var(--font-display)] text-2xl leading-9 italic sm:text-3xl"
            style={{ color: "var(--hw-secondary)" }}
          >
            {data.copy.message}
          </p>
          {data.event?.place ? (
            <p className="mt-8 text-[11px] tracking-[0.28em] uppercase" style={{ color: "var(--hw-muted)" }}>
              <PlaceLink place={data.event.place} className="underline underline-offset-4" />
            </p>
          ) : null}
        </FadeIn>
      </section>

      {data.extras.guestWall ? (
        <section className="px-6 pb-24">
          <FadeIn>
            <GuestWall storageKey={`hw-wishes-${data.meta.slug}`} cta={data.copy.cta} />
          </FadeIn>
        </section>
      ) : null}
    </main>
  );
}
