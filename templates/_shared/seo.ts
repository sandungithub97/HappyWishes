import type { Metadata } from "next";
import { displayNames } from "./people";
import { getSiteUrl } from "./site";
import type { TemplateData } from "./types";

export function namesLineFull(data: TemplateData) {
  return data.people.map((person) => person.name).join(" & ");
}

export function templateMetadata(
  data: TemplateData,
  path: string,
): Metadata {
  const names = namesLineFull(data);
  const title = `${data.meta.name} · ${names}`;
  const description = data.copy.message;
  const url = `${getSiteUrl()}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: "Happy Wishes",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function firstNamesLine(data: TemplateData) {
  return displayNames(data.people).join(" & ");
}
