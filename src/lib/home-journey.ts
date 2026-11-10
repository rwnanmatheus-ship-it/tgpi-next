import type { HomeCourseId } from "./home-content";
import type { HomeProductId } from "./home-showcase";

type GoalPath = {
  id: string;
  label: string;
  heading: string;
  copy: string;
  outcome: string;
  checks: readonly string[];
  products: readonly HomeProductId[];
  courses: readonly HomeCourseId[];
};

/** Goals and destinations supported by the existing Country Fit flow. */
export const HOME_GOALS = [
  {
    id: "study", label: "Study abroad",
    heading: "Start with the institution. Then the destination.",
    copy: "Explore the programme, language requirements and total costs before committing to a place.",
    outcome: "A research plan for your education pathway.",
    checks: ["Verify the institution and programme", "Check study permissions and deadlines", "Plan tuition and everyday costs"],
    products: ["countries", "compare", "fit", "learning"],
    courses: ["study-abroad-planning", "global-english-2026", "cost-of-living-lab"],
  },
  {
    id: "work", label: "Work abroad",
    heading: "Give your career move a research plan.",
    copy: "Connect your field and language skills to the questions that matter before you apply or move.",
    outcome: "A research plan for your professional next step.",
    checks: ["Verify work permissions for your nationality", "Check qualifications and licensing", "Research city-level living costs"],
    products: ["atlas", "compare", "plan", "learning"],
    courses: ["career-networking", "global-english-2026", "ai-workflow-foundations"],
  },
  {
    id: "live", label: "Build a life abroad",
    heading: "Think beyond the move. Prepare for daily life.",
    copy: "Investigate residence, housing and practical routines in the context of your own situation.",
    outcome: "A research plan for a more considered move.",
    checks: ["Verify residence requirements", "Build a budget with dated local quotes", "Organize preparation and language practice"],
    products: ["fit", "documents", "plan", "countries"],
    courses: ["arrival-playbook", "cost-of-living-lab", "global-english-2026"],
  },
  {
    id: "learn", label: "Develop my skills",
    heading: "Build skills you can put into practice.",
    copy: "Use language, country research and budgeting lessons to prepare for real international situations.",
    outcome: "A starting point for your practical learning plan.",
    checks: ["Identify the situations you want to prepare for", "Explore the available learning catalogue", "Create an account to continue your progress"],
    products: ["learning", "certificates", "global-id", "integrity"],
    courses: ["global-english-2026", "ai-workflow-foundations", "career-networking"],
  },
] as const satisfies readonly GoalPath[];

export type HomeGoal = typeof HOME_GOALS[number]["id"];

export function homeGoal(value: unknown): HomeGoal {
  return HOME_GOALS.find(goal => goal.id === value)?.id ?? "study";
}

export const HOME_SECTIONS = [
  { id: "how-it-works", label: "Your journey", short: "Journey" },
  { id: "product-demo", label: "TGPI products", short: "Products" },
  { id: "capabilities", label: "Explore the platform", short: "Explore" },
  { id: "practical-learning", label: "Practical education", short: "Learn" },
  { id: "certification", label: "TGPI certification", short: "Certificates" },
  { id: "membership", label: "Free & Premium", short: "Membership" },
  { id: "questions", label: "Questions & support", short: "Questions" },
] as const;
