import Link from "next/link";
import NavigationLink from "@/components/navigation/NavigationLink";
import { coursesOverview } from "@/data/courses-overview";
import { academyManifest } from "@/data/courses/academy/manifest";
import { HOME_FAQ, HOME_ROUTES as routes } from "@/lib/home-content";
import { TGPI_PREMIUM_PLAN } from "@/lib/subscription-plans";
import { LocalizedText, LocalizedRegion } from "@/components/localization/LocaleProvider";
import CinematicImage from "@/components/ui/CinematicImage";
import HomeAccountLink from "./HomeAccountLink";
import HomeGoalExplorer from "./HomeGoalExplorer";
import HomeSectionNav from "./HomeSectionNav";
import HomeProductExplorer from "./HomeProductExplorer";
import HomeCourseFinder from "./HomeCourseFinder";
import HomeCertificatePreview from "./HomeCertificatePreview";
import styles from "./home.module.css";

const ecosystem = [
  { title: "Country intelligence", copy: "Explore countries", href: routes.countries, mark: "01" },
  { title: "Country Fit", copy: "Build your Country Fit plan", href: routes.fit, mark: "02" },
  { title: "Compare", copy: "Compare your options", href: routes.compare, mark: "03" },
  { title: "TGPI Academy", copy: "Explore learning", href: routes.learning, mark: "04" },
  { title: "Atlas AI", copy: "Think through your next step", href: "/atlas", mark: "05" },
  { title: "TGPI Global Documents", copy: "Explore preparation", href: "/documents", mark: "06" },
  { title: "Global Key", copy: "Your identity inside TGPI", href: "/global-key", mark: "07" },
  { title: "Community", copy: "Connect around shared goals", href: "/community", mark: "08" },
] as const;

export default function InstitutionalHome() {
  const t = (text: string) => <LocalizedText text={text} />;
  // Only catalogue metadata crosses the interactive boundary, never lesson or assessment content.
  const ids = ["global-english-2026", "country-fit", "relocation-budget", "international-career", "ai-workflow-foundations", "critical-thinking"];
  const featured = ids.flatMap(id => {
    const course = coursesOverview.find(item => item.id === id && item.status === "available");
    return course ? [{ id, title: course.title, href: course.href, image: course.image, imageAlt: course.imageAlt,
      description: course.desc, duration: course.duration, group: id === "global-english-2026" ? "language" : ["country-fit", "relocation-budget"].includes(id) ? "mobility" : "career",
      certificate: course.learningPolicy?.credentialStatus === "criteria_available" }] : [];
  });
  const courseCount = Object.keys(academyManifest).length;

  return <main className={styles.home}>
    <section className={styles.hero} aria-labelledby="home-title">
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{t("TGPI · The Global Polymath Institute")}</p>
          <h1 id="home-title">{t("Your future.")}<br /><em>{t("A world of possibilities.")}</em></h1>
          <p className={styles.heroDescription}>{t("Learn practical skills. Compare countries. Build your next chapter with education and intelligence in one connected platform.")}</p>
          <div className={styles.actions}><HomeAccountLink className={styles.primary} placement="hero" /><Link href="#product-demo" className={styles.lightLink}>{t("Discover your possibilities")} <span aria-hidden="true">↗</span></Link></div>
          <p className={styles.heroNote}>{t("Free to begin. Built to move forward.")}</p>
          <div className={styles.heroProof}><span>{t("Applied learning")}</span><span>{t("Verifiable certificates")}</span><span>{t("Connected tools")}</span></div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.heroPhoto}><CinematicImage asset="global-horizon" alt="TGPI conceptual editorial image: preparing for international life" priority sizes="(max-width: 1023px) 94vw, 52vw" position="60% center" /><div className={styles.heroImageLabel}><span>{t("THE WORLD IS YOUR NEXT CHAPTER")}</span><span aria-hidden="true">↗</span></div></div>
          <div className={styles.heroDock}><div><span className={styles.statusDot} aria-hidden="true" />{t("One platform. Your next chapter.")}</div><div className={styles.heroDockLinks}><Link href="/courses">{t("Learn")} <span aria-hidden="true">↗</span></Link><Link href="/countries">{t("Explore")} <span aria-hidden="true">↗</span></Link><NavigationLink href="/profile">{t("My workspace")} <span aria-hidden="true">↗</span></NavigationLink></div></div>
        </div>
      </div>
      <div className={`${styles.container} ${styles.brandStrip}`}><p>{t("Education gives you capability. Intelligence gives you direction.")}</p><div><strong>{courseCount}</strong><span>{t("expanded learning paths")}</span></div><div><strong>01</strong><span>{t("connected ecosystem")}</span></div><Link href="#certification">{t("Explore TGPI certification")} <span aria-hidden="true">↗</span></Link></div>
    </section>

    <HomeSectionNav />

    <section className={`${styles.container} ${styles.section}`} aria-labelledby="how-title" id="how-it-works" tabIndex={-1}>
      <div className={styles.splitIntro}><div><p className={styles.eyebrow}>{t("Your ambition. A clearer direction.")}</p><h2 id="how-title">{t("Where do you want")}<br /><em>{t("to go next?")}</em></h2></div><p>{t("Choose what matters now. TGPI connects your objective to the tools, questions and learning that help you take the next step.")}</p></div>
      <HomeGoalExplorer />
    </section>

    <section className={styles.demoSection} aria-labelledby="demo-title" id="product-demo" tabIndex={-1}>
      <div className={styles.container}><div className={styles.splitIntro}><div><p className={styles.eyebrow}>{t("Meet your global toolkit")}</p><h2 id="demo-title">{t("Less scattered research.")}<br /><em>{t("More connected progress.")}</em></h2></div><p>{t("Explore how the platform works. Each tool leads to a real part of TGPI, ready for your own context.")}</p></div><HomeProductExplorer /></div>
    </section>

    <section className={`${styles.container} ${styles.section}`} aria-labelledby="capabilities-title" id="capabilities" tabIndex={-1}>
      <div className={styles.ecosystemIntro}><div><p className={styles.eyebrow}>{t("The TGPI ecosystem")}</p><h2 id="capabilities-title">{t("Everything has a next step.")}</h2></div><NavigationLink href="/profile" className={styles.textLink}>{t("Open your workspace")} <span aria-hidden="true">↗</span></NavigationLink></div>
      <div className={styles.ecosystemGrid}>{ecosystem.map(item => <Link href={item.href} className={styles.ecosystemItem} key={item.title}><span className={styles.ecosystemNumber}>{item.mark}</span><div><h3>{t(item.title)}</h3><p>{t(item.copy)}</p></div><span className={styles.ecosystemArrow} aria-hidden="true">↗</span></Link>)}</div>
    </section>

    <section className={styles.learningSection} aria-labelledby="learning-title" id="practical-learning" tabIndex={-1}>
      <div className={styles.container}><div className={styles.splitIntro}><div><p className={styles.eyebrow}>{t("TGPI Academy · Applied education")}</p><h2 id="learning-title">{t("Knowledge that goes")}<br /><em>{t("where you go.")}</em></h2></div><div><p>{t("Build language, decision and professional skills through lessons, practical scenarios and assessments. Your progress stays connected to your account.")}</p><Link href={routes.learning} className={styles.textLink}>{t("View the learning catalogue")} <span aria-hidden="true">↗</span></Link></div></div><HomeCourseFinder courses={featured} /></div>
    </section>

    <section className={styles.certificateSection} aria-labelledby="certificate-title" id="certification" tabIndex={-1}>
      <div className={`${styles.container} ${styles.certificateGrid}`}><HomeCertificatePreview /><div className={styles.certificateCopy}><p className={styles.eyebrow}>{t("TGPI certification")}</p><h2 id="certificate-title">{t("Your effort.")}<br /><em>{t("Made visible.")}</em></h2><p>{t("A distinctive certificate for the learning you complete. Your full name, course, workload and verification details come together in a document you can download and share.")}</p><ol className={styles.certificateSteps}><li><span>01</span><div><h3>{t("Learn and demonstrate")}</h3><p>{t("Complete the course activities and its assessment requirements.")}</p></div></li><li><span>02</span><div><h3>{t("Connect your identity")}</h3><p>{t("Confirm your identity and the sharing settings required for issuance.")}</p></div></li><li><span>03</span><div><h3>{t("Present your achievement")}</h3><p>{t("Download your PDF and use the verification record available for your certificate.")}</p></div></li></ol><Link href="/certificates" className={styles.darkButton}>{t("Explore TGPI certification")} <span aria-hidden="true">↗</span></Link><p className={styles.certificateLegal}>{t("TGPI certificates document assessed learning. They are not academic degrees, professional licences or a claim of external accreditation.")}</p></div></div>
    </section>

    <section className={`${styles.container} ${styles.section}`} aria-labelledby="membership-title" id="membership" tabIndex={-1}>
      <div className={styles.sectionIntro}><p className={styles.eyebrow}><LocalizedText text="Choose how you begin" /></p><h2 id="membership-title"><LocalizedText text="Start freely." /><br /><LocalizedText text="Bring it together with Premium." /></h2><p>{t("Research first. Create an account when you want to save your work. Choose Premium for the protected command center.")}</p></div>
      <div className={styles.planGrid}>
        <article className={styles.plan}><p className={styles.eyebrow}><LocalizedText text="Without an account" /></p><h3><LocalizedText text="Explore." /></h3><p className={styles.price}><LocalizedText text="Free" /></p><ul><li><LocalizedText text="Explore country profiles and source context." /></li><li><LocalizedText text="Compare up to three countries at a time." /></li><li><LocalizedText text="Try Country Fit and browse available courses." /></li></ul><Link href={routes.countries} className={styles.outlineButton}><LocalizedText text="Start exploring" />{" "}<span aria-hidden="true">↗</span></Link></article>
        <article className={styles.plan}><p className={styles.eyebrow}><LocalizedText text="Your free account" /></p><h3><LocalizedText text="Make it yours." /></h3><p className={styles.price}><LocalizedText text={"US$ 0"} /></p><ul><li><LocalizedText text="Save a research plan and up to five countries of interest." /></li><li><LocalizedText text="Continue lessons and track learning progress." /></li><li><LocalizedText text="Connect preparation and activity in your Workspace." /></li></ul><HomeAccountLink className={styles.outlineButton} placement="free-plan" /><p className={styles.planNote}><LocalizedText text="No subscription required." /></p></article>
        <article className={`${styles.plan} ${styles.premiumPlan}`}><p className={styles.eyebrow}><LocalizedText text={"TGPI Premium"} /></p><h3><LocalizedText text="Your connected view." /></h3><p className={styles.price}>{TGPI_PREMIUM_PLAN.price}<span>{t(TGPI_PREMIUM_PLAN.cadence ?? "")}</span></p><ul><li><LocalizedText text="Access the protected Premium Command Center." /></li><li><LocalizedText text="View destinations, readiness, preparation and learning together." /></li><li><LocalizedText text="Review your membership and manage billing." /></li></ul><Link href={routes.pricing} className={styles.primary}><LocalizedText text="View Premium membership" />{" "}<span aria-hidden="true">↗</span></Link><p className={styles.planNote}>{t("Monthly renewal until cancelled. Confirm the amount and recurring terms at checkout. Your bank may apply conversion fees.")}</p></article>
      </div>
      <p className={styles.planFootnote}>{t("Public comparison, research-plan saving and current learning routes are also available without a paid subscription. Premium does not change the three-country comparison or five-country shortlist limits in the current release.")}{" "}<Link href="/billing-terms"><LocalizedText text="Billing terms" /></Link> · <Link href="/refunds"><LocalizedText text="Refunds & cancellation" /></Link></p>
    </section>

    <section className={styles.trustSection} aria-labelledby="trust-title" id="questions" tabIndex={-1}><div className={`${styles.container} ${styles.trustGrid}`}><div><p className={styles.eyebrow}><LocalizedText text={"The Global Polymath Institute"} /></p><h2 id="trust-title"><LocalizedText text="Perspective." /><br /><LocalizedText text="With responsibility." /></h2><p>{t("TGPI connects practical education, country research and preparation for international life. We show source context and uncertainty so you can investigate your options with greater clarity.")}</p><p><LocalizedText text="Research supports a decision. It does not guarantee a visa, a job or admission." /></p><LocalizedRegion as="nav" className={styles.trustLinks} label="Institutional information"><Link href={routes.methodology}><LocalizedText text="Sources & methodology ↗" /></Link><Link href="/about"><LocalizedText text="About TGPI ↗" /></Link><Link href="/legal"><LocalizedText text="Company & legal ↗" /></Link><a href="mailto:contact@theglobalpolymath.com"><LocalizedText text="Contact support ↗" /></a></LocalizedRegion></div><div className={styles.faq}><h3><LocalizedText text="Before your next step." /></h3>{HOME_FAQ.map(item => <details key={item.question}><summary>{t(item.question)}<span aria-hidden="true">+</span></summary><p>{t(item.answer)}</p></details>)}</div></div></section>

    <LocalizedRegion as="section" className={`${styles.container} ${styles.finalAction}`} label="Start your TGPI journey"><div><p className={styles.eyebrow}><LocalizedText text="Your next chapter starts with a question." /></p><p><LocalizedText text="Give it a place to grow." /></p></div><HomeAccountLink className={styles.darkButton} placement="closing" /></LocalizedRegion>
  </main>;
}
