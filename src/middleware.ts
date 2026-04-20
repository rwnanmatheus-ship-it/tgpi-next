import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;

  const publicPaths = [
    "/",
    "/login",
    "/onboarding",
    "/countries",
    "/compare",
    "/courses",
    "/premium",
    "/upgrade",
  ];

  const isPublicPath =
    publicPaths.includes(url.pathname) ||
    url.pathname.startsWith("/countries/") ||
    url.pathname.startsWith("/courses/");

  if (isPublicPath) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"],
};