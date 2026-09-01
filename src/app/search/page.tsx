import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import TGPIPageShell from "@/components/TGPIPageShell";
import { searchTgpi, type TgpiSearchDocumentType } from "@/lib/tgpi-search";
import { noIndexFollowRobots } from "@/seo";

type SearchPageProps = {
  searchParams: Promise<{ q?: string | string[] }>;
};

export const metadata: Metadata = {
  title: "Search TGPI",
  description: "Search countries, comparisons, documents, courses and TGPI research.",
  robots: noIndexFollowRobots,
};

const typeLabels: Record<TgpiSearchDocumentType, string> = {
  compare: "Compare",
  country: "Country",
  documents: "Documents",
  institute: "Institute",
  learn: "Learn",
  methodology: "Methodology",
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolved = await searchParams;
  const rawQuery = Array.isArray(resolved.q) ? resolved.q[0] : resolved.q;
  const query = rawQuery?.trim() ?? "";
  const results = searchTgpi(query);

  return (
    <TGPIPageShell>
      <Breadcrumbs
        items={[
          { name: "TGPI", path: "/" },
          { name: "Search", path: "/search" },
        ]}
      />

      <section className="mt-6 rounded-[38px] bg-[#071A32] p-7 text-white shadow-[0_30px_90px_rgba(7,26,50,0.2)] sm:p-10">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-[#F0D58C]">TGPI Global Search</p>
        <h1 className="mt-4 max-w-4xl font-serif text-5xl font-semibold leading-[0.96] tracking-[-0.04em] sm:text-7xl">
          Search the world through one connected system.
        </h1>
        <form action="/search" method="get" className="mt-8 flex max-w-3xl flex-col gap-3 sm:flex-row" role="search">
          <label htmlFor="tgpi-search-query" className="sr-only">Search TGPI</label>
          <input
            id="tgpi-search-query"
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Try Portugal, Lisbon, affordable countries or study abroad"
            className="min-h-14 flex-1 rounded-2xl border border-white/20 bg-white px-5 text-base text-[#0B1F3A] outline-none ring-[#F0D58C] placeholder:text-[#6C7888] focus:ring-2"
          />
          <button type="submit" className="min-h-14 rounded-2xl bg-[#C59632] px-7 text-sm font-black text-[#071A32] transition hover:bg-[#F0D58C]">
            Search
          </button>
        </form>
      </section>

      <section className="py-10" aria-live="polite">
        {query ? (
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#9A6A12]">Search results</p>
              <h2 className="mt-2 font-serif text-4xl font-semibold text-[#0B1F3A]">
                {results.length} {results.length === 1 ? "result" : "results"} for “{query}”
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[#566070]">
              Results connect country entities, practical intentions, learning and TGPI decision tools.
            </p>
          </div>
        ) : (
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#9A6A12]">Start with an intention</p>
            <h2 className="mt-2 font-serif text-4xl font-semibold text-[#0B1F3A]">Search a country, city, goal or practical question.</h2>
          </div>
        )}

        {query && results.length === 0 ? (
          <div className="mt-8 rounded-[28px] border border-[#D8D2C4] bg-white p-8">
            <h3 className="font-serif text-3xl font-semibold text-[#0B1F3A]">No connected result yet.</h3>
            <p className="mt-3 text-sm leading-7 text-[#566070]">Try a country name, capital, region, language, work, study, cost, compare or documents.</p>
            <Link href="/countries" className="mt-5 inline-flex font-black text-[#8A641F]">Explore all countries →</Link>
          </div>
        ) : null}

        {results.length > 0 ? (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {results.map((result) => (
              <Link
                key={`${result.type}:${result.url}`}
                href={result.url}
                className="group rounded-[26px] border border-[#D8D2C4] bg-white p-6 shadow-[0_16px_45px_rgba(11,31,58,0.06)] transition hover:-translate-y-0.5 hover:border-[#C59632]"
              >
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#9A6A12]">{typeLabels[result.type]}</p>
                <h3 className="mt-3 font-serif text-3xl font-semibold text-[#0B1F3A]">{result.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#566070]">{result.description}</p>
                <p className="mt-5 text-sm font-black text-[#0B1F3A] transition group-hover:text-[#9A6A12]">Open result →</p>
              </Link>
            ))}
          </div>
        ) : null}
      </section>
    </TGPIPageShell>
  );
}
