import { requireAdmin } from "@/lib/auth/guards";
import AnnouncementComposer from "@/components/notifications/AnnouncementComposer";
export const metadata = {
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
        <p className="text-xs font-bold uppercase tracking-widest text-[#805D19]">
          TGPI · Member communications
        </p>
        <h1 className="mt-3 font-serif text-4xl">Notification operations</h1>
        <AnnouncementComposer />
      </div>
    </main>
  );
}
