export const practiceLabCount = 2;

export function practiceWorkload(existingMinutes: number): readonly [number, number] {
  if (existingMinutes < 15 * 60) return [60, 60];
  if (existingMinutes < 25 * 60) return [60, 90];
  return [75, 105];
}
