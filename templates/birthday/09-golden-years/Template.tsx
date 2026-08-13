import { Cormorant, Lora } from "next/font/google";
import { Experience } from "./Experience";
import type { TemplateData } from "@/templates/_shared/types";

const display = Cormorant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const body = Lora({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
});

export default function Template({ data }: { data: TemplateData }) {
  return (
    <div className={`${display.variable} ${body.variable}`}>
      <Experience data={data} />
    </div>
  );
}
