/** Decode the existing regional-indicator pair without shipping a country map. */
export function countryFlagCode(emoji: string): string {
  const points = Array.from(emoji, character => character.codePointAt(0) ?? 0);
  if (points.length !== 2 || points.some(point => point < 0x1f1e6 || point > 0x1f1ff)) return "";
  return points.map(point => String.fromCharCode(point - 0x1f1e6 + 97)).join("");
}
