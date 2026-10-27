import { LocalizedText } from "@/components/localization/LocaleProvider";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AboutNavigation from "@/components/about/AboutNavigation";
import styles from "@/components/about/about.module.css";

export const metadata: Metadata = {
  title: "About TGPI — Practical intelligence. Global possibility.",
  description: "Discover The Global Polymath Institute: practical education, country intelligence and preparation for a more intentional global life.",
  alternates: { canonical: "/about" },
  openGraph: { title: "The Global Polymath Institute", description: "Understand the world. Develop your capabilities. Choose your next step.", url: "/about", images: [{ url: "/images/about/global-perspective-v2.webp", width: 1536, height: 1024, alt: "A globe overlooking a city at blue hour — TGPI conceptual editorial image" }] },
};

const pillars = [
  { name: "Data", question: "Understand the context.", text: "Explore countries through cost, culture, career and lifestyle. Put the questions that matter to you at the centre of your research.", href: "/countries", action: "Explore countries" },
  { name: "Education", question: "Build the capability.", text: "Develop practical knowledge for life across borders. Connect what you learn with the situations and decisions ahead of you.", href: "/courses", action: "Discover learning" },
  { name: "Mobility", question: "Prepare the next step.", text: "Bring readiness, documents and personal planning into the same journey. Turn an international ambition into clearer preparation.", href: "/documents", action: "Explore readiness" },
  { name: "Decision", question: "Choose with intention.", text: "Compare possibilities and their trade-offs. Give your priorities a structure before committing to a country or a new direction.", href: "/compare", action: "Compare your options" },
];

export default function AboutPage() {
  return <main className={styles.page}>
    <div className={styles.frame}>
      <section className={styles.hero} aria-labelledby="about-title">
        <Image src="/images/about/global-perspective-v2.webp" alt="A brass globe and open notebook overlooking an international city at blue hour" fill sizes="(max-width: 1280px) 100vw, 1280px" priority className={styles.heroImage} />
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>The Global Polymath Institute</p>
          <h1 id="about-title"><LocalizedText text="A wider world." /><br />A clearer <em>direction.</em></h1>
          <p className={styles.heroLead}>Practical education and intelligence for people building a life beyond borders.</p>
          <div className={styles.actions}><Link href="/sign-up" className={styles.primary}><LocalizedText text="Start your TGPI journey" />{" "}<span aria-hidden="true">↗</span></Link><a href="#purpose" className={styles.secondary}>Discover the institute <span aria-hidden="true">↓</span></a></div>
        </div>
        <div className={styles.heroFoot}><span>ABOUT TGPI</span><span>Data · Education · Mobility · Decision</span></div>
      </section>
      <AboutNavigation />
      <section id="purpose" className={`${styles.section} ${styles.purpose}`}>
        <div><p className={styles.eyebrow}>01 / Our purpose</p><h2>The world is connected.<br />Your preparation<br />should be, too.</h2></div>
        <div className={styles.prose}><p className={styles.largeText}>A global life begins long before the departure.</p><p>It begins with understanding your options, developing useful skills and recognising what a new country will ask of you.</p><p>TGPI is being built to connect these steps. We bring country research, practical learning and personal preparation into a shared framework, so information can become understanding — and understanding can guide action.</p><div className={styles.signature}><Image src="/brand/tgpi-crest-metal-v3.webp" width={56} height={64} alt="TGPI crest" /><span><strong>TGPI</strong><br />The Global Polymath Institute</span></div></div>
      </section>
      <section id="framework" className={`${styles.section} ${styles.framework}`}>
        <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>02 / One connected framework</p><h2>Four pillars.<br />One global perspective.</h2></div><p>Each pillar answers a different question. Together, they give your next chapter a more deliberate foundation.</p></div>
        <div className={styles.pillars}>{pillars.map((pillar, index) => <Link href={pillar.href} key={pillar.name} className={styles.pillar}><div className={styles.pillarTop}><span>0{index + 1}</span><span aria-hidden="true">↗</span></div><h3>{pillar.name}</h3><strong>{pillar.question}</strong><p>{pillar.text}</p><span className={styles.pillarAction}>{pillar.action} <span aria-hidden="true">→</span></span></Link>)}</div>
      </section>
      <section id="learning" className={`${styles.section} ${styles.learning}`}>
        <figure className={styles.learningImage}><Image src="/images/about/practical-learning-v2.webp" alt="Adult learners collaborating over an atlas and notes in a library" fill sizes="(max-width: 760px) 100vw, 55vw" /><figcaption>Learning without borders · TGPI conceptual imagery</figcaption></figure>
        <div className={styles.learningCopy}><p className={styles.eyebrow}>03 / The polymath mindset</p><h2>Connect what you know.<br /><em>Expand what you can do.</em></h2><p>Life across borders brings language, work, culture and everyday decisions together. Preparation benefits from the same breadth.</p><p>For TGPI, being a polymath means connecting disciplines and applying knowledge. It is a mindset of curiosity, adaptability and practical action.</p><Link href="/courses" className={styles.textLink}>Explore practical learning <span aria-hidden="true">↗</span></Link></div>
      </section>
      <section id="principles" className={`${styles.section} ${styles.principles}`}>
        <div><p className={styles.eyebrow}>04 / What guides us</p><h2>Ambition, grounded<br />in clarity.</h2><p className={styles.principleIntro}>Trust is built through useful information, honest boundaries and respect for individual choices.</p></div>
        <div className={styles.accordions}>
          <details open><summary>Evidence before assumptions <span aria-hidden="true">+</span></summary><p>Compare the factors behind a decision. Costs, requirements and circumstances change; confirm important details with current official sources before acting.</p></details>
          <details><summary>Capability before shortcuts <span aria-hidden="true">+</span></summary><p>Practical learning and preparation take effort. Our direction is to support informed progress through useful knowledge and connected tools.</p></details>
          <details><summary>Your priorities shape your path <span aria-hidden="true">+</span></summary><p>There is no single ideal country for everyone. Your career, resources, language, family and lifestyle give each option a different meaning.</p></details>
          <details><summary>Clear scope. Honest expectations. <span aria-hidden="true">+</span></summary><p>TGPI is an education and decision-support platform. It does not guarantee visas, employment or relocation outcomes, and does not replace qualified legal or immigration advice.</p></details>
        </div>
      </section>
      <section className={styles.closing}><p className={styles.eyebrow}>Your next chapter</p><h2>Understand more.<br /><em>Move forward with purpose.</em></h2><p>Explore the world through your priorities. Build the capabilities to take your next step.</p><div className={styles.actions}><Link href="/sign-up" className={styles.primary}>Create your account <span aria-hidden="true">↗</span></Link><Link href="/pricing" className={styles.secondary}><LocalizedText text="Explore TGPI Premium" />{" "}<span aria-hidden="true">→</span></Link></div><span className={styles.wordmark}>TGPI</span></section>
    </div>
  </main>;
}
