import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;

  const onboardingCompleted = request.cookies.get("onboarding")?.value;

  if (!onboardingCompleted && url.pathname !== "/onboarding") {
    return NextResponse.redirect(new URL("/onboarding", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/countries/:path*"],
};