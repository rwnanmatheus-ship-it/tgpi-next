"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import TopbarUserIdentity from "@/components/TopbarUserIdentity";
import TopbarNotifications from "@/components/TopbarNotifications";

const links = [
  { label: "Countries", href: "/countries" },
  { label: "Compare", href: "/compare" },
  { label: "Learn", href: "/courses" },
  { label: "Documents", href: "/#global-documents" },
  { label: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, []);

  async function handleLogout() {
    await signOut(auth);
    window.location.href = "/";
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#D8D2C4] bg-[#FFFDF8]/92 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full border border-[#B58A2A] bg-[#0B1F3A] font-serif text-sm font-semibold tracking-[0.13em] text-[#F0D58C] shadow-sm">
            TGPI
          </span>
          <span className="hidden lg:block">
            <span className="block text-xs font-black uppercase tracking-[0.2em] text-[#0B1F3A]">
              The Global Polymath
            </span>
            <span className="mt-0.5 block text-[10px] font-bold uppercase tracking-[0.23em] text-[#8A6A27]">
              Institute
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((item) => (
            <Link
              key={item.href + item.label}
              href={item.href}
              className="text-sm font-semibold text-[#566070] transition hover:text-[#9A6A12]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <TopbarNotifications />
              <TopbarUserIdentity />
              <button
                onClick={handleLogout}
                className="rounded-xl border border-[#D8D2C4] bg-white px-4 py-2 text-sm font-bold text-[#7A1E1E] shadow-sm transition hover:border-[#D9BD70] hover:bg-[#FFF7DE]"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-3 py-2 text-sm font-bold text-[#0B1F3A] transition hover:text-[#B58A2A]"
              >
                Sign in
              </Link>
              <Link
                href="/login"
                className="rounded-xl bg-[#0B1F3A] px-4 py-2.5 text-sm font-black text-white shadow-sm transition hover:bg-[#132B4C]"
              >
                Create account
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
          onClick={() => setMenuOpen((previous) => !previous)}
          className="rounded-xl border border-[#D8D2C4] bg-white px-4 py-2 text-sm font-semibold text-[#0B1F3A] shadow-sm md:hidden"
        >
          Menu
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-[#D8D2C4] bg-[#FFFDF8] px-6 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((item) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-bold text-[#566070] hover:text-[#9A6A12]"
              >
                {item.label}
              </Link>
            ))}

            <div className="mt-2 border-t border-[#D8D2C4] pt-4">
              {user ? (
                <div className="space-y-3">
                  <TopbarUserIdentity />
                  <button
                    onClick={handleLogout}
                    className="w-full rounded-xl border border-[#D8D2C4] bg-white px-4 py-3 text-sm font-bold text-[#7A1E1E]"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="grid gap-3">
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-xl border border-[#D8D2C4] bg-white px-4 py-3 text-center text-sm font-bold text-[#0B1F3A]"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-xl bg-[#0B1F3A] px-4 py-3 text-center text-sm font-black text-white"
                  >
                    Create account
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
