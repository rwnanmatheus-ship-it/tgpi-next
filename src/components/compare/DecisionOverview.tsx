import Link from "next/link";
import Image from "@/components/localization/LocalizedImage";
import { LocalizedText } from "@/components/localization/LocaleProvider";
import CountryFlag from "@/components/ui/CountryFlag";
import type { SearchableCountry } from "@/lib/country-search";
import { dossierFor } from "@/lib/intelligence/dossiers";

export default function DecisionOverview({ countries }: { countries: SearchableCountry[] }) {
  return (
    <>
      <div className="compare-section-head">
        <div>
          <h2 id="decision-overview-title"><LocalizedText text="Overview" /></h2>
          <p><LocalizedText text="Coverage counts are not quality or eligibility scores. Inspect dates and limitations below." /></p>
        </div>
        <a className="compare-button" href="#comparison-matrix"><LocalizedText text="Sources & evidence" /> ↓</a>
      </div>
      <div className="compare-destinations">
        {countries.map(country => {
          const dossier = dossierFor(country.slug);
          return (
            <article className="compare-destination" key={country.slug}>
              <div className="compare-destination-image">
                <Image src={`/images/countries/identity/${country.slug}.webp`} alt="" fill
                  sizes="(max-width: 480px) 100vw, (max-width: 960px) 50vw, 33vw" className="object-cover" />
                <div className="compare-destination-identity">
                  <CountryFlag iso2={country.iso2} width={44} />
                  <div><p>{country.iso3} · <LocalizedText text={country.region} /></p><h3>{country.name}</h3></div>
                </div>
              </div>
              <div className="compare-destination-body">
                <dl>
                  <div><dt><LocalizedText text="Source-linked summaries" /></dt><dd>{dossier.claims.length}</dd></div>
                  <div><dt><LocalizedText text="Published cost references" /></dt><dd>{dossier.costs.length}</dd></div>
                </dl>
                <Link className="compare-button" href={`/countries/${country.slug}`}>
                  <LocalizedText text="Explore country" /> <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
