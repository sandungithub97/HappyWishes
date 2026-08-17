import {
  Gemunu_Libre,
  Noto_Serif_Sinhala,
  Yaldevi,
} from "next/font/google";
import { Experience } from "./Experience";
import type { TemplateData } from "@/templates/_shared/types";

const display = Noto_Serif_Sinhala({
  subsets: ["latin", "sinhala"],
  display: "swap",
  variable: "--font-display",
});

const body = Yaldevi({
  subsets: ["latin", "sinhala"],
  display: "swap",
  variable: "--font-body",
});

const accent = Gemunu_Libre({
  subsets: ["latin", "sinhala"],
  display: "swap",
  variable: "--font-accent",
});

export default function Template({ data }: { data: TemplateData }) {
  return (
    <div className={`${display.variable} ${body.variable} ${accent.variable}`}>
      <Experience data={data} />
    </div>
  );
}
