import Link from "next/link";
import type { BreadcrumbItem } from "@/seo/schemas/breadcrumb";

type BreadcrumbsProps = {
  items: readonly BreadcrumbItem[];
};

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-[var(--tgpi-muted)]">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;

          return (
            <li key={item.path} className="flex items-center gap-2">
              {index > 0 ? <span aria-hidden="true">/</span> : null}
              {isCurrent ? (
                <span aria-current="page" className="font-bold text-[var(--tgpi-navy)]">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.path}
                  className="font-semibold transition hover:text-[var(--tgpi-gold-strong)]"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
