import type { Metadata } from "next";
import type { ReactNode } from "react";
import { privateRobots } from "@/seo";

export const metadata: Metadata = { robots: privateRobots };

export default function AdminLayout({ children }: { children: ReactNode }) {
  return children;
}
