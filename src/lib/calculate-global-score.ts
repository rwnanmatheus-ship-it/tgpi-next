export function calculateGlobalScore(user: any): number {
  const xp = user.xp || 0;
  const countries = (user.countriesExplored || []).length * 200;
  const courses = (user.completedCourses || []).length * 500;

  return xp + countries + courses;
}