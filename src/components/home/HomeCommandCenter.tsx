"use client";

import { Show } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import NavigationIcon from "@/components/navigation/NavigationIcon";

const workspaceCards = [
  ["Shortlist", "Your countries and decision context", "globe"],
  ["Next actions", "Research, prepare and learn", "target"],
  ["Progress", "Capability and credential continuity", "graph"],
] as const;

export default function HomeCommandCenter() {
  return (
    <section className="relative overflow-hidden bg-[var(--tgpi-navy)] px-4 py-16 text-white sm:px-6 sm:py-24 lg:px-8" aria-labelledby="command-center-title">
      <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_10%_5%,rgba(196,149,54,.18),transparent_24%),radial-gradient(circle_at_92%_75%,rgba(36,87,127,.3),transparent_28%)]" />
      <div className="relative mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[.76fr_1.24fr] lg:items-center">
        <div className="max-w-xl">
          <p className="text-[10px] font-extrabold uppercase tracking-[.24em] text-[var(--tgpi-gold-light)]">Your personal command center</p>
          <h2 id="command-center-title" className="mt-4 font-[var(--tgpi-font-display)] text-[clamp(2.8rem,5.3vw,5rem)] font-semibold leading-[.93] tracking-[-.05em]">Keep every next move connected.</h2>
          <p className="mt-5 text-base leading-8 text-[#CFDAE6]">Your shortlist, decisions, document preparation, learning progress and verified credentials meet inside one private workspace.</p>
          <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
            <Show when="signed-out">
              <Link href="/sign-up" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-[var(--tgpi-gold)] px-6 text-sm font-extrabold text-[var(--tgpi-navy-deep)] transition hover:-translate-y-0.5 hover:bg-[var(--tgpi-gold-light)]">Create my Global Key <NavigationIcon name="key" width={18} height={18} /></Link>
              <Link href="/sign-in" className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-white/20 px-6 text-sm font-extrabold text-white transition hover:border-[var(--tgpi-gold-light)] hover:text-[var(--tgpi-gold-light)]">Sign in</Link>
            </Show>
            <Show when="signed-in">
              <Link href="/profile" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-[var(--tgpi-gold)] px-6 text-sm font-extrabold text-[var(--tgpi-navy-deep)] transition hover:-translate-y-0.5 hover:bg-[var(--tgpi-gold-light)]">Open my workspace <NavigationIcon name="arrow" width={18} height={18} /></Link>
              <Link href="/global-key" className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-white/20 px-6 text-sm font-extrabold text-white transition hover:border-[var(--tgpi-gold-light)] hover:text-[var(--tgpi-gold-light)]">View Global Key</Link>
            </Show>
          </div>
          <p className="mt-5 text-xs leading-6 text-white/45">Public exploration remains available without an account. A Global Key connects your private progress when you choose to create one.</p>
        </div>

        <div className="tgpi-card-3d relative min-w-0 overflow-hidden rounded-[32px] border border-white/14 bg-[#071a32] p-3 shadow-[0_40px_110px_rgba(0,0,0,.34)] sm:p-5" data-tgpi-depth="hero" data-tgpi-tone="navy">
          <div className="relative aspect-[16/10] min-h-[430px] overflow-hidden rounded-[24px] border border-white/10 sm:min-h-0">
            <Image src="/images/pricing/tgpi-premium-command-center.webp" alt="TGPI personal command center interface" fill quality={88} sizes="(max-width:1023px) 92vw, 720px" className="object-cover object-center opacity-62" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,20,38,.96),rgba(3,20,38,.52)),linear-gradient(0deg,rgba(3,20,38,.94),transparent_65%)]" />
            <div className="absolute inset-0 flex flex-col p-4 sm:p-6">
              <div className="flex items-center justify-between gap-3"><div><p className="text-[9px] font-extrabold uppercase tracking-[.2em] text-[var(--tgpi-gold-light)]">Workspace preview</p><p className="mt-2 font-[var(--tgpi-font-display)] text-2xl font-semibold sm:text-3xl">Global Plan · Command Center</p></div><span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-white/12 bg-white/[.06] text-[var(--tgpi-gold-light)]"><NavigationIcon name="apps" /></span></div>
              <div className="mt-auto grid gap-3 sm:grid-cols-3">
                {workspaceCards.map(([title, detail, icon]) => (
                  <div key={title} className="rounded-2xl border border-white/12 bg-[#031426]/76 p-4 backdrop-blur-xl"><NavigationIcon name={icon as "globe" | "target" | "graph"} width={18} height={18} className="text-[var(--tgpi-gold-light)]" /><p className="mt-4 text-sm font-extrabold">{title}</p><p className="mt-2 text-[10px] leading-5 text-white/48">{detail}</p></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-12 grid max-w-[1280px] gap-3 border-t border-white/10 pt-8 sm:grid-cols-3">
        {[{ icon: "graph" as const, title: "Source-linked", copy: "Evidence retains producer, reference year and limitations." }, { icon: "shield" as const, title: "Method visible", copy: "Weights, gaps and uncertainty remain explicit." }, { icon: "certificate" as const, title: "Proof verifiable", copy: "Issued TGPI credentials have public verification routes." }].map((item) => (
          <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[.035] p-5"><span className="grid h-10 w-10 place-items-center rounded-xl bg-white/[.06] text-[var(--tgpi-gold-light)]"><NavigationIcon name={item.icon} width={19} height={19} /></span><h3 className="mt-4 font-[var(--tgpi-font-display)] text-2xl font-semibold">{item.title}</h3><p className="mt-2 text-xs leading-6 text-white/48">{item.copy}</p></div>
        ))}
      </div>
    </section>
  );
}
