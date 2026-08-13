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
    occasion: "signature",
    slug: "memory-lane",
    wishId: "perera-family",
    name: "Memory Lane",
    mood: "Film stills, rust & slate — reskins to any occasion",
    standout: "Scrollytelling: scroll down = journey through time",
    buildPhase: 4,
  },
  people: [{ name: "The Perera Family", role: "Family" }],
  copy: {
    headline: "Memory Lane",
    subhead: "Keep scrolling. The years will meet you.",
    message:
      "A single page that walks a life — or a love, or a friendship — one scene at a time. Change the photos, keep the motion.",
    cta: "Begin the walk",
  },
  palette: {
    background: "#EDE6D9",
    surface: "#F7F1E6",
    primary: "#B85C38",
    secondary: "#3D4A5C",
    accent: "#C4A574",
    text: "#2C2A26",
    muted: "#6F675C",
    border: "#D4CBBA",
  },
  fonts: {
    display: "Instrument Serif",
    body: "Instrument Sans",
  },
  media: {
    photos: [
      {
        src: "https://images.unsplash.com/photo-1447069389542-3c1b35fc5a6c?w=1200&q=80",
        alt: "Old photographs",
      },
      {
        src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=80",
        alt: "Family on a road",
      },
      {
        src: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=1200&q=80",
        alt: "Picnic memory",
      },
    ],
  },
  extras: {
    scrollytelling: true,
    timeline: [
      {
        label: "Then",
        title: "The first house",
        body: "Too many people, not enough chairs, endless tea.",
      },
      {
        label: "After",
        title: "The years in between",
        body: "Birthdays stacked like photographs in a drawer.",
      },
      {
        label: "Now",
        title: "Still walking",
        body: "The lane is longer. The light is the same.",
      },
    ],
  },
};

export default data;
