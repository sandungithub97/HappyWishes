"use client";

import { useEffect, useState } from "react";

import { themeStyle } from "../theme";
import type { Palette } from "../types";

type Props = {
  title: string;
  text: string;
  palette: Palette;
};

export function ShareDock({ title, text, palette }: Props) {
  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  async function copy() {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  async function share() {
    if (!url) return;
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch {
        /* cancelled */
      }
    }
    await copy();
  }

  const qrSrc = url
    ? `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(url)}&margin=10`
    : null;

  return (
    <div style={themeStyle(palette)}>
      <div className="fixed bottom-5 left-5 z-50 flex gap-2 sm:bottom-8 sm:left-8">
        <button
          type="button"
          onClick={share}
          className="flex h-12 w-12 items-center justify-center rounded-full border shadow-lg backdrop-blur-md"
          style={{
            background: "color-mix(in srgb, var(--hw-surface, #fff) 88%, transparent)",
            borderColor: "var(--hw-border, #e5e5e5)",
            color: "var(--hw-primary, #c4a35a)",
          }}
          aria-label="Share this page"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="1.7" />
            <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
            <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="1.7" />
            <path d="M8.7 10.7l6.6-4.4M8.7 13.3l6.6 4.4" stroke="currentColor" strokeWidth="1.7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex h-12 w-12 items-center justify-center rounded-full border shadow-lg backdrop-blur-md"
          style={{
            background: "color-mix(in srgb, var(--hw-surface, #fff) 88%, transparent)",
            borderColor: "var(--hw-border, #e5e5e5)",
            color: "var(--hw-primary, #c4a35a)",
          }}
          aria-label="Show QR code"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6z" stroke="currentColor" strokeWidth="1.7" />
            <path d="M14 14h2v2h-2v-2zm4 0h2v6h-6v-2h4v-4z" fill="currentColor" />
          </svg>
        </button>
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-6"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="QR code"
        >
          <div
            className="w-full max-w-xs rounded-3xl p-6 text-center"
            style={{
              background: "var(--hw-surface, #fff)",
              color: "var(--hw-text, #111)",
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <p className="text-[11px] tracking-[0.28em] uppercase" style={{ color: "var(--hw-muted, #666)" }}>
              Scan to open
            </p>
            {qrSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={qrSrc} alt="QR code for this wish page" width={220} height={220} className="mx-auto mt-4" />
            ) : null}
            <button
              type="button"
              onClick={copy}
              className="mt-4 w-full rounded-full py-3 text-sm font-semibold"
              style={{ background: "var(--hw-primary, #c4a35a)", color: "var(--hw-bg, #fff)" }}
            >
              {copied ? "Link copied" : "Copy link"}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
