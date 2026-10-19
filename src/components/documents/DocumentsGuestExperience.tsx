import Image from "next/image";
import Link from "next/link";
import DocumentsPathfinder from "@/components/documents/DocumentsPathfinder";
import CapabilitySystemRail from "@/components/capability/CapabilitySystemRail";

export default function DocumentsGuestExperience({ countryCount }: { countryCount: number }) {
  return <main className="documents-os"><div className="tgpi-capability-frame documents-shell">
    <header className="documents-hero"><Image src="/images/documents/tgpi-documents-hero-v2.webp" alt="" fill priority sizes="100vw" className="documents-hero-image" /><div className="documents-hero-copy"><p className="documents-eyebrow">TGPI · Documents intelligence</p><h1>A clearer path to your next country.</h1><p className="documents-intro">Understand what to research, organize your preparation and connect your progress to a global plan.</p><div className="documents-actions"><Link className="documents-button" href="/sign-up?redirect_url=/passport">Create my preparation workspace ↗</Link><a className="documents-button secondary" href="#preparation-paths">Explore preparation paths ↓</a></div></div><aside className="documents-score"><p className="documents-eyebrow">Country-aware research</p><strong>{countryCount}</strong><p>Country profiles to explore. Requirements depend on your nationality, purpose and destination. Official authorities remain the source for eligibility decisions.</p><Link className="documents-button secondary" href="/countries">Explore destinations ↗</Link></aside></header>
    <section className="documents-section" id="preparation-paths"><div className="documents-section-heading"><div><p className="documents-eyebrow">Start with your purpose</p><h2>One objective. A focused preparation path.</h2><p>Explore the evidence categories relevant to your next move.</p></div></div><DocumentsPathfinder /></section>
    <section className="documents-section"><div className="documents-section-heading"><div><p className="documents-eyebrow">From research to action</p><h2>Build readiness in the right order.</h2></div></div><div className="documents-layer-grid">{[
      ["01", "Define your context", "Set your objective, destination, budget and timeline. These shape your preparation priorities.", "/onboarding"],
      ["02", "Research your destination", "Use the country checklist to review entry, identity, funding and supporting evidence with official sources.", "/countries"],
      ["03", "Connect your evidence", "Build relevant skills and keep your issued learning certificates connected to your TGPI identity.", "/courses"],
    ].map(([number, title, description, href]) => <Link className="documents-layer" key={number} href={href}><span className="documents-layer-number">{number}</span><h3>{title}<span aria-hidden="true">↗</span></h3><p>{description}</p></Link>)}</div></section>
    <CapabilitySystemRail active="documents" metric={{ label: "Connected capability", value: "4 layers", detail: "Learning, preparation, certificates and Global Key — connected to one identity." }} />
    <footer className="documents-privacy"><div><p className="documents-eyebrow">Your private workspace</p><h2>Save progress, keep control.</h2><p>Sign in to connect your destination checklists and preparation signals. This workspace tracks research activity without requesting copies of passports or other legal documents.</p></div><Link className="documents-button" href="/sign-in?redirect_url=/passport">Sign in →</Link></footer>
  </div></main>;
}
