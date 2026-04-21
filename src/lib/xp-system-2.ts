export type XPAction = {
  id: string;
  label: string;
  xp: number;
};

export const xpActions2: XPAction[] = [
  { id: "complete_profile", label: "Complete identity profile", xp: 40 },
  { id: "explore_country", label: "Explore a country", xp: 20 },
  { id: "join_room", label: "Join a global room", xp: 15 },
  { id: "connect_user", label: "Connect with another user", xp: 25 },
  { id: "complete_mission", label: "Complete a global mission", xp: 30 },
  { id: "share_profile", label: "Share public profile", xp: 20 },
  { id: "earn_certificate", label: "Earn certificate", xp: 80 },
];

export function getXPSystemOverview() {
  return xpActions2;
}

export function estimatePotentialXP(ids: string[]) {
  return ids.reduce((total, id) => {
    const action = xpActions2.find((item) => item.id === id);
    return total + (action?.xp || 0);
  }, 0);
}