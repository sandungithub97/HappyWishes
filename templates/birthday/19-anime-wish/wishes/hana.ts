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
    standout: "Cinematic gate, parallax sky, triptych gallery, comet scroll trail",
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
    headline: "Her story continues tonight",
    subhead: "アニメの世界へ",
    message:
      "Hana — the sky splits open like an opening theme. A comet for courage, a cat spirit for luck, and a whole cast cheering your name. Level up another year. Happy birthday, main character.",
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
    heroImage: {
      src: design("anime.png"),
      alt: "Hana with her spirit cat",
    },
    photos: [
      {
        src: design("anime.png"),
        alt: "Main character portrait",
        caption: "Episode 18 — Hana",
      },
      {
        src: design("anime1.png"),
        alt: "Spirit guardian",
        caption: "Spirit realm",
      },
      {
        src: design("anime2.png"),
        alt: "Celebration mode",
        caption: "After-party arc",
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
    timeline: [
      {
        label: "Act I",
        title: "Twilight gate",
        body: "The comet crosses. You step into her movie world.",
      },
      {
        label: "Act II",
        title: "Character scroll",
        body: "Three frames — main cast, spirit guide, celebration mode.",
      },
      {
        label: "Act III",
        title: "Birthday scene",
        body: "Rooftop party under the same sky as the opening credits.",
      },
    ],
    rsvp: {
      enabled: true,
      note: "Enter the world — reply by 10 September.",
    },
  },
};

export default data;
