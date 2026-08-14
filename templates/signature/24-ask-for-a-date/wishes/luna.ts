/**
 * PERSONALIZE THIS FILE ONLY.
 * URL: /signature/ask-for-a-date/{wishId}
 *
 * Flow: intro → favorite date questions (1 by 1) → summary → ask → yes reveal
 */
import type { TemplateData } from "@/templates/_shared/types";

const data: TemplateData = {
  meta: {
    occasion: "signature",
    slug: "ask-for-a-date",
    wishId: "shehani",
    name: "Ask For A Date",
    mood: "Romantic quiz — her favorite date picks, one question at a time",
    standout: "Step-by-step flavor quiz, summary card, final date ask",
    buildPhase: 4,
  },
  people: [
    { name: "Shehani", role: "To" },
    { name: "Devinda", role: "From" },
  ],
  event: {
    timeLabel: "This Saturday · 6 PM",
    place: {
      name: "The Rooftop Garden Café",
      city: "Colombo",
      mapUrl: "https://maps.google.com/?q=Rooftop+Garden+Cafe+Colombo",
    },
  },
  copy: {
    headline: "Can I take you out?",
    subhead: "Before I ask…",
    message:
      "I'll plan everything around what you picked — {vibe}, your timing, your mood. I can't wait to see you smile, {name}.",
    cta: "Start the quiz",
  },
  palette: {
    background: "#FAFCFF",
    surface: "#FFFFFF",
    primary: "#5A8FB8",
    secondary: "#3D5A73",
    accent: "#D4E8F5",
    text: "#3A4A56",
    muted: "#8AA3B5",
    border: "#D8E8F2",
  },
  fonts: {
    display: "Great Vibes",
    body: "Cormorant Garamond",
  },
  media: {
    photos: [
      {
        src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1200&q=80",
        alt: "Date night",
      },
    ],
  },
  extras: {
    letter: {
      greeting: "Dear Shehani,",
      closing: "See you soon,",
      signature: "Devinda",
    },
    dateQuiz: {
      intro:
        "Hey Shehani, I want to plan the perfect evening — tell me your favorites, one question at a time.",
      summaryHeadline: "Your dream date, noted",
      askHeadline: "Shehani, will you go on a date with me?",
      yesLabel: "Yes, I'd love to",
      noHint: "That button doesn't work on this page 😊",
      yesMessage: "It's a date!",
      questions: [
        {
          prompt: "What's your ideal date vibe?",
          options: [
            { label: "Cozy café", emoji: "☕" },
            { label: "Sunset walk", emoji: "🌅" },
            { label: "Fancy dinner", emoji: "🍽" },
            { label: "Movie night", emoji: "🎬" },
          ],
        },
        {
          prompt: "When feels perfect to you?",
          options: [
            { label: "Brunch morning", emoji: "🌤" },
            { label: "Golden hour", emoji: "🌇" },
            { label: "After dark", emoji: "🌙" },
            { label: "Whenever you're free", emoji: "💫" },
          ],
        },
        {
          prompt: "What's your food mood?",
          options: [
            { label: "Something sweet", emoji: "🍰" },
            { label: "Sushi night", emoji: "🍣" },
            { label: "Italian comfort", emoji: "🍝" },
            { label: "Surprise me", emoji: "✨" },
          ],
        },
        {
          prompt: "Pick the soundtrack",
          options: [
            { label: "Soft jazz", emoji: "🎷" },
            { label: "Our playlist", emoji: "🎵" },
            { label: "City sounds", emoji: "🌃" },
            { label: "Just us talking", emoji: "💬" },
          ],
        },
        {
          prompt: "Dress code?",
          options: [
            { label: "Casual & cute", emoji: "👟" },
            { label: "Dress to impress", emoji: "👗" },
            { label: "Come as you are", emoji: "🧢" },
            { label: "Matching colors", emoji: "💕" },
          ],
        },
      ],
    },
  },
};

export default data;
