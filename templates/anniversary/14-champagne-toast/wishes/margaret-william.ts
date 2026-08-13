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
    occasion: "anniversary",
    slug: "champagne-toast",
    wishId: "margaret-william",
    name: "Champagne Toast",
    mood: "Black, gold, formal",
    standout: "Glass-clink gate, rising bubbles, gold shimmer headings",
    buildPhase: 5,
  },
  people: [
    { name: "Margaret", role: "Honouree" },
    { name: "William", role: "Honouree" },
  ],
  event: {
    date: "1976-08-12T18:00:00+05:30",
    timeLabel: "Golden anniversary · 50 years",
    place: {
      name: "The Oak Room",
      city: "Colombo",
      mapUrl: "https://maps.google.com/?q=The+Oak+Room+Colombo",
    },
  },
  copy: {
    headline: "Fifty Years",
    subhead: "Margaret & William",
    message:
      "Half a century of choosing the same person. Tonight we raise a glass to the quiet miracle of that.",
    cta: "Join the toast",
  },
  palette: {
    background: "#0A0A0A",
    surface: "#161616",
    primary: "#C9A227",
    secondary: "#F5E6C8",
    accent: "#C9A227",
    text: "#F5E6C8",
    muted: "#A89870",
    border: "#3A3424",
  },
  fonts: {
    display: "Cinzel Decorative",
    body: "Cormorant Garamond",
  },
  media: {
    photos: [
      {
        src: "https://images.unsplash.com/photo-1470337458703-26ad5ef2551b?w=1200&q=80",
        alt: "Champagne glasses",
      },
      {
        src: "https://images.unsplash.com/photo-1519671482532-2cf9b5c0d0c0?w=1200&q=80",
        alt: "Formal dinner",
      },
      {
        src: "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=1200&q=80",
        alt: "Portrait",
      },
    ],
  },
  extras: {
    milestoneAge: 50,
    guestWall: true,
  },
};

export default data;
