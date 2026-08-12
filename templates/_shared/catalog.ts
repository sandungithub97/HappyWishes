import type { Occasion, TemplateData } from "./types";
import { bindMedia } from "./media";

import foreverStartsHereData from "../wedding/01-forever-starts-here/data";
import twoHeartsOneStoryData from "../wedding/02-two-hearts-one-story/data";
import rusticVowsData from "../wedding/03-rustic-vows/data";
import minimalModernData from "../wedding/04-minimal-modern/data";
import royalAffairData from "../wedding/05-royal-affair/data";

import confettiPopData from "../birthday/06-confetti-pop/data";
import milestoneMomentsData from "../birthday/07-milestone-moments/data";
import kidsWonderlandData from "../birthday/08-kids-wonderland/data";
import goldenYearsData from "../birthday/09-golden-years/data";
import surpriseRevealData from "../birthday/10-surprise-reveal/data";

import stillUsData from "../anniversary/11-still-us/data";
import yearsOfUsData from "../anniversary/12-years-of-us/data";
import loveLetterData from "../anniversary/13-love-letter/data";
import champagneToastData from "../anniversary/14-champagne-toast/data";
import ourPlaylistData from "../anniversary/15-our-playlist/data";

import memoryLaneData from "../signature/16-memory-lane/data";
import oneSongOnePageData from "../signature/17-one-song-one-page/data";
import videoWishData from "../signature/18-video-wish/data";

import animeWishData from "../birthday/19-anime-wish/data";
import sakuraVowsData from "../wedding/20-sakura-vows/data";
import lankanPoruwaData from "../wedding/21-lankan-poruwa/data";

export const templateCatalog: TemplateData[] = [
  bindMedia(foreverStartsHereData, "01-forever-starts-here"),
  bindMedia(twoHeartsOneStoryData, "02-two-hearts-one-story"),
  bindMedia(rusticVowsData, "03-rustic-vows"),
  bindMedia(minimalModernData, "04-minimal-modern"),
  bindMedia(royalAffairData, "05-royal-affair"),
  bindMedia(confettiPopData, "06-confetti-pop"),
  bindMedia(milestoneMomentsData, "07-milestone-moments"),
  bindMedia(kidsWonderlandData, "08-kids-wonderland"),
  bindMedia(goldenYearsData, "09-golden-years"),
  bindMedia(surpriseRevealData, "10-surprise-reveal"),
  bindMedia(stillUsData, "11-still-us"),
  bindMedia(yearsOfUsData, "12-years-of-us"),
  bindMedia(loveLetterData, "13-love-letter"),
  bindMedia(champagneToastData, "14-champagne-toast"),
  bindMedia(ourPlaylistData, "15-our-playlist"),
  bindMedia(memoryLaneData, "16-memory-lane"),
  bindMedia(oneSongOnePageData, "17-one-song-one-page"),
  bindMedia(videoWishData, "18-video-wish"),
  bindMedia(animeWishData, "19-anime-wish"),
  bindMedia(sakuraVowsData, "20-sakura-vows"),
  bindMedia(lankanPoruwaData, "21-lankan-poruwa"),
];

export function listTemplates(): TemplateData[] {
  return templateCatalog;
}

export function listByOccasion(occasion: Occasion): TemplateData[] {
  return templateCatalog.filter((item) => item.meta.occasion === occasion);
}

export function getTemplateData(
  occasion: string,
  slug: string,
): TemplateData | undefined {
  return templateCatalog.find(
    (item) => item.meta.occasion === occasion && item.meta.slug === slug,
  );
}
