import { data } from "@/templates/deploy";
import { ogContentType, ogSize, renderTemplateOg } from "@/templates/_shared/og-image";
import { firstNamesLine } from "@/templates/_shared/seo";

export const alt = `${data.meta.name} · ${firstNamesLine(data)}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return renderTemplateOg(data);
}
