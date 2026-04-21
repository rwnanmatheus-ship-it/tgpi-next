export type Mission = {
  id: string;
  title: string;
  xp: number;
};

export const dailyMissions: Mission[] = [
  { id: "login", title: "Login today", xp: 10 },
  { id: "explore_country", title: "Explore a country", xp: 20 },
  { id: "update_profile", title: "Update your profile", xp: 15 },
];