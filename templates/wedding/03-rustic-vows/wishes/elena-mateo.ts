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
    occasion: "wedding",
    slug: "rustic-vows",
    wishId: "elena-mateo",
    name: "Rustic Vows",
    mood: "Earthy, hand-drawn florals",
    standout: "Barn-door welcome, parchment texture, vines that grow on scroll",
    buildPhase: 4,
  },
  people: [
    { name: "Elena Cruz", role: "Bride" },
    { name: "Mateo Silva", role: "Groom" },
  ],
  event: {
    date: "2026-09-19T15:00:00+05:30",
    timeLabel: "Saturday, 19 September 2026 · 3:00 PM",
    place: {
      name: "Hilltop Garden Estate",
      city: "Kandy",
      mapUrl: "https://maps.google.com/?q=Hilltop+Garden+Estate+Kandy",
    },
  },
  copy: {
    headline: "Rustic Vows",
    subhead: "Barefoot, under the trees",
    message:
      "Come as you are. Dinner will be long, the lights will be warm, and the dancing will go later than anyone planned.",
    cta: "RSVP",
  },
  palette: {
    background: "#F3EDE3",
    surface: "#FAF6EF",
    primary: "#A65D3F",
    secondary: "#3E3228",
    accent: "#6B7F5A",
    text: "#3E3228",
    muted: "#7A6B5A",
    border: "#D9CBB6",
  },
  fonts: {
    display: "Libre Baskerville",
    body: "Nunito Sans",
  },
  media: {
    photos: [
      {
        src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80",
        alt: "Outdoor wedding tables",
      },
      {
        src: "https://images.unsplash.com/photo-1478146893571-ce65caea764c?w=1200&q=80",
        alt: "Garden ceremony",
      },
      {
        src: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?w=1200&q=80",
        alt: "Wildflower bouquet",
      },
    ],
  },
  extras: {
    rsvp: {
      enabled: true,
      note: "Kindly reply by 1 August 2026",
    },
  },
};

export default data;
