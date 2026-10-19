/** Only goals accepted by the real Country Fit route. Choice stays in the URL. */
export const HOME_GOALS = [
  { id: "study", label: "Study abroad", heading: "Start with the institution. Then the destination.", copy: "Explore the programme, language requirements and total costs before committing to a place.", outcome: "A research plan for your education pathway.", checks: ["Verify the institution and programme", "Check study permissions and deadlines", "Plan tuition and everyday costs"] },
  { id: "work", label: "Work abroad", heading: "Give your career move a research plan.", copy: "Connect your field and language skills to the questions that matter before you apply or move.", outcome: "A research plan for your professional next step.", checks: ["Verify work permissions for your nationality", "Check qualifications and licensing", "Research city-level living costs"] },
  { id: "live", label: "Build a life abroad", heading: "Think beyond the move. Prepare for daily life.", copy: "Investigate residence, housing and practical routines in the context of your own situation.", outcome: "A research plan for a more considered move.", checks: ["Verify residence requirements", "Build a budget with dated local quotes", "Organize preparation and language practice"] },
  { id: "learn", label: "Develop my skills", heading: "Build skills you can put into practice.", copy: "Use language, country research and budgeting lessons to prepare for real international situations.", outcome: "A starting point for your practical learning plan.", checks: ["Identify the situations you want to prepare for", "Explore the available learning catalogue", "Create an account to continue your progress"] },
] as const;
export type HomeGoal = typeof HOME_GOALS[number]["id"];
export function homeGoal(value: unknown): HomeGoal {
  return HOME_GOALS.find(goal => goal.id === value)?.id ?? "study";
}

export const HOME_SECTIONS = [
  { id: "how-it-works", label: "Your journey", short: "Journey" },
  { id: "product-demo", label: "See the product", short: "Product" },
  { id: "capabilities", label: "Explore the platform", short: "Explore" },
  { id: "practical-learning", label: "Practical education", short: "Learn" },
  { id: "membership", label: "Free & Premium", short: "Membership" },
  { id: "questions", label: "Questions & support", short: "Questions" },
] as const;
