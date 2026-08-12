"use client";

import { useEffect, useRef, useState } from "react";
import type { MusicTrack } from "../types";

type Props = {
  track: MusicTrack;
};

export function MusicToggle({ track }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onEnded = () => setPlaying(false);
    const onError = () => {
      setAvailable(false);
      setPlaying(false);
    };

    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);
    return () => {
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
    };
  }, []);

  async function toggle() {
    const audio = audioRef.current;
    if (!audio || !available) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  }

  return (
    <>
      <audio ref={audioRef} src={track.src} loop preload="none" />
      <button
        type="button"
        onClick={toggle}
        disabled={!available}
        aria-label={
          !available
            ? "Music file not added yet"
            : playing
              ? `Pause ${track.title}`
              : `Play ${track.title}`
        }
        className="fixed right-5 bottom-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border shadow-lg backdrop-blur-md transition-transform duration-300 hover:scale-105 active:scale-95 sm:right-8 sm:bottom-8"
        style={{
          background: "color-mix(in srgb, var(--hw-surface) 88%, transparent)",
          borderColor: "var(--hw-border)",
          color: "var(--hw-primary)",
          opacity: available ? 1 : 0.45,
        }}
      >
        {playing ? (
          <span className="flex h-3 items-end gap-0.5">
            <span className="hw-bar h-2 w-0.5 origin-bottom bg-current" />
            <span className="hw-bar h-3 w-0.5 origin-bottom bg-current [animation-delay:120ms]" />
            <span className="hw-bar h-2.5 w-0.5 origin-bottom bg-current [animation-delay:240ms]" />
          </span>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M9 18V6l12-2v12" />
            <circle cx="6" cy="18" r="3" fill="none" stroke="currentColor" strokeWidth="1.7" />
            <circle cx="18" cy="16" r="3" fill="none" stroke="currentColor" strokeWidth="1.7" />
            <path
              d="M9 10l12-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            />
          </svg>
        )}
      </button>
    </>
  );
}
