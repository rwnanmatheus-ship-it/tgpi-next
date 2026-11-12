import { courseArtwork } from '@/lib/cinematic-art';
import { academyManifest } from "@/data/courses/academy/manifest";
import { emergencyOverview } from "@/data/courses/emergency/overview";
import { seriesOverview } from "@/data/courses/series-courses";
import type { CourseOverview } from "@/types/course-overview";

const originalOverview: CourseOverview[] = [
  ...seriesOverview,
{
  "id": "country-fit",
  "title": "Country Fit: Choose Where You Can Thrive",
  "category": "Decision Intelligence",
  "desc": "Compare countries against your constraints, evidence and priorities before committing to a move.",
  "audience": "People preparing a realistic international life or career plan.",
  "benefits": [
    "Separate legal feasibility from lifestyle preferences.",
    "Use consistent measures to compare three destinations.",
    "Identify what would change your preferred option."
  ],
  "duration": "1h",
  "format": "3 applied lessons",
  "goal": "decision-intelligence",
  "goalLabel": "Make stronger decisions",
  "href": "/courses/country-fit",
  "image": "/images/cinematic-2026/country-research-1600.webp",
  "imageAlt": "A navy and brass globe beside an open atlas; illustrative scene",
  "level": "Practical Foundation",
  "releaseLabel": "Available now",
  "status": "available"
},
{
  "id": "relocation-budget",
  "title": "Move Abroad: Build Your Financial Runway",
  "category": "Economics & Opportunity",
  "desc": "Build a relocation budget, test your runway and create a practical financial go/no-go plan.",
  "audience": "People preparing a realistic international life or career plan.",
  "benefits": [
    "Separate one-time cash needs from recurring living costs.",
    "Calculate how long liquid funds cover a monthly shortfall.",
    "Set thresholds and safeguards before paying non-refundable costs."
  ],
  "duration": "1h",
  "format": "3 applied lessons",
  "goal": "global-economics",
  "goalLabel": "Understand global opportunity",
  "href": "/courses/relocation-budget",
  "image": "/images/cinematic-2026/budget-planning-1600.webp",
  "imageAlt": "Hands reviewing a budget with a calculator and notebook; illustrative scene",
  "level": "Practical Foundation",
  "releaseLabel": "Available now",
  "status": "available"
},
{
  "id": "international-career",
  "title": "International Career: Prove Your Value",
  "category": "Technology & Adaptability",
  "desc": "Turn experience into credible evidence, targeted applications and clear international interview answers.",
  "audience": "People preparing a realistic international life or career plan.",
  "benefits": [
    "Compare role requirements with evidence you can show.",
    "Write outcome-led experience without exaggeration.",
    "Give a concise evidence-based answer and evaluate mutual fit."
  ],
  "duration": "1h",
  "format": "3 applied lessons",
  "goal": "future-of-work",
  "goalLabel": "Future-proof my career",
  "href": "/courses/international-career",
  "image": "/images/cinematic-2026/international-career-1600.webp",
  "imageAlt": "A professional reviewing a portfolio before an interview; illustrative scene",
  "level": "Practical Foundation",
  "releaseLabel": "Available now",
  "status": "available"
},
  {
    audience:
      "For people preparing to study, work or build a life in another country.",
    benefits: [
      "Navigate arrival, housing and healthcare conversations",
      "Communicate with confidence in interviews and at work",
      "Recover clearly when pressure or misunderstanding appears",
    ],
    category: "Language & Mobility",
    desc: "Build practical English for the moments that determine whether you can arrive, adapt, work and belong with confidence.",
    duration: "6h 10m",
    format: "18 scenario-based lessons",
    goal: "global-mobility",
    goalLabel: "Live abroad with confidence",
    href: "/courses/global-english-2026",
    id: "global-english-2026",
    image: "/images/cinematic-2026/english-dialogue-1600.webp",
    imageAlt:
      "Two adults practicing an interview in a contemporary office; illustrative scene",
    level: "A2–B1 Foundation",
    releaseLabel: "Available now",
    status: "available",
    title: "Global English: Live, Work & Belong Abroad",
  },
  {
    audience:
      "For globally minded people making career, country and life decisions with real consequences.",
    benefits: [
      "Separate evidence from assumptions and social pressure",
      "Compare options through a repeatable decision framework",
      "Communicate complex reasoning with clarity and authority",
    ],
    category: "Decision Intelligence",
    desc: "Develop a disciplined system for evaluating countries, opportunities, risks and high-stakes choices without relying on instinct alone.",
    duration: "4 weeks",
    format: "Applied decision laboratories",
    goal: "decision-intelligence",
    goalLabel: "Make stronger decisions",
    href: "/premium-waitlist",
    id: "critical-thinking",
    image: "/images/cinematic-2026/evidence-research-1600.webp",
    imageAlt:
      "A researcher comparing books and reports; illustrative scene",
    level: "Applied Foundation",
    releaseLabel: "Next release",
    status: "planned",
    title: "Strategic Thinking for Global Decisions",
  },
  {
    audience:
      "For professionals who want to work with intelligent systems instead of being displaced by them.",
    benefits: [
      "Understand how AI changes roles, industries and leverage",
      "Identify the capabilities that become more valuable",
      "Build a practical human–AI operating model for work",
    ],
    category: "Technology & Adaptability",
    desc: "Understand artificial intelligence, automation and the human capabilities required to remain useful, adaptive and globally competitive.",
    duration: "6 weeks",
    format: "Human–AI capability labs",
    goal: "future-of-work",
    goalLabel: "Future-proof my career",
    href: "/premium-waitlist",
    id: "technology-future",
    image: "/images/cinematic-2026/ai-workflow-1600.webp",
    imageAlt:
      "A professional reviewing a paper workflow beside a laptop; illustrative scene",
    level: "Global Professional",
    releaseLabel: "In development",
    status: "planned",
    title: "AI & the Future of Human Work",
  },
  {
    audience:
      "For people who want to understand how global systems shape income, cost, mobility and opportunity.",
    benefits: [
      "Read markets, currencies and trade as connected systems",
      "Understand why opportunity moves between countries",
      "Apply economic signals to personal global decisions",
    ],
    category: "Economics & Opportunity",
    desc: "Learn how money, currencies, trade and global markets shape the real opportunities available across countries and careers.",
    duration: "6 weeks",
    format: "Global market case studies",
    goal: "global-economics",
    goalLabel: "Understand global opportunity",
    href: "/premium-waitlist",
    id: "global-economics",
    image: "/images/cinematic-2026/global-economy-1600.webp",
    imageAlt:
      "Global analyst studying trade routes between a port and financial city",
    level: "Practical Foundation",
    releaseLabel: "In development",
    status: "planned",
    title: "Global Economics: Money, Markets & Opportunity",
  },
];

export const coursesOverview: CourseOverview[] = [...originalOverview.map(course => {
  const edition = academyManifest[course.id];
  if (!edition) return course;
  return { ...course, image: courseArtwork(course.id, course.image), status: "available", href: `/courses/${course.id}`,
    duration: `${Math.floor(edition.minutes / 60)}h ${edition.minutes % 60}m`,
    format: `${edition.lessons} lessons and laboratories`, releaseLabel: "Expanded edition · Automatic assessment",
    learningPolicy: { kind: course.id === "global-english-2026" ? "flagship" : "practice", publicationStatus: "published", accessPolicy: "free_account", assessmentPolicy: "automatic_assessment", credentialStatus: "criteria_available", instructionLanguage: "en" },
  } satisfies CourseOverview;
}), ...emergencyOverview];

