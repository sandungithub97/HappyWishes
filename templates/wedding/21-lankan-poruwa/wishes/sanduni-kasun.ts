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
    occasion: "wedding",
    slug: "lankan-poruwa",
    wishId: "sanduni-kasun",
    name: "Lankan Poruwa",
    mood: "Maroon, temple gold, ivory — Kandyan ceremony",
    standout: "Walks through Sri Lankan wedding traditions",
    buildPhase: 4,
  },
  people: [
    { name: "Sanduni Perera", role: "Bride" },
    { name: "Kasun Jayawardena", role: "Groom" },
  ],
  event: {
    date: "2026-12-20T09:30:00+05:30",
    timeLabel: "Sunday, 20 December 2026 · 9:30 AM",
    place: {
      name: "Temple Trees Garden",
      city: "Kandy",
      mapUrl: "https://maps.google.com/?q=Temple+Trees+Garden+Kandy",
    },
  },
  copy: {
    headline: "Sanduni & Kasun",
    subhead: "ආයුබෝවන් · You are invited to our Poruwa",
    message:
      "With our parents’ blessing we begin this life the Sri Lankan way — drums, an oil lamp, a poruwa of jackwood, and the people who raised us.",
    cta: "RSVP",
  },
  palette: {
    background: "#F7F0E4",
    surface: "#FFF8EC",
    primary: "#C9A227",
    secondary: "#6B0F1A",
    accent: "#2F5D3A",
    text: "#2A1810",
    muted: "#7A5C3E",
    border: "#E2CFA8",
  },
  fonts: {
    display: "Abhaya Libre",
    body: "Cormorant Garamond",
  },
  media: {
    photos: [
      {
        src: "https://images.unsplash.com/photo-1582510003544-bf48bdd9b3b5?w=1200&q=80",
        alt: "Temple architecture",
      },
      {
        src: "https://images.unsplash.com/photo-1548013146-724950e3d0c7?w=1200&q=80",
        alt: "Sri Lankan landscape",
      },
      {
        src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
        alt: "Wedding portrait",
      },
    ],
  },
  extras: {
    rsvp: {
      enabled: true,
      note: "Please reply by 1 November 2026 · traditional attire welcome",
    },
    timeline: [
      {
        label: "01",
        title: "Magul Bera",
        body: "The wedding drums open the morning — a blessing in rhythm before anyone speaks.",
      },
      {
        label: "02",
        title: "The oil lamp",
        body: "Parents light the pahana together. The flame is the first guest: light for the home they will keep.",
      },
      {
        label: "03",
        title: "Poruwa ceremony",
        body: "Bride and groom step onto the decorated wooden poruwa. Water is poured, rice is offered, and hands are bound in a white thread.",
      },
      {
        label: "04",
        title: "Jayamangala Gatha",
        body: "Seven verses of blessing are chanted. Each one asks for a long, honourable life together.",
      },
      {
        label: "05",
        title: "Osariya & Nilame",
        body: "She wears the Kandyan osariya; he the nilame jacket and mul anduma — colour, gold, and the island’s formal grace.",
      },
      {
        label: "06",
        title: "Homecoming",
        body: "After the feast, the new couple is received at home with milk rice, sweets, and a house that has been waiting.",
      },
    ],
  },
};

export default data;
