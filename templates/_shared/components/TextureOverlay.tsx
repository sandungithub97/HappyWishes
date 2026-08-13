"use client";

type Variant = "grain" | "paper" | "washi" | "vignette";

type Props = {
  variant?: Variant;
  opacity?: number;
  className?: string;
};

export function TextureOverlay({
  variant = "grain",
  opacity = 0.35,
  className,
}: Props) {
  if (variant === "vignette") {
    return (
      <div
        className={`pointer-events-none absolute inset-0 z-[5] ${className ?? ""}`}
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.28) 100%)",
          opacity,
        }}
      />
    );
  }

  if (variant === "paper" || variant === "washi") {
    return (
      <div
        className={`pointer-events-none absolute inset-0 z-[5] ${className ?? ""}`}
        aria-hidden
        style={{
          opacity,
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(140,110,70,0.06) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(120,90,50,0.05) 0%, transparent 45%),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(90,70,40,0.015) 2px,
              rgba(90,70,40,0.015) 3px
            )
          `,
          mixBlendMode: "multiply",
        }}
      />
    );
  }

  // grain — CSS noise approximation
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-[5] ${className ?? ""}`}
      aria-hidden
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E")`,
        backgroundSize: "180px 180px",
        mixBlendMode: "overlay",
      }}
    />
  );
}
