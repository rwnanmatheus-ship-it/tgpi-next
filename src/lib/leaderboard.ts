export type LeaderboardUser = {
  id: string;
  name: string;
  avatar?: string;
  xp: number;
  level: number;
  badge: string;
};

export const leaderboardUsers: LeaderboardUser[] = [
  {
    id: "1",
    name: "Renan Matheus",
    xp: 620,
    level: 4,
    badge: "Global Pathfinder",
  },
  {
    id: "2",
    name: "Sophia Carter",
    xp: 580,
    level: 3,
    badge: "Country Explorer",
  },
  {
    id: "3",
    name: "Lucas Bennett",
    xp: 520,
    level: 3,
    badge: "First Course Completed",
  },
  {
    id: "4",
    name: "Emma Wilson",
    xp: 470,
    level: 3,
    badge: "Identity Built",
  },
  {
    id: "5",
    name: "Noah Walker",
    xp: 430,
    level: 3,
    badge: "Starter Explorer",
  },
];