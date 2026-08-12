import { mapsOpenUrl } from "./place";
import type { TemplateData } from "./types";

export function EventJsonLd({ data }: { data: TemplateData }) {
  if (!data.event?.date) return null;

  const payload = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${data.meta.name} · ${data.people.map((person) => person.name).join(" & ")}`,
    description: data.copy.message,
    startDate: data.event.date,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: data.event.place
      ? {
          "@type": "Place",
          name: data.event.place.name,
          address: data.event.place.city,
          hasMap: mapsOpenUrl(data.event.place),
        }
      : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
