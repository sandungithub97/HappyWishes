"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FadeIn } from "@/templates/_shared/components/FadeIn";
import { PlaceSection } from "@/templates/_shared/components/VenueMap";
import { namesLine } from "@/templates/_shared/people";
import { themeStyle } from "@/templates/_shared/theme";
import type { TemplateData } from "@/templates/_shared/types";

function since(date: string) {
  const start = new Date(date).getTime();
  const diff = Date.now() - start;
  if (!Number.isFinite(diff) || diff < 0) {
    return { years: 0, days: 0 };
  }
  const days = Math.floor(diff / 86_400_000);
  return { years: Math.floor(days / 365), days: days % 365 };
}

export function Experience({ data }: { data: TemplateData }) {
  const [elapsed, setElapsed] = useState<{ years: number; days: number } | null>(
    null,
  );
  const chapters = data.extras.timeline ?? [];

  useEffect(() => {
    if (!data.event?.date) return;
    const tick = () => setElapsed(since(data.event!.date!));
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, [data.event]);

  return (
    <main
      className="relative min-h-svh overflow-x-hidden bg-[var(--hw-bg)] font-[family-name:var(--font-body)] text-[var(--hw-text)]"
      style={themeStyle(data.palette)}
    >
      <section className="flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center">
        <p className="text-[11px] tracking-[0.32em] uppercase" style={{ color: "var(--hw-primary)" }}>
          {data.copy.subhead}
        </p>
        <h1
          className="mt-4 font-[family-name:var(--font-display)] text-5xl sm:text-7xl"
          style={{ color: "var(--hw-secondary)" }}
        >
          {data.copy.headline}
        </h1>
        <p className="mt-3 text-sm tracking-[0.18em] uppercase" style={{ color: "var(--hw-muted)" }}>
          {namesLine(data.people)}
        </p>
        {elapsed ? (
          <div className="mt-10 flex gap-8">
            <div>
              <p className="font-[family-name:var(--font-display)] text-5xl" style={{ color: "var(--hw-primary)" }}>
                {elapsed.years}
              </p>
              <p className="text-[10px] tracking-[0.22em] uppercase" style={{ color: "var(--hw-muted)" }}>
                Years
              </p>
            </div>
            <div>
              <p className="font-[family-name:var(--font-display)] text-5xl" style={{ color: "var(--hw-primary)" }}>
                {elapsed.days}
              </p>
              <p className="text-[10px] tracking-[0.22em] uppercase" style={{ color: "var(--hw-muted)" }}>
                Days more
              </p>
            </div>
          </div>
        ) : null}
        <a href="#years" className="mt-10 text-[11px] tracking-[0.28em] uppercase" style={{ color: "var(--hw-primary)" }}>
          {data.copy.cta}
        </a>
      </section>

      <section id="years" className="mx-auto max-w-3xl px-6 pb-24">
        <p className="mb-16 max-w-lg text-lg leading-8" style={{ color: "var(--hw-muted)" }}>
          {data.copy.message}
        </p>
        <div className="space-y-20">
          {chapters.map((chapter, index) => {
            const photo = chapter.photo ?? data.media.photos[index]?.src;
            return (
              <FadeIn key={`${chapter.label}-${chapter.title}`}>
                <article className="grid items-center gap-8 sm:grid-cols-[140px_1fr]">
                  <p
                    className="font-[family-name:var(--font-display)] text-4xl"
                    style={{ color: "var(--hw-primary)" }}
                  >
                    {chapter.label}
                  </p>
                  <div>
                    {photo ? (
                      <div className="relative mb-5 aspect-[16/10] overflow-hidden">
                        <Image
                          src={photo}
                          alt={chapter.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 560px"
                          className="object-cover"
                        />
                      </div>
                    ) : null}
                    <h2
                      className="font-[family-name:var(--font-display)] text-3xl"
                      style={{ color: "var(--hw-secondary)" }}
                    >
                      {chapter.title}
                    </h2>
                    <p className="mt-2 text-base leading-7" style={{ color: "var(--hw-muted)" }}>
                      {chapter.body}
                    </p>
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </section>
      <PlaceSection place={data.event?.place} />
    </main>
  );
}
