export function calculateWeeklyScore(user: any) {
  const base = user.xp || 0;
  const activity = user.streak || 0;

  return base * 0.7 + activity * 10;
}