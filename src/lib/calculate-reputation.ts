export function calculateReputation(user: any): number {
  let score = 0;

  score += (user.xp || 0) * 0.1;
  score += (user.completedCourses?.length || 0) * 10;
  score += (user.referrals || 0) * 20;
  score += (user.badges?.length || 0) * 15;

  return Math.min(100, Math.floor(score));
}