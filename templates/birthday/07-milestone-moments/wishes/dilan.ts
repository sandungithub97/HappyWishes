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
    slug: "milestone-moments",
    wishId: "dilan",
    name: "Milestone Moments",
    mood: "Big-number hero, champagne navy",
    standout: "Odometer age roll, parallax memory chapters, decade rail",
    buildPhase: 4,
  },
  people: [{ name: "Dilan Jayasuriya", role: "Birthday star" }],
  event: {
    date: "2026-10-03T19:30:00+05:30",
    timeLabel: "Saturday, 3 October · 7:30 PM",
    place: {
      name: "The Dutch Hospital",
      city: "Colombo",
      mapUrl: "https://maps.google.com/?q=Dutch+Hospital+Colombo",
    },
  },
  copy: {
    headline: "30",
    subhead: "Dilan · a decade in pictures",
    message:
      "Not a midlife anything — a highlight reel. Thirty years of friends, firsts, and the face he still makes in every photo.",
    cta: "See the years",
  },
  palette: {
    background: "#0F1C3F",
    surface: "#17305A",
    primary: "#E8C872",
    secondary: "#F7F3EA",
    accent: "#7EB6FF",
    text: "#F7F3EA",
    muted: "#B7C4DE",
    border: "#2A4570",
  },
  fonts: {
    display: "Bebas Neue",
    body: "Manrope",
  },
  media: {
    photos: [
      {
        src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
        alt: "Portrait in twenties",
      },
      {
        src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80",
        alt: "Friends at dinner",
      },
      {
        src: "https://images.unsplash.com/photo-1519671482532-2cf9b5c0d0c0?w=800&q=80",
        alt: "Travel memory",
      },
    ],
  },
  extras: {
    milestoneAge: 30,
    memoryGrid: [
      {
        year: "1996",
        caption: "Chapter one",
        photo:
          "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80",
      },
      {
        year: "2014",
        caption: "The university years",
        photo:
          "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800&q=80",
      },
      {
        year: "2026",
        caption: "Thirty, finally",
        photo:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
      },
    ],
  },
};

export default data;
