"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  getNextSuperAppModule,
  getSuperAppModule,
  isSuperAppRouteActive,
  searchSuperAppModules,
  SUPER_APP_MODULES,
  SUPER_APP_OPEN_EVENT,
} from "@/lib/super-app";

export default function SuperAppLauncher() {
  const pathname = usePathname();
  const currentModule = getSuperAppModule(pathname);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    function openLauncher() {
      restoreFocusRef.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      setOpen(true);
    }

    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openLauncher();
      }
    }

    window.addEventListener(SUPER_APP_OPEN_EVENT, openLauncher);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener(SUPER_APP_OPEN_EVENT, openLauncher);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      window.requestAnimationFrame(() => searchRef.current?.focus());
    } else if (!open && dialog.open) {
      dialog.close();
    }

    return () => {
      if (dialog.open) dialog.close();
    };
  }, [open]);

  const nextModule = currentModule
    ? getNextSuperAppModule(currentModule.id)
    : SUPER_APP_MODULES[0];
  const visibleModules = searchSuperAppModules(query);

  function closeLauncher() {
    setOpen(false);
    setQuery("");
    window.requestAnimationFrame(() => restoreFocusRef.current?.focus());
  }

  return (
    <>
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
            <label
              htmlFor="tgpi-super-app-search"
              className="flex min-h-14 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.055] px-4 text-[#C8D4E0] transition focus-within:border-[#E5B94B]/55 focus-within:bg-white/[0.075]"
            >
              <span aria-hidden="true" className="text-lg">⌕</span>
              <span className="sr-only">Find a TGPI app</span>
              <input
                ref={searchRef}
                id="tgpi-super-app-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Find an app, action or destination…"
                autoComplete="off"
                className="min-w-0 flex-1 bg-transparent py-3 text-base font-semibold text-white outline-none placeholder:text-[#73869B]"
              />
              <kbd className="hidden rounded-lg border border-white/10 bg-black/20 px-2 py-1 text-[10px] font-bold text-[#91A2B5] sm:inline">⌘ K</kbd>
            </label>

            <nav
              aria-label="TGPI Super App modules"
              className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3"
            >
              {visibleModules.map((module) => {
                const active = isSuperAppRouteActive(pathname, module);
                return (
                  <Link
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

            {visibleModules.length === 0 ? (
              <div className="mt-5 rounded-2xl border border-dashed border-white/15 px-5 py-8 text-center">
                <p className="text-sm font-extrabold text-white">No TGPI app matches “{query.trim()}”.</p>
                <p className="mt-2 text-xs leading-5 text-[#8799AC]">Try countries, documents, plan, learning or security.</p>
              </div>
            ) : null}

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
