/**
 * PERSONALIZE THIS FILE ONLY.
 * Names, dates, copy, photos, colors, and music all live here.
 *
 * Photos / music / video — use either:
 *   src: "https://..."        any image or file URL
 *   src: "hero.jpg"           public/media/.../wishes/{wishId}/images/hero.jpg
 *   src: "background.mp3"     public/media/.../wishes/{wishId}/music/background.mp3
 *   src: "wish.mp4"           public/media/.../wishes/{wishId}/video/wish.mp4
 *
 * meta.wishId must match this filename (without .ts).
 * URL: /{occasion}/{slug}/{wishId}
 */
import type { TemplateData } from "@/templates/_shared/types";

const data: TemplateData = {
  meta: {
    occasion: "anniversary",
    slug: "years-of-us",
    wishId: "ravi-anjali",
    name: "Years of Us",
    mood: "Warm copper timeline",
    standout: "Year-by-year highlight photos",
    buildPhase: 4,
  },
  people: [
    { name: "Ravi", role: "Partner" },
    { name: "Anjali", role: "Partner" },
  ],
  event: {
    date: "2014-04-20T00:00:00+05:30",
    timeLabel: "12 years married",
  },
  copy: {
    headline: "Years of Us",
    subhead: "Twelve circles around the sun",
    message:
      "One photo for every year — not because the years were perfect, but because they were ours.",
    cta: "Walk the years",
  },
  palette: {
    background: "#FFF9F2",
    surface: "#FFF3E6",
    primary: "#C4784A",
    secondary: "#2B1810",
    accent: "#E8B892",
    text: "#2B1810",
    muted: "#8A5E45",
    border: "#E6CDB8",
  },
  fonts: {
    display: "Fraunces",
    body: "Figtree",
  },
  media: {
    photos: [
      {
        src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=80",
        alt: "Year one",
      },
      {
        src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80",
        alt: "Mid years",
      },
      {
        src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
        alt: "This year",
      },
    ],
  },
  extras: {
    countdown: true,
    timeline: [
      {
        label: "2014",
        title: "The wedding",
        body: "Jasmine in her hair. His hands wouldn't stay still.",
      },
      {
        label: "2018",
        title: "The house",
        body: "Too small, too loud, exactly right.",
      },
      {
        label: "2026",
        title: "Still choosing this",
        body: "Twelve years in, the easy days and the hard ones both count.",
      },
    ],
  },
};

export default data;
