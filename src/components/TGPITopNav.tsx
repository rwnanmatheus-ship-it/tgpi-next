import Link from "next/link";

const nav = [
  { label: "Home", href: "/" },
  { label: "Countries", href: "/countries" },
  { label: "Courses", href: "/courses" },
  { label: "Plans", href: "/premium" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
];

export default function TGPITopNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#020617]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="text-2xl text-yellow-400">◎</span>
          <div>
            <p className="text-xl font-bold text-white">TGPI</p>
            <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400">
              The Global Polymath Institute
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-300 transition hover:text-yellow-400"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-xl border border-yellow-500/30 px-4 py-2 text-sm font-semibold text-yellow-400 transition hover:bg-yellow-500/10"
          >
            Sign in
          </Link>

          <Link
            href="/login"
            className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/5"
          >
            Create account
          </Link>
        </div>
      </div>
    </header>
  );
}