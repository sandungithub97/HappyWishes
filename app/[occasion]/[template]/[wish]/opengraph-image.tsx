import { getWishData } from "@/templates/_shared/catalog";
import { ogContentType, ogSize, renderTemplateOg } from "@/templates/_shared/og-image";

type Props = {
  params: Promise<{ occasion: string; template: string; wish: string }>;
};

export const alt = "Happy Wishes";
export const size = ogSize;
export const contentType = ogContentType;

export default async function OpenGraphImage({ params }: Props) {
  const { occasion, template, wish } = await params;
  const data = getWishData(occasion, template, wish);
  if (!data) {
    return new Response("Not found", { status: 404 });
  }
  return renderTemplateOg(data);
}
