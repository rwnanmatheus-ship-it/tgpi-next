import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const projectRoot = process.cwd();
const failures = [];

function read(relativePath) {
  return readFileSync(join(projectRoot, relativePath), "utf8");
}

function assert(condition, message) {
  if (!condition) failures.push(message);
}

const requiredFiles = [
  "src/seo/config.ts",
  "src/seo/metadata.ts",
  "src/seo/policy.ts",
  "src/seo/countries.ts",
  "src/seo/json-ld.tsx",
  "src/app/robots.ts",
  "src/app/sitemap.ts",
  "src/app/manifest.ts",
  "src/app/founder/page.tsx",
  "src/app/editorial-policy/page.tsx",
  "src/app/search/page.tsx",
  "docs/SEO.md",
  "docs/SEO-SEARCH-INTENT-MAP.md",
];

for (const relativePath of requiredFiles) {
  assert(existsSync(join(projectRoot, relativePath)), `Missing required SEO file: ${relativePath}`);
}

const config = read("src/seo/config.ts");
const rootLayout = read("src/app/layout.tsx");
const sitemap = read("src/app/sitemap.ts");
const robots = read("src/app/robots.ts");
const countrySeo = read("src/seo/countries.ts");
const homeSchema = read("src/seo/schemas/home.ts");
const organizationSchema = read("src/seo/schemas/organization.ts");

assert(
  config.includes('TGPI_SITE_URL = "https://www.theglobalpolymath.com"'),
  "Canonical domain must be the production www hostname.",
);
assert(rootLayout.includes("metadataBase: new URL(TGPI_SITE_URL)"), "Root metadata must use the central canonical URL.");
assert(rootLayout.includes("TGPI_TITLE_TEMPLATE"), "Root metadata must use the central title template.");
assert(sitemap.includes("publicRoutePolicy"), "Sitemap must use the central public route policy.");
assert(sitemap.includes("isCountryIndexable"), "Sitemap must apply the country quality gate.");
assert(sitemap.includes("courses.map"), "Sitemap must include public course overview pages.");
assert(!sitemap.includes('"/certificates"'), "Private certificates route must not be in the sitemap.");
assert(robots.includes('sitemap: absoluteUrl("/sitemap.xml")'), "robots.ts must expose the canonical sitemap URL.");
assert(countrySeo.includes("priorityCountrySlugs"), "Country SEO priority list is missing.");
assert(homeSchema.includes('"@type": "WebApplication"'), "Homepage WebApplication schema is missing.");
assert(organizationSchema.includes('"@type": "EducationalOrganization"'), "Organization schema is missing.");
assert(organizationSchema.includes("founder:"), "Organization schema must connect the founder entity.");

const countryImagesPath = join(projectRoot, "public/images/countries/identity");
const countryImageCount = existsSync(countryImagesPath)
  ? readdirSync(countryImagesPath).filter((name) => name.endsWith(".webp")).length
  : 0;
assert(countryImageCount === 195, `Expected 195 country images, found ${countryImageCount}.`);

const searchableSourceFiles = [
  "src/app/layout.tsx",
  "src/app/page.tsx",
  "src/app/sitemap.ts",
  "src/app/robots.ts",
  "src/app/countries/[slug]/page.tsx",
  "src/app/compare/page.tsx",
  "src/components/home/HomeStructuredData.tsx",
  "src/components/countries/CountriesStructuredData.tsx",
];

for (const relativePath of searchableSourceFiles) {
  const source = read(relativePath);
  assert(
    !source.includes("https://theglobalpolymath.com"),
    `Non-canonical hostname found in ${relativePath}.`,
  );
}

if (failures.length > 0) {
  console.error("TGPI SEO verification failed:\n");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("TGPI SEO verification passed.");
console.log("- canonical hostname: www.theglobalpolymath.com");
console.log("- 195 country images present");
console.log("- sitemap quality gate enabled");
console.log("- entity schemas present");
