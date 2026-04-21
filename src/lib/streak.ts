export function updateStreak(lastActive?: string, currentStreak = 0) {
  const today = new Date().toDateString();
  const last = lastActive ? new Date(lastActive).toDateString() : null;

  if (last === today) {
    return { streak: currentStreak, lastActive };
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (last === yesterday.toDateString()) {
    return {
      streak: currentStreak + 1,
      lastActive: new Date().toISOString(),
    };
  }

  return {
    streak: 1,
    lastActive: new Date().toISOString(),
  };
}