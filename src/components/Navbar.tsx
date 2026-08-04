"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import TopbarUserIdentity from "@/components/TopbarUserIdentity";
import TopbarNotifications from "@/components/TopbarNotifications";
import { Container } from "@/components/design-system";

const links = [
  { label: "Countries", href: "/countries", icon: "◎" },
  { label: "Compare", href: "/compare", icon: "⌘" },
  { label: "Learn", href: "/courses", icon: "◇" },
  { label: "Documents", href: "/#global-documents", icon: "□" },
  { label: "Pricing", href: "/pricing", icon: "◉" },
];

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  async function handleLogout() {
    await signOut(auth);
    window.location.href = "/";
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--tgpi-border-soft)] bg-[rgba(255,253,248,0.94)] backdrop-blur-2xl transition-all duration-300">
      <Container>
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            compact ? "min-h-16 py-2" : "min-h-[76px] py-3"
          }`}
        >
          <Link href="/" className="group flex min-w-0 items-center gap-3" aria-label="TGPI home">
            <span className="relative h-12 w-11 shrink-0 transition duration-300 group-hover:-translate-y-0.5">
              <Image
                src="/brand/tgpi-crest.svg"
                alt="TGPI crest"
                fill
                priority
                sizes="44px"
                className="object-contain drop-shadow-[0_6px_12px_rgba(7,26,50,0.18)]"
              />
            </span>
            <span className="min-w-0">
              <span className="block font-[var(--tgpi-font-display)] text-[1.4rem] font-bold leading-none tracking-[0.04em] text-[var(--tgpi-navy)]">
                TGPI
              </span>
              <span className="mt-1 hidden text-[8px] font-extrabold uppercase tracking-[0.23em] text-[var(--tgpi-muted)] sm:block">
                The Global Polymath Institute
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
            {links.map((item) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                className="relative py-2 text-[13px] font-bold text-[var(--tgpi-navy)] transition after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-[var(--tgpi-gold)] after:transition-transform hover:text-[var(--tgpi-gold-strong)] hover:after:scale-x-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            {user ? (
              <>
                <TopbarNotifications />
                <TopbarUserIdentity />
                <button
                  onClick={handleLogout}
                  className="rounded-[var(--tgpi-radius-sm)] border border-[var(--tgpi-border)] bg-white px-4 py-2 text-sm font-bold text-[#7A1E1E] transition hover:border-[var(--tgpi-gold)] hover:bg-[var(--tgpi-gold-soft)]"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-3 py-2 text-sm font-bold text-[var(--tgpi-navy)] transition hover:text-[var(--tgpi-gold-strong)]"
                >
                  Log in
                </Link>
                <Link
                  href="/login"
                  className="rounded-[10px] bg-[var(--tgpi-gold)] px-5 py-3 text-sm font-extrabold text-[var(--tgpi-navy)] shadow-[var(--tgpi-shadow-sm)] transition hover:-translate-y-0.5 hover:bg-[#d1a644]"
                >
                  Create account
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="tgpi-mobile-menu"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMenuOpen((previous) => !previous)}
            className="grid h-11 w-11 place-items-center rounded-full border border-[var(--tgpi-border)] bg-white text-[var(--tgpi-navy)] shadow-[var(--tgpi-shadow-sm)] transition active:scale-95 lg:hidden"
          >
            <span className="relative block h-4 w-5" aria-hidden="true">
              <span className={`absolute left-0 top-0 h-[2px] w-5 bg-current transition ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`absolute left-0 top-[7px] h-[2px] w-5 bg-current transition ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 top-[14px] h-[2px] w-5 bg-current transition ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </Container>

      {menuOpen && (
        <div
          id="tgpi-mobile-menu"
          className="fixed inset-x-0 top-[65px] z-40 min-h-[calc(100dvh-65px)] overflow-y-auto bg-[var(--tgpi-navy)] text-white lg:hidden"
        >
          <Container className="flex min-h-[calc(100dvh-65px)] flex-col py-7">
            <div className="flex items-center gap-3 border-b border-white/10 pb-6">
              <span className="relative h-12 w-11 shrink-0">
                <Image src="/brand/tgpi-crest.svg" alt="" fill sizes="44px" className="object-contain" />
              </span>
              <div>
                <p className="font-[var(--tgpi-font-display)] text-2xl font-bold tracking-[0.04em] text-white">TGPI</p>
                <p className="text-[8px] font-extrabold uppercase tracking-[0.24em] text-white/55">The Global Polymath Institute</p>
              </div>
            </div>

            <nav className="mt-6 grid" aria-label="Mobile primary">
              {links.map((item) => (
                <Link
                  key={item.href + item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-[60px] items-center justify-between border-b border-white/10 py-3 text-lg font-semibold text-white transition active:bg-white/5"
                >
                  <span className="flex items-center gap-4">
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-[var(--tgpi-gold)]/45 text-sm text-[var(--tgpi-gold)]">
                      {item.icon}
                    </span>
                    {item.label}
                  </span>
                  <span className="text-xl text-[var(--tgpi-gold)]">›</span>
                </Link>
              ))}
              <Link
                href="/premium"
                onClick={() => setMenuOpen(false)}
                className="flex min-h-[60px] items-center justify-between border-b border-white/10 py-3 text-lg font-semibold text-[var(--tgpi-gold)]"
              >
                <span className="flex items-center gap-4">
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-[var(--tgpi-gold)]/45">♛</span>
                  Premium
                </span>
                <span className="text-xl">›</span>
              </Link>
            </nav>

            <div className="mt-auto pt-8">
              {user ? (
                <div className="space-y-4">
                  <TopbarUserIdentity />
                  <button
                    onClick={handleLogout}
                    className="w-full rounded-[10px] border border-white/20 px-4 py-3 text-sm font-extrabold text-white"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="grid gap-3">
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-[10px] border border-white/20 px-4 py-3 text-center text-sm font-extrabold text-white"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-[10px] bg-[var(--tgpi-gold)] px-4 py-3 text-center text-sm font-extrabold text-[var(--tgpi-navy)] shadow-[0_14px_35px_rgba(0,0,0,0.28)]"
                  >
                    Create account
                  </Link>
                </div>
              )}
              <p className="mt-5 text-center text-[10px] leading-5 text-white/35">
                Clear decisions for a global life.
              </p>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
