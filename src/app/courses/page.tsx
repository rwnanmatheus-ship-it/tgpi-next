import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CapabilitySystemRail from "@/components/capability/CapabilitySystemRail";
import LearningPathExplorer from "@/components/courses/LearningPathExplorer";
import TGPIPageShell from "@/components/TGPIPageShell";
import { coursesOverview } from "@/data/courses-overview";

export const metadata: Metadata = {
  title: "TGPI Learning — Practical Skills for a Global Life",
  description: "Explore practical courses in global English, country selection, relocation budgeting and international career readiness. Build a plan you can act on.",
};

export default function CoursesPage() {
  const catalog = [...coursesOverview].sort((a, b) => Number(b.id === "global-english-2026") - Number(a.id === "global-english-2026"));
  const available = catalog.filter(course => course.status === "available");
  return <TGPIPageShell width="capability">
    <nav aria-label="Learning navigation" className="flex min-h-12 flex-wrap items-center justify-between gap-3 py-3 text-sm font-semibold text-[var(--tgpi-navy)]"><span>TGPI / Learning</span><div className="flex gap-5"><Link href="/dashboard">My workspace</Link><Link href="/certificates">Certificates ↗</Link></div></nav>
    <section className="relative isolate overflow-hidden rounded-[26px] border border-white/10 bg-[#0B1F3A] text-white shadow-xl sm:rounded-[32px]" aria-labelledby="learning-title">
      <Image src="/images/learning/tgpi-learning-hero-v2.webp" alt="TGPI global learning observatory with an illuminated world atlas" fill priority sizes="100vw" className="object-cover object-right" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,20,39,.98),rgba(5,20,39,.9)_48%,rgba(5,20,39,.45))]" />
      <div className="relative grid gap-8 p-7 sm:p-10 lg:grid-cols-[1fr_240px] lg:items-end lg:p-12">
        <div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#E4C779]">TGPI Learning · Practical by design</p><h1 id="learning-title" className="mt-4 text-[clamp(2rem,4.1vw,3.65rem)] font-semibold leading-[1.06] tracking-[-.04em]">Build skills.<br />Expand your world.</h1><p className="mt-5 max-w-xl text-base leading-7 text-[#DAE2EC]">Choose your next country with clarity. Prepare your finances, strengthen your English and build a career that travels.</p><Link href="#learning-paths" className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#DFC06F] px-6 text-sm font-bold text-[#0B1F3A] transition hover:bg-[#EED595] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Explore the courses ↓</Link></div>
        <aside className="grid grid-cols-2 gap-4 rounded-2xl border border-white/20 bg-[#07182D]/75 p-5 backdrop-blur-sm lg:grid-cols-1"><div><p className="text-3xl font-semibold text-[#E4C779]">{String(available.length).padStart(2,"0")}</p><p className="mt-1 text-sm text-[#DAE2EC]">Courses available</p></div><div className="lg:border-t lg:border-white/15 lg:pt-4"><p className="text-3xl font-semibold text-[#E4C779]">01</p><p className="mt-1 text-sm text-[#DAE2EC]">Connected learning profile</p></div></aside>
      </div>
    </section>
    <LearningPathExplorer courses={catalog} />
    <div className="mt-8"><CapabilitySystemRail active="learning" /></div>
  </TGPIPageShell>;
}
