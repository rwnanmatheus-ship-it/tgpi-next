import Link from "next/link";
import { localizedCountryName, normalizeCountrySearch } from "@/lib/country-search";
import { identities } from "@/lib/intelligence/server";
import { translate } from "@/lib/localization/messages";
import { getLocale } from "@/lib/localization/server";

export default async function CountryAlphabeticalIndex() {
  const locale = await getLocale();
  const collator = new Intl.Collator(locale);
  const entries = identities
    .map(country => ({ name: localizedCountryName(country, locale), slug: country.slug }))
    .sort((a, b) => collator.compare(a.name, b.name));
  const groups = new Map<string, typeof entries>();
  for (const entry of entries) {
    const initial = normalizeCountrySearch(entry.name)[0].toLocaleUpperCase(locale);
    const group = groups.get(initial);
    if (group) group.push(entry);
    else groups.set(initial, [entry]);
  }

  return (
    <details className="my-5 rounded-2xl border border-[var(--directory-line)] bg-[var(--directory-surface)] px-5">
      <summary className="cursor-pointer py-4 font-semibold text-[var(--directory-ink)]">
        {translate(locale, "Countries")} A–Z
      </summary>
      <div className="columns-1 gap-8 pb-5 sm:columns-2 lg:columns-3">
        {Array.from(groups, ([letter, countries]) => (
          <section key={letter} className="mb-4 break-inside-avoid">
            <h2 className="border-b border-[var(--directory-line)] pb-1 font-semibold">{letter}</h2>
            <ul>
              {countries.map(({ slug, name }) => (
                <li key={slug}>
                  <Link href={`/countries/${slug}`} prefetch={false} className="inline-block py-2 text-[var(--directory-blue)] hover:underline">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </details>
  );
}
