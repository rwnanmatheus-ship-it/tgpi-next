import { auth } from "@/lib/firebase";
import { createCredential } from "@/lib/tgpi-credentials";
import { loadCommandCenterProfile } from "@/lib/profile-command-center";

export async function createTestCertificate() {
  const user = auth.currentUser;

  if (!user) throw new Error("User not authenticated");

  const profile = await loadCommandCenterProfile();

  const displayName =
    profile?.displayName ||
    profile?.fullName ||
    user.displayName ||
    (user.email ? user.email.split("@")[0] : "TGPI User");

  await createCredential({
    userId: user.uid,
    name: displayName,
    program: "Introduction to Artificial Intelligence",
    score: 92,
    level: "Professional",
    issuedAt: new Date().toISOString(),
    verified: true,
  });
}