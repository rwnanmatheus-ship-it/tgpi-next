import Image from "next/image";
import Link from "next/link";
import { LocalizedText } from "@/components/localization/LocaleProvider";
import { dossierFor } from "@/lib/intelligence/dossiers";

export default function DecisionOverview({ countries }: { countries: { slug: string; name: string; emoji: string }[] }) {
  return <section id="decision-overview" className="compare-section" aria-labelledby="decision-overview-title">
    <div className="compare-heading"><div><p className="ig-eyebrow">TGPI / <LocalizedText text="Decision intelligence" /></p><h2 id="decision-overview-title"><LocalizedText text="See the bigger picture." /></h2></div><p className="compare-disclosure"><LocalizedText text="Evidence before rankings. Missing information remains visible." /></p></div>
    <div className="compare-destinations">{countries.map(country => {
      const dossier = dossierFor(country.slug);
      return <article className="compare-destination" key={country.slug}>
        <div className="compare-destination-image"><Image src={`/images/countries/identity/${country.slug}.webp`} alt="" fill sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw" className="object-cover" /><span aria-hidden="true">{country.emoji}</span></div>
        <div className="compare-destination-body"><p className="ig-eyebrow">TGPI / <LocalizedText text="Country research" /></p><h3><LocalizedText text={country.name} /></h3><p><LocalizedText text="Check your legal route, language requirements and local budget separately." /></p><dl><div><dt><LocalizedText text="Source-linked summaries" /></dt><dd>{dossier.claims.length}</dd></div><div><dt><LocalizedText text="Published cost references" /></dt><dd>{dossier.costs.length}</dd></div></dl><p className="compare-note"><LocalizedText text="Coverage counts are not quality or eligibility scores. Inspect dates and limitations below." /></p><Link className="ig-button ig-secondary" href={`/countries/${country.slug}`}><LocalizedText text="Explore country" /> ↗</Link></div>
      </article>;
    })}</div>
  </section>;
}
