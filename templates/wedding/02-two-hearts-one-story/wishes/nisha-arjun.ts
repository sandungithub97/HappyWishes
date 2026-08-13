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
    slug: "two-hearts-one-story",
    wishId: "nisha-arjun",
    name: "Two Hearts, One Story",
    mood: "Romantic timeline, blush & rose",
    standout: "How we met → engagement → wedding, scroll-triggered chapters",
    buildPhase: 3,
  },
  people: [
    { name: "Nisha Fernando", role: "Bride" },
    { name: "Arjun Mehta", role: "Groom" },
  ],
  event: {
    date: "2027-02-14T17:30:00+05:30",
    timeLabel: "Sunday, 14 February 2027 · 5:30 PM",
    place: {
      name: "Galle Face Hotel",
      city: "Colombo",
      mapUrl: "https://maps.google.com/?q=Galle+Face+Hotel+Colombo",
    },
  },
  copy: {
    headline: "Two Hearts, One Story",
    subhead: "A love told in chapters",
    message:
      "Scroll through the moments that made them — a crowded bookstore, a rainy tuk-tuk, a ring hidden in a paperback.",
    cta: "Read our story",
  },
  palette: {
    background: "#FBF3F4",
    surface: "#FFF8F9",
    primary: "#B76E79",
    secondary: "#3D2C2E",
    accent: "#F0C9CE",
    text: "#3D2C2E",
    muted: "#8F6F74",
    border: "#E8D0D3",
  },
  fonts: {
    display: "Playfair Display",
    body: "Source Sans 3",
  },
  media: {
    photos: [
      {
        src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1200&q=80",
        alt: "Couple in a bookstore",
      },
      {
        src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1200&q=80",
        alt: "Engagement portrait",
      },
      {
        src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&q=80",
        alt: "Holding hands",
      },
    ],
  },
  extras: {
    scrollytelling: true,
    timeline: [
      {
        label: "2019",
        title: "How we met",
        body: "A dog-eared novel, one leftover chair, and a conversation that never really ended.",
        photo:
          "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1200&q=80",
      },
      {
        label: "2024",
        title: "The engagement",
        body: "He slipped the ring between pages 214 and 215. She cried before she finished the sentence.",
        photo:
          "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1200&q=80",
      },
      {
        label: "2027",
        title: "The wedding",
        body: "The next chapter begins by the sea, with everyone who shaped the plot.",
      },
    ],
  },
};

export default data;
