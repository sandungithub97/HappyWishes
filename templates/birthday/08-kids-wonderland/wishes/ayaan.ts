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
    mood: "Web hero birthday — red, blue, swinging webs",
    standout: "Web gate, corner webs, spider hero mascot, web emoji rain",
    buildPhase: 4,
  },
  people: [{ name: "Ayaan", role: "Birthday hero" }],
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
    headline: "Happy 7th Birthday, Hero!",
    subhead: "Ayaan's web-slinging party",
    message:
      "Calling all web heroes! Ayaan turns 7 and the city needs cake, games, and maximum fun. Capes optional — spider vibes required. Parents welcome — juice boxes and goodie bags included.",
    cta: "I'll be there",
  },
  palette: {
    background: "#0B1628",
    surface: "#1A2F4A",
    primary: "#FF4D55",
    secondary: "#8EC5FF",
    accent: "#FFFFFF",
    text: "#FFFFFF",
    muted: "#C8D8EA",
    border: "#3D5A80",
  },
  fonts: {
    display: "Bangers",
    body: "Nunito",
  },
  media: {
    photos: [
      {
        src: "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=1200&q=85",
        alt: "Kids dressed as web-slinging heroes",
        caption: "Hero squad assembled",
      },
      {
        src: "https://images.unsplash.com/photo-1541337076810-efaab169cb2d?w=1200&q=85",
        alt: "Boy in a superhero mask and cape",
        caption: "Birthday hero mode",
      },
      {
        src: "https://images.unsplash.com/photo-1529347599731-ec02b259c9f0?w=1200&q=85",
        alt: "Boy holding blue and red party balloons",
        caption: "HQ balloon drop",
      },
      {
        src: "https://images.unsplash.com/photo-1558304970-27d9f2fadc29?w=1200&q=85",
        alt: "Birthday cake with candles",
        caption: "Power-up cake",
      },
      {
        src: "https://images.unsplash.com/photo-1515488042361-ee00e17d4b44?w=1200&q=85",
        alt: "Kids celebrating at a birthday party",
        caption: "Mission complete",
      },
    ],
  },
  extras: {
    milestoneAge: 7,
    stickers: ["🕷️", "🕸️", "🦸", "⭐", "🎂", "🎉"],
    timeline: [
      {
        label: "4:00",
        title: "Web HQ opens",
        body: "Heroes arrive — webs are up, capes on, juice boxes ready.",
      },
      {
        label: "4:30",
        title: "Birthday cake mission",
        body: "The ultimate power-up cake. Candles must be defeated.",
      },
      {
        label: "5:00",
        title: "Web-sling games",
        body: "Obstacle course, target toss, and grown-ups try too.",
      },
      {
        label: "5:30",
        title: "Goodie bag drop",
        body: "Stickers, treats, and one very happy birthday hero.",
      },
    ],
    rsvp: {
      enabled: true,
      note: "Tell us if you're bringing sidekick siblings",
    },
  },
};

export default data;
