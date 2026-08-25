import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const requestedBaseUrl = process.argv[2] || process.env.TGPI_VERIFY_BASE_URL;
const baseUrl = requestedBaseUrl
  ? new URL(requestedBaseUrl.endsWith("/") ? requestedBaseUrl : `${requestedBaseUrl}/`)
  : null;

const sourceContracts = [
  {
    file: "src/lib/global-workspace.ts",
    checks: [
      /title: "Compare selected countries"/,
      /title: "Review visa requirements"/,
      /title: "Start a learning path"/,
      /title: "Estimate monthly costs"/,
      /title: "Complete your global profile"/,
      /#documents-to-verify/,
      /#cost-of-living/,
      /\/courses\/english-abroad/,
      /\/onboarding/,
    ],
  },
  {
    file: "src/components/premium/PremiumCommandCenterV2.tsx",
    checks: [
      /href=\{model\.nextAction\.href\}/,
      /href=\{action\.href\}/,
      /href=\{model\.comparison\.href\}/,
      /href=\{model\.cost\.href\}/,
      /href=\{model\.documents\.href\}/,
      /href=\{model\.learning\.href\}/,
      /href="\/profile\/security"/,
    ],
  },
  {
    file: "src/app/compare/page.tsx",
    checks: [/id="comparison-matrix"/],
  },
  {
    file: "src/app/countries/[slug]/page.tsx",
    checks: [/id="cost-of-living"/, /id="documents-to-verify"/],
  },
  {
    file: "src/app/courses/page.tsx",
    checks: [/LearningPathExplorer/, /\/courses\/english-abroad/],
  },
  {
    file: "src/components/courses/LearningPathExplorer.tsx",
    checks: [/id="learning-paths"/, /CourseCard/, /aria-pressed/],
  },
  {
    file: "src/data/courses.ts",
    checks: [/englishAbroadCourse/, /getCourseLesson/, /getCourseLessonCount/],
  },
  {
    file: "src/data/courses/english-abroad/index.ts",
    checks: [
      /id: "english-abroad"/,
      /version: "1\.0\.0"/,
      /estimatedMinutes: 370/,
      /arrivalModule/,
      /housingModule/,
      /dailyIndependenceModule/,
      /careerModule/,
      /safetyCultureModule/,
      /globalActionModule/,
    ],
  },
  {
    file: "src/app/courses/[id]/lessons/[lessonId]/page.tsx",
    checks: [/LessonExperience/, /generateMetadata/, /generateStaticParams/],
  },
  {
    file: "src/lib/activation-store.server.ts",
    checks: [/checkpointOptionId/, /lesson\.checkpoint\.correctOptionId/],
  },
  {
    file: "src/app/api/billing/status/route.ts",
    checks: [
      /"Cache-Control": "private, no-store, max-age=0"/,
      /return json\(/,
    ],
  },
];

const runtimeContracts = [
  {
    label: "Premium signed-out protection",
    path: "/premium",
    validate: validateSignInRedirect,
  },
  {
    label: "Profile security signed-out protection",
    path: "/profile/security",
    validate: validateSignInRedirect,
  },
  {
    label: "Learning path signed-out protection",
    path: "/courses/english-abroad",
    validate: validateSignInRedirect,
  },
  {
    label: "Course lesson signed-out protection",
    path: "/courses/english-abroad/lessons/intro",
    validate: validateSignInRedirect,
  },
  {
    label: "Comparison destination",
    path: "/compare?country=united-states&country=japan&goal=work",
    validate: validatePage({ anchor: "comparison-matrix" }),
  },
  {
    label: "Document readiness destination",
    path: "/countries/united-states",
    validate: validatePage({ anchor: "documents-to-verify" }),
  },
  {
    label: "Monthly cost destination",
    path: "/countries/united-states",
    validate: validatePage({ anchor: "cost-of-living" }),
  },
  {
    label: "Learning catalog destination",
    path: "/courses",
    validate: validatePage({ anchor: "learning-paths" }),
  },
  {
    label: "Progress API privacy",
    path: "/api/progress",
    validate: validatePrivateUnauthorizedResponse,
  },
  {
    label: "Billing API privacy",
    path: "/api/billing/status",
    validate: validatePrivateUnauthorizedResponse,
  },
];

function invariant(condition, message) {
  if (!condition) throw new Error(message);
}

function isRedirect(status) {
  return [301, 302, 303, 307, 308].includes(status);
}

function validateSignInRedirect(response) {
  const location = response.headers.get("location") || "";
  invariant(isRedirect(response.status), `expected a redirect, received ${response.status}`);
  invariant(location.includes("/sign-in"), `expected /sign-in redirect, received ${location || "no location"}`);
}

function validatePage({ anchor }) {
  return async (response) => {
    const html = await response.text();
    invariant(response.status === 200, `expected 200, received ${response.status}`);
    invariant(/<html[^>]+lang=["']en["']/i.test(html), "expected the page language to be English");
    invariant(
      new RegExp(`id=["']${anchor}["']`, "i").test(html),
      `missing #${anchor}`,
    );
  };
}

async function validatePrivateUnauthorizedResponse(response) {
  const cacheControl = response.headers.get("cache-control") || "";
  const payload = await response.json();
  invariant(response.status === 401, `expected 401, received ${response.status}`);
  invariant(/private/i.test(cacheControl), `missing private cache directive: ${cacheControl || "no header"}`);
  invariant(/no-store/i.test(cacheControl), `missing no-store cache directive: ${cacheControl || "no header"}`);
  invariant(typeof payload.error === "string" && payload.error.length > 0, "missing safe authentication error");
}

async function verifySourceContracts() {
  for (const contract of sourceContracts) {
    const source = await readFile(resolve(projectRoot, contract.file), "utf8");

    for (const pattern of contract.checks) {
      invariant(pattern.test(source), `${contract.file} does not satisfy ${pattern}`);
    }

    console.log(`PASS source: ${contract.file}`);
  }
}

async function verifyRuntimeContracts() {
  if (!baseUrl) {
    console.log("SKIP runtime: pass a deployment URL or set TGPI_VERIFY_BASE_URL");
    return;
  }

  for (const contract of runtimeContracts) {
    const url = new URL(contract.path, baseUrl);
    const response = await fetch(url, {
      headers: { "User-Agent": "TGPI-Premium-Smoke/1.0" },
      redirect: "manual",
      signal: AbortSignal.timeout(20_000),
    });

    await contract.validate(response);
    console.log(`PASS runtime: ${contract.label}`);
  }
}

try {
  await verifySourceContracts();
  await verifyRuntimeContracts();
  console.log("Premium Command Center verification completed successfully.");
} catch (error) {
  console.error(
    `Premium Command Center verification failed: ${error instanceof Error ? error.message : String(error)}`,
  );
  process.exitCode = 1;
}
