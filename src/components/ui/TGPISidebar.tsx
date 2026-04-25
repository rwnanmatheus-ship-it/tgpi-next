"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { name: "Dashboard", href: "/profile" },
  { name: "World Map", href: "/countries" },
  { name: "Countries", href: "/countries" },
  { name: "Courses", href: "/courses" },
  { name: "Resources", href: "/resources" },
  { name: "Compare", href: "/compare" },
  { name: "Premium", href: "/premium" },
  { name: "Community", href: "/community" },
  { name: "Certificates", href: "/certificates" },
  { name: "Notifications", href: "/notifications" },
];

export default function TGPISidebar() {
  const path = usePathname();

  return (
    <aside className="hidden min-h-screen w-64 border-r border-white/10 bg-[#020617] p-5 lg:block">
      <Link href="/" className="mb-8 block">
        <p className="text-xl font-bold text-white">TGPI</p>
        <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
          Global Institute
        </p>
      </Link>

      <nav className="space-y-2">
        {items.map((item) => {
          const active = path === item.href;

          return (
            <Link
              key={item.href + item.name}
              href={item.href}
              className={`block rounded-xl px-4 py-3 text-sm transition ${
                active
                  ? "border border-yellow-500/40 bg-yellow-500/10 text-yellow-400"
                  : "text-slate-300 hover:bg-white/5 hover:text-yellow-400"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-4">
        <p className="font-semibold text-yellow-400">Premium Plan</p>
        <p className="mt-2 text-xs text-slate-400">
          Unlock certificates, AI tools, and global identity.
        </p>

        <Link
          href="/premium"
          className="mt-4 block rounded-xl bg-yellow-500 px-4 py-2 text-center text-sm font-bold text-black"
        >
          Manage Plan
        </Link>
      </div>
    </aside>
  );
}