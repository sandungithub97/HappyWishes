import { EB_Garamond, Great_Vibes } from "next/font/google";
import data from "./data";
import { Experience } from "./Experience";

const display = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const body = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-body",
});

export default function Template() {
  return (
    <div className={`${display.variable} ${body.variable}`}>
      <Experience data={data} />
    </div>
  );
}
