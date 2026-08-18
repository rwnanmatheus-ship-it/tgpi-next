import Link from "next/link";

const entryPoints = [
  {
    number: "01",
    eyebrow: "Explore",
    title: "Find countries that match your goal",
    description: "Search 195 profiles and filter by budget, language, lifestyle and opportunity.",
    href: "/countries",
    action: "Explore countries",
  },
  {
    number: "02",
    eyebrow: "Compare",
    title: "Understand the trade-offs",
    description: "Place up to three destinations side by side before making a commitment.",
    href: "/compare",
    action: "Compare destinations",
  },
  {
    number: "03",
    eyebrow: "Learn",
    title: "Develop practical global skills",
    description: "Follow learning paths in critical thinking, leadership, technology and economics.",
    href: "/courses",
    action: "Explore courses",
  },
  {
    number: "04",
    eyebrow: "Prepare",
    title: "Turn your objective into a plan",
    description: "Define your priorities and connect countries, readiness and next actions.",
    href: "/onboarding",
    action: "Build my plan",
  },
] as const;

const quickLinks = [
  ["Documents", "/passport"],
  ["Membership", "/pricing"],
  ["Why TGPI", "/why"],
  ["My workspace", "/profile"],
] as const;

export default function HomePortal() {
  return (
    <section id="home-portal" className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8" aria-labelledby="home-portal-title">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.24em] text-[var(--tgpi-gold-strong)]">
              Your starting point
            </p>
            <h2 id="home-portal-title" className="mt-4 font-[var(--tgpi-font-display)] text-[clamp(2.8rem,5vw,4.8rem)] font-semibold leading-[0.95] text-[var(--tgpi-ink)]">
              What do you want to do today?
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--tgpi-muted)] sm:text-lg">
              Choose a task and enter the platform directly. You can move between exploration, learning and planning at any time.
            </p>
          </div>
          <p className="rounded-full border border-[var(--tgpi-border)] bg-white px-4 py-2 text-xs font-extrabold text-[var(--tgpi-navy)] shadow-[var(--tgpi-shadow-sm)]">
            No account required to explore
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {entryPoints.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group relative overflow-hidden rounded-[28px] border border-[var(--tgpi-border)] bg-[var(--tgpi-surface)] p-6 shadow-[var(--tgpi-shadow-soft)] transition duration-300 hover:-translate-y-1 hover:border-[var(--tgpi-gold)] hover:shadow-[var(--tgpi-shadow-premium)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)] sm:p-8"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full border border-[var(--tgpi-gold)]/20 bg-[var(--tgpi-gold-soft)]/45 transition duration-500 group-hover:scale-125" />
              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[var(--tgpi-gold-strong)]">{item.eyebrow}</p>
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-[var(--tgpi-border)] bg-white text-xs font-extrabold text-[var(--tgpi-navy)]">{item.number}</span>
                </div>
                <h3 className="mt-8 max-w-xl font-[var(--tgpi-font-display)] text-3xl font-semibold leading-tight text-[var(--tgpi-navy)] sm:text-4xl">{item.title}</h3>
                <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--tgpi-muted)]">{item.description}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-extrabold text-[var(--tgpi-navy)]">
                  {item.action}
                  <span className="text-[var(--tgpi-gold-strong)] transition group-hover:translate-x-1">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <nav className="mt-5 grid gap-2 rounded-[24px] border border-[var(--tgpi-border)] bg-[#f1eadc] p-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Quick access">
          {quickLinks.map(([label, href]) => (
            <Link key={href} href={href} className="inline-flex min-h-12 items-center justify-between rounded-2xl border border-transparent px-4 text-sm font-bold text-[var(--tgpi-navy)] transition hover:border-[var(--tgpi-border)] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tgpi-gold)]">
              {label}
              <span aria-hidden="true" className="text-[var(--tgpi-gold-strong)]">↗</span>
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
