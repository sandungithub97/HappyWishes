import Link from "next/link";
import type { Metadata } from "next";
import { OCCASION_LABELS, OCCASIONS } from "@/templates/_shared/types";
import { listByOccasion, templateCatalog } from "@/templates/_shared/catalog";
import { LIVE_TEMPLATE } from "@/templates/live";

export const metadata: Metadata = {
  title: "Template gallery",
  robots: { index: false, follow: false },
};

export default function GalleryPage() {
  const live = templateCatalog[LIVE_TEMPLATE - 1];

  return (
    <main className="min-h-screen bg-[#0c0c0f] text-[#f4f1ea]">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-24">
        <p className="text-[11px] font-medium tracking-[0.32em] uppercase text-[#a89870]">
          Template gallery · not the live page
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl">
          Pick one, then deploy it at /
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-[#b8b4c8]">
          Guests see whatever is set in{" "}
          <code className="text-[#e8c872]">templates/live.ts</code>
          {live ? (
            <>
              . Right now that is{" "}
              <Link
                href="/"
                className="underline decoration-[#e8c872]/40 underline-offset-4"
              >
                #{LIVE_TEMPLATE} {live.meta.occasion}/{live.meta.slug}
              </Link>
            </>
          ) : null}
          . Personalize it in that template&apos;s{" "}
          <code className="text-[#e8c872]">data.ts</code>.
        </p>

        <div className="mt-16 space-y-16">
          {OCCASIONS.map((occasion) => (
            <section key={occasion}>
              <h2 className="text-sm font-medium tracking-[0.22em] uppercase text-[#a89870]">
                {OCCASION_LABELS[occasion]}
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {listByOccasion(occasion).map((item) => {
                  const number =
                    templateCatalog.findIndex(
                      (entry) =>
                        entry.meta.occasion === item.meta.occasion &&
                        entry.meta.slug === item.meta.slug,
                    ) + 1;
                  const isLive =
                    live?.meta.occasion === item.meta.occasion &&
                    live?.meta.slug === item.meta.slug;

                  return (
                    <Link
                      key={item.meta.slug}
                      href={`/${item.meta.occasion}/${item.meta.slug}`}
                      className="group rounded-2xl border p-5 transition-transform duration-300 hover:-translate-y-0.5"
                      style={{
                        background: item.palette.surface,
                        borderColor: isLive
                          ? item.palette.primary
                          : item.palette.border,
                        color: item.palette.text,
                      }}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex gap-1.5">
                          {[
                            item.palette.primary,
                            item.palette.secondary,
                            item.palette.accent,
                          ].map((color) => (
                            <span
                              key={color}
                              className="h-2.5 w-2.5 rounded-full"
                              style={{ background: color }}
                            />
                          ))}
                        </div>
                        {isLive ? (
                          <span
                            className="text-[10px] tracking-[0.18em] uppercase"
                            style={{ color: item.palette.primary }}
                          >
                            Live at /
                          </span>
                        ) : null}
                      </div>
                      <h3
                        className="mt-4 text-xl font-semibold tracking-tight"
                        style={{ color: item.palette.secondary }}
                      >
                        {number}. {item.meta.name}
                      </h3>
                      <p
                        className="mt-2 text-sm leading-6"
                        style={{ color: item.palette.muted }}
                      >
                        {item.people.map((person) => person.name).join(" & ")}
                      </p>
                      <p
                        className="mt-3 text-sm leading-6"
                        style={{ color: item.palette.muted }}
                      >
                        {item.meta.mood}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
