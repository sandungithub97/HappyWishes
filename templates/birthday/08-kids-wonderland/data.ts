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
    slug: "kids-wonderland",
    name: "Kids' Wonderland",
    mood: "Cartoon-bright, bouncing, simple",
    standout: "Parent-uploaded photos and playful motion",
    buildPhase: 3,
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
    headline: "Ayaan is 7!",
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
    photos: [
      {
        src: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80",
        alt: "Child laughing",
      },
      {
        src: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80",
        alt: "Birthday cake",
      },
      {
        src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80",
        alt: "Balloons",
      },
    ],
  },
  extras: {
    milestoneAge: 7,
    rsvp: {
      enabled: true,
      note: "Tell us if you're bringing siblings",
    },
  },
};

export default bindMedia(data, "08-kids-wonderland");
