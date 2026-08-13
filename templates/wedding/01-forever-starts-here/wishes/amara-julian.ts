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
    slug: "forever-starts-here",
    wishId: "amara-julian",
    name: "Forever Starts Here",
    mood: "Elegant ivory & gold",
    standout: "Soft fade-in photo carousel, countdown, background music",
    buildPhase: 2,
  },
  people: [
    { name: "Amara Perera", role: "Bride" },
    { name: "Julian Hale", role: "Groom" },
  ],
  event: {
    date: "2026-12-12T16:00:00+05:30",
    timeLabel: "Saturday, 12 December 2026 · 4:00 PM",
    place: {
      name: "The Grand Palms",
      city: "Colombo",
      mapUrl: "https://maps.google.com/?q=The+Grand+Palms+Colombo",
    },
  },
  copy: {
    headline: "Forever Starts Here",
    subhead: "Together with their families, they invite you to witness their vows",
    message:
      "After years of quiet glances and loud laughter, Amara and Julian begin the rest of their story — under gold light, among the people they love.",
    cta: "Save the date",
  },
  palette: {
    background: "#FBF7F0",
    surface: "#FFFDF8",
    primary: "#C4A35A",
    secondary: "#2C2416",
    accent: "#E8D5A3",
    text: "#2C2416",
    muted: "#8A7A62",
    border: "#E6D9C2",
  },
  fonts: {
    display: "Cormorant Garamond",
    body: "Outfit",
  },
  media: {
    photos: [
      {
        src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80",
        alt: "Couple walking at golden hour",
        caption: "The walk into forever",
      },
      {
        src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=1200&q=80",
        alt: "Wedding florals",
      },
      {
        src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200&q=80",
        alt: "Rings on linen",
      },
    ],
    music: {
      src: "background.mp3",
      title: "A Thousand Years (instrumental)",
    },
  },
  extras: {
    countdown: true,
    photoCarousel: true,
    backgroundMusic: true,
  },
};

export default data;
