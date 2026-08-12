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
    slug: "golden-years",
    name: "Golden Years",
    mood: "Warm sepia, family tribute",
    standout: "Tribute video/photo section and guestbook",
    buildPhase: 3,
  },
  people: [{ name: "Lakshmi Wijesinghe", role: "Honouree" }],
  event: {
    date: "2026-11-15T17:00:00+05:30",
    timeLabel: "Sunday, 15 November · 5:00 PM",
    place: {
      name: "Family home, Nawala",
      city: "Sri Jayawardenepura",
      mapUrl: "https://maps.google.com/?q=Nawala+Sri+Jayawardenepura",
    },
  },
  copy: {
    headline: "Amma turns 70",
    subhead: "A life that held all of us",
    message:
      "Seventy years of recipes, quiet strength, and the kind of love that never needed a speech — until tonight.",
    cta: "Write in the guestbook",
  },
  palette: {
    background: "#F6EBD9",
    surface: "#FFF8EC",
    primary: "#C4A574",
    secondary: "#5C3A21",
    accent: "#A65B3A",
    text: "#5C3A21",
    muted: "#8B6F4E",
    border: "#E2CFAE",
  },
  fonts: {
    display: "Cormorant",
    body: "Lora",
  },
  media: {
    photos: [
      {
        src: "https://images.unsplash.com/photo-1442458017215-285b83f0521f?w=1200&q=80",
        alt: "Family gathering",
      },
      {
        src: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&q=80",
        alt: "Hands of family",
      },
      {
        src: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200&q=80",
        alt: "Garden portrait",
      },
    ],
    video: {
      src: "tribute.mp4",
      poster:
        "https://images.unsplash.com/photo-1442458017215-285b83f0521f?w=1600&q=80",
    },
  },
  extras: {
    milestoneAge: 70,
    guestWall: true,
    videoWelcome: true,
  },
};

export default bindMedia(data, "09-golden-years");
