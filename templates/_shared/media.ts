import type { TemplateData } from "./types";

export type MediaKind = "images" | "music" | "video";

function isAbsoluteSrc(src: string): boolean {
  return /^https?:\/\//i.test(src) || src.startsWith("/");
}

/** URL stays as-is. A filename like `hero.jpg` maps to images/, `song.mp3` to music/. */
export function resolveMediaSrc(
  src: string,
  occasion: string,
  folder: string,
  kind: MediaKind,
): string {
  const trimmed = src.trim().replace(/^\.\//, "");
  if (!trimmed || isAbsoluteSrc(trimmed)) return trimmed;
  if (
    trimmed.startsWith("images/") ||
    trimmed.startsWith("music/") ||
    trimmed.startsWith("video/")
  ) {
    return `/media/${occasion}/${folder}/${trimmed}`;
  }
  return `/media/${occasion}/${folder}/${kind}/${trimmed}`;
}

export function bindMedia(data: TemplateData, folder: string): TemplateData {
  const occasion = data.meta.occasion;
  const image = (src: string) =>
    resolveMediaSrc(src, occasion, folder, "images");
  const song = (src: string) => resolveMediaSrc(src, occasion, folder, "music");
  const clip = (src: string) => resolveMediaSrc(src, occasion, folder, "video");
  const optionalImage = (src?: string) => (src ? image(src) : src);
  const optionalSong = (src?: string) => (src ? song(src) : src);

  return {
    ...data,
    media: {
      photos: data.media.photos.map((photo) => ({
        ...photo,
        src: image(photo.src),
      })),
      music: data.media.music
        ? { ...data.media.music, src: song(data.media.music.src) }
        : undefined,
      video: data.media.video
        ? {
            ...data.media.video,
            src: clip(data.media.video.src),
            poster: optionalImage(data.media.video.poster),
          }
        : undefined,
    },
    extras: {
      ...data.extras,
      memoryGrid: data.extras.memoryGrid?.map((item) => ({
        ...item,
        photo: image(item.photo),
      })),
      timeline: data.extras.timeline?.map((item) => ({
        ...item,
        photo: optionalImage(item.photo),
      })),
      thenNow: data.extras.thenNow
        ? {
            then: {
              ...data.extras.thenNow.then,
              src: image(data.extras.thenNow.then.src),
            },
            now: {
              ...data.extras.thenNow.now,
              src: image(data.extras.thenNow.now.src),
            },
          }
        : undefined,
      songs: data.extras.songs?.map((item) => ({
        ...item,
        photo: optionalImage(item.photo),
        src: optionalSong(item.src),
      })),
    },
  };
}
