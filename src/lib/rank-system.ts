export function getRank(xp: number) {
  if (xp < 50) return "Explorer";
  if (xp < 150) return "Builder";
  if (xp < 300) return "Connector";
  if (xp < 600) return "Strategist";
  if (xp < 1000) return "Global Elite";
  return "TGPI Authority";
}