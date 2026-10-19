'use client';
import { useState, useId } from 'react';
import { exportGroups, type ExportGroup } from '@/lib/members/export-selection';
import type { PublicMemberProfile } from '@/lib/members/public-profile';
type ImagePayload = { member: PublicMemberProfile; photo: string; crest: string; qr: string };
const labels: Record<ExportGroup, string> = { photo: 'Photo', bio: 'Biography', career: 'Career', languages: 'Languages', links: 'Professional links', goals: 'International goals', progress: 'Rank, completions & credentials' };
function download(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = filename; link.click(); setTimeout(() => URL.revokeObjectURL(url), 60_000);
}
async function imageFrom(source: string) { const img = new Image(); img.src = source; await img.decode(); return img; }
export async function createMemberPng(data: ImagePayload, compact: boolean) {
  await document.fonts.ready;
  const canvas = document.createElement('canvas'); canvas.width = 1800;
  const ctx = canvas.getContext('2d'); if (!ctx) throw new Error('Image export is unavailable in this browser.');
  const lines: { value: string; size: number; color: string }[] = [];
  function wrap(value: string, size: number, color = '#eef3fb', width = 1320) {
    ctx!.font = `${size}px sans-serif`; let line = '';
    for (const char of Array.from(value)) {
      if (char === '\n' || ctx!.measureText(line + char).width > width) { lines.push({ value: line, size, color }); line = char === '\n' ? '' : char; } else line += char;
    }
    if (line) lines.push({ value: line, size, color });
  }
  wrap(data.member.name, 66, '#ffffff', data.photo ? 1150 : 1500);
  if (data.member.handle) wrap(`@${data.member.handle}`, 34, '#f0d58c');
  wrap(data.member.number, 28, '#b9cbdf');
  if (data.member.headline) wrap(data.member.headline, 34);
  if (data.member.rank) wrap(`TGPI progression: ${data.member.rank.name}`, 30, '#f0d58c');
  if (!compact) {
    if (data.member.bio) wrap(data.member.bio, 28);
    if (data.member.career.length) wrap(`Self-declared: ${data.member.career.join(' · ')}`, 28);
    if (data.member.languages.length) wrap(`Declared languages: ${data.member.languages.join(', ')}`, 28);
    if (data.member.goal) wrap(`Direction: ${data.member.goal} · ${data.member.countries.map(c => c.name).join(', ')}`, 28);
    for (const l of data.member.links) wrap(`${l.label}: ${l.url}`, 26);
    for (const c of data.member.courses) wrap(`Recorded completion: ${c.title}`, 26);
    for (const c of data.member.certificates) wrap(`Credential: ${c.title} · theglobalpolymath.com${c.path}`, 26);
  }
  const textHeight = lines.reduce((sum, l) => sum + l.size * 1.6, 0);
  canvas.height = Math.ceil(Math.max(compact ? 1125 : 2100, 350 + textHeight + 390));
  const gradient = ctx.createLinearGradient(0, 0, 1800, canvas.height); gradient.addColorStop(0, '#102e4f'); gradient.addColorStop(.5, '#071321'); gradient.addColorStop(1, '#0b2038'); ctx.fillStyle = gradient; ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#b58a2a'; ctx.lineWidth = 3; ctx.strokeRect(36, 36, canvas.width - 72, canvas.height - 72);
  const [crest, qr, photo] = await Promise.all([imageFrom(data.crest), imageFrom(data.qr), data.photo ? imageFrom(data.photo) : null]);
  ctx.drawImage(crest, 80, 76, 150, 150); ctx.font = 'bold 30px sans-serif'; ctx.fillStyle = '#f0d58c'; ctx.fillText('THE GLOBAL POLYMATH INSTITUTE', 270, 130); ctx.font = '26px sans-serif'; ctx.fillText('TGPI MEMBER', 270, 182);
  if (photo) { ctx.save(); ctx.beginPath(); ctx.arc(1575, 365, 105, 0, Math.PI * 2); ctx.clip(); const side = Math.min(photo.naturalWidth, photo.naturalHeight); ctx.drawImage(photo, (photo.naturalWidth-side)/2, (photo.naturalHeight-side)/2, side, side, 1470, 260, 210, 210); ctx.restore(); }
  let y = 320; for (const l of lines) { ctx.font = `${l.size}px sans-serif`; ctx.fillStyle = l.color; ctx.fillText(l.value, 100, y); y += l.size * 1.6; }
  const bottom = canvas.height - 335; ctx.drawImage(qr, 95, bottom, 230, 230); ctx.fillStyle = '#dae4ef'; ctx.font = '27px sans-serif'; ctx.fillText('View the current authorized member profile', 370, bottom + 68); ctx.font = '23px sans-serif'; ctx.fillText('TGPI membership · Not an official ID or academic accreditation', 370, bottom + 120); ctx.fillText('Shared files remain outside TGPI privacy controls.', 370, bottom + 166);
  return new Promise<Blob>((resolve, reject) => canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error('Unable to create your PNG.')), 'image/png'));
}
export default function MemberExportCenter() {
  const id = useId(); const [selected, setSelected] = useState<ExportGroup[]>([]);
  const [busy, setBusy] = useState(false); const [message, setMessage] = useState('');
  async function exportFile(format: 'pdf' | 'image-data', compact = false, print = false) {
    if (busy) return; setBusy(true); setMessage('Preparing your saved public data…');
    try {
      const response = await fetch('/api/member-export', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ format, selected }) });
      if (!response.ok) { const result = await response.json(); throw new Error(result.error); }
      if (format === 'pdf') {
        const blob = await response.blob();
        if (print) { const url = URL.createObjectURL(blob); const opened = window.open(url, '_blank', 'noopener,noreferrer'); void opened; setTimeout(() => URL.revokeObjectURL(url), 60_000); setMessage('Print-ready PDF opened. Use its print control. If popups are blocked, download the PDF.'); }
        else { download(blob, 'tgpi-member-profile.pdf'); setMessage('PDF downloaded with selectable text.'); }
      } else { const data: ImagePayload = await response.json(); download(await createMemberPng(data, compact), compact ? 'tgpi-member-card.png' : 'tgpi-member-presentation.png'); setMessage('High-resolution PNG downloaded.'); }
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Export failed. Please retry.'); }
    finally { setBusy(false); }
  }
  return <section className="tgpi-member-panel mt-5"><p className="tgpi-member-eyebrow">Your portable presentation</p><h3>Share the part you choose.</h3><p>Saved public fields only. The compact card includes your name, @ID, member number, headline, selected photo and shared rank. The extended PNG and PDF include the selected groups below.</p><fieldset disabled={busy} className="mt-4"><legend className="font-bold">Optional groups (public permissions still apply)</legend><div className="mt-3 grid gap-3 sm:grid-cols-2">{exportGroups.map(group => <label className="flex min-h-11 items-center gap-3" htmlFor={`${id}-${group}`} key={group}><input id={`${id}-${group}`} type="checkbox" className="h-5 w-5 accent-[#164e83]" checked={selected.includes(group)} onChange={e => setSelected(current => e.target.checked ? [...current, group] : current.filter(g => g !== group))} />{labels[group]}</label>)}</div></fieldset><div className="mt-4 flex flex-wrap gap-3"><button className="tgpi-member-button" disabled={busy} type="button" onClick={() => exportFile('image-data', true)}>Download card PNG</button><button className="tgpi-member-button" disabled={busy} type="button" onClick={() => exportFile('image-data')}>Download extended PNG</button><button className="tgpi-member-button" disabled={busy} type="button" onClick={() => exportFile('pdf')}>Download PDF</button><button className="tgpi-member-button" disabled={busy} type="button" onClick={() => exportFile('pdf', false, true)}>Print-ready PDF</button></div><p role="status" aria-live="polite" className="mt-3 text-sm">{message}</p><p className="mt-3 text-sm">Files already downloaded or shared outside TGPI cannot be revoked by later privacy changes. The QR contains only your profile link.</p></section>;
}
