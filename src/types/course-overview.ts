export type CourseGoal =
  | "global-mobility"
  | "decision-intelligence"
  | "future-of-work"
  | "global-economics";

export interface CourseOverview {
  audience: string;
  benefits: string[];
  category: string;
  desc: string;
  duration: string;
  format: string;
  goal: CourseGoal;
  goalLabel: string;
  href: string;
  id: string;
  image: string;
  imageAlt: string;
  level: string;
  releaseLabel: string;
  status: "available" | "planned";
  title: string;
}
