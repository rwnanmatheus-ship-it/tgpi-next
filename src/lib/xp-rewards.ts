export function getXPReward(action: string) {
  const map: Record<string, number> = {
    login: 5,
    profile: 20,
    country_view: 10,
    chat: 8,
    follow: 15,
  };

  return map[action] || 0;
}