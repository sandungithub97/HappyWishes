"use client";

import Image from "next/image";
import { FadeIn } from "@/templates/_shared/components/FadeIn";
import { GuestWall } from "@/templates/_shared/components/GuestWall";
import { PlaceLink } from "@/templates/_shared/components/VenueMap";
import { VideoWelcome } from "@/templates/_shared/components/VideoWelcome";
import { displayNames } from "@/templates/_shared/people";
import { themeStyle } from "@/templates/_shared/theme";
import type { TemplateData } from "@/templates/_shared/types";

export function Experience({ data }: { data: TemplateData }) {
  const name = displayNames(data.people)[0] ?? data.people[0]?.name ?? "";
  const age = data.extras.milestoneAge;

  return (
    <main
      className="relative min-h-svh overflow-x-hidden bg-[var(--hw-bg)] font-[family-name:var(--font-body)] text-[var(--hw-text)]"
      style={themeStyle(data.palette)}
    >
      <section className="relative flex min-h-[80vh] flex-col items-center justify-center px-6 py-24 text-center">
        <p className="text-[11px] tracking-[0.32em] uppercase" style={{ color: "var(--hw-primary)" }}>
          {data.copy.subhead}
        </p>
        <h1
          className="mt-6 font-[family-name:var(--font-display)] text-5xl italic leading-tight sm:text-7xl"
          style={{ color: "var(--hw-secondary)" }}
        >
          {data.copy.headline}
        </h1>
        {age ? (
          <p className="mt-4 text-sm tracking-[0.2em] uppercase" style={{ color: "var(--hw-muted)" }}>
            {name} · {age} years
          </p>
        ) : null}
        <p className="mt-8 max-w-lg text-lg leading-8" style={{ color: "var(--hw-muted)" }}>
          {data.copy.message}
        </p>
      </section>

      {data.extras.videoWelcome && data.media.video ? (
        <section className="px-6 py-8">
          <FadeIn>
            <VideoWelcome
              src={data.media.video.src}
              poster={data.media.video.poster}
              label="A tribute"
            />
          </FadeIn>
        </section>
      ) : null}

      {data.media.photos.length > 0 ? (
        <section className="mx-auto grid max-w-4xl gap-4 px-6 py-12 sm:grid-cols-3">
          {data.media.photos.map((photo) => (
            <FadeIn key={photo.src}>
              <div className="relative aspect-[3/4] overflow-hidden sepia-[0.35]">
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

      {data.event ? (
        <section className="px-6 py-8 text-center">
          <FadeIn>
            <p className="font-[family-name:var(--font-display)] text-2xl italic" style={{ color: "var(--hw-secondary)" }}>
              {data.event.timeLabel}
            </p>
            {data.event.place ? (
              <p className="mt-2 text-sm" style={{ color: "var(--hw-muted)" }}>
                <PlaceLink place={data.event.place} className="underline underline-offset-4" />
              </p>
            ) : null}
          </FadeIn>
        </section>
      ) : null}

      {data.extras.guestWall ? (
        <section className="px-6 py-16 pb-24">
          <FadeIn>
            <GuestWall storageKey={`hw-wishes-${data.meta.slug}-${data.meta.wishId}`} cta={data.copy.cta} />
          </FadeIn>
        </section>
      ) : null}
    </main>
  );
}
