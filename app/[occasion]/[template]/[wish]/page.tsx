import { notFound } from "next/navigation";
import { getWishEntry, listTemplates } from "@/templates/_shared/catalog";
import { templateMetadata } from "@/templates/_shared/seo";
import { templatePath } from "@/templates/_shared/site";
import { WishChrome } from "@/templates/_shared/WishChrome";

type Props = {
  params: Promise<{ occasion: string; template: string; wish: string }>;
};

export function generateStaticParams() {
  return listTemplates().map((item) => ({
    occasion: item.meta.occasion,
    template: item.meta.slug,
    wish: item.meta.wishId,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { occasion, template, wish } = await params;
  const entry = getWishEntry(occasion, template, wish);
  if (!entry) return { title: "Happy Wishes" };

  return templateMetadata(
    entry.data,
    templatePath(
      entry.data.meta.occasion,
      entry.data.meta.slug,
      entry.data.meta.wishId,
    ),
  );
}

/** /wedding/sakura-vows/shehani-lasith */
export default async function WishPage({ params }: Props) {
  const { occasion, template, wish } = await params;
  const entry = getWishEntry(occasion, template, wish);
  if (!entry) notFound();

  const Template = entry.Template;
  return (
    <>
      <Template data={entry.data} />
      <WishChrome data={entry.data} />
    </>
  );
}
