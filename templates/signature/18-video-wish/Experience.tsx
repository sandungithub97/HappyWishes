"use client";

import { PlaceSection } from "@/templates/_shared/components/VenueMap";
import { VideoWelcome } from "@/templates/_shared/components/VideoWelcome";
import { displayNames } from "@/templates/_shared/people";
import { themeStyle } from "@/templates/_shared/theme";
import type { TemplateData } from "@/templates/_shared/types";

export function Experience({ data }: { data: TemplateData }) {
  const from = displayNames(data.people)[0] ?? data.people[0]?.name ?? "";
  const video = data.media.video;

  return (
    <main
      className="relative flex min-h-svh flex-col items-center justify-center overflow-x-hidden bg-[var(--hw-bg)] px-6 py-16 font-[family-name:var(--font-body)] text-[var(--hw-text)]"
      style={themeStyle(data.palette)}
    >
      <p className="text-[11px] tracking-[0.32em] uppercase" style={{ color: "var(--hw-primary)" }}>
        {data.copy.subhead}
      </p>
      <h1
        className="mt-4 text-center font-[family-name:var(--font-display)] text-4xl italic sm:text-6xl"
        style={{ color: "var(--hw-secondary)" }}
      >
        {data.copy.headline}
      </h1>
      <p className="mt-3 text-sm tracking-[0.18em] uppercase" style={{ color: "var(--hw-muted)" }}>
        From {from}
      </p>

      {video ? (
        <div className="mt-10 w-full">
          <VideoWelcome src={video.src} poster={video.poster} label={data.copy.cta} />
        </div>
      ) : null}

      <p className="mt-10 max-w-md text-center text-base leading-8" style={{ color: "var(--hw-muted)" }}>
        {data.copy.message}
      </p>
      <PlaceSection place={data.event?.place} />
    </main>
  );
}
