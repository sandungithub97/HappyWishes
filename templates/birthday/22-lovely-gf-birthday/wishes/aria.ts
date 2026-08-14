/**
 * PERSONALIZE THIS FILE ONLY.
 * Names, dates, copy, photos, colors, and music all live here.
 *
 * Music file (replace with your track):
 *   public/media/birthday/22-lovely-gf-birthday/wishes/{wishId}/music/lovely-gf-birthday.mp3
 *
 * meta.wishId must match this filename (without .ts).
 * URL: /birthday/lovely-gf-birthday/{wishId}
 */
import type { TemplateData } from "@/templates/_shared/types";

const data: TemplateData = {
  meta: {
    occasion: "birthday",
    slug: "lovely-gf-birthday",
    wishId: "aria",
    name: "Lovely GF Birthday",
    mood: "Soft white, blush rose — heartbeat to word-heart for her",
    standout: "ECG heartbeat → 3D word heart, autoplay love song",
    buildPhase: 4,
  },
  people: [
    { name: "Aria", role: "To" },
    { name: "Noah", role: "From" },
  ],
  event: {
    date: "2026-09-14T19:00:00+05:30",
    timeLabel: "Sunday, 14 September",
  },
  copy: {
    headline: "Happy Birthday, my love",
    subhead: "Every beat is still yours",
    message:
      "Aria — before I knew your name, my heart already knew the rhythm. Today I hope you feel how loud it gets when you walk into a room. Happy birthday, beautiful. Forever yours.",
    cta: "Open my heart",
  },
  palette: {
    background: "#FFFBFC",
    surface: "#FFFFFF",
    primary: "#E38AA8",
    secondary: "#5A3340",
    accent: "#F6C1D0",
    text: "#4A2F38",
    muted: "#A07B86",
    border: "#F0D5DD",
  },
  fonts: {
    display: "Great Vibes",
    body: "Cormorant Garamond",
  },
  media: {
    photos: [
      {
        src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1200&q=80",
        alt: "Soft portrait",
      },
      {
        src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1200&q=80",
        alt: "Birthday glow",
      },
    ],
    music: {
      src: "lovely-gf-birthday.mp3",
      title: "For you",
      artist: "Noah",
    },
  },
  extras: {
    backgroundMusic: true,
    letter: {
      greeting: "My Aria,",
      closing: "With every heartbeat,",
      signature: "Noah",
    },
  },
};

export default data;
