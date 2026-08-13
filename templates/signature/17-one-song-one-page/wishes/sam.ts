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
    slug: "one-song-one-page",
    wishId: "sam",
    name: "One Song, One Page",
    mood: "Ultra-minimal, one screen, one feeling",
    standout: "Audio-reactive glow, lyric lines timed to playback",
    buildPhase: 6,
  },
  people: [{ name: "Sam", role: "For" }],
  copy: {
    headline: "This one is yours",
    subhead: "One song. One photo. One sentence I meant.",
    message: "I heard this and thought of the way you laugh with your whole face.",
    cta: "Play",
  },
  palette: {
    background: "#F7F5F2",
    surface: "#FFFFFF",
    primary: "#E11D48",
    secondary: "#1A1A1A",
    accent: "#E11D48",
    text: "#1A1A1A",
    muted: "#6B6B6B",
    border: "#E7E2DC",
  },
  fonts: {
    display: "Newsreader",
    body: "Inter",
  },
  media: {
    photos: [
      {
        src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1600&q=80",
        alt: "A single portrait",
      },
    ],
    music: {
      src: "song.mp3",
      title: "The song",
      artist: "For Sam",
    },
  },
  extras: {
    backgroundMusic: true,
  },
};

export default data;
