import { EventJsonLd } from "./EventJsonLd";
import { ShareDock } from "./components/ShareDock";
import { namesLineFull } from "./seo";
import type { TemplateData } from "./types";

export function WishChrome({ data }: { data: TemplateData }) {
  const names = namesLineFull(data);

  return (
    <>
      <EventJsonLd data={data} />
      <ShareDock
        title={`${data.meta.name} · ${names}`}
        text={data.copy.message}
        palette={data.palette}
      />
    </>
  );
}
