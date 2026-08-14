import type { ComponentType } from "react";
import type { DesignEntry, Occasion, TemplateData, TemplateEntry } from "./types";
import { bindMedia } from "./media";

import ForeverStartsHere from "../wedding/01-forever-starts-here/Template";
import TwoHeartsOneStory from "../wedding/02-two-hearts-one-story/Template";
import RusticVows from "../wedding/03-rustic-vows/Template";
import MinimalModern from "../wedding/04-minimal-modern/Template";
import RoyalAffair from "../wedding/05-royal-affair/Template";

import ConfettiPop from "../birthday/06-confetti-pop/Template";
import MilestoneMoments from "../birthday/07-milestone-moments/Template";
import KidsWonderland from "../birthday/08-kids-wonderland/Template";
import GoldenYears from "../birthday/09-golden-years/Template";
import SurpriseReveal from "../birthday/10-surprise-reveal/Template";

import StillUs from "../anniversary/11-still-us/Template";
import YearsOfUs from "../anniversary/12-years-of-us/Template";
import LoveLetter from "../anniversary/13-love-letter/Template";
import ChampagneToast from "../anniversary/14-champagne-toast/Template";
import OurPlaylist from "../anniversary/15-our-playlist/Template";

import MemoryLane from "../signature/16-memory-lane/Template";
import OneSongOnePage from "../signature/17-one-song-one-page/Template";
import VideoWish from "../signature/18-video-wish/Template";

import AnimeWish from "../birthday/19-anime-wish/Template";
import SakuraVows from "../wedding/20-sakura-vows/Template";
import LankanPoruwa from "../wedding/21-lankan-poruwa/Template";
import LovelyGfBirthday from "../birthday/22-lovely-gf-birthday/Template";
import DoYouLoveMe from "../signature/23-do-you-love-me/Template";
import AskForADate from "../signature/24-ask-for-a-date/Template";

import foreverAmaraJulian from "../wedding/01-forever-starts-here/wishes/amara-julian";
import twoHeartsNishaArjun from "../wedding/02-two-hearts-one-story/wishes/nisha-arjun";
import rusticElenaMateo from "../wedding/03-rustic-vows/wishes/elena-mateo";
import minimalSageKai from "../wedding/04-minimal-modern/wishes/sage-kai";
import royalIsabellaAlexander from "../wedding/05-royal-affair/wishes/isabella-alexander";

import confettiMaya from "../birthday/06-confetti-pop/wishes/maya";
import milestoneDilan from "../birthday/07-milestone-moments/wishes/dilan";
import kidsAyaan from "../birthday/08-kids-wonderland/wishes/ayaan";
import goldenLakshmi from "../birthday/09-golden-years/wishes/lakshmi";
import surprisePriya from "../birthday/10-surprise-reveal/wishes/priya";

import stillHannahTheo from "../anniversary/11-still-us/wishes/hannah-theo";
import yearsRaviAnjali from "../anniversary/12-years-of-us/wishes/ravi-anjali";
import loveClaireJames from "../anniversary/13-love-letter/wishes/claire-james";
import champagneMargaretWilliam from "../anniversary/14-champagne-toast/wishes/margaret-william";
import playlistSofiaLeo from "../anniversary/15-our-playlist/wishes/sofia-leo";

import memoryPereraFamily from "../signature/16-memory-lane/wishes/perera-family";
import oneSongSam from "../signature/17-one-song-one-page/wishes/sam";
import videoAmal from "../signature/18-video-wish/wishes/amal";

import animeHana from "../birthday/19-anime-wish/wishes/hana";
import sakuraShehaniLasith from "../wedding/20-sakura-vows/wishes/shehani-lasith";
import sakuraAikoKenji from "../wedding/20-sakura-vows/wishes/aiko-kenji";
import lankanSanduniKasun from "../wedding/21-lankan-poruwa/wishes/sanduni-kasun";
import lovelyGfAria from "../birthday/22-lovely-gf-birthday/wishes/aria";
import doYouLoveMeMira from "../signature/23-do-you-love-me/wishes/mira";
import askForADateLuna from "../signature/24-ask-for-a-date/wishes/luna";

type DesignInput = {
  number: number;
  folder: string;
  Template: ComponentType<{ data: TemplateData }>;
  wishes: TemplateData[];
};

function design(input: DesignInput): DesignEntry {
  const wishes = input.wishes.map((wish) => {
    if (wish.meta.slug !== input.wishes[0]?.meta.slug) {
      throw new Error(`Wish slug mismatch in ${input.folder}`);
    }
    return bindMedia(wish, input.folder, wish.meta.wishId);
  });
  return { ...input, wishes };
}

/** Designs in catalog order (numbers 1–21). Each design can have many wishes. */
export const designCatalog: DesignEntry[] = [
  design({
    number: 1,
    folder: "01-forever-starts-here",
    Template: ForeverStartsHere,
    wishes: [foreverAmaraJulian],
  }),
  design({
    number: 2,
    folder: "02-two-hearts-one-story",
    Template: TwoHeartsOneStory,
    wishes: [twoHeartsNishaArjun],
  }),
  design({
    number: 3,
    folder: "03-rustic-vows",
    Template: RusticVows,
    wishes: [rusticElenaMateo],
  }),
  design({
    number: 4,
    folder: "04-minimal-modern",
    Template: MinimalModern,
    wishes: [minimalSageKai],
  }),
  design({
    number: 5,
    folder: "05-royal-affair",
    Template: RoyalAffair,
    wishes: [royalIsabellaAlexander],
  }),
  design({
    number: 6,
    folder: "06-confetti-pop",
    Template: ConfettiPop,
    wishes: [confettiMaya],
  }),
  design({
    number: 7,
    folder: "07-milestone-moments",
    Template: MilestoneMoments,
    wishes: [milestoneDilan],
  }),
  design({
    number: 8,
    folder: "08-kids-wonderland",
    Template: KidsWonderland,
    wishes: [kidsAyaan],
  }),
  design({
    number: 9,
    folder: "09-golden-years",
    Template: GoldenYears,
    wishes: [goldenLakshmi],
  }),
  design({
    number: 10,
    folder: "10-surprise-reveal",
    Template: SurpriseReveal,
    wishes: [surprisePriya],
  }),
  design({
    number: 11,
    folder: "11-still-us",
    Template: StillUs,
    wishes: [stillHannahTheo],
  }),
  design({
    number: 12,
    folder: "12-years-of-us",
    Template: YearsOfUs,
    wishes: [yearsRaviAnjali],
  }),
  design({
    number: 13,
    folder: "13-love-letter",
    Template: LoveLetter,
    wishes: [loveClaireJames],
  }),
  design({
    number: 14,
    folder: "14-champagne-toast",
    Template: ChampagneToast,
    wishes: [champagneMargaretWilliam],
  }),
  design({
    number: 15,
    folder: "15-our-playlist",
    Template: OurPlaylist,
    wishes: [playlistSofiaLeo],
  }),
  design({
    number: 16,
    folder: "16-memory-lane",
    Template: MemoryLane,
    wishes: [memoryPereraFamily],
  }),
  design({
    number: 17,
    folder: "17-one-song-one-page",
    Template: OneSongOnePage,
    wishes: [oneSongSam],
  }),
  design({
    number: 18,
    folder: "18-video-wish",
    Template: VideoWish,
    wishes: [videoAmal],
  }),
  design({
    number: 19,
    folder: "19-anime-wish",
    Template: AnimeWish,
    wishes: [animeHana],
  }),
  design({
    number: 20,
    folder: "20-sakura-vows",
    Template: SakuraVows,
    wishes: [sakuraShehaniLasith, sakuraAikoKenji],
  }),
  design({
    number: 21,
    folder: "21-lankan-poruwa",
    Template: LankanPoruwa,
    wishes: [lankanSanduniKasun],
  }),
  design({
    number: 22,
    folder: "22-lovely-gf-birthday",
    Template: LovelyGfBirthday,
    wishes: [lovelyGfAria],
  }),
  design({
    number: 23,
    folder: "23-do-you-love-me",
    Template: DoYouLoveMe,
    wishes: [doYouLoveMeMira],
  }),
  design({
    number: 24,
    folder: "24-ask-for-a-date",
    Template: AskForADate,
    wishes: [askForADateLuna],
  }),
];

/** Flat list of every personalized wish (for gallery / sitemap). */
export const templateCatalog: TemplateData[] = designCatalog.flatMap(
  (item) => item.wishes,
);

export function listDesigns(): DesignEntry[] {
  return designCatalog;
}

export function listTemplates(): TemplateData[] {
  return templateCatalog;
}

export function listByOccasion(occasion: Occasion): TemplateData[] {
  return templateCatalog.filter((item) => item.meta.occasion === occasion);
}

export function getDesign(
  occasion: string,
  slug: string,
): DesignEntry | undefined {
  return designCatalog.find(
    (item) =>
      item.wishes[0]?.meta.occasion === occasion &&
      item.wishes[0]?.meta.slug === slug,
  );
}

export function getWishData(
  occasion: string,
  slug: string,
  wishId: string,
): TemplateData | undefined {
  return getDesign(occasion, slug)?.wishes.find(
    (wish) => wish.meta.wishId === wishId,
  );
}

/** First wish for a design — used when URL has no wishId. */
export function getDefaultWish(
  occasion: string,
  slug: string,
): TemplateData | undefined {
  return getDesign(occasion, slug)?.wishes[0];
}

export function getTemplateData(
  occasion: string,
  slug: string,
): TemplateData | undefined {
  return getDefaultWish(occasion, slug);
}

export const templateRegistry: TemplateEntry[] = designCatalog.flatMap(
  (designItem) =>
    designItem.wishes.map((data) => ({
      data,
      Template: designItem.Template,
    })),
);

export function getWishEntry(
  occasion: string,
  slug: string,
  wishId: string,
): TemplateEntry | undefined {
  return templateRegistry.find(
    (item) =>
      item.data.meta.occasion === occasion &&
      item.data.meta.slug === slug &&
      item.data.meta.wishId === wishId,
  );
}

export function getTemplateEntry(
  occasion: string,
  slug: string,
): TemplateEntry | undefined {
  const data = getDefaultWish(occasion, slug);
  if (!data) return undefined;
  const designItem = getDesign(occasion, slug);
  if (!designItem) return undefined;
  return { data, Template: designItem.Template };
}
