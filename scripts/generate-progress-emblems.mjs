/** Distinct, resolution-independent academic insignia; native SVG, no external fonts. */
import { mkdirSync, writeFileSync } from 'node:fs';
const emblems = [
  ['global-initiate', '#C99468', '<path d="M168 198q44-16 88 8 44-24 88-8v102q-44-16-88 8-44-24-88-8Z"/><path d="M256 206v102M185 220q26-6 52 7m-52 17q26-6 52 7m38-24q26-13 52-7m-52 31q26-13 52-7"/>'],
  ['pathfinder', '#D5BC93', '<path d="M214 316q-29-33-14-65 18-35 83-45m-27 100q-3-38 30-55m-31-54-32-33-13 48m65-7 39-17-8 42"/><path d="M207 319h98M228 337h55"/><circle cx="288" cy="174" r="12"/>'],
  ['explorer', '#DDBF6B', '<circle cx="256" cy="250" r="85"/><circle cx="256" cy="250" r="65"/><path d="m289 204-15 65-51 27 15-65Z" fill="url(#metal)"/><path d="m256 154 0 20m96 76h-20m-76 96v-20m-96-76h20"/>'],
  ['navigator', '#9CD5E8', '<path d="M188 288h141l-26 36h-86ZM254 178v109m-9-96-61 79h61Zm18 20 60 59h-60"/><path d="M175 337q20-14 40 0t40 0 40 0 40 0"/>'],
  ['global-strategist', '#B3C6F1', '<path d="m215 191 13 100h56l13-100-23 20-18-32-18 32Zm15 102-18 32h88l-18-32m-74 47h96M224 246h64"/><circle cx="256" cy="163" r="10"/>'],
  ['research-fellow', '#85DFD3', '<ellipse cx="256" cy="250" rx="100" ry="35"/><ellipse cx="256" cy="250" rx="100" ry="35" transform="rotate(60 256 250)"/><ellipse cx="256" cy="250" rx="100" ry="35" transform="rotate(120 256 250)"/><circle cx="256" cy="250" r="16" fill="url(#metal)"/>'],
  ['global-architect', '#B9C8DE', '<path d="m167 216 89-45 89 45Zm12 18h154M185 322h142m-150 18h158M201 240v74m37-74v74m37-74v74m37-74v74"/><circle cx="256" cy="199" r="9"/>'],
  ['global-polymath', '#E3C97A', '<circle cx="256" cy="247" r="79"/><ellipse cx="256" cy="247" rx="38" ry="79"/><path d="M177 247h158M189 212h134m-134 70h134M256 168v158"/><ellipse cx="256" cy="247" rx="109" ry="36" transform="rotate(-28 256 247)"/>'],
  ['distinguished-polymath', '#E3CEFF', '<path d="m256 158 23 55 59 6-45 39 14 59-51-31-51 31 14-59-45-39 59-6Z" fill="url(#metal)"/><path d="M173 200q-55 71 6 128m160-128q55 71-6 128M190 332l-20-7m152 7 20-7"/><circle cx="256" cy="249" r="112"/>'],
  ['institute-laureate', '#FFE6A2', '<path d="M207 214h98v50q0 43-49 56-49-13-49-56ZM205 224h-30v35q0 30 34 35m98-70h30v35q0 30-34 35M256 321v24m-34 0h68"/><path d="m256 224 10 20 22 3-16 16 4 22-20-11-20 11 4-22-16-16 22-3Z" fill="url(#metal)"/><path d="m213 186-10-26 30 13 23-27 23 27 30-13-10 26Z" fill="url(#metal)"/>'],
];
mkdirSync('public/images/ranks/v3', { recursive: true });
for (const [index, [id, accent, symbol]] of emblems.entries()) {
  const leaves = index < 4 ? '' : Array.from({ length: 7 }, (_, i) => {
    const y = 350 - i * 28, x = 133 - Math.sin(i / 6 * Math.PI) * 33;
    return `<path d="M${x} ${y}q-31-4-29-28 30 3 29 28Zm${512-x} ${y}q31-4 29-28-30 3-29 28Z" fill="url(#metal)" opacity=".9"/>`;
  }).join('');
  const stars = Array.from({ length: Math.min(index+1, 5) }, (_, i) => `<circle cx="${256 + (i-(Math.min(index+1,5)-1)/2)*19}" cy="380" r="4" fill="${accent}"/>`).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><linearGradient id="metal" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff4cf"/><stop offset=".23" stop-color="${accent}"/><stop offset=".42" stop-color="#82602d"/><stop offset=".55" stop-color="#fff0ba"/><stop offset=".76" stop-color="${accent}"/><stop offset="1" stop-color="#755123"/></linearGradient><radialGradient id="enamel" cx=".35" cy=".22" r=".9"><stop stop-color="#285578"/><stop offset=".6" stop-color="#0c243d"/><stop offset="1" stop-color="#030f20"/></radialGradient><filter id="shadow" x="-.3" y="-.2" width="1.6" height="1.5"><feDropShadow dy="9" stdDeviation="6" flood-color="#020b16" flood-opacity=".35"/></filter></defs><g filter="url(#shadow)">${leaves}<path d="M256 45 410 107v158c0 88-77 163-154 204-77-41-154-116-154-204V107Z" fill="url(#metal)"/><path d="M256 60 397 116v148c0 80-70 150-141 189-71-39-141-109-141-189V116Z" fill="url(#enamel)" stroke="#fff0ba" stroke-width="1.5"/><path d="M256 76 381 126v137c0 70-61 136-125 173-64-37-125-103-125-173V126Z" fill="none" stroke="${accent}" stroke-opacity=".6" stroke-width="2"/><path d="M149 146 256 103l107 43" stroke="url(#metal)" fill="none" stroke-width="3"/><circle cx="256" cy="125" r="5" fill="${accent}"/><g fill="none" stroke="url(#metal)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">${symbol}</g>${stars}<path d="m221 403 35 20 35-20" fill="none" stroke="url(#metal)" stroke-width="4"/></g></svg>`;
  writeFileSync(`public/images/ranks/v3/${id}.svg`, svg);
}
