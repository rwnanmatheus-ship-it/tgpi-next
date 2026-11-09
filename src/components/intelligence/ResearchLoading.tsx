import { LocalizedText } from '@/components/localization/LocaleProvider';
export default function ResearchLoading() {
  return <section className="ds-state ig-section" role="status" aria-busy="true"><h2><LocalizedText text="Loading the latest TGPI experience…" /></h2><div className="ds-skeleton" aria-hidden="true" /><div className="ds-skeleton" aria-hidden="true" /></section>;
}
