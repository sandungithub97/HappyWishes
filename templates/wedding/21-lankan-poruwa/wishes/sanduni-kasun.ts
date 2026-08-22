/**
 * PERSONALIZE THIS FILE ONLY.
 * Names, dates, copy, photos, colors, and music all live here.
 *
 * This design is written in Sinhala. Keep copy in Sinhala so the fonts
 * (Noto Serif Sinhala / Yaldevi / Gemunu Libre) read as one voice.
 *
 * Photos / music / video — use either:
 *   src: "https://..."        any image or file URL
 *   src: "/media/wedding/21-lankan-poruwa/images/wed.jpeg"
 *                             design-level folder (shared across wishes)
 *   src: "hero.jpg"           public/media/.../wishes/{wishId}/images/hero.jpg
 *
 * meta.wishId must match this filename (without .ts).
 * URL: /{occasion}/{slug}/{wishId}
 */
import type { TemplateData } from "@/templates/_shared/types";

const data: TemplateData = {
  meta: {
    occasion: "wedding",
    slug: "lankan-poruwa",
    wishId: "sanduni-kasun",
    name: "Lankan Poruwa",
    mood: "Maroon, temple gold, ivory — Kandyan ceremony in Sinhala",
    standout: "Sinhala serif names, modern sans body, pahana gate",
    buildPhase: 4,
  },
  people: [
    { name: "සඳුනි පෙරේරා", role: "මනාලිය" },
    { name: "කසුන් ජයවර්ධන", role: "මනාලයා" },
  ],
  event: {
    date: "2026-12-20T09:30:00+05:30",
    timeLabel: "2026 දෙසැම්බර් 20, ඉරිදා · උදේ 9:30",
    place: {
      name: "ටෙම්පල් ට්‍රීස් උද්‍යානය",
      city: "මහනුවර",
      mapUrl: "https://maps.google.com/?q=Temple+Trees+Garden+Kandy",
    },
  },
  copy: {
    headline: "සඳුනි සහ කසුන්",
    subhead: "ආයුබෝවන් — අපේ පෝරු මංගල්‍යයට ඔබත් ආරාධනයි",
    message:
      "දෙමාපියන්ගේ ආශීර්වාදයෙන් අපි දෙදෙනා ලංකාවේ සම්ප්‍රදාය අනුව එකතු වෙන්න යනවා. මංගල බෙර, පහන, කොස් ලී පෝරුව… මේ සුබ මොහොතට ඔබත් එක්වෙන්න.",
    cta: "එන්නවාද කියලා දන්වන්න",
  },
  palette: {
    background: "#F7F0E4",
    surface: "#FFF8EC",
    primary: "#C9A227",
    secondary: "#6B0F1A",
    accent: "#2F5D3A",
    text: "#2A1810",
    muted: "#7A5C3E",
    border: "#E2CFA8",
  },
  fonts: {
    display: "Noto Serif Sinhala",
    body: "Yaldevi",
  },
  media: {
    heroImage: {
      src: "/media/wedding/21-lankan-poruwa/images/bg_img.png",
      alt: "මනාල දෙපල",
    },
    photos: [
      {
        src: "/media/wedding/21-lankan-poruwa/images/wed.jpeg",
        alt: "සඳුනි සහ කසුන්",
      },
      {
        src: "/media/wedding/21-lankan-poruwa/images/wed2.jpg",
        alt: "අපේ මතක",
      },
      {
        src: "/media/wedding/21-lankan-poruwa/images/wed3.jpg",
        alt: "එකට එකතු වුණු මොහොත",
      },
    ],
  },
  extras: {
    rsvp: {
      enabled: true,
      note: "2026 නොවැම්බර් 1 වන දාට පෙර කරුණාකර දන්වන්න · සාම්ප්‍රදායික ඇඳුම්වලින් පැමිණෙන්න",
    },
    timeline: [
      {
        label: "01",
        title: "මංගල බෙර",
        body: "උදේ පටන් ගන්නේ මංගල බෙරෙන්. කතා කරන්න කලින්, රිද්මයෙන් එන ආශිර්වාදයක්.",
      },
      {
        label: "02",
        title: "පහන දැල්වීම",
        body: "දෙමාපියන් දෙන්නා එකතු වෙලා පහන දල්වනවා. ඒ ගිනි — අලුත් ගෙදරට එන ආලෝකය.",
      },
      {
        label: "03",
        title: "පෝරුවට නැගීම",
        body: "සරසු කළ කොස් ලී පෝරුවට දෙදෙනා නගි. පැන් වැසී, හාල් දානවා, සුදු නූලෙන් අත් බඳි.",
      },
      {
        label: "04",
        title: "ජයමංගල ගාථා",
        body: "ආශීර්වාද ගාථ හතක් කියවනවා. එක් එක් ගාථාවට දිගු, සුභ ජීවිතයක් පටන් ගන්න.",
      },
      {
        label: "05",
        title: "ඔසරිය සහ නිලමේ",
        body: "ඇය උඩරතා ඔසරිය, ඔහු නිලමේ කබාය හා මුල් අඩුව — ලංකාවේ සම්ප්‍රදායික අලංකාරය.",
      },
      {
        label: "06",
        title: "ගෙදරට යෑම",
        body: "උත්සවයෙන් පසු නව යුවළ ගෙදරට කිරිබත්, කැවිලි සමග පිළිගනි.",
      },
    ],
  },
};

export default data;
