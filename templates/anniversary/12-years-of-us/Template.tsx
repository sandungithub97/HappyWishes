import { Figtree, Fraunces } from "next/font/google";
import { Experience } from "./Experience";
import type { TemplateData } from "@/templates/_shared/types";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

const body = Figtree({
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
