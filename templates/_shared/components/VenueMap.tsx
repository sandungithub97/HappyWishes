"use client";

import type { ReactNode } from "react";
import { mapsOpenUrl, placeLine } from "../place";
import type { EventPlace } from "../types";
import { FadeIn } from "./FadeIn";

type Props = {
  place?: EventPlace;
  className?: string;
  children?: ReactNode;
};

/** Place name that opens Google Maps on click. */
export function PlaceLink({ place, className, children }: Props) {
  if (!place?.name) return null;

  return (
    <a
      href={mapsOpenUrl(place)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children ?? placeLine(place)}
    </a>
  );
}

/** Clickable place block for pages that do not already show the location. */
export function PlaceSection({
  place,
  kicker = "Place",
}: {
  place?: EventPlace;
  kicker?: string;
}) {
  if (!place?.name) return null;

  return (
    <section className="relative mx-auto max-w-lg px-6 py-16 text-center">
      <FadeIn>
        {kicker ? (
          <p
            className="text-[11px] tracking-[0.3em] uppercase"
            style={{ color: "var(--hw-accent)" }}
          >
            {kicker}
          </p>
        ) : null}
        <PlaceLink
          place={place}
          className={`${kicker ? "mt-3" : ""} inline-block font-[family-name:var(--font-display)] text-2xl underline underline-offset-4`}
        />
      </FadeIn>
    </section>
  );
}
