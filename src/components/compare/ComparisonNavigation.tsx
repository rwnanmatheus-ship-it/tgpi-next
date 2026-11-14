"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useLocale } from "@/components/localization/LocaleProvider";
import { comparisonPath } from "@/lib/comparison-state";

type Props = {
  countries: { slug: string; name: string }[];
  goal: string;
  page: number;
  pageSize: number;
};

export default function ComparisonNavigation({ countries, goal, page, pageSize }: Props) {
  const { t } = useLocale();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const total = Math.ceil(countries.length / pageSize);
  const path = comparisonPath(countries.map(country => country.slug), goal);
  const href = (group: number) => `${path}&view=${group}#decision-overview`;
  return (
    <div className="compare-result-navigation" aria-busy={pending}>
      <div>
        <p className="compare-kicker">{t("Active comparison")}</p>
        <strong>{t("Showing {start}–{end} of {count}", {
          start: (page - 1) * pageSize + 1,
          end: Math.min(page * pageSize, countries.length),
          count: countries.length,
        })}</strong>
      </div>
      {total > 1 && <>
        <label>
          <span>{t("Jump to a country")}</span>
          <select value="" disabled={pending} onChange={event => {
            const index = countries.findIndex(country => country.slug === event.target.value);
            if (index >= 0) startTransition(() => router.push(href(Math.floor(index / pageSize) + 1)));
          }}>
            <option value="">{t("Choose a country")}</option>
            {countries.map(country => <option key={country.slug} value={country.slug}>{country.name}</option>)}
          </select>
        </label>
        <nav aria-label={t("Comparison groups")}>
          {page > 1 && <Link href={href(page - 1)} prefetch={false}>← {t("Previous")}</Link>}
          <span>{page} / {total}</span>
          {page < total && <Link href={href(page + 1)} prefetch={false}>{t("Next")} →</Link>}
        </nav>
      </>}
    </div>
  );
}
