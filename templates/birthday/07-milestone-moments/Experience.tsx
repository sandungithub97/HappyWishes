"use client";

import Image from "next/image";
import { FadeIn } from "@/templates/_shared/components/FadeIn";
import { PlaceLink } from "@/templates/_shared/components/VenueMap";
import { displayNames } from "@/templates/_shared/people";
import { themeStyle } from "@/templates/_shared/theme";
import type { TemplateData } from "@/templates/_shared/types";

export function Experience({ data }: { data: TemplateData }) {
  const name = displayNames(data.people)[0] ?? "";
  const age = data.extras.milestoneAge;
  const memories = data.extras.memoryGrid ?? [];

  return (
    <main
      className="relative min-h-svh overflow-x-hidden bg-[var(--hw-bg)] font-[family-name:var(--font-body)] text-[var(--hw-text)]"
      style={themeStyle(data.palette)}
    >
      <section className="relative flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center">
        <p
          className="text-[11px] font-medium tracking-[0.36em] uppercase"
          style={{ color: "var(--hw-accent)" }}
        >
          {data.copy.subhead}
        </p>
        {age ? (
          <h1
            className="mt-4 font-[family-name:var(--font-display)] text-[9rem] leading-none sm:text-[14rem]"
            style={{ color: "var(--hw-primary)" }}
          >
            {age}
          </h1>
        ) : (
          <h1
            className="mt-4 font-[family-name:var(--font-display)] text-7xl"
            style={{ color: "var(--hw-primary)" }}
          >
            {data.copy.headline}
          </h1>
        )}
        <p
          className="mt-2 font-[family-name:var(--font-display)] text-4xl tracking-[0.2em] sm:text-5xl"
          style={{ color: "var(--hw-secondary)" }}
        >
          {name}
        </p>
        <p className="mt-8 max-w-md text-base leading-7" style={{ color: "var(--hw-muted)" }}>
          {data.copy.message}
        </p>
        <a
          href="#years"
          className="mt-10 text-[11px] tracking-[0.28em] uppercase"
          style={{ color: "var(--hw-primary)" }}
        >
          {data.copy.cta}
        </a>
      </section>

      <section id="years" className="mx-auto max-w-5xl px-6 pb-24">
        <div className="grid gap-6 sm:grid-cols-3">
          {memories.map((memory, index) => (
            <FadeIn key={memory.year} delay={index * 0.08}>
              <article>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={memory.photo}
                    alt={memory.caption}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <p
                  className="mt-4 font-[family-name:var(--font-display)] text-4xl tracking-wide"
                  style={{ color: "var(--hw-primary)" }}
                >
                  {memory.year}
                </p>
                <p className="mt-1 text-sm" style={{ color: "var(--hw-muted)" }}>
                  {memory.caption}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>

        {data.event ? (
          <FadeIn className="mt-20 text-center">
            <p className="text-[11px] tracking-[0.3em] uppercase" style={{ color: "var(--hw-accent)" }}>
              Tonight
            </p>
            <p className="mt-3 text-lg" style={{ color: "var(--hw-secondary)" }}>
              {data.event.timeLabel}
            </p>
            {data.event.place ? (
              <p className="mt-1 text-sm" style={{ color: "var(--hw-muted)" }}>
                <PlaceLink place={data.event.place} className="underline underline-offset-4" />
              </p>
            ) : null}
          </FadeIn>
        ) : null}
      </section>
    </main>
  );
}
