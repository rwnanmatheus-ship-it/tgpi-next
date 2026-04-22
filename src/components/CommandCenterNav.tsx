"use client";

import Link from "next/link";

const items = [
  { label: "Profile", href: "/profile" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Countries", href: "/countries" },
  { label: "Premium", href: "/premium" },
  { label: "Ranking", href: "/ranking" },
  { label: "Community", href: "/community" },
];

export default function CommandCenterNav() {
  return (
    <nav className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950 to-slate-900 p-4 shadow-[0_0_40px_rgba(255,215,0,0.05)]">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
            TGPI Navigation
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Fast access across your global environment
          </p>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-1 md:grid md:grid-cols-3 xl:grid-cols-6">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="min-w-[140px] rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-center text-sm font-semibold text-white transition hover:border-yellow-500/30 hover:bg-yellow-500/10 hover:text-yellow-300"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}