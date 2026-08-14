/**
 * PERSONALIZE THIS FILE ONLY.
 * URL: /signature/do-you-love-me/{wishId}
 *   public/media/signature/23-do-you-love-me/wishes/{wishId}/music/love-me.mp3
 *
 * Yes → romantic reveal + "I love you too"
 * No  → button runs away; after tries → "Your No means Yes" reveal
 */
import type { TemplateData } from "@/templates/_shared/types";

const data: TemplateData = {
  meta: {
    occasion: "signature",
    slug: "do-you-love-me",
    wishId: "mira",
    name: "Do You Love Me?",
    mood: "Playful trick question — dodging No, romantic Yes",
    standout: "Yes/No buttons, fleeing No, I love you too reveal",
    buildPhase: 4,
  },
  people: [
    { name: "Mira", role: "To" },
    { name: "Dev", role: "From" },
  ],
  copy: {
    headline: "Do you love me?",
    subhead: "One little question",
    message:
      "I already knew your answer before you even touched the screen. You are my favorite person, my calm, my chaos, and every good thing in between. I love you.",
    cta: "Yes, always",
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
        src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&q=80",
        alt: "Together",
      },
    ],
    music: {
      src: "love-me.mp3",
      title: "For Mira",
    },
  },
  extras: {
    backgroundMusic: false,
    reveal: {
      lockedLabel: 'Your "No" still sounds like Yes to me, Mira.',
      unlockedHeadline: "I love you too",
    },
    letter: {
      greeting: "My Mira,",
      closing: "Forever yours,",
      signature: "Dev",
    },
  },
};

export default data;
