import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import { Experience } from "./Experience";
import type { TemplateData } from "@/templates/_shared/types";

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const body = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

export default function Template({ data }: { data: TemplateData }) {
  return (
    <div className={`${display.variable} ${body.variable}`}>
      <Experience data={data} />
    </div>
  );
}
