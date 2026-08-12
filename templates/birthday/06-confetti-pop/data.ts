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
    slug: "confetti-pop",
    name: "Confetti Pop",
    mood: "Bright, playful, loud in the best way",
    standout: "Confetti burst on load, stickers, music toggle",
    buildPhase: 2,
  },
  people: [{ name: "Maya Senanayake", role: "Birthday star" }],
  event: {
    date: "2026-08-22T19:00:00+05:30",
    timeLabel: "Saturday, 22 August · 7:00 PM",
    place: {
      name: "Rooftop at Harbour",
      city: "Colombo",
      mapUrl: "https://maps.google.com/?q=Harbour+Colombo",
    },
  },
  copy: {
    headline: "Maya turns 25",
    subhead: "Confetti is not optional",
    message:
      "Twenty-five trips around the sun, and she still walks into a room like the music just started. Come celebrate the chaos.",
    cta: "I'm in",
  },
  palette: {
    background: "#1B1B3A",
    surface: "#252550",
    primary: "#FF3D7F",
    secondary: "#FFE566",
    accent: "#3DFFF3",
    text: "#F7F4FF",
    muted: "#B8B4D8",
    border: "#3A3A6A",
  },
  fonts: {
    display: "Fredoka",
    body: "Nunito",
  },
  media: {
    photos: [
      {
        src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=80",
        alt: "Birthday balloons",
        caption: "The balloon budget was a suggestion",
      },
      {
        src: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1200&q=80",
        alt: "Cake with candles",
        caption: "Make a wish, Maya",
      },
      {
        src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80",
        alt: "Party lights",
        caption: "Until the lights come up",
      },
    ],
    music: {
      src: "background.mp3",
      title: "Dance the Night",
    },
  },
  extras: {
    backgroundMusic: true,
    milestoneAge: 25,
    stickers: ["🎈", "🎂", "✨", "🥳", "💖", "🎉"],
    rsvp: {
      enabled: true,
      note: "Maya is counting on the chaos",
    },
  },
};

export default bindMedia(data, "06-confetti-pop");
