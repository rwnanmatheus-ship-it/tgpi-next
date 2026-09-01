export type SeoRoutePolicy = {
  changeFrequency: "daily" | "monthly" | "weekly" | "yearly";
  path: string;
  priority: number;
};

export const publicRoutePolicy: readonly SeoRoutePolicy[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/countries", priority: 0.95, changeFrequency: "weekly" },
  { path: "/compare", priority: 0.9, changeFrequency: "weekly" },
  { path: "/courses", priority: 0.85, changeFrequency: "weekly" },
  { path: "/passport", priority: 0.8, changeFrequency: "monthly" },
  { path: "/authority", priority: 0.75, changeFrequency: "monthly" },
  { path: "/resources", priority: 0.7, changeFrequency: "monthly" },
  { path: "/pricing", priority: 0.65, changeFrequency: "monthly" },
  { path: "/about", priority: 0.65, changeFrequency: "monthly" },
  { path: "/founder", priority: 0.55, changeFrequency: "monthly" },
  { path: "/editorial-policy", priority: 0.5, changeFrequency: "monthly" },
  { path: "/why", priority: 0.5, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.4, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
] as const;

export const privateRoutePrefixes = [
  "/admin",
  "/api",
  "/certificates",
  "/dashboard",
  "/login",
  "/notifications",
  "/onboarding",
  "/premium",
  "/profile",
  "/rooms",
  "/sign-in",
  "/sign-up",
  "/upgrade",
] as const;

export const noIndexRoutePrefixes = [
  ...privateRoutePrefixes,
  "/search",
] as const;
