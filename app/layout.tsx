import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { data } from "@/templates/deploy";
import { getSiteUrl } from "@/templates/_shared/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

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
  themeColor: data.palette.background,
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
