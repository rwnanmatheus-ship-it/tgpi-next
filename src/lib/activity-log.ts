import { appendUserActivity } from "@/lib/user-memory";

export async function logActivity(action: string) {
  await appendUserActivity(action);
}