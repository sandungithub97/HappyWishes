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
    slug: "our-playlist",
    name: "Our Playlist",
    mood: "Vinyl black, neon coral, music-first",
    standout: "Each song tied to a memory and a photo",
    buildPhase: 4,
  },
  people: [
    { name: "Sofia", role: "Partner" },
    { name: "Leo", role: "Partner" },
  ],
  copy: {
    headline: "Our Playlist",
    subhead: "Songs that still sound like us",
    message:
      "Press play. Every track is a room we have already lived in together.",
    cta: "Listen",
  },
  palette: {
    background: "#121212",
    surface: "#1C1C1C",
    primary: "#FF5A5F",
    secondary: "#F5F0E8",
    accent: "#FF5A5F",
    text: "#F5F0E8",
    muted: "#A39E96",
    border: "#2E2E2E",
  },
  fonts: {
    display: "Archivo Black",
    body: "DM Sans",
  },
  media: {
    photos: [
      {
        src: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&q=80",
        alt: "Vinyl record",
      },
      {
        src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=80",
        alt: "Concert lights",
      },
      {
        src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80",
        alt: "Headphones",
      },
    ],
    music: {
      src: "opener.mp3",
      title: "The first song",
      artist: "Sofia & Leo",
    },
  },
  extras: {
    backgroundMusic: true,
    songs: [
      {
        title: "La Vie En Rose",
        artist: "Louis Armstrong",
        memory: "The kitchen in Lisbon. You burned the toast. I didn't care.",
        photo:
          "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80",
      },
      {
        title: "Holocene",
        artist: "Bon Iver",
        memory: "Driving home from the hospital, not talking, holding on.",
        photo:
          "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
      },
      {
        title: "Golden",
        artist: "Jill Scott",
        memory: "Every slow morning that still feels like a secret.",
        photo:
          "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
      },
    ],
  },
};

export default bindMedia(data, "15-our-playlist");
