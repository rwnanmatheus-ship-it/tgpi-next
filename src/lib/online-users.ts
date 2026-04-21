export function getOnlineUsers() {
  return Math.floor(Math.random() * 50) + 10;
}

export function isUserOnline() {
  return Math.random() > 0.3;
}