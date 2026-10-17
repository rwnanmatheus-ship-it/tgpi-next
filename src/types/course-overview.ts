export type CourseGoal =
  | "global-mobility"
  | "decision-intelligence"
  | "future-of-work"
  | "global-economics";

export type CourseSeries = "First 30 Days" | "Career Without Borders" | "The Intelligence Toolkit" | "The Global Money Series";

export interface CourseOverview {
  series?: CourseSeries;
  seriesOrder?: number;
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
