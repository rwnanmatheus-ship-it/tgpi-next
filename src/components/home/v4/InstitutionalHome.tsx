import Image from "next/image";
import Link from "next/link";
import { coursesOverview } from "@/data/courses-overview";
import { HOME_FAQ, HOME_HERO_DESCRIPTION, HOME_ROUTES as routes } from "@/lib/home-content";
import { HOME_PRODUCTS, HOME_SPOTLIGHT, homeProductArt } from "@/lib/home-showcase";
import { TGPI_PREMIUM_PLAN } from "@/lib/subscription-plans";
import BrandCrest from "@/components/BrandCrest";
import ProductSeal from "@/components/brand/ProductSeal";
import brandStyles from "@/components/brand/showcase-brand.module.css";
import { LocalizedText, LocalizedRegion } from "@/components/localization/LocaleProvider";
import HomeAccountLink from "./HomeAccountLink";
import HomeGoalExplorer from "./HomeGoalExplorer";
import HomeSectionNav from "./HomeSectionNav";
import HomeProductCard from "./HomeProductCard";
import HomeProductExplorer from "./HomeProductExplorer";
import HomeCourseFinder from "./HomeCourseFinder";
import HomeCertificatePreview from "./HomeCertificatePreview";
import styles from "./home.module.css";

const featuredCourses = [
  { id: "global-english-2026", group: "language" },
  { id: "country-fit", group: "mobility" },
  { id: "relocation-budget", group: "mobility" },
  { id: "international-career", group: "career" },
  { id: "ai-workflow-foundations", group: "career" },
  { id: "critical-thinking", group: "career" },
].flatMap(({ id, group }) => {
  // Send catalogue metadata to the filter while keeping lesson and assessment content on the server.
  const course = coursesOverview.find(item => item.id === id && item.status === "available");
  return course ? [{
    id, group, title: course.title, href: course.href, image: course.image, imageAlt: course.imageAlt,
    description: course.desc, duration: course.duration,
    certificate: course.learningPolicy?.credentialStatus === "criteria_available",
  }] : [];
});

export default function InstitutionalHome() {
  const t = (text: string) => <LocalizedText text={text} />;
  return (
    <main className={`${styles.home} ${brandStyles.theme}`}>
      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.heroArt}>
          <Image src={homeProductArt("hero")} alt="" fill sizes="(max-width: 767px) 100vw, 72vw" preload />
        </div>
        <div className={`${styles.container} ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <div className={styles.heroBrand}>
              <BrandCrest alt="" width={48} height={59} sizes="48px" />
              <p className={styles.eyebrow}>{t("The Global Polymath Institute")}</p>
            </div>
            <h1 id="home-title">{t("Learn for life abroad.")}<br /><em>{t("Decide with clarity.")}</em></h1>
            <p className={styles.heroDescription}>{t(HOME_HERO_DESCRIPTION)}</p>
            <div className={styles.actions}>
              <HomeAccountLink className={styles.goldButton} placement="hero" />
              <Link href="#product-demo" className={styles.heroButton}>
                {t("Explore TGPI products")} <span aria-hidden="true">↓</span>
              </Link>
            </div>
          </div>
          <div className={styles.heroIndex} aria-hidden="true">
            <span />
            <span>TGPI</span>
            <span>2026</span>
          </div>
        </div>
        <LocalizedRegion as="nav" label="Featured TGPI products" className={styles.heroRail}>
          <ul className={styles.container}>
            {HOME_SPOTLIGHT.map(id => (
              <li key={id}>
                <Link href={HOME_PRODUCTS[id].href} prefetch={false}>
                  <ProductSeal product={id} />
                  <span>{t(HOME_PRODUCTS[id].name)}</span>
                  <span className={styles.railArrow} aria-hidden="true">↗</span>
                </Link>
              </li>
            ))}
          </ul>
        </LocalizedRegion>
      </section>

      <HomeSectionNav />

      <section className={styles.spotlightSection} aria-labelledby="demo-title" id="product-demo" tabIndex={-1}>
        <div className={styles.container}>
          <div className={styles.splitIntro}>
            <div>
              <p className={styles.eyebrow}>{t("The TGPI product collection")}</p>
              <h2 id="demo-title">{t("Meet the TGPI ecosystem.")}</h2>
            </div>
            <p>{t("Explore the products that connect artificial intelligence, practical education and credential verification.")}</p>
          </div>
          <div className={styles.spotlightGrid}>
            {HOME_SPOTLIGHT.map(id => <HomeProductCard key={id} id={id} spotlight />)}
          </div>
        </div>
      </section>

      <section className={`${styles.container} ${styles.section}`} aria-labelledby="capabilities-title" id="capabilities" tabIndex={-1}>
        <div className={styles.splitIntro}>
          <div>
            <p className={styles.eyebrow}>{t("Explore the platform")}</p>
            <h2 id="capabilities-title">{t("Tools for your next move.")}</h2>
          </div>
          <p>{t("Research countries, prepare a move and keep your plans, progress and identity connected.")}</p>
        </div>
        <HomeProductExplorer />
      </section>

      <section className={styles.learningSection} aria-labelledby="learning-title" id="practical-learning" tabIndex={-1}>
        <div className={styles.container}>
          <div className={styles.splitIntro}>
            <div>
              <p className={styles.eyebrow}>{t("TGPI Academy · Applied education")}</p>
              <h2 id="learning-title">{t("Knowledge that goes")}<br /><em>{t("where you go.")}</em></h2>
            </div>
            <div>
              <p>{t("Build language, decision and professional skills through lessons, practical scenarios and assessments. Your progress stays connected to your account.")}</p>
              <Link href={routes.learning} className={styles.textLink}>
                {t("View the learning catalogue")} <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
          <HomeCourseFinder courses={featuredCourses} />
        </div>
      </section>

      <section className={styles.certificateSection} aria-labelledby="certificate-title" id="certification" tabIndex={-1}>
        <div className={`${styles.container} ${styles.certificateGrid}`}>
          <HomeCertificatePreview />
          <div className={styles.certificateCopy}>
            <p className={styles.eyebrow}>{t("TGPI certification")}</p>
            <h2 id="certificate-title">{t("Your effort.")}<br /><em>{t("Made visible.")}</em></h2>
            <p>{t("A distinctive certificate for the learning you complete. Your full name, course, workload and verification details come together in a document you can download and share.")}</p>
            <ol className={styles.certificateSteps}>
              <li><span>01</span><div><h3>{t("Learn and demonstrate")}</h3><p>{t("Complete the course activities and its assessment requirements.")}</p></div></li>
              <li><span>02</span><div><h3>{t("Connect your identity")}</h3><p>{t("Confirm your identity and the sharing settings required for issuance.")}</p></div></li>
              <li><span>03</span><div><h3>{t("Present your achievement")}</h3><p>{t("Download your PDF and use the verification record available for your certificate.")}</p></div></li>
            </ol>
            <div className={styles.certificateActions}>
              <Link href={HOME_PRODUCTS.certificates.href} className={styles.darkButton}>
                {t("Explore TGPI certification")} <span aria-hidden="true">↗</span>
              </Link>
              <Link href="/verify" className={styles.textLink}>
                {t("Verify a credential")} <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <p className={styles.certificateLegal}>{t("TGPI certificates document assessed learning. They are not academic degrees, professional licences or a claim of external accreditation.")}</p>
          </div>
        </div>
      </section>

      <section className={`${styles.container} ${styles.section}`} aria-labelledby="how-title" id="how-it-works" tabIndex={-1}>
        <div className={styles.splitIntro}>
          <div>
            <p className={styles.eyebrow}>{t("Your journey")}</p>
            <h2 id="how-title">{t("Where do you want")}<br /><em>{t("to go next?")}</em></h2>
          </div>
          <p>{t("Choose what matters now. TGPI connects your objective to the tools, questions and learning that help you take the next step.")}</p>
        </div>
        <HomeGoalExplorer />
      </section>

      <section className={styles.membershipSection} aria-labelledby="membership-title" id="membership" tabIndex={-1}>
        <div className={styles.container}>
          <div className={styles.splitIntro}>
            <div>
              <p className={styles.eyebrow}>{t("Free & Premium")}</p>
              <h2 id="membership-title">{t("Start freely.")}<br /><em>{t("Grow with Premium.")}</em></h2>
            </div>
            <p>{t("Research first. Create an account when you want to save your work. Choose Premium for the protected command center.")}</p>
          </div>
          <div className={styles.planGrid}>
            <article className={styles.plan}>
              <p className={styles.eyebrow}>{t("Without an account")}</p>
              <h3>{t("Explore.")}</h3>
              <p className={styles.price}>{t("Free")}</p>
              <ul>
                <li>{t("Explore country profiles and source context.")}</li>
                <li>{t("Compare up to three countries at a time.")}</li>
                <li>{t("Try Country Fit and browse available courses.")}</li>
              </ul>
              <Link href={routes.countries} className={styles.outlineButton}>{t("Start exploring")} <span aria-hidden="true">↗</span></Link>
            </article>
            <article className={styles.plan}>
              <p className={styles.eyebrow}>{t("Your free account")}</p>
              <h3>{t("Make it yours.")}</h3>
              <p className={styles.price}>{t("US$ 0")}</p>
              <ul>
                <li>{t("Save a research plan and up to five countries of interest.")}</li>
                <li>{t("Continue lessons and track learning progress.")}</li>
                <li>{t("Connect preparation and activity in your Workspace.")}</li>
              </ul>
              <HomeAccountLink className={styles.outlineButton} placement="free-plan" />
              <p className={styles.planNote}>{t("No subscription required.")}</p>
            </article>
            <article className={`${styles.plan} ${styles.premiumPlan}`} data-home-product="premium">
              <div className={styles.premiumArt}>
                <Image src={homeProductArt("premium")} alt="" fill sizes="(max-width: 900px) 92vw, 400px" />
              </div>
              <div className={styles.premiumBrand}>
                <ProductSeal product="premium" />
                <p className={styles.eyebrow}>{t(HOME_PRODUCTS.premium.name)}</p>
              </div>
              <h3>{t("Your connected view.")}</h3>
              <p className={styles.price}>{TGPI_PREMIUM_PLAN.price}<span>{t(TGPI_PREMIUM_PLAN.cadence ?? "")}</span></p>
              <p className={styles.premiumDescription}>{t(HOME_PRODUCTS.premium.description)}</p>
              <ul>
                <li>{t("Access the protected Premium Command Center.")}</li>
                <li>{t("Review your membership and manage billing.")}</li>
              </ul>
              <Link href={HOME_PRODUCTS.premium.href} className={styles.goldButton}>
                {t("View Premium membership")} <span aria-hidden="true">↗</span>
              </Link>
              <p className={styles.planNote}>{t("Monthly renewal until cancelled. Confirm the amount and recurring terms at checkout. Your bank may apply conversion fees.")}</p>
            </article>
          </div>
          <p className={styles.planFootnote}>
            {t("Public comparison, research-plan saving and current learning routes are also available without a paid subscription. Premium does not change the three-country comparison or five-country shortlist limits in the current release.")}{" "}
            <Link href="/billing-terms">{t("Billing terms")}</Link> · <Link href="/refunds">{t("Refunds & cancellation")}</Link>
          </p>
        </div>
      </section>

      <section className={styles.trustSection} aria-labelledby="trust-title" id="questions" tabIndex={-1}>
        <div className={`${styles.container} ${styles.trustGrid}`}>
          <div>
            <p className={styles.eyebrow}>{t("The Global Polymath Institute")}</p>
            <h2 id="trust-title">{t("Perspective.")}<br /><em>{t("With responsibility.")}</em></h2>
            <p>{t("TGPI connects practical education, country research and preparation for international life. We show source context and uncertainty so you can investigate your options with greater clarity.")}</p>
            <p>{t("Research supports a decision. It does not guarantee a visa, a job or admission.")}</p>
            <LocalizedRegion as="nav" className={styles.trustLinks} label="Institutional information">
              <Link href={routes.methodology}>{t("Sources & methodology ↗")}</Link>
              <Link href="/about">{t("About TGPI ↗")}</Link>
              <Link href="/legal">{t("Company & legal ↗")}</Link>
              <a href="mailto:contact@theglobalpolymath.com">{t("Contact support ↗")}</a>
            </LocalizedRegion>
          </div>
          <div className={styles.faq}>
            <h3>{t("Before your next step.")}</h3>
            {HOME_FAQ.map(item => (
              <details key={item.question}>
                <summary>{t(item.question)}<span aria-hidden="true">+</span></summary>
                <p>{t(item.answer)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
