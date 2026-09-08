"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  getNextSuperAppModule,
  getSuperAppModule,
  isSuperAppRouteActive,
  SUPER_APP_MODULES,
} from "@/lib/super-app";

export default function SuperAppLauncher() {
  const pathname = usePathname();
  const currentModule = getSuperAppModule(pathname);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstModuleRef = useRef<HTMLAnchorElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      window.requestAnimationFrame(() => firstModuleRef.current?.focus());
    } else if (!open && dialog.open) {
      dialog.close();
    }

    return () => {
      if (dialog.open) dialog.close();
    };
  }, [open]);

  if (!currentModule) return null;

  const nextModule = getNextSuperAppModule(currentModule.id);

  function closeLauncher() {
    setOpen(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-controls="tgpi-super-app-launcher"
        aria-expanded={open}
        aria-haspopup="dialog"
        className="fixed bottom-6 left-6 z-40 hidden min-h-14 items-center gap-3 rounded-2xl border border-[#E5B94B]/35 bg-[#06172B]/95 px-3.5 pr-5 text-left text-white shadow-[0_18px_55px_rgba(3,20,38,0.34)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-[#E5B94B]/70 hover:bg-[#0A223D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B94B] md:flex"
        onClick={() => setOpen(true)}
      >
        <span
          aria-hidden="true"
          className="grid h-10 w-10 place-items-center rounded-xl border border-[#E5B94B]/20 bg-[#E5B94B]/10 text-xl"
        >
          {currentModule.icon}
        </span>
        <span>
          <span className="block text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#F0D58C]">
            TGPI Super App
          </span>
          <span className="mt-0.5 block text-xs font-extrabold">
            {currentModule.shortLabel} · Open apps
          </span>
        </span>
      </button>

      <dialog
        ref={dialogRef}
        id="tgpi-super-app-launcher"
        aria-labelledby="tgpi-super-app-title"
        className="m-auto max-h-[92dvh] w-[min(760px,calc(100vw-32px))] overflow-hidden rounded-[32px] border border-white/10 bg-[#06111F] p-0 text-white shadow-[0_35px_120px_rgba(0,0,0,0.55)] backdrop:bg-[#020811]/80 backdrop:backdrop-blur-sm"
        onCancel={(event) => {
          event.preventDefault();
          closeLauncher();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeLauncher();
        }}
      >
        <div className="max-h-[92dvh] overflow-y-auto overscroll-contain">
          <header className="relative isolate min-h-52 overflow-hidden border-b border-white/10 p-6 sm:p-8">
            <Image
              src="/images/super-app/tgpi-intelligence-network-v1.webp"
              alt=""
              fill
              priority={false}
              sizes="(min-width: 768px) 760px, 100vw"
              className="-z-20 object-cover object-center opacity-75"
            />
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(3,14,27,0.99)_0%,rgba(3,14,27,0.92)_45%,rgba(3,14,27,0.28)_100%),linear-gradient(0deg,rgba(3,14,27,0.82),transparent)]" />
            <div className="flex items-start justify-between gap-5">
              <div className="max-w-md">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[#F0D58C]">
                  TGPI Intelligence Operating System
                </p>
                <h2
                  id="tgpi-super-app-title"
                  className="mt-4 font-[var(--tgpi-font-display)] text-4xl font-semibold leading-none sm:text-5xl"
                >
                  One system. Every global decision.
                </h2>
                <p className="mt-4 max-w-sm text-xs leading-6 text-[#C3D0DE] sm:text-sm">
                  Move between evidence, comparison, preparation and learning
                  without losing your context.
                </p>
              </div>
              <button
                type="button"
                aria-label="Close TGPI Super App launcher"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 bg-[#06111F]/65 text-xl text-white backdrop-blur transition hover:border-[#E5B94B]/60 hover:bg-[#E5B94B]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B94B]"
                onClick={closeLauncher}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
          </header>

          <div className="p-5 sm:p-7">
            <nav
              aria-label="TGPI Super App modules"
              className="grid grid-cols-2 gap-3 sm:grid-cols-3"
            >
              {SUPER_APP_MODULES.map((module, index) => {
                const active = isSuperAppRouteActive(pathname, module);
                return (
                  <Link
                    ref={index === 0 ? firstModuleRef : undefined}
                    key={module.id}
                    href={module.href}
                    aria-current={active ? "page" : undefined}
                    className={`group min-w-0 rounded-2xl border p-4 transition hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B94B] ${
                      active
                        ? "border-[#E5B94B]/55 bg-[#E5B94B]/12 shadow-[0_14px_32px_rgba(229,185,75,0.08)]"
                        : "border-white/10 bg-white/[0.035] hover:border-[#E5B94B]/30 hover:bg-white/[0.065]"
                    }`}
                    onClick={closeLauncher}
                  >
                    <span className="flex items-start justify-between gap-3">
                      <span
                        aria-hidden="true"
                        className="grid h-11 w-11 place-items-center rounded-2xl bg-white/[0.065] text-xl transition group-hover:scale-105"
                      >
                        {module.icon}
                      </span>
                      <span className="text-sm text-[#E5B94B]" aria-hidden="true">
                        {active ? "●" : "↗"}
                      </span>
                    </span>
                    <span className="mt-4 block truncate text-sm font-extrabold">
                      {module.shortLabel}
                    </span>
                    <span className="mt-1 line-clamp-2 block text-[11px] leading-5 text-[#8FA2B7]">
                      {module.description}
                    </span>
                  </Link>
                );
              })}
            </nav>

            <section className="mt-5 grid gap-4 rounded-2xl border border-[#E5B94B]/25 bg-gradient-to-r from-[#102A46] to-[#0A1828] p-5 sm:grid-cols-[1fr_auto] sm:items-center">
              <div className="min-w-0">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#F0D58C]">
                  Recommended next
                </p>
                <p className="mt-2 text-sm font-extrabold">
                  {nextModule.icon} Continue in {nextModule.label}
                </p>
                <p className="mt-1 text-xs leading-5 text-[#9FB0C2]">
                  {nextModule.description}
                </p>
              </div>
              <Link
                href={nextModule.href}
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#E5B94B] px-5 text-xs font-extrabold text-[#06172B] transition hover:-translate-y-0.5 hover:bg-[#F0CE72] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                onClick={closeLauncher}
              >
                Open next step →
              </Link>
            </section>

            <p className="mt-4 text-[10px] leading-5 text-[#71859B]">
              🔒 Your private identity and progress remain protected. TGPI does
              not turn incomplete evidence into eligibility or approval claims.
            </p>
          </div>
        </div>
      </dialog>
    </>
  );
}
