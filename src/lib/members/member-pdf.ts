import { readFile } from 'node:fs/promises';
import path from 'node:path';
import fontkit from '@pdf-lib/fontkit';
import { PDFDocument, PDFName, PDFString, rgb } from 'pdf-lib';
import QRCode from 'qrcode';
import type { PublicMemberProfile } from './public-profile';
export async function createMemberPdf(member: PublicMemberProfile, photo?: Uint8Array) {
  const doc = await PDFDocument.create(); doc.registerFontkit(fontkit);
  doc.setTitle(`${member.name} — TGPI Member Profile`); doc.setAuthor('TGPI — The Global Polymath Institute');
  const [fontBytes, crestBytes] = await Promise.all([
    readFile(path.join(process.cwd(), 'src/assets/fonts/DejaVuSans.ttf')),
    readFile(path.join(process.cwd(), 'src/assets/brand/tgpi-crest-print.png')),
  ]);
  const font = await doc.embedFont(fontBytes, { subset: true });
  const supported = new Set(font.getCharacterSet());
  const clean = (text: string) => Array.from(text.replace(/[\u0000-\u001f]/g, ' ')).map(c => supported.has(c.codePointAt(0)!) ? c : '?').join('');
  const navy = rgb(.035, .09, .16), gold = rgb(.55, .39, .1), muted = rgb(.28, .34, .42);
  let page = doc.addPage([595.28, 841.89]); let y = 790;
  const crest = await doc.embedPng(crestBytes); page.drawImage(crest, { x: 42, y: 743, width: 62, height: 62 });
  function line(text: string, size = 11, color = navy) {
    // Wrap by actual font width; split long URLs and unbroken identifiers safely.
    let remaining = clean(text);
    while (remaining.length) {
      if (y < 62) { page = doc.addPage([595.28, 841.89]); y = 790; }
      let low = 1, high = remaining.length;
      while (low < high) { const mid = Math.ceil((low + high) / 2); if (font.widthOfTextAtSize(remaining.slice(0, mid), size) <= 500) low = mid; else high = mid - 1; }
      let count = low;
      const space = remaining.lastIndexOf(' ', count);
      if (count < remaining.length && space > count * .5) count = space;
      page.drawText(remaining.slice(0, count).trim(), { x: 46, y, size, font, color }); y -= size * 1.55;
      remaining = remaining.slice(count).trim();
    }
  }
  page.drawText('THE GLOBAL POLYMATH INSTITUTE', { x: 118, y: 785, font, size: 12, color: navy });
  page.drawText('MEMBER PRESENTATION', { x: 118, y: 762, font, size: 10, color: gold });
  y = 708;
  if (photo) {
    try { const image = photo[0] === 137 ? await doc.embedPng(photo) : await doc.embedJpg(photo); const size = image.scaleToFit(64, 64); page.drawImage(image, { x: 46, y: y - 45, width: size.width, height: size.height }); y -= 86; } catch { /* The profile remains exportable with an unsupported optional photo. */ }
  }
  line(member.name, 24); if (member.handle) line(`@${member.handle}`, 12, gold); line(member.number, 10, muted);
  if (member.headline) { y -= 10; line(member.headline, 13); }
  if (member.bio) { y -= 15; line(member.bio, 11, muted); }
  function section(title: string, values: string[]) { if (!values.length) return; y -= 18; if (y < 100) { page = doc.addPage([595.28, 841.89]); y = 790; } line(title, 12, gold); for (const v of values) line(v); }
  section('SELF-DECLARED PROFESSIONAL CONTEXT', member.career);
  section('SELF-DECLARED LANGUAGES (PROFICIENCY NOT VERIFIED)', member.languages);
  section('INTERNATIONAL DIRECTION', [member.goal, ...member.countries.map(c => c.name)].filter(Boolean));
  section('TGPI PLATFORM PROGRESSION', member.rank ? [member.rank.name, `${member.rank.points} / 10,000 points`] : []);
  section('RECORDED COURSE COMPLETIONS', member.courses.map(c => c.title));
  section('VERIFIABLE CREDENTIALS — CHECK CURRENT STATUS', member.certificates.map(c => `${c.title} — https://theglobalpolymath.com${c.path}`));
  section('LINKS PROVIDED BY THE MEMBER', member.links.map(l => `${l.label}: ${l.url}`));
  if (y < 210) { page = doc.addPage([595.28, 841.89]); y = 790; }
  y -= 20; const qr = await doc.embedPng(await QRCode.toBuffer(`https://theglobalpolymath.com${member.path}`, { width: 320, margin: 4, errorCorrectionLevel: 'M' }));
  page.drawImage(qr, { x: 42, y: y - 100, width: 100, height: 100 });
  page.node.set(PDFName.of('Annots'), doc.context.obj([doc.context.register(doc.context.obj({ Type: 'Annot', Subtype: 'Link', Rect: [42, y - 100, 142, y], Border: [0, 0, 0], A: { Type: 'Action', S: 'URI', URI: PDFString.of(`https://theglobalpolymath.com${member.path}`) } }))]));
  y -= 125;
  line('Scan to check the current authorized TGPI profile.', 9, muted);
  line('Membership is not an official ID, immigration permission or academic accreditation.', 8, muted);
  line('Downloaded copies are not revoked by later privacy changes. Unsupported font glyphs appear as ?.', 8, muted);
  return doc.save();
}
