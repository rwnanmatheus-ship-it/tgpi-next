import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { countries } from "../src/data/countries.ts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MAP_PATH = path.join(
  ROOT,
  "public/maps/tgpi-world-countries-50m.json",
);
const OUTPUT_DIR = path.join(
  ROOT,
  "public/images/countries/identity",
);

const FEATURE_NAME_TO_SLUG = {
  "the bahamas": "bahamas",
  "republic of the congo": "congo",
  "federated states of micronesia": "micronesia",
  "republic of serbia": "serbia",
  "united republic of tanzania": "tanzania",
  "east timor": "timor-leste",
  "united states of america": "united-states",
  vatican: "vatican-city",
};

const REGION_PALETTES = {
  Africa: [
    ["#051F23", "#0B5D4D", "#F6C453", "#E66B3D"],
    ["#071A32", "#176B87", "#F4B942", "#39C6A3"],
    ["#241208", "#8A3D1F", "#F2C14E", "#2E8B72"],
  ],
  "Africa / Middle East": [
    ["#071D23", "#096B5C", "#D9A441", "#C93E4F"],
    ["#11152E", "#2857A4", "#E8B84A", "#B53C4C"],
  ],
  Asia: [
    ["#180B2C", "#4935A8", "#F04464", "#F5B942"],
    ["#071A32", "#0B5FA5", "#E43D4F", "#F3C34E"],
    ["#061F1A", "#16806A", "#F05C45", "#F5D063"],
  ],
  "Asia / Europe": [
    ["#0A1830", "#2864B7", "#D95B43", "#EFCB59"],
    ["#171331", "#5A3AB8", "#DD4E64", "#F1C75A"],
  ],
  Europe: [
    ["#071A32", "#174A8B", "#F0C453", "#D94D55"],
    ["#11152E", "#315DB5", "#F2B84B", "#39A9A5"],
    ["#14102C", "#5944B8", "#E8505B", "#EFCF67"],
  ],
  "Europe / Asia": [
    ["#071A32", "#245AA8", "#D84E55", "#EBC552"],
    ["#11152D", "#4B49A8", "#D95C3F", "#F1CC5C"],
  ],
  "North America": [
    ["#061B35", "#1765B5", "#E34852", "#F2C14E"],
    ["#042638", "#078AA4", "#EF5B46", "#F7CE5B"],
    ["#11152D", "#395CC6", "#DB3D55", "#F1C85D"],
  ],
  Oceania: [
    ["#03243B", "#067DA2", "#19C5B5", "#F06D52"],
    ["#071A32", "#2359B2", "#30B7D7", "#F2BE50"],
    ["#08273A", "#126C8C", "#34C7A5", "#ED5F61"],
  ],
  "South America": [
    ["#05251E", "#0C7A5B", "#F1C644", "#1EA9D6"],
    ["#071A32", "#1762A7", "#F2C44B", "#E65A48"],
    ["#142317", "#4B8A3D", "#F0B83E", "#29A9B8"],
  ],
};

function normalizeCountryName(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .toLowerCase();
}

function hashString(value) {
  let hash = 2166136261;
  for (const character of value) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function getNumbers(value) {
  return [...value.matchAll(/-?\d+(?:\.\d+)?/g)].map((match) =>
    Number(match[0]),
  );
}

function getBounds(value) {
  const numbers = getNumbers(value);
  const xs = [];
  const ys = [];

  for (let index = 0; index < numbers.length - 1; index += 2) {
    xs.push(numbers[index]);
    ys.push(numbers[index + 1]);
  }

  if (!xs.length || !ys.length) return null;

  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  return {
    minX,
    maxX,
    minY,
    maxY,
    width: Math.max(maxX - minX, 0.1),
    height: Math.max(maxY - minY, 0.1),
    centerX: (minX + maxX) / 2,
    centerY: (minY + maxY) / 2,
  };
}

function splitSubpaths(value) {
  return value
    .split(/(?=M)/g)
    .filter(Boolean)
    .map((segment) => ({
      segment,
      bounds: getBounds(segment),
    }))
    .filter((item) => item.bounds);
}

function prepareCountryGeometry(feature) {
  const parts = splitSubpaths(feature.path);
  if (!parts.length) return null;

  const maxArea = Math.max(
    ...parts.map(({ bounds }) => bounds.width * bounds.height),
  );
  const mainScale = Math.sqrt(maxArea);
  const [labelX, labelY] = feature.label;
  const selected = parts
    .map((part) => {
      let offsetX = 0;
      if (part.bounds.centerX - labelX > 500) offsetX = -1000;
      if (part.bounds.centerX - labelX < -500) offsetX = 1000;

      const centerX = part.bounds.centerX + offsetX;
      const distance = Math.hypot(centerX - labelX, part.bounds.centerY - labelY);
      const area = part.bounds.width * part.bounds.height;
      const keep =
        area >= maxArea * 0.02 ||
        (area >= maxArea * 0.002 && distance <= Math.max(18, mainScale * 3.5));

      return { ...part, area, distance, offsetX, keep };
    })
    .filter((part) => part.keep)
    .sort((first, second) => second.area - first.area)
    .slice(0, 42);

  const visible = selected.length ? selected : parts.slice(0, 1);
  const minX = Math.min(
    ...visible.map((part) => part.bounds.minX + (part.offsetX ?? 0)),
  );
  const maxX = Math.max(
    ...visible.map((part) => part.bounds.maxX + (part.offsetX ?? 0)),
  );
  const minY = Math.min(...visible.map((part) => part.bounds.minY));
  const maxY = Math.max(...visible.map((part) => part.bounds.maxY));
  const width = Math.max(maxX - minX, 0.1);
  const height = Math.max(maxY - minY, 0.1);
  const scale = Math.min(620 / width, 660 / height);
  const translateX = 1110 - ((minX + maxX) / 2) * scale;
  const translateY = 450 - ((minY + maxY) / 2) * scale;

  return {
    parts: visible,
    transform: `translate(${translateX.toFixed(2)} ${translateY.toFixed(
      2,
    )}) scale(${scale.toFixed(4)})`,
  };
}

function createDecorativeLines(hash, accent) {
  return Array.from({ length: 5 }, (_, index) => {
    const verticalShift = ((hash >> (index * 3)) & 31) - 15;
    const y = 180 + index * 115 + verticalShift;
    return `<path d="M-80 ${y} C250 ${y - 100}, 470 ${
      y + 110
    }, 820 ${y - 10} S1320 ${y - 80}, 1680 ${
      y + 25
    }" fill="none" stroke="${accent}" stroke-opacity="${
      0.11 - index * 0.012
    }" stroke-width="2"/>`;
  }).join("");
}

function createVisual(country, feature) {
  const hash = hashString(country.slug);
  const palettes = REGION_PALETTES[country.region] ?? REGION_PALETTES.Europe;
  const [deep, mid, accent, spark] = palettes[hash % palettes.length];
  const geometry = feature ? prepareCountryGeometry(feature) : null;
  const rotation = 14 + (hash % 26);
  const orbitX = 1180 + (hash % 190);
  const orbitY = 145 + ((hash >> 5) % 150);
  const shapeMarkup = geometry
    ? geometry.parts
        .map(
          (part) =>
            `<path d="${part.segment}" transform="translate(${part.offsetX ?? 0} 0)"/>`,
        )
        .join("")
    : `<circle cx="0" cy="0" r="120"/><circle cx="175" cy="60" r="48"/>`;
  const geometryTransform = geometry?.transform ?? "translate(1180 450)";

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900" role="img" aria-labelledby="title description">
  <title id="title">TGPI identity artwork for ${country.name}</title>
  <description id="description">A vivid abstract country visual built around the geographic silhouette of ${country.name}.</description>
  <defs>
    <linearGradient id="background" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${deep}"/>
      <stop offset="0.58" stop-color="${mid}"/>
      <stop offset="1" stop-color="${spark}"/>
    </linearGradient>
    <radialGradient id="halo" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.88"/>
      <stop offset="0.48" stop-color="${spark}" stop-opacity="0.34"/>
      <stop offset="1" stop-color="${deep}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="land" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#FFFFFF" stop-opacity="0.96"/>
      <stop offset="0.42" stop-color="${accent}"/>
      <stop offset="1" stop-color="${spark}"/>
    </linearGradient>
    <pattern id="grid" width="54" height="54" patternUnits="userSpaceOnUse" patternTransform="rotate(${rotation})">
      <path d="M54 0H0V54" fill="none" stroke="#FFFFFF" stroke-opacity="0.055" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1600" height="900" fill="url(#background)"/>
  <rect width="1600" height="900" fill="url(#grid)"/>
  <circle cx="${orbitX}" cy="${orbitY}" r="440" fill="url(#halo)"/>
  <circle cx="134" cy="728" r="260" fill="${accent}" fill-opacity="0.12"/>
  <circle cx="134" cy="728" r="182" fill="none" stroke="${accent}" stroke-opacity="0.24" stroke-width="2"/>
  ${createDecorativeLines(hash, "#FFFFFF")}
  <g transform="${geometryTransform}" fill="url(#land)" fill-rule="evenodd" stroke="#FFFFFF" stroke-linejoin="round" stroke-width="1.35" vector-effect="non-scaling-stroke" opacity="0.98">
    ${shapeMarkup}
  </g>
  <g transform="${geometryTransform}" fill="none" stroke="${accent}" stroke-linejoin="round" stroke-width="6" vector-effect="non-scaling-stroke" opacity="0.34">
    ${shapeMarkup}
  </g>
  <path d="M80 805H560" stroke="#FFFFFF" stroke-opacity="0.24" stroke-width="2"/>
  <circle cx="80" cy="805" r="7" fill="${accent}"/>
  <circle cx="106" cy="805" r="4" fill="${spark}"/>
  <circle cx="126" cy="805" r="2.5" fill="#FFFFFF" fill-opacity="0.8"/>
</svg>`;
}

async function main() {
  const mapData = JSON.parse(await readFile(MAP_PATH, "utf8"));
  const countryByName = new Map(
    countries.map((country) => [normalizeCountryName(country.name), country]),
  );
  const countryBySlug = new Map(
    countries.map((country) => [country.slug, country]),
  );
  const featureBySlug = new Map();

  for (const feature of mapData.features) {
    const normalizedName = normalizeCountryName(feature.name);
    const aliasSlug = FEATURE_NAME_TO_SLUG[normalizedName];
    const country = aliasSlug
      ? countryBySlug.get(aliasSlug)
      : countryByName.get(normalizedName);
    if (country && !featureBySlug.has(country.slug)) {
      featureBySlug.set(country.slug, feature);
    }
  }

  await mkdir(OUTPUT_DIR, { recursive: true });
  await Promise.all(
    countries.map(async (country) => {
      const visual = createVisual(country, featureBySlug.get(country.slug));
      if (country.slug === "japan") return;

      await sharp(Buffer.from(visual))
        .resize(1600, 900)
        .webp({ quality: 82, effort: 5, smartSubsample: true })
        .toFile(path.join(OUTPUT_DIR, `${country.slug}.webp`));
    }),
  );

  const missingGeometry = countries
    .filter((country) => !featureBySlug.has(country.slug))
    .map((country) => country.slug);

  console.log(
    JSON.stringify(
      {
        generated: countries.length,
        rasterized: countries.length - 1,
        mappedGeometry: countries.length - missingGeometry.length,
        missingGeometry,
        outputDirectory: path.relative(ROOT, OUTPUT_DIR),
      },
      null,
      2,
    ),
  );
}

await main();
