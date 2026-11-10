import CountryFlag from "@/components/ui/CountryFlag";
import Link from "next/link";
import SourceReviewNotice from "./SourceReviewNotice";
import { dossierFor, formatReference, referenceReviewState, reviewState, sourceFor } from "@/lib/intelligence/dossiers";
import { getLocale } from "@/lib/localization/server";
import { translate } from "@/lib/localization/messages";

export default async function DossierComparison({ countries }: { countries: { slug: string; name: string; iso2: string }[] }) {
  const locale = await getLocale();
  const t = (text: string) => translate(locale, text);
  return <div className="ig-compare-row">{countries.map(country => {
    const dossier = dossierFor(country.slug);
    return <article className="ig-panel" key={country.slug}><h3><CountryFlag iso2={country.iso2} width={32} /> {country.name}</h3><SourceReviewNotice country={country.slug} />
      {(["entry", "education"] as const).map(layer => {
        const claims = dossier.claims.filter(c => c.layer === layer);
        return <div className="ig-details" key={layer}><p className="ig-eyebrow">{t(layer === "entry" ? "Entry & residence" : "Education & recognition")}</p>
          {claims.length ? claims.map(claim => <div key={claim.id}>
            <p className="ig-small">{t(claim.title)}</p><p className="ig-meta">{t(claim.audience)}</p>
            <p className="ig-meta">{t(reviewState(claim) === "reviewed" ? "Source-reviewed reference" : "Review overdue or reference period not current")} · {claim.reviewedAt}</p>
            <a className="ig-link" href={sourceFor(claim.sourceId)!.url} target="_blank" rel="noreferrer">{t("Check the responsible source")} ↗</a>
          </div>) : <p className="ig-small">{t("No reviewed summary in this layer. Do not infer eligibility.")}</p>}
        </div>;
      })}
      <div className="ig-details"><p className="ig-eyebrow">{t("Published cost reference")}</p>{dossier.costs.length ? dossier.costs.map(cost => <div key={cost.id}>
        <p className="ig-small"><strong>{formatReference(cost)}</strong><br/>{t(cost.title)} · {cost.location}</p>
        <p className="ig-meta">{cost.referencePeriod} · {t(referenceReviewState(cost) === "reviewed" ? "Source-reviewed reference" : "Review overdue / reference period ended")}<br/>{t(cost.audience)}<br/>{t("Excludes")}: {t(cost.excludes)}</p>
        <a href={sourceFor(cost.sourceId)!.url} target="_blank" rel="noreferrer" className="ig-link">{t("Inspect original scope")} ↗</a>
      </div>) : <p className="ig-small">{t("No numeric living-cost reference approved. A funds threshold is not a substitute.")}</p>}</div>
      <Link className="ig-button ig-secondary" href={`/country-fit?country=${country.slug}#research-workbench`}>{t("Budget & preparation")} ↗</Link>
    </article>;
  })}</div>;
}
