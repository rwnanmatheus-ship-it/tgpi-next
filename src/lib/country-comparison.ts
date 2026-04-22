type CountryLike = {
  name: string;
  currency?: string;
  language?: string;
  capital?: string;
  tags?: string[];
  mainGoal?: string;
};

export function compareCountries(
  first: CountryLike | undefined,
  second: CountryLike | undefined
) {
  if (!first || !second) return [];

  return [
    {
      label: "Currency",
      first: first.currency || "—",
      second: second.currency || "—",
    },
    {
      label: "Language",
      first: first.language || "—",
      second: second.language || "—",
    },
    {
      label: "Capital",
      first: first.capital || "—",
      second: second.capital || "—",
    },
    {
      label: "Main Goal",
      first: first.mainGoal || "—",
      second: second.mainGoal || "—",
    },
    {
      label: "Tags",
      first: first.tags?.join(", ") || "—",
      second: second.tags?.join(", ") || "—",
    },
  ];
}