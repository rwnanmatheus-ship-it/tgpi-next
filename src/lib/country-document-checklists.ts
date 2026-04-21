export type ChecklistItem = {
  label: string;
  category: "identity" | "travel" | "study" | "work" | "housing" | "finance";
  required?: boolean;
};

export type CountryChecklist = {
  title: string;
  description: string;
  items: ChecklistItem[];
};

const genericChecklist: CountryChecklist = {
  title: "Global Preparation Checklist",
  description:
    "A practical baseline checklist to help users prepare for international travel, study, relocation, or cultural integration.",
  items: [
    { label: "Valid passport", category: "identity", required: true },
    { label: "Government-issued ID backup copy", category: "identity" },
    { label: "Visa or entry authorization research", category: "travel", required: true },
    { label: "Proof of accommodation", category: "housing" },
    { label: "Travel insurance or local health coverage", category: "travel" },
    { label: "Proof of financial means", category: "finance" },
    { label: "Bank card ready for international use", category: "finance" },
    { label: "Study documents or transcripts", category: "study" },
    { label: "Work CV / resume and references", category: "work" },
  ],
};

const countryChecklists: Record<string, CountryChecklist> = {
  japan: {
    title: "Japan Readiness Checklist",
    description:
      "Prepare your core identity, travel, work, and daily-life items before deeper planning for Japan.",
    items: [
      { label: "Valid passport", category: "identity", required: true },
      { label: "Visa pathway research for Japan", category: "travel", required: true },
      { label: "Proof of accommodation", category: "housing" },
      { label: "Japanese-language basics prepared", category: "study" },
      { label: "Resume / CV for work abroad", category: "work" },
      { label: "Emergency savings for setup period", category: "finance" },
      { label: "International debit or credit card", category: "finance" },
      { label: "Copies of identity documents in cloud storage", category: "identity" },
    ],
  },
  brazil: {
    title: "Brazil Readiness Checklist",
    description:
      "Build a practical preparation baseline for daily life, mobility, finance, and local integration in Brazil.",
    items: [
      { label: "Valid passport or accepted travel document", category: "identity", required: true },
      { label: "Entry / visa rules checked", category: "travel", required: true },
      { label: "Brazilian Portuguese essentials prepared", category: "study" },
      { label: "Accommodation plan confirmed", category: "housing" },
      { label: "Transport and city safety research", category: "travel" },
      { label: "Bank card enabled for Brazil", category: "finance" },
      { label: "Budget for first month", category: "finance" },
      { label: "Local work or study documentation", category: "work" },
    ],
  },
  egypt: {
    title: "Egypt Readiness Checklist",
    description:
      "Organize your core identity, local preparation, and financial planning before a deeper move or study plan for Egypt.",
    items: [
      { label: "Valid passport", category: "identity", required: true },
      { label: "Visa / entry authorization research", category: "travel", required: true },
      { label: "Arabic basics or cultural notes", category: "study" },
      { label: "Accommodation confirmation", category: "housing" },
      { label: "Proof of funds and payment options", category: "finance" },
      { label: "Travel health preparation", category: "travel" },
      { label: "Copies of important documents", category: "identity" },
      { label: "Academic or cultural-study materials", category: "study" },
    ],
  },
};

export function getCountryChecklistBySlug(slug: string): CountryChecklist {
  return countryChecklists[slug] || genericChecklist;
}