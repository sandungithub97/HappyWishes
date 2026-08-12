/**
 * PERSONALIZE THIS FILE ONLY.
 * Names, dates, copy, photos, colors, and music all live here.
 *
 * Photos / music / video — use either:
 *   src: "https://..."        any image or file URL
 *   src: "hero.jpg"           public/media/.../images/hero.jpg
 *   src: "background.mp3"     public/media/.../music/background.mp3
 *   src: "wish.mp4"           public/media/.../video/wish.mp4
 */
import type { TemplateData } from "@/templates/_shared/types";
import { bindMedia } from "@/templates/_shared/media";

const data: TemplateData = {
  meta: {
    occasion: "birthday",
    slug: "anime-wish",
    name: "Anime Wish",
    mood: "Night-sky indigo, magenta sparkles, manga panels",
    standout: "Sparkle burst, speech-bubble wish, manga photo frames",
    buildPhase: 4,
  },
  people: [{ name: "Hana", role: "Birthday star" }],
  event: {
    date: "2026-09-18T19:00:00+05:30",
    timeLabel: "Friday, 18 September · 7:00 PM",
    place: {
      name: "Studio Sky",
      city: "Colombo",
      mapUrl: "https://maps.google.com/?q=Studio+Sky+Colombo",
    },
  },
  copy: {
    headline: "Hana, level up",
    subhead: "誕生日おめでとう",
    message:
      "New episode unlocked. Same main character, brighter opening theme. Come celebrate the season premiere.",
    cta: "Join the party",
  },
  palette: {
    background: "#0B1026",
    surface: "#161B3A",
    primary: "#FF4FA3",
    secondary: "#FFE566",
    accent: "#7AE7FF",
    text: "#F7F4FF",
    muted: "#A8B0D8",
    border: "#2A3160",
  },
  fonts: {
    display: "M PLUS Rounded 1c",
    body: "Zen Maru Gothic",
  },
  media: {
    photos: [
      {
        src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=80",
        alt: "Neon night lights",
        caption: "Opening credits",
      },
      {
        src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80",
        alt: "Celebration lights",
        caption: "Episode highlight",
      },
      {
        src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1200&q=80",
        alt: "Portrait",
        caption: "Main character",
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
    stickers: ["★", "✧", "♥", "✦", "♪", "☆"],
    rsvp: {
      enabled: true,
      note: "Bring your best outfit. Extra lives optional.",
    },
  },
};

export default bindMedia(data, "19-anime-wish");
