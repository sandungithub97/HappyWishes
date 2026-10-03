/**
 * PERSONALIZE THIS FILE ONLY.
 * Names, dates, copy, photos, colors, and music all live here.
 *
 * Photos, use either:
 *   src: "https://..."   any image URL
 *   src: "menu-1.jpg"    public/media/birthday/25-aurora-birthday/wishes/menu/images/menu-1.jpg
 * The first photo is the large tile in the gallery.
 *
 * Music (replace with your track, keep the filename):
 *   public/media/birthday/25-aurora-birthday/wishes/menu/music/birthday.mp3
 *
 * Intro video (plays muted first, then the wish opens automatically):
 *   public/media/birthday/25-aurora-birthday/wishes/menu/video/intro.mp4
 * Remove media.video to use the tap-to-open gate instead.
 *
 * event.date = the moment her birthday begins (drives the gate countdown).
 * extras.milestoneAge = the age she turns (birth year is derived from it).
 *
 * meta.wishId must match this filename (without .ts).
 * URL: /birthday/aurora-birthday/menu
 */
import type { TemplateData } from "@/templates/_shared/types";

const data: TemplateData = {
  meta: {
    occasion: "birthday",
    slug: "aurora-birthday",
    wishId: "menu",
    name: "Aurora Birthday",
    mood: "Modern midnight aurora: blush, lavender, champagne glow",
    standout:
      "Countdown gate, live life counter, glass letter, bento gallery, blow out candle cake",
    buildPhase: 7,
  },
  people: [{ name: "Menu", role: "To" }],
  event: {
    date: "2026-10-04T00:00:00+05:30",
    timeLabel: "Sunday, 4 October 2026",
  },
  copy: {
    headline: "Happy Birthday, Menu",
    subhead:
      "Twenty four looks beautiful on you. Today the whole world gets to celebrate the most special person in it.",
    message:
      "Happy birthday to the girl who makes ordinary days feel like something worth remembering. Twenty four years ago today, the world got a little brighter, and somehow you keep making it brighter every single day. Your smile, your kindness, the way you care so deeply about the people around you… it's rare, and it's beautiful. I hope this year gives back everything you give to everyone else: endless laughter, big dreams coming true, quiet moments of peace, and people who love you loudly. Never stop being exactly who you are. Today is all about you, so enjoy every single second of it.",
    cta: "Today is yours",
  },
  palette: {
    background: "#07060F",
    surface: "#14111F",
    primary: "#FF8FB8",
    secondary: "#B9A5FF",
    accent: "#FFD7A0",
    text: "#F6F2FF",
    muted: "#A39CBD",
    border: "#2C2742",
  },
  fonts: {
    display: "Instrument Serif",
    body: "Manrope",
  },
  media: {
    photos: [
      {
        src: "birthdaygirl.jpeg",
        alt: "Portrait of Menu",
        caption: "The birthday girl ✨",
      },
      {
        src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=900&q=85",
        alt: "Birthday balloons",
        caption: "Twenty four",
      },
      {
        src: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=900&q=85",
        alt: "Birthday cake",
        caption: "Sweetest day",
      },
      {
        src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&q=85",
        alt: "Celebration lights",
        caption: "Celebrate you",
      },
    ],
    music: {
      src: "birthday.mp3",
      title: "For Menu",
    },
    video: {
      src: "intro.mp4",
    },
  },
  extras: {
    milestoneAge: 24,
    backgroundMusic: true,
    stickers: ["✨", "🎂", "💖", "🌸", "🎈", "🥂", "🦋"],
    letter: {
      greeting: "Dear Menu,",
      closing: "With all my heart,",
      signature: "Your biggest fan",
    },
    timeline: [
      {
        label: "01",
        title: "Endless laughter",
        body: "The kind that makes your eyes water and your cheeks hurt, every single week.",
      },
      {
        label: "02",
        title: "Dreams coming true",
        body: "Every goal you've been quietly chasing. May this be the year it finally happens.",
      },
      {
        label: "03",
        title: "Peace & good health",
        body: "Calm mornings, easy days, and a heart that always feels light.",
      },
      {
        label: "04",
        title: "Beautiful adventures",
        body: "New places, new stories, and memories you'll smile about for years.",
      },
      {
        label: "05",
        title: "People who cherish you",
        body: "Friends and family who see how special you are, and tell you often.",
      },
      {
        label: "06",
        title: "You, always you",
        body: "Never dim your light for anyone. The world needs exactly you.",
      },
    ],
  },
};

export default data;
