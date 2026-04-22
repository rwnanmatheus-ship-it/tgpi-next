"use client";

import Link from "next/link";

type NavItem = {
  label: string;
  href: string;
};

const items: NavItem[] = [
  { label: "Profile", href: "/profile" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Countries", href: "/countries" },
  { label: "Premium", href: "/premium" },
  { label: "Ranking", href: "/ranking" },
  { label: "Community", href: "/community" },
];

export default function CommandCenterNav() {
  return (
    <nav className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
      <div className="mb-3">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
          Quick Navigation
        </p>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-1 md:grid md:grid-cols-3 xl:grid-cols-6">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="min-w-[140px] rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-center text-sm font-medium text-white transition hover:border-yellow-500/40 hover:text-yellow-300"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}