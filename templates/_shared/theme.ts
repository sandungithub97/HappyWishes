import type { CSSProperties } from "react";
import type { Palette } from "./types";

export function themeStyle(palette: Palette): CSSProperties {
  return {
    "--hw-bg": palette.background,
    "--hw-surface": palette.surface,
    "--hw-primary": palette.primary,
    "--hw-secondary": palette.secondary,
    "--hw-accent": palette.accent,
    "--hw-text": palette.text,
    "--hw-muted": palette.muted,
    "--hw-border": palette.border,
  } as CSSProperties;
}
