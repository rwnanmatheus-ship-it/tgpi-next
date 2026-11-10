import { getUserActivationProgress } from "@/lib/activation-store.server";
import { auth, currentUser } from '@clerk/nextjs/server';
import { normalizeTgpiAccountProfile } from '@/lib/account-profile';
import { normalizeOnboardingData } from '@/lib/onboarding';
import { getMemberIdentity } from '@/lib/members/identity.server';
export async function GET() {
  const { userId, sessionId } = await auth(); const headers = { 'Cache-Control': 'private, no-store', 'Vary': 'Cookie' };
  if (!userId || !sessionId) return Response.json({ error: 'Sign in to export your data.' }, { status: 401, headers });
  try {
    const user = await currentUser(); if (!user || user.id !== userId) return Response.json({ error: 'Session expired.' }, { status: 401, headers });
    return Response.json({ exportedAt: new Date().toISOString(), scope: 'TGPI profile, international preferences, identity and platform progress. Billing and credentials remain available in their dedicated centers.', identity: await getMemberIdentity(userId), name: { firstName: user.firstName, lastName: user.lastName }, profile: normalizeTgpiAccountProfile(user.unsafeMetadata.tgpiAccountProfile), internationalPlan: normalizeOnboardingData(user.unsafeMetadata.tgpiOnboarding), progress: await getUserActivationProgress(userId, user.privateMetadata) }, { headers: { ...headers, 'Content-Disposition': 'attachment; filename="tgpi-account-data.json"' } });
  } catch { return Response.json({ error: 'Unable to export account data. Please retry.' }, { status: 503, headers }); }
}
