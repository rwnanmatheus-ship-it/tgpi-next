import { homeFaq } from "@/data/home-system";
import { homeProductArt } from "@/lib/home-showcase";

const siteUrl = "https://www.theglobalpolymath.com";

function getHomeStructuredData(faq: readonly { question: string; answer: string }[]) { return {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": `${siteUrl}/#organization`,
      name: "The Global Polymath Institute",
      alternateName: "TGPI",
      legalName: "TGPI GLOBAL EDUCATION LTDA",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        "@id": `${siteUrl}/#logo`,
        url: `${siteUrl}/brand/tgpi-crest-metal-v3-256.png`,
        contentUrl: `${siteUrl}/brand/tgpi-crest-metal-v3-256.png`,
        width: 256,
        height: 313,
        caption: "TGPI — The Global Polymath Institute crest",
      },
      image: { "@id": `${siteUrl}/#editorial-image` },
      email: "corporate@theglobalpolymath.com",
      subjectOf: { "@id": `${siteUrl}/about#webpage` },
      description:
        "An educational decision-intelligence platform for country research, international preparation and practical global capability.",
      sameAs: ["https://www.instagram.com/theglobalpolymath/"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "The Global Polymath Institute",
      alternateName: ["TGPI", "TGPI — The Global Polymath Institute"],
      description:
        "Compare countries, prepare documents and build practical capability for international life.",
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en",
    },
    {
      "@type": "ImageObject",
      "@id": `${siteUrl}/#editorial-image`,
      url: `${siteUrl}${homeProductArt("hero")}`,
      contentUrl: `${siteUrl}${homeProductArt("hero")}`,
      width: 1536,
      height: 1024,
      caption: "TGPI product collection editorial artwork",
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: "TGPI | The Global Polymath Institute",
      about: { "@id": `${siteUrl}/#organization` },
      isPartOf: { "@id": `${siteUrl}/#website` },
      primaryImageOfPage: { "@id": `${siteUrl}/#editorial-image` },
    },
    {
      "@type": "WebApplication",
      "@id": `${siteUrl}/#application`,
      name: "TGPI Global Decision System",
      url: siteUrl,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web",
      browserRequirements: "Requires a modern web browser",
      description:
        "A connected system for Country Fit, country intelligence, transparent comparison, document preparation, practical learning and personal progress.",
      featureList: [
        "Personal Country Fit research plan",
        "Country intelligence profiles",
        "Transparent country comparison",
        "International document preparation",
        "Practical global learning",
        "TGPI Global ID",
        "TGPI Atlas AI access portal",
        "TGPI Integrity Chain verification portal",
      ],
      provider: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#frequently-asked-questions`,
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
}; }

export default function HomeStructuredData({ faq = homeFaq }: { faq?: readonly { question: string; answer: string }[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getHomeStructuredData(faq)).replace(/</g, "\\u003c"),
      }}
    />
  );
}
