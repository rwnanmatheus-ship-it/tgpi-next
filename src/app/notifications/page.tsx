import type { Metadata } from "next";
import Link from "next/link";
import { requireUser } from "@/lib/auth/guards";

export const metadata: Metadata = {
  title: "Notifications — TGPI",
  robots: { index: false, follow: false },
};

export default async function NotificationsPage() {
  await requireUser();

  return (
    <main className="min-h-[75vh] bg-[#F5F1E8] px-4 py-12 text-[#0B1F3A] sm:px-6">
      <div className="mx-auto max-w-4xl">
        <section className="rounded-[30px] border border-[#D8D2C4] bg-[#FFFDF8] p-8 shadow-[0_24px_70px_rgba(11,31,58,0.1)] sm:p-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#956A13]">Private account channel</p>
              <h1 className="mt-3 font-[var(--tgpi-font-display)] text-5xl font-semibold tracking-[-0.04em]">Notifications</h1>
            </div>
            <Link href="/profile" className="rounded-xl border border-[#D8D2C4] bg-white px-4 py-3 text-sm font-extrabold">Back to workspace</Link>
          </div>

          <div className="mt-8 rounded-[24px] border border-dashed border-[#CFC6B5] bg-[#FAF7F0] p-8 text-center sm:p-12">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#0B1F3A] text-xl text-[#F0D58C]" aria-hidden="true">◌</span>
            <h2 className="mt-5 font-[var(--tgpi-font-display)] text-3xl font-semibold">You are all caught up.</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#657082]">Only real account, learning and country-plan events will appear here. Legacy test notifications have been removed from the authenticated experience.</p>
            <Link href="/countries" className="mt-6 inline-flex text-sm font-extrabold text-[#956A13]">Continue exploring countries →</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
