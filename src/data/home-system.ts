export type HomeSystemStage = {
  number: string;
  title: string;
  product: string;
  description: string;
  outcome: string;
  href: string;
  action: string;
};

export type HomeIntent = {
  label: string;
  title: string;
  description: string;
  href: string;
  action: string;
};

export type HomeSearchTopic = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
};

export const homeSystemMetrics = [
  ["195", "Country profiles"],
  ["05", "Transparent decision lenses"],
  ["01", "Connected global system"],
] as const;

export const homeIntents: ReadonlyArray<HomeIntent> = [
  {
    label: "Choose a country",
    title: "Find destinations aligned with your priorities.",
    description: "Explore country profiles through cost, career, lifestyle, language and adaptability signals.",
    href: "/countries",
    action: "Explore countries",
  },
  {
    label: "Compare options",
    title: "Expose the trade-offs before committing.",
    description: "Place up to three countries inside the same transparent decision framework.",
    href: "/compare",
    action: "Open TGPI Compare",
  },
  {
    label: "Prepare evidence",
    title: "Turn requirements into a preparation system.",
    description: "Connect goals, document categories, readiness gaps and the next practical action.",
    href: "/passport",
    action: "Open Documents OS",
  },
  {
    label: "Build capability",
    title: "Develop the skills that mobility requires.",
    description: "Use practical learning paths designed around independence, communication and global action.",
    href: "/courses",
    action: "Explore TGPI Learning",
  },
];

export const homeSystemStages: ReadonlyArray<HomeSystemStage> = [
  {
    number: "01",
    title: "Explore",
    product: "Country Intelligence",
    description: "Build a shortlist from structured country profiles instead of isolated impressions.",
    outcome: "A clearer field of options",
    href: "/countries",
    action: "Explore 195 countries",
  },
  {
    number: "02",
    title: "Compare",
    product: "Decision Intelligence",
    description: "Use consistent criteria and visible weights to understand the trade-offs between destinations.",
    outcome: "An explainable decision",
    href: "/compare",
    action: "Compare destinations",
  },
  {
    number: "03",
    title: "Prepare",
    product: "Documents OS",
    description: "Organize evidence categories, constraints and official verification into a practical path.",
    outcome: "A readiness architecture",
    href: "/passport",
    action: "Prepare documents",
  },
  {
    number: "04",
    title: "Learn",
    product: "TGPI Learning",
    description: "Develop practical capability through lessons, exercises, assessments and applied evidence.",
    outcome: "Capability for real life",
    href: "/courses",
    action: "Build global capability",
  },
  {
    number: "05",
    title: "Prove",
    product: "Global Key",
    description: "Keep progress, learning records and next actions connected to one global identity.",
    outcome: "Portable evidence of progress",
    href: "/profile",
    action: "Create a Global Key",
  },
];

export const homeSearchTopics: ReadonlyArray<HomeSearchTopic> = [
  {
    eyebrow: "Country selection",
    title: "How to choose a country for living abroad",
    description: "Start with priorities, compare consistent signals and identify the trade-offs you can actually sustain.",
    href: "/countries",
  },
  {
    eyebrow: "Decision framework",
    title: "How to compare countries beyond cost of living",
    description: "Balance affordability with career access, language, lifestyle, adaptability and long-term fit.",
    href: "/compare",
  },
  {
    eyebrow: "Global preparation",
    title: "How to organize documents for life abroad",
    description: "Understand document categories, readiness gaps and what must still be verified with official sources.",
    href: "/passport",
  },
  {
    eyebrow: "Practical education",
    title: "How to build capability for international life",
    description: "Develop communication, daily independence, cultural safety and career action through applied learning.",
    href: "/courses/english-abroad",
  },
];

export const homeFaq = [
  {
    question: "What is TGPI?",
    answer:
      "TGPI is an educational decision-intelligence platform that connects country research, transparent comparison, practical learning, document preparation and personal progress for international life.",
  },
  {
    question: "Can TGPI choose the best country for me?",
    answer:
      "No country is universally best. TGPI helps you compare destinations consistently, understand trade-offs and build a shortlist aligned with your own priorities.",
  },
  {
    question: "Does TGPI replace immigration, legal or financial advice?",
    answer:
      "No. TGPI is an educational preparation system. Visas, taxes, costs, regulations and local requirements must be confirmed with current official or qualified professional sources.",
  },
  {
    question: "Can I explore TGPI before creating an account?",
    answer:
      "Yes. Country profiles, comparison entry points and learning discovery are available publicly. A Global Key connects saved progress and personal preparation when you are ready.",
  },
] as const;
