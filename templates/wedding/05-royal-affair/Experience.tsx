"use client";

import Image from "next/image";
import { FadeIn } from "@/templates/_shared/components/FadeIn";
import { GuestWall } from "@/templates/_shared/components/GuestWall";
import { PlaceLink } from "@/templates/_shared/components/VenueMap";
import { VideoWelcome } from "@/templates/_shared/components/VideoWelcome";
import { namesLine } from "@/templates/_shared/people";
import { themeStyle } from "@/templates/_shared/theme";
import type { TemplateData } from "@/templates/_shared/types";

function Ornament() {
  return (
    <svg width="160" height="18" viewBox="0 0 160 18" fill="none" aria-hidden className="mx-auto">
      <path d="M0 9h58M102 9h58" stroke="currentColor" strokeWidth="0.7" />
      <path d="M70 9h20M80 3v12" stroke="currentColor" strokeWidth="0.7" />
      <circle cx="80" cy="9" r="4" stroke="currentColor" strokeWidth="0.7" />
    </svg>
  );
}

export function Experience({ data }: { data: TemplateData }) {
  return (
    <main
      className="relative min-h-svh overflow-x-hidden bg-[var(--hw-bg)] font-[family-name:var(--font-body)] text-[var(--hw-text)]"
      style={themeStyle(data.palette)}
    >
      <section className="relative flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center">
        <p
          className="text-[11px] tracking-[0.42em] uppercase"
          style={{ color: "var(--hw-primary)" }}
        >
          {data.copy.subhead}
        </p>
        <h1
          className="mt-8 font-[family-name:var(--font-display)] text-4xl tracking-[0.18em] uppercase sm:text-6xl"
          style={{ color: "var(--hw-secondary)" }}
        >
          {data.copy.headline}
        </h1>
        <div className="mt-8" style={{ color: "var(--hw-primary)" }}>
          <Ornament />
        </div>
        <p
          className="mt-8 font-[family-name:var(--font-display)] text-xl tracking-[0.2em] uppercase sm:text-2xl"
          style={{ color: "var(--hw-secondary)" }}
        >
          {namesLine(data.people)}
        </p>
        {data.event?.timeLabel ? (
          <p className="mt-6 text-sm" style={{ color: "var(--hw-muted)" }}>
            {data.event.timeLabel}
          </p>
        ) : null}
      </section>

      {data.extras.videoWelcome && data.media.video ? (
        <section className="px-6 py-8 sm:py-16">
          <FadeIn>
            <VideoWelcome
              src={data.media.video.src}
              poster={data.media.video.poster}
              label="A welcome from the couple"
            />
          </FadeIn>
        </section>
      ) : null}

      {data.media.photos.length > 0 ? (
        <section className="mx-auto grid max-w-5xl gap-3 px-6 py-10 sm:grid-cols-3">
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

      <section className="mx-auto max-w-2xl px-6 py-16 text-center">
        <FadeIn>
          <p
            className="font-[family-name:var(--font-display)] text-2xl leading-9 tracking-wide"
            style={{ color: "var(--hw-secondary)" }}
          >
            {data.copy.message}
          </p>
          {data.event?.place ? (
            <p className="mt-8 text-sm tracking-[0.18em] uppercase" style={{ color: "var(--hw-muted)" }}>
              <PlaceLink place={data.event.place} className="underline underline-offset-4" />
            </p>
          ) : null}
        </FadeIn>
      </section>

      {data.extras.guestWall ? (
        <section className="px-6 pb-24">
          <FadeIn>
            <GuestWall storageKey={`hw-wishes-${data.meta.slug}-${data.meta.wishId}`} cta={data.copy.cta} />
          </FadeIn>
        </section>
      ) : null}
    </main>
  );
}
