import type { Metadata } from "next";
import { data, Template } from "@/templates/deploy";
import { templateMetadata } from "@/templates/_shared/seo";
import { WishChrome } from "@/templates/_shared/WishChrome";

export const metadata: Metadata = templateMetadata(data, "/");

export default function Home() {
  return (
    <>
      <Template data={data} />
      <WishChrome data={data} />
    </>
  );
}
