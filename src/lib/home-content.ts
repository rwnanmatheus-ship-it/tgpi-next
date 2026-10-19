/** Public Home copy reflects route authorization, not the legacy pricing matrix. */
export const HOME_ROUTES = {
  signup: "/sign-up?next=%2Fonboarding",
  workspace: "/profile",
  fit: "/country-fit",
  countries: "/countries",
  compare: "/compare?country=portugal&country=canada&goal=study",
  documents: "/passport",
  learning: "/courses",
  pricing: "/pricing#membership",
  premium: "/premium",
  methodology: "/authority",
} as const;

export const HOME_FAQ = [
  { question: "What is TGPI?", answer: "The Global Polymath Institute is a platform for people exploring study, work or life abroad. It connects country research, comparison, preparation and practical education so you can make a more informed next step." },
  { question: "Can I start for free?", answer: "Yes. Explore country profiles, compare up to three countries at a time, try Country Fit and browse the course catalogue without an account. A free account lets you save your research context and a shortlist of up to five countries, continue learning and track your preparation." },
  { question: "What changes with Premium?", answer: "Premium opens the protected Premium Command Center: a consolidated view of your destinations, readiness, preparation and learning, with membership and billing management. Country comparison, research-plan saving and the current learning routes are also available without a paid subscription. Review the membership page before subscribing." },
  { question: "How does TGPI help me choose countries?", answer: "Compare source-linked information, reference years and evidence gaps. Country Fit connects your goal, budget, languages and timeline to research questions and next actions. National statistics do not establish your eligibility or make one country universally better." },
  { question: "How do courses and certificates work?", answer: "Browse available courses, then sign in to learn and save progress. Where verified certification is available, issuance requires the course’s lesson, assessment, reflection and verified-identity requirements, plus your consent to the public record. TGPI credentials have a public verification page. They are not academic degrees, professional licences or a claim of external accreditation." },
  { question: "How do I manage or cancel my subscription?", answer: "Sign in with your subscribing account, open the membership page and select Manage subscription to use the Stripe customer portal. You can manage payment details, invoices and cancellation there. Your account shows the access end date when cancellation is scheduled for the end of a billing period. Billing and refund policies remain available in the footer." },
] as const;

export const HOME_COURSES = [
  { id: "global-english-2026", asset: "english", objective: "Handle practical conversations for arrival, housing and work.", alt: "Two adults communicating naturally in a contemporary city café" },
  { id: "country-fit", asset: "country", objective: "Compare destinations against your constraints and the evidence.", alt: "A globe, maps and notebooks arranged for thoughtful country research" },
  { id: "relocation-budget", asset: "budget", objective: "Separate moving costs from living costs and test your financial runway.", alt: "A calculator, notebook and apartment keys arranged for relocation budgeting" },
] as const;
