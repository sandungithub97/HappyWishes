"use client";

import Image from "next/image";
import { FadeIn } from "@/templates/_shared/components/FadeIn";
import { PlaceLink } from "@/templates/_shared/components/VenueMap";
import { RsvpCard } from "@/templates/_shared/components/RsvpCard";
import { namesLine } from "@/templates/_shared/people";
import { themeStyle } from "@/templates/_shared/theme";
import type { TemplateData } from "@/templates/_shared/types";

function GoldRule() {
  return (
    <svg width="140" height="14" viewBox="0 0 140 14" fill="none" aria-hidden className="mx-auto">
      <path d="M0 7h52M88 7h52" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="70" cy="7" r="3" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  );
}

export function Experience({ data }: { data: TemplateData }) {
  const chapters = data.extras.timeline ?? [];

  return (
    <main
      className="relative min-h-svh overflow-x-hidden bg-[var(--hw-bg)] font-[family-name:var(--font-body)] text-[var(--hw-text)]"
      style={themeStyle(data.palette)}
    >
      <section className="relative flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center">
        <p
          className="text-[11px] tracking-[0.38em] uppercase"
          style={{ color: "var(--hw-primary)" }}
        >
          Poruwa ceremony
        </p>
        {data.copy.subhead ? (
          <p
            className="mt-4 max-w-md text-sm leading-6 tracking-wide"
            style={{ color: "var(--hw-accent)" }}
          >
            {data.copy.subhead}
          </p>
        ) : null}
        <h1
          className="mt-6 font-[family-name:var(--font-display)] text-5xl leading-tight sm:text-7xl"
          style={{ color: "var(--hw-secondary)" }}
        >
          {namesLine(data.people)}
        </h1>
        <div className="mt-8" style={{ color: "var(--hw-primary)" }}>
          <GoldRule />
        </div>
        <p className="mt-8 max-w-lg text-lg leading-8 italic" style={{ color: "var(--hw-muted)" }}>
          {data.copy.message}
        </p>
        {data.event?.timeLabel ? (
          <p
            className="mt-8 font-[family-name:var(--font-display)] text-xl"
            style={{ color: "var(--hw-secondary)" }}
          >
            {data.event.timeLabel}
          </p>
        ) : null}
        {data.event?.place ? (
          <p className="mt-2 text-sm" style={{ color: "var(--hw-muted)" }}>
            <PlaceLink place={data.event.place} className="underline underline-offset-4" />
          </p>
        ) : null}
      </section>

      {chapters.length > 0 ? (
        <section className="mx-auto max-w-2xl px-6 pb-8">
          <p
            className="mb-12 text-center text-[11px] tracking-[0.32em] uppercase"
            style={{ color: "var(--hw-primary)" }}
          >
            The tradition
          </p>
          <ol className="space-y-12">
            {chapters.map((chapter) => (
              <FadeIn key={chapter.title}>
                <li className="grid gap-3 sm:grid-cols-[4.5rem_1fr] sm:items-start">
                  <p
                    className="font-[family-name:var(--font-display)] text-3xl"
                    style={{ color: "var(--hw-primary)" }}
                  >
                    {chapter.label}
                  </p>
                  <div>
                    <h2
                      className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl"
                      style={{ color: "var(--hw-secondary)" }}
                    >
                      {chapter.title}
                    </h2>
                    <p className="mt-2 text-base leading-7" style={{ color: "var(--hw-muted)" }}>
                      {chapter.body}
                    </p>
                  </div>
                </li>
              </FadeIn>
            ))}
          </ol>
        </section>
      ) : null}

      {data.media.photos.length > 0 ? (
        <section className="mx-auto grid max-w-5xl gap-3 px-6 py-16 sm:grid-cols-3">
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

      {data.extras.rsvp?.enabled ? (
        <section className="mx-auto max-w-md px-6 pb-24">
          <FadeIn>
            <RsvpCard
              note={data.extras.rsvp.note}
              cta={data.copy.cta}
              storageKey={`hw-rsvp-${data.meta.slug}-${data.meta.wishId}`}
              occasion={data.meta.occasion}
              slug={data.meta.slug}
              wishId={data.meta.wishId}
            />
          </FadeIn>
        </section>
      ) : null}
    </main>
  );
}
