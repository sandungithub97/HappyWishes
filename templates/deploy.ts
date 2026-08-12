import { LIVE_TEMPLATE } from "./live";
import { templateRegistry } from "./_shared/registry";

const total = templateRegistry.length;
if (LIVE_TEMPLATE < 1 || LIVE_TEMPLATE > total) {
  throw new Error(`LIVE_TEMPLATE must be a number from 1 to ${total}`);
}

const live = templateRegistry[LIVE_TEMPLATE - 1]!;

export { LIVE_TEMPLATE };
export const data = live.data;
export const Template = live.Template;

export const deploy = {
  occasion: data.meta.occasion,
  slug: data.meta.slug,
  number: LIVE_TEMPLATE,
} as const;
