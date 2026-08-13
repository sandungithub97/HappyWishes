import { getSiteUrl } from "@/templates/_shared/site";

export default function robots() {
  const site = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/gallery", "/rsvp-inbox", "/api/rsvp"],
    },
    sitemap: `${site}/sitemap.xml`,
  };
}
