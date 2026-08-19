import type { Metadata } from "next";
import Link from "next/link";
import { UserProfile } from "@clerk/nextjs";
import { tgpiClerkAppearance } from "@/lib/auth/clerk-appearance";
import { requireUser } from "@/lib/auth/guards";

export const metadata: Metadata = {
  title: "Security — TGPI Global Key",
  robots: { index: false, follow: false },
};

export default async function SecurityPage() {
  await requireUser();

  return (
    <main className="min-h-[75vh] bg-[#F5F1E8] px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#956A13]">TGPI Global Key</p>
            <h1 className="mt-3 font-[var(--tgpi-font-display)] text-4xl font-semibold tracking-[-0.035em] text-[#0B1F3A] sm:text-5xl">Identity & security</h1>
          </div>
          <Link href="/profile" className="rounded-xl border border-[#D8D2C4] bg-white px-4 py-3 text-sm font-extrabold text-[#0B1F3A] transition hover:border-[#B58A2A]">Back to workspace</Link>
        </div>
        <div className="overflow-hidden rounded-[28px] border border-[#D8D2C4] bg-[#FFFDF8] p-3 shadow-[0_24px_70px_rgba(11,31,58,0.1)] sm:p-6">
          <UserProfile
            path="/profile/security"
            routing="path"
            appearance={tgpiClerkAppearance}
          />
        </div>
      </div>
    </main>
  );
}
