/**
 * PERSONALIZE THIS FILE ONLY.
 * Names, dates, copy, photos, colors, and music all live here.
 *
 * Character art lives in:
 *   public/media/birthday/19-anime-wish/wishes/{wishId}/images/
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
    mood: "Anime movie world — comet sky, cartoon heroes, soft bloom light",
    standout: "Illustrated anime characters, sky world, sparkle FX, cinematic entrance",
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
    headline: "Welcome to her movie night",
    subhead: "アニメの世界へ",
    message:
      "Hana — tonight the sky opens like an opening theme. A comet for courage, a spirit for luck, and a whole anime world cheering your name. Level up another year. Happy birthday, main character.",
    cta: "Join her episode",
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
        src: "anime-world-sky.png",
        alt: "Anime dusk sky world",
        caption: "World map",
      },
      {
        src: "anime-hero-girl.png",
        alt: "Anime birthday heroine",
        caption: "Heroine",
      },
      {
        src: "anime-spirit-fox.png",
        alt: "Cute spirit companion",
        caption: "Spirit friend",
      },
    ],
    music: {
      src: "background.mp3",
      title: "Opening theme",
    },
  },
  extras: {
    backgroundMusic: true,
    milestoneAge: 18,
    rsvp: {
      enabled: true,
      note: "Enter the world — reply by 10 September.",
    },
  },
};

export default data;
