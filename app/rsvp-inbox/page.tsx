import { Suspense } from "react";
import { RsvpInboxClient } from "./RsvpInboxClient";

export default function RsvpInboxPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto min-h-svh max-w-2xl px-6 py-16 text-[#1f1a17]">
          <p className="text-sm text-[#8a736c]">Loading inbox…</p>
        </main>
      }
    >
      <RsvpInboxClient />
    </Suspense>
  );
}
