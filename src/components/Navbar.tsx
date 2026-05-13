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
    <header className="sticky top-0 z-50 border-b border-[#E7E0D3] bg-[#FFFDF8]/90 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-black tracking-[0.18em] text-[#111827]">
          TGPI
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((item) => (
            <Link
              key={item.href + item.label}
              href={item.href}
              className="text-sm font-semibold text-[#5B6472] transition hover:text-[#9A6A12]"
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
                className="rounded-2xl border border-[#E7E0D3] bg-white px-4 py-2 text-sm font-bold text-[#7A1E1E] shadow-sm transition hover:border-[#D9BD70] hover:bg-[#FFF7DE]"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-2xl border border-[#D9BD70] bg-[#FFF7DE] px-4 py-2 text-sm font-bold text-[#8A5B09] transition hover:bg-[#F8E7B4]"
              >
                Sign in
              </Link>

              <Link
                href="/login"
                className="rounded-2xl border border-[#E7E0D3] bg-white px-4 py-2 text-sm font-bold text-[#111827] shadow-sm transition hover:border-[#123A6F]/20 hover:bg-[#EEF5FF]"
              >
                Create account
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="rounded-2xl border border-[#E7E0D3] bg-white px-4 py-2 text-sm font-semibold text-[#111827] shadow-sm md:hidden"
        >
          Menu
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-[#E7E0D3] bg-[#FFFDF8] px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((item) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-[#5B6472] hover:text-[#9A6A12]"
              >
                {item.label}
              </Link>
            ))}

            {user ? (
              <>
                <TopbarUserIdentity />
                <button
                  onClick={handleLogout}
                  className="rounded-2xl border border-[#E7E0D3] bg-white px-4 py-2 text-sm font-bold text-[#7A1E1E]"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="rounded-2xl border border-[#D9BD70] bg-[#FFF7DE] px-4 py-2 text-sm font-bold text-[#8A5B09]"
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
