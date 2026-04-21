export function calculateFitScore({
  xp,
  intent,
}: {
  xp: number;
  intent: string;
}) {
  let base = xp / 10;

  if (intent === "work") base += 10;
  if (intent === "study") base += 5;

  return Math.min(Math.round(base), 100);
}