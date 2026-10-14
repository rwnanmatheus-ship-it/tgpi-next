import type { ReactNode } from "react";

/** Course overview is public; lessons and assessments authenticate independently. */
export default function CourseLayout({ children }: { children: ReactNode }) {
  return children;
}
