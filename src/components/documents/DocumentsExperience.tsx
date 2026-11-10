import Link from "next/link";
import ActivationProgressProvider from "@/components/activation/ActivationProgressProvider";
import CapabilitySystemRail from "@/components/capability/CapabilitySystemRail";
import { LocalizedText } from "@/components/localization/LocaleProvider";
import { LocalizedElement } from "@/components/localization/LocalizedElement";
import NavigationIcon from "@/components/navigation/NavigationIcon";
import WorkspaceSyncButton from "@/components/profile/WorkspaceSyncButton";
import CinematicImage from "@/components/ui/CinematicImage";
import type { SearchableCountry } from "@/lib/country-search";
import { documentsHref, type DocumentGoal, type DocumentsMemberModel } from "@/lib/documents-os";
import { DocumentsDestinations, DocumentsMemberOverview, DocumentsReadiness } from "./DocumentsMemberExperience";
import DocumentsPathfinder from "./DocumentsPathfinder";
import DocumentsPreparationTools from "./DocumentsPreparationTools";
import DocumentsSectionNav from "./DocumentsSectionNav";

type Props = {
  countries: SearchableCountry[];
  initialCountry?: string;
  initialGoal: DocumentGoal;
  member?: { globalId: string; model: DocumentsMemberModel };
};

const connectedTools = [
  { label: "Workspace", href: "/profile", icon: "apps", detail: "Return to your saved countries, activity and progress." },
  { label: "Personal Global Plan", href: "/plan", icon: "target", detail: "Put document research alongside your budget, decisions and next steps." },
  { label: "Ask Atlas", href: "/atlas", icon: "spark", detail: "Prepare questions to investigate in your research." },
] as const;

export default function DocumentsExperience({ countries, initialCountry, initialGoal, member }: Props) {
  const entryPath = documentsHref({ country: initialCountry, goal: initialGoal });
  const destinations = member?.model.countries;
  const plannedCountry = initialCountry ?? destinations?.find(country => country.status === "in_progress")?.slug ?? destinations?.[0]?.slug;
  const signIn = `/sign-in?next=${encodeURIComponent(entryPath)}`;
  const signUp = `/sign-up?next=${encodeURIComponent(entryPath)}`;

  return (
    <main className="documents-os">
      <div className="documents-shell">
        <LocalizedElement as="nav" className="documents-breadcrumb" aria-label="Breadcrumb">
          <Link href={member ? "/profile" : "/"}><LocalizedText text={member ? "Workspace" : "Home"} /></Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page"><LocalizedText text="Documents" /></span>
        </LocalizedElement>

        <header className="documents-hero">
          <div className="documents-hero-copy">
            <p className="documents-eyebrow"><span className="documents-brand-mark"><NavigationIcon name="file" width={17} height={17} /></span><LocalizedText text="TGPI Global Documents" /></p>
            <h1><LocalizedText text="Prepare your documents for life abroad." /></h1>
            <p className="documents-intro"><LocalizedText text="Find what to verify for your destination, organize your research and keep track of your next steps with TGPI." /></p>
            <div className="documents-actions">
              <a className="documents-button" href="#preparation-paths"><LocalizedText text="Open research studio" /><span aria-hidden="true">↓</span></a>
              {member ? <a className="documents-button secondary" href="#destination-files"><LocalizedText text="View my files" /></a>
                : <Link className="documents-button secondary" href={signIn}><LocalizedText text="Sign in" /><span aria-hidden="true">↗</span></Link>}
            </div>
            <div className="documents-hero-context">
              {member ? <>
                <Link href="/global-key" className="documents-identity"><NavigationIcon name="key" width={16} height={16} /><span translate="no">{member.globalId}</span></Link>
                <span><LocalizedText text={member.model.goalLabel} /></span>
                <a className="documents-identity" href="#preparation-signals"><NavigationIcon name="graph" width={16} height={16} /><LocalizedText text="Preparation score" /> {member.model.readinessScore}/100</a>
              </> : <span><NavigationIcon name="globe" width={17} height={17} /><LocalizedText text="{count} destinations to research" values={{ count: String(countries.length) }} /></span>}
            </div>
          </div>
          <div className="documents-hero-visual">
            <CinematicImage asset="documents-command" alt="" priority sizes="(max-width: 760px) 94vw, (max-width: 1400px) 48vw, 670px" position="var(--documents-hero-position, 98% 48%)" />
          </div>
        </header>

        <DocumentsSectionNav member={Boolean(member)} />
        {member && <DocumentsMemberOverview model={member.model} />}

        <ActivationProgressProvider>
          <DocumentsPathfinder
            key={`${initialCountry ?? ""}:${initialGoal}`}
            countries={countries}
            initialGoal={initialGoal}
            initialCountry={plannedCountry}
            shortlist={destinations?.map(country => country.slug)}
          />
        </ActivationProgressProvider>

        {member && <DocumentsDestinations model={member.model} directory={countries} />}
        <DocumentsPreparationTools />

        <section id="connected-preparation" className="documents-section" aria-labelledby="documents-connections-title">
          <div className="documents-section-heading">
            <div>
              <p className="documents-eyebrow"><LocalizedText text="TGPI connections" /></p>
              <h2 id="documents-connections-title"><LocalizedText text="Connect research to your next move" /></h2>
              <p><LocalizedText text="Continue your plan, develop your skills and find your credentials in the same TGPI account." /></p>
            </div>
          </div>
          <div className="documents-layer-grid documents-connected-grid">
            {connectedTools.map(({ label, href, icon, detail }) => <Link key={href} className="documents-layer" href={href} prefetch={false}>
              <div className="documents-layer-top"><span className="documents-icon"><NavigationIcon name={icon} /></span><span aria-hidden="true">↗</span></div>
              <h3><LocalizedText text={label} /></h3>
              <p><LocalizedText text={detail} /></p>
            </Link>)}
          </div>
          {member && <DocumentsReadiness model={member.model} syncButton={<WorkspaceSyncButton />} />}
          <CapabilitySystemRail active="documents" theme="dark" />
        </section>

        <footer className="documents-privacy">
          <span className="documents-icon"><NavigationIcon name="shield" /></span>
          <div>
            <h2><LocalizedText text="Keep your preparation private" /></h2>
            <p><LocalizedText text="TGPI saves your checklist activity. Keep scans and sensitive records in a secure place, and confirm applicable requirements with the receiving authority." /></p>
          </div>
          <Link className="documents-text-link" href={member ? "/profile/security" : signUp}>
            <LocalizedText text={member ? "Manage account security" : "Create a TGPI account"} /><span aria-hidden="true">↗</span>
          </Link>
        </footer>
      </div>
    </main>
  );
}
