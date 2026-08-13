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
    slug: "still-us",
    wishId: "hannah-theo",
    name: "Still Us",
    mood: "Then vs now, soft pink",
    standout: "Split-screen photo comparison and love-letter scroll",
    buildPhase: 4,
  },
  people: [
    { name: "Hannah", role: "Partner" },
    { name: "Theo", role: "Partner" },
  ],
  event: {
    date: "2018-06-02T00:00:00+05:30",
    timeLabel: "Eight years · 2 June",
  },
  copy: {
    headline: "Still Us",
    subhead: "Then. Now. Always.",
    message:
      "The hair changed. The city changed. The way you look at each other did not.",
    cta: "See then & now",
  },
  palette: {
    background: "#FFF8F6",
    surface: "#FFEDEF",
    primary: "#C97B84",
    secondary: "#4A2C32",
    accent: "#F8D7DA",
    text: "#4A2C32",
    muted: "#9A6E75",
    border: "#E8C9CD",
  },
  fonts: {
    display: "Great Vibes",
    body: "Libre Franklin",
  },
  media: {
    photos: [
      {
        src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1200&q=80",
        alt: "Then",
      },
      {
        src: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=1200&q=80",
        alt: "Now",
      },
    ],
  },
  extras: {
    thenNow: {
      then: {
        src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1200&q=80",
        alt: "Hannah and Theo, 2018",
        caption: "2018",
      },
      now: {
        src: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=1200&q=80",
        alt: "Hannah and Theo, 2026",
        caption: "2026",
      },
    },
  },
};

export default data;
