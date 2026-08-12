"use client";

import Image from "next/image";
import { FadeIn } from "@/templates/_shared/components/FadeIn";
import { PetalFall } from "@/templates/_shared/components/PetalFall";
import { PlaceLink } from "@/templates/_shared/components/VenueMap";
import { RsvpCard } from "@/templates/_shared/components/RsvpCard";
import { namesLine } from "@/templates/_shared/people";
import { themeStyle } from "@/templates/_shared/theme";
import type { TemplateData } from "@/templates/_shared/types";

export function Experience({ data }: { data: TemplateData }) {
  const [first, second] = data.people.map((person) => person.name.split(" ")[0]);

  return (
    <main
      className="relative min-h-svh overflow-x-hidden bg-[var(--hw-bg)] font-[family-name:var(--font-body)] text-[var(--hw-text)]"
      style={themeStyle(data.palette)}
    >
      <PetalFall
        colors={[
          data.palette.primary,
          data.palette.accent,
          "#F7C1D0",
          "#FFD6E0",
        ]}
      />

      <section className="relative flex min-h-svh items-center justify-center px-4 py-16">
        <div
          className="relative w-full max-w-lg border px-8 py-16 text-center sm:px-12 sm:py-20"
          style={{
            background: "color-mix(in srgb, var(--hw-surface) 92%, transparent)",
            borderColor: "var(--hw-border)",
          }}
        >
          <p
            className="text-sm tracking-[0.2em]"
            style={{ color: "var(--hw-primary)" }}
          >
            {data.copy.subhead}
          </p>
          <h1
            className="mt-8 font-[family-name:var(--font-display)] text-5xl leading-tight sm:text-6xl"
            style={{ color: "var(--hw-secondary)" }}
          >
            {first}
            {second ? (
              <>
                <span
                  className="my-3 block text-xl tracking-[0.4em]"
                  style={{ color: "var(--hw-primary)" }}
                >
                  ❀
                </span>
                {second}
              </>
            ) : (
              namesLine(data.people)
            )}
          </h1>
          <p className="mt-8 text-base leading-8" style={{ color: "var(--hw-muted)" }}>
            {data.copy.message}
          </p>
          {data.event?.timeLabel ? (
            <p
              className="mt-10 font-[family-name:var(--font-display)] text-lg"
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
        </div>
      </section>

      {data.media.photos.length > 0 ? (
        <section className="relative mx-auto grid max-w-4xl gap-3 px-4 pb-8 sm:grid-cols-3">
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
        <section className="relative mx-auto max-w-md px-6 py-16">
          <FadeIn>
            <RsvpCard
              note={data.extras.rsvp.note}
              cta={data.copy.cta}
              storageKey={`hw-rsvp-${data.meta.slug}`}
            />
          </FadeIn>
        </section>
      ) : null}
    </main>
  );
}
