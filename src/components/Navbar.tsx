"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import TopbarUserIdentity from "@/components/TopbarUserIdentity";
import TopbarNotifications from "@/components/TopbarNotifications";

const links = [
  { label: "Home", href: "/" },
  { label: "Countries", href: "/countries" },
  { label: "Courses", href: "/courses" },
  { label: "Dashboard", href: "/profile" },
  { label: "Ranking", href: "/ranking" },
  { label: "Community", href: "/community" },
  { label: "Profile", href: "/profile" },
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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#020617]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-bold text-white">
          TGPI
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((item) => (
            <Link
              key={item.href + item.label}
              href={item.href}
              className="text-sm font-medium text-slate-300 transition hover:text-yellow-400"
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
                className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-200 hover:bg-red-500/20"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-xl border border-yellow-500/30 px-4 py-2 text-sm font-semibold text-yellow-400 hover:bg-yellow-500/10"
              >
                Sign in
              </Link>

              <Link
                href="/login"
                className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/5"
              >
                Create account
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white md:hidden"
        >
          Menu
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-white/10 bg-[#020617] px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((item) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-slate-300 hover:text-yellow-400"
              >
                {item.label}
              </Link>
            ))}

            {user ? (
              <>
                <TopbarUserIdentity />
                <button
                  onClick={handleLogout}
                  className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl border border-yellow-500/30 px-4 py-2 text-sm font-semibold text-yellow-400"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}