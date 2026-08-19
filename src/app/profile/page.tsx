import type { Metadata } from "next";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { formatTgpiGlobalId, requireUser } from "@/lib/auth/guards";

export const metadata: Metadata = {
  title: "My global workspace — TGPI",
  robots: { index: false, follow: false },
};

const nextActions = [
  {
    eyebrow: "Discover",
    title: "Explore country intelligence",
    description: "Search 195 countries and open the intelligence report that matches your interests.",
    href: "/countries",
    action: "Open country atlas",
  },
  {
    eyebrow: "Decide",
    title: "Build a country comparison",
    description: "Compare the trade-offs that matter to your study, work, travel or relocation plan.",
    href: "/compare",
    action: "Compare countries",
  },
  {
    eyebrow: "Develop",
    title: "Start a learning path",
    description: "Turn global curiosity into structured knowledge and future verified credentials.",
    href: "/courses",
    action: "Explore learning",
  },
] as const;

export default async function ProfilePage() {
  const session = await requireUser();
  const user = await currentUser();
  const name = user?.fullName || user?.firstName || "Global explorer";
  const email = user?.primaryEmailAddress?.emailAddress || "No primary email";
  const emailVerified = user?.primaryEmailAddress?.verification?.status === "verified";
  const globalId = formatTgpiGlobalId(session.userId);

  return (
    <main className="min-h-screen bg-[#F5F1E8] text-[#0B1F3A]">
      <section className="border-b border-[#D8D2C4] bg-[#FFFDF8] px-4 py-10 sm:px-6 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#956A13]">TGPI Global Workspace</p>
              <h1 className="mt-4 font-[var(--tgpi-font-display)] text-5xl font-semibold leading-none tracking-[-0.04em] sm:text-6xl">Welcome, {name}.</h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#657082]">Your secure starting point for country intelligence, global decisions and learning progress.</p>
            </div>
            <Link href="/profile/security" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#D8D2C4] bg-white px-5 text-sm font-extrabold text-[#0B1F3A] transition hover:border-[#B58A2A]">Manage Global Key</Link>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-[1.4fr_.8fr_.8fr]">
            <article className="rounded-[26px] bg-[#0B1F3A] p-6 text-white shadow-[0_22px_55px_rgba(11,31,58,0.17)] sm:p-7">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#F0D58C]">TGPI Global ID</p>
              <p className="mt-4 break-all font-[var(--tgpi-font-display)] text-3xl font-semibold tracking-[0.02em]">{globalId}</p>
              <p className="mt-3 text-sm leading-6 text-[#C7D0DC]">A public identity reference. It is never used as a password or security secret.</p>
            </article>
            <article className="rounded-[26px] border border-[#D8D2C4] bg-white p-6">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#7A8390]">Primary identity</p>
              <p className="mt-4 truncate text-sm font-extrabold text-[#0B1F3A]">{email}</p>
              <p className={`mt-3 text-xs font-bold ${emailVerified ? "text-[#277352]" : "text-[#9A6010]"}`}>{emailVerified ? "Verified email" : "Verification required"}</p>
            </article>
            <article className="rounded-[26px] border border-[#D8D2C4] bg-white p-6">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#7A8390]">Account protection</p>
              <p className="mt-4 text-lg font-extrabold text-[#0B1F3A]">Session protected</p>
              <Link href="/profile/security" className="mt-3 inline-flex text-xs font-extrabold text-[#956A13]">Review devices & methods →</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 xl:grid-cols-[1fr_320px]">
            <div>
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#956A13]">Continue your journey</p>
                  <h2 className="mt-3 font-[var(--tgpi-font-display)] text-4xl font-semibold tracking-[-0.035em]">Choose your next move.</h2>
                </div>
                <Link href="/onboarding" className="text-sm font-extrabold text-[#956A13]">Personalize my plan →</Link>
              </div>

              <div className="mt-7 grid gap-4 md:grid-cols-3">
                {nextActions.map((item, index) => (
                  <Link key={item.href} href={item.href} className="group flex min-h-[290px] flex-col rounded-[26px] border border-[#D8D2C4] bg-[#FFFDF8] p-6 transition hover:-translate-y-1 hover:border-[#B58A2A] hover:shadow-[0_20px_50px_rgba(11,31,58,0.1)]">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#956A13]">{item.eyebrow}</p>
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-[#F0E7D4] text-xs font-extrabold text-[#0B1F3A]">0{index + 1}</span>
                    </div>
                    <h3 className="mt-7 font-[var(--tgpi-font-display)] text-3xl font-semibold leading-[1.05]">{item.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-[#657082]">{item.description}</p>
                    <span className="mt-auto pt-7 text-sm font-extrabold text-[#0B1F3A]">{item.action} <span className="text-[#B58A2A] transition group-hover:translate-x-1">→</span></span>
                  </Link>
                ))}
              </div>
            </div>

            <aside className="rounded-[28px] bg-[#0B1F3A] p-7 text-white shadow-[0_22px_60px_rgba(11,31,58,0.16)]">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#F0D58C]">Private by design</p>
              <h2 className="mt-4 font-[var(--tgpi-font-display)] text-3xl font-semibold leading-tight">Your identity is separate from your documents.</h2>
              <p className="mt-4 text-sm leading-7 text-[#C7D0DC]">TGPI uses secure authentication for access. Passports and identity documents belong only in explicit, encrypted verification workflows — never in a login field.</p>
              <div className="mt-7 grid gap-3">
                {["Encrypted session management", "Device and account controls", "Optional multi-factor methods", "No document-as-password design"].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-bold text-[#E6EBF1]">
                    <span className="h-2 w-2 rounded-full bg-[#E5BF5A]" />{item}
                  </div>
                ))}
              </div>
              <Link href="/profile/security" className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#E5BF5A] px-5 text-sm font-extrabold text-[#0B1F3A]">Open security center</Link>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
