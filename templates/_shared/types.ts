import type { ComponentType } from "react";

export const OCCASIONS = [
  "wedding",
  "birthday",
  "anniversary",
  "signature",
] as const;

export type Occasion = (typeof OCCASIONS)[number];

export const OCCASION_LABELS: Record<Occasion, string> = {
  wedding: "Wedding",
  birthday: "Birthday",
  anniversary: "Anniversary",
  signature: "Signature",
};

export type Palette = {
  background: string;
  surface: string;
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  muted: string;
  border: string;
};

export type Fonts = {
  /** Google Font name, e.g. "Cormorant Garamond" */
  display: string;
  body: string;
};

export type Photo = {
  /**
   * Either a full URL (`https://...`) or a filename in
   * `public/media/{occasion}/{number}-{slug}/images/`
   */
  src: string;
  alt: string;
  caption?: string;
};

export type MusicTrack = {
  src: string;
  title: string;
  artist?: string;
};

export type Person = {
  name: string;
  role?: string;
};

export type EventPlace = {
  /** Place name guests see, e.g. "Galle Face Hotel" */
  name: string;
  city?: string;
  /**
   * Google Maps link (search, /place/…, or maps.app.goo.gl).
   * If omitted, clicking the place searches for name + city.
   */
  mapUrl?: string;
};

export type EventInfo = {
  /** ISO 8601 datetime — used for countdowns */
  date?: string;
  timeLabel?: string;
  place?: EventPlace;
};

export type TimelineItem = {
  label: string;
  title: string;
  body: string;
  photo?: string;
};

export type SongMemory = {
  title: string;
  artist: string;
  memory: string;
  photo?: string;
  src?: string;
};

export type MemoryItem = {
  year: string;
  caption: string;
  photo: string;
};

/**
 * Template-specific fields. Keep them here so `data.ts` stays
 * the only file you edit when personalizing a wish.
 */
export type TemplateExtras = {
  countdown?: boolean;
  photoCarousel?: boolean;
  backgroundMusic?: boolean;
  timeline?: TimelineItem[];
  rsvp?: {
    enabled: boolean;
    note?: string;
  };
  guestWall?: boolean;
  videoWelcome?: boolean;
  milestoneAge?: number;
  memoryGrid?: MemoryItem[];
  reveal?: {
    lockedLabel: string;
    unlockedHeadline: string;
  };
  thenNow?: {
    then: Photo;
    now: Photo;
  };
  letter?: {
    greeting: string;
    closing: string;
    signature: string;
  };
  songs?: SongMemory[];
  scrollytelling?: boolean;
  qrFriendly?: boolean;
  stickers?: string[];
};

export type TemplateMeta = {
  occasion: Occasion;
  /** Design slug, e.g. "sakura-vows" (URL segment) */
  slug: string;
  /**
   * Unique wish id — matches the filename in wishes/{wishId}.ts
   * and the last URL segment: /{occasion}/{slug}/{wishId}
   */
  wishId: string;
  name: string;
  mood: string;
  standout: string;
  /** Build phase this design will be fully implemented in */
  buildPhase: 2 | 3 | 4;
};

export type TemplateData = {
  meta: TemplateMeta;
  people: Person[];
  event?: EventInfo;
  copy: {
    headline: string;
    subhead?: string;
    message: string;
    cta?: string;
  };
  palette: Palette;
  fonts: Fonts;
  media: {
    photos: Photo[];
    music?: MusicTrack;
    video?: {
      src: string;
      poster?: string;
    };
  };
  extras: TemplateExtras;
};

export type TemplateEntry = {
  data: TemplateData;
  Template: ComponentType<{ data: TemplateData }>;
};

export type DesignEntry = {
  /** Catalog number 1–21 */
  number: number;
  folder: string;
  Template: ComponentType<{ data: TemplateData }>;
  wishes: TemplateData[];
};
