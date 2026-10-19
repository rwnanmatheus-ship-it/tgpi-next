import { auth, currentUser } from '@clerk/nextjs/server';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import QRCode from 'qrcode';
import { buildPublicMember } from '@/lib/members/public-profile.server';
import { selectMemberExport } from '@/lib/members/export-selection';
export const runtime = 'nodejs';
const headers = { 'Cache-Control': 'private, no-store', 'Vary': 'Cookie' };
export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) return Response.json({ error: 'Sign in to export your profile.' }, { status: 401, headers });
  if (request.headers.get('origin') && request.headers.get('origin') !== new URL(request.url).origin) return Response.json({ error: 'Request not allowed.' }, { status: 403, headers });
  try {
    const raw = await request.text(); if (raw.length > 2000) return Response.json({ error: 'Export request too large.' }, { status: 413, headers });
    const input = JSON.parse(raw) as { format?: unknown; selected?: unknown };
    if (!input || !['pdf', 'image-data'].includes(String(input.format))) return Response.json({ error: 'Choose PDF or image.' }, { status: 400, headers });
    const user = await currentUser(); if (!user) return Response.json({ error: 'Session expired.' }, { status: 401, headers });
    const publicMember = await buildPublicMember(user);
    if (publicMember.visibility === 'private') return Response.json({ error: 'Your profile is private. Enable Members or Public visibility and save before exporting a shareable identity.' }, { status: 409, headers });
    const member = selectMemberExport(publicMember, input.selected);
    let photo: Buffer | undefined;
    if (member.avatar) {
      // Only request Clerk-hosted photos; never follow arbitrary user-controlled redirects.
      const url = new URL(member.avatar);
      if (url.protocol === 'https:' && ['img.clerk.com', 'images.clerk.dev'].includes(url.hostname)) {
        const response = await fetch(url, { redirect: 'error', signal: AbortSignal.timeout(6000), cache: 'no-store' });
        if (response.ok && /image\/(png|jpeg)/.test(response.headers.get('content-type') || '')) {
          const bytes = Buffer.from(await response.arrayBuffer()); if (bytes.length <= 5_000_000) photo = bytes;
        }
      }
      if (!photo) return Response.json({ error: 'Your photo could not be loaded for export. Retry or deselect Photo.' }, { status: 422, headers });
    }
    if (input.format === 'pdf') {
      const { createMemberPdf } = await import('@/lib/members/member-pdf');
      const bytes = await createMemberPdf(member, photo);
      return new Response(Buffer.from(bytes), { headers: { ...headers, 'Content-Type': 'application/pdf', 'Content-Disposition': 'attachment; filename="tgpi-member-profile.pdf"' } });
    }
    const crest = await readFile(path.join(process.cwd(), 'src/assets/brand/tgpi-crest-print.png'));
    return Response.json({ member, photo: photo ? `data:image/${photo[0] === 137 ? 'png' : 'jpeg'};base64,${photo.toString('base64')}` : '', crest: `data:image/png;base64,${crest.toString('base64')}`, qr: await QRCode.toDataURL(`https://theglobalpolymath.com${member.path}`, { width: 420, margin: 4, errorCorrectionLevel: 'M' }) }, { headers });
  } catch (error) {
    return Response.json({ error: error instanceof SyntaxError ? 'Invalid export format.' : 'Unable to export. Your saved profile is unchanged; please retry.' }, { status: error instanceof SyntaxError ? 400 : 503, headers });
  }
}
