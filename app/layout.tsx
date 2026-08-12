import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { templateCatalog } from "@/templates/_shared/catalog";
import { getSiteUrl } from "@/templates/_shared/site";
import { LIVE_TEMPLATE } from "@/templates/live";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const live = templateCatalog[LIVE_TEMPLATE - 1];

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Happy Wishes",
    template: "%s",
  },
  description:
    "Personalized wish pages for weddings, birthdays, and anniversaries.",
  applicationName: "Happy Wishes",
};

export const viewport: Viewport = {
  themeColor: live?.palette.background ?? "#FBF7F0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
