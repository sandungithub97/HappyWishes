import { notFound } from "next/navigation";
import { getTemplateEntry, listTemplates } from "@/templates/_shared/registry";
import { templateMetadata } from "@/templates/_shared/seo";
import { templatePath } from "@/templates/_shared/site";
import { WishChrome } from "@/templates/_shared/WishChrome";

type Props = {
  params: Promise<{ occasion: string; template: string }>;
};

export function generateStaticParams() {
  return listTemplates().map((item) => ({
    occasion: item.meta.occasion,
    template: item.meta.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { occasion, template } = await params;
  const entry = getTemplateEntry(occasion, template);
  if (!entry) return { title: "Happy Wishes" };

  return templateMetadata(
    entry.data,
    templatePath(entry.data.meta.occasion, entry.data.meta.slug),
  );
}

export default async function TemplatePage({ params }: Props) {
  const { occasion, template } = await params;
  const entry = getTemplateEntry(occasion, template);
  if (!entry) notFound();

  const Template = entry.Template;
  return (
    <>
      <Template />
      <WishChrome data={entry.data} />
    </>
  );
}
