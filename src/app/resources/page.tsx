import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import ResourceExplorer, {
  ResourcesNavigation,
} from "@/components/resources/ResourceExplorer";
import { TGPI_FREE_PLAN, TGPI_PREMIUM_PLAN } from "@/lib/subscription-plans";
import "./resources.css";

export const metadata: Metadata = {
  title: "Resources — Explore, Learn & Prepare | TGPI",
  description:
    "Source-linked country research, comparisons, practical learning, document preparation and your connected TGPI Workspace.",
  alternates: { canonical: "https://www.theglobalpolymath.com/resources" },
  openGraph: {
    title: "Your next step, connected — TGPI Resources",
    description: "Practical education and informed international decisions.",
    images: ["/images/resources/tgpi-resources-library-v1.webp"],
  },
};
const modules = [
  {
    id: "explore",
    eyebrow: "01 / Country intelligence",
    title: "See beyond the destination.",
    description:
      "Research countries through source-linked information. Inspect available evidence, reference years and limitations before building your shortlist.",
    application:
      "Start with the places you are considering. Identify what you still need to investigate about life there.",
    access: "Public research · Coverage varies by country and indicator",
    href: "/countries",
    cta: "Explore countries",
    nextHref: "/compare",
    next: "Next: compare your options",
    image: "city",
    alt: "International city viewed from a contemporary university terrace",
  },
  {
    id: "compare",
    eyebrow: "02 / Decisions with context",
    title: "Make the trade-offs visible.",
    description:
      "Put up to three countries side by side. Explore the evidence and its gaps without reducing your future to an unsupported score.",
    application:
      "Compare the same question across your shortlist, then use Country Fit to structure your next research steps.",
    access: "Public comparison · Up to three countries at a time",
    href: "/compare",
    cta: "Open comparison",
    nextHref: "/country-fit",
    next: "Next: structure your research",
    image: null,
    alt: "",
  },
  {
    id: "learn",
    eyebrow: "03 / Practical education",
    title: "Build the skills that travel.",
    description:
      "Explore practical learning for international life. Check each course’s availability, develop your capabilities and keep your progress connected to your profile.",
    application:
      "Choose an available course and work through its lessons. Eligible completed courses can lead to a TGPI certificate under their completion requirements.",
    access:
      "Public catalogue · Account to save progress · Availability shown per course",
    href: "/courses",
    cta: "Explore courses",
    nextHref: "/certificates",
    next: "Next: your learning credentials",
    image: "library",
    alt: "Learners studying in a contemporary library with blue seating and warm architectural lighting",
  },
  {
    id: "prepare",
    eyebrow: "04 / Readiness & preparation",
    title: "Give the next step a structure.",
    description:
      "Bring document preparation into your wider plan. Explore the public overview, then connect your account’s goals, learning and readiness in the member experience.",
    application:
      "Review your preparation priorities. Confirm destination-specific requirements with the responsible official authority.",
    access: "Public overview · Personalized preparation requires an account",
    href: "/passport",
    cta: "Explore preparation",
    nextHref: "/profile",
    next: "Next: organize your Workspace",
    image: null,
    alt: "",
  },
  {
    id: "progress",
    eyebrow: "05 / Your connected journey",
    title: "One place to find your next move.",
    description:
      "Your Workspace brings together priorities, your shortlist, profile and recorded progress. Your Global ID connects your identity and learning credentials within TGPI.",
    application:
      "Return to your next action, complete your profile and review the achievements recorded in your account.",
    access:
      "Account required · Global ID is a TGPI identity, not a government travel document",
    href: "/profile",
    cta: "Open my Workspace",
    nextHref: "/global-key",
    next: "Next: your Global ID",
    image: "city",
    alt: "An international city in morning light, viewed from a calm study terrace",
  },
] as const;
const faqs = [
  [
    "Where should I start?",
    "Use the objective selector. If you are still exploring, begin with countries. If you already have a shortlist, open the comparison tool.",
  ],
  [
    "Do I need an account?",
    "Country research, comparison, the course catalogue and the document overview can be explored publicly. Sign in to save learning progress and use your personal Workspace and Global ID.",
  ],
  [
    "Are all courses available?",
    "The catalogue displays availability per course. Planned courses are not immediately accessible. Certificate eligibility depends on the course and its completion requirements.",
  ],
  [
    "What does Premium add?",
    "Premium adds the protected command center and consolidated destination, preparation and learning overviews described in the plan below. Explore the free tools before choosing your membership.",
  ],
  [
    "Does TGPI guarantee a visa or a destination match?",
    "No. TGPI supports research, education and preparation. Data coverage varies; check requirements with official authorities. A TGPI certificate or Global ID does not replace official qualifications or travel documents.",
  ],
];
export default async function ResourcesPage() {
  const { userId } = await auth();
  const startHref = userId ? "/profile" : "/sign-up";
  const startLabel = userId ? "Open my Workspace" : "Create a free account";
  return (
    <main className="resources-page">
      <div className="resources-frame">
        <section className="resources-hero" aria-labelledby="resources-title">
          <div className="resources-hero-copy">
            <p className="resources-kicker">
              The Global Polymath Institute / Resources
            </p>
            <h1 id="resources-title">
              A wider world.
              <br />
              <em>A clearer next step.</em>
            </h1>
            <p>
              Explore your options. Build practical skills. Prepare with
              purpose. Find the TGPI tools that turn international possibilities
              into informed next steps.
            </p>
            <div className="resources-actions">
              <a className="resources-button" href="#resource-objectives">
                Explore the resources ↓
              </a>
              <Link
                className="resources-button resources-button-secondary"
                href={startHref}
              >
                {startLabel} ↗
              </Link>
            </div>
            <p className="resources-hero-note">
              Data · Education · Mobility · Decision
            </p>
          </div>
          <div className="resources-hero-image">
            <Image
              src="/images/resources/tgpi-resources-library-v1.webp"
              alt="Contemporary international library with learners, warm brass details and a city view"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 50vw"
            />
            <div className="resources-image-caption">
              <Image
                src="/brand/tgpi-crest-metal-v3-256.png"
                alt=""
                width={42}
                height={42}
              />
              <span>
                Practical education.
                <br />
                Global perspective.
              </span>
            </div>
          </div>
        </section>
        <div id="resource-objectives">
          <ResourcesNavigation />
        </div>
        <ResourceExplorer />
        <div className="resources-section-intro">
          <p className="resources-kicker">The TGPI ecosystem</p>
          <h2>
            Different tools.
            <br />
            One connected direction.
          </h2>
          <p>
            Start where you are. Each resource gives you a practical action and
            a route to the next one.
          </p>
        </div>
        {modules.map((item, index) => (
          <section
            id={item.id}
            className={`resources-module ${index % 2 ? "resources-module-reverse" : ""}`}
            key={item.id}
            aria-labelledby={`${item.id}-title`}
          >
            <div className="resources-module-copy">
              <p className="resources-kicker">{item.eyebrow}</p>
              <h2 id={`${item.id}-title`}>{item.title}</h2>
              <p>{item.description}</p>
              <div className="resources-application">
                <h3>Put it into practice</h3>
                <p>{item.application}</p>
              </div>
              <p className="resources-access">{item.access}</p>
              <Link href={item.href} className="resources-button">
                {item.cta} ↗
              </Link>
              <Link href={item.nextHref} className="resources-text-link">
                {item.next} →
              </Link>
            </div>
            {item.image ? (
              <div className="resources-module-image">
                <Image
                  src={`/images/resources/tgpi-resources-${item.image}-v1.webp`}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 48vw"
                />
              </div>
            ) : (
              <div className="resources-tool-preview">
                <p className="resources-kicker">
                  {item.id === "compare"
                    ? "A better research question"
                    : "A practical preparation sequence"}
                </p>
                <h3>
                  {item.id === "compare"
                    ? "What would change my decision?"
                    : "Prepare with context."}
                </h3>
                <ol>
                  {(item.id === "compare"
                    ? [
                        "Choose up to three destinations",
                        "Compare evidence and reference dates",
                        "Identify gaps to investigate",
                      ]
                    : [
                        "Review your destination and objective",
                        "Identify document requirements",
                        "Check with official authorities",
                      ]
                  ).map((text, i) => (
                    <li key={text}>
                      <span aria-hidden="true">0{i + 1}</span>
                      {text}
                    </li>
                  ))}
                </ol>
                <p className="resources-preview-note">
                  Workflow overview · Open the tool to begin.
                </p>
              </div>
            )}
          </section>
        ))}
        <section className="resources-journey" aria-labelledby="journey-title">
          <p className="resources-kicker">A connected example</p>
          <h2 id="journey-title">
            Considering life abroad?
            <br />
            Follow the questions.
          </h2>
          <p>A suggested workflow, not a personalized recommendation.</p>
          <ol>
            {[
              {
                title: "Where could I go?",
                href: "/countries",
                text: "Explore the evidence.",
              },
              {
                title: "What are the trade-offs?",
                href: "/compare",
                text: "Compare your shortlist.",
              },
              {
                title: "What should I learn?",
                href: "/courses",
                text: "Choose a practical course.",
              },
              {
                title: "What must I prepare?",
                href: "/passport",
                text: "Organize the next steps.",
              },
            ].map((step, i) => (
              <li key={step.href}>
                <span>0{i + 1}</span>
                <h3>{step.title}</h3>
                <Link href={step.href}>{step.text} ↗</Link>
              </li>
            ))}
          </ol>
        </section>
        <section className="resources-plans" aria-labelledby="access-title">
          <div>
            <p className="resources-kicker">Access that makes sense</p>
            <h2 id="access-title">
              Start exploring.
              <br />
              Choose your depth.
            </h2>
            <p>
              Public tools help you investigate. Your account connects the
              journey. Premium adds a consolidated command center.
            </p>
          </div>
          <div className="resources-plan-grid">
            {[TGPI_FREE_PLAN, TGPI_PREMIUM_PLAN].map((plan) => (
              <article
                className={`resources-plan resources-plan-${plan.slug}`}
                key={plan.slug}
              >
                <p className="resources-kicker">{plan.name}</p>
                <h3>
                  {plan.price}
                  <small>{plan.cadence}</small>
                </h3>
                <p>{plan.description}</p>
                <ul>
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <Link
                  className="resources-button"
                  href={plan.slug === "free" ? startHref : "/pricing"}
                >
                  {plan.slug === "free"
                    ? startLabel
                    : "View membership & access"}{" "}
                  ↗
                </Link>
              </article>
            ))}
          </div>
        </section>
        <section className="resources-faq" aria-labelledby="faq-title">
          <p className="resources-kicker">Before you begin</p>
          <h2 id="faq-title">A little more clarity.</h2>
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </section>
        <section className="resources-closing">
          <Image
            src="/brand/tgpi-crest-metal-v3-256.png"
            alt="TGPI crest"
            width={76}
            height={76}
          />
          <p className="resources-kicker">
            Your next chapter starts with a next step
          </p>
          <h2>
            Give your possibilities
            <br />a direction.
          </h2>
          <p>
            Bring research, learning and preparation into your TGPI journey.
          </p>
          <Link className="resources-button" href={startHref}>
            {startLabel} ↗
          </Link>
        </section>
      </div>
    </main>
  );
}
