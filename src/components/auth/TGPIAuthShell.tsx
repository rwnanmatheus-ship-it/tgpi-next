import Image from "next/image";
import Link from "next/link";
import BrandCrest from "@/components/BrandCrest";
import styles from "./auth.module.css";

type TGPIAuthShellProps = {
  children: React.ReactNode;
  mode: "sign-in" | "sign-up" | "welcome";
};

export default function TGPIAuthShell({ children, mode }: TGPIAuthShellProps) {
  const joining = mode !== "sign-in";
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <section className={styles.story} aria-label="Your global journey with TGPI">
          <Image src="/images/auth/tgpi-global-library-v1.webp" alt="A navy and brass globe in a sunlit international research library overlooking a city" fill priority sizes="(min-width: 1024px) 48vw, 100vw" className={styles.photo} />
          <div className={styles.shade} />
          <Link href="/" className={styles.brand} aria-label="TGPI home">
            <span className={styles.crest}><BrandCrest fill sizes="48px" className="object-contain" /></span>
            <span><strong>TGPI</strong><small>The Global Polymath Institute</small></span>
          </Link>
          <div className={styles.storyCopy}>
            <span className={styles.eyebrow}>Your world. Your next chapter.</span>
            <h1>{joining ? "A world of possibilities. A plan of your own." : "Your next chapter starts with clarity."}</h1>
            <p>Compare countries. Build practical skills. Turn your global ambitions into informed decisions.</p>
            <div className={styles.pillars}><span>Country Fit</span><span>Compare</span><span>Personal Plan</span></div>
          </div>
          <p className={styles.caption}>THE WORLD IS OPEN. MAKE YOUR MOVE WITH PURPOSE.</p>
        </section>
        <section className={styles.panel} aria-label={joining ? "Create your TGPI account" : "Sign in to your TGPI account"}>
          <div className={styles.formWrap}>
            <div className={styles.mobileBrand}><BrandCrest width={36} height={42} /><strong>TGPI</strong></div>
            <nav className={styles.tabs} aria-label="Account access">
              <Link href="/sign-in" aria-current={mode === "sign-in" ? "page" : undefined}>Sign in</Link>
              <Link href="/sign-up" aria-current={joining ? "page" : undefined}>Create account</Link>
            </nav>
            {joining ? <ol className={styles.steps} aria-label="Registration steps"><li aria-current={mode === "sign-up" ? "step" : undefined}><span>1</span> Secure access</li><li aria-current={mode === "welcome" ? "step" : undefined}><span>2</span> Your profile</li></ol> : null}
            <div className={styles.authWidget}>{children}</div>
            <div className={styles.security}><span aria-hidden="true">◈</span><p><strong>Your account, protected.</strong><br />Verify your email to join. Manage your account and active devices in Settings.</p></div>
            <p className={styles.legal}><Link href="/privacy">Privacy policy</Link><span aria-hidden="true">·</span><Link href="/terms">Terms of use</Link><span aria-hidden="true">·</span><Link href="/">Back to TGPI</Link></p>
          </div>
        </section>
      </div>
    </main>
  );
}
