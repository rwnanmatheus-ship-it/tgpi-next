import type { Metadata } from "next";
import ProtectedRouteLayout from "@/components/auth/ProtectedRouteLayout";
import { privateRobots } from "@/seo";

export const metadata: Metadata = {
  robots: privateRobots,
};

export default ProtectedRouteLayout;
