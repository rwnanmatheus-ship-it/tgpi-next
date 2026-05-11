import { tgpiImages } from "@/data/tgpi-images";
import type { CourseOverview } from "@/types/course-overview";

export const coursesOverview: CourseOverview[] = [
  {
    title: "Leadership & Management",
    desc: "Develop leadership, strategy, and execution skills.",
    meta: "Global strategy \u00b7 6 weeks",
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
