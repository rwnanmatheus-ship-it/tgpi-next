import { updateUserMemory, getUserMemory } from "@/lib/user-memory";

export type GlobalProfile = {
  goal?: "work" | "study" | "live";
  englishLevel?: "basic" | "intermediate" | "advanced";
  budget?: "low" | "medium" | "high";
  continentInterest?: string;
};

export async function getGlobalProfile(): Promise<GlobalProfile | null> {
  const memory = await getUserMemory();
  return memory as GlobalProfile;
}

export async function updateGlobalProfile(data: Partial<GlobalProfile>) {
  await updateUserMemory(data);
}