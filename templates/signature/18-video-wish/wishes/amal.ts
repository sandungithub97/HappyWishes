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
    slug: "video-wish",
    wishId: "amal",
    name: "Video Wish",
    mood: "Teal frame, gold edge, message on film",
    standout: "Hero is a short video with a themed frame",
    buildPhase: 4,
  },
  people: [{ name: "Amal", role: "From" }],
  copy: {
    headline: "A wish, on film",
    subhead: "Press play — I meant every second",
    message:
      "Some things are better said with a face, a pause, and the way a voice softens at the end.",
    cta: "Play the wish",
  },
  palette: {
    background: "#0F3D3E",
    surface: "#145255",
    primary: "#C6A664",
    secondary: "#FAF6EF",
    accent: "#C6A664",
    text: "#FAF6EF",
    muted: "#C5D4D0",
    border: "#2A5C5E",
  },
  fonts: {
    display: "Cormorant Garamond",
    body: "Outfit",
  },
  media: {
    photos: [
      {
        src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1600&q=80",
        alt: "Video still",
      },
    ],
    video: {
      src: "wish.mp4",
      poster:
        "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1600&q=80",
    },
  },
  extras: {
    videoWelcome: true,
  },
};

export default data;
