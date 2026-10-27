import Image from "next/image";
import Link from "next/link";
import BrandCrest from "@/components/BrandCrest";
import styles from "./auth.module.css";
import { LocalizedText } from "@/components/localization/LocaleProvider";


type TGPIAuthShellProps = { children: React.ReactNode; mode: "sign-in" | "sign-up" | "welcome" };

function AccessSymbol({ kind }: { kind: "globe" | "book" | "plan" | "shield" }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {kind === "globe" ? <><circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><path d="M3 12h18M5 7h14M5 17h14" /></> : null}
    {kind === "book" ? <><path d="M12 5v15M3 4c4-1 6 0 9 2 3-2 5-3 9-2v14c-4-1-6 0-9 2-3-2-5-3-9-2V4Z" /><path d="m6 8 3 1m6 0 3-1M6 12l3 1m6 0 3-1" /></> : null}
    {kind === "plan" ? <><rect x="5" y="3" width="14" height="18" rx="3" /><path d="m8 9 1 1 2-2m2 1h3m-8 6 1 1 2-2m2 1h3" /></> : null}
    {kind === "shield" ? <><path d="m12 3 8 3v6c0 4-4 7-8 9-4-2-8-5-8-9V6l8-3Z" /><path d="m8 12 3 3 5-6" /></> : null}
  </svg>;
}

const pathways = [
  { kind: "globe", title: "Country intelligence", text: "Find where you fit.", number: "01" },
  { kind: "book", title: "Practical education", text: "Build skills for life abroad.", number: "02" },
  { kind: "plan", title: "Your personal plan", text: "Know your next move.", number: "03" },
] as const;

export default function TGPIAuthShell({ children, mode }: TGPIAuthShellProps) {
  const joining = mode !== "sign-in";
  return (
    <main className={styles.page} data-access-version="3" data-access-mode={mode}>
      <div className={styles.shell}>
        <section className={styles.story} aria-label="Global education and decision intelligence">
          <Image src="/images/auth/tgpi-global-library-v1.webp" alt="Globe and books in a sunlit research library overlooking an international city" fill priority sizes="(min-width: 1024px) 520px, 1px" className={styles.photo} />
          <div className={styles.shade} />
          <Link href="/" className={styles.brand} aria-label="TGPI home">
            <span className={styles.crest}><BrandCrest fill sizes="44px" className="object-contain" /></span>
            <span><strong>TGPI</strong><small>The Global Polymath Institute</small></span>
          </Link>
          <div className={styles.storyCopy}>
            <span className={styles.eyebrow}><span className={styles.signal} />{" "}<LocalizedText text="Education for a global life" /></span>
            <h1><LocalizedText text="Your world." /><br />A clearer direction.</h1>
            <p>Understand your options. Build your skills.<br />Create a global plan that starts with you.</p>
          </div>
          <div className={styles.pathways} aria-label="Your TGPI journey">
            {pathways.map(item => <article key={item.kind} className={styles.pathway}><span className={styles.pathwayIcon}><AccessSymbol kind={item.kind} /></span><div><h2>{item.title}</h2><p>{item.text}</p></div><span className={styles.pathwayNumber}>{item.number}</span></article>)}
          </div>
          <div className={styles.storyFoot}><span>Explore. Learn. Decide.</span><span>One connected workspace.</span></div>
        </section>
        <section className={styles.panel} aria-label={joining ? "Create your TGPI account" : "Sign in to your TGPI account"}>
          <div className={styles.formWrap}>
            <div className={styles.mobileBrand}><Link href="/" aria-label="TGPI home"><BrandCrest width={30} height={36} /><strong>TGPI</strong></Link><span>Global education & intelligence</span></div>
            <div className={styles.panelTop}><span className={styles.accessLabel}>{joining ? "Your global journey starts here" : "Your global workspace"}</span><Link href="/" className={styles.back}>← Home</Link></div>
            {joining ? <ol className={styles.steps} aria-label="Registration steps"><li aria-current={mode === "sign-up" ? "step" : undefined}><span>1</span> Secure access</li><li aria-current={mode === "welcome" ? "step" : undefined}><span>2</span> Your profile</li></ol> : null}
            <div className={styles.authWidget}>{children}</div>
            <div className={styles.security}><AccessSymbol kind="shield" /><p>Secure access. Your progress stays connected.</p></div>
            <nav className={styles.legal} aria-label="Account help and policies"><Link href="/privacy"><LocalizedText text="Privacy" /></Link><span aria-hidden="true">·</span><Link href="/terms"><LocalizedText text="Terms" /></Link><span aria-hidden="true">·</span><a href="mailto:contact@theglobalpolymath.com">Need help?</a></nav>
          </div>
        </section>
      </div>
    </main>
  );
}
