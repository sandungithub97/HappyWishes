"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { PlaceLink } from "@/templates/_shared/components/VenueMap";
import { displayNames } from "@/templates/_shared/people";
import { themeStyle } from "@/templates/_shared/theme";
import type { TemplateData } from "@/templates/_shared/types";

export function Experience({ data }: { data: TemplateData }) {
  const [pageUrl, setPageUrl] = useState("");
  const hero = data.media.photos[0];

  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  const qrSrc = pageUrl
    ? `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(pageUrl)}&margin=8`
    : null;

  return (
    <main
      className="min-h-svh bg-[var(--hw-bg)] font-[family-name:var(--font-body)] text-[var(--hw-text)]"
      style={themeStyle(data.palette)}
    >
      <div className="mx-auto grid min-h-svh max-w-6xl lg:grid-cols-2">
        <section className="flex flex-col justify-between px-6 py-10 sm:px-12 sm:py-14">
          <p
            className="text-[11px] font-medium tracking-[0.4em] uppercase"
            style={{ color: "var(--hw-primary)" }}
          >
            {data.copy.subhead}
          </p>
          <div>
            <h1
              className="font-[family-name:var(--font-display)] text-6xl leading-[0.9] tracking-tight uppercase sm:text-8xl"
              style={{ color: "var(--hw-secondary)" }}
            >
              {displayNames(data.people).map((name) => (
                <span key={name} className="block">
                  {name}
                </span>
              ))}
            </h1>
            <p className="mt-8 max-w-sm text-base leading-7" style={{ color: "var(--hw-muted)" }}>
              {data.copy.message}
            </p>
          </div>
          <div className="mt-12 flex items-end justify-between gap-6">
            <div>
              {data.event?.place ? (
                <PlaceLink place={data.event.place}>
                  <p className="text-[11px] tracking-[0.28em] uppercase underline underline-offset-4" style={{ color: "var(--hw-muted)" }}>
                    {data.event.place.name}
                  </p>
                  {data.event.place.city ? (
                    <p className="mt-1 text-sm" style={{ color: "var(--hw-secondary)" }}>
                      {data.event.place.city}
                    </p>
                  ) : null}
                </PlaceLink>
              ) : null}
            </div>
            {data.extras.qrFriendly && qrSrc ? (
              <div className="text-right">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={qrSrc} alt="QR code for this invite" width={88} height={88} className="ml-auto" />
                <p className="mt-2 text-[9px] tracking-[0.2em] uppercase" style={{ color: "var(--hw-muted)" }}>
                  Scan
                </p>
              </div>
            ) : null}
          </div>
        </section>
        {hero ? (
          <section className="relative min-h-[50vh] lg:min-h-svh">
            <Image
              src={hero.src}
              alt={hero.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover grayscale"
            />
            <div
              className="absolute inset-y-0 left-0 w-1"
              style={{ background: "var(--hw-primary)" }}
            />
          </section>
        ) : null}
      </div>
    </main>
  );
}
