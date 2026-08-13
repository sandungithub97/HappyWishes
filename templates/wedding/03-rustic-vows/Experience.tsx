"use client";

import Image from "next/image";
import { FadeIn } from "@/templates/_shared/components/FadeIn";
import { RsvpCard } from "@/templates/_shared/components/RsvpCard";
import { PlaceLink } from "@/templates/_shared/components/VenueMap";
import { namesLine } from "@/templates/_shared/people";
import { themeStyle } from "@/templates/_shared/theme";
import type { TemplateData } from "@/templates/_shared/types";

function Vine({ className }: { className: string }) {
  return (
    <svg
      className={className}
      width="72"
      height="72"
      viewBox="0 0 72 72"
      fill="none"
      aria-hidden
      style={{ color: "var(--hw-accent)" }}
    >
      <path
        d="M8 64c8-18 18-28 36-32 2 10-4 22-16 28"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M28 28c6-2 12 2 14 8"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="44" cy="30" r="3" fill="currentColor" opacity="0.7" />
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
        <Vine className="absolute top-8 left-6 sm:left-12" />
        <Vine className="absolute top-8 right-6 rotate-90 sm:right-12" />
        <p className="text-[11px] tracking-[0.32em] uppercase" style={{ color: "var(--hw-accent)" }}>
          {data.copy.subhead}
        </p>
        <h1
          className="mt-5 font-[family-name:var(--font-display)] text-4xl leading-tight sm:text-6xl"
          style={{ color: "var(--hw-secondary)" }}
        >
          {namesLine(data.people)}
        </h1>
        <p
          className="mt-4 font-[family-name:var(--font-display)] text-xl italic"
          style={{ color: "var(--hw-primary)" }}
        >
          {data.copy.headline}
        </p>
        <p className="mt-8 max-w-md text-base leading-7" style={{ color: "var(--hw-muted)" }}>
          {data.copy.message}
        </p>
        {data.event?.timeLabel ? (
          <p className="mt-8 text-sm tracking-wide" style={{ color: "var(--hw-secondary)" }}>
            {data.event.timeLabel}
          </p>
        ) : null}
      </section>

      {data.media.photos.length > 0 ? (
        <section className="mx-auto grid max-w-5xl gap-3 px-4 sm:grid-cols-3 sm:px-8">
          {data.media.photos.map((photo, index) => (
            <FadeIn key={photo.src} delay={index * 0.08}>
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

      <section className="mx-auto max-w-lg px-6 py-20">
        <FadeIn>
          {data.event?.place ? (
            <div className="mb-10 text-center">
              <p className="text-[11px] tracking-[0.3em] uppercase" style={{ color: "var(--hw-accent)" }}>
                The gathering
              </p>
              <PlaceLink place={data.event.place} className="mt-3 block">
                <span
                  className="block font-[family-name:var(--font-display)] text-2xl"
                  style={{ color: "var(--hw-secondary)" }}
                >
                  {data.event.place.name}
                </span>
                {data.event.place.city ? (
                  <span className="mt-1 block text-sm underline underline-offset-4" style={{ color: "var(--hw-muted)" }}>
                    {data.event.place.city}
                  </span>
                ) : null}
              </PlaceLink>
            </div>
          ) : null}
          {data.extras.rsvp?.enabled ? (
            <RsvpCard
              note={data.extras.rsvp.note}
              cta={data.copy.cta}
              storageKey={`hw-rsvp-${data.meta.slug}-${data.meta.wishId}`}
            />
          ) : null}
        </FadeIn>
      </section>
    </main>
  );
}
