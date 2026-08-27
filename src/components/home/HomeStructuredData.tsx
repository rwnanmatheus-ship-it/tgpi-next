import { homeFaq } from "@/data/home-system";

const siteUrl = "https://theglobalpolymath.com";

const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": `${siteUrl}/#organization`,
      name: "TGPI — The Global Polymath Institute",
      alternateName: "TGPI",
      url: siteUrl,
      logo: `${siteUrl}/brand/tgpi-crest-v2-256.png`,
      description:
        "An educational decision-intelligence platform for country research, international preparation and practical global capability.",
      sameAs: ["https://www.instagram.com/theglobalpolymath/"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "TGPI — The Global Polymath Institute",
      description:
        "Compare countries, prepare documents and build practical capability for international life.",
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en",
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
        "A connected system for country intelligence, transparent comparison, document preparation, practical learning and personal progress.",
      featureList: [
        "Country intelligence profiles",
        "Transparent country comparison",
        "International document preparation",
        "Practical global learning",
        "Connected Global Key",
      ],
      provider: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#frequently-asked-questions`,
      mainEntity: homeFaq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
};

export default function HomeStructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(homeStructuredData).replace(/</g, "\\u003c"),
      }}
    />
  );
}
