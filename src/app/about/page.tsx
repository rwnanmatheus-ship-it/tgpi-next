import { localizeMetadata } from "@/lib/localization/metadata.server";
import { getLocale } from "@/lib/localization/server";
import { translate } from "@/lib/localization/messages";
import { LocalizedText } from "@/components/localization/LocaleProvider";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AboutNavigation from "@/components/about/AboutNavigation";
import styles from "@/components/about/about.module.css";

const sourceMetadata: Metadata = {
  title: "About TGPI | The Global Polymath Institute",
  description: "Discover The Global Polymath Institute: practical education, country intelligence and preparation for a more intentional global life.",
  alternates: { canonical: "/about" },
  openGraph: { title: "The Global Polymath Institute", description: "Understand the world. Develop your capabilities. Choose your next step.", url: "/about", images: [{ url: "/images/cinematic-2026/country-research-1600.webp", width: 1600, height: 900, alt: "A research globe overlooking a city at blue hour — TGPI conceptual editorial image" }] },
};

const pillars = [
  { name: "Data", question: "Understand the context.", text: "Explore countries through cost, culture, career and lifestyle. Put the questions that matter to you at the centre of your research.", href: "/countries", action: "Explore countries" },
  { name: "Education", question: "Build the capability.", text: "Develop practical knowledge for life across borders. Connect what you learn with the situations and decisions ahead of you.", href: "/courses", action: "Discover learning" },
  { name: "Mobility", question: "Prepare the next step.", text: "Bring readiness, documents and personal planning into the same journey. Turn an international ambition into clearer preparation.", href: "/documents", action: "Explore readiness" },
  { name: "Decision", question: "Choose with intention.", text: "Compare possibilities and their trade-offs. Give your priorities a structure before committing to a country or a new direction.", href: "/compare", action: "Compare your options" },
];

export default async function AboutPage() {
  const locale = await getLocale();
  const t = (key: string) => translate(locale, key);

  return <main className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "@id": "https://www.theglobalpolymath.com/about#webpage",
      url: "https://www.theglobalpolymath.com/about",
      name: "About TGPI | The Global Polymath Institute",
      mainEntity: { "@id": "https://www.theglobalpolymath.com/#organization" },
      isPartOf: { "@id": "https://www.theglobalpolymath.com/#website" },
    }).replace(/</g, "\\u003c") }} />
    <div className={styles.frame}>
      <section className={styles.hero} aria-labelledby="about-title">
        <Image src="/images/cinematic-2026/country-research-1600.webp" alt={t("A brass globe and open notebook overlooking an international city at blue hour")} fill sizes="(max-width: 1280px) 100vw, 1280px" priority className={styles.heroImage} />
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}><LocalizedText text={"The Global Polymath Institute"} /></p>
          <h1 id="about-title"><LocalizedText text="A wider world." /><br /><LocalizedText text={"A clearer"} />{" "}<em><LocalizedText text={"direction."} /></em></h1>
          <p className={styles.heroLead}><LocalizedText text={"Practical education and intelligence for people building a life beyond borders."} /></p>
          <div className={styles.actions}><Link href="/sign-up" className={styles.primary}><LocalizedText text="Start your TGPI journey" />{" "}<span aria-hidden="true">↗</span></Link><a href="#purpose" className={styles.secondary}><LocalizedText text={"Discover the institute"} />{" "}<span aria-hidden="true">↓</span></a></div>
        </div>
        <div className={styles.heroFoot}><span><LocalizedText text={"ABOUT TGPI"} /></span><span><LocalizedText text={"Data · Education · Mobility · Decision"} /></span></div>
      </section>
      <AboutNavigation />
      <section id="purpose" className={`${styles.section} ${styles.purpose}`}>
        <div><p className={styles.eyebrow}><LocalizedText text={"01 / Our purpose"} /></p><h2><LocalizedText text={"The world is connected."} /><br /><LocalizedText text={"Your preparation"} /><br /><LocalizedText text={"should be, too."} /></h2></div>
        <div className={styles.prose}><p className={styles.largeText}><LocalizedText text={"The Global Polymath Institute (TGPI) is a digital education and decision-support platform."} /></p><p><LocalizedText text={"Operated by TGPI GLOBAL EDUCATION LTDA, the platform brings together country research, practical learning and preparation for international life."} /></p><p><LocalizedText text={"A global life begins long before departure. TGPI connects these steps. We bring country research, practical learning and personal preparation into a shared framework, so information can become understanding — and understanding can guide action."} /></p><p><Link href="/legal"><LocalizedText text={"Company information and official contact channels →"} /></Link></p><div className={styles.signature}><Image src="/brand/tgpi-crest-metal-v3.webp" width={56} height={64} alt={t("TGPI crest")} /><span><strong><LocalizedText text={"TGPI"} /></strong><br /><LocalizedText text={"The Global Polymath Institute"} /></span></div></div>
      </section>
      <section id="framework" className={`${styles.section} ${styles.framework}`}>
        <div className={styles.sectionHeading}><div><p className={styles.eyebrow}><LocalizedText text={"02 / One connected framework"} /></p><h2><LocalizedText text={"Four pillars."} /><br /><LocalizedText text={"One global perspective."} /></h2></div><p><LocalizedText text={"Each pillar answers a different question. Together, they give your next chapter a more deliberate foundation."} /></p></div>
        <div className={styles.pillars}>{pillars.map((pillar, index) => <Link href={pillar.href} key={pillar.name} className={styles.pillar}><div className={styles.pillarTop}><span>0{index + 1}</span><span aria-hidden="true">↗</span></div><h3><LocalizedText text={pillar.name} /></h3><strong><LocalizedText text={pillar.question} /></strong><p><LocalizedText text={pillar.text} /></p><span className={styles.pillarAction}><LocalizedText text={pillar.action} /> <span aria-hidden="true">→</span></span></Link>)}</div>
      </section>
      <section id="learning" className={`${styles.section} ${styles.learning}`}>
        <figure className={styles.learningImage}><Image src="/images/cinematic-2026/learning-atelier-1600.webp" alt={t("Adult learners collaborating over an atlas and notes in a library")} fill sizes="(max-width: 760px) 100vw, 55vw" /><figcaption><LocalizedText text={"Learning without borders · TGPI conceptual imagery"} /></figcaption></figure>
        <div className={styles.learningCopy}><p className={styles.eyebrow}><LocalizedText text={"03 / The polymath mindset"} /></p><h2><LocalizedText text={"Connect what you know."} /><br /><em><LocalizedText text={"Expand what you can do."} /></em></h2><p><LocalizedText text={"Life across borders brings language, work, culture and everyday decisions together. Preparation benefits from the same breadth."} /></p><p><LocalizedText text={"For TGPI, being a polymath means connecting disciplines and applying knowledge. It is a mindset of curiosity, adaptability and practical action."} /></p><Link href="/courses" className={styles.textLink}><LocalizedText text={"Explore practical learning"} />{" "}<span aria-hidden="true">↗</span></Link></div>
      </section>
      <section id="principles" className={`${styles.section} ${styles.principles}`}>
        <div><p className={styles.eyebrow}><LocalizedText text={"04 / What guides us"} /></p><h2><LocalizedText text={"Ambition, grounded"} /><br /><LocalizedText text={"in clarity."} /></h2><p className={styles.principleIntro}><LocalizedText text={"Trust is built through useful information, honest boundaries and respect for individual choices."} /></p></div>
        <div className={styles.accordions}>
          <details open><summary><LocalizedText text={"Evidence before assumptions"} />{" "}<span aria-hidden="true">+</span></summary><p><LocalizedText text={"Compare the factors behind a decision. Costs, requirements and circumstances change; confirm important details with current official sources before acting."} /></p></details>
          <details><summary><LocalizedText text={"Capability before shortcuts"} />{" "}<span aria-hidden="true">+</span></summary><p><LocalizedText text={"Practical learning and preparation take effort. Our direction is to support informed progress through useful knowledge and connected tools."} /></p></details>
          <details><summary><LocalizedText text={"Your priorities shape your path"} />{" "}<span aria-hidden="true">+</span></summary><p><LocalizedText text={"There is no single ideal country for everyone. Your career, resources, language, family and lifestyle give each option a different meaning."} /></p></details>
          <details><summary><LocalizedText text={"Clear scope. Honest expectations."} />{" "}<span aria-hidden="true">+</span></summary><p><LocalizedText text={"TGPI is an education and decision-support platform. It does not guarantee visas, employment or relocation outcomes, and does not replace qualified legal or immigration advice."} /></p></details>
        </div>
      </section>
      <section className={styles.closing}><p className={styles.eyebrow}><LocalizedText text={"Your next chapter"} /></p><h2><LocalizedText text={"Understand more."} /><br /><em><LocalizedText text={"Move forward with purpose."} /></em></h2><p><LocalizedText text={"Explore the world through your priorities. Build the capabilities to take your next step."} /></p><div className={styles.actions}><Link href="/sign-up" className={styles.primary}><LocalizedText text={"Create your account"} />{" "}<span aria-hidden="true">↗</span></Link><Link href="/pricing" className={styles.secondary}><LocalizedText text="Explore TGPI Premium" />{" "}<span aria-hidden="true">→</span></Link></div><span className={styles.wordmark}><LocalizedText text={"TGPI"} /></span></section>
    </div>
  </main>;
}

export async function generateMetadata() { return localizeMetadata(sourceMetadata); }
