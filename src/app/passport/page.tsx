import type { Metadata } from "next";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { formatTgpiGlobalId, requireUser } from "@/lib/auth/guards";

export const metadata: Metadata = {
  title: "Global Passport — TGPI",
  robots: { index: false, follow: false },
};

export default async function PassportPage() {
  const session = await requireUser();
  const user = await currentUser();
  const name = user?.fullName || user?.firstName || "Global explorer";
  const email = user?.primaryEmailAddress?.emailAddress || "Add a primary email";
  const emailVerified = user?.primaryEmailAddress?.verification?.status === "verified";
  const globalId = formatTgpiGlobalId(session.userId);

  return (
    <main className="min-h-screen bg-[#F5F1E8] px-4 py-10 text-[#0B1F3A] sm:px-6 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <section className="relative overflow-hidden rounded-[34px] bg-[#0B1F3A] p-8 text-white shadow-[0_32px_90px_rgba(11,31,58,0.2)] sm:p-12 lg:p-14">
          <div className="pointer-events-none absolute -right-28 -top-28 h-96 w-96 rounded-full border border-[#E5BF5A]/25" />
          <div className="pointer-events-none absolute right-12 top-20 h-56 w-56 rounded-full border border-[#E5BF5A]/15" />
          <div className="relative grid gap-12 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.26em] text-[#F0D58C]">TGPI Global Passport</p>
              <h1 className="mt-5 font-[var(--tgpi-font-display)] text-5xl font-semibold leading-none tracking-[-0.045em] sm:text-7xl">{name}</h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#C7D0DC]">Your private command center for global identity, readiness, country goals, learning and future verified credentials.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/onboarding" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#E5BF5A] px-5 text-sm font-extrabold text-[#0B1F3A]">Build my global plan</Link>
                <Link href="/profile/security" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 px-5 text-sm font-extrabold text-white">Identity & security</Link>
              </div>
            </div>
            <div className="rounded-[26px] border border-white/12 bg-white/[0.055] p-6 backdrop-blur-sm">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#F0D58C]">Public reference</p>
              <p className="mt-4 break-all font-[var(--tgpi-font-display)] text-3xl font-semibold">{globalId}</p>
              <div className="mt-5 border-t border-white/10 pt-5">
                <p className="text-xs text-[#AEB9C8]">Primary identity</p>
                <p className="mt-2 break-all text-sm font-bold text-white">{email}</p>
                <p className={`mt-2 text-xs font-bold ${emailVerified ? "text-[#A9E1C8]" : "text-[#F0D58C]"}`}>{emailVerified ? "Verified" : "Verification required"}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-3">
          {[
            ["Identity layer", "Secure account identity is active. Add goals and profile context through onboarding.", "/onboarding", "Complete context"],
            ["Learning layer", "Course activity and verified credentials will appear here only after real completion.", "/courses", "Explore courses"],
            ["Country layer", "Research destinations and build comparisons before saving your personal shortlist.", "/countries", "Explore countries"],
          ].map(([title, description, href, action]) => (
            <article key={title} className="rounded-[26px] border border-[#D8D2C4] bg-[#FFFDF8] p-6">
              <span className="inline-flex rounded-full bg-[#F0E7D4] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#956A13]">Ready to develop</span>
              <h2 className="mt-5 font-[var(--tgpi-font-display)] text-3xl font-semibold">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-[#657082]">{description}</p>
              <Link href={href} className="mt-6 inline-flex text-sm font-extrabold text-[#956A13]">{action} →</Link>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-[28px] border border-[#D8D2C4] bg-white p-7 sm:p-9">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#956A13]">Privacy boundary</p>
          <h2 className="mt-3 font-[var(--tgpi-font-display)] text-4xl font-semibold">A passport is context — not a credential.</h2>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-[#657082]">TGPI will only request legal documents inside a clearly identified verification or documentation workflow. They will never be accepted as a password, recovery secret or general account identifier.</p>
        </section>
      </div>
    </main>
  );
}
