import { notFound } from "next/navigation";
import {
  getDefaultWish,
  getWishEntry,
  listDesigns,
} from "@/templates/_shared/catalog";
import { templateMetadata } from "@/templates/_shared/seo";
import { templatePath } from "@/templates/_shared/site";
import { WishChrome } from "@/templates/_shared/WishChrome";

type Props = {
  params: Promise<{ occasion: string; template: string }>;
};

export function generateStaticParams() {
  return listDesigns().map((design) => {
    const first = design.wishes[0]!;
    return {
      occasion: first.meta.occasion,
      template: first.meta.slug,
    };
  });
}

export async function generateMetadata({ params }: Props) {
  const { occasion, template } = await params;
  const data = getDefaultWish(occasion, template);
  if (!data) return { title: "Happy Wishes" };

  return templateMetadata(
    data,
    templatePath(data.meta.occasion, data.meta.slug, data.meta.wishId),
  );
}

/** /wedding/sakura-vows → first wish for that design */
export default async function TemplatePage({ params }: Props) {
  const { occasion, template } = await params;
  const data = getDefaultWish(occasion, template);
  if (!data) notFound();

  const entry = getWishEntry(occasion, template, data.meta.wishId);
  if (!entry) notFound();

  const Template = entry.Template;
  return (
    <>
      <Template data={entry.data} />
      <WishChrome data={entry.data} />
    </>
  );
}
