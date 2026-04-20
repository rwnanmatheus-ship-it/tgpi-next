export type UserStats = {
  countriesExplored: number;
  coursesInProgress: number;
  certificatesEarned: number;
  countriesSaved: number;
  profileCompleted: boolean;
  courseLessonsCompleted: number;
};

export function getUserStats(): UserStats {
  return {
    countriesExplored: 3,
    coursesInProgress: 1,
    certificatesEarned: 1,
    countriesSaved: 2,
    profileCompleted: true,
    courseLessonsCompleted: 2,
  };
}