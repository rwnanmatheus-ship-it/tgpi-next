"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import TopbarUserIdentity from "@/components/TopbarUserIdentity";
import TopbarNotifications from "@/components/TopbarNotifications";
import { Container } from "@/components/design-system";

const links = [
  { label: "Countries", href: "/countries", emphasis: true },
  { label: "Compare", href: "/compare", emphasis: true },
  { label: "Learn", href: "/courses", emphasis: false },
  { label: "Documents", href: "/#global-documents", emphasis: false },
  { label: "Pricing", href: "/pricing", emphasis: false },
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
    <header className="sticky top-0 z-50 border-b border-[var(--tgpi-border)] bg-[color:rgba(255,253,248,0.94)] backdrop-blur-2xl transition-all duration-300">
      <Container>
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            compact ? "min-h-16 py-2" : "min-h-20 py-3"
          }`}
        >
          <Link href="/" className="group flex min-w-0 items-center gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[var(--tgpi-gold)] bg-[var(--tgpi-navy)] font-[var(--tgpi-font-display)] text-sm font-semibold tracking-[0.16em] text-[var(--tgpi-gold-soft)] shadow-[var(--tgpi-shadow-sm)] transition group-hover:-translate-y-0.5 group-hover:shadow-[var(--tgpi-shadow-md)]">
              TGPI
            </span>
            <span className="hidden min-w-0 sm:block">
              <span className="block truncate font-[var(--tgpi-font-display)] text-sm font-semibold uppercase tracking-[0.18em] text-[var(--tgpi-navy)]">
                The Global Polymath
              </span>
              <span className="mt-0.5 block text-[10px] font-black uppercase tracking-[0.26em] text-[var(--tgpi-gold-strong)]">
                Institute
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
            {links.map((item) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                className={`relative py-2 text-sm transition after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-[var(--tgpi-gold)] after:transition-transform hover:text-[var(--tgpi-gold-strong)] hover:after:scale-x-100 ${
                  item.emphasis
                    ? "font-black text-[var(--tgpi-navy)]"
                    : "font-semibold text-[var(--tgpi-muted)]"
                }`}
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
                  className="rounded-[var(--tgpi-radius-sm)] border border-[var(--tgpi-border)] bg-[var(--tgpi-surface)] px-4 py-2 text-sm font-bold text-[#7A1E1E] transition hover:border-[var(--tgpi-gold)] hover:bg-[var(--tgpi-gold-soft)]"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-3 py-2 text-sm font-black text-[var(--tgpi-navy)] transition hover:text-[var(--tgpi-gold-strong)]"
                >
                  Sign in
                </Link>
                <Link
                  href="/login"
                  className="rounded-[var(--tgpi-radius-sm)] border border-[var(--tgpi-navy)] bg-[var(--tgpi-navy)] px-5 py-3 text-sm font-black text-white shadow-[var(--tgpi-shadow-sm)] transition hover:border-[var(--tgpi-gold)] hover:bg-[var(--tgpi-gold)] hover:text-[var(--tgpi-ink)]"
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
            className="rounded-[var(--tgpi-radius-sm)] border border-[var(--tgpi-border)] bg-[var(--tgpi-surface)] px-4 py-2 text-sm font-black text-[var(--tgpi-navy)] shadow-[var(--tgpi-shadow-sm)] transition hover:border-[var(--tgpi-gold)] lg:hidden"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </Container>

      {menuOpen && (
        <div
          id="tgpi-mobile-menu"
          className="fixed inset-x-0 top-[65px] z-40 min-h-[calc(100vh-65px)] border-t border-[var(--tgpi-border)] bg-[var(--tgpi-canvas)] lg:hidden"
        >
          <Container className="flex min-h-[calc(100vh-65px)] flex-col py-8">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[var(--tgpi-gold-strong)]">
              Navigate TGPI
            </p>

            <nav className="mt-6 grid gap-2" aria-label="Mobile primary">
              {links.map((item) => (
                <Link
                  key={item.href + item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-[var(--tgpi-radius-md)] border border-transparent px-4 py-4 font-[var(--tgpi-font-display)] text-2xl font-semibold text-[var(--tgpi-navy)] transition hover:border-[var(--tgpi-gold)] hover:bg-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto border-t border-[var(--tgpi-border)] pt-6">
              {user ? (
                <div className="space-y-4">
                  <TopbarUserIdentity />
                  <button
                    onClick={handleLogout}
                    className="w-full rounded-[var(--tgpi-radius-sm)] border border-[var(--tgpi-border)] bg-white px-4 py-3 text-sm font-black text-[#7A1E1E]"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-[var(--tgpi-radius-sm)] border border-[var(--tgpi-border)] bg-white px-4 py-3 text-center text-sm font-black text-[var(--tgpi-navy)]"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-[var(--tgpi-radius-sm)] bg-[var(--tgpi-navy)] px-4 py-3 text-center text-sm font-black text-white"
                  >
                    Create account
                  </Link>
                </div>
              )}
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
