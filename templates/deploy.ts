import { LIVE_TEMPLATE, LIVE_WISH } from "./live";
import { designCatalog } from "./_shared/catalog";

const design = designCatalog[LIVE_TEMPLATE - 1];
if (!design) {
  throw new Error(`LIVE_TEMPLATE must be a number from 1 to ${designCatalog.length}`);
}

const liveWish =
  design.wishes.find((wish) => wish.meta.wishId === LIVE_WISH) ??
  design.wishes[0];

if (!liveWish) {
  throw new Error(`No wishes found for template #${LIVE_TEMPLATE}`);
}

export { LIVE_TEMPLATE, LIVE_WISH };
export const data = liveWish;
export const Template = design.Template;

export const deploy = {
  occasion: data.meta.occasion,
  slug: data.meta.slug,
  wishId: data.meta.wishId,
  number: LIVE_TEMPLATE,
} as const;
