import { ImageResponse } from "next/og";
import { firstNamesLine } from "./seo";
import { OCCASION_LABELS } from "./types";
import type { TemplateData } from "./types";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export function renderTemplateOg(data: TemplateData) {
  const names = firstNamesLine(data);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: data.palette.background,
          color: data.palette.text,
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 8,
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            background: data.palette.primary,
          }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              letterSpacing: 10,
              textTransform: "uppercase",
              color: data.palette.primary,
            }}
          >
            {OCCASION_LABELS[data.meta.occasion]}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              marginTop: 28,
              lineHeight: 1.05,
              color: data.palette.secondary,
            }}
          >
            {names}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              marginTop: 22,
              color: data.palette.muted,
              maxWidth: 920,
            }}
          >
            {data.copy.headline}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 22,
            color: data.palette.muted,
          }}
        >
          <div style={{ display: "flex" }}>
            {data.event?.timeLabel ?? data.meta.mood}
          </div>
          <div style={{ display: "flex" }}>Happy Wishes</div>
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
