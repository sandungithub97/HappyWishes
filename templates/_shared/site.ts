export function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
    /\/$/,
    "",
  );
}

export function templatePath(occasion: string, slug: string, wishId?: string) {
  const base = `/${occasion}/${slug}`;
  return wishId ? `${base}/${wishId}` : base;
}
