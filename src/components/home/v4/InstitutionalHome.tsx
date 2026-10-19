import EditorialImage from "./EditorialImage";
import HomeGoalExplorer from "./HomeGoalExplorer";
import HomeSectionNav from "./HomeSectionNav";
import Link from "next/link";
import { coursesOverview } from "@/data/courses-overview";
import { getCourse } from "@/data/courses";
import snapshot from "@/data/intelligence/snapshot.json";
import { findObservation, type IntelligenceSnapshot } from "@/lib/intelligence/core";
import { EvidenceCard } from "@/components/intelligence/Evidence";
import { HOME_COURSES, HOME_FAQ, HOME_ROUTES as routes } from "@/lib/home-content";
import { TGPI_PREMIUM_PLAN } from "@/lib/subscription-plans";
import HomeAccountLink from "./HomeAccountLink";
import HomeResearchPreview from "./HomeResearchPreview";
import styles from "./home.module.css";

const capabilities = [
  { number: "01", title: "Explore countries", copy: "Understand destinations through country profiles, source-linked observations and visible evidence gaps.", href: routes.countries, cta: "Explore countries", question: "Which requirements depend on my nationality, destination and timeline? Use the profile as a starting point, then verify with the competent authority.", image: "decision", alt: "Maps and notebooks arranged to evaluate international options" },
  { number: "02", title: "Compare your options", copy: "Put up to three countries side by side. Investigate the trade-offs that matter to your own situation.", href: routes.compare, cta: "Compare countries", question: "Are these observations comparable? Check the source, reference year, definition and missing evidence before drawing a conclusion.", image: "country", alt: "A globe and maps on a practical research desk" },
  { number: "03", title: "Organize your preparation", copy: "Connect your destination, research questions and document tasks. Keep your next actions in view.", href: routes.documents, cta: "Explore preparation", question: "What must I verify before committing money? Start with the legal route, deadlines, dated cost estimates and document requirements.", image: "preparation", alt: "A neutral folder, checklist and notebook ready for personal planning" },
  { number: "04", title: "Build practical skills", copy: "Learn through applied scenarios in English, country decisions, relocation budgeting and international careers.", href: routes.learning, cta: "Explore learning", question: "Which everyday situation do I want to handle better? Choose a practical course and use an account to continue your learning progress.", image: "learning", alt: "Adults sharing ideas and learning together in a contemporary workspace" },
] as const;

export default function InstitutionalHome() {
  const featured = HOME_COURSES.flatMap(item => {
    const overview = coursesOverview.find(course => course.id === item.id && course.status === "available");
    const course = getCourse(item.id);
    return overview && course && course.modules.some(module => module.lessons.length) ? [{ ...item, overview }] : [];
  });

  return <main className={styles.home}>
    <section className={styles.hero} aria-labelledby="home-title">
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>TGPI · Practical education for life abroad</p>
          <h1 id="home-title">Compare countries.<br /><em>Prepare your<br className={styles.desktopBreak} /> next chapter.</em></h1>
          <p className={styles.heroDescription}>Explore destinations, compare your options and build practical skills for life abroad—in one connected platform.</p>
          <div className={styles.actions}><HomeAccountLink className={styles.primary} placement="hero" /><Link href={routes.compare} className={styles.lightLink}>See a real comparison <span aria-hidden="true">→</span></Link></div>
          <p className={styles.heroNote}>For your next move, your next course—or your first question.</p>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.heroPhoto}>
            <EditorialImage asset="hero" alt="An adult planning her international next step with a notebook and laptop beside an urban window" eager sizes="(max-width: 767px) calc(100vw - 44px), (max-width: 1023px) calc(100vw - 64px), (max-width: 1343px) 46vw, 600px" />
            <span className={styles.photoCaption}>Perspective begins with preparation.</span>
          </div>
          <HomeResearchPreview />
        </div>
      </div>
      <div className={`${styles.container} ${styles.journeyStrip}`} aria-label="Your TGPI journey"><span>Research with perspective.</span><span>Decide with context.</span><span>Prepare with purpose.</span></div>
    </section>

    <HomeSectionNav />

    <section className={`${styles.container} ${styles.section}`} aria-labelledby="how-title" id="how-it-works" tabIndex={-1}>
      <div className={styles.sectionIntro}><p className={styles.eyebrow}>A practical way forward</p><h2 id="how-title">From possibility<br />to a considered plan.</h2><p>You do not need every answer to begin. Start with the question that matters to you.</p></div>
      <HomeGoalExplorer />
      <ol className={styles.steps}>
        <li><span className={styles.stepNumber}>01</span><h3>Define your goal.</h3><p>Study, work, live abroad or simply explore. Add your budget, language and timeline to give the research direction.</p><Link href={routes.fit}>Build your Country Fit plan <span aria-hidden="true">↗</span></Link></li>
        <li><span className={styles.stepNumber}>02</span><h3>Explore the trade-offs.</h3><p>Compare your options with source context and visible gaps. Leave with a shortlist and questions worth investigating.</p><Link href={routes.compare}>Compare your options <span aria-hidden="true">↗</span></Link></li>
        <li><span className={styles.stepNumber}>03</span><h3>Prepare your next step.</h3><p>Organize document tasks and develop practical skills. With an account, return to your plan and learning progress.</p><Link href={routes.documents}>Explore preparation <span aria-hidden="true">↗</span></Link></li>
      </ol>
    </section>

    <section className={styles.demoSection} aria-labelledby="demo-title" id="product-demo" tabIndex={-1}>
      <div className={styles.container}>
        <div className={styles.demoIntro}><div><p className={styles.eyebrow}>See the product working</p><h2 id="demo-title">Two options.<br />Better questions.</h2></div><div><p>Considering Portugal and Canada for study? Start with comparable evidence. Then check the institution, your legal route and a city-level budget.</p><Link href={routes.compare} className={styles.textLink}>Open this public comparison <span aria-hidden="true">↗</span></Link></div></div>
        <div className={styles.demoFrame}>
          <div className={styles.demoBar}><span>TGPI / Compare</span><span>Public product sample</span></div>
          <div className={styles.evidenceGrid}>
            {[{ slug: "portugal", name: "Portugal", code: "PT" }, { slug: "canada", name: "Canada", code: "CA" }].map(country => <div key={country.slug} className={styles.evidenceCountry}><h3><Link href={`/countries/${country.slug}`}>{country.name} <span aria-hidden="true">↗</span></Link></h3><EvidenceCard countryCode={country.code} indicator="SE.TER.ENRR" observation={findObservation(snapshot as IntelligenceSnapshot, country.slug, "SE.TER.ENRR")} /></div>)}
          </div>
          <p className={styles.demoDisclaimer}>Real observations from TGPI’s bundled snapshot · Collected {snapshot.retrievedAt.slice(0, 10)}. The same evidence component is used in Compare. Enrolment describes national context; it does not measure education quality or your chances of admission. Open Compare for refreshed coverage.</p>
        </div>
      </div>
    </section>

    <section className={`${styles.container} ${styles.section}`} aria-labelledby="capabilities-title" id="capabilities" tabIndex={-1}>
      <div className={styles.sectionIntro}><p className={styles.eyebrow}>One journey, connected</p><h2 id="capabilities-title">A wider view.<br />A clearer next step.</h2><p>For people considering life abroad, preparing a move or building skills that travel.</p></div>
      <div className={styles.capabilityGrid}>{capabilities.map(item => <article className={styles.capability} key={item.number}><div className={styles.capabilityImage}><Link href={item.href} aria-label={item.cta}><EditorialImage asset={item.image} alt={item.alt} sizes="(max-width: 767px) calc(100vw - 44px), (max-width: 1343px) 45vw, 625px" /></Link><span aria-hidden="true">{item.number}</span></div><div className={styles.capabilityCopy}><h3>{item.title}</h3><p>{item.copy}</p><Link href={item.href} className={styles.textLink}>{item.cta}<span aria-hidden="true">↗</span></Link><details className={styles.capabilityDetails}><summary>A useful first question <span aria-hidden="true">+</span></summary><p>{item.question}</p></details></div></article>)}</div>
      <p className={styles.connectedNote}>Your <Link href={routes.workspace}>Workspace</Link> brings your activity together. Your <Link href="/global-key">Global Key</Link> connects your TGPI identity and learning records; it is a platform identity, not a government document.</p>
    </section>

    <section className={styles.learningSection} aria-labelledby="learning-title" id="practical-learning" tabIndex={-1}>
      <div className={styles.container}>
        <div className={styles.demoIntro}><div><p className={styles.eyebrow}>Practical education</p><h2 id="learning-title">Learn for the moments<br />that matter.</h2></div><div><p>Applied lessons for real decisions and everyday situations. Explore a course, then sign in to learn and save your progress.</p><Link href={routes.learning} className={styles.textLink}>View the learning catalogue <span aria-hidden="true">↗</span></Link></div></div>
        <div className={styles.courseGrid}>{featured.map(course => <article className={styles.course} key={course.id}><Link href={course.overview.href} className={styles.courseImage} aria-label={`Explore ${course.overview.title}`}><EditorialImage asset={course.asset} alt={course.alt} sizes="(max-width: 767px) calc(100vw - 44px), (max-width: 1343px) 29vw, 412px" /></Link><div className={styles.courseCopy}><p className={styles.courseMeta}>{course.overview.category} · {course.overview.duration}</p><h3><Link href={course.overview.href}>{course.overview.title}</Link></h3><p>{course.objective}</p><Link href={course.overview.href} className={styles.textLink}>Explore this course <span aria-hidden="true">↗</span></Link></div></article>)}</div>
        <aside className={styles.credentialNote}><span className={styles.credentialMark} aria-hidden="true">✓</span><div><h3>Learning you can document.</h3><p>Where verified certification is available, complete the lesson, assessment, reflection and identity requirements before issuance. TGPI credentials have a public verification record; they are not academic degrees or professional licences.</p><Link href="/certificates" className={styles.textLink}>Understand your certificates <span aria-hidden="true">↗</span></Link></div></aside>
      </div>
    </section>

    <section className={`${styles.container} ${styles.section}`} aria-labelledby="membership-title" id="membership" tabIndex={-1}>
      <div className={styles.sectionIntro}><p className={styles.eyebrow}>Choose how you begin</p><h2 id="membership-title">Start freely.<br />Bring it together with Premium.</h2><p>Research first. Create an account when you want to save your work. Choose Premium for the protected command center.</p></div>
      <div className={styles.planGrid}>
        <article className={styles.plan}><p className={styles.eyebrow}>Without an account</p><h3>Explore.</h3><p className={styles.price}>Free</p><ul><li>Explore country profiles and source context.</li><li>Compare up to three countries at a time.</li><li>Try Country Fit and browse available courses.</li></ul><Link href={routes.countries} className={styles.outlineButton}>Start exploring <span aria-hidden="true">↗</span></Link></article>
        <article className={styles.plan}><p className={styles.eyebrow}>Your free account</p><h3>Make it yours.</h3><p className={styles.price}>US$ 0</p><ul><li>Save a research plan and up to five countries of interest.</li><li>Continue lessons and track learning progress.</li><li>Connect preparation and activity in your Workspace.</li></ul><HomeAccountLink className={styles.outlineButton} placement="free-plan" /><p className={styles.planNote}>No subscription required.</p></article>
        <article className={`${styles.plan} ${styles.premiumPlan}`}><p className={styles.eyebrow}>TGPI Premium</p><h3>Your connected view.</h3><p className={styles.price}>{TGPI_PREMIUM_PLAN.price}<span>{TGPI_PREMIUM_PLAN.cadence}</span></p><ul><li>Access the protected Premium Command Center.</li><li>View destinations, readiness, preparation and learning together.</li><li>Review your membership and manage billing.</li></ul><Link href={routes.pricing} className={styles.primary}>View Premium membership <span aria-hidden="true">↗</span></Link><p className={styles.planNote}>Monthly renewal until cancelled. Confirm the amount and recurring terms at checkout. Your bank may apply conversion fees.</p></article>
      </div>
      <p className={styles.planFootnote}>Public comparison, research-plan saving and current learning routes are also available without a paid subscription. Premium does not change the three-country comparison or five-country shortlist limits in the current release. <Link href="/billing-terms">Billing terms</Link> · <Link href="/refunds">Refunds & cancellation</Link></p>
    </section>

    <section className={styles.trustSection} aria-labelledby="trust-title" id="questions" tabIndex={-1}><div className={`${styles.container} ${styles.trustGrid}`}><div><p className={styles.eyebrow}>The Global Polymath Institute</p><h2 id="trust-title">Perspective.<br />With responsibility.</h2><p>TGPI connects practical education, country research and preparation for international life. We show source context and uncertainty so you can investigate your options with greater clarity.</p><p>Research supports a decision. It does not guarantee a visa, a job or admission.</p><nav className={styles.trustLinks} aria-label="Institutional information"><Link href={routes.methodology}>Sources & methodology ↗</Link><Link href="/about">About TGPI ↗</Link><Link href="/legal">Company & legal ↗</Link><a href="mailto:contact@theglobalpolymath.com">Contact support ↗</a></nav></div><div className={styles.faq}><h3>Before your next step.</h3>{HOME_FAQ.map(item => <details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div></div></section>

    <section className={`${styles.container} ${styles.finalAction}`} aria-label="Start your TGPI journey"><div><p className={styles.eyebrow}>Your next chapter starts with a question.</p><p>Give it a place to grow.</p></div><HomeAccountLink className={styles.darkButton} placement="closing" /></section>
  </main>;
}
