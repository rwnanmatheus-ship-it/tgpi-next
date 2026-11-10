import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";

// Retain every source path, emblem and transparent edge. Only the material light
// changes. Embedded texture keeps SVG-as-image rendering self-contained.
const root = resolve(import.meta.dirname, "../public/images/country-flags");
const identities = JSON.parse(await readFile(resolve(import.meta.dirname, "../src/data/intelligence/identities.json"), "utf8"));
const countries = Array.isArray(identities) ? identities : identities.countries;
const texture = (await readFile(`${root}/studio/fabric-light.jpg`)).toString("base64");
await mkdir(`${root}/studio`, { recursive: true });
for (const country of countries) {
  const code = country.iso2.toLowerCase();
  const source = await readFile(`${root}/${code}.svg`, "utf8");
  const match = source.match(/<svg\b[^>]*>([\s\S]*)<\/svg>\s*$/);
  if (!match || !source.includes('viewBox="0 0 640 480"')) throw new Error(`Unexpected source: ${code}`);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 640 480"><defs><filter id="tgpi-fabric-${code}" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feImage x="0" y="0" width="640" height="480" preserveAspectRatio="none" xlink:href="data:image/jpeg;base64,${texture}" result="cloth"/><feComponentTransfer in="cloth" result="light"><feFuncR type="linear" slope="1.24" intercept="-.17"/><feFuncG type="linear" slope="1.24" intercept="-.17"/><feFuncB type="linear" slope="1.24" intercept="-.17"/></feComponentTransfer><feBlend in="SourceGraphic" in2="light" mode="multiply" result="shaded"/><feComposite in="shaded" in2="SourceGraphic" operator="in"/></filter></defs><g filter="url(#tgpi-fabric-${code})">${match[1]}</g></svg>\n`;
  await writeFile(`${root}/studio/${code}.svg`, svg);
}
console.log(`Created ${countries.length} self-contained studio flag assets.`);
