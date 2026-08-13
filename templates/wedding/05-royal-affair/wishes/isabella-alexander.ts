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
    slug: "royal-affair",
    wishId: "isabella-alexander",
    name: "Royal Affair",
    mood: "Deep maroon & gold",
    standout: "Video welcome and guest wishes wall",
    buildPhase: 3,
  },
  people: [
    { name: "Isabella Jayawardena", role: "Bride" },
    { name: "Alexander Croft", role: "Groom" },
  ],
  event: {
    date: "2027-01-10T18:30:00+05:30",
    timeLabel: "Saturday, 10 January 2027 · 6:30 PM",
    place: {
      name: "Cinnamon Grand Ballroom",
      city: "Colombo",
      mapUrl: "https://maps.google.com/?q=Cinnamon+Grand+Colombo",
    },
  },
  copy: {
    headline: "A Royal Affair",
    subhead: "You are requested to grace the occasion",
    message:
      "An evening of vows, orchestra, and a wall of wishes from everyone who has loved them into this moment.",
    cta: "Leave a wish",
  },
  palette: {
    background: "#2A0B14",
    surface: "#3A121C",
    primary: "#D4AF37",
    secondary: "#F8F1E3",
    accent: "#8B1E3F",
    text: "#F8F1E3",
    muted: "#C4B08A",
    border: "#5C2A36",
  },
  fonts: {
    display: "Cinzel",
    body: "Karla",
  },
  media: {
    photos: [
      {
        src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80",
        alt: "Ornate wedding table",
      },
      {
        src: "https://images.unsplash.com/photo-1470337458703-26ad5ef2551b?w=1200&q=80",
        alt: "Candlelit hall",
      },
      {
        src: "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=1200&q=80",
        alt: "Formal portrait",
      },
    ],
    video: {
      src: "welcome.mp4",
      poster:
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1600&q=80",
    },
  },
  extras: {
    guestWall: true,
    videoWelcome: true,
  },
};

export default data;
