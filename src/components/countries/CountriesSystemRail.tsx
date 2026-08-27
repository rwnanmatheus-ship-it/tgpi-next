import Link from "next/link";
import { COUNTRY_SYSTEM_PATH } from "@/data/country-page-system";

export default function CountriesSystemRail() {
  return (
    <nav
      aria-label="TGPI country decision system"
      className="mt-4 overflow-hidden rounded-[26px] border border-[var(--tgpi-border)] bg-[var(--tgpi-surface)] shadow-[var(--tgpi-shadow-soft)]"
    >
      <div className="grid divide-y divide-[var(--tgpi-border)] sm:grid-cols-5 sm:divide-x sm:divide-y-0">
        {COUNTRY_SYSTEM_PATH.map((step) => (
          <Link
            key={step.number}
            href={step.href}
            className="group grid min-h-[112px] grid-cols-[auto_1fr] gap-3 p-4 transition hover:bg-[var(--tgpi-blue-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--tgpi-gold)] sm:block"
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[var(--tgpi-gold)]/35 bg-[var(--tgpi-gold-soft)] text-[10px] font-extrabold text-[var(--tgpi-gold-strong)]">
              {step.number}
            </span>
            <span className="block min-w-0 sm:mt-3">
              <span className="block text-[9px] font-extrabold uppercase tracking-[0.14em] text-[var(--tgpi-gold-strong)]">
                {step.label}
              </span>
              <span className="mt-1 block text-sm font-extrabold text-[var(--tgpi-navy)]">
                {step.title}
                <span className="ml-1 text-[var(--tgpi-gold-strong)] transition group-hover:translate-x-0.5">
                  →
                </span>
              </span>
              <span className="mt-1 hidden text-xs leading-5 text-[var(--tgpi-muted)] lg:block">
                {step.description}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
