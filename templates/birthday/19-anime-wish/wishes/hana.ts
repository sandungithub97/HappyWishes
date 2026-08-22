/**
 * PERSONALIZE THIS FILE ONLY.
 *
 * Design-level art: public/media/birthday/19-anime-wish/images/
 * Wish-level art:   public/media/birthday/19-anime-wish/wishes/{wishId}/images/
 *
 * meta.wishId must match this filename (without .ts).
 * URL: /{occasion}/{slug}/{wishId}
 */
import type { TemplateData } from "@/templates/_shared/types";

const design = (file: string) =>
  `/media/birthday/19-anime-wish/images/${file}`;

const data: TemplateData = {
  meta: {
    occasion: "birthday",
    slug: "anime-wish",
    wishId: "hana",
    name: "Anime Wish",
    mood: "Anime movie night — comet twilight, soft bloom, cinematic scroll",
    standout: "Cinematic gate, hero portrait, three-panel scene view, comet scroll",
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
    headline: "Happy 18th Birthday!",
    subhead: "An anime movie night just for you",
    message:
      "Hana, you are the main character tonight. The sky opens wide, the comet crosses, and everyone who loves you is here to cheer you on. May this year bring brave adventures, warm friendships, and moments worth framing. Happy birthday!",
    cta: "Count me in",
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
    body: "Nunito",
  },
  media: {
    heroImage: {
      src: design("anime.png"),
      alt: "Hana with her spirit cat",
    },
    photos: [
      {
        src: design("anime1.png"),
        alt: "Spirit guardian",
        caption: "Guardian",
      },
      {
        src: design("anime2.png"),
        alt: "Celebration mode",
        caption: "Party arc",
      },
      {
        src: "anime-spirit-fox.png",
        alt: "Spirit companion",
        caption: "Sidekick",
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
      note: "Please reply by 10 September.",
    },
  },
};

export default data;
