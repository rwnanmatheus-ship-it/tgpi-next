import { localizeMetadata } from "@/lib/localization/metadata.server";

import { LocalizedText } from "@/components/localization/LocaleProvider";
import { requireAdmin } from "@/lib/auth/guards";
import AnnouncementComposer from "@/components/notifications/AnnouncementComposer";
const sourceMetadata = {
  title: "Notification operations — TGPI",
  robots: { index: false, follow: false },
};
export default async function NotificationOperationsPage() {
  await requireAdmin();
  return (
    <main

      className="min-h-[75vh] bg-[var(--tgpi-canvas-alt)] px-4 py-10 text-[var(--tgpi-navy-raised)]"
    >
      <div className="mx-auto max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-widest text-[#805D19]"><LocalizedText text={"TGPI · Member communications"} /></p>
        <h1 className="mt-3 font-serif text-4xl"><LocalizedText text={"Notification operations"} /></h1>
        <AnnouncementComposer />
      </div>
    </main>
  );
}

export async function generateMetadata() { return localizeMetadata(sourceMetadata); }
