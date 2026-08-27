import type { CountryExplorerItem } from "@/lib/countries";

type CountriesStructuredDataProps = {
  countries: CountryExplorerItem[];
};

export default function CountriesStructuredData({
  countries,
}: CountriesStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://www.theglobalpolymath.com/countries#collection",
        url: "https://www.theglobalpolymath.com/countries",
        name: "TGPI Country Intelligence",
        description:
          "Explore and compare 195 country profiles through a consistent framework for cost, safety, language, education, careers, culture and mobility.",
        isPartOf: {
          "@id": "https://www.theglobalpolymath.com/#website",
        },
        mainEntity: {
          "@id": "https://www.theglobalpolymath.com/countries#list",
        },
      },
      {
        "@type": "ItemList",
        "@id": "https://www.theglobalpolymath.com/countries#list",
        name: "TGPI Country Intelligence Profiles",
        numberOfItems: countries.length,
        itemListElement: countries.map((country, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: country.name,
          url: `https://www.theglobalpolymath.com/countries/${country.slug}`,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.theglobalpolymath.com/countries#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "How should I compare countries for living, working or studying?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Start with your objective, compare the same evidence categories across destinations, identify trade-offs and validate changeable legal or financial facts with official sources.",
            },
          },
          {
            "@type": "Question",
            name: "Does TGPI choose the best country for everyone?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. TGPI organizes comparable signals so each person can build a shortlist that reflects their goals, budget, language access and adaptation profile.",
            },
          },
          {
            "@type": "Question",
            name: "Are country profiles legal or immigration advice?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. Country profiles are research maps. Visa, tax, legal, safety and entry information must be confirmed with current official sources before a decision.",
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
      }}
    />
  );
}
