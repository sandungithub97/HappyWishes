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
    occasion: "birthday",
    slug: "surprise-reveal",
    wishId: "priya",
    name: "Surprise Reveal",
    mood: "Locked midnight, then a burst of colour",
    standout: "Gift-box unwrap reveal, spotlight hero, celebration sparkle",
    buildPhase: 4,
  },
  people: [{ name: "Priya", role: "Birthday star" }],
  event: {
    date: "2026-08-30T20:00:00+05:30",
    timeLabel: "Tonight · 8:00 PM",
    place: {
      name: "Don't tell Priya",
      city: "Colombo",
      mapUrl: "https://maps.google.com/?q=Colombo",
    },
  },
  copy: {
    headline: "Priya, you're 21",
    subhead: "The secret is out",
    message:
      "Everyone you love is already in the next room. This page was the last quiet moment — now tap, and come find us.",
    cta: "Tap to reveal",
  },
  palette: {
    background: "#0B1020",
    surface: "#151B32",
    primary: "#F5D76E",
    secondary: "#FF6B9D",
    accent: "#F5D76E",
    text: "#F4F1EA",
    muted: "#9AA3C2",
    border: "#2A3358",
  },
  fonts: {
    display: "Playfair Display",
    body: "Outfit",
  },
  media: {
    photos: [
      {
        src: "https://images.unsplash.com/photo-1519671482532-2cf9b5c0d0c0?w=1200&q=80",
        alt: "Blurred party lights before reveal",
      },
      {
        src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80",
        alt: "Celebration",
      },
      {
        src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=80",
        alt: "Balloons",
      },
    ],
  },
  extras: {
    milestoneAge: 21,
    reveal: {
      lockedLabel: "A little something for you",
      unlockedHeadline: "SURPRISE, PRIYA",
    },
  },
};

export default data;
