import type { ComponentType } from "react";
import { getTemplateData } from "./catalog";
import type { TemplateEntry } from "./types";

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

export { listByOccasion, listTemplates, getTemplateData } from "./catalog";

function entry(
  occasion: string,
  slug: string,
  Template: ComponentType,
): TemplateEntry {
  const data = getTemplateData(occasion, slug);
  if (!data) {
    throw new Error(`Missing template data for ${occasion}/${slug}`);
  }
  return { data, Template };
}

export const templateRegistry: TemplateEntry[] = [
  entry("wedding", "forever-starts-here", ForeverStartsHere),
  entry("wedding", "two-hearts-one-story", TwoHeartsOneStory),
  entry("wedding", "rustic-vows", RusticVows),
  entry("wedding", "minimal-modern", MinimalModern),
  entry("wedding", "royal-affair", RoyalAffair),
  entry("birthday", "confetti-pop", ConfettiPop),
  entry("birthday", "milestone-moments", MilestoneMoments),
  entry("birthday", "kids-wonderland", KidsWonderland),
  entry("birthday", "golden-years", GoldenYears),
  entry("birthday", "surprise-reveal", SurpriseReveal),
  entry("anniversary", "still-us", StillUs),
  entry("anniversary", "years-of-us", YearsOfUs),
  entry("anniversary", "love-letter", LoveLetter),
  entry("anniversary", "champagne-toast", ChampagneToast),
  entry("anniversary", "our-playlist", OurPlaylist),
  entry("signature", "memory-lane", MemoryLane),
  entry("signature", "one-song-one-page", OneSongOnePage),
  entry("signature", "video-wish", VideoWish),
  entry("birthday", "anime-wish", AnimeWish),
  entry("wedding", "sakura-vows", SakuraVows),
  entry("wedding", "lankan-poruwa", LankanPoruwa),
];

export function getTemplateEntry(
  occasion: string,
  slug: string,
): TemplateEntry | undefined {
  return templateRegistry.find(
    (item) =>
      item.data.meta.occasion === occasion && item.data.meta.slug === slug,
  );
}
