"use client";

import Image from "next/image";
import { FadeIn } from "@/templates/_shared/components/FadeIn";
import { PlaceLink } from "@/templates/_shared/components/VenueMap";
import { displayNames } from "@/templates/_shared/people";
import { themeStyle } from "@/templates/_shared/theme";
import type { TemplateData } from "@/templates/_shared/types";

export function Experience({ data }: { data: TemplateData }) {
  const [first, second] = displayNames(data.people);
  const chapters = data.extras.timeline ?? [];

  return (
    <main
      className="relative min-h-svh overflow-x-hidden bg-[var(--hw-bg)] font-[family-name:var(--font-body)] text-[var(--hw-text)]"
      style={themeStyle(data.palette)}
    >
      <section className="relative flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center">
        <p
          className="text-[11px] tracking-[0.36em] uppercase"
          style={{ color: "var(--hw-primary)" }}
        >
          {data.copy.subhead}
        </p>
        <h1
          className="mt-6 font-[family-name:var(--font-display)] text-5xl leading-[1.1] sm:text-7xl"
          style={{ color: "var(--hw-secondary)" }}
        >
          {first}
          {second ? (
            <>
              <span className="block text-2xl italic sm:text-3xl" style={{ color: "var(--hw-primary)" }}>
                and
              </span>
              {second}
            </>
          ) : null}
        </h1>
        <p className="mt-8 max-w-md text-base leading-7" style={{ color: "var(--hw-muted)" }}>
          {data.copy.message}
        </p>
        <a
          href="#story"
          className="mt-10 text-[11px] tracking-[0.28em] uppercase"
          style={{ color: "var(--hw-primary)" }}
        >
          {data.copy.cta}
        </a>
      </section>

      <section id="story" className="relative mx-auto max-w-3xl px-6 pb-24">
        <div
          className="absolute top-0 bottom-0 left-[1.65rem] w-px sm:left-1/2"
          style={{ background: "var(--hw-border)" }}
        />
        <div className="space-y-20 sm:space-y-28">
          {chapters.map((chapter, index) => {
            const photo = chapter.photo ?? data.media.photos[index]?.src;
            const flip = index % 2 === 1;

            return (
              <FadeIn key={`${chapter.label}-${chapter.title}`}>
                <article className="relative grid gap-6 sm:grid-cols-2 sm:items-center sm:gap-12">
                  <div
                    className={`relative z-10 ${flip ? "sm:order-2" : ""}`}
                  >
                    <p
                      className="font-[family-name:var(--font-display)] text-sm tracking-[0.28em]"
                      style={{ color: "var(--hw-primary)" }}
                    >
                      {chapter.label}
                    </p>
                    <h2
                      className="mt-2 font-[family-name:var(--font-display)] text-3xl italic sm:text-4xl"
                      style={{ color: "var(--hw-secondary)" }}
                    >
                      {chapter.title}
                    </h2>
                    <p className="mt-4 text-base leading-7" style={{ color: "var(--hw-muted)" }}>
                      {chapter.body}
                    </p>
                  </div>
                  {photo ? (
                    <div className={`relative aspect-[4/5] overflow-hidden sm:aspect-[5/6] ${flip ? "sm:order-1" : ""}`}>
                      <Image
                        src={photo}
                        alt={chapter.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 40vw"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div
                      className={`flex aspect-[4/5] items-center justify-center border ${flip ? "sm:order-1" : ""}`}
                      style={{ borderColor: "var(--hw-border)", background: "var(--hw-surface)" }}
                    >
                      <p
                        className="font-[family-name:var(--font-display)] text-5xl italic"
                        style={{ color: "var(--hw-primary)" }}
                      >
                        {chapter.label}
                      </p>
                    </div>
                  )}
                </article>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {data.event ? (
        <footer className="px-6 pb-24 text-center">
          <FadeIn>
            <p className="text-[11px] tracking-[0.3em] uppercase" style={{ color: "var(--hw-primary)" }}>
              The next chapter
            </p>
            <p
              className="mt-4 font-[family-name:var(--font-display)] text-2xl"
              style={{ color: "var(--hw-secondary)" }}
            >
              {data.event.timeLabel}
            </p>
            {data.event.place ? (
              <p className="mt-2 text-sm" style={{ color: "var(--hw-muted)" }}>
                <PlaceLink place={data.event.place} className="underline underline-offset-4" />
              </p>
            ) : null}
          </FadeIn>
        </footer>
      ) : null}
    </main>
  );
}
