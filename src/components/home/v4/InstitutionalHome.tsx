import Image from "next/image";
import Link from "next/link";
import { coursesOverview } from "@/data/courses-overview";
import { HOME_COURSES, HOME_FAQ, HOME_HERO_DESCRIPTION, HOME_ROUTES as routes } from "@/lib/home-content";
import type { HomeGoal } from "@/lib/home-journey";
import { HOME_ART_ROOT, HOME_PRODUCTS, homeProductArt } from "@/lib/home-showcase";
import { TGPI_PREMIUM_PLAN } from "@/lib/subscription-plans";
import BrandCrest from "@/components/BrandCrest";
import ProductSeal from "@/components/brand/ProductSeal";
import { LocalizedText, LocalizedRegion } from "@/components/localization/LocaleProvider";
import HomeAccountLink from "./HomeAccountLink";
import HomeGoalExplorer from "./HomeGoalExplorer";
import { HomeGoalProvider } from "./HomeGoalState";
import HomeSectionNav from "./HomeSectionNav";
import HomeProductExplorer from "./HomeProductExplorer";
import HomeCourseFinder, { type HomeCourse } from "./HomeCourseFinder";
import HomeCertificatePreview from "./HomeCertificatePreview";
import styles from "./home.module.css";

const featuredCourses: HomeCourse[] = HOME_COURSES.flatMap(({ id, group, art, alt }) => {
  // Keep catalogue data authoritative and send only card metadata to the browser.
  const course = coursesOverview.find(item => item.id === id && item.status === "available");
  return course ? [{
    id, group, title: course.title, href: course.href, image: `${HOME_ART_ROOT}/${art}.webp`,
    imageAlt: alt, description: course.desc, duration: course.duration, series: course.series,
    certificate: course.learningPolicy?.credentialStatus === "criteria_available",
  }] : [];
});

const quickLinks = [
  { id: "compare", label: "Compare destinations", href: routes.compare },
  { id: "learning", label: "View the learning catalogue", href: routes.learning },
  { id: "integrity", label: "Verify a credential", href: "/verify" },
] as const;

const t = (text: string) => <LocalizedText text={text} />;

export default function InstitutionalHome({ initialGoal }: { initialGoal: HomeGoal }) {
  return (
    <main className={styles.home}>
      <section className={styles.hero} aria-labelledby="home-title">
        <div className={`${styles.container} ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <div className={styles.heroBrand}>
              <BrandCrest alt="" width={42} height={51} sizes="42px" />
              <p className={styles.eyebrow}>{t("The Global Polymath Institute")}</p>
            </div>
            <h1 id="home-title">{t("Make your next move abroad.")} <em>{t("With a plan.")}</em></h1>
            <p className={styles.heroDescription}>{t(HOME_HERO_DESCRIPTION)}</p>
            <div className={styles.actions}>
              <a href="#how-it-works" className={styles.primary}>{t("Find my starting point")} <span aria-hidden="true">↓</span></a>
              <HomeAccountLink className={styles.outlineButton} placement="hero" />
            </div>
          </div>
          <div className={styles.heroArt}>
            <Image src={homeProductArt("hero")} alt="" fill sizes="(max-width: 720px) 92vw, (max-width: 1320px) 52vw, 690px" preload />
            <div className={styles.heroImageLabel} aria-hidden="true">
              <span>TGPI</span><span>{t("Global Decision System")}</span>
            </div>
          </div>
        </div>
        <LocalizedRegion as="nav" label="Featured TGPI products" className={styles.heroRail}>
          <ul className={styles.container}>
            {quickLinks.map(({ id, label, href }) => (
              <li key={id}>
                <Link href={href} prefetch={false}>
                  <ProductSeal product={id} />
                  <span>{t(label)}</span>
                  <span className={styles.railArrow} aria-hidden="true">↗</span>
                </Link>
              </li>
            ))}
          </ul>
        </LocalizedRegion>
      </section>

      <HomeSectionNav />

      <HomeGoalProvider initialGoal={initialGoal}>
        <section className={styles.journeySection} aria-labelledby="how-title" id="how-it-works" tabIndex={-1}>
          <div className={styles.container}>
            <div className={styles.splitIntro}>
              <div>
                <p className={styles.eyebrow}>{t("Your journey")}</p>
                <h2 id="how-title">{t("Where do you want")} <em>{t("to go next?")}</em></h2>
              </div>
              <p>{t("Choose a goal to see a first step, suggested tools and courses for your plans.")}</p>
            </div>
            <HomeGoalExplorer />
          </div>
        </section>

        <section className={styles.spotlightSection} aria-labelledby="demo-title" id="product-demo" tabIndex={-1}>
          <div className={styles.container}>
            <div className={styles.splitIntro}>
              <div>
                <p className={styles.eyebrow}>{t("The TGPI product collection")}</p>
                <h2 id="demo-title">{t("One system for life abroad.")}</h2>
              </div>
              <p>{t("Explore destinations, prepare for the move, develop practical skills and verify what you achieve.")}</p>
            </div>
            <article className={styles.atlasFeature} data-home-product="atlas">
              <div className={styles.atlasCopy}>
                <div className={styles.atlasBrand}>
                  <ProductSeal product="atlas" />
                  <p className={styles.eyebrow}>{t("Artificial intelligence")}</p>
                </div>
                <h3>{t(HOME_PRODUCTS.atlas.name)}</h3>
                <p>{t("Bring a question about moving, studying or working abroad. Atlas helps you break it down and find relevant tools in TGPI.")}</p>
                <div className={styles.atlasActions}>
                  <Link href={HOME_PRODUCTS.atlas.href} className={styles.lightButton} prefetch={false}>
                    {t("Ask Atlas")} <span aria-hidden="true">↗</span>
                  </Link>
                  <small>{t(HOME_PRODUCTS.atlas.access)}</small>
                </div>
              </div>
              <div className={styles.atlasArt}>
                <Image src={homeProductArt("atlas")} alt="" fill sizes="(max-width: 720px) 92vw, (max-width: 1320px) 55vw, 710px" />
              </div>
            </article>
          </div>
        </section>

        <section className={styles.directorySection} aria-labelledby="capabilities-title" id="capabilities" tabIndex={-1}>
          <div className={styles.container}>
            <div className={styles.splitIntro}>
              <div>
                <p className={styles.eyebrow}>{t("Explore the platform")}</p>
                <h2 id="capabilities-title">{t("Tools for your next move.")}</h2>
              </div>
              <p>{t("Use the recommendations for your goal or search the full TGPI product collection.")}</p>
            </div>
            <HomeProductExplorer />
          </div>
        </section>

        <section className={styles.learningSection} aria-labelledby="learning-title" id="practical-learning" tabIndex={-1}>
          <div className={styles.container}>
            <div className={styles.splitIntro}>
              <div>
                <p className={styles.eyebrow}>{t("TGPI Academy · Applied education")}</p>
                <h2 id="learning-title">{t("Learn for the situations")} <em>{t("you’ll face abroad.")}</em></h2>
              </div>
              <div>
                <p>{t("Practise real situations in language, mobility and work. Explore six featured courses or browse the full catalogue.")}</p>
                <Link href={routes.learning} className={styles.textLink} prefetch={false}>
                  {t("View the learning catalogue")} <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
            <HomeCourseFinder courses={featuredCourses} />
          </div>
        </section>
      </HomeGoalProvider>

      <section className={styles.certificateSection} aria-labelledby="certificate-title" id="certification" tabIndex={-1}>
        <div className={`${styles.container} ${styles.certificateGrid}`}>
          <div className={styles.certificateCopy}>
            <p className={styles.eyebrow}>{t("TGPI certification")}</p>
            <h2 id="certificate-title">{t("Show what")} <em>{t("you’ve learned.")}</em></h2>
            <p>{t("A distinctive certificate for the learning you complete. Your full name, course, workload and verification details come together in a document you can download and share.")}</p>
            <ol className={styles.certificateSteps}>
              <li><span>01</span><div><h3>{t("Learn and demonstrate")}</h3><p>{t("Complete the course activities and its assessment requirements.")}</p></div></li>
              <li><span>02</span><div><h3>{t("Connect your identity")}</h3><p>{t("Confirm your identity and the sharing settings required for issuance.")}</p></div></li>
              <li><span>03</span><div><h3>{t("Present your achievement")}</h3><p>{t("Download your PDF and use the verification record available for your certificate.")}</p></div></li>
            </ol>
            <div className={styles.actions}>
              <Link href={HOME_PRODUCTS.certificates.href} className={styles.goldButton} prefetch={false}>
                {t("Explore TGPI certification")} <span aria-hidden="true">↗</span>
              </Link>
              <Link href="/verify" className={styles.lightButton} prefetch={false}>
                {t("Verify a credential")} <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <p className={styles.certificateLegal}>{t("TGPI certificates document assessed learning. They are not academic degrees, professional licences or a claim of external accreditation.")}</p>
          </div>
          <HomeCertificatePreview />
        </div>
      </section>

      <section className={styles.membershipSection} aria-labelledby="membership-title" id="membership" tabIndex={-1}>
        <div className={styles.container}>
          <div className={styles.splitIntro}>
            <div>
              <p className={styles.eyebrow}>{t("Free & Premium")}</p>
              <h2 id="membership-title">{t("Start freely.")} <em>{t("Grow with Premium.")}</em></h2>
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
              <Link href={routes.countries} className={styles.outlineButton} prefetch={false}>{t("Start exploring")} <span aria-hidden="true">↗</span></Link>
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
                <Image src={homeProductArt("premium")} alt="" fill sizes="(max-width: 940px) 92vw, 410px" />
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
              <Link href={HOME_PRODUCTS.premium.href} className={styles.goldButton} prefetch={false}>
                {t("View Premium membership")} <span aria-hidden="true">↗</span>
              </Link>
              <p className={styles.planNote}>{t("Monthly renewal until cancelled. Confirm the amount and recurring terms at checkout. Your bank may apply conversion fees.")}</p>
            </article>
          </div>
          <p className={styles.planFootnote}>
            {t("Public comparison, research-plan saving and current learning routes are also available without a paid subscription. Premium does not change the three-country comparison or five-country shortlist limits in the current release.")}{" "}
            <Link href="/billing-terms" prefetch={false}>{t("Billing terms")}</Link> · <Link href="/refunds" prefetch={false}>{t("Refunds & cancellation")}</Link>
          </p>
        </div>
      </section>

      <section className={styles.trustSection} aria-labelledby="trust-title" id="questions" tabIndex={-1}>
        <div className={`${styles.container} ${styles.trustGrid}`}>
          <div>
            <p className={styles.eyebrow}>{t("The Global Polymath Institute")}</p>
            <h2 id="trust-title">{t("Know where the")} <em>{t("evidence comes from.")}</em></h2>
            <p>{t("TGPI connects practical education, country research and preparation for international life. We show source context and uncertainty so you can investigate your options with greater clarity.")}</p>
            <LocalizedRegion as="nav" className={styles.trustLinks} label="Institutional information">
              <Link href={routes.methodology} prefetch={false}>{t("Sources & methodology ↗")}</Link>
              <Link href="/about" prefetch={false}>{t("About TGPI ↗")}</Link>
              <Link href="/legal" prefetch={false}>{t("Company & legal ↗")}</Link>
              <a href="mailto:contact@theglobalpolymath.com">{t("Contact support ↗")}</a>
            </LocalizedRegion>
            <p className={styles.visualNote}>{t("Homepage photography-style illustrations were generated for TGPI.")}</p>
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
