export type Badge = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export function getUserBadges({
  countriesExplored,
  coursesCompleted,
  profileCompleted,
  level,
  referrals = 0,
}: {
  countriesExplored: number;
  coursesCompleted: number;
  profileCompleted: boolean;
  level: number;
  referrals?: number;
}): Badge[] {
  const badges: Badge[] = [];

  if (countriesExplored >= 1) {
    badges.push({
      id: "first-country",
      title: "First Country",
      description: "Explored your first country inside TGPI.",
      icon: "🌍",
    });
  }

  if (countriesExplored >= 5) {
    badges.push({
      id: "country-explorer",
      title: "Country Explorer",
      description: "Explored 5 or more countries.",
      icon: "🧭",
    });
  }

  if (coursesCompleted >= 1) {
    badges.push({
      id: "first-course",
      title: "First Course Completed",
      description: "Completed your first TGPI course.",
      icon: "🎓",
    });
  }

  if (profileCompleted) {
    badges.push({
      id: "identity-built",
      title: "Identity Built",
      description: "Completed your global profile.",
      icon: "👤",
    });
  }

  if (level >= 3) {
    badges.push({
      id: "pathfinder",
      title: "Global Pathfinder",
      description: "Reached Level 3 or higher.",
      icon: "🚀",
    });
  }

  if (referrals >= 1) {
    badges.push({
      id: "connector",
      title: "Connector",
      description: "Invited your first TGPI friend.",
      icon: "🤝",
    });
  }

  if (referrals >= 5) {
    badges.push({
      id: "community-builder",
      title: "Community Builder",
      description: "Brought 5 users into the TGPI ecosystem.",
      icon: "🏆",
    });
  }

  return badges;
}