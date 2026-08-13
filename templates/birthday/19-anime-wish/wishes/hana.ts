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
    slug: "anime-wish",
    wishId: "hana",
    name: "Anime Wish",
    mood: "Your Name dusk — indigo sky, comet light, soft city glow",
    standout: "Comet entrance, starfield, original silhouette scene, cinematic wish",
    buildPhase: 4,
  },
  people: [{ name: "Hana", role: "Birthday star" }],
  event: {
    date: "2026-09-18T19:00:00+05:30",
    timeLabel: "Friday, 18 September · 7:00 PM",
    place: {
      name: "Skyline Terrace",
      city: "Colombo",
      mapUrl: "https://maps.google.com/?q=Skyline+Terrace+Colombo",
    },
  },
  copy: {
    headline: "Under the same sky",
    subhead: "君の名は。Birthday",
    message:
      "Hana — if our paths cross only once a year, let this night be the comet. May every wish you whisper tonight find you again tomorrow. Happy birthday. The sky remembers your name.",
    cta: "I'll be there",
  },
  palette: {
    background: "#070B1A",
    surface: "#121833",
    primary: "#FF6B9D",
    secondary: "#F4C27A",
    accent: "#7EC8FF",
    text: "#F4F1FF",
    muted: "#9AA3C7",
    border: "#2A3358",
  },
  fonts: {
    display: "Dela Gothic One",
    body: "Noto Sans JP",
  },
  media: {
    photos: [
      {
        src: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1400&q=80",
        alt: "Milky Way night sky",
        caption: "Twilight",
      },
      {
        src: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=1400&q=80",
        alt: "Tokyo dusk city lights",
        caption: "City lights",
      },
      {
        src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80",
        alt: "Mountain under cloudy sky",
        caption: "Crossing",
      },
    ],
    music: {
      src: "background.mp3",
      title: "Night sky theme",
    },
  },
  extras: {
    backgroundMusic: true,
    milestoneAge: 18,
    rsvp: {
      enabled: true,
      note: "Meet under the comet — reply by 10 September.",
    },
  },
};

export default data;
