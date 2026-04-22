import { CommandCenterProfile } from "@/lib/profile-command-center";

export type CompletionItem = {
  id: string;
  label: string;
  description: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
  tab: "overview" | "edit" | "goals" | "settings";
};

export function buildProfileCompletionItems(
  profile: Partial<CommandCenterProfile> | null
): CompletionItem[] {
  const data = profile || {};

  const items: CompletionItem[] = [
    {
      id: "avatar",
      label: "Add profile photo",
      description: "A strong identity starts with a recognizable avatar.",
      completed: Boolean(data.photoURL),
      priority: "high",
      tab: "edit",
    },
    {
      id: "displayName",
      label: "Set display name",
      description: "This is the name users will recognize across TGPI.",
      completed: Boolean(data.displayName || data.fullName),
      priority: "high",
      tab: "edit",
    },
    {
      id: "username",
      label: "Choose username",
      description: "A clean username improves identity and sharing.",
      completed: Boolean(data.username),
      priority: "high",
      tab: "edit",
    },
    {
      id: "bio",
      label: "Write your bio",
      description: "A short bio adds personality and context.",
      completed: Boolean(data.bio),
      priority: "medium",
      tab: "edit",
    },
    {
      id: "location",
      label: "Add location",
      description: "City and country improve relevance and visibility.",
      completed: Boolean(data.city && data.country),
      priority: "medium",
      tab: "edit",
    },
    {
      id: "goal",
      label: "Define main goal",
      description: "Your goal helps TGPI personalize recommendations.",
      completed: Boolean(data.goal),
      priority: "high",
      tab: "goals",
    },
    {
      id: "englishLevel",
      label: "Set English level",
      description: "This improves country and learning guidance.",
      completed: Boolean(data.englishLevel),
      priority: "medium",
      tab: "goals",
    },
    {
      id: "budget",
      label: "Set budget level",
      description: "Budget is essential for realistic recommendations.",
      completed: Boolean(data.budget),
      priority: "high",
      tab: "goals",
    },
    {
      id: "continentInterest",
      label: "Choose continent interest",
      description: "Focus improves the quality of suggestions.",
      completed: Boolean(data.continentInterest),
      priority: "medium",
      tab: "goals",
    },
    {
      id: "preferredCurrency",
      label: "Choose preferred currency",
      description: "Makes financial tools and country data more practical.",
      completed: Boolean(data.preferredCurrency),
      priority: "medium",
      tab: "goals",
    },
    {
      id: "timezone",
      label: "Set timezone",
      description: "Improves scheduling and personal settings.",
      completed: Boolean(data.timezone),
      priority: "low",
      tab: "settings",
    },
    {
      id: "languagePreference",
      label: "Set language preference",
      description: "Helps shape the product experience around you.",
      completed: Boolean(data.languagePreference),
      priority: "low",
      tab: "settings",
    },
  ];

  return items;
}

export function getCompletionScore(items: CompletionItem[]) {
  if (!items.length) return 0;
  const completed = items.filter((item) => item.completed).length;
  return Math.round((completed / items.length) * 100);
}

export function getNextPriorityItems(items: CompletionItem[], limit = 3) {
  const order = { high: 0, medium: 1, low: 2 };

  return items
    .filter((item) => !item.completed)
    .sort((a, b) => order[a.priority] - order[b.priority])
    .slice(0, limit);
}