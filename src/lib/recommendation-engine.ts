export function getRecommendedCountries(intent: string) {
  const map: Record<string, string[]> = {
    work: ["Canada", "Germany", "Australia"],
    relocation: ["Portugal", "Spain", "Ireland"],
    study: ["USA", "UK", "Canada"],
    tourism: ["Japan", "France", "Italy"],
    networking: ["USA", "UK", "UAE"],
  };

  return map[intent] || ["Canada"];
}