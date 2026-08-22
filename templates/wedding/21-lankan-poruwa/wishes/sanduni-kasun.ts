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
    subhead: "ආයුබෝවන් · අපේ පෝරුවට ඔබව ආරාධනා කරනවා",
    message:
      "අපේ දෙමාපියන්ගේ ආශීර්වාදයෙන් මේ ජීවිතය අපි ආරම්භ කරනවා ශ්‍රී ලාංකේය සම්ප්‍රදායෙන් — බෙර, පහන, කොස් ලී පෝරුව, සහ අපව හදා වඩා ගත් අය සමඟ.",
    cta: "පැමිණීම තහවුරු කරන්න",
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
      alt: "මනාල දඹයා",
    },
    photos: [
      {
        src: "/media/wedding/21-lankan-poruwa/images/wed.jpeg",
        alt: "සඳුනි සහ කසුන්",
      },
      {
        src: "/media/wedding/21-lankan-poruwa/images/wed2.jpg",
        alt: "අපේ මතකය",
      },
      {
        src: "/media/wedding/21-lankan-poruwa/images/wed3.jpg",
        alt: "එකට එකතු වූ අවස්ථාව",
      },
    ],
  },
  extras: {
    rsvp: {
      enabled: true,
      note: "කරුණාකර 2026 නොවැම්බර් 1 වනදාට පෙර පිළිතුරු දෙන්න · සාම්ප්‍රදායික ඇඳුම් සාදරයෙන් පිළිගනිමු",
    },
    timeline: [
      {
        label: "01",
        title: "මඟුල් බෙර",
        body: "උදෑසන ආරම්භ වන්නේ මංගල බෙරයෙන් — කතා කිරීමට පෙර රිද්මයෙන් ලැබෙන ආශීර්වාදයක්.",
      },
      {
        label: "02",
        title: "පහන",
        body: "දෙමාපියන් එකට පහන දල්වනවා. ඒ ගිනිදැල්ල පළමු ආගන්තුකයා — ඔවුන් රැක ගන්නා ගෙදරට එන ආලෝකය.",
      },
      {
        label: "03",
        title: "පෝරුව මංගල්‍යය",
        body: "මනාලිය සහ මනාලයා සරසන ලද දැවමය පෝරුවට නගිනවා. පැන් වත් කරනවා, හාල් පූජා කරනවා, අත් සුදු නූලකින් බඳිනවා.",
      },
      {
        label: "04",
        title: "ජයමංගල ගාථා",
        body: "ආශීර්වාදයේ ගාථා හතක් කියවනවා. එක එකක් දිගු, ගෞරවනීය එකට ජීවිතයක් පතනවා.",
      },
      {
        label: "05",
        title: "ඔසරිය සහ නිලමේ",
        body: "ඇය උඩරට ඔසරිය පැළඳනවා; ඔහු නිලමේ කබාය සහ මුල් අඳුම — පාට, රන්, දිවයිනේ විධිමත් අලංකාරය.",
      },
      {
        label: "06",
        title: "ගෙදරට එනවා",
        body: "උත්සවයෙන් පසු නව යුවළ කිරිබත්, කැවිලි, සහ බලා සිටි ගෙදරක උණුසුම සමඟ පිළිගන්නවා.",
      },
    ],
  },
};

export default data;
