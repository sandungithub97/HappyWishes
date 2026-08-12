import { Great_Vibes, Libre_Franklin } from "next/font/google";
import data from "./data";
import { Experience } from "./Experience";

const display = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const body = Libre_Franklin({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
});

export default function Template() {
  return (
    <div className={`${display.variable} ${body.variable}`}>
      <Experience data={data} />
    </div>
  );
}
