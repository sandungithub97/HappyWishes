import { listTemplates } from "@/templates/_shared/catalog";
import { getSiteUrl, templatePath } from "@/templates/_shared/site";

export default function sitemap() {
  const site = getSiteUrl();
  const now = new Date();

  return [
    { url: site, lastModified: now },
    ...listTemplates().map((item) => ({
      url: `${site}${templatePath(item.meta.occasion, item.meta.slug)}`,
      lastModified: now,
    })),
  ];
}
