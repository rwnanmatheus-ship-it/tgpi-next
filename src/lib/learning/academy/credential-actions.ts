'use server';

import { requireApiUser } from '@/lib/auth/guards';
import { setAcademyCredentialSharing } from './service.server';

export async function updateAcademyCredentialSharing(credentialId: string, sharing: boolean) {
  if (typeof credentialId !== 'string' || !/^TGPI-[A-Z0-9_-]{8,90}$/.test(credentialId) || typeof sharing !== 'boolean') {
    return { ok: false };
  }

  try {
    const { uid } = await requireApiUser();
    await setAcademyCredentialSharing(uid, credentialId, sharing);
    return { ok: true };
  } catch {
    return { ok: false };
  }
}
