import type { EventPlace } from "./types";

export function placeLine(place?: EventPlace): string {
  if (!place) return "";
  return [place.name, place.city].filter(Boolean).join(" · ");
}

export function placeQuery(place: EventPlace): string {
  return [place.name, place.city].filter(Boolean).join(", ");
}

export function mapsOpenUrl(place: EventPlace): string {
  if (place.mapUrl) return place.mapUrl;
  const query = placeQuery(place);
  return `https://maps.google.com/?q=${encodeURIComponent(query)}`;
}
