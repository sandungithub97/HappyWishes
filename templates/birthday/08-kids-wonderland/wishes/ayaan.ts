/**
 * PERSONALIZE THIS FILE ONLY.
 * Names, dates, copy, photos, colors, and music all live here.
 *
 * Photos / music / video — use either:
 *   src: "https://..."        any image or file URL
 *   src: "/media/birthday/08-kids-wonderland/images/party.jpg"
 *   src: "hero.jpg"           public/media/.../wishes/{wishId}/images/hero.jpg
 *
 * meta.wishId must match this filename (without .ts).
 * URL: /{occasion}/{slug}/{wishId}
 */
import type { TemplateData } from "@/templates/_shared/types";

const data: TemplateData = {
  meta: {
    occasion: "birthday",
    slug: "kids-wonderland",
    wishId: "ayaan",
    name: "Kids' Wonderland",
    mood: "Cartoon-bright, bouncing, playful scroll",
    standout: "Castle doors open, emoji rain, parallax photos, party schedule",
    buildPhase: 4,
  },
  people: [{ name: "Ayaan", role: "Birthday kid" }],
  event: {
    date: "2026-09-05T16:00:00+05:30",
    timeLabel: "Saturday, 5 September · 4:00 PM",
    place: {
      name: "Home — 12 Flower Road",
      city: "Colombo 07",
      mapUrl: "https://maps.google.com/?q=12+Flower+Road+Colombo+07",
    },
  },
  copy: {
    headline: "Happy 7th Birthday!",
    subhead: "A wonderland afternoon",
    message:
      "Cupcakes, bubbles, and a very important dinosaur cake. Parents, you're invited too — juice boxes provided.",
    cta: "We'll be there",
  },
  palette: {
    background: "#FFF7ED",
    surface: "#FFFFFF",
    primary: "#FB7185",
    secondary: "#0369A1",
    accent: "#FDE047",
    text: "#1E3A5F",
    muted: "#64748B",
    border: "#FED7AA",
  },
  fonts: {
    display: "Baloo 2",
    body: "Quicksand",
  },
  media: {
    heroImage: {
      src: "https://images.unsplash.com/photo-1527529482834-994677725fe3?w=1600&q=85",
      alt: "Colourful balloon arch",
    },
    photos: [
      {
        src: "https://images.unsplash.com/photo-1515488042361-ee00e17d4b44?w=1200&q=85",
        alt: "Kids celebrating with balloons",
        caption: "Balloon squad ready",
      },
      {
        src: "https://images.unsplash.com/photo-1558304970-27d9f2fadc29?w=1200&q=85",
        alt: "Birthday cake with candles",
        caption: "Dino cake incoming",
      },
      {
        src: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&q=85",
        alt: "Child blowing bubbles",
        caption: "Bubble chase o'clock",
      },
      {
        src: "https://images.unsplash.com/photo-1576612478650-224608ba0a85?w=1200&q=85",
        alt: "Colourful cupcakes on a tray",
        caption: "Cupcake mountain",
      },
      {
        src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=85",
        alt: "Rainbow balloon bunch",
        caption: "Wonderland colours",
      },
    ],
  },
  extras: {
    milestoneAge: 7,
    stickers: ["🎈", "🦕", "⭐", "🧁", "🎉", "🎪"],
    timeline: [
      {
        label: "4:00",
        title: "Castle opens",
        body: "Arrive, grab a juice box, and say hi to Star Buddy.",
      },
      {
        label: "4:30",
        title: "Dinosaur cake",
        body: "The most important roar of the afternoon. Candles included.",
      },
      {
        label: "5:00",
        title: "Bubble chase",
        body: "Grown-ups welcome. Competitive popping optional.",
      },
      {
        label: "5:30",
        title: "Goodie bags",
        body: "Stickers, treats, and one very tired birthday kid.",
      },
    ],
    rsvp: {
      enabled: true,
      note: "Tell us if you're bringing siblings",
    },
  },
};

export default data;
