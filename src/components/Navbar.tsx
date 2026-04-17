"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  async function handleLogout() {
    try {
      await signOut(auth);
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0f19]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold tracking-wide text-white">
          TGPI
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm text-slate-300 transition hover:text-white">
            Home
          </Link>

          <Link
            href="/countries"
            className="text-sm text-slate-300 transition hover:text-white"
          >
            Countries
          </Link>

          <Link
            href="/dashboard"
            className="text-sm text-slate-300 transition hover:text-white"
          >
            Dashboard
          </Link>

          <Link
            href="/profile"
            className="text-sm text-slate-300 transition hover:text-white"
          >
            Profile
          </Link>

          {user ? (
            <>
              <span className="max-w-[180px] truncate text-sm font-medium text-yellow-400">
                {user.email}
              </span>

              <button
                onClick={handleLogout}
                className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300 transition hover:bg-red-500/20"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm font-medium text-yellow-300 transition hover:bg-yellow-500/20"
            >
              Login
            </Link>
          )}
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white md:hidden"
        >
          Menu
        </button>
      </div>

      {menuOpen ? (
        <div className="border-t border-white/10 bg-[#0b0f19] px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="text-sm text-slate-300 transition hover:text-white"
            >
              Home
            </Link>

            <Link
              href="/countries"
              onClick={() => setMenuOpen(false)}
              className="text-sm text-slate-300 transition hover:text-white"
            >
              Countries
            </Link>

            <Link
              href="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="text-sm text-slate-300 transition hover:text-white"
            >
              Dashboard
            </Link>

            <Link
              href="/profile"
              onClick={() => setMenuOpen(false)}
              className="text-sm text-slate-300 transition hover:text-white"
            >
              Profile
            </Link>

            {user ? (
              <>
                <span className="text-sm font-medium text-yellow-400">
                  {user.email}
                </span>

                <button
                  onClick={handleLogout}
                  className="w-fit rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300 transition hover:bg-red-500/20"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="w-fit rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-sm font-medium text-yellow-300 transition hover:bg-yellow-500/20"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}