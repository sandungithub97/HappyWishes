import { Abhaya_Libre, Cormorant_Garamond } from "next/font/google";
import { Experience } from "./Experience";
import type { TemplateData } from "@/templates/_shared/types";

const display = Abhaya_Libre({
  subsets: ["latin", "sinhala"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-display",
});

const body = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-body",
});

export default function Template({ data }: { data: TemplateData }) {
  return (
    <div className={`${display.variable} ${body.variable}`}>
      <Experience data={data} />
    </div>
  );
}
