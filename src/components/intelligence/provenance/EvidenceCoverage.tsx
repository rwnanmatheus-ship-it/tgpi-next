import { LocalizedText as Copy } from "@/components/localization/LocaleProvider";
import {
  INDICATORS, INDICATOR_IDS, INDICATOR_PRODUCERS, evidenceStatus, type EvidenceStatus,
} from "@/lib/intelligence/core";
import { CONTEXT_INDICATORS, CONTEXT_INDICATOR_IDS, contextEvidenceStatus } from "@/lib/intelligence/country-context";
import { getIntelligence, identities } from "@/lib/intelligence/server";
import { getCountryContext } from "@/lib/intelligence/country-context.server";
import { summarizeCoverage } from "@/lib/intelligence/provenance";
import styles from "./provenance.module.css";

const legend = {
  current: "Within freshness thresholds",
  historical: "Older observation",
  stale: "Refresh overdue",
  missing: "Not available",
} satisfies Record<EvidenceStatus, string>;
const statuses = Object.keys(legend) as EvidenceStatus[];

function CollectionStatus({ label, status, message, snapshot }: {
  label: string;
  status: "available" | "degraded" | "unavailable";
  message: string | null;
  snapshot: { retrievedAt: string | null; revision: string; methodologyVersion: string };
}) {
  return (
    <div className={styles.collection}>
      <div><strong><Copy text={label} /></strong><span className={status === "available" ? styles.badge : styles.badgeCaution}><Copy text={status === "available" ? "Collection available" : status === "degraded" ? "Retained evidence" : "Collection unavailable"} /></span></div>
      {snapshot.retrievedAt ? <p><time dateTime={snapshot.retrievedAt}><Copy text="Latest collection · {date}" dates={{ date: snapshot.retrievedAt }} /></time> · <Copy text="Methodology" /> v{snapshot.methodologyVersion} · <Copy text="Data revision" /> <code>{snapshot.revision}</code></p> : null}
      {message ? <p><Copy text={message} /></p> : null}
    </div>
  );
}

export default async function EvidenceCoverage() {
  const [core, context] = await Promise.all([getIntelligence(), getCountryContext()]);
  const now = new Date();
  const countriesWithData = new Set([...core.snapshot.observations, ...context.snapshot.observations].map(row => row.country)).size;
  const indicators = [
    ...INDICATOR_IDS.map(id => ({
      id,
      definition: INDICATORS[id],
      producer: INDICATOR_PRODUCERS[id],
      statuses: core.snapshot.observations.filter(row => row.indicator === id).map(row => evidenceStatus(row, now)),
      collection: core.snapshot.series.find(series => series.indicator === id),
    })),
    ...CONTEXT_INDICATOR_IDS.map(id => ({
      id,
      definition: CONTEXT_INDICATORS[id],
      producer: CONTEXT_INDICATORS[id].producer,
      statuses: context.snapshot.observations.filter(row => row.indicator === id).map(row => contextEvidenceStatus(row, now)),
      collection: context.snapshot.series.find(series => series.indicator === id),
    })),
  ];

  return (
    <>
      <div className={styles.collectionGrid}>
        <CollectionStatus label="Core national indicators" {...core} />
        <CollectionStatus label="Health, infrastructure & economy" {...context} />
      </div>
      <p className={styles.coverageSummary}><Copy text="{count} of {total} destinations have at least one observation across both collections." values={{ count: countriesWithData, total: identities.length }} /></p>
      <ul className={styles.indicatorList}>
        {indicators.map(({ id, definition, producer, statuses: observations, collection }) => {
          const counts = summarizeCoverage(observations, identities.length);
          return (
            <li key={id}>
              <details className={styles.indicator}>
                <summary>
                  <span><strong><Copy text={definition.label} /></strong><small translate="no">{id}</small></span>
                  <span className={styles.bar} aria-hidden="true">{statuses.map(status => <i key={status} data-coverage={status} style={{ flexGrow: counts[status] }} />)}</span>
                  <span className={styles.indicatorTotal}><Copy text="{count} / {total} available" values={{ count: observations.length, total: identities.length }} /></span>
                </summary>
                <div className={styles.indicatorDetails}>
                  <ul className={styles.legend}>
                    {statuses.map(status => <li key={status}><i data-coverage={status} aria-hidden="true" /><strong>{counts[status]}</strong> <Copy text={legend[status]} /></li>)}
                  </ul>
                  <p><Copy text={definition.explanation} /></p>
                  <p><strong><Copy text="Data producer" /></strong> · <Copy text={producer} /></p>
                  <p><strong><Copy text="Unit of measure" /></strong> · <Copy text={definition.unit} /> · <Copy text="Reference-year limit · {count} years" values={{ count: definition.maxAge }} /></p>
                  {collection ? <p><time dateTime={collection.retrievedAt}><Copy text="Latest collection · {date}" dates={{ date: collection.retrievedAt }} /></time>{collection.sourceUpdatedAt ? <> · <time dateTime={collection.sourceUpdatedAt}><Copy text="Publisher update · {date}" dates={{ date: collection.sourceUpdatedAt }} /></time></> : null}</p> : null}
                  <a className={styles.inlineLink} href={`https://data.worldbank.org/indicator/${id}`} target="_blank" rel="noreferrer"><Copy text="Open indicator and definitions" /> <span aria-hidden="true">↗</span></a>
                </div>
              </details>
            </li>
          );
        })}
      </ul>
      <div className={styles.inlineActions}>
        <a href="/api/intelligence" className={styles.inlineLink} target="_blank" rel="noreferrer"><Copy text="Core collection JSON" /> <span aria-hidden="true">↗</span></a>
        <a href="/api/intelligence/context" className={styles.inlineLink} target="_blank" rel="noreferrer"><Copy text="Context collection JSON" /> <span aria-hidden="true">↗</span></a>
        <a href="https://datahelpdesk.worldbank.org/knowledgebase/articles/889392-about-the-indicators-api-documentation" className={styles.inlineLink} target="_blank" rel="noreferrer"><Copy text="World Bank API documentation ↗" /></a>
      </div>
    </>
  );
}
