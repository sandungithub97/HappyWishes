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
    occasion: "wedding",
    slug: "sakura-vows",
    name: "Sakura Vows",
    mood: "Ivory, blush, ink — falling cherry blossoms",
    standout: "Japanese invitation card with continuous sakura fall",
    buildPhase: 4,
  },
  people: [
    { name: "Shehani Perera", role: "Bride" },
    { name: "Lasith Gamage", role: "Groom" },
  ],
  event: {
    date: "2027-03-28T15:00:00+09:00",
    timeLabel: "Sunday, 28 March 2027 · 3:00 PM",
    place: {
      name: "The Lanka Club",
      city: "Colombo",
      mapUrl: "https://maps.google.com/?q=The+Lanka+Club+Tokyo",
    },
  },
  copy: {
    headline: "Shehani & Lasith",
    subhead: "Under the falling blossoms",
    message:
      "Two families become one. Please join us for tea, vows, and a long spring evening.",
    cta: "RSVP",
  },
  palette: {
    background: "#FBF6F2",
    surface: "#FFF9F7",
    primary: "#D4849A",
    secondary: "#2B2422",
    accent: "#E8C9A8",
    text: "#2B2422",
    muted: "#8A736C",
    border: "#E6D2CC",
  },
  fonts: {
    display: "Shippori Mincho",
    body: "Noto Sans JP",
  },
  media: {
    photos: [
      {
        src: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=1200&q=80",
        alt: "Cherry blossoms",
      },
      {
        src: "https://www.studio-palette.com/wp/wp-content/uploads/2025/02/bda2ad129b1a349ae616747248aebf46-1.jpeg",
        alt: "Japanese Theme",
      },
      {
        src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=1200&q=80",
        alt: "Wedding portrait",
      },
    ],
  },
  extras: {
    rsvp: {
      enabled: true,
      note: "Kindly reply by 1 February 2027",
    },
  },
};

export default bindMedia(data, "20-sakura-vows");
