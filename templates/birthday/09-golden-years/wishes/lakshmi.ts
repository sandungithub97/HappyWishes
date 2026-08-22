/**
 * PERSONALIZE THIS FILE ONLY.
 * Names, dates, copy, photos, colors, and music all live here.
 *
 * Photos / music / video — use either:
 *   src: "https://..."        any image or file URL
 *   src: "/media/birthday/09-golden-years/images/family.jpg"
 *   src: "hero.jpg"           public/media/.../wishes/{wishId}/images/hero.jpg
 *   src: "background.mp3"     public/media/.../wishes/{wishId}/music/background.mp3
 *
 * meta.wishId must match this filename (without .ts).
 * URL: /{occasion}/{slug}/{wishId}
 */
import type { TemplateData } from "@/templates/_shared/types";

const data: TemplateData = {
  meta: {
    occasion: "birthday",
    slug: "golden-years",
    wishId: "lakshmi",
    name: "Golden Years",
    mood: "Warm sepia, family tribute",
    standout: "Album gate, triptych scroll gallery, Ken Burns portraits, golden grain",
    buildPhase: 4,
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
    heroImage: {
      src: "https://images.unsplash.com/photo-1511988617509-57c2a7adc085?w=1600&q=85",
      alt: "Warm golden portrait",
    },
    photos: [
      {
        src: "https://images.unsplash.com/photo-1511988617509-57c2a7adc085?w=1200&q=85",
        alt: "Warm smile",
        caption: "Always the first to laugh",
      },
      {
        src: "https://images.unsplash.com/photo-1442458017215-285b83f0521f?w=1200&q=85",
        alt: "Family gathering",
        caption: "Sunday lunch, every week",
      },
      {
        src: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&q=85",
        alt: "Hands held together",
        caption: "Hands that held us",
      },
      {
        src: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200&q=85",
        alt: "Garden portrait",
        caption: "Her favourite corner",
      },
      {
        src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=85",
        alt: "Family around the table",
        caption: "The long table full",
      },
      {
        src: "https://images.unsplash.com/photo-1544716274-ca369e1663c4?w=1200&q=85",
        alt: "Tea and quiet moment",
        caption: "Afternoon tea ritual",
      },
      {
        src: "https://images.unsplash.com/photo-1581578731548-12ca0211850b?w=1200&q=85",
        alt: "Three generations",
        caption: "Three generations",
      },
      {
        src: "https://images.unsplash.com/photo-1516594030714-a2410881671?w=1200&q=85",
        alt: "Golden hour walk",
        caption: "Evening walks",
      },
      {
        src: "https://images.unsplash.com/photo-1609220136736-443944cf3979?w=1200&q=85",
        alt: "Birthday candles",
        caption: "Still counting blessings",
      },
    ],
    video: {
      src: "tribute.mp4",
      poster:
        "https://images.unsplash.com/photo-1442458017215-285b83f0521f?w=1600&q=85",
    },
  },
  extras: {
    milestoneAge: 70,
    guestWall: true,
    videoWelcome: true,
    rsvp: {
      enabled: true,
      note: "Kindly RSVP by 1 November",
    },
  },
};

export default data;
