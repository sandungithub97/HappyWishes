import { M_PLUS_Rounded_1c, Zen_Maru_Gothic } from "next/font/google";
import data from "./data";
import { Experience } from "./Experience";

const display = M_PLUS_Rounded_1c({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-display",
});

const body = Zen_Maru_Gothic({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
});

export default function Template() {
  return (
    <div className={`${display.variable} ${body.variable}`}>
      <Experience data={data} />
    </div>
  );
}
