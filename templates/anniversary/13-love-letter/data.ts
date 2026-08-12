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
    occasion: "anniversary",
    slug: "love-letter",
    name: "Love Letter",
    mood: "Parchment, wax seal, intimate",
    standout: "Envelope-opening animation and handwritten letter",
    buildPhase: 4,
  },
  people: [
    { name: "Claire", role: "From" },
    { name: "James", role: "To" },
  ],
  copy: {
    headline: "For James",
    subhead: "Open when you miss me — or when you don't",
    message:
      "I keep meaning to say this out loud. This is the version I can finish without my voice catching.",
    cta: "Open the letter",
  },
  palette: {
    background: "#F4E8D0",
    surface: "#FBF3E0",
    primary: "#9B2C2C",
    secondary: "#2A2118",
    accent: "#C4A574",
    text: "#2A2118",
    muted: "#6B5744",
    border: "#D9C4A0",
  },
  fonts: {
    display: "Great Vibes",
    body: "EB Garamond",
  },
  media: {
    photos: [
      {
        src: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=80",
        alt: "Handwritten letter",
      },
    ],
  },
  extras: {
    letter: {
      greeting: "My James,",
      closing: "Yours, in every ordinary Tuesday,",
      signature: "Claire",
    },
  },
};

export default bindMedia(data, "13-love-letter");
