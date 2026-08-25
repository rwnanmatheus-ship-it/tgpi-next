import { tgpiImages } from "@/data/tgpi-images";
import type { CourseOverview } from "@/types/course-overview";

export const coursesOverview: CourseOverview[] = [
  {
    href: "/courses/english-abroad",
    id: "english-abroad",
    title: "English for Living Abroad",
    desc: "Build practical English for arrival, housing, daily life, work, safety and your first 24 hours abroad.",
    meta: "Language & Mobility \u00b7 18 lessons \u00b7 6h 10m",
    image: tgpiImages.leadership,
    status: "available",
  },
  {
    href: "/premium-waitlist",
    id: "critical-thinking",
    title: "Philosophy & Critical Thinking",
    desc: "Analyze ideas, arguments, and decisions with clarity.",
    meta: "Mindset \u00b7 4 weeks",
    image: tgpiImages.philosophy,
    status: "planned",
  },
  {
    href: "/premium-waitlist",
    id: "technology-future",
    title: "Technology & Future",
    desc: "Explore AI, automation, and emerging industries.",
    meta: "Technology \u00b7 8 weeks",
    image: tgpiImages.technology,
    status: "planned",
  },
  {
    href: "/premium-waitlist",
    id: "global-economics",
    title: "Global Economics",
    desc: "Understand markets, currencies, and international systems.",
    meta: "Economics \u00b7 8 weeks",
    image: tgpiImages.globe,
    status: "planned",
  },
];
