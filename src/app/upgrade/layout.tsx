import type { Metadata } from "next";
import { privateRobots } from "@/seo";

export const metadata: Metadata = { robots: privateRobots };

export { default } from "@/components/auth/ProtectedRouteLayout";
