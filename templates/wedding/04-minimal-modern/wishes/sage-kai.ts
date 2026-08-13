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
    slug: "minimal-modern",
    wishId: "sage-kai",
    name: "Minimal & Modern",
    mood: "Black, white, one accent",
    standout: "Editorial wipe entrance, scroll-linked type, cursor glow, QR",
    buildPhase: 4,
  },
  people: [
    { name: "Sage", role: "Partner" },
    { name: "Kai", role: "Partner" },
  ],
  event: {
    date: "2026-11-07T18:00:00+05:30",
    timeLabel: "07.11.26 · 18:00",
    place: {
      name: "The Warehouse",
      city: "Colombo 03",
      mapUrl: "https://maps.google.com/?q=The+Warehouse+Colombo+03",
    },
  },
  copy: {
    headline: "Sage & Kai",
    subhead: "07.11.26",
    message: "A small gathering. A long dinner. One photograph that matters.",
    cta: "Details",
  },
  palette: {
    background: "#FAFAFA",
    surface: "#FFFFFF",
    primary: "#2563EB",
    secondary: "#111111",
    accent: "#2563EB",
    text: "#111111",
    muted: "#6B6B6B",
    border: "#E5E5E5",
  },
  fonts: {
    display: "Oswald",
    body: "Inter",
  },
  media: {
    photos: [
      {
        src: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=1600&q=80",
        alt: "Black and white couple portrait",
      },
    ],
  },
  extras: {
    qrFriendly: true,
  },
};

export default data;
