import type { Metadata } from "next";
import type { ReactNode } from "react";
import { noIndexFollowRobots } from "@/seo";

export const metadata: Metadata = { robots: noIndexFollowRobots };

export default function PublicUsernameLayout({ children }: { children: ReactNode }) {
  return children;
}
