import { tgpiImages } from "@/data/tgpi-images";
import type { CourseOverview } from "@/types/course-overview";

export const coursesOverview: CourseOverview[] = [
  {
    title: "English for Living Abroad",
    desc: "Practice the English required for airports, housing, work and daily life abroad.",
    meta: "Language \u00b7 3 practical lessons",
    image: tgpiImages.leadership,
  },
  {
    title: "Philosophy & Critical Thinking",
    desc: "Analyze ideas, arguments, and decisions with clarity.",
    meta: "Mindset \u00b7 4 weeks",
    image: tgpiImages.philosophy,
  },
  {
    title: "Technology & Future",
    desc: "Explore AI, automation, and emerging industries.",
    meta: "Technology \u00b7 8 weeks",
    image: tgpiImages.technology,
  },
  {
    title: "Global Economics",
    desc: "Understand markets, currencies, and international systems.",
    meta: "Economics \u00b7 8 weeks",
    image: tgpiImages.globe,
  },
];
